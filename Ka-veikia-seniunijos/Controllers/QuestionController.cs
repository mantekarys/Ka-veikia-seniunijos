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
    public class QuestionController : Controller
    {
        private DatabaseContext _databaseContext;

        public QuestionController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            // var survey = _databaseContext.Survey.FirstOrDefault(s => s.Id == id);
            // if (survey == null)
            // {
            //     return new JsonResult(BadRequest());
            // }
            var questions = _databaseContext.Question.Where(q => q.ForeignSurvey == id).ToList();
            if (questions == null)
            {
                return new JsonResult("There is no questions in requested survey");
            }
            foreach (Question q in questions)
            {
                var answers = _databaseContext.Answer.Where(a => a.FkQuestionId == q.Id).ToList();
                foreach (var answer in answers)
                {
                    q.Answer.Add(answer);
                }
                // survey.Question.Add(q);
            }
            return new JsonResult(questions);
        }
    }
}