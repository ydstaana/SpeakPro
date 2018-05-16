import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { toast } from 'angular2-materialize';

@Injectable()
export class AuthService {
  timeslots: any[];
  days: any;

  constructor(private http: HttpClient) { }

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
      toast('Something went wrong. Please try logging in again.', 2000);
      return null;
    }
  }

  getHeaders() {
    return new HttpHeaders({ 'Authorization': this.getUserToken() });
  }

  getUserToken() {
    return localStorage.getItem('token');
  }

}
