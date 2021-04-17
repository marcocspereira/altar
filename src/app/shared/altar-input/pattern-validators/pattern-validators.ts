import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Class created just for exercise puprose, since angular already provides
 * the pattern validator that could fit the requirement.
 */
export class PatternValidators {
  /**
   * Validates if received control is valid against an alphanumeric validation.
   * @param control The control to validate.
   * @returns The control validation errors; null otherwise.
   */
  static alphanumeric(control: AbstractControl): ValidationErrors | null {
    if (control.value.match(/^[0-9a-zA-Z]+$/)) {
      return null;
    }
    return { invalidAlphanumeric: true };
  }

  /**
   * Validates if received control is valid against an alphabetical validation.
   * @param control The control to validate.
   * @returns The control validation errors; null otherwise.
   */
  static alphabetical(control: AbstractControl): ValidationErrors | null {
    if (control.value.match(/^[a-z]?$/)) {
      return null;
    }
    return { invalidAlphabetical: true };
  }

  /**
   * Validates if received control is valid against a numeric validation.
   * @param control The control to validate.
   * @returns The control validation errors; null otherwise.
   */
  static numeric(control: AbstractControl): ValidationErrors | null {
    if (control.value.match(/^[0-9]+$/)) {
      return null;
    }
    return { invalidNumeric: true };
  }
}
