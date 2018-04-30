import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PaymentService {

  constructor(private http: HttpClient) { }

  checkout(token) {
    return this.http.post('http://localhost:3000/checkout', token, { headers: this.getHeaders() })
      .pipe();
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': token });
  }

}
