import { TestBed } from '@angular/core/testing';

import { FunctionsApiService } from './functions-api.service';

describe('FunctionsApiService', () => {
  let service: FunctionsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
