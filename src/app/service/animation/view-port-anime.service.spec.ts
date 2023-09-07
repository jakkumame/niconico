import { TestBed } from '@angular/core/testing';

import { ViewPortAnimeService } from './view-port-anime.service';

describe('ViewPortAnimeService', () => {
  let service: ViewPortAnimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewPortAnimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
