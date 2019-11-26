import { Component, OnInit, OnDestroy, ContentChild, TemplateRef, Input, Output,
  EventEmitter, ElementRef, Renderer2, Inject, PLATFORM_ID, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageLoaderComponent implements OnInit, OnDestroy {

  public observer: IntersectionObserver;
  public inView = false;
  public once50PctVisible = false;

  @ContentChild(TemplateRef)
  public template: TemplateRef<any>;

  @Input()
  public options: any = {threshold: [.1, .2, .3, .4, .5, .6, .7, .8]};

  // tslint:disable-next-line: no-output-rename
  @Output('inView')
  public inView$: EventEmitter<any> = new EventEmitter();

  // tslint:disable-next-line: no-output-rename
  @Output('notInView')
  public notInView$: EventEmitter<any> = new EventEmitter();

  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    // console.log('Image loader');
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
      this.observer.observe(this.element.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  public handleIntersect(entries, observer): void {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        this.inView = true;
        this.defaultInViewHandler(entry);
        this.inView$.emit(entry);
      } else {
        this.notInView$.emit(entry);
      }
      this.cdr.markForCheck();
    });
  }

  public defaultInViewHandler(entry) {

    if (this.once50PctVisible) {
      return false;
    }

    if (this.inView$.observers.length) {
      return false;
    }

    if (entry.intersectionRatio < 0.8) {
      const opacity = entry.intersectionRatio * (1 / 0.8);
      const blur = 20 - Math.floor(entry.intersectionRatio * 10) * 4;
      const filter = `blur(${blur}px)`;
      Object.assign(entry.target.style, {opacity, filter});
    } else {
       entry.target.style.opacity = 1;
       entry.target.style.filter = 'unset';

       this.once50PctVisible = true;
    }
  }

}
