import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { HostBinding } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as MovieState from '../../../reducers/index';

import { MovieListService } from '../../../core/movie/movie-list.service';
import {} from '../../../home/store/actions/home.action';
import { HomeService } from '../../../home/services/home.service';
import { SearchApiService } from '../../services/search-api.service';

@Component({
  selector: 'app-s-dialog',
  templateUrl: './s-dialog.component.html',
  styleUrls: ['./s-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SDialogComponent implements OnInit, OnDestroy {

  @HostBinding('class.app-s-dialog')
  public bgColor = true;

  public moviesList: any = [];
  public genresList: any = [];
  public originalMovieList: any = [];

  public value = '';
  public lang: String = 'en';
  public selectedGenre: any;
  public selectedLanguage = 'en';
  public languageList: any;

  public movieFilterObj = {
    filter: 'genre',
    value: ''
  };
  public movieObjArray = []; // movie seperated by language
  public searchField = new FormControl();

  constructor(
    private store: Store<MovieState.State>,
    private homeService: HomeService,
    private movieListService: MovieListService,
    private searchService: SearchApiService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    // movie from store
    this.store.select(MovieState.nowPlayingMoviesSelector).subscribe(result => {
      this.originalMovieList = result;
      this.moviesList = result;
      this.movieObjArray = this.movieListService.getLanguageList(this.moviesList); // get movies with languages
    });

    // genre list from service
    this.genresList = this.homeService.getGenres();

    // fetch from api/store
    this.searchField.valueChanges.pipe(debounceTime(400)).subscribe(searchString => {
      this.searchService.getMovies(searchString).subscribe(
        searchList => {
          this.moviesList = searchList.results;
          this.movieObjArray = this.movieListService.getLanguageList(this.moviesList);
          this.cdr.detectChanges();
        },
        error => {
          this.moviesList = this.searchService.searchMovieFromStore(this.originalMovieList, searchString);
          this.movieObjArray = this.movieListService.getLanguageList(this.moviesList); // get Languages
        }
      );
    });
  }

  // change detection for genre dropdown
  public changeGenere(): void {
    this.movieFilterObj.filter = 'genre';
    this.movieFilterObj.value = this.selectedGenre;
    this.movieFilterObj = Object.assign({}, this.movieFilterObj);
  }

  public ngOnDestroy(): void {
    this.moviesList = [];
  }
}
