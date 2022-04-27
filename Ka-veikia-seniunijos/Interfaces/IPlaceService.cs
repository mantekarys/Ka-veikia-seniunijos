using System.Collections.Generic;
using Ka_veikia_seniunijos.ModelsEF;
using Microsoft.AspNetCore.Mvc;


namespace Ka_veikia_seniunijos.Interfaces
{
    public interface IPlaceService
    {
        void AddPlace(Place place);
        List<Place> GetPlaces();
        Place GetPlace(string id);
        void UpdatePlace(Place place);
        void DeletePlace(string id);
        string GetAllPinsJson();

    }
}
