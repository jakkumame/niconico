import { TestBed } from '@angular/core/testing';

import { RealtimebaseService } from './realtimebase.service';

describe('RealtimebaseService', () => {
  let service: RealtimebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
