import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndingDetailsComponent } from './ending-details.component';

describe('EndingDetailsComponent', () => {
  let component: EndingDetailsComponent;
  let fixture: ComponentFixture<EndingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
