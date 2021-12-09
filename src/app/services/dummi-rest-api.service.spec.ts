import { TestBed } from '@angular/core/testing';

import { DummiRestApiService } from './dummi-rest-api.service';

describe('DummiRestApiService', () => {
  let service: DummiRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummiRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
