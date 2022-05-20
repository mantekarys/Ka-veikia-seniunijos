namespace Ka_veikia_seniunijos.Models
{
    public class Eldership
    {
        public string Email { get; set; }

        public string Name { get; set; }
        public string Municipality { get; set; }//Savivaldybė
        public string PasswordHashed { get; set; }
        public int Id { get; set; }
    }
}
