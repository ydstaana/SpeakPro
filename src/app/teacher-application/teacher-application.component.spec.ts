import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherApplicationComponent } from './teacher-application.component';

describe('TeacherApplicationComponent', () => {
  let component: TeacherApplicationComponent;
  let fixture: ComponentFixture<TeacherApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
