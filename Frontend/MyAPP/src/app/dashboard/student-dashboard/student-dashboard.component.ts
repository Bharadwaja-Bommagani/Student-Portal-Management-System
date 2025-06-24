import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../student.service';
import { Student } from '../../../Student';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  student: Student | null = null;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    const email = localStorage.getItem('studentEmail');
    if (email) {
      this.studentService.getStudentByEmail(email).subscribe({
        next: (data: Student) => {
          this.student = data;
        },
        error: (err) => {
          console.error('Failed to fetch student data:', err);
        }
      });
    }
  }

  onUpdateDetails() {
        this.router.navigate(['/update-student-details']);  // Navigate to update student component
  }
 
  

  onChangePassword() {
    this.router.navigate(['/change-password-student']); // Navigate to change password component
  }

  logout() {
    localStorage.removeItem('studentEmail');
    this.router.navigate(['/login-student']);
  }
}
