import { TestBed } from '@angular/core/testing';

import { UnitNumberService } from './unit-number.service';

describe('UnitNumberService', () => {
  let service: UnitNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
