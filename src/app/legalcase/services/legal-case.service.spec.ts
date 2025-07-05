import { TestBed } from '@angular/core/testing';

import { LegalCaseService } from './legal-case.service';

describe('LegalCaseService', () => {
  let service: LegalCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegalCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
