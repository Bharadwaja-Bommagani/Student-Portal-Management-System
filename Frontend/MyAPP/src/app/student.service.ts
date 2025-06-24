import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Student } from '../Student';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

 constructor(private http: HttpClient) { }


      private baseUrl = 'http://localhost:9999/api/student/register'; 
          
          registerStudent(student: Object): Observable<Object> {
              return this.http.post(`${this.baseUrl}`, student);
          }

      
      private baseUrlStudentLogin = 'http://localhost:9999/api/student/login';

          loginStudent(credentials: any): Observable<any> {
            return this.http.post(`${this.baseUrlStudentLogin}`, credentials);
          }

      
      private baseUrlGetAdmin = 'http://localhost:9999/api/student/getByEmail';

            getStudentByEmail(email: string): Observable<Student> {
              return this.http.get<Student>(`${this.baseUrlGetAdmin}/${email}`);
            }

      
      private baseUrlUpdateStdDetails = 'http://localhost:9999/api/student/updateByEmail';

            updateStudentByEmail(email: string, student: any): Observable<any> {
                return this.http.put(`${this.baseUrlUpdateStdDetails}/${email}`, student);
            }

      
      private baseUrlChangePassword = 'http://localhost:9999/api/student/changePassword';

            changePassword(email: string, newPassword: string): Observable<any> {
              const payload = { email, newPassword };
              return this.http.put(`${this.baseUrlChangePassword}`, payload);
      }

      private baseUrlGetAllStudents = 'http://localhost:9999/api/student/getAll';
      
          getAllStudents(): Observable<Student[]> {
            return this.http.get<Student[]>(this.baseUrlGetAllStudents);
          }


      private baseUrlDeleteStudent = 'http://localhost:9999/api/student';
          deleteStudent(id: number) {
          return this.http.delete<{ message: string }>(`${this.baseUrlDeleteStudent}/delete/${id}`);
      }







  
  
  
  
  
  
  
  
  
}
