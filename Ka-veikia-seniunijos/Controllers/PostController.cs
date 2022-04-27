using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Data;
using System.Text;
using System.Linq;
using Newtonsoft.Json;
using Ka_veikia_seniunijos.ModelsEF;
using Ka_veikia_seniunijos.Interfaces;

namespace Ka_veikia_seniunijos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : Controller
    {
        private DatabaseContext _databaseContext;
        public PostController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [HttpGet("GetDayPosts/{eldership}")]//reik pridet pagal diena
        public JsonResult GetDayPosts(string eldership, DateTime? date = null, bool descending = true)
        {
            eldership = eldership.ToLower();
            var eldership_fk = _databaseContext.Eldership.Where(e => e.Name == eldership).Select(e => e.Id).SingleOrDefault();
            var posts = _databaseContext.Post.Where(p => p.EldershipFk == eldership_fk).OrderByDescending(p => p.PostDate).ToList();
            if (posts == null)
            {
                return new JsonResult("Empty posts by " + eldership);
            }
            if (!descending)
            {
                posts.OrderBy(p => p.PostDate);
            }
            return new JsonResult(posts);//good
        }
        //    [HttpPost]
        //     public int Post(Post post)
        //     {
        //         string query = @"
        //                     insert into BSJ0CVGChE.Post (topic, text, postDate, eldership_fk) values" +
        //                     "('" + post.Topic + "','" + post.Text + "','" + post.PostDate + "','" + post.Eldership_fk + "')";

        //         using var connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
        //         connection.Open();
        //         MySqlCommand myCommand = connection.CreateCommand();
        //         myCommand.CommandText = query;
        //         try
        //         {
        //             myCommand.ExecuteNonQuery();
        //         }
        //         catch (Exception e)
        //         {
        //             connection.Close();
        //             return 1062;//error
        //         }
        //         connection.Close();
        //         return 200;//good
        //     }

        //     [HttpPut]
        //     public int Put(Post post)
        //     {
        //         MySqlConnection connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
        //         connection.Open();
        //         int returnCode = 200;

        //         MySqlCommand command = new MySqlCommand("UPDATE BSJ0CVGChE.Post SET " +
        //                         "topic=?topic, " +
        //                         "text=?text, " +
        //                         "postDate=?postDate, " +
        //                         "eldership_fk=?eldership_fk " +
        //                         "WHERE id=?id", connection);

        //         command.Parameters.Add(new MySqlParameter("topic", post.Topic));
        //         command.Parameters.Add(new MySqlParameter("text", post.Text));
        //         command.Parameters.Add(new MySqlParameter("postDate", post.PostDate));
        //         command.Parameters.Add(new MySqlParameter("eldership_fk", post.Eldership_fk));
        //         command.Parameters.Add(new MySqlParameter("id", post.Id));

        //         try
        //         {
        //             command.ExecuteNonQuery();
        //         }
        //         catch (Exception e)
        //         {
        //             returnCode = 1062;
        //         }

        //         connection.Close();
        //         return returnCode;
        //     }
        //     [HttpDelete("{id}")]
        //     public int Delete(int id)
        //     {
        //         string query = @"
        //                 delete from  BSJ0CVGChE.Post
        //                 where id = " + id + @" 
        //                 ";
        //         using var connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
        //         connection.Open();
        //         MySqlCommand myCommand = connection.CreateCommand();
        //         myCommand.CommandText = query;
        //         myCommand.ExecuteNonQuery();
        //         connection.Close();
        //         return 200;//good
        //     }
    }
}
