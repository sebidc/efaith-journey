# ASP.NET Core MVC Mapping

The teacher guide describes an ASP.NET Core MVC project using `Models`, `Controllers`, `Views`, `Views/Shared/_Layout.cshtml`, and `wwwroot` folders.

This repository keeps the deployable GitHub Pages site static because GitHub Pages cannot run ASP.NET Core or C# server code. To show how the project maps to the guide, the `aspnet-mvc-reference/` folder contains reference MVC files.

## Static GitHub Pages Site

- HTML pages live at the repository root.
- CSS lives in `src/css/`.
- JavaScript lives in `src/js/`.
- Images, fonts, and resumes live in `assets/`.
- Markdown and JSON content live in `content/`.

## MVC Equivalent

- `aspnet-mvc-reference/Controllers/HomeController.cs` shows the page actions.
- `aspnet-mvc-reference/Models/SitePage.cs` shows a simple page model.
- `aspnet-mvc-reference/Views/Shared/_Layout.cshtml` shows the shared navigation shell.
- `aspnet-mvc-reference/Views/Home/*.cshtml` shows where the six page views would live in an MVC project.

## Deployment Note

Use the static site for GitHub Pages. Use the MVC reference only if the project is moved to a host that supports ASP.NET Core, such as Azure App Service, Render, Railway, or a local `dotnet run` environment.
