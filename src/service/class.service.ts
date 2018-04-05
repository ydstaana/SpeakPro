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

}
