import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { catchError, retry } from 'rxjs/operators'
import { User } from '../interface/user'
import { Employee } from '../interface/employee';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  baseUrl: string = 'https://sakibapi.onrender.com'
  // baseUrl: string = 'http://localhost:8081'
  constructor(private http: HttpClient) { }
  // token
  setToken(token: string) {
    localStorage.setItem("token", token)
  }
  getToken() {
    return localStorage.getItem('token') || ''
  }
  logOut() {
    localStorage.clear()
  }
  isLogin() {
    if (localStorage.getItem('token') != null) {
      return true
    }
    return false
  }
  // User Data
  setUser(user: Object) {
    localStorage.setItem('user', JSON.stringify(user))
  }
  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}')
  }
  // API's
  // User
  register(data: object) {
    return this.http.post<User>(this.baseUrl + '/api/auth/register', data)
  }
  login(data: object) {
    return this.http.post<User>(this.baseUrl + '/api/auth/login', data)
  }
  // CRUD
  getEmployees() {
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', this.getToken())
    return this.http.get<Employee[]>(this.baseUrl + '/api/employee', { headers: headers })
  }
  getEmployee(emp_id: string) {
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', this.getToken())
    return this.http.get<Employee>(this.baseUrl + '/api/employee/' + emp_id, { headers: headers })
  }
  addEmployees(data: Object) {
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', this.getToken())
    return this.http.post<Employee>(this.baseUrl + '/api/employee', data, { headers: headers })
  }
  updateEmployees(emp_id: string, data: Object) {
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', this.getToken())
    return this.http.put<Employee>(this.baseUrl + '/api/employee/' + emp_id, data, { headers: headers })
  }
  deleteEmployees(emp_id: string) {
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', this.getToken())
    return this.http.delete<Employee>(this.baseUrl + '/api/employee/' + emp_id, { headers: headers })
  }

}
