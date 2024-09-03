import { TestBed } from '@angular/core/testing';

import { LiensService } from './liens.service';

describe('LiensService', () => {
  let service: LiensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
