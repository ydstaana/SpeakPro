import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../model/user';
import { Sched } from '../model/sched';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post<User>('http://localhost:3000/api/user', user)
      .pipe();
  }

  editProfile(formValue: User, username: String) {
    return this.http.put<User>(`http://localhost:3000/api/user/${username}`, formValue)
      .pipe();
  }

  getEnrolledClass() {
    const userId = JSON.parse(localStorage.getItem('loggedUser'))._id;
    return this.http.get(`http://localhost:3000/api/class/student/${userId}`)
      .pipe();
  }

  login(credentials){
    return this.http.post(`http://localhost:3000/api/login`, { username: credentials.username, password: credentials.password,})
      .pipe();
  }
}

