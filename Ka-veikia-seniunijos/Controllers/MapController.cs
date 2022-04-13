using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using Newtonsoft.Json;
using System.Data;
using Ka_veikia_seniunijos.Interfaces;
using System.Text;
using System.Collections;

namespace Ka_veikia_seniunijos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : Controller
    {
        private readonly IConfiguration _configuration;
        private IPlaceService _placeService;
        private IEventService _eventService;

        public MapController(IConfiguration configuration, IPlaceService placeService, IEventService eventService)
        {
            _eventService = eventService;
            _placeService = placeService;
            _configuration = configuration;
        }
        [HttpGet("pins")]
        public IActionResult GetPins([FromQuery] bool events = true, [FromQuery] bool places = false, [FromQuery] bool free = false)
        {
            StringBuilder result = new StringBuilder();
            result.Append('[');
            if (events)
            {
                string eventPins = _eventService.GetAllPinsJson(free);
                eventPins = eventPins.Replace('[', ' ');
                eventPins = eventPins.Replace(']', ' ');
                result.Append(eventPins);


                // result.Add(temp);
            }
            if (places && events)
            {
                result.Append(",");
            }
            if (places)
            {
                string placesPins = _placeService.GetAllPinsJson();
                placesPins = placesPins.Replace('[', ' ');
                placesPins = placesPins.Replace(']', ' ');
                result.Append(placesPins);
            }
            if (events == false && places == false)
            {
                return StatusCode(500);
            }
            result.Append(']');
            JsonResult table = new JsonResult(JsonConvert.DeserializeObject(result.ToString()));
            return Ok(table.Value);
        }
    }
}