import { TestBed } from '@angular/core/testing';

import { CryptoInfoService } from './crypto-info.service';

describe('CryptoInfoService', () => {
  let service: CryptoInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
