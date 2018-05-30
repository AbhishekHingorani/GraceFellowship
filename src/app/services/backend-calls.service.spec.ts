import { TestBed, inject } from '@angular/core/testing';

import { BackendCallsService } from './backend-calls.service';

describe('BackendCallsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendCallsService]
    });
  });

  it('should be created', inject([BackendCallsService], (service: BackendCallsService) => {
    expect(service).toBeTruthy();
  }));
});
