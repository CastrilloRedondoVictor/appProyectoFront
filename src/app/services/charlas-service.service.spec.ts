import { TestBed } from '@angular/core/testing';

import { CharlasServiceService } from './charlas-service.service';

describe('CharlasServiceService', () => {
  let service: CharlasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharlasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
