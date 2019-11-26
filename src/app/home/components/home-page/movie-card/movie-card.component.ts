import { Component, OnInit, Input, OnChanges, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Store } from '@ngrx/store';
import * as MovieState from '../../../../reducers/index';

// tslint:disable-next-line:max-line-length
import { SeatReservationModalComponent } from '../../../../shared/components/modals/seat-reservation-modal/seat-reservation-modal.component';
import { TMDB_URLS } from '../../../../shared/config';
import { PreBookingComponent } from '../../../../shared/components/modals/pre-booking/pre-booking.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCardComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  public movie;

  @Input()
  public theaterList;

  @Input()
  public category;

  public imagesPath;
  public displayImage = false;
  public displayCastandCredits = false;
  public castCrewPath;

  movieName = 'Robot 2.O';
  dialogResult;
  rating = 4.7;
  totalReviews = 51;

  minDate = new Date();
  date = new FormControl(this.minDate);
  selectTheater: FormControl;
  selectedTheater;
  selectedTime;

  constructor(public dialog: MatDialog,
    private store: Store<MovieState.State>,
    private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.imagesPath = TMDB_URLS.IMAGE_URL;
    this.castCrewPath = TMDB_URLS.CAST_CREW_SMALL;
  }

  public ngOnChanges(): void {
    this.selectTheater = new FormControl();
    this.selectTheater.setValue(this.theaterList[0]);
    this.selectedTheater = this.theaterList[0];
    this.selectTheater.valueChanges.subscribe(selectedTheater => {
      this.selectedTheater = selectedTheater;
    });
  }

  public ngAfterViewInit(): void {
    this.displayImage = true;
    this.store.select(MovieState.nowPlayingMoviesSelector).subscribe(
      () => {
        this.cdr.detectChanges();
      }
    );
    this.store.select(MovieState.upcomingMovieSelector).subscribe(
      () => {
        this.cdr.detectChanges();
      }
    );
  }

  public onValChange(val: string): void {
    this.selectedTime = val;
  }

  public isInvalid(): boolean {
    if (this.selectedTheater && this.selectedTheater.name) {
      return false;
    }
    return true;
  }

  public checKToDialog(): void {
    this.category === 'nowPlaying' ? this.openDialog() : this.preBookDialog();
  }


  public preBookDialog(): void {
    const dialogRef = this.dialog.open(PreBookingComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(SeatReservationModalComponent, {
      width: sessionStorage.getItem('authDetails') ? window.innerWidth + 'px' : 'auto',
      height: sessionStorage.getItem('authDetails') ? '599px' : 'auto',
      data: { category: this.category },
      disableClose: true
    });

    const bookingInstance = dialogRef.componentInstance;
    bookingInstance.movieTitle = this.movie.title;
    bookingInstance.screen = this.selectedTheater && this.selectedTheater.name;
    bookingInstance.time = this.selectedTime;
    bookingInstance.movieList = this.movie;
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog closed: ${result}`);
      //  this.dialogResult = result;
    });
  }

  public trackCastandCrew(index, cast): any {
    if (cast) {
      return cast.id;
    } else {
      return -1;
    }
  }
}
