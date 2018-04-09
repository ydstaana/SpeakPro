import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Sched } from '../model/sched';

@Injectable()
export class ClassService {

  constructor(private http: HttpClient) {

  }

  getAvailableClasses() {
    return this.http.get<Sched[]>('http://localhost:3000/api/class/available')
      .pipe();
  }

  addClass(classes: String[]) {
    const userId = JSON.parse(localStorage.getItem('loggedUser'))._id;

    return this.http.post<String[]>(`http://localhost:3000/api/class/student/${userId}`, classes)
      .pipe();
  }

  dropClasses(dropClasses: String[]) {
    const userId = JSON.parse(localStorage.getItem('loggedUser'))._id;

    return this.http.request('post', `http://localhost:3000/api/class/student/${userId}/drop`, { body: dropClasses })
      .pipe();
  }

  getAllClassesByTeacher(teacherId) {
    return this.http.get(`http://localhost:3000/api/class/teacher/${teacherId}`)
      .pipe();
  }

  openClass(newClass) {
    return this.http.post('http://localhost:3000/api/class', newClass)
      .pipe();
  }

  closeClass(classId) {
    return this.http.request('delete', `http://localhost:3000/api/class/${classId}`)
      .pipe();
  }

  // deleteClass(classes: String[]){
  //   const userId = JSON.parse(localStorage.getItem('loggedUser'))._id;
  //   return this.http.post<String[]>(`http://localhost:3000/api/class/student/${userId}/drop`, classes)
  //     .pipe();
  // }

}
