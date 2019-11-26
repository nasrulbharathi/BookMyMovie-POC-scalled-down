import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Store } from '@ngrx/store';

import { HomeComponent } from './home.component';
import { HomeService } from '../../services/home.service';
import { of } from 'rxjs';

class StoreMock {
    select = jasmine.createSpy().and.returnValue(of(true));
}

class MockHomeService {
    getNowshowing(page) { }
    getUpcomingMovies(page) { }
    getGenres() { }
}

describe('HomeComponent', () => {
    let fixture;
    let component: HomeComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent
            ],
            providers: [
                { provide: Store, useClass: StoreMock },
                { provide: HomeService, useClass: MockHomeService },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
    });

    it('should create a component', async () => {
        expect(component).toBeTruthy();
    });

    it('should run #getNewSetofNowPlayingMovies()', async () => {
     // component.ngOnInit();
     // expect(component.nowPlayingMoviesList.length).toBeGreaterThan(0);
    });

    it('should run #getNewSetofNowPlayingMovies()', async () => {
      // component.ngOnInit();
      // expect(component.nowPlayingMoviesList.length).toBeGreaterThan(0);
    });

    it('should run #getNewSetofNowPlayingMovies()', async () => {
      // component.ngOnInit();
     // expect(component.nowPlayingMoviesList.length).toBeGreaterThan(0);
    });

});
