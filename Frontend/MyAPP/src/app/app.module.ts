import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { LandingComponent } from './landing/landing.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { StudentLoginComponent } from './auth/student-login/student-login.component';
import { AdminRegisterComponent } from './auth/admin-register/admin-register.component';
import { StudentRegisterComponent } from './auth/student-register/student-register.component';
import { UpdateStudentDetailsComponent } from './update-student-details/update-student-details.component';
import { ChangePasswordStudentComponent } from './change-password-student/change-password-student.component';


@NgModule({
  
  declarations: [
    AppComponent,
    
    LandingComponent,
    AdminLoginComponent,
    StudentLoginComponent,
    AdminRegisterComponent,
    StudentRegisterComponent,
    UpdateStudentDetailsComponent,
    ChangePasswordStudentComponent,
    
 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
