using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ka_veikia_seniunijos.Models
{
    public class Question
    {
        public string Text { get; set; }
        public int? Rating { get; set; }
        public int Number { get; set; }
        public int Fk_Survey { get; set; }
    }
}
