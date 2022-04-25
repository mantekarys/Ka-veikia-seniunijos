using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ka_veikia_seniunijos.Models
{
    public class Message
    {
        public string Sender { get; set; }//toks tik kai vienas user o kitas eldership
        public string SenderType { get; set; }
        public string Receiver { get; set; }
        public string ReceiverType { get; set; }
        public string Topic { get; set; }
        public string Text { get; set; }
        public int? Reply { get; set; }
        public int Fk_user { get; set; }
        public int Fk_eldership { get; set; }
    }
}
