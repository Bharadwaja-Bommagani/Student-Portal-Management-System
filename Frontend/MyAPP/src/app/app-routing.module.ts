import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { StudentLoginComponent } from './auth/student-login/student-login.component';
import { AdminRegisterComponent } from './auth/admin-register/admin-register.component';
import { StudentRegisterComponent } from './auth/student-register/student-register.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './dashboard/student-dashboard/student-dashboard.component';

import { ChangePasswordStudentComponent } from './change-password-student/change-password-student.component';
import { UpdateStudentDetailsComponent } from './update-student-details/update-student-details.component';

import {AdminViewStudentsComponent} from './admin-view-students/admin-view-students.component';



const routes: Routes = [
{ path: '', component: LandingComponent },  // default route
  

{ path: 'register-admin', component: AdminRegisterComponent },
{ path: 'login-admin', component: AdminLoginComponent },


{ path: 'register-student', component: StudentRegisterComponent },
{ path: 'login-student', component: StudentLoginComponent },


{ path: 'admin-dashboard', component: AdminDashboardComponent },
{ path: 'student-dashboard', component: StudentDashboardComponent },

{ path: 'update-student-details', component: UpdateStudentDetailsComponent },


{ path: 'change-password-student', component: ChangePasswordStudentComponent },

{ path: 'admin-view-students', component: AdminViewStudentsComponent }



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
