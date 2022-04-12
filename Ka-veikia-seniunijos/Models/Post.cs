using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ka_veikia_seniunijos.Models
{
    public class Post
    {
        public string Header { get; set; }
        public string Text { get; set; }

        public DateTime Date { get; set; }

        public string Eldership { get; set; }
    }
}
