using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Data;
using System.Text;
using Ka_veikia_seniunijos.Services;
using Ka_veikia_seniunijos.Interfaces;
using Newtonsoft.Json;

namespace Ka_veikia_seniunijos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaceController : Controller
    {
        private readonly IConfiguration _configuration;
        private IPlaceService _placeService;

        public PlaceController(IConfiguration configuration, IPlaceService placeService)
        {
            _configuration = configuration;
            _placeService = placeService;
        }
        [HttpGet]
        public JsonResult GetPins()
        {
            string result = _placeService.GetAllPinsJson();
            JsonResult table = new JsonResult(JsonConvert.DeserializeObject(result));
            return table;
        }

    }
}