/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package com.bp.movimiento.controller;

import com.bp.movimiento.entity.Movimiento;
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
import com.bp.movimiento.repository.MovimientoRepository;
import org.springframework.http.HttpStatus;

/**
 *
 * @author user
 */
@RestController
@RequestMapping("/movimientos")
public class MovimientoRestController {

    @Autowired
    private MovimientoRepository movimientoRepository;

    @GetMapping
    public List<Movimiento> findAll() {
        return movimientoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movimiento> getById(@PathVariable("id") Long id) {
        return movimientoRepository.findById(id)
                .map(movimiento -> new ResponseEntity<>(movimiento, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Movimiento> updateMovimiento(@PathVariable("id") Long id, @RequestBody Movimiento input) {
        return movimientoRepository.findById(id)
                .map(movimientoExistente -> {
                    movimientoExistente.setFecha(input.getFecha());
                    movimientoExistente.setTipoMovimiento(input.getTipoMovimiento());
                    movimientoExistente.setValor(input.getValor());
                    movimientoExistente.setSaldo(input.getSaldo());

                    Movimiento movimientoActualizado = movimientoRepository.save(movimientoExistente);
                    return new ResponseEntity<>(movimientoActualizado, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public Movimiento createCuenta(@RequestBody Movimiento movimiento) {
        return movimientoRepository.save(movimiento);
    }

@DeleteMapping("/{id}")
public ResponseEntity<?> deleteMovimiento(@PathVariable("id") Long id) {
    return movimientoRepository.findById(id)
            .map(movimiento -> {
                movimientoRepository.delete(movimiento);
                return ResponseEntity.noContent().build();
            })
            .orElse(ResponseEntity.notFound().build());
}


}
