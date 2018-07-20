import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrusteeReportsComponent } from './trustee-reports.component';

describe('TrusteeReportsComponent', () => {
  let component: TrusteeReportsComponent;
  let fixture: ComponentFixture<TrusteeReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrusteeReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrusteeReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
