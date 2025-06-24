package com.vcube2.sbAngApp.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcube2.sbAngApp.model.Admin;
import com.vcube2.sbAngApp.repository.AdminRepository;

public interface AdminService {
	    String registerAdmin(Admin admin);
	    Admin loginAdmin(String email, String password);
	    Optional<Admin> getAdminByEmail(String email);

	}
