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
using System.Linq.Dynamic.Core;

namespace MyMoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorsController : ControllerBase
    {
        private readonly IRepository<Actor> _actorRepository;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;

        public ActorsController(IRepository<Actor> actorRepository, 
                                IMapper mapper,
                                IFileStorageService fileStorageService,
                                ApplicationDbContext context)
        {
            _actorRepository = actorRepository;
            _mapper = mapper;
            _fileStorageService = fileStorageService;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetActorsAsync([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = _actorRepository.GetAll().AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            if (!string.IsNullOrEmpty(paginationDTO.sortColumn))
            {
                paginationDTO.sortOrder = !string.IsNullOrEmpty(paginationDTO.sortOrder)
                && paginationDTO.sortOrder.ToUpper() == "ASC"
                ? "ASC"
                : "DESC";
                queryable = queryable.OrderBy(
                string.Format(
                "{0} {1}",
                paginationDTO.sortColumn,
                paginationDTO.sortOrder)
                );
            }
            var actors = await queryable.Paginate(paginationDTO).ToListAsync();
            var actorsDTO = _mapper.Map<IEnumerable<ActorDTO>>(actors);
            return Ok(actorsDTO);
        }

        private bool IsValidProperty(string sortColumn)
        {
            throw new NotImplementedException();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActorById(int id)
        {
            var actor = await _actorRepository.GetById(id);
            if (actor == null)
            {
                return NotFound();
            }
            var actorDTO = _mapper.Map<ActorDTO>(actor);
            return Ok(actor);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutActor(int id, [FromForm] ActorDTO actorDTO)
        {
            var actor = await _actorRepository.GetById(id);
            actorDTO.Id = actor.Id;

            if (actor==null)
            {
                return NotFound();
            }

            actor = _mapper.Map(actorDTO, actor);

            if (actorDTO.Picture != null)
            {
                actor.Picture = await _fileStorageService.EditFile("actors", actorDTO.Picture, actor.Picture);
            }
            _actorRepository.Update(actor);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActor(int id)
        {
            var actor = await _actorRepository.GetById(id);
            var result = await _actorRepository.Delete(id);
            var response = new ApiResponse<bool>(result);
            await _fileStorageService.DeleteFile(actor.Picture, "actors");
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> PostActor([FromForm] ActorDTO actorDTO)
        {
            var actor = _mapper.Map<Actor>(actorDTO);

            if (actorDTO.Picture != null)
            {
                actor.Picture = await _fileStorageService.SaveFile("actors", actorDTO.Picture);
            }
            await _actorRepository.Insert(actor);
            actorDTO = _mapper.Map<ActorDTO>(actor);
            var response = new ApiResponse<ActorDTO>(actorDTO);
            return Ok(response);
        }

        [HttpPost("searchByName")]

        public async Task<ActionResult<List<ActorMovieDTO>>> SearchByName([FromBody] string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return new List<ActorMovieDTO>();
            }
            return await _context.Actors.Where(x => x.Name.Contains(name))
                                        .OrderBy(x => x.Name)
                                        .Select(x => new ActorMovieDTO { Id = x.Id, Name = x.Name, Picture = x.Picture })
                                        .Take(5)
                                        .ToListAsync();
        }

    }
}
