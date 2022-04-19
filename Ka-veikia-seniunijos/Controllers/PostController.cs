using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Data;
using System.Text;
using Newtonsoft.Json;
using Ka_veikia_seniunijos.Interfaces;

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
        public JsonResult GetDayPots(string eldership, DateTime? date = null, bool descending = true)
        {
            string desc = descending ? "DESC" : "ASC";
            StringBuilder query = new StringBuilder();
            query.Append(@"select * from BSJ0CVGChE.Post WHERE eldership ='" + eldership + "'");
            if (date.HasValue)
            {
                query.Append(@" and Date ='" + date.Value.ToString("yyyy-MM-dd") + "'");
            }
            query.Append(@" ORDER BY Date " + desc);
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
    }
}
