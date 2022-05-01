using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using Microsoft.EntityFrameworkCore;
using System;
using System.Data;
using Ka_veikia_seniunijos.ModelsEF;
using System.Linq;
using Newtonsoft.Json;
using System.Collections.Generic;
using Ka_veikia_seniunijos.Interfaces;
using System.Globalization;
using System.Linq.Expressions;
using System.Text;

namespace Ka_veikia_seniunijos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : Controller
    {
        public DatabaseContext _databaseContext;

        private IEventService _eventService;

        public EventController(IEventService eventService, DatabaseContext databaseContext)
        {
            _eventService = eventService;
            _databaseContext = databaseContext;
        }

        [HttpGet("{eldership}")]
        public JsonResult Get(string eldership, [FromQuery] string[] options = null)
        {
            StringBuilder sql = new StringBuilder();
            string[] acceptable = {
                "price",
                "price DESC",
                "type",
                "type DESC",
                "date",
                "date DESC",
                "name",
                "name DESC"
            };
            var eldership_fk = _databaseContext.Eldership.Where(e => e.Name == eldership).Select(e => e.Id).SingleOrDefault();
            sql.AppendFormat("Select * FROM Event Where eldership_FK = {0} ", eldership_fk);
            if (options.Count() > 0)
                sql.Append("ORDER BY ");
            foreach (var op in options)
            {
                if (acceptable.Contains(op))
                    sql.Append($"{op},");
            }
            sql.Length--;
            var events = _databaseContext.Event.FromSqlRaw(sql.ToString()).ToList();
            return new JsonResult(events);
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
            _databaseContext.Event.Add(ev);
            var update = _databaseContext.SaveChanges();
            if (update < 1)
            {
                return 1062;
            }
            return 200;//good

        }

        [HttpPut]
        public int Put(Event ev)
        {
            var dbEvent = _databaseContext.Event.FirstOrDefault(e => e.Id == ev.Id);
            if (dbEvent == null)
            {
                return 1062;
            }
            dbEvent = ev;
            // dbEvent.Name = ev.Name;
            // dbEvent.Description = ev.Description;
            // dbEvent.Price = ev.Price;
            // dbEvent.Date = ev.Date;
            // dbEvent.StartTime = ev.StartTime;
            // dbEvent.EndTime = ev.EndTime;
            // dbEvent.EldershipFk = ev.EldershipFk;
            // dbEvent.Address = ev.Address;
            // dbEvent.Latitude = ev.Latitude;
            // dbEvent.Longtitude = ev.Longtitude;
            // dbEvent.PostDate = ev.PostDate;
            _databaseContext.Event.Update(dbEvent);
            var update = _databaseContext.SaveChanges();
            if (update < 1)
            {
                return 1062;
            }
            return 200;
        }

        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            var ev = _databaseContext.Event.FirstOrDefault(p => p.Id == id);
            if (ev == null)
            {
                return 1062;
            }
            _databaseContext.Event.Remove(ev);
            var update = _databaseContext.SaveChanges();
            if (update < 1)
            {
                return 1062;
            }
            return 200;//good
        }
    }
}