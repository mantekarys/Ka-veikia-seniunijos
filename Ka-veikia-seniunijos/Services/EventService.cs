using Ka_veikia_seniunijos.Interfaces;
using System.Data;
using System.Linq;
using Newtonsoft.Json;
using Ka_veikia_seniunijos.ModelsEF;

namespace Ka_veikia_seniunijos.Services
{
    public class EventService : IEventService
    {
        public DatabaseContext _databaseContext;

        public EventService(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }
        public string DataTableToJSON(DataTable table)
        {
            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(table, Formatting.Indented);
            return JSONString;
        }

        public string GetAllPinsJson(bool free = false)
        {
            var events = _databaseContext.Event.Select(
                p => new
                {
                    p.Name,
                    p.Latitude,
                    p.Longtitude,
                    p.Price
                }
            );
            DataTable table = new DataTable();
            table.Columns.Add("Name", typeof(string)).SetOrdinal(1);
            table.Columns.Add("Price", typeof(string)).SetOrdinal(2);
            table.Columns.Add("Latitude", typeof(float)).SetOrdinal(3);
            table.Columns.Add("Longtitude", typeof(float)).SetOrdinal(4);
            foreach (var element in events)
            {
                DataRow row;
                row = table.NewRow();
                row["Type"] = "event";
                row["Name"] = element.Name;
                row["Price"] = element.Price;
                row["Latitude"] = element.Latitude;
                row["Longtitude"] = element.Longtitude;
                table.Rows.Add(row);
            }

            return DataTableToJSON(table);
        }
    }

}
