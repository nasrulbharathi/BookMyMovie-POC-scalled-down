import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Theater } from 'src/app/home/models/theater.model';

@Component({
  selector: 'app-createmodify-theater-dialog',
  templateUrl: './create-modify-theater.dialog.html',
  styleUrls: ['./create-modify-theater.dialog.scss']
})
export class CreateModifyTheaterDialogComponent implements OnInit {

  public dialogHeading = 'Add Theater Details';
  public disableDialogSubmit = true;

  public result: Theater;

  public formData: any;

  public formFields: []  = [];

  constructor(public dialogRef: MatDialogRef<CreateModifyTheaterDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  public ngOnInit(): void {
    this.formFields = [];
    this.formFields = this.data.formData.formFields;
    if (this.data.config === 'edit') {
      const keys: any = Object.keys(this.data.formData.rowData);
      this.data.formData.formFields.forEach(element => {
        keys.forEach(key => {
          if (element.name === key) {
            element.value = this.data.formData.rowData[key];
          }
        });
      });
      this.dialogHeading = 'Modify Theater Details';
    }

  }

  public getFormInput(formData: any): void {
    this.disableDialogSubmit = false;
    this.result = formData;
  }

  public disableSubmit(): void {
    this.disableDialogSubmit = true;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
