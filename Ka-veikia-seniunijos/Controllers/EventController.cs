using Ka_veikia_seniunijos.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Ka_veikia_seniunijos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : Controller
    {
        private readonly IConfiguration _configuration;

        public EventController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{eldership}")]
        public JsonResult Get(string eldership, [FromQuery]string[] options = null)
        {
            bool optionAdd = false;
            eldership = eldership.ToLowerInvariant();
            StringBuilder query = new StringBuilder();
            query.Append(@"select * from BSJ0CVGChE.Event where eldership = " + "'" + eldership + "'");
            if(options.Length > 0)
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
        [HttpGet("GetDayEvents/{eldership}")]
        public JsonResult GetDayEvents(string eldership, DateTime? date = null, bool descending = true)
        {
            string desc = descending ? "DESC" : "ASC";
            StringBuilder query = new StringBuilder();
            query.Append(@"select * from BSJ0CVGChE.Event WHERE eldership ='" + eldership+"'");
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