import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { toast } from 'angular2-materialize';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  timeslots: any[];
  days: any;

  constructor(private http: HttpClient, private router: Router) { }


  getUserCreds() {
    const user = this.decodeAccessToken(this.getUserToken());
    return this.http.get(`http://localhost:3000/users/${user.username}`, { headers: this.getHeaders() })
      .pipe();
  }

  getUserId() {
    const user = this.decodeAccessToken(this.getUserToken());
    if (user) return user.id;
  }

  decodeAccessToken(token: string) {
    try { return jwt_decode(token); }
    catch (e) {
      return null;
    }
  }

  confirmPassword(credentials) {
    return this.http.post(`http://localhost:3000/users/confirm_password`, { username: credentials.username, password: credentials.password, })
      .pipe();
  }

  getHeaders() {
    return new HttpHeaders({ 'Authorization': this.getUserToken() });
  }

  getUserToken() {
    return localStorage.getItem('token');
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

}
