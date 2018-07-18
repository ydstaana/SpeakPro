import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Sched } from '../model/sched';
import { appConfig } from '../app.config';

@Injectable()
export class UploadService {
  private cart: any = undefined;

  constructor(private http: HttpClient) {}

  uploadMaterials(formData, authorId) {
    const req = new HttpRequest('POST', `${appConfig.apiURL}/uploads`,
      formData, { reportProgress: true, headers: this.getHeadersWithAuthorId(authorId) });

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

  getHeadersWithAuthorId(authorId){
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': token, 'author': authorId });
  }

}
