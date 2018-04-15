import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { User } from '../model/user';
import { Sched } from '../model/sched';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post<User>('http://localhost:3000/users', user)
      .pipe();
  }

  editProfile(formValue: User, username: String) {
    return this.http.put<User>(`http://localhost:3000/users/${username}`, formValue)
      .pipe();
  }

  getEnrolledClass() {
    const userId = JSON.parse(localStorage.getItem('loggedUser')).id;
    return this.http.get(`http://localhost:3000/classes/student/${userId}`)
      .pipe();
  }

  login(credentials) {
    return this.http.post(`http://localhost:3000/users/login`, { username: credentials.username, password: credentials.password, })
      .pipe();
  }

  getDecodedAccessToken(token: string) {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  getAllUsers() {
    return this.http.get('http://localhost:3000/users')
      .pipe();
  }

  getAllStudents() {
    return this.http.get('http://localhost:3000/students')
      .pipe();
  }

  getAllTeachers() {
    return this.http.get('http://localhost:3000/teachers')
      .pipe();
  }

  getUserById(userId) {
    return this.http.get(`http://localhost:3000/users/${userId}`)
      .pipe();
  }

  suspendUser(userId) {
    return this.http.post(`http://localhost:3000/admin/${userId}`, {})
      .pipe();
  }
}

