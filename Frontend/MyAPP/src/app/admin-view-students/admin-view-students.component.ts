import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../student.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Student } from '../../Student';

@Component({
  selector: 'app-admin-view-students',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h3 class="text-center text-primary mb-4">All Student Details</h3>

      <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover text-center">
          <thead class="table-primary">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Course</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr *ngFor="let student of students">
              <td>{{ student.id }}</td>
              <td>{{ student.firstName }}</td>
              <td>{{ student.lastName }}</td>
              <td>{{ student.email }}</td>
              <td>{{ student.phone }}</td>
              <td>{{ student.address }}</td>
              <td>{{ student.course }}</td>
              <td>{{ student.department }}</td>
              <td>
                <button class="btn btn-sm btn-danger" (click)="deleteStudent(student.id)">
                  🗑 Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="students.length === 0" class="text-center text-muted">
        No students found.
      </div>
    </div>
  `,
  styles: ``
})

export class AdminViewStudentsComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAllStudents().subscribe(data => {
      this.students = data;
    });
  }

  deleteStudent(studentId: number): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: {
      title: 'Are you sure?',
      message: 'Do you want to delete this student?',
      confirmation: true //This shows Yes/No
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.studentService.deleteStudent(studentId).subscribe({
        next: (response: any) => {
          this.students = this.students.filter(s => s.id !== studentId);
          this.dialog.open(ConfirmDialogComponent, {
            data: {
              title: 'Deleted',
              message: response.message || 'Student deleted successfully.',
              confirmation: false //Only OK
            }
          });
        },
        error: (error) => {
          console.error('Deletion error:', error);
          this.dialog.open(ConfirmDialogComponent, {
            data: {
              title: 'Error',
              message: error?.error?.message || 'Failed to delete student.',
              confirmation: false //Only OK
            }
          });
        }
      });
    }
  });
}


}
