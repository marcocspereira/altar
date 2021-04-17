import { TestBed } from '@angular/core/testing';
import { PatternValidators } from './pattern-validators';

describe('AcademicInputValidation', () => {
  let service: PatternValidators;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatternValidators);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
