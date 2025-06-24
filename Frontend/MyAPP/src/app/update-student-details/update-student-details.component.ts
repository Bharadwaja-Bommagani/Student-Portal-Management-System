import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-update-student-details',
  standalone: false,
  template: `
  <div class="container py-5 bg-light" style="min-height: 100vh;">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card p-4 shadow">
          <h3 class="text-center text-primary mb-4">Update Your Details</h3>
          <form (ngSubmit)="onSubmit()" #updateForm="ngForm">
            <div class="mb-3">
              <label class="form-label">First Name</label>
              <input type="text" class="form-control" [(ngModel)]="student.firstName" name="firstName"
                     required maxlength="15" pattern="[A-Za-z ]+" (keypress)="allowOnlyAlphabets($event)">
              <small class="text-danger" *ngIf="updateForm.submitted && !updateForm.controls['firstName']?.valid">
                Only alphabets allowed (max 15 characters).
              </small>
            </div>

            <div class="mb-3">
              <label class="form-label">Last Name</label>
              <input type="text" class="form-control" [(ngModel)]="student.lastName" name="lastName"
                     required maxlength="15" pattern="[A-Za-z ]+" (keypress)="allowOnlyAlphabets($event)">
              <small class="text-danger" *ngIf="updateForm.submitted && !updateForm.controls['lastName']?.valid">
                Only alphabets allowed (max 15 characters).
              </small>
            </div>

            <div class="mb-3">
              <label class="form-label">Phone</label>
              <input type="tel" class="form-control" [(ngModel)]="student.phone" name="phone"
                     required maxlength="10" minlength="10" (keypress)="allowOnlyNumbers($event)">
              <small class="text-danger" *ngIf="updateForm.submitted && student.phone.length !== 10">
                Enter a valid 10-digit phone number.
              </small>
            </div>

            <div class="mb-3">
              <label class="form-label">Address</label>
              <input type="text" class="form-control" [(ngModel)]="student.address" name="address" required maxlength="100">
            </div>

            <div class="mb-3">
              <label class="form-label">Department</label>
              <input type="text" class="form-control" [(ngModel)]="student.department" name="department"
                     required maxlength="15" pattern="[A-Za-z ]+" (keypress)="allowOnlyAlphabets($event)">
              <small class="text-danger" *ngIf="updateForm.submitted && !updateForm.controls['department']?.valid">
                Only alphabets allowed (max 15 characters).
              </small>
            </div>

            <div class="mb-3">
              <label class="form-label">Course</label>
              <input type="text" class="form-control" [(ngModel)]="student.course" name="course"
                     required maxlength="15" pattern="[A-Za-z ]+" (keypress)="allowOnlyAlphabets($event)">
              <small class="text-danger" *ngIf="updateForm.submitted && !updateForm.controls['course']?.valid">
                Only alphabets allowed (max 15 characters).
              </small>
            </div>

            <div class="d-grid mt-4">
              <button type="submit" class="btn btn-success">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: ``
})
export class UpdateStudentDetailsComponent implements OnInit {
  student: any = {};

  constructor(
    private studentService: StudentService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('studentEmail');
    if (email) {
      this.studentService.getStudentByEmail(email).subscribe({
        next: (data) => this.student = data,
        error: (err) => console.error('Failed to fetch student', err)
      });
    }
  }

  onSubmit(): void {
    if (
      !this.student.firstName ||
      !this.student.lastName ||
      !this.student.phone || this.student.phone.length !== 10 ||
      !this.student.address ||
      !this.student.department ||
      !this.student.course
    ) {
      this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Invalid Input',
          message: 'Please make sure all fields are filled correctly.'
        }
      });
      return;
    }

    this.studentService.updateStudentByEmail(this.student.email, this.student).subscribe({
      next: () => {
        this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: 'Update Successful',
            message: 'Your details have been updated successfully!'
          }
        }).afterClosed().subscribe(() => {
          this.router.navigate(['/student-dashboard']);
        });
      },
      error: (err) => console.error('Update failed', err)
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
