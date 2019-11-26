import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Store } from '@ngrx/store';
import * as UserState from '../../reducers/index';
import { SetUser } from 'src/app/core/store/action/userDetails.action';

import { JSON_SERVER_URLS } from '../../shared/config';

const USERS_URL = environment.JSONSERVER + JSON_SERVER_URLS.USER_DETAILS;
@Injectable()
export class UserDetailService {
  constructor(private http: HttpClient, private store: Store<UserState.State>) {}

  public authDetails;

  public getUserDetailData(): void {
    this.authDetails = JSON.parse(sessionStorage.getItem('authDetails'));
    if (this.authDetails) {
      this.store.dispatch(new SetUser(this.authDetails));
    }
  }

  public addNewUser(data): void {
    let newUsers, newObject;
    let currentData;
    this.http.get(USERS_URL).subscribe(
      value => {
        newObject = value;
        newUsers = newObject['users'];
        currentData = {
          uid: data.id,
          name: data.name,
          image: data.image,
          email: data.email,
          role: 'Standard',
          preferences: {
            lang: 'en',
            generes: [],
            theaters: []
          },
          ratings: {
            movieId: '',
            rating: ''
          }
        };
        newUsers.push(currentData);

        this.http.put(USERS_URL, newObject).subscribe(_value => {
          sessionStorage.setItem('authDetails', JSON.stringify(currentData));
          this.store.dispatch(new SetUser(currentData));
        });
      },
      err => {
        console.log(err);
      }
    );
  }
}
