package com.vcube2.sbAngApp.controller;
import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vcube2.sbAngApp.model.Admin;
import com.vcube2.sbAngApp.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        String result = adminService.registerAdmin(admin);
        if ("Admin registered successfully".equals(result)) {
            return ResponseEntity.ok(Collections.singletonMap("message", result));
        } else {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", result));
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Admin admin) {
        Admin foundAdmin = adminService.loginAdmin(admin.getEmail(), admin.getPassword());
        if (foundAdmin != null) {
            return ResponseEntity.ok(foundAdmin); // Sends full admin JSON
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
    
    
    
    @GetMapping("/getByEmail/{email}")
    public ResponseEntity<?> getAdminByEmail(@PathVariable String email) {
        Optional<Admin> admin = adminService.getAdminByEmail(email);
        if (admin.isPresent()) {
            return ResponseEntity.ok(admin.get());
        } else {
            return ResponseEntity.status(404).body("Admin not found");
        }
    }



}