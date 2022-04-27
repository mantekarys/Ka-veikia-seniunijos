using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Data;
using System.Text;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;
using Ka_veikia_seniunijos.Interfaces;
using Ka_veikia_seniunijos.ModelsEF;
using System.Globalization;

namespace Ka_veikia_seniunijos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyController : Controller
    {
        private DatabaseContext _databaseContext;

        public SurveyController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var survey = _databaseContext.Survey.FirstOrDefault(s => s.Id == id);
            DataTable table = new DataTable();

            string query2 = @"select * from BSJ0CVGChE.Question where foreign_survey = " + id;
            myCommand.CommandText = query2;
            MySqlDataReader rdr2 = myCommand.ExecuteReader();
            DataTable table2 = new DataTable();
            table2.Load(rdr2);
            rdr2.Close();

            connection.Close();
            DataTable[] arr = { table, table2 };
            return new JsonResult(arr);
        }

        [HttpPost]
        public int Post(Survey survey)
        {
            string query = @"
                        insert into BSJ0CVGChE.Survey (name, eldership, date) values" +
                        "('" + survey.Name + "'," + survey.Eldership_FK + ",'" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "')";


            using var connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            connection.Open();
            MySqlCommand myCommand = connection.CreateCommand();
            myCommand.CommandText = query;
            try
            {
                myCommand.ExecuteNonQuery();

                int surveyId = (int)myCommand.LastInsertedId;
                foreach (var question in survey.Questions)
                {
                    string query2 = @"
                        insert into BSJ0CVGChE.Question (text, " + (question.Rating != null ? "rating," : "") + " number, foreign_survey) values" +
                        "('" + question.Text + "'," + (question.Rating != null ? question.Rating + "," : "") + question.Number + "," + surveyId + ")";
                    myCommand.CommandText = query2;
                    myCommand.ExecuteNonQuery();
                }
            }
            catch (Exception e)
            {
                connection.Close();
                return -1;//error
            }
            connection.Close();
            return 200;//good
        }

        [HttpPut]
        public int Put(Survey survey)
        {
            MySqlConnection connection = new MySqlConnection(_configuration.GetConnectionString("AppCon"));
            connection.Open();
            int returnCode = 200;

            MySqlCommand command = new MySqlCommand("UPDATE BSJ0CVGChE.Survey SET " +
                            "name=?name, " +
                            "eldership_FK=?eldership_FK, " +
                            "date=?date " +
                            "WHERE id=?id", connection);

            command.Parameters.Add(new MySqlParameter("name", survey.Name));
            command.Parameters.Add(new MySqlParameter("eldership_FK", survey.Eldership_FK));
            command.Parameters.Add(new MySqlParameter("date", survey.Date));
            command.Parameters.Add(new MySqlParameter("id", survey.Id));

            try
            {
                command.ExecuteNonQuery();
                foreach (var question in survey.Questions)
                {
                    command.Parameters.Clear();
                    string query2 = "UPDATE BSJ0CVGChE.Question SET " +
                            "text=?text, " +
                            "rating=?rating, " +
                            "number=?number " +
                            "WHERE id=?id";
                    command.CommandText = query2;
                    command.Parameters.Add(new MySqlParameter("text", question.Text));
                    command.Parameters.Add(new MySqlParameter("rating", question.Rating));
                    command.Parameters.Add(new MySqlParameter("number", question.Number));
                    command.Parameters.Add(new MySqlParameter("id", question.Id));
                    command.ExecuteNonQuery();
                }
            }
            catch (Exception e)
            {
                returnCode = 1062;
            }

            connection.Close();
            return returnCode;
        }
        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            string query = @"
                    delete from  BSJ0CVGChE.Survey
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
