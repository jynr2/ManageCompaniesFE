import { TestBed } from '@angular/core/testing';

import { IdentificationTypeServiceService } from './identification-type-service.service';

describe('IdentificationTypeServiceService', () => {
  let service: IdentificationTypeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentificationTypeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
