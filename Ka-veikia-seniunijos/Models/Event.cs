using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ka_veikia_seniunijos.Models
{
    public class Event
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public float Price { get; set; }
        public DateTime Date { get; set; }
        public string Municipality { get; set; }//Savivaldybė
        public string Eldership { get; set; }

    }
}