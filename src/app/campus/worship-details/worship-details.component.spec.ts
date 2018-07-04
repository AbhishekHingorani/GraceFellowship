import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorshipDetailsComponent } from './worship-details.component';

describe('WorshipDetailsComponent', () => {
  let component: WorshipDetailsComponent;
  let fixture: ComponentFixture<WorshipDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorshipDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorshipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
