import { TestBed } from '@angular/core/testing';

import { PracticeTestsService } from '../shared/services/practice-tests.service';

describe('PracticeTestsService', () => {
  let service: PracticeTestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticeTestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
