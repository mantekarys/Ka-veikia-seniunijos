
namespace Ka_veikia_seniunijos.DataTransferObjects
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Municipality { get; set; }//Savivaldybė
        public string Token { get; set; }

        public AuthenticateResponse(int id, string firstname, string lastname,
                                    string email, string municipality, string token)
        {
            Id = id;
            FirstName = firstname;
            LastName = lastname;
            Email = email;
            Municipality = municipality;
            Token = token;
        }
    }
}