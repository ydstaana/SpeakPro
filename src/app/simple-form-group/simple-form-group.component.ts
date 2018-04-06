import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ClassService } from '../../service/class.service';
import { Sched } from '../../model/sched';

@Component({
  selector: 'example-app',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div *ngFor ="let item of samp">
      	<input type="checkbox" formControlName = "{{item.id}}" id="{{item.id}}" (change)="setValue($event)"><label for="{{item.id}}">{{item.id}}</label>
      </div>
      <button type="submit">Submit</button>
   </form>
   <button (click)="setValue($event)">Set preset value</button>
  `,
})
export class SimpleFormGroupComponent {
 classes : Sched[];
 samp = [
 	{id : "1", teacher: "", available: true},
 	{id : "2", teacher: "", available: true},
 ];
 length = this.samp.length;

 sched = new Sched("kiw", "kiw", true);
 newForm = new FormGroup({});
  form = new FormGroup({
    first: new FormControl('false')
  });

  constructor(private classService: ClassService) { }

  ngOnInit() {
  	console.log(this.sched.timeSlot);
  	this.initializeComponents();
  	/*this.availableClasses();*/
  }

  get first(): any { return this.form.get('first'); }

  onSubmit(): void {
    console.log(this.form.value);  // {first: 'Nancy', last: 'Drew'}
  }

  initializeComponents(){
  	var i:number;
  	for(i = 0; i < this.length;i++){
  		this.form.addControl(this.samp[i].id, new FormControl('false'));
  		console.log(this.samp[i].id);	
  	}
 	
 }

  setValue(event) { this.form.setValue({first: event.currentTarget.checked}); }

  availableClasses(){
    this.classService.getAvailableClasses()
    .subscribe(
        data => {
          this.classes = data;
          this.length = this.classes.length;
          console.log(this.classes);
          console.log(this.length);
        },
        err => console.log(err)
      );
  }
}