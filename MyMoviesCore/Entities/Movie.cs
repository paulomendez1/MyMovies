using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyMoviesCore.Entities
{
    public class Movie : BaseEntity
    {
        [Required]
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Trailer { get; set; }
        public bool InTheaters { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Poster { get; set; }
        public List<MovieGenre> MoviesGenres { get; set; }
        public List<MovieMovieteather> MoviesMovieteathers { get; set; }
        public List<MovieActor> MoviesActors { get; set; }

    }
}
