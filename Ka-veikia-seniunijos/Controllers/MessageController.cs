using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Data;
using System.Text;
using Newtonsoft.Json;
using Ka_veikia_seniunijos.Interfaces;
using Ka_veikia_seniunijos.Models;

namespace Ka_veikia_seniunijos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : Controller
    {
        private readonly IConfiguration _configuration;
        private IEventService _eventService;

        public MessageController(IConfiguration configuration, IEventService eventService)
        {
            _configuration = configuration;
            _eventService = eventService;
        }

        [HttpPost]
        public int Post(Message message)
        {
            string query = @"
                        insert into BSJ0CVGChE.Message (sender, senderType, receiver, receiverType, topic, date, text, reply, received, fk_user, fk_eldership) values" +
                        "('" + message.Sender + "','" + message.SenderType + "','" + message.Receiver + "','" + message.ReceiverType + "','" + message.Topic + "','" + message.Date + "','" + message.Text + "'," +
                        message.Reply + "," + message.Received + "," + message.Fk_user + "," + message.Fk_eldership + ")";

            using var connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            connection.Open();
            MySqlCommand myCommand = connection.CreateCommand();

            myCommand.CommandText = query;
            try
            {
                myCommand.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                connection.Close();
                return 1062;//error
            }
            connection.Close();
            return 200;//good

        }

        [HttpGet("{id}/{user}")]
        public JsonResult Get(int id, bool user)
        {
            string fk = user ? "fk_user" : "fk_eldership";
            string query = @"select * from BSJ0CVGChE.Message where " + fk + " = " + id;
            using var connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            connection.Open();
            MySqlCommand myCommand = connection.CreateCommand();
            myCommand.CommandText = query;
            MySqlDataReader rdr = myCommand.ExecuteReader();
            DataTable table = new DataTable();
            table.Load(rdr);
            rdr.Close();
            connection.Close();
            return new JsonResult(table);
        }

        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            string query = @"
                    delete from  BSJ0CVGChE.Message
                    where id = " + id + @" 
                    ";
            using var connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            connection.Open();
            MySqlCommand myCommand = connection.CreateCommand();
            myCommand.CommandText = query;
            myCommand.ExecuteNonQuery();
            connection.Close();
            return 200;//good
        }
    }
}
