import { TestBed, inject } from '@angular/core/testing';

import { TimeLogService } from './timelog.service';

describe('TimeLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeLogService]
    });
  });

  it('should be created', inject([TimeLogService], (service: TimeLogService) => {
    expect(service).toBeTruthy();
  }));
});
