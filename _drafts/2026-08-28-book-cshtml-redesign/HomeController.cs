using EFaithJourney.Models;

namespace EFaithJourney.Controllers
{
    public class HomeController
    {
        public HomeModel GetHomeModel()
        {
            return new HomeModel();
        }
    }
}
