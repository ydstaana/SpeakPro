import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleFormGroupComponent } from './simple-form-group.component';

describe('SimpleFormGroupComponent', () => {
  let component: SimpleFormGroupComponent;
  let fixture: ComponentFixture<SimpleFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
