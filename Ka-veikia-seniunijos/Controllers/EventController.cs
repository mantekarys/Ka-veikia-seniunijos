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
    public class EventController : Controller
    {
        private readonly IConfiguration _configuration;
        private IEventService _eventService;

        public EventController(IConfiguration configuration, IEventService eventService)
        {
            _configuration = configuration;
            _eventService = eventService;
        }

        [HttpGet("{eldership}")]
        public JsonResult Get(string eldership, [FromQuery] string[] options = null)
        {
            bool optionAdd = false;
            eldership = eldership.ToLowerInvariant();
            StringBuilder query = new StringBuilder();
            query.Append(@"select * from BSJ0CVGChE.Event where eldership = " + "'" + eldership + "'");
            if (options.Length > 0)
            {
                optionAdd = true;
            }
            if (optionAdd)
            {
                query.Append(" order By ");

            }
            foreach (var opt in options)
            {
                query.Append(opt + ", ");
            }
            if (optionAdd)
            {
                query.Length -= 2;
            }
            Console.WriteLine(query.ToString());
            using var connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            connection.Open();
            MySqlCommand myCommand = connection.CreateCommand();
            myCommand.CommandText = query.ToString();
            MySqlDataReader rdr = myCommand.ExecuteReader();
            DataTable table = new DataTable();
            table.Load(rdr);
            rdr.Close();
            connection.Close();
            return new JsonResult(table);
        }
        [HttpGet("pins")]
        public JsonResult GetPins([FromQuery] bool free = false)
        {
            string result = _eventService.GetAllPinsJson(free);
            JsonResult table = new JsonResult(JsonConvert.DeserializeObject(result));
            return table;
        }
    }
}