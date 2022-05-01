using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Collections.Generic;
using Ka_veikia_seniunijos.ModelsEF;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Ka_veikia_seniunijos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EldershipController : Controller
    {
        private readonly DatabaseContext _databaseContext;

        public EldershipController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            Eldership eldership = _databaseContext.Eldership.Where(eldership => eldership.Id == id).FirstOrDefault();
            if (eldership == null)
            {
                return new JsonResult(1062);
            }
            return new JsonResult(eldership);
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            var elderships = _databaseContext.Eldership.ToList();
            return new JsonResult(elderships);
        }

        [HttpPut]
        public int Put(Eldership modifEldership)
        {
            //password hashing
            //Might be point of notice 
            string passwordHashed = hashPassword(modifEldership.PasswordHashed);
            var eldership = _databaseContext.Eldership.FirstOrDefault(el => el.Id == modifEldership.Id);
            if (eldership == null)
                return 1062;
            eldership.Email = modifEldership.Email;
            eldership.Municipality = modifEldership.Municipality;
            eldership.PasswordHashed = passwordHashed;
            _databaseContext.SaveChanges();
            return 200;//good
        }

        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            var eldership = _databaseContext.Eldership.Where(d => d.Id == id).First();
            if (eldership == null)
            {
                return 1062;
            }
            _databaseContext.Eldership.Remove(eldership);
            _databaseContext.SaveChanges();

            return 200;//good
        }

        [HttpPost]
        public int Post(Eldership eldership)
        {
            if (eldership == null)
            {
                return 1062;
            }
            string passwordHashed = hashPassword(eldership.PasswordHashed);
            var elderships = _databaseContext.Eldership.Where(el => el.Municipality == eldership.Municipality).ToList();

            if (elderships.Count > 0)
            {
                return 1062;
            }
            _databaseContext.Eldership.Add(eldership);
            _databaseContext.SaveChanges();
            return 200;//good

        }
        private string hashPassword(string password)
        {
            //password hashing
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);
            string passwordHashed = Convert.ToBase64String(hashBytes);
            return passwordHashed;
        }
    }
}
