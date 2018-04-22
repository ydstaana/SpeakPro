import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Sched } from '../model/sched';

@Injectable()
export class UploadService {
  private cart: any = undefined;

  constructor(private http: HttpClient) {

  }


  uploadMaterials(formData) {
    const req = new HttpRequest('POST', `http://localhost:3000/uploads`,
      formData, { reportProgress: true, headers: this.getHeaders() });

    return this.http.request(req);
  }

  formatBytes(bytes) {
    if (bytes !== 0) {
      const k = 1024;
      const dm = 2;
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    return '0 B'
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': token });
  }

}
