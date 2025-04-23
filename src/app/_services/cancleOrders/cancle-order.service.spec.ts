import { TestBed } from '@angular/core/testing';

import { CancleOrderService } from './cancle-order.service';

describe('CancleOrderService', () => {
  let service: CancleOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CancleOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
