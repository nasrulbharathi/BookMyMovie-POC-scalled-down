import { Action } from '@ngrx/store';
import { Movie } from '../../models/movie.model';

export enum EMovieActionTypes {
    SET_NOW_PLAYING_MOVIES = '[ Movie ] Set now playing movies',
    SET_UPCOMING_MOVIES = '[ Movie ] Set up coming movies',
    SET_CAST_AND_CREW = '[ Movie ] Set Credits',
    SET_THEATERS = '[ Theaters ] Set Theaters',
    SET_TOTAL_PAGE_FOR_PLAYING_MOVIES = '[ Movie ] SET TOTAL PAGE FOR PLAYING MOVIES',
    SET_TOTAL_PAGE_FOR_UPCOMING_MOVIES = '[ Movie ] SET TOTAL PAGE FOR UPCOMING MOVIES'
}

export class SetNowPlayingMovies implements Action {
    readonly type = EMovieActionTypes.SET_NOW_PLAYING_MOVIES;

    constructor(public payload: Movie[]) { }
}
export class SetUpcomingMovies implements Action {
    readonly type = EMovieActionTypes.SET_UPCOMING_MOVIES;

    constructor(public payload: Movie[]) { }
}
export class SetCastAndCrew implements Action {
    readonly type = EMovieActionTypes.SET_CAST_AND_CREW;

    constructor(public payload: any) { }
}

export class SetTheaters implements Action {
    readonly type = EMovieActionTypes.SET_THEATERS;

    constructor(public payload: any) {}
}

export class SetTotalPageForNowPlayingMovies implements Action {
    readonly type = EMovieActionTypes.SET_TOTAL_PAGE_FOR_PLAYING_MOVIES;

    constructor(public payload: number) {}
}

export class SetTotalPageForUpcomingMovies implements Action {
    readonly type = EMovieActionTypes.SET_TOTAL_PAGE_FOR_UPCOMING_MOVIES;

    constructor(public payload: number) {}
}

export type MovieActionTypes = SetNowPlayingMovies
                                | SetUpcomingMovies
                                | SetCastAndCrew
                                | SetTheaters
                                | SetTotalPageForNowPlayingMovies
                                | SetTotalPageForUpcomingMovies;
