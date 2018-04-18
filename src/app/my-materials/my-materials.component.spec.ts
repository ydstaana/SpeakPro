import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMaterialsComponent } from './my-materials.component';

describe('MyMaterialsComponent', () => {
  let component: MyMaterialsComponent;
  let fixture: ComponentFixture<MyMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
