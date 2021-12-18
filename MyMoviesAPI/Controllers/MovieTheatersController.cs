using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyMoviesCore.DTOs;
using MyMoviesCore.Entities;
using MyMoviesCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class MovieTheatersController : ControllerBase
    {
        private readonly IRepository<MovieTheater> _mTheatersRepository;
        private readonly IMapper _mapper;
        public MovieTheatersController(IRepository<MovieTheater> mTheatersRepository, IMapper mapper)
        {
            _mTheatersRepository = mTheatersRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetMovieTheaters ()
        {
            var movieTheaters = _mTheatersRepository.GetAll().OrderBy(x => x.Name);
            var genresDTO = _mapper.Map<IEnumerable<MovieTheaterDTO>>(movieTheaters);

            return Ok(genresDTO);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovieTheaterById(int id)
        {
            var movieTheater = await _mTheatersRepository.GetById(id);
            if (movieTheater == null)
            {
                return NotFound();
            }
            var movieTheaterDTO = _mapper.Map <MovieTheaterDTO>(movieTheater);
            return Ok(movieTheaterDTO);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutMovieTheater(int id, MovieTheaterDTO movieTheaterDTO)
        {
            var movieTheater = _mapper.Map<MovieTheater>(movieTheaterDTO);
            movieTheater.Id = id;
            _mTheatersRepository.Update(movieTheater);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovieTheater(int id)
        {
            var result = await _mTheatersRepository.Delete(id);
            var response = new ApiResponse<bool>(result);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> PostMovieTheater(MovieTheaterDTO movieTheaterDTO)
        {
            var movieTheater = _mapper.Map<MovieTheater>(movieTheaterDTO);
            await _mTheatersRepository.Insert(movieTheater);
            movieTheaterDTO = _mapper.Map<MovieTheaterDTO>(movieTheater);
            var response = new ApiResponse<MovieTheaterDTO>(movieTheaterDTO);
            return Ok(response);
        }

    }
}
