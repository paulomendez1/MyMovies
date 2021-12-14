using AutoMapper;
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
    public class GenresController : ControllerBase
    {
        private readonly IRepository<Genre> _genreRepository;
        private readonly IMapper _mapper;

        public GenresController(IRepository<Genre> repository, IMapper mapper)
        {
            _genreRepository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetGenres()
        {
            var genres = _genreRepository.GetAll().OrderBy(x=> x.Name);
            var genresDTO = _mapper.Map <IEnumerable<GenreDTO>>(genres);

            return Ok(genresDTO);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGenreById(int id)
        {
            var genre = await _genreRepository.GetById(id);
            if (genre == null)
            {
                return NotFound();
            }
            var genreDTO = _mapper.Map<GenreDTO>(genre); 
            return Ok(genreDTO);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutGenre(int id, GenreDTO genreDTO)
        {
            var genre = _mapper.Map<Genre>(genreDTO);
            genre.Id = id;
            _genreRepository.Update(genre);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGenre(int id)
        {
            var result = await _genreRepository.Delete(id);
            var response = new ApiResponse<bool>(result);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> PostGenre(GenreDTO genreDTO)
        {
            var genre = _mapper.Map<Genre>(genreDTO);
            await _genreRepository.Insert(genre);
            genreDTO = _mapper.Map<GenreDTO>(genre);
            var response = new ApiResponse<GenreDTO>(genreDTO);
            return Ok(response);
        }


    }

}
