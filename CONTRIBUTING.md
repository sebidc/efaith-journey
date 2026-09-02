# Contributing to e-Faith Journey

This project is a static GitHub Pages website. Keep content separate from code so classmates can update text without touching layout or behavior.

## Add or Edit Content

### Home

Edit `content/home.md`.

- Keep the `<!-- title -->` and `<!-- intro -->` markers.
- Replace placeholder paragraphs with the final website name and introduction.

### Reflections

Add or edit files in `content/reflections/`.

- Individual files use the student's surname in uppercase, such as `ABASOLO.md`.
- The group reflection is `GROUP.md`.
- The final prayer is `FINAL_PRAYER.md`.
- If a new reflection file is added, also add it to `content/data/reflections.json`.

### Developers

Add or edit bios in `content/developers/`.

- Individual files use the student's surname in uppercase, such as `BAYAN.md`.
- Keep member order alphabetical in `content/data/developers.json`.
- Resume summary text belongs in a Markdown file, not directly in `developers.html`.

### Resumes

Put resume PDFs in `assets/resumes/`.

Put resume preview images in `assets/resumes/previews/`.

The Developers page uses image previews instead of embedded PDF viewers.

## What Not To Do

- Do not hardcode Home, Reflections, or Developers copy inside HTML or JavaScript.
- Do not rename existing content files unless the matching JSON file is updated.
- Do not add new top-level pages unless the approved navigation changes.
- Do not bring back PDF iframes or embedded PDF viewers.
- Do not put page-specific one-off styles directly inside HTML files.
- Do not store private information, addresses, passwords, or sensitive student records in the repo.

## Project Structure

See `FILE_TREE.txt` for the current file tree.

Key folders:

- `content/` - Markdown copy and small JSON data files.
- `assets/` - images, fonts, resume PDFs, and resume preview images.
- `src/css/` - shared design system and page styles.
- `src/js/` - reusable behavior and page interactions.
- `docs/` - project notes, including ASP.NET MVC mapping.
- `aspnet-mvc-reference/` - reference-only MVC files for teacher alignment.
