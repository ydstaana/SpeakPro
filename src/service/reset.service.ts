import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ResetService {
  constructor(private http: HttpClient) { }

  forgotPassword(username) {
    return this.http.post(`http://localhost:3000/users/lost_password`,
      { username: username }, { headers: this.getHeaders() });
  }
  resetPassword(token, password) {
    return this.http.post(`http://localhost:3000/users/reset_password`,
      { token: token, password: password }, { headers: this.getHeaders() });
  }

  getHeaders() {
    return new HttpHeaders({ 'Authorization': localStorage.getItem('token') });
  }
}
