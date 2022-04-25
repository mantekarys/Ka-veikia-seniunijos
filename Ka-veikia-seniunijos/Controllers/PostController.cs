using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Data;
using System.Text;
using System.Linq;
using Newtonsoft.Json;
using Ka_veikia_seniunijos.ModelsEF;
using Ka_veikia_seniunijos.Interfaces;

namespace Ka_veikia_seniunijos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : Controller
    {
        private DatabaseContext _databaseContext;
        public PostController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [HttpGet("GetDayPosts/{eldership}")]
        public JsonResult GetDayPosts(string eldership, DateTime? date = null, bool descending = true)
        {
            eldership = eldership.ToLower();
            var eldership_fk = _databaseContext.Eldership.Where(e => e.Name == eldership).Select(e => e.Id).SingleOrDefault();
            var posts = _databaseContext.Post.Where(p => p.Eldership == eldership_fk).OrderByDescending(p => p.PostDate).ToList();
            if (posts == null)
            {
                return new JsonResult("Empty posts by " + eldership);
            }
            if (!descending)
            {
                posts.OrderBy(p => p.Date);
            }
            return new JsonResult(posts);//good
        }
    }
}
