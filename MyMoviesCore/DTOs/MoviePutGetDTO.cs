﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyMoviesCore.DTOs
{
    public class MoviePutGetDTO
    {
        public MovieDTO Movie { get; set; }
        public List<GenreDTO> SelectedGenres { get; set; }
        public List<GenreDTO> NonSelectedGenres { get; set; }
        public List<MovieTheaterDTO> SelectedMovieTheaters { get; set; }
        public List<MovieTheaterDTO> NonSelectedMovieTheaters { get; set; }
        public List<ActorMovieDTO> Actors { get; set; }
    }
}
