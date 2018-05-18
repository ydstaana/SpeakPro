import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ResetService {
  constructor(private http: HttpClient) { }


  resetPassword(token, password) {
    return this.http.post(`http://localhost:3000/users/reset_password`,
      { token: token, password: password }, { headers: this.getHeaders() });
  }

  getHeaders() {
    return new HttpHeaders({ 'Authorization': localStorage.getItem('token') });
  }
}
