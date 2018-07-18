import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { User } from '../model/user';
import { Sched } from '../model/sched';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { appConfig } from '../app.config';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  createUser(user: User) {
    return this.http.post<User>(`${appConfig.apiURL}/users`, user)
      .pipe();
  }

  editProfile(formValue: User, username: String) {
    return this.http.put<User>(`${appConfig.apiURL}/users/${username}`, formValue, { headers: this.getHeaders() })
      .pipe();
  }

  getEnrolledClass() {
    const userId = this.auth.decodeAccessToken(localStorage.getItem('token')).id;
    return this.http.get(`${appConfig.apiURL}/classes/student/${userId}`, { headers: this.getHeaders() })
      .pipe();
  }

  login(credentials) {
    return this.http.post(`${appConfig.apiURL}/users/login`, { username: credentials.username, password: credentials.password, })
      .pipe();
  }

  getAllUsers() {
    return this.http.get(`${appConfig.apiURL}/users`, { headers: this.getHeaders() })
      .pipe();
  }

  getAllStudents() {
    return this.http.get(`${appConfig.apiURL}/students`, { headers: this.getHeaders() })
      .pipe();
  }

  getAllTeachers() {
    return this.http.get(`${appConfig.apiURL}/teachers`, { headers: this.getHeaders() })
      .pipe();
  }

  getUserByUsername(username) {
    return this.http.get(`${appConfig.apiURL}/users/${username}`, { headers: this.getHeaders() })
      .pipe();
  }

  suspendUser(userId) {
    return this.http.post(`${appConfig.apiURL}/admin/${userId}`, {}, { headers: this.getHeaders() })
      .pipe();
  }

  getAvailableMaterials() {
    return this.http.get(`${appConfig.apiURL}/files`, { headers: this.getHeaders() })
      .pipe();
  }

  getAvailableMaterialsById(id) {
    return this.http.get(`${appConfig.apiURL}/files/${id}`, { headers: this.getHeaders() })
      .pipe();
  }


  downloadFile(filename) {
    const httpOptions = { headers: this.getHeaders(), responseType: 'blob' as 'blob' }
    return this.http.get(`${appConfig.apiURL}/download/${filename}`, httpOptions)
  }


  checkUsernameAvailability(username) {
    return this.http.get(`${appConfig.apiURL}/users/${username}/availability`)
      .pipe();
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': token });
  }
}

