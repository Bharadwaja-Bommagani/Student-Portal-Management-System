import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { Admin } from '../../../Admin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})



export class AdminDashboardComponent implements OnInit {
  admin: Admin | null = null;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    const email = localStorage.getItem('adminEmail');
    if (email) {
      this.adminService.getAdminByEmail(email).subscribe({
        next: (data: Admin) => {
          this.admin = data;
        },
        error: (err) => {
          console.error('Failed to fetch admin data', err);
        }
      });
    }
  }

  navigateToAddStudent(): void {
    this.router.navigate(['/register-student']);
  }

  navigateToViewStudents(): void {
    this.router.navigate(['/admin-view-students']);
  }

  logout(): void {
    localStorage.removeItem('adminEmail');
    this.router.navigate(['/login-admin']);
  }
}
