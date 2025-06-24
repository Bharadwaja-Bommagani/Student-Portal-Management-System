import { Component } from '@angular/core';
import { StudentService } from '../student.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password-student',
  standalone: false,
  template: `

  <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
  <div style="border: 2px solid #ccc; padding: 30px; border-radius: 10px; width: 100%; max-width: 400px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <form #form="ngForm" (ngSubmit)="onChangePassword()">
      <div class="mb-3">
        <label class="form-label">New Password</label>
        <input
          type="password"
          class="form-control"
          [(ngModel)]="newPassword"
          name="newPassword"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Confirm New Password</label>
        <input
          type="password"
          class="form-control"
          [(ngModel)]="confirmPassword"
          name="confirmPassword"
          required
        />
      </div>

      <div class="d-grid">
        <button type="submit" class="btn btn-warning" [disabled]="form.invalid">
          Update Password
        </button>
      </div>
    </form>
  </div>
</div>



  `,
  styles: ``
})


export class ChangePasswordStudentComponent {
  newPassword = '';
  confirmPassword = '';

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  onChangePassword() {
    if (!this.newPassword || !this.confirmPassword) {
      this.dialog.open(ConfirmDialogComponent, {
        data: { title: 'Error', message: 'All fields are required!' }
      });
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.dialog.open(ConfirmDialogComponent, {
        data: { title: 'Mismatch', message: 'Passwords do not match!' }
      });
      return;
    }

    const email = localStorage.getItem('studentEmail');
    if (!email) {
      this.dialog.open(ConfirmDialogComponent, {
        data: { title: 'Error', message: 'Student email not found in session!' }
      });
      return;
    }

    this.studentService.changePassword(email, this.newPassword).subscribe({
      next: (res) => {
        this.dialog.open(ConfirmDialogComponent, {
          data: { title: 'Success', message: res.message } // ✅ Use message from backend
        });
        this.newPassword = '';
        this.confirmPassword = '';
        this.router.navigate(['/student-dashboard']);
      },
      error: (err) => {
        this.dialog.open(ConfirmDialogComponent, {
          data: { title: 'Failed', message: err.error.message || 'Something went wrong.' }
        });
      }
    });

  }
}