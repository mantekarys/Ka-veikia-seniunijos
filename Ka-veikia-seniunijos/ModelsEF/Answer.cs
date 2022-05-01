using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Ka_veikia_seniunijos.ModelsEF
{
    public partial class Answer
    {
        public int Id { get; set; }
        public int FkUserId { get; set; }
        public int FkQuestionId { get; set; }
        public string Text { get; set; }

        public DateTime Date { get; set; }


        public virtual Question FkQuestion { get; set; }
        public virtual User FkUser { get; set; }
    }
}
