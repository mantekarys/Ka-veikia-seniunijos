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
        //Surveys by eldeship
        [HttpGet("{eldership}")]
        public JsonResult GetByEldership(string eldership)
        {
            var eldershipID = _databaseContext.Eldership.Where(e => e.Name == eldership).Select(e => e.Id).SingleOrDefault();
            if (eldershipID == 0)
            {
                return new JsonResult(BadRequest());

            }
            var surveys = _databaseContext.Survey.Where(s => s.EldershipFk == eldershipID).ToList();
            if (surveys == null)
            {
                return new JsonResult("There is no surveys made by this eldership");
            }
            return new JsonResult(surveys);
        }

        //Specific survey by ID
        [HttpGet("{eldership}/{id}")]
        public JsonResult GetById(int id)
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
        //Specific survey by ID
        [HttpGet("{eldership}/{id}/detailed")]
        public JsonResult GetByIdDetailed(int id)
        {
            var survey = _databaseContext.Survey.FirstOrDefault(s => s.Id == id);
            if (survey == null)
            {
                return new JsonResult(BadRequest());
            }
            var questions = _databaseContext.Question.Where(q => q.ForeignSurvey == id).ToList();
            foreach (Question q in questions)
            {
                var answers = _databaseContext.Answer.Where(a => a.FkQuestionId == q.Id).ToList();
                foreach (var answer in answers)
                {
                    q.Answer.Add(answer);
                }
                survey.Question.Add(q);
            }
            return new JsonResult(survey);
        }
        [HttpPost("{survey}/{question}")]
        public int PostAnswer(int question, Answer answer)
        {
            if (answer == null)
            {
                return 1062;
            }
            var dbQuestion = _databaseContext.Question.FirstOrDefault(q => q.Id == question);
            dbQuestion.Answer.Add(answer);
            var update = _databaseContext.SaveChanges();
            if (update < 1)
                return 1062;
            return 200;
        }

        [HttpPost]
        public int Post(Survey survey)
        {

            if (survey == null)
            {
                return 1062;
            }
            _databaseContext.Survey.Add(survey);
            var update = _databaseContext.SaveChanges();
            if (update < 1)
            {
                return 1062;
            }
            foreach (var question in survey.Question)
            {
                question.ForeignSurvey = survey.Id;
            }
            _databaseContext.Question.AddRange(survey.Question);
            try
            {
                update = _databaseContext.SaveChanges();
            }
            catch
            {
                if (update < 1)
                {
                    return -1;
                }
            }
            return 200;//good
        }

        [HttpPut]
        public int Put(Survey survey)
        {
            if (survey == null)
            {
                return 1062;
            }
            _databaseContext.Survey.Update(survey);
            var update = _databaseContext.SaveChanges();
            if (update < 1)
            {   
                return 1062;
            }
            foreach (var question in survey.Question)
            {
                question.ForeignSurvey = survey.Id;
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
