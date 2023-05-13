import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as libphonenumber from 'libphonenumber-js';

export class CustomValidators {

  public static phoneValidator(AbstractControl: AbstractControl<string>): ValidationErrors | null {
    const value = AbstractControl.value
    if (value == '' || RegExp(/ /).test(value)) return { textEmpty: true }
    if (RegExp(/^[0-9]{10}$/).test(value)) AbstractControl.setValue(libphonenumber.formatNumber(value, 'EC', 'INTERNATIONAL').replace(/ /g, ''));
    if (RegExp(/^[+]{1}[0-9]{12}$/).test(value) && libphonenumber.isValidPhoneNumber(value)) return null;
    else return { notIsValidPhoneNumber: true }
  }

  public static passwordValidator(AbstractControl: AbstractControl<string>): ValidationErrors | null {
    const value = AbstractControl.value
    if (value == '' || RegExp(/ /).test(value)) return { textEmpty: true }

    const pwd_low = RegExp(/([a-zA-Z0-9]){8,}/).test(value) // Password lvl 1
    const pwd_medium = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).test(value);// Password lvl 2
    const pwd_hard = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(value); // Password lvl 3

    if (pwd_low) Object.assign(AbstractControl, { passwordStatus: 'low' });
    if (pwd_medium) Object.assign(AbstractControl, { passwordStatus: 'medium' });
    if (pwd_hard) Object.assign(AbstractControl, { passwordStatus: 'hard' });
    if (!pwd_low && !pwd_medium && !pwd_hard) return { notMatchPassword: true }
    return null;

  }

  public static emailValidator(AbstractControl: AbstractControl<string>): ValidationErrors | null {
    const value = AbstractControl.value
    if (value == '' || RegExp(/ /).test(value)) return { textEmpty: true }
    if (!RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(value)) return { notMatchEmail: true }
    else return null
  }

  public static usernameValidator(AbstractControl: AbstractControl<string>): ValidationErrors | null {
    const value = AbstractControl.value
    if (value == '' || RegExp(/ /).test(value)) return { textEmpty: true }
    if (!RegExp(/^[^\s]+( [^\s]+)+$/).test(value)) return { notMatchUsername: true }
    else return null
  }

}
