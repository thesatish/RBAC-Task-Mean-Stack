import { TestBed } from '@angular/core/testing';

import { AllApisService } from './all-apis.service';

describe('AllApisService', () => {
  let service: AllApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
