﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ka_veikia_seniunijos.Models
{
    public class User
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Municipality { get; set; }//Savivaldybė

        public string Password { get; set; }

        public string Id { get; set; }

    }
}
