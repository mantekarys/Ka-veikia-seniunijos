using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Ka_veikia_seniunijos.ModelsEF
{
    public partial class Message
    {
        public Message()
        {
            InverseReplyNavigation = new HashSet<Message>();
        }

        public int Id { get; set; }
        public string Sender { get; set; }
        public string SenderType { get; set; }
        public string Receiver { get; set; }
        public string ReceiverType { get; set; }
        public string Topic { get; set; }
        public DateTime Date { get; set; }
        public string Text { get; set; }
        public int? Reply { get; set; }
        public int FkUser { get; set; }
        public int FkEldership { get; set; }

        public virtual Eldership FkEldershipNavigation { get; set; }
        public virtual User FkUserNavigation { get; set; }
        public virtual Message ReplyNavigation { get; set; }
        public virtual ICollection<Message> InverseReplyNavigation { get; set; }
    }
}
