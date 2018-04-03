import { Component } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';
import { EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	fullImagePath: string;
  	title = 'app';
  	modalActions = new EventEmitter<string|MaterializeAction>();
    showMenu = false;
    showFooter = false;
  constructor(router : Router){
  	this.fullImagePath = '/assets/images';

    //Check if the menu (navbar) or footer should be shown
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
          this.showMenu = event.url !== "/student-profile";
          this.showFooter = event.url !== "/student-profile";
      }
    });
    	
  }

}
