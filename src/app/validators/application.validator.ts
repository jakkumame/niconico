import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function hiraganaValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    const hiraganaRegex = /^[ぁ-んー]*$/;

    if (value && !hiraganaRegex.test(value)) {
      return { 'hiraganaOnly': true };
    }
    return null;
  };
}
