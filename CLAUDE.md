# tus-03-sama — SAMĀ Festival Site Rebuild

## Operating principles
- Optimize for ROI on Amro's time: efficient path, zero wasted effort — but never trade away
  delivery quality. The bar is best-in-class, not "good enough".
- Visual and design quality are first-class requirements: Amro is highly design-driven; polished,
  visually strong outputs are expected by default, not gold-plating.
- Communication: pragmatic and multi-perspective, minimal fluff — state the recommendation and the
  key trade-off, skip the over-explanation.
- Reuse before build; automate anything done twice; outputs must be skimmable.
- Naming: kebab-case, ISO dates (YYYY-MM-DD), filenames <=60 chars, no spaces in new folder names.
- Standard subfolders when adding structure: src, scripts, docs, data, out, arc, tmp, sched, media, pub.
- This project is `tus-03-sama` (The Uncommon Solutions stream) in `_projects\PROJECTS.yaml`.

## This project
- Faithful static rebuild of thesamafestival.com (originally Squarespace), re-themed in an "Ocean & Spice Island" Zanzibar aesthetic; all copy, photos, and video scraped and self-hosted.
- Plain HTML/CSS/JS one-pager: `index.html` + `styles.css` + `script.js`; `img/` photography and logo, `video/` self-hosted clips (web-optimized `*-web.mp4` in use, full-res originals archived), `assets/` workshop PDF.
- Run locally with `python -m http.server 8777` so video plays cleanly; no build step, no dependencies.
- Git repo; `archive/` holds superseded material. Complete, in maintenance mode.

## Do / Don't
- `archive/` is historical record — never edit its contents.
- Keep the site self-contained: no CDNs or external requests; new media gets web-optimized like the existing `*-web.mp4` pattern.
- Content is © Waleed Shah / the artists — confirm usage rights before any public publish or redistribution.
- Commit only when asked; don't delete the archived full-res videos without explicit instruction.
