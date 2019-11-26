import { Component, Input, ChangeDetectionStrategy, ViewChild, EventEmitter,
          Output, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { LoggerService } from 'src/app/shared/services/logger.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements AfterViewInit {
  @Input()
  public moviesList;

  @Input()
  public upcomingList;

  @Input()
  public theaterList;

  @Input()
  public userPreference;

  @Input()
  public totalPagesForNowShowingMovies: number;

  @Input()
  public totalPagesForUpcomingMovies: number;

  @Output()
  public getNewNowPlayingMovies: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public getNewUpcomingMovies: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild(CdkVirtualScrollViewport)
  public virtualScroll: CdkVirtualScrollViewport;

  @ViewChild(CdkVirtualScrollViewport)
  public virtualScrollForUpcomingMovies: CdkVirtualScrollViewport;

  public pageNowPlaying = 1;
  public pageUpComing = 1;
  public selectedLanguage = '';
  public selectedGenre = '';
  public languageList = [{ id: 'en', name: 'English' }, { id: 'ja', name: 'Japanese' }, { id: 'zh', name: 'Chinese' }];

  private activeTabIndex = 0;

  constructor(private logger: LoggerService,
              private cdr: ChangeDetectorRef) {}

  public getNextBatchMovies(): void {
    if (this.virtualScroll.getDataLength() === this.virtualScroll.getRenderedRange().end) {
      if (this.activeTabIndex === 0 && this.pageNowPlaying <= this.totalPagesForNowShowingMovies) {
        this.getNewNowPlayingMovies.emit(this.pageNowPlaying++);
      } else if (this.activeTabIndex === 1 && this.pageUpComing <= this.totalPagesForUpcomingMovies) {
        console.log('this.pageUpComing..', this.pageUpComing);
        this.getNewUpcomingMovies.emit(this.pageUpComing++);
      }
    }
  }

  public ngAfterViewInit(): void {
    this.getNewUpcomingMovies.emit(this.pageUpComing++);
  }

  public moveTop(): void {
    this.logger.info('scroll move to top');
    this.virtualScroll.scrollToIndex(1);
  }

  public tabChanged(event): void {
    this.logger.info('tab changed to index', ['index is', event]);
    this.virtualScroll.scrollToIndex(0);
    this.activeTabIndex = event;
  }

  public getLanguage(lang): void {
    this.logger.info('Language has been changed', ['language is', lang]);
    this.selectedLanguage = lang;
  }

  public getGenre(g): void {
    this.logger.info('Genre has been changed', ['language is', g]);
    this.selectedGenre = g;
  }
}
