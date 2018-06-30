import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampusMemberComponent } from './add-campus-member.component';

describe('AddCampusMemberComponent', () => {
  let component: AddCampusMemberComponent;
  let fixture: ComponentFixture<AddCampusMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCampusMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCampusMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
