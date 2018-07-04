import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDonationComponent } from './general-donation.component';

describe('GeneralDonationComponent', () => {
  let component: GeneralDonationComponent;
  let fixture: ComponentFixture<GeneralDonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralDonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
