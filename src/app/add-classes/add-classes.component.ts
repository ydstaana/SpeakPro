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

  constructor(private classService: ClassService) { }

  ngOnInit() {
  	this.availableClasses();
  }

  availableClasses(){
    this.classService.getAvailableClasses()
    .subscribe(
        data => {
          this.classes = data;
        },
        err => console.log(err)
      );
  }

}
