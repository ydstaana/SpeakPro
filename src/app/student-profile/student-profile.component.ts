import { Component, OnInit } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
	hovered = false;
  selectedIndex = null;
  products = [];
  codes = [
    {time : "5:00 - 5:30" , code: 1},
    {time : "5:00 - 5:30" , code: 2},
    {time : "5:00 - 5:30" , code: 3},
    {time : "5:00 - 5:30" , code: 4},
    {time : "5:00 - 5:30" , code: 5},



    {time : "5:30 - 6:00" , code: 6},
    {time : "5:30 - 6:00" , code: 7},
    {time : "5:30 - 6:00" , code: 8},
    {time : "5:30 - 6:00" , code: 9},
    {time : "5:30 - 6:00" , code: 10},

    {time : "6:00 - 6:30" , code: 11},
    {time : "6:00 - 6:30" , code: 12},
    {time : "6:00 - 6:30" , code: 13},
    {time : "6:00 - 6:30" , code: 14},
    {time : "6:00 - 6:30" , code: 15},

    {time : "6:30 - 7:00" , code: 16},
    {time : "6:30 - 7:00" , code: 17},
    {time : "6:30 - 7:00" , code: 18},
    {time : "6:30 - 7:00" , code: 19},
    {time : "6:30 - 7:00" , code: 20},

    {time : "7:00 - 7:30" , code: 21},
    {time : "7:00 - 7:30" , code: 22},
    {time : "7:00 - 7:30" , code: 23},
    {time : "7:00 - 7:30" , code: 24},
    {time : "7:00 - 7:30" , code: 25},


    {time : "7:30 - 8:00" , code: 26},
    {time : "7:30 - 8:00" , code: 27},
    {time : "7:30 - 8:00" , code: 28},
    {time : "7:30 - 8:00" , code: 29},
    {time : "7:30 - 8:00" , code: 30},

    {time : "8:00 - 8:30" , code: 31},
    {time : "8:00 - 8:30" , code: 32},
    {time : "8:00 - 8:30" , code: 33},
    {time : "8:00 - 8:30" , code: 34},
    {time : "8:00 - 8:30" , code: 35},

    {time : "8:30 - 9:00" , code: 36},
    {time : "8:30 - 9:00" , code: 37},
    {time : "8:30 - 9:00" , code: 38},
    {time : "8:30 - 9:00" , code: 39},
    {time : "8:30 - 9:00" , code: 40},

    {time : "9:00 - 9:30" , code: 41},
    {time : "9:00 - 9:30" , code: 42},
    {time : "9:00 - 9:30" , code: 43},
    {time : "9:00 - 9:30" , code: 44},
    {time : "9:00 - 9:30" , code: 45},

    {time : "9:30 - 10:00" , code: 46},
    {time : "9:30 - 10:00" , code: 47},
    {time : "9:30 - 10:00" , code: 48},
    {time : "9:30 - 10:00" , code: 49},
    {time : "9:30 - 10:00" , code: 50},

    {time : "10:00 - 10:30" , code: 51},
    {time : "10:00 - 10:30" , code: 52},
    {time : "10:00 - 10:30" , code: 53},
    {time : "10:00 - 10:30" , code: 54},
    {time : "10:00 - 10:30" , code: 55},

    {time : "10:30 - 11:00" , code: 56},
    {time : "10:30 - 11:00" , code: 57},
    {time : "10:30 - 11:00" , code: 58},
    {time : "10:30 - 11:00" , code: 59},
    {time : "10:30 - 11:00" , code: 60},

    {time : "11:00 - 11:30" , code: 61},
    {time : "11:00 - 11:30" , code: 62},
    {time : "11:00 - 11:30" , code: 63},
    {time : "11:00 - 11:30" , code: 64},
    {time : "11:00 - 11:30" , code: 65},

    {time : "11:30 - 12:00" , code: 66},
    {time : "11:30 - 12:00" , code: 67},
    {time : "11:30 - 12:00" , code: 68},
    {time : "11:30 - 12:00" , code: 69},
    {time : "11:30 - 12:00" , code: 70}

   /* time : "12:00 - 12:30" , code: 1,
    time : "12:30 - 6:00" , code: 1,
    time : "5:00 - 5:30" , code: 1,
    time : "5:30 - 6:00" , code: 1,*/
  ];

  

  constructor() { 
     this.products=['laptop','computer','keyboard'];
    }

  ngOnInit() {
  }

  cellClicked(event){
  	console.log(event.currentTarget.title);
  }

  click(event){
    this.selectedIndex = event.currentTarget.getAttribute('dataValue')
    console.log(this.selectedIndex);
  }



}
