import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from '../../student.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-student-login',
  standalone: false,
  templateUrl: './student-login.component.html',
  styleUrl: './student-login.component.css'
})
export class StudentLoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private studentService: StudentService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  onLogin(): void {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Field validations
    if (!this.email || !this.password) {
      this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Missing Fields',
          message: 'Please fill in both email and password.'
        }
      });
      return;
    }

    if (!emailPattern.test(this.email)) {
      this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Invalid Email',
          message: 'Please enter a valid email address.'
        }
      });
      return;
    }

    const credentials = {
      email: this.email,
      password: this.password
    };

    this.studentService.loginStudent(credentials).subscribe({
      next: (student) => {
        localStorage.setItem('studentEmail', student.email);
        this.router.navigate(['/student-dashboard']);
      },
      error: () => {
        this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: 'Login Failed',
            message: 'Invalid email or password.'
          }
        });
      }
    });
  }
}
