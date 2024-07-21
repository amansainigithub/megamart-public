import { TestBed } from '@angular/core/testing';

import { SnackBarHelperService } from './snack-bar-helper.service';

describe('SnackBarHelperService', () => {
  let service: SnackBarHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackBarHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
