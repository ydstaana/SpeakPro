import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient){}
  createUser(user: User){
    return this.http.post<User>('http://localhost:3000/api/user', user)
      .pipe();
  }
}
