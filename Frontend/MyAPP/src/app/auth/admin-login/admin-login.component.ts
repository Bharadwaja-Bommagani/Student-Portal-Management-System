import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  onLogin(form?: any) {
    // Optional form-level guard to block invalid forms
    if (!this.email || !this.password || !this.isValidEmail(this.email)) {
      this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Invalid Input',
          message: 'Please enter a valid email and password.'
        }
      });
      return;
    }

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.adminService.loginAdmin(loginData).subscribe({
      next: (admin) => {
        localStorage.setItem('adminEmail', admin.email);
        this.router.navigate(['/admin-dashboard']);
      },
      error: () => {
        this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: 'Login Failed',
            message: 'Invalid credentials. Please try again.'
          }
        });
      }
    });
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}
