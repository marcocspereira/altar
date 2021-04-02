import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PatternValidators {
  static alphanumeric(control: AbstractControl): ValidationErrors | null {
    if (control.value.match(/^[0-9a-zA-Z]+$/)) {
      return null;
    }
    return { invalidAlphanumeric: true };
  }

  static alphabetical(control: AbstractControl): ValidationErrors | null {
    if (control.value.match(/^[a-z]?$/)) {
      return null;
    }
    return { invalidAlphabetical: true };
  }

  static numeric(control: AbstractControl): ValidationErrors | null {
    if (control.value.match(/^[0-9]+$/)) {
      return null;
    }
    return { invalidNumeric: true };
  }
}
