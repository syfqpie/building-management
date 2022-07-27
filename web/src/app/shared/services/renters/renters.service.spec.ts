import { TestBed } from '@angular/core/testing';

import { RentersService } from './renters.service';

describe('RentersService', () => {
  let service: RentersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
