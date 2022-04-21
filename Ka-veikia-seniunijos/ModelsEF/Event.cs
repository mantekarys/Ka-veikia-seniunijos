using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Ka_veikia_seniunijos.ModelsEF
{
    public partial class Event
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public float Price { get; set; }
        public DateTime Date { get; set; }
        public string Municipality { get; set; }
        public string Eldership { get; set; }
        public float Latitude { get; set; }
        public float Longtitude { get; set; }
    }
}
