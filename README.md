# Portfolio — Maxime "KorYme" CORBY

> Gameplay & Tools Programmer — Personal portfolio website

**Live** → [koryme.github.io/Portfolio](https://koryme.github.io/Portfolio)

---

## Overview

Static portfolio built with vanilla HTML, CSS and JavaScript — no framework, no build step. All content is driven by a single `projects.json` file, making it easy to add or update projects without touching any HTML.

---

## Features

- **JSON-driven content** — every project, its sections, images, links and metadata live in `projects.json`. The pages are generated dynamically at runtime.
- **Single project template** — `project.html` renders any project from its `?id=` parameter.
- **Flexible image/video display** — each image or video in a section can be configured with a display mode (`cover`, `contain`, `stretch`, `native`, `fixed-height`, `fixed-width`) directly in the JSON. See [`image_display_modes.md`](./image_display_modes.md) for the full reference.
- **GIF/MP4 hover previews** — project cards show a still thumbnail by default and switch to a GIF or MP4 on hover.
- **Tech icon badges** — technology tags icons across cards and project pages.
- **Optional YouTube trailer** — set a `youtubeId` in the JSON to embed a trailer on a project page.
- **Markdown formatting** — section body text supports `**bold**`, `*italic*`, `__underline__` and `~~strikethrough~~`.
- **Responsive** — adapts to mobile with a dedicated breakpoint.
- **Scroll reveal animations** — elements fade in as they enter the viewport.

---

## Project Structure

```
Portfolio/
├── index.html            # Main projects grid
├── side-projects.html    # Side projects grid
├── project.html          # Dynamic project page (reads ?id=)
├── about.html            # About me page
├── style.css             # Global stylesheet
├── main.js               # Shared JS (helpers, icons, animations)
├── projects.json         # All content — edit this to update the site
├── image_display_modes.md  # Documentation for image display options
└── assets/               # Images, GIFs and videos
    ├── about/
    ├── kintsugi/
    ├── champions-tactics/
    └── ...
```

---

## Adding a Project

1. Open `projects.json`
2. Add a new object to the `"projects"` array
3. Set `"category"` to `"main"` or `"side"`
4. Fill in the fields — all optional fields can be left as `""` or `[]`
5. Drop your assets in `assets/<project-id>/`

Minimal example :

```json
{
  "id": "my-game",
  "title": "My Game",
  "tagline": "A short tagline.",
  "year": "2025",
  "status": "",
  "engine": "Unity 2D",
  "genre": "Platformer",
  "duration": "4 Weeks",
  "teamSize": "5 Persons",
  "company": "",
  "category": "main",
  "thumbnail": { "src": "assets/my-game/thumb.png", "display": {} },
  "thumbnailGif": { "src": "assets/my-game/preview.gif", "display": {} },
  "youtubeId": "",
  "role": "",
  "team": "",
  "context": "",
  "technologies": ["Unity", "C#"],
  "links": [],
  "sections": [
    {
      "title": "My Section",
      "body": "Description with **bold** and *italic* support.",
      "images": [
        { "src": "assets/my-game/screenshot.png", "display": {} }
      ]
    }
  ],
  "related": []
}
```

---

## Technologies

| | |
|---|---|
| HTML / CSS / JS | Vanilla, no framework |
| Fonts | [Lexend](https://fonts.google.com/specimen/Lexend) + [Outfit](https://fonts.google.com/specimen/Outfit) via Google Fonts |
| Hosting | GitHub Pages |

---

## AI Assistance

This portfolio was designed and built with the help of **[Claude](https://claude.ai)**, the AI assistant made by [Anthropic](https://www.anthropic.com). From the initial HTML/CSS architecture to the JSON-driven content system, the image display modes, the responsive layout and the iterative design refinements — Claude was a collaborator throughout the entire process.

---

## Author

**Maxime "KorYme" CORBY** — Gameplay & Tools Programmer  
[LinkedIn](https://www.linkedin.com/in/maxime-corby-gp/) · [GitHub](https://github.com/KorYme) · [Itch.io](https://koryme-nakxay.itch.io)

---

*© 2025 Maxime Corby*
