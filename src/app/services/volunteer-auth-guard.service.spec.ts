import { TestBed, inject } from '@angular/core/testing';

import { VolunteerAuthGuardService } from './volunteer-auth-guard.service';

describe('VolunteerAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VolunteerAuthGuardService]
    });
  });

  it('should be created', inject([VolunteerAuthGuardService], (service: VolunteerAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
