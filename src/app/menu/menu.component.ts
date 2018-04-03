import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
	fullImagePath: string;
	modalActions = new EventEmitter<string|MaterializeAction>();
  constructor() { 
  	this.fullImagePath = '/assets/images';
  }

  ngOnInit() {
  }


}
