import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitheDonationComponent } from './tithe-donation.component';

describe('TitheDonationComponent', () => {
  let component: TitheDonationComponent;
  let fixture: ComponentFixture<TitheDonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitheDonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitheDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
