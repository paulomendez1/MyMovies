using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMoviesCore.DTOs;
using MyMoviesCore.Entities;
using MyMoviesCore.Interfaces;
using MyMoviesInfrastructure.Data;
using MyMoviesInfrastructure.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IRepository<Movie> _movieRepository;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;

        public MoviesController(IRepository<Movie> movieRepository,
                                IMapper mapper,
                                IFileStorageService fileStorageService,
                                ApplicationDbContext context)
        {
            _movieRepository = movieRepository;
            _mapper = mapper;
            _fileStorageService = fileStorageService;
            _context = context;
        }
        [HttpGet("PostGetMovies")]
        public async Task<ActionResult<MoviePostGetDTO>> PostGetMovies()
        {
            var movieTheaters = await _context.MovieTheaters.OrderBy(x => x.Name).ToListAsync();
            var genres = await _context.Genres.OrderBy(x => x.Name).ToListAsync();

            var movieTheatersDTO = _mapper.Map<List<MovieTheaterDTO>>(movieTheaters);
            var genresDTO = _mapper.Map<List<GenreDTO>>(genres);

            return new MoviePostGetDTO() { Genres = genresDTO, MovieTheaters = movieTheatersDTO };
        }

        [HttpPost]
        public async Task<ActionResult<int>> PostMovie([FromForm] MovieCreationDTO movieDTO)
        {
            var movie = _mapper.Map<Movie>(movieDTO);
            if (movieDTO.Poster != null)
            {
                movie.Poster = await _fileStorageService.SaveFile("movies", movieDTO.Poster);
            }
            AnnotateActorsOrder(movie);
            await _movieRepository.Insert(movie);
            return movie.Id;
        }

        private void AnnotateActorsOrder(Movie movie)
        {
            if (movie.MoviesActors != null)
            {
                for (int i = 0; i < movie.MoviesActors.Count(); i++)
                {
                    movie.MoviesActors[i].Order = i;
                }
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<MovieDTO>> GetMovieById(int id)
        {
            var movie = await _movieRepository.GetAll().AsQueryable()
                                              .Include(x => x.MoviesGenres).ThenInclude(x => x.Genre)
                                              .Include(x => x.MoviesMovieteathers).ThenInclude(x => x.MovieTheater)
                                              .Include(x => x.MoviesActors).ThenInclude(x => x.Actor)
                                              .FirstOrDefaultAsync(x => x.Id == id);
            if (movie == null)
            {
                return NotFound();
            }

            var dto = _mapper.Map<MovieDTO>(movie);
            dto.Actors = dto.Actors.OrderBy(x => x.Order).ToList();
            return dto;
        }

        [HttpGet]
        public async Task<ActionResult<HomeDTO>> GetHome()
        {
            var top = 6;
            var today = DateTime.Today;

            var upcomingReleases = await _movieRepository.GetAll().AsQueryable()
                                                        .Where(x => x.ReleaseDate > today)
                                                        .OrderBy(x => x.ReleaseDate)
                                                        .Take(top)
                                                        .ToListAsync();
            var inTheaters = await _movieRepository.GetAll().AsQueryable()
                                                        .Where(x => x.InTheaters)
                                                        .OrderBy(x => x.ReleaseDate)
                                                        .Take(top)
                                                        .ToListAsync();

            var homeDTO = new HomeDTO();
            homeDTO.UpcomingReleases = _mapper.Map<List<MovieDTO>>(upcomingReleases);
            homeDTO.InTheaters = _mapper.Map<List<MovieDTO>>(inTheaters);
            return homeDTO;
        }

        [HttpGet("filter")]
        public async Task<ActionResult<List<MovieDTO>>> FilterMovie ([FromQuery] MovieFilterDTO movieFilterDTO)
        {
            var moviesQueryable = _movieRepository.GetAll().AsQueryable();

            if (!string.IsNullOrEmpty(movieFilterDTO.Title))
            {
                moviesQueryable = moviesQueryable.Where(x => x.Title.Contains(movieFilterDTO.Title));
            }
            if (movieFilterDTO.InTheaters)
            {
                moviesQueryable = moviesQueryable.Where(x => x.InTheaters);
            }
            if (movieFilterDTO.UpcomingReleases)
            {
                var today = DateTime.Today;
                moviesQueryable = moviesQueryable.Where(x => x.ReleaseDate>today);
            }
            if (movieFilterDTO.GenreId!= 0)
            {
                moviesQueryable = moviesQueryable.Where(x => x.MoviesGenres.Select(y => y.GenreId)
                                                 .Contains(movieFilterDTO.GenreId));
            }

            await HttpContext.InsertParametersPaginationInHeader(moviesQueryable);
            var movies = await moviesQueryable.OrderBy(x => x.Title).Paginate(movieFilterDTO.PaginationDTO).ToListAsync();
            return _mapper.Map<List<MovieDTO>>(movies);
        }

        [HttpGet("putget/{id:int}")]
        public async Task<ActionResult<MoviePutGetDTO>> PutGetMovie(int id)
        {
            var movieAR = await GetMovieById(id);
            if (movieAR.Result is NotFoundResult)
            {
                return NotFound();
            }
            var movie = movieAR.Value;

            var genresSelectedIds = movie.Genres.Select(x => x.Id).ToList();
            var nonSelectedGenres = await _context.Genres
                                            .Where(x => !genresSelectedIds.Contains(x.Id))
                                            .ToListAsync();

            var movieTheatersIds = movie.MovieTheaters.Select(x => x.Id).ToList();
            var nonSelectedmovieTheaters = await _context.MovieTheaters
                                            .Where(x => !movieTheatersIds.Contains(x.Id))
                                            .ToListAsync();

            var nonSelectedGenresDTO = _mapper.Map<List<GenreDTO>>(nonSelectedGenres);
            var nonSelectedmovieTheatersDTO = _mapper.Map<List<MovieTheaterDTO>>(nonSelectedmovieTheaters);

            var response = new MoviePutGetDTO();
            response.Movie = movie;
            response.SelectedGenres = movie.Genres;
            response.NonSelectedGenres = nonSelectedGenresDTO;
            response.SelectedMovieTheaters = movie.MovieTheaters;
            response.NonSelectedMovieTheaters = nonSelectedmovieTheatersDTO;
            response.Actors = movie.Actors;
            return response;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> PutMovie(int id, [FromForm] MovieCreationDTO movieCreationDTO)
        {
            var movie = await _movieRepository.GetAll().AsQueryable()
                                             .Include(x=> x.MoviesActors)
                                             .Include(x => x.MoviesGenres)
                                             .Include(x => x.MoviesMovieteathers)
                                             .FirstOrDefaultAsync(x=> x.Id == id);

            if (movie==null)
            {
                return NotFound();
            }

            movie = _mapper.Map(movieCreationDTO, movie);

            if (movieCreationDTO.Poster!= null)
            {
                movie.Poster = await _fileStorageService.EditFile("movies", movieCreationDTO.Poster, movie.Poster);
            }

            AnnotateActorsOrder(movie);
            _movieRepository.Update(movie);
            return NoContent();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _movieRepository.GetById(id);
            if (movie == null)
            {
                return NotFound();
            }
            await _movieRepository.Delete(id);
            await _fileStorageService.DeleteFile(movie.Poster, "actors");
            return Ok();
        }
    }
}
