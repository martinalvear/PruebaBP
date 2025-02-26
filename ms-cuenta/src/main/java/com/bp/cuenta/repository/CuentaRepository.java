/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Repository.java to edit this template
 */
package com.bp.cuenta.repository;

import com.bp.cuenta.entity.Cuenta;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author user
 */
@Repository
public interface CuentaRepository extends JpaRepository<Cuenta, Long> {
        List<Cuenta> findByClienteId(Long clienteId);
}