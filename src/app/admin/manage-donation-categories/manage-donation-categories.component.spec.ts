import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDonationCategoriesComponent } from './manage-donation-categories.component';

describe('ManageDonationCategoriesComponent', () => {
  let component: ManageDonationCategoriesComponent;
  let fixture: ComponentFixture<ManageDonationCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDonationCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDonationCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
