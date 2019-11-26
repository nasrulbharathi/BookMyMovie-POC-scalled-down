import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import * as UserState from '../../../reducers/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-s-dialog-cards',
  templateUrl: './s-dialog-cards.component.html',
  styleUrls: ['./s-dialog-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SDialogCardsComponent implements OnInit {

  @Input()
  public movieList; // movie seperated by language

  @Input()
  public movieFilter; // genre

  @Input()
  public languageList; // list of languages

  @Input()
  public selectedLanguage; // user language selection

  public userPreference: any = [];
  public sortOrder = 'Asc';

  constructor(private userStore: Store<UserState.State>) {}

  public ngOnInit(): void {
    this.userStore.select(UserState.userSelector).subscribe(result => {
      this.userPreference = result.preference;
    });
  }

  public sortMovies(): void {
    if (this.sortOrder === 'Asc') {
      this.sortOrder = 'Desc';
    } else {
      this.sortOrder = 'Asc';
    }
  }

}
