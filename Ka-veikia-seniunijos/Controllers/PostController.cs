using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Data;
using System.Text;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;
using Ka_veikia_seniunijos.DataTransferObjects;
using Ka_veikia_seniunijos.ModelsEF;
using Ka_veikia_seniunijos.Interfaces;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet("GetDayPosts/{eldership}")]//netestuota su date
        public JsonResult GetDayPosts(string eldership, [FromQuery] DateFilter filter, DateTime? date = null, bool descending = true)
        {
            DateTime from = DateTime.Parse(filter.DateFrom);
            DateTime to = DateTime.Parse(filter.DateTo);
            var eldership_fk = _databaseContext.Eldership.Where(e => e.Name == eldership).Select(e => e.Id).SingleOrDefault();
            List<Post> posts = new List<Post>();
            if (date != null)
            {
                posts = _databaseContext.Post.Where(p => p.EldershipFk == eldership_fk && p.PostDate == date)
                                                 .OrderByDescending(p => p.PostDate).ToList();
            }
            else
            {
                posts = _databaseContext.Post.Where(p => p.EldershipFk == eldership_fk && p.PostDate >= from && p.PostDate <= to)
                                                 .OrderByDescending(p => p.PostDate).ToList();
            }
            if (posts.Count() == 0)
            {
                return new JsonResult("Empty posts by " + eldership);
            }
            if (!descending)
            {
                posts = posts.OrderBy(p => p.PostDate).ToList();
            }
            return new JsonResult(posts);//good
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(int id)
        {
            var post = await _databaseContext.Post.FirstOrDefaultAsync(p => p.Id == id);
            if (post == null)
            {
                return BadRequest();
            }

            return post;
        }

        [HttpPost]
        public int Post(Post post)
        {
            if (post == null)
            {
                return 400;
            }
            _databaseContext.Post.Add(post);
            var update = _databaseContext.SaveChanges();
            if (update < 1)
            {
                return 1062;
            }
            return 200;//good
        }

        [HttpPut]
        public int Put(Post post)
        {
            if (post == null)
            {
                return 400;
            }
            _databaseContext.Post.Update(post);
            var update = _databaseContext.SaveChanges();
            if (update < 1)
            {
                return 1062;
            }
            return 200;
        }
        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            Post dbPost = _databaseContext.Post.SingleOrDefault(p => p.Id == id);
            if (dbPost == null)
            {
                return 400;
            }
            _databaseContext.Post.Remove(dbPost);
            var update = _databaseContext.SaveChanges();
            if (update < 1)
            {
                return 1062;
            }
            return 200;
        }
    }
}
