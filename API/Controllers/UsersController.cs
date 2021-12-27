using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

    
        [HttpGet]
        [AllowAnonymous]
        public async  Task<ActionResult <IEnumerable<AppUser>>> GetAllUsers(){

        var users = _context.AppUsers.ToListAsync();
        return  await users;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult <AppUser>> GetUser(int id)
        {
            var user = _context.AppUsers.FindAsync(id);
            return await user;
        }


        [HttpPost]
        public ActionResult<AppUser> CreateUser(AppUser appUser) /*Ovdjeeeee*/
        {
        _context.AppUsers.Add(appUser);
        _context.SaveChanges();
        return Ok(appUser);
        
        }
    }
}