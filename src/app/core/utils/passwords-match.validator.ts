import { AbstractControl } from "@angular/forms";

export const passwordsMatchValidator = (formGroup: AbstractControl) => {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordDismatch: true };
}
