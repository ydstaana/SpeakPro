import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Sched } from '../model/sched';
import { AuthService } from './auth.service';

@Injectable()
export class ClassService {
  private cart: any = [];

  constructor(private http: HttpClient, private auth: AuthService) {

  }

  setCart(cart) {
    this.cart = cart;
  }

  getCart() {
    return this.cart;
  }

  getAvailableClasses() {
    return this.http.get('http://localhost:3000/classes/available', { headers: this.getHeaders() }).pipe();

  }

  addClass(classes: Sched[]) {
    const userId = this.auth.decodeAccessToken(localStorage.getItem('token')).id;

    return this.http.post<Sched[]>(`http://localhost:3000/classes/student/${userId}`, classes, { headers: this.getHeaders() })
      .pipe();
  }

  dropClasses(dropClasses: String[]) {
    const userId = this.auth.decodeAccessToken(localStorage.getItem('token')).id;

    return this.http.request('post', `http://localhost:3000/classes/student/${userId}/drop`, { body: dropClasses, headers: this.getHeaders() })
      .pipe();
  }

  getAllClassesByTeacher(teacherId) {
    return this.http.get(`http://localhost:3000/classes/teacher/${teacherId}`, { headers: this.getHeaders() })
      .pipe();
  }

  getAllClassesOfTeacherByUsername(username) {
    return this.http.get(`http://localhost:3000/classes/teachers/${username}`, { headers: this.getHeaders() })
      .pipe();
  }

  openClass(newClass) {
    return this.http.request('post', 'http://localhost:3000/classes', { body: newClass, headers: this.getHeaders() })
      .pipe();
  }

  closeClass(selectedClass) {
    console.log(selectedClass);
    return this.http.request('delete', `http://localhost:3000/classes/${selectedClass._id}`,
      { headers: this.getHeaders(), body: { teacher: selectedClass.teacher, code: selectedClass.code, student: selectedClass.student } }).pipe();
  }


  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': token });
  }
}
