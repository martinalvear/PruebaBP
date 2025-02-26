/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package com.bp.reporte.controller;

import com.bp.reporte.dto.ReporteDTO;
import com.bp.reporte.dto.MovimientoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@RestController
@RequestMapping("/reportes")
public class ReporteRestController {

    @Autowired
    private RestTemplate restTemplate;

    private final String CLIENTE_MS_URL = "http://localhost:8080/clientes/";
    private final String CUENTA_MS_URL = "http://localhost:8082/cuentas";
    private final String MOVIMIENTO_MS_URL = "http://localhost:8083/movimientos";

    @GetMapping
    public ResponseEntity<List<ReporteDTO>> generarReporte(
            @RequestParam("fechaInicio") String fechaInicio,
            @RequestParam("fechaFin") String fechaFin,
            @RequestParam("clienteId") Long clienteId) {

        // 1️⃣ Consultamos el Cliente
        Map<String, Object> cliente = restTemplate.getForObject(CLIENTE_MS_URL + clienteId, Map.class);
        if (cliente == null) {
            return ResponseEntity.notFound().build();
        }

        String clienteNombre = (String) cliente.get("nombre");

        // 2️⃣ Consultamos las Cuentas del Cliente
        List<Map<String, Object>> cuentas = Arrays.asList(
                restTemplate.getForObject(CUENTA_MS_URL + "?clienteId=" + clienteId, Map[].class));

        List<ReporteDTO> reportes = new ArrayList<>();

        for (Map<String, Object> cuenta : cuentas) {
            Long cuentaId = ((Number) cuenta.get("id")).longValue();
            String numeroCuenta = (String) cuenta.get("numeroCuenta");
            String tipoCuenta = (String) cuenta.get("tipoCuenta");
            double saldoInicial = ((Number) cuenta.get("saldoInicial")).doubleValue();
            boolean estado = (Boolean) cuenta.get("estado");

            // 3️⃣ Consultamos los Movimientos de la Cuenta
            List<Map<String, Object>> movimientos = Arrays.asList(
                    restTemplate.getForObject(MOVIMIENTO_MS_URL + "?cuentaId=" + cuentaId + "&fechaInicio=" + fechaInicio + "&fechaFin=" + fechaFin, Map[].class));

            List<MovimientoDTO> movimientosDTO = new ArrayList<>();
            double saldoDisponible = saldoInicial;

            for (Map<String, Object> mov : movimientos) {
                String fecha = (String) mov.get("fecha");
                String tipoMovimiento = (String) mov.get("tipoMovimiento");
                double valor = ((Number) mov.get("valor")).doubleValue();
                saldoDisponible += valor; // Actualizamos saldo disponible

                movimientosDTO.add(new MovimientoDTO(fecha, tipoMovimiento, valor, saldoDisponible));
            }

            ReporteDTO reporte = new ReporteDTO(
                    fechaInicio + " - " + fechaFin,
                    clienteNombre,
                    numeroCuenta,
                    tipoCuenta,
                    saldoInicial,
                    estado,
                    movimientosDTO,
                    saldoDisponible
            );

            reportes.add(reporte);
        }

        return ResponseEntity.ok(reportes);
    }
}
