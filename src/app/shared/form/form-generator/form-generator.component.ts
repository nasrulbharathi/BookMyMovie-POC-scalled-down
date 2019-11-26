import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FormFieldConfig } from '../form-config.interface';

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss']
})
export class FormGeneratorComponent implements OnInit, AfterViewInit {

  @Input()
  public fields: FormFieldConfig[] = [];

  @Output()
  public sendFormInputData: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public disableSubmit: EventEmitter<any> = new EventEmitter<boolean>();

  public get value() {
    return this.form.value;
  }

  public form: FormGroup;

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.form = this.createControl();
  }

  public ngAfterViewInit(): void {
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.sendFormInputData.emit(this.form.value);
      } else if (!this.form.valid) {
        this.disableSubmit.emit(true);
      }
    });
  }

  public createControl() {
      const group = this.fb.group({});
      this.fields.forEach(field => {
        const control = this.fb.control(
          field.value,
          this.bindValidations(field.validations || [])
        );
        group.addControl(field.name, control);
      });
      return group;
  }

  public bindValidations(validations: any)   {
      if (validations.length > 0) {
          const validList = [];
          validations.forEach(valid => {
            validList.push(valid.validator);
          });
          return Validators.compose(validList);
      }
      return null;
  }

}
