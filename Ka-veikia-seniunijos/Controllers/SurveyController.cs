using Ka_veikia_seniunijos.Interfaces;
using Ka_veikia_seniunijos.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ka_veikia_seniunijos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyController : Controller
    {

        private readonly IConfiguration _configuration;

        public SurveyController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpPost]
        public int Post(Survey survey)
        {
            string query = @"
                        insert into BSJ0CVGChE.Survey (name, text, date) values 
                        ('" + survey.Name + "','" + survey.Eldership + "')";

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
            int foreign_survey = (int)myCommand.LastInsertedId;
            int num = 1;
            foreach (var question in survey.Questions)
            {
                string query2 = @"
                        insert into BSJ0CVGChE.Question (text, num, foreign_survey) values 
                        ('" + question + "', " + num++ +  "," + foreign_survey + ")";
                myCommand.CommandText = query2;
                try
                {
                    myCommand.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    connection.Close();
                    return -1;//error
                }
            }
            connection.Close();
            return 200;//good
        }
    }
}
