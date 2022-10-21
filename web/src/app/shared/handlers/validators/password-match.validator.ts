import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Validate 2 given password to confirm a password.
 */
export default class PasswordValidation {
    static match(controlName: string, checkControlName: string): ValidatorFn {
        return (controls: AbstractControl) => {
            const control = controls.get(controlName);
            const checkControl = controls.get(checkControlName);

            if (checkControl?.errors && !checkControl?.errors['matching']) {
                return null;
            }

            if (control?.value !== checkControl?.value) {
                controls.get(checkControlName)?.setErrors({ matching: true });
                return { matching: true };
            } else {
                controls.get(checkControlName)?.setErrors(null);
                return null;
            }
        }
    }

    static notMatch(controlName: string, checkControlName: string): ValidatorFn {
        return (controls: AbstractControl) => {
            const control = controls.get(controlName);
            const checkControl = controls.get(checkControlName);

            if (checkControl?.errors && !checkControl?.errors['notmatching']) {
                return null;
            }

            if (control?.value === checkControl?.value) {
                controls.get(checkControlName)?.setErrors({ notmatching: true });
                return { notmatching: true };
            } else {
                return null;
            }
        }
    }
}
