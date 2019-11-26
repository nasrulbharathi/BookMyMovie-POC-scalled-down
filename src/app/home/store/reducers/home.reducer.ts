import { MovieActionTypes, EMovieActionTypes } from '../actions/home.action';
import { Movie } from '../../models/movie.model';
import { State } from '@ngrx/store';
import { Theater } from '../../models/theater.model';
import { Cast } from '../../models/cast.model';
import { Crew } from '../../models/crew.model';
export interface MoviesState {
    nowPlayingMovies: Movie[];
    upcomingMovies: Movie[];
    setTheaters: Theater[];
    totalPagesForNowShowingMovies: number;
    totalPagesForUpcomingMovies: number;
    loading: boolean;
}

export const initialMovieState: MoviesState = {
    nowPlayingMovies: [],
    upcomingMovies: [],
    setTheaters: [],
    totalPagesForNowShowingMovies: 1,
    totalPagesForUpcomingMovies: 1,
    loading: true
};

export function moviesReducer(state = initialMovieState, action: MovieActionTypes) {
    switch (action.type) {
        case EMovieActionTypes.SET_NOW_PLAYING_MOVIES: {
            // const objOfMovies = action.payload.reduce((o, movie) => ({ ...o, [movie.id]: movie }), {});
            // const newMovies: { [key: number]: Movie } = { ...state.nowPlayingMovies, ...objOfMovies };
            const newNowPlayingMovies: Movie[] = [...state.nowPlayingMovies];
            newNowPlayingMovies.push(...action.payload);
            return {
                ...state,
                nowPlayingMovies: newNowPlayingMovies,
                loading: false
            };
        }
        case EMovieActionTypes.SET_UPCOMING_MOVIES: {
            // const objOfMovies = action.payload.reduce((o, movie) => ({ ...o, [movie.id]: movie }), {});
            // const newUpcomingMovies: { [key: number]: Movie } = { ...state.upcomingMovies, ...objOfMovies };
            const newUpcomingMovies: Movie[] = [...state.upcomingMovies];
            newUpcomingMovies.push(...action.payload);
            return {
                ...state,
                upcomingMovies: newUpcomingMovies,
                loading: false
            };
        }
        case EMovieActionTypes.SET_CAST_AND_CREW: {
            const newNowPlayingMovieState = [ ...state.nowPlayingMovies ];
            const newUpcomingMovieState = [ ...state.upcomingMovies ];
            newNowPlayingMovieState.forEach((newNowPlayingMovie) => {
                if (newNowPlayingMovie.id === action.payload.id) {
                    newNowPlayingMovie.casts = action.payload.cast;
                    newNowPlayingMovie.crews = action.payload.crew;
                }
            });
            newUpcomingMovieState.forEach((newUpcomingMovie) => {
                if (newUpcomingMovie.id === action.payload.id) {
                    newUpcomingMovie.casts = action.payload.cast;
                    newUpcomingMovie.crews = action.payload.crew;
                }
            });
            return {
                ...state,
                nowPlayingMovies: newNowPlayingMovieState,
                upcomingMovies: newUpcomingMovieState,
                loading: false
            };
        }
        case EMovieActionTypes.SET_THEATERS: {
            const newSetTheatersState = action.payload;
            return {
                ...state,
                setTheaters: newSetTheatersState
            };
        }
        case EMovieActionTypes.SET_TOTAL_PAGE_FOR_PLAYING_MOVIES: {
            const newSetTotalPage = action.payload;
            return {
                ...state,
                totalPagesForNowShowingMovies: newSetTotalPage
            };
        }
        case EMovieActionTypes.SET_TOTAL_PAGE_FOR_UPCOMING_MOVIES: {
            const newSetTotalPage = action.payload;
            return {
                ...state,
                totalPagesForUpcomingMovies: newSetTotalPage
            };
        }
        default:
            return state;
    }
}
