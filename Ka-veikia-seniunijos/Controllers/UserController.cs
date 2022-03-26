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
            using var connection = new MySqlConnection(_configuration.GetConnectionString("EmployeeAppCon"));
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

        [HttpPut]//fix password
        public JsonResult Put(User user)
        {
            string query = @"
                    update BSJ0CVGChE.User set 
                    firstName = '" + user.Name + @"'
                    lastName = '" + user.LastName + @"'
                    email = '" + user.Email + @"'
                    municipality = '" + user.Municipality + @"'
                    passwordHashed = '" + user.Password + @"'
                    where Id = " + user.Id + @" 
                    ";
            using var connection = new MySqlConnection(_configuration.GetConnectionString("EmployeeAppCon"));
            connection.Open();
            MySqlCommand myCommand = connection.CreateCommand();
            MySqlTransaction myTrans;
            myTrans = connection.BeginTransaction();
            myCommand.Connection = connection;
            myCommand.Transaction = myTrans;
            myCommand.CommandText = query;
            myCommand.ExecuteNonQuery();
            myTrans.Commit();
            connection.Close();
            //using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            //{
            //    myCon.Open();
            //    using (SqlCommand myCommand = new SqlCommand(query, myCon))
            //    {
            //        try
            //        {
            //            myReader = myCommand.ExecuteReader();
            //            table.Load(myReader); ;

            //            myReader.Close();
            //            myCon.Close();
            //        }
            //        catch (Exception)
            //        {
            //            return new JsonResult("-1");
            //        }
            //    }
            //}

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)//could be changed that users would be found not by id but by email
        {
            string query = @"
                    delete from  BSJ0CVGChE.User
                    where id = " + id + @" 
                    ";
            using var connection = new MySqlConnection(_configuration.GetConnectionString("EmployeeAppCon"));
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
    //        string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
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
