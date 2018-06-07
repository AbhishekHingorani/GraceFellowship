import { TestBed, inject } from '@angular/core/testing';

import { ReportDetailAuthguard  } from "./report-detail-authguard.service";

describe('ReportDetailAuthguard ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportDetailAuthguard ]
    });
  });

  it('should be created', inject([ReportDetailAuthguard ], (service: ReportDetailAuthguard ) => {
    expect(service).toBeTruthy();
  }));
});
