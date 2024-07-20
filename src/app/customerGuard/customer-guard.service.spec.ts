import { TestBed } from '@angular/core/testing';

import { CustomerGuardService } from './customer-guard.service';

describe('CustomerGuardService', () => {
  let service: CustomerGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
