import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesByTeacherComponent } from './classes-by-teacher.component';

describe('ClassesByTeacherComponent', () => {
  let component: ClassesByTeacherComponent;
  let fixture: ComponentFixture<ClassesByTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesByTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesByTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
