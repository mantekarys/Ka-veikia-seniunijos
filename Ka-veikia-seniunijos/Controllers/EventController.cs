using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Data;
using System.Text;
using Newtonsoft.Json;
using Ka_veikia_seniunijos.Interfaces;
using Ka_veikia_seniunijos.Models;
using System.Globalization;

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
        public JsonResult Get(int eldership, [FromQuery] string[] options = null)
        {
            bool optionAdd = false;
            StringBuilder query = new StringBuilder();
            query.Append(@"select * from BSJ0CVGChE.Event where eldership_FK = " + eldership);
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

        [HttpPost]
        public int Post(Event ev)
        {
            string query = @"
                        insert into BSJ0CVGChE.Event (name, description, price, date, startTime, endTime, eldership_FK, address, latitude, longtitude, postDate) values" +
                        "('" + ev.Name + "','" + ev.Description + "','" + ev.Price + "','" + ev.Date.ToString("o",CultureInfo.GetCultureInfo("en-US")) + "','" + ev.StartTime + "','" +
                        ev.EndTime + "','" + ev.Eldership_FK + "','" + ev.Address + "'," + ev.Latitude + "," + ev.Longtitude + ",'" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "')";

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
                return -1;//error
            }
            connection.Close();
            return 200;//good

        }

        [HttpPut]
        public int Put(Event ev)
        {
            MySqlConnection connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            connection.Open();
            int returnCode = 200;

            MySqlCommand command = new MySqlCommand("UPDATE BSJ0CVGChE.Event SET " +
                            "name=?name, " +
                            "description=?description, " +
                            "price=?price, " +
                            "date=?date, " +
                            "startTime=?startTime, " +
                            "endTime=?endTime, " +
                            "eldership_FK=?eldership_FK, " +
                            "address=?address, " +
                            "latitude=?latitude, " +
                            "longtitude=?longtitude, " +
                            "postDate=?postDate " +
                            "WHERE Id=?id", connection);

            command.Parameters.Add(new MySqlParameter("name", ev.Name));
            command.Parameters.Add(new MySqlParameter("description", ev.Description));
            command.Parameters.Add(new MySqlParameter("price", ev.Price));
            command.Parameters.Add(new MySqlParameter("date", ev.Date));
            command.Parameters.Add(new MySqlParameter("startTime", ev.StartTime));
            command.Parameters.Add(new MySqlParameter("endTime", ev.EndTime));
            command.Parameters.Add(new MySqlParameter("eldership_FK", ev.Eldership_FK));
            command.Parameters.Add(new MySqlParameter("address", ev.Address));
            command.Parameters.Add(new MySqlParameter("latitude", ev.Latitude));
            command.Parameters.Add(new MySqlParameter("longtitude", ev.Longtitude));
            command.Parameters.Add(new MySqlParameter("postDate", ev.PostDate));
            command.Parameters.Add(new MySqlParameter("id", ev.Id));
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
                    delete from  BSJ0CVGChE.Event
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