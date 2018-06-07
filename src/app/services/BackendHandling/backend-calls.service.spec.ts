import { TestBed, inject } from '@angular/core/testing';

import { BackEndCalls } from './backend-calls.service';

describe('BackendCalls ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackEndCalls ]
    });
  });

  it('should be created', inject([BackEndCalls ], (service: BackEndCalls ) => {
    expect(service).toBeTruthy();
  }));
});
