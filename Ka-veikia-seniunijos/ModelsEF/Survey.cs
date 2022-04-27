using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Ka_veikia_seniunijos.ModelsEF
{
    public partial class Survey
    {
        public Survey()
        {
            Question = new HashSet<Question>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int EldershipFk { get; set; }
        public DateTime Date { get; set; }

        public virtual Eldership EldershipFkNavigation { get; set; }
        public virtual ICollection<Question> Question { get; set; }
    }
}
