import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadMaterialsComponent } from './download-materials.component';

describe('DownloadMaterialsComponent', () => {
  let component: DownloadMaterialsComponent;
  let fixture: ComponentFixture<DownloadMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
