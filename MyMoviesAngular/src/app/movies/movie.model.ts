import { ActorMovieDTO } from "../actors/actor.model";
import { GenreDTO } from "../genres/genre.model";
import { MovieTheaterDTO } from "../movie-theaters/movie-theater.model";

export interface movieDTO {
    id: number
    title: string;
    summary: string;
    poster: File;
    inTheaters: boolean;
    releaseDate: Date;
    trailer: string;
    genres : GenreDTO[];
    movieTheaters: MovieTheaterDTO[];
    actors : ActorMovieDTO[];
}

export interface movieCreationDTO {
    title: string;
    summary: string;
    poster: File;
    inTheaters: boolean;
    releaseDate: Date;
    trailer: string;
    genresIds: number[];
    movieTheatersIds: number[];
    actors: ActorMovieDTO[];
}

export interface moviePostGetDTO{
    genres : GenreDTO[]
    movieTheaters: MovieTheaterDTO[]
}

export interface moviePutGetDTO{
    movie : movieDTO
    selectedGenres: GenreDTO[]
    nonSelectedGenres: GenreDTO[]
    selectedMovieTheaters: MovieTheaterDTO[]
    nonSelectedMovieTheaters: MovieTheaterDTO[]
    actors: ActorMovieDTO[]
}

export interface homeDTO{
    inTheaters: movieDTO[];
    upcomingReleases: movieDTO[];
}