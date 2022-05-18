using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Configuration;
using System.Text;
using System.Security.Cryptography;
using Ka_veikia_seniunijos.Models;
using Ka_veikia_seniunijos.Helpers;
using Ka_veikia_seniunijos.DataTransferObjects;
using Ka_veikia_seniunijos.Interfaces;
using MySqlConnector;

namespace Ka_veikia_seniunijos.Services
{
    public class UserService : IUserService
    {
        //string connectionString = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
        private List<User> _users;

        public UserService()
        {
            _users = GetAll();
        }
        public List<User> GetAll()
        {
            List<User> _users = new List<User>();
            string query = @"select * from BSJ0CVGChE.User";
            using var connection = new MySqlConnection("Server = remotemysql.com; Database = BSJ0CVGChE; User ID = BSJ0CVGChE; password = wElEvnn5cl;");
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
            User user = GetUser(model.Email);
            AuthenticateResponse authenticateResponse;
            string token = null;

            if (user.Email == null)
            {
                Eldership eldership = GetEldership(model.Email);
                if (eldership.Email != null && passwordMatches(model.Password, eldership.Password))
                {
                    token = generateJwtToken(eldership.Id);
                    authenticateResponse = new AuthenticateResponse(eldership.Id, null, null, eldership.Email, eldership.Name,
                                                                    eldership.Municipality, token);
                }
                else
                    return null;
            }
            else
            {
                if (passwordMatches(model.Password, user.Password))
                {
                    token = generateJwtToken(user.Id);
                    authenticateResponse = new AuthenticateResponse(user.Id, user.FirstName, user.LastName,
                                                                    user.Email, null, user.Municipality, token);
                }
                else
                    return null;
            }

            return authenticateResponse;
        }

        public User GetUser(string email)
        {
            MySqlConnection connection = new MySqlConnection("Server=remotemysql.com;Database=BSJ0CVGChE;User ID= BSJ0CVGChE; password = wElEvnn5cl;");
            connection.Open();

            MySqlCommand command = new MySqlCommand("Select * from BSJ0CVGChE.User where email=?email", connection);
            command.Parameters.Add(new MySqlParameter("email", email));
            MySqlDataReader reader = command.ExecuteReader();
            User user = extractUserData(reader);
            reader.Close();
            connection.Close();

            return user;
        }

        public Eldership GetEldership(string email)
        {
            MySqlConnection connection = new MySqlConnection("Server=remotemysql.com;Database=BSJ0CVGChE;User ID= BSJ0CVGChE; password = wElEvnn5cl;");
            connection.Open();

            MySqlCommand command = new MySqlCommand("Select * from BSJ0CVGChE.Eldership where email=?email", connection);
            command.Parameters.Add(new MySqlParameter("email", email));
            MySqlDataReader reader = command.ExecuteReader();
            Eldership eldership = extractEldershipData(reader);
            reader.Close();
            connection.Close();

            return eldership;
        }

        private User extractUserData(MySqlDataReader reader)
        {
            User user = new User();
            while (reader.Read())
            {
                user.Id = reader.GetInt32("id");
                user.FirstName = reader.GetString("firstName");
                user.LastName = reader.GetString("lastName");
                user.Email = reader.GetString("email");
                user.Municipality = reader.GetString("municipality");
                user.Password = reader.GetString("passwordHashed");
            }

            return user;
        }

        private Eldership extractEldershipData(MySqlDataReader reader)
        {
            Eldership eldership = new Eldership();
            while (reader.Read())
            {
                eldership.Id = reader.GetInt32("id");
                eldership.Email = reader.GetString("email");
                eldership.Municipality = reader.GetString("municipality");
                eldership.Name = reader.GetString("name");
                eldership.Password = reader.GetString("passwordHashed");
            }

            return eldership;
        }

        private bool passwordMatches(string providedPassword, string userPassword)
        {
            byte[] hashBytes = Convert.FromBase64String(userPassword);

            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);

            var pbkdf2 = new Rfc2898DeriveBytes(providedPassword, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);
            System.Console.WriteLine(hash);
            for (int i = 0; i < 20; i++)
                if (hashBytes[i + 16] != hash[i])
                    return false;

            return true;
        }

        public User GetById(int id)
        {
            _users = GetAll();
            return _users.FirstOrDefault(x => x.Id == id);
        }


        private string generateJwtToken(int id)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", id.ToString()) }),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}