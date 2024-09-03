import { TestBed } from '@angular/core/testing';

import { LanguesService } from './langues.service';

describe('LanguesService', () => {
  let service: LanguesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
