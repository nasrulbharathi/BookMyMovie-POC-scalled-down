import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, Observer } from 'rxjs';

import { Store } from '@ngrx/store';
import * as MovieState from '../../reducers/index';

import { SetNowPlayingMovies, SetUpcomingMovies, SetCastAndCrew, SetTheaters,
    SetTotalPageForNowPlayingMovies, 
    SetTotalPageForUpcomingMovies} from '../store/actions/home.action';
import { Movie } from '../models/movie.model';
import { BASE_URL, JSON_SERVER_URLS, TMDB_URLS } from 'src/app/shared/config';
import { environment } from '../../../environments/environment';
import { SetUser } from 'src/app/core/store/action/userDetails.action';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public totalPagesForNowShowingMovies = 1;
  public totalPagesForUpcomingMovies = 1;
  nowPlayingMoviesUrl = BASE_URL.TMDB_API + TMDB_URLS.NOW_PLAYING_MOVIES + environment.API_KEY + '&page=';
  upcomingMoviesUrl = BASE_URL.TMDB_API + TMDB_URLS.UPCOMING_MOVIES + environment.API_KEY + '&page=';
  genresUrl = BASE_URL.TMDB_API + TMDB_URLS.GENRES + environment.API_KEY + '&language=en-US';
  sortPreferenceUrl = environment.JSONSERVER + JSON_SERVER_URLS.USER_DETAILS;
  genres = [];

  public mySubject = new Subject();

  constructor(private http: HttpClient, private store: Store<MovieState.State>) {}

  public getNowshowing(page = 1) {
    this.http.get<any>(this.nowPlayingMoviesUrl + page).subscribe(
      (movies: any) => {
        this.totalPagesForNowShowingMovies = movies.total_pages;
        this.store.dispatch(new SetTotalPageForNowPlayingMovies(this.totalPagesForNowShowingMovies));
        this.store.dispatch(new SetNowPlayingMovies(movies['results']));
        this.getCastAndCrew(movies['results']);
        this.mySubject.next(false);
      }
    );
  }

  public getUpcomingMovies(page = 1) {
    this.http.get<any>(this.upcomingMoviesUrl + page).subscribe(
      (movies: any) => {
        this.totalPagesForUpcomingMovies = movies.total_pages;
        this.store.dispatch(new SetTotalPageForUpcomingMovies(this.totalPagesForUpcomingMovies));
        this.store.dispatch(new SetUpcomingMovies(movies['results']));
        this.getCastAndCrew(movies['results']);
      }
    );
  }

  public getLoadingInformation(): Observable<any> {
    return this.mySubject.asObservable();

  }

  public getGenres(): any {
    return this.genres;
  }

  public fetchGenres(): void {
    this.http.get(this.genresUrl).subscribe(res => {
      this.genres = res['genres'];
    }, (error) => {
      console.log('error in genres');
    });
  }

  public getCastAndCrew(movies: Movie[]): void {
    movies.forEach((element, index) => {
      const getCreditsUrl = BASE_URL.TMDB_API + TMDB_URLS.GET_CREDITS + element.id + '/credits?' + environment.API_KEY;

      this.http.get(getCreditsUrl).pipe().subscribe(res => {
        res['cast'].splice(5);
        res['crew'].splice(5);
        res['element'] = element;
        this.store.dispatch(new SetCastAndCrew(res));
      });
    });
  }

  public getTheaterList(): void {
    this.http.get(environment.JSONSERVER + JSON_SERVER_URLS.THEATER_URL).subscribe(res => {
      this.store.dispatch(new SetTheaters(res['theaters']));
    }, (error) => {
      console.log('error in theatres');
    });
  }

  public getUserPreference(): Observable<any> {
    return this.http.get(this.sortPreferenceUrl);
  }

  public setPreference(newPreference, currentUserId) {
    let objectRef, currentUserData;
    this.http.get(environment.JSONSERVER + JSON_SERVER_URLS.USER_DETAILS).subscribe(res => {
      objectRef = res;
      res['users'].forEach(user => {
        if (user.uid === currentUserId) {
          user.preferences = newPreference;
          currentUserData = user;
        }
      });
      this.http.put(environment.JSONSERVER + JSON_SERVER_URLS.USER_DETAILS, objectRef).subscribe(resp => {
        this.store.dispatch(new SetUser(currentUserData));
      });
    });
  }
}
