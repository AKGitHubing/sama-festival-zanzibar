# The SAMĀ Festival — Zanzibar rebuild

A faithful rebuild of [thesamafestival.com](https://thesamafestival.com) (originally a Squarespace
one-pager) as a self-contained static site, re-themed in an **Ocean & Spice Island** Zanzibar
aesthetic — turquoise, sand, coral and sunset gold, with dhow-sail and wave motifs that echo the
brand's triangular SAMĀ mark.

All original copy, photography and video were scraped from the live site and are **self-hosted** here.

## Run it

It's plain HTML/CSS/JS — open `index.html` in a browser, or (recommended, so video plays cleanly):

```bash
python -m http.server 8777
# then visit http://127.0.0.1:8777/
```

## Structure

```
index.html        Single-page site (header, hero, intro, line-up, watch, artists, workshop, about, join, footer)
styles.css        Ocean & Spice Island theme (CSS variables, wave dividers, reveal animations, responsive)
script.js         Sticky header, mobile menu, scroll-reveal (IntersectionObserver), lazy video wiring
img/              Photography (Waleed Shah) + SAMĀ logo + poster frames
video/            Self-hosted video (see below)
assets/           orisha-movements.pdf (the workshop guide)
```

### Video files

| File | Used by page | Notes |
|------|:---:|------|
| `video/hero-bg-2.mp4` | ✅ hero background | 720p, muted, web-optimized (5.7 MB) |
| `video/afrosideral-live-web.mp4` | ✅ Watch section | "Filho do Mar" live, 720p (47 MB) |
| `video/afrosideral-remix-web.mp4` | ✅ Watch section | "Filho do Mar" remix, 720p (36 MB) |
| `video/hero1.mp4`, `hero2.mp4` | — | original 1080p hero clips (archived) |
| `video/hero-bg-1.mp4` | — | alt hero (has burned-in captions; unused) |
| `video/afrosideral-live.mp4`, `…-remix.mp4` | — | original full-res YouTube downloads (archived) |

The `*-web.mp4` performance videos use `preload="none"` + lazy `data-src`, so they only download when
played. The archived originals are kept for fidelity and can be deleted to shrink the project (~230 MB).

## Source mapping

- Original platform: Squarespace (site id `6030017b8378c1244c2f6236`)
- Hero clips: Squarespace native video (AES-128 HLS, fetched + decrypted)
- Watch videos: YouTube `H33XicAOwVU`, `U9R9WjFMvIo`
- Socials: Instagram `@thesamafestival`, WhatsApp circle, WhatsApp `+971 54 517 3334`

## Credits & rights

Photography © Waleed Shah. Music & video © Afrosideral / Âpe Chimba / Raíces Profundas / BJDC and the
respective artists. This rebuild reuses original SAMĀ content and assets — confirm usage rights before
publishing publicly.
