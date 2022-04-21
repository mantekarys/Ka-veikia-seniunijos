using Ka_veikia_seniunijos.Interfaces;
using MySqlConnector;
using System.Data;
using System;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;

namespace Ka_veikia_seniunijos.Services
{
    public class EventService : IEventService
    {
        private readonly IConfiguration _configuration;
        public EventService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string DataTableToJSON(DataTable table)
        {
            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(table, Formatting.Indented);
            return JSONString;
        }

        public string GetAllPinsJson(bool free = false)
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            StringBuilder query = new StringBuilder();
            query.Append("Select Name,Price,Latitude,Longtitude from Event  ");
            if (free)
            {
                query.Append("WHERE Price = 0.00");
            }
            connection.Open();
            MySqlCommand myCommand = connection.CreateCommand();
            myCommand.CommandText = query.ToString();
            MySqlDataReader rdr = myCommand.ExecuteReader();
            DataTable table = new DataTable();
            table.Columns.Add("Type", typeof(string));
            table.Load(rdr);
            foreach (DataRow row in table.Rows)
            {
                row["Type"] = "event";
            }
            rdr.Close();
            connection.Close();
            return DataTableToJSON(table);
        }
    }

}
