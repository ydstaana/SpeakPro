import { Component, OnInit } from '@angular/core';
import { UserService } from './../../service/user.service';
import {Observable} from 'rxjs/Rx';
import { Sched } from './../../model/sched';

@Component({
  selector: 'app-add-classes',
  templateUrl: './add-classes.component.html',
  styleUrls: ['./add-classes.component.css'],
  providers:[UserService]
})
export class AddClassesComponent implements OnInit {
	/*TO DO
	-api call to get list of available classes
	-api call to add checked classes */
  classes :Sched[];

  constructor(private userService: UserService) { }

  ngOnInit() {
  	this.availableClasses();
  }

  availableClasses(){
    this.userService.getAvailableClasses()
    .subscribe(
        data => {
          this.classes = data;
        },
        err => console.log(err)
      );
  }

}
