package com.vcube2.sbAngApp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcube2.sbAngApp.model.Student;
import com.vcube2.sbAngApp.repository.StudentRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class StudentServiceImpl implements StudentService {
	
	@Autowired
	private StudentRepository studentRepository;
	
	
	@Override
	public String registerStudent(Student student) {
        Optional<Student> existing = studentRepository.findByEmail(student.getEmail());
        if (existing.isPresent()) {
            return "Student already exists";
        }
        studentRepository.save(student);
        return "Student registered successfully";
	    }
	
	
	
	@Override
	public Student loginStudent(String email, String password) {
        Optional<Student> student = studentRepository.findByEmail(email);
        if (student.isPresent() && student.get().getPassword().equals(password)) {
            return student.get();
        }
        return null;
    }
	
	
	@Override
	public Optional<Student> getStudentByEmail(String email) {
	        return studentRepository.findByEmail(email);
	}
	
	
	@Override
	public Student updateStudentDetails(String email, Student updatedStudent) {
        Optional<Student> existingStudentOpt = studentRepository.findByEmail(email);

        if (existingStudentOpt.isPresent()) {
            Student student = existingStudentOpt.get();

            student.setFirstName(updatedStudent.getFirstName());
            student.setLastName(updatedStudent.getLastName());
            student.setPhone(updatedStudent.getPhone());
            student.setAddress(updatedStudent.getAddress());
            student.setCourse(updatedStudent.getCourse());
            student.setDepartment(updatedStudent.getDepartment());

            return studentRepository.save(student);
        } else {
            throw new RuntimeException("Student not found with email: " + email);
        }
    }
	
	
	@Override
	public boolean changePassword(String email, String newPassword) {
	    Optional<Student> studentOpt = studentRepository.findByEmail(email);
	    if (studentOpt.isPresent()) {
	        Student student = studentOpt.get();
	        student.setPassword(newPassword);
	        studentRepository.save(student);
	        return true;
	    }
	    return false;
	}
	
	@Override
	public List<Student> getAllStudents() {
	    return studentRepository.findAll();
	}

	@Override
	public boolean deleteStudentById(Long id) {
	    Optional<Student> studentOpt = studentRepository.findById(id);
	    if (studentOpt.isPresent()) {
	        studentRepository.deleteById(id);
	        return true;
	    }
	    return false;
	}





	
	
}
