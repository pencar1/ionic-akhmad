import { TestBed } from '@angular/core/testing';

import { MakananService } from './makanan.service';

describe('MakananService', () => {
  let service: MakananService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakananService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
