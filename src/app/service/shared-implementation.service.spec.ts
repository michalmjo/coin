import { TestBed } from '@angular/core/testing';

import { SharedImplementationService } from './shared-implementation.service';

describe('SharedImplementationService', () => {
  let service: SharedImplementationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedImplementationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
