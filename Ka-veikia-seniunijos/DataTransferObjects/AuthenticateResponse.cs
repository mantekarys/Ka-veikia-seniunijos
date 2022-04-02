using Ka_veikia_seniunijos.Models;

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

        public AuthenticateResponse(User user, string token)
        {
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Email = user.Email;
            Municipality = user.Municipality;
            Token = token;
        }
    }
}