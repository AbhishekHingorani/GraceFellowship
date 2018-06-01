import { TestBed, inject } from '@angular/core/testing';

import { ReportDetailAuthguardService } from './report-detail-authguard.service';

describe('ReportDetailAuthguardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportDetailAuthguardService]
    });
  });

  it('should be created', inject([ReportDetailAuthguardService], (service: ReportDetailAuthguardService) => {
    expect(service).toBeTruthy();
  }));
});
