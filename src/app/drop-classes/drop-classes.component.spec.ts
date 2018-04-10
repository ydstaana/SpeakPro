import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropClassesComponent } from './drop-classes.component';

describe('DropClassesComponent', () => {
  let component: DropClassesComponent;
  let fixture: ComponentFixture<DropClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
