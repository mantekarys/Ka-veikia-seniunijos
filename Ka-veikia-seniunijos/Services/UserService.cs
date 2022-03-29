using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using Ka_veikia_seniunijos.Models;
using Ka_veikia_seniunijos.Helpers;
using Ka_veikia_seniunijos.DataTransferObjects;
using MySqlConnector;
using System.Data;


namespace Ka_veikia_seniunijos.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        List<User> GetAll();
        User GetById(int id);
    }
    public class UserService : IUserService
    {

        private List<User> _users;

        public UserService()
        {
            _users = GetAll();
        }
        public List<User> GetAll()
        {
            List<User> _users = new List<User>();
            string query = @"select * from BSJ0CVGChE.User";
            using var connection = new MySqlConnection("Server=remotemysql.com;Database=BSJ0CVGChE;User ID= BSJ0CVGChE; password = wElEvnn5cl;");
            connection.Open();
            MySqlCommand myCommand = connection.CreateCommand();
            myCommand.CommandText = query;
            MySqlDataReader rdr = myCommand.ExecuteReader();
            while (rdr.Read())
            {
                User user = new User();
                user.Id = rdr.GetInt32("id");
                user.FirstName = rdr.GetString("firstName");
                user.LastName = rdr.GetString("lastName");
                user.Email = rdr.GetString("email");
                user.Municipality = rdr.GetString("municipality");
                user.Password = rdr.GetString("passwordHashed");
                _users.Add(user);
            }
            rdr.Close();
            connection.Close();
            return _users;

        }
        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            Boolean notsame = false;
            _users = GetAll();
            var user = _users.SingleOrDefault(x => x.Email == model.Email);
            if (user == null) return null;
            byte[] hashBytes = Convert.FromBase64String(user.Password);
            // Extract
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);

            var pbkdf2 = new Rfc2898DeriveBytes(model.Password, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);
            for (int i = 0; i < 20; i++)
                if (hashBytes[i + 16] != hash[i])
                    notsame = true;
            if (notsame) return null;

            //user found so generate token
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }
        public User GetById(int id)
        {
            _users = GetAll();
            return _users.FirstOrDefault(x => x.Id == id);
        }


        private string generateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}