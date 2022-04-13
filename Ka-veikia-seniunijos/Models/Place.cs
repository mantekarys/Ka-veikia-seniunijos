using System;

namespace Ka_veikia_seniunijos.Models
{
    public class Place
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string Municipality { get; set; }//Savivaldybė
        public string Eldership { get; set; }
        public float Latitude { get; set; }
        public float Longtitude { get; set; }

    }
}