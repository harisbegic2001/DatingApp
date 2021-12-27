using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Mvc;
using API.Entities;
using System.Text;
using System.Security.Cryptography;
using System.Collections.Generic;
using System.Linq;
using API.DTOs;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly DataContext _context;
        public AccountController(DataContext context, ITokenService tokenService)
        {
        _tokenService = tokenService;
        _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<AppUser>> GetAllUsers(){
            var provjera = _context.AppUsers.ToList();
            return provjera;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto){
            
            if(await UserExists(registerDto.Username)) return BadRequest("Username is taken");
            using var hmac = new HMACSHA512(); //Objasniti kako ovo funkcioniše
                /*hmac - nasumičnom stringu*/
            var user = new AppUser{
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key /*Ovo*/
            };

        _context.AppUsers.Add(user);
        await _context.SaveChangesAsync();
        return new UserDto
        {
            Username = user.UserName,
            Token = _tokenService.CreateToken(user)
        };
        
        }
        private async Task<bool> UserExists(string username)
        {
            return await _context.AppUsers.AnyAsync(x => x.UserName == username.ToLower());
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
            var user = await _context.AppUsers.SingleOrDefaultAsync(x => x.UserName == loginDto.Username);

            if(user == null){ Unauthorized("Invalid Username");}

            using var hmac = new HMACSHA512(user.PasswordSalt); /*Zbunjuje me zašto nam treba ovaj salt u zagradi*/

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            /*012345477*/
            for(int i = 0; i < computedHash.Length; i++){
                if(computedHash[i] != user.PasswordHash[i]) {return Unauthorized("Invalid password");}
            
            }

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

       

        [HttpDelete("{id}")]
        public ActionResult DeleteUsers(int id){
            var korisnik = _context.AppUsers.SingleOrDefault(x => x.Id == id);
            if(korisnik == null){
                return Ok();
            }
            _context.AppUsers.Remove(korisnik);
            _context.SaveChanges();
            return NoContent();
        }

    }
}