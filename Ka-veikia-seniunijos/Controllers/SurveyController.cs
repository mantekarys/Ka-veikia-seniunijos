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

        //Specific survey by ID
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var survey = _databaseContext.Survey.FirstOrDefault(s => s.Id == id);
            if (survey == null)
            {
                return new JsonResult(BadRequest());
            }
            var questions = _databaseContext.Question.Where(q => q.ForeignSurvey == id).ToList();
            foreach (var q in questions)
            {
                survey.Question.Add(q);
            }
            return new JsonResult(survey);
        }

        [HttpPost]
        public int Post(Survey survey)
        {
            _databaseContext.Survey.Add(survey);
            var lastSurvey = _databaseContext.Survey.Last();
            var update = _databaseContext.SaveChanges();
            if (update < 1)
            {
                return 1062;
            }
            foreach (var question in survey.Question)
            {
                question.ForeignSurvey = lastSurvey.Id;
                _databaseContext.Question.Add(question);
            }
            update = _databaseContext.SaveChanges();
            return 200;//good
        }

        [HttpPut]
        public int Put(Survey survey)
        {
            var dbSurvey = _databaseContext.Survey.SingleOrDefault(s => s.Id == survey.Id);
            dbSurvey = survey;
            _databaseContext.Survey.Update(dbSurvey);
            var update = _databaseContext.SaveChanges();
            if (update < 1)
            {
                return 1062;
            }
            foreach (var question in survey.Question)
            {
                question.ForeignSurvey = dbSurvey.Id;
                _databaseContext.Question.Update(question);
            }
            update = _databaseContext.SaveChanges();
            return 200;
        }
        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            var survey = _databaseContext.Survey.FirstOrDefault(s => s.Id == id);
            if (survey == null)
            {
                return 1062;
            }
            _databaseContext.Survey.Remove(survey);
            var update = _databaseContext.SaveChanges();
            if (update < 1)
            {
                return 1062;
            }
            return 200;//good
        }
    }
}
