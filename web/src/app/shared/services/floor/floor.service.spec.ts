import { TestBed } from '@angular/core/testing';

import { FloorsService } from './floor.service';

describe('FloorsService', () => {
  let service: FloorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
