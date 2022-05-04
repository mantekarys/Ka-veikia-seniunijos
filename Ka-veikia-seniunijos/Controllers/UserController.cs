using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using Ka_veikia_seniunijos.DataTransferObjects;
using MySqlConnector;
using Ka_veikia_seniunijos.Services;
using Ka_veikia_seniunijos.Helpers;
using System.Security.Cryptography;
using System.Linq;
using Ka_veikia_seniunijos.ModelsEF;
using Ka_veikia_seniunijos.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Ka_veikia_seniunijos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private DatabaseContext _databaseContext;

        private IUserService _userService;

        public UserController(DatabaseContext databaseContext, IUserService userService)
        {
            _userService = userService;
            _databaseContext = databaseContext;
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var user = _databaseContext.User.FirstOrDefault(p => p.Id == id);
            return new JsonResult(user);
        }

        [HttpPut]
        public int Put(User user)
        {
            if (user == null)
            {
                return 1062;
            }
            int returnCode = 200;
            returnCode = user.PasswordHashed == null ?
                                    getUserProfileUpdateCommand(user) :
                                    getUserPasswordUpdateCommand(user);

            return returnCode;
        }

        private int getUserProfileUpdateCommand(User user)
        {
            _databaseContext.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            var userOld = _databaseContext.User.FirstOrDefault(p => p.Id == user.Id);
            user.PasswordHashed = userOld.PasswordHashed;
            _databaseContext.User.Update(user);
            var update = _databaseContext.SaveChanges();
            if (update < 1)
            {
                return 1062;
            }
            return 200;
        }

        private int getUserPasswordUpdateCommand(User user)
        {
            string hashedPassword = hashPassword(user.PasswordHashed);
            user.PasswordHashed = hashedPassword;
            _databaseContext.User.Update(user);
            var update = _databaseContext.SaveChanges();
            if (update < 1)
            {
                return 1062;
            }
            // MySqlCommand command = new MySqlCommand("UPDATE BSJ0CVGChE.User SET " +
            //                 "passwordHashed=?passwordHashed, " +
            //                 "WHERE Id=?id", connection);

            // command.Parameters.Add(new MySqlParameter("passwordHashed", hashedPassword));

            return 200;
        }


        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            var user = _databaseContext.User.FirstOrDefault(p => p.Id == id);
            if (user == null)
            {
                return 1062;
            }
            _databaseContext.User.Remove(user);
            _databaseContext.SaveChanges();
            return 200;//good
        }

        //For reusing
        private string hashPassword(string password)
        {
            //password hashing
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);
            string passwordHashed = Convert.ToBase64String(hashBytes);
            return passwordHashed;
        }
        [HttpPost]
        public int Post(User user)
        {
            if (user == null)
            {
                return 1062;
            }
            _databaseContext.User.Add(user);
            int update = _databaseContext.SaveChanges();
            if (update < 1)
                return 1062;
            return 200;//good

        }
        [Route("auth")]
        [HttpPost]
        public IActionResult Authenticate(AuthenticateRequest model)
        {

            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "El. paštas arba slaptažodis yra neteisingi" });

            return Ok(response);
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }
    }
}
