import { TestBed } from '@angular/core/testing';

import { ProductSService } from './product-s.service';

describe('ProductSService', () => {
  let service: ProductSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
