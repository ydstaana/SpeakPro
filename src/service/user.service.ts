import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Sched } from '../model/sched';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: HttpClient){}

  createUser(user: User){
    return this.http.post<User>('http://localhost:3000/api/user', user)
      .pipe();
  }

  getAvailableClasses(){
  	return this.http.get<Sched[]>('http://localhost:3000/api/class/available');
  }


}
