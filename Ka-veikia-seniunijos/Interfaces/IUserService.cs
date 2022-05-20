using System.Collections.Generic;
using Ka_veikia_seniunijos.DataTransferObjects;
using Ka_veikia_seniunijos.ModelsEF;

namespace Ka_veikia_seniunijos.Interfaces
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        List<User> GetAll();
        User GetById(int id);
        User GetUser(string email);
        Eldership GetEldership(string email);
    }
}
