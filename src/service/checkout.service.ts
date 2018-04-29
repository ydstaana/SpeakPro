import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CheckoutService {

  constructor(private http: HttpClient) { }

  checkoutClasses(data){
  	return this.http.post(`http://localhost:3000/checkout`, data, { headers: this.getHeaders() })
      .pipe();
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': token });
  }

}
