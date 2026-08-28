using System.Collections.Generic;

namespace EFaithJourney.Models
{
    public class HomeModel
    {
        public string ProjectTitle { get; set; }
        public string GroupName { get; set; }
        public IList<string> FeaturedExcerpts { get; set; }

        public HomeModel()
        {
            ProjectTitle = "e-Faith Journey";
            GroupName = "Group 1";
            FeaturedExcerpts = new List<string>
            {
                "Faith and logic are not opposing forces, but two ways of seeking truth.",
                "Building software can echo the care, order, and responsibility found in faith communities.",
                "Reflection becomes stronger when it moves from private thought into shared service."
            };
        }
    }
}
