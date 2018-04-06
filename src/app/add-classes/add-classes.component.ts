import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Sched } from './../../model/sched';
import { ClassService } from '../../service/class.service';


@Component({
  selector: 'app-add-classes',
  templateUrl: './add-classes.component.html',
  styleUrls: ['./add-classes.component.css'],
  providers:[ClassService]
})
export class AddClassesComponent implements OnInit {
	/*TO DO
	-api call to get list of available classes
	-api call to add checked classes */
  classes :Sched[];
  classString = ["5ac37eda2cbcd311f028a748", "5ac37f042cbcd311f028a749"];

  constructor(private classService: ClassService) { }

  ngOnInit() {
  	this.availableClasses();
  }

  availableClasses(){
    this.classService.getAvailableClasses()
    .subscribe(
        data => {
          this.classes = data;
          console.log(this.classes);
        },
        err => console.log(err)
      );
  }

  clicked(event){
    console.log(event.currentTarget.value);
  }

  sendArray(){
    this.classService.addClass(this.classString)
    .subscribe(
      data => {
        console.log("Success");
      },
      err => console.log(err)
    );
  }

}
