import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailsManagerComponent } from './report-details-manager.component';

describe('ReportDetailsManagerComponent', () => {
  let component: ReportDetailsManagerComponent;
  let fixture: ComponentFixture<ReportDetailsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDetailsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetailsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
