import { Component, AfterViewInit, Input, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material';

import { Store } from '@ngrx/store';
import * as MovieState from '../../../reducers/index';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-change-show',
  templateUrl: './change-show.component.html',
  styleUrls: ['./change-show.component.scss']
})
export class ChangeShowComponent implements AfterViewInit {

  public theaterList: any[];

  @ViewChild('successDialog')
  public successDialog: TemplateRef<any>;

  movieInput: FormControl;
  selectTheater: FormControl;
  movieResult;
  selectedTheater;
  nowShowing = [];
  nowPlaying = [];

  constructor(private adminService: AdminService,
              private matDialog: MatDialog,
              private cdr: ChangeDetectorRef,
              private store: Store<MovieState.State>) {
    this.movieInput = new FormControl();
    this.selectTheater = new FormControl();
  }

  public ngAfterViewInit(): void {
      this.store.select(MovieState.theaterList).subscribe(result => {
        this.theaterList = result;
        if (!this.cdr['destroyed']) {
          this.cdr.detectChanges();
        }
      });
      this.movieInput.valueChanges.subscribe(value => {
        if (value) {
          this.adminService.searchMovie(value).subscribe(movies => {
            this.movieResult = movies['results'];
          });
        }
      });
      this.selectTheater.valueChanges.subscribe(value => {
        this.selectedTheater = value;
        this.nowShowing = [];
      });
  }

  public addMovie(movie): void {
    this.nowShowing.push(movie.name);
    this.nowPlaying.push(movie.id);
  }

  public save(): void {
    this.matDialog.open(this.successDialog);
    this.adminService.saveNowPlaying(this.nowPlaying, this.selectTheater['tid']);
  }

  public cancel(): void {
    this.nowShowing = [];
  }

  public dialogOk(): void {
    this.nowShowing = [];
    this.movieInput.reset();
    this.selectTheater.reset();
    this.matDialog.closeAll();
    this.movieResult = [];
  }
}
