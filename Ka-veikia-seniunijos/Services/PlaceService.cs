using Ka_veikia_seniunijos.Interfaces;
using MySqlConnector;
using System.Data;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Ka_veikia_seniunijos.Services
{
    public class PlaceService : IPlaceService
    {
        private readonly IConfiguration _configuration;
        public PlaceService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string DataTableToJSON(DataTable table)
        {
            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(table);
            return JSONString;
        }
        public string GetAllPinsJson()
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            StringBuilder query = new StringBuilder();
            query.Append("Select Name,Latitude,Longtitude from Place  ");
            connection.Open();
            MySqlCommand myCommand = connection.CreateCommand();
            myCommand.CommandText = query.ToString();
            MySqlDataReader rdr = myCommand.ExecuteReader();
            DataTable table = new DataTable();
            table.Columns.Add("Type", typeof(string));
            table.Load(rdr);
            rdr.Close();
            table.Columns.Add("Price", typeof(string)).SetOrdinal(2);

            foreach (DataRow row in table.Rows)
            {
                row["Price"] = "Free";
                row["Type"] = "place";
            }
            connection.Close();
            return DataTableToJSON(table);
        }
    }

}
