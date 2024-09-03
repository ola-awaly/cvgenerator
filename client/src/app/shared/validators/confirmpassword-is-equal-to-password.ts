import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export function isEqualToPassword(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['isNotEqualToPassword']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ isNotEqualToPassword: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}