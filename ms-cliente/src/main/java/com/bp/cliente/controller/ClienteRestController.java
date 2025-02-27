/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package com.bp.cliente.controller;

import com.bp.cliente.entity.Cliente;
import com.bp.cliente.repository.ClienteRepository;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

/**
 *
 * @author user
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/clientes")
public class ClienteRestController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> get(@PathVariable("id") Long id) {
        return clienteRepository.findById(id)
                .map(cliente -> ResponseEntity.ok(cliente))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable("id") Long id, @RequestBody Cliente input) {
        return clienteRepository.findById(id)
                .map(clienteExistente -> {
                    // Actualizamos los datos del cliente
                    clienteExistente.setNombre(input.getNombre());
                    clienteExistente.setGenero(input.getGenero());
                    clienteExistente.setEdad(input.getEdad());
                    clienteExistente.setIdentificacion(input.getIdentificacion());
                    clienteExistente.setDireccion(input.getDireccion());
                    clienteExistente.setTelefono(input.getTelefono());
                    clienteExistente.setContraseña(input.getContraseña());
                    clienteExistente.setEstado(input.getEstado());

                    // Guardamos y devolvemos el cliente actualizado
                    Cliente clienteActualizado = clienteRepository.save(clienteExistente);
                    return ResponseEntity.ok(clienteActualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Cliente createCliente(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        return clienteRepository.findById(id)
                .map(cliente -> {
                    clienteRepository.delete(cliente);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
