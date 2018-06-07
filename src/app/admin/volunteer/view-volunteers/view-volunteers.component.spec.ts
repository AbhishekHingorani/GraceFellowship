import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVolunteersComponent } from './view-volunteers.component';

describe('ViewVolunteersComponent', () => {
  let component: ViewVolunteersComponent;
  let fixture: ComponentFixture<ViewVolunteersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVolunteersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
