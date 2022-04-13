using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using Ka_veikia_seniunijos.Models;
using Ka_veikia_seniunijos.DataTransferObjects;
using MySqlConnector;
using Ka_veikia_seniunijos.Services;
using Ka_veikia_seniunijos.Helpers;
using System.Security.Cryptography;
using Ka_veikia_seniunijos.Interfaces;

namespace Ka_veikia_seniunijos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private IUserService _userService;

        public UserController(IConfiguration configuration, IUserService userService)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"select * from BSJ0CVGChE.User where id = " + id;
            using var connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            connection.Open();
            MySqlCommand myCommand = connection.CreateCommand();
            myCommand.CommandText = query;
            MySqlDataReader rdr = myCommand.ExecuteReader();
            DataTable table = new DataTable();
            table.Load(rdr);
            rdr.Close();
            connection.Close();
            return new JsonResult(table);
        }

        [HttpPut]
        public int Put(User user)
        {
            MySqlConnection connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            connection.Open();
            int returnCode = 200;

            MySqlCommand command = user.Password == null ?
                                    getUserProfileUpdateCommand(user, connection) :
                                    getUesrPasswordUpdateCommand(user, connection);
            try
            {
                command.ExecuteNonQuery();
            }
            catch
            {
                returnCode = 1062;
            }

            connection.Close();
            return returnCode;
        }

        private MySqlCommand getUserProfileUpdateCommand(User user, MySqlConnection connection)
        {
            MySqlCommand command = new MySqlCommand("UPDATE BSJ0CVGChE.User SET " +
                                        "firstName=?firstName, " +
                                        "lastName=?lastName, " +
                                        "email=?email, " +
                                        "municipality=?municipality " +
                                        "WHERE Id=?id", connection);

            command.Parameters.Add(new MySqlParameter("firstName", user.FirstName));
            command.Parameters.Add(new MySqlParameter("lastName", user.LastName));
            command.Parameters.Add(new MySqlParameter("email", user.Email));
            command.Parameters.Add(new MySqlParameter("municipality", user.Municipality));

            return command;
        }

        private MySqlCommand getUesrPasswordUpdateCommand(User user, MySqlConnection connection)
        {
            string hashedPassword = getHashedPassword(user.Password);
            MySqlCommand command = new MySqlCommand("UPDATE BSJ0CVGChE.User SET " +
                            "passwordHashed=?passwordHashed, " +
                            "WHERE Id=?id", connection);

            command.Parameters.Add(new MySqlParameter("passwordHashed", hashedPassword));

            return command;
        }

        private string getHashedPassword(string password)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            return Convert.ToBase64String(hashBytes);
        }

        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            string query = @"
                    delete from  BSJ0CVGChE.User
                    where id = " + id + @" 
                    ";
            using var connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            connection.Open();
            MySqlCommand myCommand = connection.CreateCommand();
            myCommand.CommandText = query;
            myCommand.ExecuteNonQuery();
            connection.Close();
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
            //
            string passwordHashed = hashPassword(user.Password);
            string query = @"
                        insert into BSJ0CVGChE.User (firstName, lastName, email, municipality, passwordHashed) values 
                        ('" + user.FirstName + "','" + user.LastName + "','" + user.Email + "','" + user.Municipality + "','" + passwordHashed + "')";

            using var connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            connection.Open();
            MySqlCommand myCommand = connection.CreateCommand();

            myCommand.CommandText = query;
            try
            {
                myCommand.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                connection.Close();
                return 1062;//error
            }
            connection.Close();
            return 200;//good

        }
        [Route("auth")]
        [HttpPost]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            //var passwordHashed = hashPassword(model.Password);
            //model.Password = passwordHashed;
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
