using Ka_veikia_seniunijos.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Ka_veikia_seniunijos.Controllers
{
    public class EldershipController : Controller
    {
        private readonly IConfiguration _configuration;

        public EldershipController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]//make password hashed in database
        public JsonResult Post(User user)
        {
            string query = @"select * from BSJ0CVGChE.User where Municipality='" + user.Municipality + "'";

            string query2 = @"
                    insert into BSJ0CVGChE.User values 
                    ('" + user.Name + "," + user.LastName + "," + user.Email + "," + user.Municipality + "," + user.Password + "," + user.Name + @"')
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);//check this somehow
                    //if kaskkas myReader.Close();myCon.Close(); return new JsonResult("-2")

                    //myReader.Close();
                    //myCon.Close();
                }

                using (SqlCommand myCommand = new SqlCommand(query2, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("1");//arba Added Successfully
        }
    }
}
