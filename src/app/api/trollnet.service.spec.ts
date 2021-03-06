import { TestBed } from '@angular/core/testing';

import { TrollnetService } from './trollnet.service';

describe('TrollnetService', () => {
  let service: TrollnetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrollnetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
