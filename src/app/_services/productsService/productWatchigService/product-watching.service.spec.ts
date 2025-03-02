import { TestBed } from '@angular/core/testing';

import { ProductWatchingService } from './product-watching.service';

describe('ProductWatchingService', () => {
  let service: ProductWatchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductWatchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
