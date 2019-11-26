import { Validator } from '@angular/forms';

export interface FormValidator {
    name: string;
    validator: any;
    message: string;
    }

export interface FormFieldConfig {
    label?: string;
    name?: string;
    inputType?: string;
    options?: string[];
    collections?: any;
    type: string;
    value?: any;
    validations?: Validator[];
}
