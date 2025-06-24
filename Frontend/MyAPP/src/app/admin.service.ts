import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../Admin';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  private baseUrl = 'http://localhost:9999/api/admin/register';

    constructor(private http: HttpClient) {}

    registerAdmin(admin: Admin): Observable<any> {
      return this.http.post(`${this.baseUrl}`, admin);
    }


  private baseUrllogin = 'http://localhost:9999/api/admin/login';

    loginAdmin(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrllogin}`, credentials);
  }


  private baseUrlGetAdmin = 'http://localhost:9999/api/admin/getByEmail';

    getAdminByEmail(email: string): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrlGetAdmin}/${email}`);
  }



}
