/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package com.bp.cuenta.controller;

import com.bp.cuenta.entity.Cuenta;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import com.bp.cuenta.repository.CuentaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author user
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/cuentas")
public class CuentaRestController {

    @Autowired
    private CuentaRepository cuentaRepository;

    @GetMapping
    public List<Cuenta> findAll() {
        return cuentaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Object get(@PathVariable("id") Long id) {
        return cuentaRepository.findById(id)
                .map(cuenta -> new ResponseEntity<>(cuenta, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/by-cliente")
    public ResponseEntity<List<Cuenta>> getCuentasByClienteId(@RequestParam(name = "clienteId") Long clienteId) {
        List<Cuenta> cuentas = cuentaRepository.findByClienteId(clienteId);
        if (cuentas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(cuentas);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cuenta> updateCuenta(@PathVariable("id") Long id, @RequestBody Cuenta input) {
        return cuentaRepository.findById(id)
                .map(cuentaExistente -> {
                    cuentaExistente.setNumeroCuenta(input.getNumeroCuenta());
                    cuentaExistente.setTipoCuenta(input.getTipoCuenta());
                    cuentaExistente.setSaldoInicial(input.getSaldoInicial());
                    cuentaExistente.setEstado(input.getEstado());

                    Cuenta cuentaActualizada = cuentaRepository.save(cuentaExistente);
                    return new ResponseEntity<>(cuentaActualizada, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public Cuenta createCuenta(@RequestBody Cuenta cuenta) {
        return cuentaRepository.save(cuenta);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        return cuentaRepository.findById(id)
                .map(cuenta -> {
                    cuentaRepository.delete(cuenta);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
