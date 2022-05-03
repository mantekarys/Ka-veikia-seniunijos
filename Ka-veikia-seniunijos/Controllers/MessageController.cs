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
        public MessageController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [HttpPost]
        public int Post(Message message)
        {
            if (message == null)
            {
                return 1062;
            }
            message.Date = DateTime.Now;
            _databaseContext.Message.Add(message);
            _databaseContext.SaveChanges();
            return 200;//good
        }

        [HttpGet("{id}/{isUser}/{type}")]//isuser - true if user false if eldership /type - received * sent * all (all returns replies but received and sent dont)
        public JsonResult GetAll(int id, bool isUser, string type)
        {
            List<Message> messages = new List<Message>();
            List<int> ids = new List<int>();
            List<List<Message>> repliesAll = new List<List<Message>>();
            if (isUser && type == "received")
            {
                messages = _databaseContext.Message.Where(m => m.FkUser == id && m.ReceiverType == "user").ToList();
                return new JsonResult(messages);
            }
            else if (isUser && type == "sent")
            {
                messages = _databaseContext.Message.Where(m => m.FkUser == id && m.SenderType == "user").ToList();
                return new JsonResult(messages);
            }
            else if (!isUser && type == "received")
            {
                messages = _databaseContext.Message.Where(m => m.FkEldership == id && m.ReceiverType == "eldership").ToList();
                return new JsonResult(messages);
            }
            else if (!isUser && type == "sent")
            {
                messages = _databaseContext.Message.Where(m => m.FkEldership == id && m.SenderType == "eldership").ToList();
                return new JsonResult(messages);
            }
            else if (isUser && type == "all")
            {
                messages = _databaseContext.Message.Where(m => m.FkUser == id).ToList();
            }
            else if (!isUser && type == "all")
            {
                messages = _databaseContext.Message.Where(m => m.FkEldership == id).ToList();
            }
            else
            {
                return new JsonResult(BadRequest());
            }
            foreach (var mes in messages)
            {
                if (mes.Reply == null)// || ((type == "received" || type == "sent") && !ids.Contains((int)mes.Reply))
                {
                    ids.Add(mes.Id);
                }
            }
            foreach (var i in ids)
            {
                var replies = _databaseContext.Message.Where(m => m.Id == i || m.Reply == i).ToList();
                repliesAll.Add(replies);
            }
            return new JsonResult(repliesAll);
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
