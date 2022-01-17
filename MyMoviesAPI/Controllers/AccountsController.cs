using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MyMoviesCore.DTOs;
using MyMoviesInfrastructure.Data;
using MyMoviesInfrastructure.Helpers;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace MyMoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AccountsController(UserManager<IdentityUser> userManager,
                                  SignInManager<IdentityUser> signInManager,
                                  IConfiguration configuration,
                                  ApplicationDbContext context,
                                  IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("Users")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy ="IsAdmin")]
        public async  Task<ActionResult<List<UserDTO>>> GetUsers([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = _context.Users.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var users = await queryable.OrderBy(x => x.Email).Paginate(paginationDTO).ToListAsync();
            return _mapper.Map<List<UserDTO>>(users);
        }

        [HttpPost("makeAdmin")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        public async Task<ActionResult> MakeAdmin([FromBody] string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            await _userManager.AddClaimAsync(user, new Claim("role", "admin"));
            return Ok();
        }

        [HttpPost("removeAdmin")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        public async Task<ActionResult> RemoveAdmin([FromBody] string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            await _userManager.RemoveClaimAsync(user, new Claim("role", "admin"));
            return Ok();
        }

        [HttpPost("Create", Name ="CreateUserURL")]
        public async Task<ActionResult<AuthenticationResponse>> CreateAccount([FromBody] UserCredentials userCredentials) 
        {
            var user = new IdentityUser { UserName = userCredentials.Email, Email = userCredentials.Email };
            var result = await _userManager.CreateAsync(user, userCredentials.Password);
            if (result.Succeeded)
            {
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var callbackUrl = Url.RouteUrl("ConfirmEmail", new { userId = user.Id, code = token }, protocol: HttpContext.Request.Scheme);
                EmailService.SendRegisterEmail(userCredentials.Email, callbackUrl);
                return await BuildToken(userCredentials);
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpGet("ConfirmEmail", Name = "ConfirmEmail")]
        public async Task<ActionResult<AuthenticationResponse>> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return NotFound("Invalid Link");
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound("The user does not exists");
            }

            var result = await _userManager.ConfirmEmailAsync(user, code);

            if (result.Succeeded)
            {
                return Ok("Email confirmed!");
            }

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("ForgotPw", Name = "ForgotPw")]
        public async Task<ActionResult<AuthenticationResponse>> ForgotPw([FromBody] ResetPwDTO resetPwDTO)
        {
            var user = await _userManager.FindByEmailAsync(resetPwDTO.Email);
            if (user == null)
            {
                return BadRequest("User does not exists");
            }
            try
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(token);
                var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);
                var link = Url.RouteUrl("ResetPw", new { userId = user.Email, code = codeEncoded }, protocol: HttpContext.Request.Scheme);
                EmailService.SendRegisterEmail(resetPwDTO.Email, link);
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("ResetPw", Name = "ResetPw")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthenticationResponse>> ResetPw(string userId, string code)
        {
            return Redirect("http://localhost:4200/resetpw?" + $"userId={userId}" + $"&code={code}");
        }

        [HttpPost("ResetPassword", Name = "ResetPassword")]
        public async Task<ActionResult<AuthenticationResponse>> ResetPassword([FromBody] ResetPasswordDTO resetPasswordDTO)
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordDTO.Email);
            var codeDecodedBytes = WebEncoders.Base64UrlDecode(resetPasswordDTO.Token);
            var codeDecoded = Encoding.UTF8.GetString(codeDecodedBytes);
            var result= await _userManager.ResetPasswordAsync(user, codeDecoded, resetPasswordDTO.Password);
            if (result.Succeeded)
            {
                return Ok("Password has been changed!");
            }
            else
            {
                return BadRequest("An error ocurrs");
            }
        }


        private async Task<AuthenticationResponse> BuildToken(UserCredentials userCredentials)
        {
            var claims = new List<Claim>()
            {
                new Claim("email", userCredentials.Email)
            };

            var user = await _userManager.FindByEmailAsync(userCredentials.Email);
            var claimsDB = await _userManager.GetClaimsAsync(user);

            claims.AddRange(claimsDB);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["keyjwt"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddYears(1);

            var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims, expires: expiration, signingCredentials: creds);


            return new AuthenticationResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
         }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponse>> LogIn([FromBody] UserCredentials userCredentials)
        {
            var result = await _signInManager.PasswordSignInAsync(userCredentials.Email, userCredentials.Password, isPersistent: false, lockoutOnFailure: false);
            var user = _signInManager.UserManager.FindByEmailAsync(userCredentials.Email);

            if (result.Succeeded)
            {
                return await BuildToken(userCredentials);
            }
            else
            {
                try
                {
                    if (!user.Result.EmailConfirmed)
                    {
                        return BadRequest("Invalid login attempt. You must have a confirmed email account.");
                    }
                }
                catch
                {
                    return BadRequest("Incorrect Login");
                }
                
                
                return BadRequest("Incorrect Login");
            }
         }

    }
}
