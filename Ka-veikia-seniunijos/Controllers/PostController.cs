using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Data;
using System.Text;
using Newtonsoft.Json;
using Ka_veikia_seniunijos.Interfaces;
using Ka_veikia_seniunijos.Models;

namespace Ka_veikia_seniunijos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : Controller
    {
        private readonly IConfiguration _configuration;
        private IEventService _eventService;

        public PostController(IConfiguration configuration, IEventService eventService)
        {
            _configuration = configuration;
            _eventService = eventService;
        }

        [HttpGet("GetDayPots/{eldership}")]
        public JsonResult GetDayPots(int eldership, DateTime? date = null, bool descending = true)
        {
            string desc = descending ? "DESC" : "ASC";
            StringBuilder query = new StringBuilder();
            query.Append(@"select * from BSJ0CVGChE.Post WHERE eldership_fk =" + eldership);
            if (date.HasValue)
            {
                query.Append(@" and postDate ='" + date.Value.ToString("yyyy-MM-dd") + "'");
            }
            query.Append(@" ORDER BY postDate " + desc);
            Console.WriteLine(query.ToString());
            using var connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            connection.Open();
            MySqlCommand myCommand = connection.CreateCommand();
            myCommand.CommandText = query.ToString();
            DataTable table = new DataTable();
            try
            {
                MySqlDataReader rdr = myCommand.ExecuteReader();
                table.Load(rdr);
                rdr.Close();
            }
            catch (Exception e)
            {
                connection.Close();
                return new JsonResult("-1");//error
            }
            connection.Close();
            return new JsonResult(table);//good
        }
        [HttpPost]
        public int Post(Post post)
        {
            string query = @"
                        insert into BSJ0CVGChE.Post (topic, text, postDate, eldership_fk) values" +
                        "('" + post.Topic + "','" + post.Text + "','" + post.PostDate + "','" + post.Eldership_fk +  "')";

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

        [HttpPut]
        public int Put(Post post)
        {
            MySqlConnection connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            connection.Open();
            int returnCode = 200;

            MySqlCommand command = new MySqlCommand("UPDATE BSJ0CVGChE.Post SET " +
                            "topic=?topic, " +
                            "text=?text, " +
                            "postDate=?postDate, " +
                            "eldership_fk=?eldership_fk " +
                            "WHERE id=?id", connection);

            command.Parameters.Add(new MySqlParameter("topic", post.Topic));
            command.Parameters.Add(new MySqlParameter("text", post.Text));
            command.Parameters.Add(new MySqlParameter("postDate", post.PostDate));
            command.Parameters.Add(new MySqlParameter("eldership_fk", post.Eldership_fk));
            command.Parameters.Add(new MySqlParameter("id", post.Id));

            try
            {
                command.ExecuteNonQuery();
            }
            catch(Exception e)
            {
                returnCode = 1062;
            }

            connection.Close();
            return returnCode;
        }
        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            string query = @"
                    delete from  BSJ0CVGChE.Post
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
    }
}
