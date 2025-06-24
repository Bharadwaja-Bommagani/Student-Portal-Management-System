package com.vcube2.sbAngApp.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vcube2.sbAngApp.exception.ResourceNotFoundException;
import com.vcube2.sbAngApp.model.Student;
import com.vcube2.sbAngApp.service.StudentServiceImpl;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/student")
public class StudentController {
	
	@Autowired
	private StudentServiceImpl studentService;
	
	@PostMapping("/register")
    public ResponseEntity<?> registerStudent(@RequestBody Student student) {
        String result = studentService.registerStudent(student);
        if ("Student registered successfully".equals(result)) {
            return ResponseEntity.ok(Collections.singletonMap("message", result));
        } else {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", result));
        }
    }
	
	
	@PostMapping("/login")
    public ResponseEntity<?> loginStudent(@RequestBody Student student) {
        Student found = studentService.loginStudent(student.getEmail(), student.getPassword());
        if (found != null) {
            return ResponseEntity.ok(found);
        } else {
            return ResponseEntity.status(401).body(Collections.singletonMap("message", "Invalid credentials"));
        }
    }
	
	
	@GetMapping("/getByEmail/{email}")
    public ResponseEntity<Optional<Student>> getStudentByEmail(@PathVariable String email) {
        Optional<Student> student = studentService.getStudentByEmail(email);
        if (student != null) {
            return ResponseEntity.ok(student);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	
	 @PutMapping("/updateByEmail/{email}")
	 public ResponseEntity<Student> updateStudent(@PathVariable String email, @RequestBody Student updatedStudent) {
	    try {
	        Student updated = studentService.updateStudentDetails(email, updatedStudent);
	        return ResponseEntity.ok(updated);
	    } catch (RuntimeException ex) {
	        return ResponseEntity.notFound().build();
	    }
	 }
	 
	 
	 @PutMapping("/changePassword")
	 public ResponseEntity<?> changePassword(@RequestBody Map<String, String> request) {
	     String email = request.get("email");
	     String newPassword = request.get("newPassword");

	     System.out.println("Change password request received for: " + email);

	     if (email == null || newPassword == null || newPassword.isEmpty()) {
	         return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "Invalid request"));
	     }

	     boolean result = studentService.changePassword(email, newPassword);
	     if (result) {
	         return ResponseEntity.ok(Map.of("status", "success", "message", "Password changed successfully"));
	     } else {
	         return ResponseEntity.status(404).body(Map.of("status", "error", "message", "User not found"));
	     }
	 }
	 
	@GetMapping("/getAll")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Map<String, String>> deleteStudent(@PathVariable Long id) {
	    boolean deleted = studentService.deleteStudentById(id);
	    if (deleted) {
	        return ResponseEntity.ok(Collections.singletonMap("message", "Student deleted successfully"));
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                             .body(Collections.singletonMap("message", "Student not found"));
	    }
	}







}
