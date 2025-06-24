package com.vcube2.sbAngApp.service;

import java.util.List;
import java.util.Optional;

import com.vcube2.sbAngApp.model.Student;

public interface StudentService {
	
	public String registerStudent(Student student);
	
	public Student loginStudent(String email, String password);
	
	public Optional<Student> getStudentByEmail(String email);
	
	public Student updateStudentDetails(String email, Student updatedStudent);
	
	public boolean changePassword(String email, String newPassword);
	
	public List<Student> getAllStudents();
	
	public boolean deleteStudentById(Long id);
	
	
	
	
	
}


