import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieBookingComponent } from './movie-booking/movie-booking.component';
import { MaterialModule } from '../material.module';
import {
  MatDialogModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SeatReservationModalComponent } from './components/modals/seat-reservation-modal/seat-reservation-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiService } from './ui-service.service';
import { MovieDropdownsComponent } from './movie-dropdowns/movie-dropdowns.component';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { PaymentBookingComponent } from './components/payment-booking/payment-booking.component';
import { SortMoviePipe } from './pipes/sort-movie.pipe';
import { HomeFilterPipe } from './pipes/home-filter.pipe';
import { PreBookingComponent } from './components/modals/pre-booking/pre-booking.component';
import { TextComponent } from './form/text/text.component';
import { ComboboxComponent } from './form/combobox/combobox.component';
import { FormGeneratorComponent } from './form/form-generator/form-generator.component';
import { DynamicFormDirective } from './form/directive/dynamic-form.directive';
import { TableComponent } from './table/table.component';
import { CreateModifyTheaterDialogComponent } from './components/modals/create-modify-theater/create-modify-theater.dialog.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { LoadImageDirective } from './directives/load-image.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { GlobalInterceptor } from './interceptors/global-interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LogPublisherService } from './services/logger-publisher.service';
import { SortOrderPipe } from './pipes/sort-order.pipe';
import { ImageLoaderComponent } from './components/image-loader/image-loader.component';

@NgModule({
  declarations: [
    MovieBookingComponent,
    SeatReservationModalComponent,
    MovieDropdownsComponent,
    ConfirmationModalComponent,
    PaymentBookingComponent,
    SortMoviePipe,
    HomeFilterPipe,
    PreBookingComponent,
    TextComponent,
    ComboboxComponent,
    FormGeneratorComponent,
    DynamicFormDirective,
    TableComponent,
    CreateModifyTheaterDialogComponent,
    LoadImageDirective,
    LoaderComponent,
    SortOrderPipe,
    ImageLoaderComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatPaginatorModule
  ],
  exports: [
    MovieBookingComponent,
    SeatReservationModalComponent,
    MovieDropdownsComponent,
    SortMoviePipe,
    HomeFilterPipe,
    SortOrderPipe,
    PreBookingComponent,
    TableComponent,
    FormGeneratorComponent,
    CreateModifyTheaterDialogComponent,
    LoadImageDirective,
    LoaderComponent,
    ImageLoaderComponent
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true },
    LogPublisherService
  ],
  entryComponents: [
    ConfirmationModalComponent,
    TextComponent,
    ComboboxComponent,
    CreateModifyTheaterDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
