import { TestBed } from '@angular/core/testing';

import { ProprietorsService } from './proprietors.service';

describe('ProprietorsService', () => {
  let service: ProprietorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProprietorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
