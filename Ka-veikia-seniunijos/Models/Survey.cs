using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ka_veikia_seniunijos.Models
{
    public class Survey
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Eldership_FK { get; set; }
        public DateTime Date { get; set; }
        public Question[] Questions { get; set; }
    }
}
