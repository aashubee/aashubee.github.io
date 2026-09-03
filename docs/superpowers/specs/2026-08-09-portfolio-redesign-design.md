# Portfolio Redesign — Design Spec
Date: 2026-08-09
Status: Approved

## Overview

Redesign aashubee.github.io from the HTML5UP Spectral base theme into a distinctive "Bold Editorial + PCB Accents" aesthetic. Content stays the same across all pages; only visual treatment changes. The site remains static HTML/CSS with no build tools.

---

## Design System

### Typography (4-font system)
| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Hero name | Big Shoulders Display | 900 | `h1` on index.html only |
| Headings + buttons | Space Grotesk | 700–800 | Section titles, nav logo, buttons |
| Body | Sora | 400–500 | Paragraphs, descriptions |
| Labels / annotations | IBM Plex Mono | 400–500 | Eyebrows, tags, `.hero-annotation`, `// labels` |

All four loaded via Google Fonts in `main.css`.

### Color Tokens (update `:root` in `main.css`)
```css
--bg:           #0d1716;
--panel:        #1a2e24;
--panel-strong: #0c1514;
--text:         #e7f5ee;
--muted:        #b8cfc5;
--accent:       #34d27f;
--accent-strong:#1fb86d;
--accent-soft:  rgba(52,210,127,0.12);
--accent-dim:   rgba(52,210,127,0.13);
--font-display: 'Big Shoulders Display', sans-serif;
--font-heading: 'Space Grotesk', 'Open Sans', sans-serif;
--font-body:    'Sora', 'Open Sans', sans-serif;
--font-mono:    'IBM Plex Mono', monospace;
```

### Shared Components

**Nav** (all pages)
- Sticky, `backdrop-filter: blur(12px)`, `background: rgba(13,23,22,0.95)`
- Left: logo in Space Grotesk 800
- Centre: Home / Resume / Projects links in Sora
- Right: "Contact" as ghost button with green border
- Bottom border: `1px solid rgba(255,255,255,0.05)`
- Replaces existing Spectral hamburger menu on all pages

**Section eyebrow**
- IBM Plex Mono, 0.72em, `color: var(--accent)`, `letter-spacing: 0.18em`, `text-transform: uppercase`, opacity 0.75
- Format: `// section_name`

**Section divider**
- `<hr>` with `margin: 0 7vw; border-top: 1px solid rgba(52,210,127,0.08);`
- Replaces previous PCB-trace SVG dividers (those were removed as too gimmicky)

**Buttons**
- Primary: `background: var(--accent); color: #0d1716; border-radius: 6px;`
- Ghost: `border: 1px solid rgba(255,255,255,0.13); color: var(--text); border-radius: 6px;`
- Both: Space Grotesk 700, 0.9em, `letter-spacing: 0.05em`, `padding: 0.82em 1.9em`

**Project tags**
- IBM Plex Mono 0.65em, pill shape, `background: var(--accent-dim)`, `border: 1px solid rgba(52,210,127,0.18)`, `color: #a8e8c5`

**Project cards**
- `background: var(--panel)`, `border: 1px solid rgba(52,210,127,0.1)`, `border-radius: 14px`
- Hover: `translateY(-5px)`, border brightens to `rgba(52,210,127,0.35)`, box-shadow deepens
- Image height: 190px, `object-fit: cover`
- Title: Space Grotesk 700, description: Sora muted

**Footer**
- Minimal: `© Aashrith Beesabathuni` centred, muted text

---

## Pages

### 1. `index.html` — Home

**Hero section**
- Full-viewport height (`min-height: 92vh`), flex, `align-items: center`, `padding: 0 7vw`
- Background: dot-grid texture (`radial-gradient` 1px dots, 26px grid, opacity 0.12) with radial vignette fading dots out on the left where text lives
- PCB image/SVG slot: absolutely positioned right half of hero, masked left edge — **left empty for now**, user will drop in real PCB artwork later
- Corner label: `AASHRITH_B · REV_02` in IBM Plex Mono, bottom-right, opacity 0.3

Hero text stack:
1. Annotation: `// portfolio_v2 · EECS + ME · UC Berkeley` (IBM Plex Mono, accent, opacity 0.6)
2. Name: `Hi, I'm` + `Aashrith.` (Big Shoulders Display 900, ~9.5rem, accent green on name)
3. Tagline: `and I am a [rotating word]` — typewriter animation cycling through `["Engineer.", "Designer.", "Programmer.", "Maker.", "Tinkerer."]`, same JS as current site, cursor is `border-right: 2px solid var(--accent)`
4. Two buttons: "View Projects" (primary) + "Learn More ↓" (ghost)

**About section**
- Two-column grid: `1fr 300px`, `padding: 6em 7vw`
- Left: eyebrow `// about_me`, `h2` "About Me", then **original body text verbatim** (no rewording), company logos row at bottom
- Right: profile photo (`images/aashrithpfp2.jpg`), `border-radius: 12px`, green border
- Company logos: AWS, Apple, Molex, UC Berkeley — same images as current, displayed as a flex row

**Featured Projects section**
- Eyebrow + "Featured Projects" heading with `// see_all →` link right-aligned (IBM Plex Mono)
- 3-column card grid: SlytherDrive, MIDI Keyboard, HOLY CR@B — same images and content as current

**CTA strip**
- `text-align: center`, "Want to collaborate or chat?", two buttons: "See All Projects" (ghost) + "Contact Me" (primary)

---

### 2. `projects.html` — Projects

- Nav + footer (same as all pages)
- Page header: eyebrow `// all_projects`, `h2` "Projects", subtext "Engineering Projects throughout the years" — Space Grotesk
- Projects grid: 3-column responsive (`repeat(3,1fr)`, collapses to 2 then 1 on mobile)
- All 7 existing project cards retain same images, titles, descriptions, tags, and `onclick` links
- CTA strip at bottom: "And many more to come..."

---

### 3. `contact.html` — Contact

- Existing two-column contact card layout retained
- Update fonts, colors, button styles to match new system
- Nav + footer updated

---

### 4. `resume.html` — Resume

- Nav + footer updated
- PDF embed retained as-is

---

### 5. Project detail pages (all 7)

Applies to: `slytherdrive.html`, `midi_keyboard.html`, `holycr@b.html`, `drone_automation.html`, `fire_suspension.html`, `frc.html`, `machine_monitoring.html`, `spotifymuse.html`

- Nav updated (replace Spectral hamburger with new nav)
- Hero title band: eyebrow + project title + subtitle — existing `.project-hero-title` styles updated to new font system
- **All body content, images, galleries, videos unchanged** — user approved keeping content as-is
- Footer updated

---

## Animations

- **Typewriter rotation** on hero tagline — existing JS `TxtRotate` class, unchanged logic
- **Card hover** — `translateY(-5px)` + border brighten + box-shadow, `transition: 0.28s ease`
- **Scroll entry** — sections fade + `translateY(20px)` → 0 on IntersectionObserver, `threshold: 0.15`, `transition: opacity 0.5s ease, transform 0.5s ease`. Applied to: about section, projects section, project detail sections.
- No parallax, no page transitions, no other motion

---

## Files to Change

| File | Change |
|------|--------|
| `assets/css/main.css` | Update `:root` tokens, Google Fonts imports, `#banner` → new hero styles, remove old Spectral section styles |
| `assets/css/site.css` | Update nav, card, tag, button, divider, gallery styles to new system |
| `index.html` | Full hero rewrite, about/projects sections updated |
| `projects.html` | Header + nav updated |
| `contact.html` | Nav + font/color updates |
| `resume.html` | Nav updated |
| `slytherdrive.html` | Nav updated |
| `midi_keyboard.html` | Nav updated |
| `holycr@b.html` | Nav updated |
| `drone_automation.html` | Nav updated |
| `fire_suspension.html` | Nav updated |
| `frc.html` | Nav updated |
| `machine_monitoring.html` | Nav updated |
| `spotifymuse.html` | Nav updated |

---

## Out of Scope

- PCB hero artwork — user will supply real PCB image/SVG from their MIDI keyboard project later; a placeholder slot is left in the hero
- Content changes on any project detail page
- New pages or routing
- Any JavaScript framework or build system
