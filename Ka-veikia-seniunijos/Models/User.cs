using System.Text.Json.Serialization;


namespace Ka_veikia_seniunijos.Models
{
    public class User
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Municipality { get; set; }//Savivaldybė

        [JsonIgnore]
        public string Password { get; set; }

        public int Id { get; set; }
    }
}
