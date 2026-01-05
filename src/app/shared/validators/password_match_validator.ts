import { AbstractControl } from '@angular/forms';

export const PasswordsMatchValidator = (
  passwordControlName: string,
  confirmPasswordControlName: string
) => {
  const validator = (form: AbstractControl) => {
    const passwordControl = form.get(passwordControlName);
    const confirmPasswordControl = form.get(confirmPasswordControlName);

    if (!passwordControl || !confirmPasswordControl) return;

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ notMatch: true });
    } else {
      const errors = confirmPasswordControl.errors;
      if (!errors) return;

      delete errors['notMatch'];
      confirmPasswordControl.setErrors(
        Object.keys(errors).length === 0 ? null : errors
      );
    }
  };
  return validator;
};
