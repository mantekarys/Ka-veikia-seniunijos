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

    }
}