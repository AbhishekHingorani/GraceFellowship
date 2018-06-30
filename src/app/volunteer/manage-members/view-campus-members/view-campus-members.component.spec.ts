import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCampusMembersComponent } from './view-campus-members.component';

describe('ViewCampusMembersComponent', () => {
  let component: ViewCampusMembersComponent;
  let fixture: ComponentFixture<ViewCampusMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCampusMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCampusMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
