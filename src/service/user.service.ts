import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { User } from '../model/user';
import { Sched } from '../model/sched';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  createUser(user: User) {
    return this.http.post<User>('http://localhost:3000/users', user)
      .pipe();
  }

  editProfile(formValue: User, username: String) {
    return this.http.put<User>(`http://localhost:3000/users/${username}`, formValue, { headers: this.getHeaders() })
      .pipe();
  }

  getEnrolledClass() {
    const userId = this.auth.decodeAccessToken(localStorage.getItem('token')).id;
    return this.http.get(`http://localhost:3000/classes/student/${userId}`, { headers: this.getHeaders() })
      .pipe();
  }

  login(credentials) {
    return this.http.post(`http://localhost:3000/users/login`, { username: credentials.username, password: credentials.password, })
      .pipe();
  }

  getAllUsers() {
    return this.http.get('http://localhost:3000/users', { headers: this.getHeaders() })
      .pipe();
  }

  getAllStudents() {
    return this.http.get('http://localhost:3000/students', { headers: this.getHeaders() })
      .pipe();
  }

  getAllTeachers() {
    return this.http.get('http://localhost:3000/teachers', { headers: this.getHeaders() })
      .pipe();
  }

  getUserByUsername(username) {
    return this.http.get(`http://localhost:3000/users/${username}`, { headers: this.getHeaders() })
      .pipe();
  }

  suspendUser(userId) {
    return this.http.post(`http://localhost:3000/admin/${userId}`, {}, { headers: this.getHeaders() })
      .pipe();
  }

  getAvailableMaterials() {
    return this.http.get('http://localhost:3000/files', { headers: this.getHeaders() })
      .pipe();
  }

  getAvailableMaterialsById(id) {
    return this.http.get(`http://localhost:3000/files/${id}`, { headers: this.getHeaders() })
      .pipe();
  }


  downloadFile(filename) {
    const httpOptions = { headers: this.getHeaders(), responseType: 'blob' as 'blob' }
    return this.http.get(`http://localhost:3000/download/${filename}`, httpOptions)
  }


  checkUsernameAvailability(username) {
    return this.http.get(`http://localhost:3000/users/${username}/availability`, { headers: this.getHeaders() })
      .pipe();
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': token });
  }
}

