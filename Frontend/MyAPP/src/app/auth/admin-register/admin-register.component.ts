import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Admin } from '../../../Admin';
import { AdminService } from '../../admin.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-register',
  standalone: false,
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.css'
})
export class AdminRegisterComponent {
  admin: Admin = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  };

  confirmPassword: string = '';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  register(form: NgForm) {
    if (form.invalid || this.admin.password !== this.confirmPassword || this.admin.phone.length !== 10) {
      this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Validation Error',
          message: this.admin.password !== this.confirmPassword
            ? 'Passwords do not match.'
            : 'Please fill all fields correctly.'
        }
      });
      return;
    }

    this.adminService.registerAdmin(this.admin).subscribe({
      next: () => {
        this.router.navigate(['/login-admin']);
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
    const inputChar = event.key;
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!/^[0-9]$/.test(inputChar) && !allowedKeys.includes(inputChar)) {
      event.preventDefault();
    }
  }
}
