import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusMembersManagerComponent } from './campus-members-manager.component';

describe('CampusMembersManagerComponent', () => {
  let component: CampusMembersManagerComponent;
  let fixture: ComponentFixture<CampusMembersManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusMembersManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusMembersManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
