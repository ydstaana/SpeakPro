import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class PaymentService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  checkout(data) {
    data.user = this.auth.decodeAccessToken(localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/checkout', data, { headers: this.getHeaders() })
      .pipe();
  }

  getCart(){
    const userId = this.auth.decodeAccessToken(localStorage.getItem('token')).id;
    return this.http.get(`http://localhost:3000/cart/all-items/${userId}`, { headers: this.getHeaders() })
      .pipe();
  }

  removeItem(itemId){
    return this.http.post(`http://localhost:3000/cart/remove-item/${itemId}`, {}, { headers: this.getHeaders() })
      .pipe();
  }

  reserveClasses(id, classes){
    return this.http.post('http://localhost:3000/cart/add-items', { id: id, items: classes }, { headers: this.getHeaders() })
      .pipe();
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': token });
  }

}
