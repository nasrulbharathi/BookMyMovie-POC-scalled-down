import { Injectable } from '@angular/core';
import { HttpClient } from '@angular//common/http';

import { Store } from '@ngrx/store';
import * as MovieState from '../../reducers/index';
import { SetTheaters } from 'src/app/home/store/actions/home.action';

import { TMDB_URLS, JSON_SERVER_URLS, BASE_URL } from '../../shared/config';
import { environment } from '../../../environments/environment';

const SEARCH_URL = BASE_URL.TMDB_API + TMDB_URLS.SEARCH_URL;
const THEATERS_URL = environment.JSONSERVER + JSON_SERVER_URLS.THEATER_URL;

@Injectable()
export class AdminService {

  constructor(private http: HttpClient,
              private store: Store<MovieState.State>) { }

  public newTheater(tableData: any, newdata: any): void {
    tableData.push(newdata);
    const newObj = {
      theaters: tableData
    };
    this.http.put(THEATERS_URL, newObj).subscribe((res: any) => {
      this.store.dispatch(new SetTheaters(res.theaters));
    },
      (e) => console.log(e, 'while adding data'));
  }

  public editTheatre(tableData: any, newdata: any, index: number): void {
    tableData[index] = newdata;
    const newObj = {
      theaters: tableData
    };
    this.http.put(THEATERS_URL, newObj).subscribe((res: any) => {
      this.store.dispatch(new SetTheaters(res.theaters));
    },
      (e) => console.log(e, 'while updating data'));
  }

  public deleteTheaterData(tableData: any, rowData: any): void {
    // tslint:disable-next-line: triple-equals
    const newData = tableData.filter(obj => obj.tid != rowData.tid);
    const newObj = {
      theaters: newData
    };
    this.http.put(THEATERS_URL, newObj).subscribe((res: any) => {
      this.store.dispatch(new SetTheaters(res.theaters));
    },
      (e) => console.log(e, 'while deleting data'));

  }

  public searchMovie(term): any {
    return this.http.get(SEARCH_URL + environment.API_KEY + '&query=' + term);
  }

  public saveNowPlaying(nowPlaying, theaterId): any {
    let newObject;
    if (nowPlaying.length > 0) {
      this.http.get(THEATERS_URL).subscribe((value) => {
        newObject = value;
        newObject['theaters'].forEach(theater => {
          if (theater.id === theaterId) {

            theater.movies = nowPlaying;
          }
        });
        this.http.put(THEATERS_URL, newObject).subscribe((xyz) => {
          console.log('Sucess', xyz);
        });
      });
    }
  }
}
