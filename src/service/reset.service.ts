import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from '../app.config';

@Injectable()
export class ResetService {
  constructor(private http: HttpClient) { }

  forgotPassword(data) {
    return this.http.post(`${appConfig.apiURL}/users/lost_password`, data).pipe();
  }

  resetPassword(token, password) {
    return this.http.post(`${appConfig.apiURL}/users/reset_password`, { token: token, password: password }).pipe();
  }

  confirmUser(id, token){
    return this.http.post(`${appConfig.apiURL}/users/confirm_email`, { id: id, token: token }).pipe();
  }
}
