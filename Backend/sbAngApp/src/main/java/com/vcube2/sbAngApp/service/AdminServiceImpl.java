package com.vcube2.sbAngApp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcube2.sbAngApp.model.Admin;
import com.vcube2.sbAngApp.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public String registerAdmin(Admin admin) {
        Optional<Admin> existingAdmin = adminRepository.findByEmail(admin.getEmail());
        if (existingAdmin.isPresent()) {
            return "Admin already exists";
        }
        
        //Clear ID to ensure this is treated as a new entity
        admin.setId(null);
        
        adminRepository.save(admin);
        return "Admin registered successfully";
    }


    
    @Override
    public Admin loginAdmin(String email, String password) {
        return adminRepository.findByEmail(email)
                .filter(admin -> admin.getPassword().equals(password))
                .orElse(null);
    }
    
    
    @Override
    public Optional<Admin> getAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }



}
