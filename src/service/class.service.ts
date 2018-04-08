import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Sched } from '../model/sched';

@Injectable()
export class ClassService {

  constructor(private http: HttpClient) {

  }

  getAvailableClasses(){
    return this.http.get<Sched[]>('http://localhost:3000/api/class/available')
      .pipe();
  }

  addClass(classes: String[]){
    const userId = JSON.parse(localStorage.getItem('loggedUser'))._id;

    return this.http.post<String[]>(`http://localhost:3000/api/class/student/${userId}`, classes)
      .pipe();
  }

  deleteClass(classes: String[]){
    return this.http.post<String[]>(`http://localhost:3000/api/class/student/${userId}/drop`, classes)
      .pipe();
  }

}
