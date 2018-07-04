import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SermonDetailComponent } from './sermon-detail.component';

describe('SermonDetailComponent', () => {
  let component: SermonDetailComponent;
  let fixture: ComponentFixture<SermonDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SermonDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SermonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
