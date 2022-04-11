using System.Collections.Generic;
using Ka_veikia_seniunijos.Models;
using Microsoft.AspNetCore.Mvc;


namespace Ka_veikia_seniunijos.Interfaces
{
    public interface IPlaceService
    {
        string GetAllPinsJson();
    }
}
