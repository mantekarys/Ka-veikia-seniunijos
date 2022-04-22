using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Data;
using System.Text;
using Newtonsoft.Json;
using Ka_veikia_seniunijos.Interfaces;
using Ka_veikia_seniunijos.Models;
using System.Globalization;

namespace Ka_veikia_seniunijos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyController : Controller
    {
        private readonly IConfiguration _configuration;
        private IEventService _eventService;

        public SurveyController(IConfiguration configuration, IEventService eventService)
        {
            _configuration = configuration;
            _eventService = eventService;
        }

        [HttpPost]
        public int Post(Survey survey)
        {
            string query = @"
                        insert into BSJ0CVGChE.Survey (name, eldership, date) values" +
                        "('" + survey.Name + "','" + survey.Eldership + "','" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "')";


            using var connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            connection.Open();
            MySqlCommand myCommand = connection.CreateCommand();
            myCommand.CommandText = query;
            myCommand.ExecuteNonQuery();

            int surveyId = (int)myCommand.LastInsertedId;
            foreach (var question in survey.Questions)
            {
                string query2 = @"
                        insert into BSJ0CVGChE.Question (text, "+(question.Rating != null ? "rating," : "")+" number, foreign_survey) values" +
                    "('" + question.Text + "'," + (question.Rating != null ? question.Rating +"," : "") + question.Number + "," + surveyId + ")";
                myCommand.CommandText = query2;
                myCommand.ExecuteNonQuery();
            }
            //try
            //{
            //    myCommand.ExecuteNonQuery();

            //    int surveyId = (int)myCommand.LastInsertedId;
            //    foreach (var question in survey.Questions)
            //    {
            //        string query2 = @"
            //            insert into BSJ0CVGChE.Question (text, rating, number, foreign_survey) values" +
            //            "('" + question.Text + "'," + question.Rating + "," + question.Number + "," + surveyId+ ")";
            //        myCommand.CommandText = query2;
            //        myCommand.ExecuteNonQuery();
            //    }
            //}
            //catch (Exception e)
            //{
            //    connection.Close();
            //    return -1;//error
            //}
            connection.Close();
            return 200;//good
        }
    }
}
