import { TestBed } from '@angular/core/testing';

import { UnitNumbersService } from './unit-numbers.service';

describe('UnitNumbersService', () => {
  let service: UnitNumbersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitNumbersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
