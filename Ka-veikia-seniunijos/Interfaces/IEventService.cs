using Microsoft.AspNetCore.Mvc;


namespace Ka_veikia_seniunijos.Interfaces
{
    public interface IEventService
    {
        string GetAllPinsJson(bool free = false);
    }
}
