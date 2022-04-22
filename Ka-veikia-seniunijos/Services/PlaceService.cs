using Ka_veikia_seniunijos.Interfaces;
using MySqlConnector;
using System.Data;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Ka_veikia_seniunijos.ModelsEF;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Ka_veikia_seniunijos.Services
{
    public class PlaceService : IPlaceService
    {
        public DatabaseContext _databaseContext;

        public PlaceService(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        //CRUD, might need later
        public void AddPlace(Place place)
        {
            _databaseContext.Place.Add(place);
            _databaseContext.SaveChanges();
        }

        public List<Place> GetPlaces()
        {
            return _databaseContext.Place.ToList();
        }

        public Place GetPlace(string id)
        {
            return _databaseContext.Place.FirstOrDefault(x => x.Id == id);
        }

        public void UpdatePlace(Place place)
        {
            _databaseContext.Place.Update(place);
            _databaseContext.SaveChanges();
        }

        public void DeletePlace(string id)
        {
            var place = _databaseContext.Place.FirstOrDefault(x => x.Id == id);
            if (place != null)
            {
                _databaseContext.Place.Remove(place);
                _databaseContext.SaveChanges();
            }
        }

        public string DataTableToJSON(DataTable table)
        {
            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(table);
            return JSONString;
        }
        public string GetAllPinsJson()
        {
            // using var connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            // StringBuilder query = new StringBuilder();
            // query.Append("Select Name,Latitude,Longtitude from Place  ");
            // connection.Open();
            // MySqlCommand myCommand = connection.CreateCommand();
            // myCommand.CommandText = query.ToString();
            // MySqlDataReader rdr = myCommand.ExecuteReader();
            DataTable table = new DataTable();
            table.Columns.Add("Type", typeof(string));
            var places = _databaseContext.Place.Select(
                p => new
                {
                    p.Name,
                    p.Latitude,
                    p.Longtitude
                }
            );
            // rdr.Close();
            table.Columns.Add("Name", typeof(string)).SetOrdinal(1);
            table.Columns.Add("Price", typeof(string)).SetOrdinal(2);
            table.Columns.Add("Latitude", typeof(float)).SetOrdinal(3);
            table.Columns.Add("Longtitude", typeof(float)).SetOrdinal(4);


            foreach (var place in places)
            {
                DataRow row;
                row = table.NewRow();
                row["Type"] = "place";
                row["Name"] = place.Name;
                row["Price"] = "Free";
                row["Latitude"] = place.Latitude;
                row["Longtitude"] = place.Longtitude;
                table.Rows.Add(row);
            }
            // connection.Close();
            return DataTableToJSON(table);
        }
    }
}
