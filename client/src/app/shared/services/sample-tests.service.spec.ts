import { TestBed } from '@angular/core/testing';

import { SampleTestsService } from './sample-tests.service';

describe('SampleTestsService', () => {
  let service: SampleTestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleTestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
