using System.ComponentModel.DataAnnotations;

namespace Ka_veikia_seniunijos.DataTransferObjects
{
    public class AuthenticateRequest
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}