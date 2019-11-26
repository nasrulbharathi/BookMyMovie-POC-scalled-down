import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Store } from '@ngrx/store';
import * as MovieState from '../../../reducers/index';
import * as UserState from '../../../reducers/index';

import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit {
  public nowPlayingMoviesList;
  public upcomingMoviesList;
  public genresList;
  public theaterList;
  public userPreference;

  public totalPagesForNowShowingMovies;
  public totalPagesForUpcomingMovies;

  constructor(
    private store: Store<MovieState.State>,
    private userStore: Store<UserState.State>,
    private homeService: HomeService,
    private cdf: ChangeDetectorRef
  ) { }

  public ngAfterViewInit(): void {
    this.homeService.getTheaterList();
    this.nowPlayingMoviesList = this.store.select(MovieState.nowPlayingMoviesSelector);
    this.upcomingMoviesList = this.store.select(MovieState.upcomingMovieSelector);
    this.theaterList = this.store.select(MovieState.theaterList);
    this.userPreference = this.userStore.select(UserState.userSelector);
    this.totalPagesForNowShowingMovies = this.store.select(MovieState.totalPagesForNowShowingMovies);
    this.totalPagesForUpcomingMovies = this.store.select(MovieState.totalPagesForUpcomingMovies);
    this.genresList = this.homeService.getGenres();
  }

  public getNewSetofNowPlayingMovies(page): void {
    this.homeService.getNowshowing(page);
  }

  public getNewSetofComingMovies(page): void {
    this.homeService.getUpcomingMovies(page);
  }
}
