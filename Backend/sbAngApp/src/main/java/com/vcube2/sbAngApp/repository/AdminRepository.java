package com.vcube2.sbAngApp.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.vcube2.sbAngApp.model.Admin;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
}

