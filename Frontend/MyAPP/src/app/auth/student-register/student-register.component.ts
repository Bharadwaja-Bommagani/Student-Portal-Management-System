import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-student-register',
  standalone: false,
  templateUrl: './student-register.component.html',
  styleUrl: './student-register.component.css'
})
export class StudentRegisterComponent {
  student = {
    firstName: '', 
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    course: '',
    department: ''
  };

  confirmPassword: string = '';

  constructor(
    private studentService: StudentService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  register() {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      password,
      course,
      department
    } = this.student;

    // Check for empty fields
    if (!firstName || !lastName || !email || !phone || !address || !password || !course || !department || !this.confirmPassword) {
      this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Missing Fields',
          message: 'All fields are required!'
        }
      });
      return;
    }

    // Validate phone number length
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Invalid Phone',
          message: 'Phone number must be 10 digits.'
        }
      });
      return;
    }

    // Validate email format
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(email)) {
      this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Invalid Email',
          message: 'Please enter a valid email address.'
        }
      });
      return;
    }

    // Password match validation
    if (password !== this.confirmPassword) {
      this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Password Mismatch',
          message: 'Password and Confirm Password do not match.'
        }
      });
      return;
    }

    // Submit to backend
    this.studentService.registerStudent(this.student).subscribe({
      next: () => {
        this.router.navigate(['/login-student']);
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'Registration failed';
        this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: 'Error',
            message: errorMsg
          }
        });
      }
    });
  }

  allowOnlyAlphabets(event: KeyboardEvent) {
    const inputChar = event.key;
    if (!/^[a-zA-Z ]$/.test(inputChar)) {
      event.preventDefault();
    }
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    const inputChar = event.key;
    if (!/^[0-9]$/.test(inputChar) && !allowedKeys.includes(inputChar)) {
      event.preventDefault();
    }
  }
}
