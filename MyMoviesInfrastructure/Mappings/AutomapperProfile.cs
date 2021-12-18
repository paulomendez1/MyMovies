using AutoMapper;
using Microsoft.AspNetCore.Identity;
using MyMoviesCore.DTOs;
using MyMoviesCore.Entities;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyMoviesInfrastructure.Mappings
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile(GeometryFactory geometryFactory)
        {
            CreateMap<Genre, GenreDTO>().ReverseMap();
            CreateMap<Actor, ActorDTO>()
                .ForMember(x => x.Picture, options => options.Ignore());
            CreateMap<ActorDTO, Actor>()
                .ForMember(x=> x.Picture, options => options.Ignore());
            CreateMap<MovieTheater, MovieTheaterDTO>()
                .ForMember(x => x.Latitude, dto => dto.MapFrom(prop => prop.Location.Y))
                .ForMember(x => x.Longitude, dto => dto.MapFrom(prop => prop.Location.X));
            CreateMap<MovieTheaterDTO, MovieTheater>()
               .ForMember(x => x.Location, x => x.MapFrom(dto => geometryFactory.CreatePoint(new Coordinate(dto.Longitude, dto.Latitude))));
            CreateMap<MovieCreationDTO, Movie>()
                          .ForMember(x => x.Poster, options => options.Ignore())
                          .ForMember(x => x.MoviesGenres, options => options.MapFrom(MapMoviesGenres))
                          .ForMember(x => x.MoviesMovieteathers, options => options.MapFrom(MapMovieTheatersMovies))
                          .ForMember(x => x.MoviesActors, options => options.MapFrom(MapMoviesActors));

            CreateMap<Movie, MovieDTO>()
                .ForMember(x => x.Genres, options => options.MapFrom(MapMoviesGenres))
                .ForMember(x => x.MovieTheaters, options => options.MapFrom(MapMovieTheatersMovies))
                .ForMember(x => x.Actors, options => options.MapFrom(MapMoviesActors));

            CreateMap<IdentityUser, UserDTO>();
        }

        private List<ActorMovieDTO> MapMoviesActors(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<ActorMovieDTO>();

            if (movie.MoviesActors != null)
            {
                foreach (var moviesActors in movie.MoviesActors)
                {
                    result.Add(new ActorMovieDTO()
                    {
                        Id = moviesActors.ActorId,
                        Name = moviesActors.Actor.Name,
                        Character = moviesActors.Character,
                        Picture = moviesActors.Actor.Picture,
                        Order = moviesActors.Order
                    });
                }
            }

            return result;
        }

        private List<MovieTheaterDTO> MapMovieTheatersMovies(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<MovieTheaterDTO>();

            if (movie.MoviesMovieteathers != null)
            {
                foreach (var movieTheaterMovies in movie.MoviesMovieteathers)
                {
                    result.Add(new MovieTheaterDTO()
                    {
                        Id = movieTheaterMovies.MovieTheaterId,
                        Name = movieTheaterMovies.MovieTheater.Name,
                        Latitude = movieTheaterMovies.MovieTheater.Location.Y,
                        Longitude = movieTheaterMovies.MovieTheater.Location.X
                    });
                }
            }

            return result;
        }

        private List<GenreDTO> MapMoviesGenres(Movie movie, MovieDTO moviedto)
        {
            var result = new List<GenreDTO>();

            if (movie.MoviesGenres != null)
            {
                foreach (var genre in movie.MoviesGenres)
                {
                    result.Add(new GenreDTO() { Id = genre.GenreId, Name = genre.Genre.Name });
                }
            }

            return result;
        }

        private List<MovieGenre> MapMoviesGenres(MovieCreationDTO movieCreationDTO, Movie movie)
        {
            var result = new List<MovieGenre>();

            if (movieCreationDTO.GenresIds == null) { return result; }

            foreach (var id in movieCreationDTO.GenresIds)
            {
                result.Add(new MovieGenre() { GenreId = id });
            }

            return result;
        }

        private List<MovieMovieteather> MapMovieTheatersMovies(MovieCreationDTO movieCreationDTO,
            Movie movie)
        {
            var result = new List<MovieMovieteather>();

            if (movieCreationDTO.MovieTheatersIds == null) { return result; }

            foreach (var id in movieCreationDTO.MovieTheatersIds)
            {
                result.Add(new MovieMovieteather() { MovieTheaterId = id });
            }

            return result;
        }

        private List<MovieActor> MapMoviesActors(MovieCreationDTO movieCreationDTO, Movie movie)
        {
            var result = new List<MovieActor>();

            if (movieCreationDTO.Actors == null) { return result; }

            foreach (var actor in movieCreationDTO.Actors)
            {
                result.Add(new MovieActor() { ActorId = actor.Id, Character = actor.Character });
            }

            return result;
        }
    }
}
