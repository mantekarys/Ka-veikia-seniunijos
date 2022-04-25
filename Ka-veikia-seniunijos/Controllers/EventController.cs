using Microsoft.AspNetCore.Mvc;
using System.Data;
using Ka_veikia_seniunijos.ModelsEF;
using System.Linq;
using Newtonsoft.Json;
using Ka_veikia_seniunijos.Interfaces;

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
            eldership = eldership.ToLowerInvariant();
            var events = _databaseContext
                                    .Event.Where(e => e.Eldership == eldership).ToList();
            if (options.Contains("price"))
            {
                events.OrderBy(e => e.Price);
            }
            if (options.Contains("name"))
            {
                events.OrderBy(e => e.Name);
            }
            if (options.Contains("date"))
            {
                events.OrderBy(e => e.Date);
            }
            return new JsonResult(events);
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