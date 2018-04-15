import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Sched } from '../model/sched';

@Injectable()
export class ClassService {
  private cart: any = undefined;

  constructor(private http: HttpClient) {

  }

  setCart(cart) {
    this.cart = cart;
  }

  getCart() {
    return this.cart;
  }

  getAvailableClasses() {
    return this.http.get('http://localhost:3000/classes/available').pipe();

  }

  addClass(classes: String[]) {
    const userId = JSON.parse(localStorage.getItem('loggedUser')).id;

    return this.http.post<String[]>(`http://localhost:3000/classes/student/${userId}`, classes)
      .pipe();
  }

  dropClasses(dropClasses: String[]) {
    const userId = JSON.parse(localStorage.getItem('loggedUser')).id;

    return this.http.request('post', `http://localhost:3000/classes/student/${userId}/drop`, { body: dropClasses })
      .pipe();
  }

  getAllClassesByTeacher(teacherId) {
    return this.http.get(`http://localhost:3000/classes/teacher/${teacherId}`)
      .pipe();
  }

  openClass(newClass) {
    return this.http.post('http://localhost:3000/classes', newClass)
      .pipe();
  }

  closeClass(classId) {
    return this.http.request('delete', `http://localhost:3000/classes/${classId}`)
      .pipe();
  }

  // deleteClass(classes: String[]){
  //   const userId = JSON.parse(localStorage.getItem('loggedUser'))._id;
  //   return this.http.post<String[]>(`http://localhost:3000/api/class/student/${userId}/drop`, classes)
  //     .pipe();
  // }

}
