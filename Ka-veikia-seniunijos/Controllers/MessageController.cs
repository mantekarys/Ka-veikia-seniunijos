using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Data;
using System.Text;
using Newtonsoft.Json;
using Ka_veikia_seniunijos.Interfaces;
using Ka_veikia_seniunijos.Models;
using System.Collections.Generic;

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
                        insert into BSJ0CVGChE.Message (sender, senderType, receiver, receiverType, topic, date, text,"+(message.Reply != null? "reply,":"")+" fk_user, fk_eldership) values" +
                        "('" + message.Sender + "','" + message.SenderType + "','" + message.Receiver + "','" + message.ReceiverType + "','" + message.Topic + "','" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "','" + message.Text + "'," +
                        (message.Reply != null ? message.Reply + "," : "") + message.Fk_user + "," + message.Fk_eldership + ")";

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

        [HttpGet("{id}/{isUser}/{type}")]//isuser - true if user false if eldership /type - received - sent - all
        public JsonResult GetAll(int id, bool isUser, string type)
        {
            string fk = isUser ? "fk_user" : "fk_eldership";
            string t = "";
            if (type == "received") t = " and receiverType ='" + fk.Substring(3) + "'";
            else if (type == "sent") t = " and senderType ='" + fk.Substring(3) + "'";
            string query = @"select * from BSJ0CVGChE.Message where " + fk + " = " + id + t;
            using var connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            connection.Open();
            MySqlCommand myCommand = connection.CreateCommand();
            myCommand.CommandText = query;
            MySqlDataReader rdr = myCommand.ExecuteReader();
            var tables = new List<DataTable>();
            var ids = new List<int>();
            while (rdr.Read())
            {
                bool flag = true;
                if (rdr[8] is System.DBNull || ((type == "received" || type == "sent") && !ids.Contains((int)rdr[8]))) ids.Add((int)rdr[0]);
            }
            rdr.Close();
            foreach (var i in ids)
            {
                DataTable table = new DataTable();
                string query2 = @"select * from BSJ0CVGChE.Message where reply = " + i + " OR id = " + i;
                myCommand.CommandText = query2;
                MySqlDataReader rdr2 = myCommand.ExecuteReader();
                table.Load(rdr2);
                tables.Add(table);
                rdr2.Close();
            }
            myCommand.CommandText = query;
            connection.Close();
            return new JsonResult(tables);
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
