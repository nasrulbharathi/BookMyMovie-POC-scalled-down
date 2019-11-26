import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

import { Store, State } from '@ngrx/store';
import * as MovieState from './reducers/index';

import { HomeService } from './home/services/home.service';
import { UserDetailService } from './core/services/userDetails.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {

  public title  = 'book-my-movie';

  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar,
              private store: Store<MovieState.State>,
              private homeService: HomeService,
              private userDetailsService: UserDetailService,
              private cdr: ChangeDetectorRef
              ) { }

  public isLoading = true;

  public ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        const message = 'New version available. Update to new Version ?';
        const action = 'UPDATE';
        const snackbarRef = this.snackBar.open(message, action, { duration: 15000, });
        snackbarRef.onAction().subscribe(() => {
          window.location.reload();
        });
      });
    }
    this.homeService.fetchGenres();
    this.homeService.getNowshowing();
    this.homeService.getUpcomingMovies();
    this.userDetailsService.getUserDetailData();
  }

  public ngAfterViewInit(): void {
    this.store.select(MovieState.loadingSelector).subscribe((result) => {
      this.isLoading = result;
      this.cdr.detectChanges();
    });
  }
}

