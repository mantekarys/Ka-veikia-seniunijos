﻿using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Ka_veikia_seniunijos.ModelsEF
{
    public partial class Post
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime PostDate { get; set; }
        public int EldershipFk { get; set; }

        public virtual Eldership EldershipFkNavigation { get; set; }
    }
}
