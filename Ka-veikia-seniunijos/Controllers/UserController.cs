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

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select * from BSJ0CVGChE.User";
            DataTable table = new DataTable();
            using var connection = new MySqlConnection("Server=remotemysql.com;Database=BSJ0CVGChE;User ID= BSJ0CVGChE; password = wElEvnn5cl;");
            connection.Open();
            MySqlCommand myCommand = connection.CreateCommand();
            MySqlTransaction myTrans;

            // Start a local transaction
            myTrans = connection.BeginTransaction();
            // Must assign both transaction object and connection
            // to Command object for a pending local transaction
            myCommand.Connection = connection;
            myCommand.Transaction = myTrans;
            myCommand.CommandText = "select * from User";
            MySqlDataReader rdr = myCommand.ExecuteReader();
            while (rdr.Read())
            {
                Console.WriteLine(rdr[0] + " -- " + rdr[1]);
            }
            rdr.Close();
            // myCommand.CommandText = "insert into User (userName,firstName,lastName,passwordHash) VALUES ('e','e','e','e')";
            // myCommand.ExecuteNonQuery();
            myTrans.Commit();
            Console.WriteLine("Both records are written to database.");
            //string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            //SqlDataReader myReader;
            //using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            //{
            //     using (SqlCommand myCommand = new SqlCommand((query, connection))
            //    {
            //        myReader = myCommand.ExecuteReader();
            //        table.Load(myReader); ;

            //        myReader.Close();
            //        myCon.Close();
            //    }
            //}
            //Get connection string from web.config file  
            // string strcon = "Server=remotemysql.com,3306;Initial Catalog=BSJ0CVGChE; UserId=BSJ0CVGChE;password=wElEvnn5cl;SslMode=none;convert zero datetime=True";//ConfigurationManager.ConnectionStrings["MysqlConnection"].ConnectionString;
            // //create new sqlconnection and connection to database by using connection string from web.config file  
            // SqlConnection con = new SqlConnection(strcon);
            // con.Open();
            Console.WriteLine("Success?");
            return new JsonResult(table);
        }

        [HttpPut]
        public JsonResult Put(User user)
        {
            string query = @"
                    update BSJ0CVGChE.User set 
                    Name = '" + user.Name + @"'
                    LastName = '" + user.LastName + @"'
                    Email = '" + user.Email + @"'
                    Municipality = '" + user.Municipality + @"'
                    Password = '" + user.Password + @"'
                    where Id = " + user.Id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    try
                    {
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader); ;

                        myReader.Close();
                        myCon.Close();
                    }
                    catch (Exception)
                    {
                        return new JsonResult("-1");
                    }
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from  BSJ0CVGChE.User
                    where Id = " + id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }


        [HttpPost]//make password hashed in database
        public JsonResult Post(User user)
        {
            string query = @"
                    insert into BSJ0CVGChE.User values 
                    ('" + user.Name + "," + user.LastName + "," + user.Email + "," + user.Municipality + "," + user.Password + "," + user.Name + @"')
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    try
                    {
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader); ;

                    }
                    catch (Exception)
                    {
                        //paziurek kame problema
                        throw;
                    }
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("1");//arba Added Successfully
        }
    }
}
