import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { appConfig } from '../app.config';

@Injectable()
export class PaymentService {
  ccRegex: any;
  ccProviders: any;

  constructor(private auth: AuthService, private http: HttpClient) {
    this.ccRegex = {
      'Visa': '^4[0-9]{12}(?:[0-9]{3})?$',
      'MasterCard': '^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$',
      'Discover': '^6(?:011|5[0-9]{2})[0-9]{12}$',
      'AMEX': '^3[47][0-9]{13}$',
      'Diners Club': '^3(?:0[0-5]|[68][0-9])[0-9]{11}$',
      'JCB': '^(?:2131|1800|35\\d{3})\\d{11}$'
    }

    this.ccProviders = [
      { type: 'Visa', icon: 'assets/images/visa.png' },
      { type: 'MasterCard', icon: 'assets/images/mastercard.png' },
      { type: 'Discover', icon: 'assets/images/discover.png' },
      { type: 'AMEX', icon: 'assets/images/amex.png' },
      { type: 'Diners Club', icon: 'assets/images/diners.png' },
      { type: 'JCB', icon: 'assets/images/jcb.png' },
    ];
  }

  checkout(data) {
    data.user = this.auth.decodeAccessToken(localStorage.getItem('token'));
    return this.http.post(`${appConfig.apiURL}/checkout`, data, { headers: this.getHeaders() })
      .pipe();
  }

  getCCProviders() {
    return this.ccProviders;
  }

  getCCRegex() {
    return this.ccRegex;
  }

  getCart() {
    const userId = this.auth.decodeAccessToken(localStorage.getItem('token')).id;
    return this.http.get(`${appConfig.apiURL}/cart/all-items/${userId}`, { headers: this.getHeaders() })
      .pipe();
  }

  removeItem(itemId) {
    return this.http.post(`${appConfig.apiURL}/cart/remove-item/${itemId}`, {}, { headers: this.getHeaders() })
      .pipe();
  }

  reserveClasses(id, classes) {
    return this.http.post(`${appConfig.apiURL}/cart/add-items`, { id: id, items: classes }, { headers: this.getHeaders() })
      .pipe();
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': token });
  }

}
