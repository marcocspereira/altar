import { TestBed } from '@angular/core/testing';

import { CodeManagerService } from './code-manager.service';

describe('CodeManagerService', () => {
  let service: CodeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
