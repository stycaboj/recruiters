import { AbstractControl, ValidatorFn } from "@angular/forms";

export function numberValidator(): ValidatorFn {
    return (
        control: AbstractControl
    ): { [key: string]: boolean} | null => {
        let numberRgEx: RegExp = /^(\+\d{1,3}\s?)?(\(\d{2,3}\)|\d{2,3})[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
        let valid = 
            !control.value ||
            numberRgEx.test(control.value);
        return valid ? null : {number: true};
    }
}