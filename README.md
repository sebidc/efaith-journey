# e-Faith Journey

e-Faith Journey is a theology and computer programming performance-task website for Group 1.

The live GitHub Pages version is built as static HTML, CSS, JavaScript, Markdown, and JSON so it can deploy correctly on GitHub Pages. ASP.NET Core MVC reference files are included separately in `aspnet-mvc-reference/` and explained in `docs/ASP-NET-MVC-MAPPING.md`.

## Pages

- Home
- Reflections
- Mood Checker
- Key Takeaways
- Daily Bible Verse
- Developers

## Design Direction

The redesign uses the Vineyard Glass palette:

- Ink Black: `#11110F`
- Pearl White: `#F7F5EF`
- Vine Green: `#586B45`
- Olive Shadow: `#26321F`
- Soft Gold: `#D8B56D`
- Warm Sand: `#E8DAC2`
- Action Blue: `#0071E3`

## Local Preview

Run a local server from the project root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

Markdown content is loaded with `fetch()`, so previewing through a local server is better than opening HTML files directly.
