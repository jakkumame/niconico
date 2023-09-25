import { TestBed } from '@angular/core/testing';

import { AppFormAlertService } from './app-form-alert.service';

describe('AppFormAlertService', () => {
  let service: AppFormAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppFormAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
