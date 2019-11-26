import { ElementRef, EventEmitter, Output, Directive, AfterViewInit } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[loadImage]'
})
export class LoadImageDirective implements AfterViewInit {
    @Output() public loadImage: EventEmitter<any> = new EventEmitter();

    private _intersectionObserver?: IntersectionObserver;

    constructor (
        private _element: ElementRef
    ) {}

    public ngAfterViewInit () {
        this._intersectionObserver = new IntersectionObserver(entries => {
            this.checkForIntersection(entries);
        }, {});
        this._intersectionObserver.observe(<Element>(this._element.nativeElement));
    }

    private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (this.checkIfIntersecting(entry)) {
                this.loadImage.emit();
                this._intersectionObserver.unobserve(<Element>(this._element.nativeElement));
                this._intersectionObserver.disconnect();
            }
        });
    }

    private checkIfIntersecting (entry: IntersectionObserverEntry) {
        return (<any>entry).isIntersecting && entry.target === this._element.nativeElement;
    }
}
