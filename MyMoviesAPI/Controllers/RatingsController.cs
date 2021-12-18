using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public class RatingsController : ControllerBase
    {
        private readonly IRepository<Rating> _ratingRepository;
        private readonly UserManager<IdentityUser> _userManager;

        public RatingsController(IRepository<Rating> ratingRepository,
                                UserManager<IdentityUser> userManager)
        {
            _ratingRepository = ratingRepository;
            _userManager = userManager;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> PostRating ([FromBody]RatingDTO ratingDTO)
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await _userManager.FindByEmailAsync(email);
            var userId = user.Id;

            var currentRate = await _ratingRepository.GetAll().AsQueryable()
                                        .FirstOrDefaultAsync(x => x.MovieId == ratingDTO.MovieId && x.UserId == userId);

            var rating = new Rating();
            rating.UserId = userId;
            rating.MovieId = ratingDTO.MovieId;
            if (currentRate == null)
            {
                rating.Rate = ratingDTO.Rating;
                await _ratingRepository.Insert(rating);
            }
            else
            {
                var ratingUser = _ratingRepository.GetAll().Where(x => x.UserId == userId).FirstOrDefault();
                await _ratingRepository.Delete(ratingUser.Id);
                rating.Rate = ratingDTO.Rating;
                await _ratingRepository.Update(rating);
            }

            return Ok();
        }
    }
}
