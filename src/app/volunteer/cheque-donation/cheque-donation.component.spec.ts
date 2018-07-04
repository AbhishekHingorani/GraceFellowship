import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeDonationComponent } from './cheque-donation.component';

describe('ChequeDonationComponent', () => {
  let component: ChequeDonationComponent;
  let fixture: ComponentFixture<ChequeDonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeDonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
