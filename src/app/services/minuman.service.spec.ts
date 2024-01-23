import { TestBed } from '@angular/core/testing';

import { MinumanService } from './minuman.service';

describe('MinumanService', () => {
  let service: MinumanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinumanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
