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
        public JsonResult GetDayPosts(string eldership, DateTime? date = null, bool descending = true)
        {
            eldership = eldership.ToLower();
            var eldership_fk = _databaseContext.Eldership.Where(e => e.Name == eldership).Select(e => e.Id).SingleOrDefault();
            var posts = _databaseContext.Post.Where(p => p.EldershipFk == eldership_fk && (date == null || p.PostDate == date))
                                             .OrderByDescending(p => p.PostDate).ToList();
            if (posts == null)
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
            if(post == null)
            {
                return NotFound();
            }

            return post;
        }

        [HttpPost]
        public int Post(Post post)
        {
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
