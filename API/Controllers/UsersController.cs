using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    //[Authorize]
    public class UsersController : BaseApiController
    {
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepostiory, IMapper mapper)
        {
            _userRepository = userRepostiory;
            _mapper = mapper;
        }

    
        [HttpGet]
        public async  Task<ActionResult <IEnumerable<MemberDto>>> GetUsers(){

        var users =  await _userRepository.GetMembersAsync();
        return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult <MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);

            
        }



        // [HttpPost]
        // public ActionResult<AppUser> CreateUser(AppUser appUser) /*Ovdjeeeee*/
        // {
        // _context.AppUsers.Add(appUser);
        // _context.SaveChanges();
        // return Ok(appUser);
        
        // }
    }
}