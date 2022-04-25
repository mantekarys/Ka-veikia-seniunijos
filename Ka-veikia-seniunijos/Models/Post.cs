using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ka_veikia_seniunijos.Models
{
    public class Post
    {
        public string Id { get; set; }
        public string Topic { get; set; }
        public string Text { get; set; }
        public string PostDate { get; set; }
        public string Eldership_fk { get; set; }
    }
}
