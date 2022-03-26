using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using Ka_veikia_seniunijos.Models;
using MySqlConnector;
using System.Security.Cryptography;

namespace Ka_veikia_seniunijos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)//could be changed that users would be found not by id but by email
        {
            string query = @"select * from BSJ0CVGChE.User where id = "+id;
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

        [HttpPut]//check municipality
        public JsonResult Put(User user)
        {
            //password hashing
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            var pbkdf2 = new Rfc2898DeriveBytes(user.Password, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);
            string passwordHashed = Convert.ToBase64String(hashBytes);
            //
            string query = @"
                    update BSJ0CVGChE.User set 
                    firstName = '" + user.FirstName + @"',
                    lastName = '" + user.LastName + @"',
                    email = '" + user.Email + @"',
                    municipality = '" + user.Municipality + @"',
                    passwordHashed = '" + passwordHashed + @"'
                    where Id = " + user.Id + @" 
                    ";
            using var connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            connection.Open();
            MySqlCommand myCommand = connection.CreateCommand();
            myCommand.CommandText = query;
            try
            {
                myCommand.ExecuteNonQuery();
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
                connection.Close();
                return new JsonResult("-1");
            }
            connection.Close();
            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)//could be changed that users would be found not by id but by email
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

            return new JsonResult("Deleted Successfully");
        }

        //    [HttpPost]//make password hashed in database
        //    public JsonResult Post(User user)
        //    {
        //        string query = @"
        //                insert into BSJ0CVGChE.User values 
        //                ('" + user.Name + "," + user.LastName + "," + user.Email + "," + user.Municipality + "," + user.Password + "," + user.Name + @"')
        //                ";
        //        DataTable table = new DataTable();
        //        string sqlDataSource = _configuration.GetConnectionString("AppCon");
        //        SqlDataReader myReader;
        //        using (SqlConnection myCon = new SqlConnection(sqlDataSource))
        //        {
        //            myCon.Open();
        //            using (SqlCommand myCommand = new SqlCommand(query, myCon))
        //            {
        //                try
        //                {
        //                    myReader = myCommand.ExecuteReader();
        //                    table.Load(myReader); ;

        //                }
        //                catch (Exception)
        //                {
        //                    //paziurek kame problema
        //                    throw;
        //                }
        //                myReader.Close();
        //                myCon.Close();
        //            }
        //        }

        //        return new JsonResult("1");//arba Added Successfully
        //    }
    }
}
