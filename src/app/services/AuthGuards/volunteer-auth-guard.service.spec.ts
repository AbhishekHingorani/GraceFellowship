import { TestBed, inject } from '@angular/core/testing';

import { VolunteerAuthGuard } from './volunteer-auth-guard.service';

describe('VolunteerAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VolunteerAuthGuard]
    });
  });

  it('should be created', inject([VolunteerAuthGuard], (service: VolunteerAuthGuard) => {
    expect(service).toBeTruthy();
  }));
});
