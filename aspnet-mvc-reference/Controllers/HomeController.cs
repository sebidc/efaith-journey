using EFaithJourney.Models;
using Microsoft.AspNetCore.Mvc;

namespace EFaithJourney.Controllers;

public class HomeController : Controller
{
    public IActionResult Index() => View(Page("Home", "content/home.md"));
    public IActionResult Reflections() => View(Page("Reflections", "content/reflections/GROUP.md"));
    public IActionResult MoodChecker() => View(Page("Mood Checker", "content/data/mood-options.json"));
    public IActionResult KeyTakeaways() => View(Page("Key Takeaways", "content/data/takeaways.json"));
    public IActionResult DailyVerse() => View(Page("Daily Bible Verse", "content/data/verses.json"));
    public IActionResult Developers() => View(Page("Developers", "content/developers/INTRO.md"));

    private static SitePage Page(string title, string contentPath)
    {
        return new SitePage
        {
            Title = title,
            ContentPath = contentPath
        };
    }
}
