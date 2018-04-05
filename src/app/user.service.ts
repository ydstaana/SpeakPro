import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http) { 

  }

  getAvailableClasses() {
	return new Promise((resolve, reject) => {
	  this.http.get('/api/class/available')
	    .map(res => res.json())
	    .subscribe(res => {
	      resolve(res);
	    }, (err) => {
	      reject(err);
	    });
	});
	}

}
