import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Sched } from './../../model/sched';
import { ClassService } from '../../service/class.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';


@Component({
  selector: 'app-add-classes',
  templateUrl: './add-classes.component.html',
  styleUrls: ['./add-classes.component.css'],
  providers: [ClassService]
})
export class AddClassesComponent implements OnInit {
  classes: Sched[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private classService: ClassService) {
    this.createForm();
  }

  ngOnInit() {
    this.availableClasses();
  }

  availableClasses() {
    this.classService.getAvailableClasses()
      .subscribe(
      data => {
        this.classes = data;
        this.rebuildForm();
      },
      err => console.log(err)
      );
  }

  clicked(event) {
    console.log(event.currentTarget.value);
  }

  ngOnChanges(){
    // this.rebuildForm();
  }

  createForm() {
    this.form = this.fb.group({
      selectedClasses: this.fb.array([
      ])
    });
  }

  get selectedClasses(): FormArray {
    return this.form.get('selectedClasses') as FormArray;
  };

  setClasses(classes: Sched[]){
    const classesFGs = classes.map(el => this.fb.group(el));
    const classesFormArray = this.fb.array(classesFGs);
    this.form.setControl('selectedClasses', classesFormArray)
  }

  rebuildForm(){
    this.setClasses(this.classes);
  }

  // sendArray(){
  //   this.classService.addClass(this.classString)
  //   .subscribe(
  //     data => {
  //       console.log("Success");
  //     },
  //     err => console.log(err)
  //   );
  // }

}
