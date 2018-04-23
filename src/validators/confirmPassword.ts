import { FormControl } from '@angular/forms';

export class ConfirmPasswordValidator {
static checkConfirmPassword(control: FormControl): any {

    if (control.value == control.root.value['password']) {
        return null;
    } else {
        return { isValid: true };
    }
}
}