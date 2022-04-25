using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Data;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using Ka_veikia_seniunijos.Interfaces;
using Ka_veikia_seniunijos.ModelsEF;
using System.Linq;

namespace Ka_veikia_seniunijos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : Controller
    {
        private DatabaseContext _databaseContext;
        private IEventService _eventService;

        public MessageController(DatabaseContext databaseContext, IEventService eventService)
        {
            _databaseContext = databaseContext;
            _eventService = eventService;
        }

        [HttpPost]
        public int Post(Message message)
        {
            _databaseContext.Message.Add(message);
            _databaseContext.SaveChanges();
            return 200;//good

        }

        [HttpGet("{id}/{user}")]
        public JsonResult Get(int id, bool user)
        {
            List<Message> messages = new List<Message>();
            if (user)
            {
                messages = _databaseContext.Message.Where(m => m.FkUser == id).ToList();
            }
            else if (!user)
            {
                messages = _databaseContext.Message.Where(m => m.FkEldership == id).ToList();
            }
            else
            {
                return new JsonResult(1062);
            }

            return new JsonResult(messages);
        }

        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            var message = _databaseContext.Message.FirstOrDefault(m => m.Id == id);
            if (message == null)
            {
                return 1062;
            }
            _databaseContext.Message.Remove(message);
            _databaseContext.SaveChanges();
            return 200;//good
        }
    }
}
