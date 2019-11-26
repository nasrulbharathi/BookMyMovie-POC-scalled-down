import { Component, Output, EventEmitter,
  ViewChild, TemplateRef, AfterViewInit, ViewEncapsulation, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Store } from '@ngrx/store';
import * as MovieState from '../../../reducers/index';

import { FormGeneratorComponent } from 'src/app/shared/form/form-generator/form-generator.component';
import { TableComponent } from 'src/app/shared/table/table.component';
// tslint:disable-next-line: max-line-length
import { CreateModifyTheaterDialogComponent } from 'src/app/shared/components/modals/create-modify-theater/create-modify-theater.dialog.component';

import { AddTheaterConfigService } from './add-theatre-config.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-theater',
  templateUrl: './add-theater.component.html',
  styleUrls: ['./add-theater.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AddTheaterConfigService]
})
export class AddTheaterComponent implements AfterViewInit {

  @ViewChild(FormGeneratorComponent)
  public form: FormGeneratorComponent;

  @ViewChild(TableComponent)
  public table: TableComponent;

  @ViewChild('successDialog')
  public successDialog: TemplateRef<any>;

  @Output() addTheater = new EventEmitter();

  public theatreList: any[];
  public formData: any;
  public dialogMessage: string;

  constructor(public dialog: MatDialog,
              public addTheaterConfigService: AddTheaterConfigService,
              private matDialog: MatDialog,
              private store: Store<MovieState.State>,
              private cdf: ChangeDetectorRef,
              private adminService: AdminService) {
  }

  public performCrudAction(event: any): void {
    switch (event.action) {
      case 'add':
        this.addTheaterData();
        break;
      case 'edit':
        this.editTheaterData(event.index, event.rowData);
        break;
      case 'delete':
        this.deleteTheatreData(event.rowData);
        break;
      default:
        break;
    }
  }

  public ngAfterViewInit(): void {
    this.store.select(MovieState.theaterList).subscribe(result => {
      this.theatreList = result;
      this.table.refreshTable(this.theatreList);
      if (!this.cdf['destroyed']) {
        this.cdf.detectChanges();
      }
    });
  }

   public dialogOk(): void {
    this.matDialog.closeAll();
  }

  private addTheaterData(): void {
    this.formData = { formFields: this.addTheaterConfigService.addFormField};
    const dialogRef = this.dialog.open(CreateModifyTheaterDialogComponent, {
      data: { formData: this.formData, config: 'add'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.dialogMessage = 'Theatre ' + result.name + '  has been added Successfully';
        this.matDialog.open(this.successDialog);
        this.adminService.newTheater(this.theatreList, result);
      }
    });
  }

  private editTheaterData(index: number, rowData: any): void {
    this.formData = {
          formFields: this.addTheaterConfigService.editFormField,
          rowData: rowData
    };
    const dialogRef = this.dialog.open(CreateModifyTheaterDialogComponent, {
      data: { formData: this.formData, config: 'edit'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.dialogMessage = 'Theatre ' + rowData.name + ' has been Modified Successfully';
        this.matDialog.open(this.successDialog);
        this.adminService.editTheatre(this.theatreList, result, index);
      }
    });
  }

  private deleteTheatreData(rowData: any): void {
      this.adminService.deleteTheaterData(this.theatreList, rowData);
      this.dialogMessage = 'Theatre ' + rowData.name + ' has been Deleted Successfully';
      this.matDialog.open(this.successDialog);
  }

}
