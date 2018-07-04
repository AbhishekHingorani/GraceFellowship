import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationManagerComponent } from './donation-manager.component';

describe('DonationManagerComponent', () => {
  let component: DonationManagerComponent;
  let fixture: ComponentFixture<DonationManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
