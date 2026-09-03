# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign aashubee.github.io from the HTML5UP Spectral template into a Bold Editorial + PCB Accents aesthetic across all pages.

**Architecture:** CSS-only design system update layered on top of the existing Spectral base (main.css + site.css). Nav is replaced site-wide from the Spectral jQuery hamburger to a custom sticky nav. index.html hero/about/projects sections are fully rewritten. All other pages get nav-only updates; body content is untouched.

**Tech Stack:** Vanilla HTML, CSS, JS. No build tools. Google Fonts CDN. IntersectionObserver for scroll animations.

## Global Constraints

- No npm, no build step, no frameworks — edit files directly
- Keep all existing project page body content (galleries, text, videos) exactly as-is
- Google Fonts loaded in `main.css` via `@import`
- All paths are relative — `assets/css/`, `assets/js/`, `images/`
- Spectral base styles in `main.css` stay intact for project pages that still use `.wrapper`, `.inner`, `.style5`, etc.
- Site deploys to GitHub Pages from `main` branch

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `assets/css/main.css` | Modify | Add fonts, update `:root` tokens, add hero/about/animation CSS |
| `assets/css/site.css` | Modify | Replace nav, update buttons, cards, tags, dividers, footer |
| `assets/js/nav-toggle.js` | Create | Mobile nav hamburger toggle (22 lines) |
| `assets/js/scroll-animations.js` | Create | IntersectionObserver scroll-entry animations |
| `index.html` | Rewrite | New hero, about, featured projects, CTA |
| `projects.html` | Modify | Nav swap + page header eyebrow |
| `contact.html` | Modify | Nav swap |
| `resume.html` | Modify | Nav swap |
| `slytherdrive.html` | Modify | Nav swap only |
| `midi_keyboard.html` | Modify | Nav swap only |
| `holycr@b.html` | Modify | Nav swap only |
| `drone_automation.html` | Modify | Nav swap only |
| `fire_suspension.html` | Modify | Nav swap only |
| `frc.html` | Modify | Nav swap only |
| `machine_monitoring.html` | Modify | Nav swap only |
| `spotifymuse.html` | Modify | Nav swap only |

---

## Reusable Snippets (reference in all tasks)

### Nav HTML (same on every page — adjust active link per page)
```html
<nav id="site-nav">
  <a href="index.html" class="nav-logo">Aashrith</a>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="resume.html">Resume</a></li>
    <li><a href="projects.html">Projects</a></li>
  </ul>
  <a href="contact.html" class="nav-cta">Contact</a>
  <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>
```

### Footer HTML (same on every page)
```html
<footer id="site-footer">
  <p>&copy; Aashrith Beesabathuni</p>
</footer>
```

### Scripts block (pages that need nav-toggle + scroll animations)
```html
<script src="assets/js/nav-toggle.js"></script>
<script src="assets/js/scroll-animations.js"></script>
```

---

## Task 1: CSS Foundations — `main.css`

**Files:**
- Modify: `assets/css/main.css` (top of file — tokens and imports only)

**What this task does:** Adds the four Google Fonts, updates `:root` design tokens, adds hero/about/animation CSS. Does NOT remove Spectral base styles (still needed by project pages).

- [ ] **Step 1: Replace the Google Fonts `@import` lines at the top of `main.css`**

Find and replace the existing `@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk...` line(s) with:

```css
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&family=Space+Grotesk:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Sora:wght@400;500&display=swap');
```

- [ ] **Step 2: Update `:root` in `main.css`**

Find the existing `:root { ... }` block and replace it entirely:

```css
:root {
  --bg:           #0d1716;
  --panel:        #1a2e24;
  --panel-strong: #0c1514;
  --text:         #e7f5ee;
  --muted:        #b8cfc5;
  --accent:       #34d27f;
  --accent-strong:#1fb86d;
  --accent-soft:  rgba(52, 210, 127, 0.12);
  --accent-dim:   rgba(52, 210, 127, 0.13);
  --font-display: 'Big Shoulders Display', sans-serif;
  --font-heading: 'Space Grotesk', 'Open Sans', Helvetica, sans-serif;
  --font-body:    'Sora', 'Open Sans', Helvetica, sans-serif;
  --font-mono:    'IBM Plex Mono', monospace;
}
```

- [ ] **Step 3: Add `html` base and hero/about/animation CSS at the bottom of `main.css`**

Append to the very end of the file:

```css
/* ── smooth scroll ── */
html { scroll-behavior: smooth; }

/* ── hero section ── */
#hero {
  min-height: 92vh;
  display: flex;
  align-items: center;
  padding: 0 7vw;
  position: relative;
  overflow: hidden;
  background: var(--bg);
}
#hero::before {
  content: '';
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(52,210,127,0.12) 1px, transparent 1px);
  background-size: 26px 26px;
  pointer-events: none;
}
#hero::after {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 55% 80% at 22% 50%, var(--bg) 25%, transparent 75%);
  pointer-events: none;
}
.hero-text { position: relative; z-index: 2; max-width: 640px; }
.hero-annotation {
  font-family: var(--font-mono);
  font-size: 0.72em;
  color: var(--accent);
  letter-spacing: 0.16em;
  opacity: 0.6;
  margin-bottom: 0.9em;
  display: block;
}
.hero-name {
  font-family: var(--font-display);
  font-size: clamp(5rem, 10vw, 9.5rem);
  font-weight: 900;
  line-height: 0.88;
  letter-spacing: 0.01em;
  margin-bottom: 0.3em;
  color: var(--text);
}
.hero-name .hero-green { color: var(--accent); }
.hero-tagline {
  font-family: var(--font-heading);
  font-size: clamp(1rem, 1.8vw, 1.35rem);
  font-weight: 500;
  color: var(--muted);
  margin-bottom: 2.4em;
  min-height: 2em;
}
.txt-rotate > .wrap {
  border-right: 2px solid var(--accent);
  padding-right: 2px;
  color: var(--text);
}
.hero-cta { display: flex; gap: 1em; flex-wrap: wrap; }
.hero-corner {
  position: absolute;
  bottom: 2em; right: 7vw;
  font-family: var(--font-mono);
  font-size: 0.62em;
  color: var(--accent);
  opacity: 0.3;
  letter-spacing: 0.12em;
  z-index: 2;
}
/* Slot for PCB artwork — user will fill later */
.hero-pcb-slot {
  position: absolute;
  right: 0; top: 0; bottom: 0;
  width: 55%;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 30%);
  mask-image: linear-gradient(to right, transparent 0%, black 30%);
}

/* ── about section ── */
.about-section { padding: 6em 7vw; }
.about-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 5em;
  align-items: start;
}
.eyebrow {
  font-family: var(--font-mono);
  font-size: 0.72em;
  color: var(--accent);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.75;
  margin-bottom: 0.9em;
  display: block;
}
.about-section h2 {
  font-family: var(--font-heading);
  font-size: clamp(1.9rem, 3.5vw, 2.8rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin-bottom: 1.2em;
  color: var(--text);
}
.about-section p { font-size: 1em; color: var(--muted); line-height: 1.85; }
.about-photo .profile-image {
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(52,210,127,0.2);
  display: block;
}

/* ── section divider ── */
.section-divider {
  margin: 0 7vw;
  border: none;
  border-top: 1px solid rgba(52,210,127,0.08);
}

/* ── CTA strip ── */
.cta-strip {
  padding: 4em 7vw;
  text-align: center;
  border-top: 1px solid rgba(52,210,127,0.08);
}
.cta-strip h3 {
  font-family: var(--font-heading);
  font-size: 1.4em;
  font-weight: 700;
  margin-bottom: 1.2em;
  color: var(--text);
}
.cta-strip .hero-cta { justify-content: center; }

/* ── scroll-entry animation ── */
.animate-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.animate-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── footer ── */
#site-footer {
  text-align: center;
  padding: 2em;
  border-top: 1px solid rgba(255,255,255,0.04);
  font-family: var(--font-mono);
  font-size: 0.72em;
  color: var(--muted);
  letter-spacing: 0.06em;
  opacity: 0.6;
}

/* ── responsive ── */
@media screen and (max-width: 736px) {
  .about-grid { grid-template-columns: 1fr; }
  .about-photo { order: -1; max-width: 280px; margin: 0 auto; }
}
```

- [ ] **Step 4: Verify fonts and tokens load**

Open `index.html` in a browser (or via `python3 -m http.server` from the project root).
Open DevTools → Elements → `<html>` → Computed styles.
Confirm `--accent` resolves to `#34d27f` and `font-family` on `body` includes `Sora`.

- [ ] **Step 5: Commit**

```bash
git add assets/css/main.css
git commit -m "style: update design tokens and add hero/about/animation CSS"
```

---

## Task 2: Component CSS — `site.css`

**Files:**
- Modify: `assets/css/site.css`

**What this task does:** Replaces the nav styles, updates buttons, updates featured-project cards on the home page, updates tags. Existing gallery/PDF/skills styles are kept as-is.

- [ ] **Step 1: Add nav styles to `site.css`**

Prepend to the top of `site.css` (above the existing `/* ===== Hero title band ===== */` comment):

```css
/* ═══════════════════════════
   SITE NAV
═══════════════════════════ */
#site-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2em 7vw;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(13,23,22,0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 1000;
}
.nav-logo {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.1em;
  color: var(--text);
  text-decoration: none;
  letter-spacing: 0.02em;
}
.nav-links {
  display: flex;
  gap: 2.4em;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-links a {
  font-family: var(--font-body);
  font-size: 0.88em;
  color: var(--muted);
  text-decoration: none;
  letter-spacing: 0.03em;
  transition: color 0.2s;
}
.nav-links a:hover,
.nav-links a.active { color: var(--text); }
.nav-cta {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.82em;
  padding: 0.5em 1.25em;
  border: 1px solid rgba(52,210,127,0.3);
  color: var(--accent);
  border-radius: 6px;
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: background 0.2s, border-color 0.2s;
}
.nav-cta:hover {
  background: rgba(52,210,127,0.08);
  border-color: rgba(52,210,127,0.5);
}
.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.nav-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

@media screen and (max-width: 736px) {
  #site-nav { flex-wrap: wrap; position: relative; }
  .nav-links {
    display: none;
    flex-direction: column;
    gap: 1.2em;
    width: 100%;
    padding: 1.2em 0 0.5em;
  }
  #site-nav.nav-open .nav-links { display: flex; }
  .nav-toggle { display: flex; }
  #site-nav.nav-open .nav-toggle span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  #site-nav.nav-open .nav-toggle span:nth-child(2) { opacity: 0; }
  #site-nav.nav-open .nav-toggle span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
}
```

- [ ] **Step 2: Add button styles**

Append after the nav block:

```css
/* ═══════════════════════════
   BUTTONS
═══════════════════════════ */
.btn-primary {
  display: inline-block;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.9em;
  letter-spacing: 0.05em;
  padding: 0.82em 1.9em;
  background: var(--accent);
  color: #0d1716;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.2s;
  border: none;
  cursor: pointer;
}
.btn-primary:hover { background: var(--accent-strong); color: #0d1716; }
.btn-ghost {
  display: inline-block;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.9em;
  letter-spacing: 0.05em;
  padding: 0.82em 1.9em;
  background: transparent;
  color: var(--text);
  border: 1px solid rgba(255,255,255,0.13);
  border-radius: 6px;
  text-decoration: none;
  transition: border-color 0.2s;
  cursor: pointer;
}
.btn-ghost:hover { border-color: rgba(255,255,255,0.3); color: var(--text); }
```

- [ ] **Step 3: Update home-page featured projects section**

Find the existing `/* ===== Home page ===== */` block in `site.css` and replace the `#two.wrapper.alt.style2` rules with:

```css
/* ===== Home page — featured projects ===== */
.featured-projects-section { padding: 4em 7vw 6em; }
.featured-projects-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 2.2em;
}
.featured-projects-header h2 {
  font-family: var(--font-heading);
  font-size: clamp(1.7rem, 3vw, 2.3rem);
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--text);
}
.see-all-link {
  font-family: var(--font-mono);
  font-size: 0.72em;
  color: var(--accent);
  opacity: 0.75;
  text-decoration: none;
  letter-spacing: 0.1em;
}
.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
@media screen and (max-width: 900px) { .featured-grid { grid-template-columns: repeat(2,1fr); } }
@media screen and (max-width: 600px) { .featured-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 4: Verify nav renders correctly**

Open any page in browser. Confirm:
- Nav is sticky (scrolls with page, stays at top)
- Logo, links, and Contact button are visible
- At mobile width (≤736px): links hide, hamburger appears

- [ ] **Step 5: Commit**

```bash
git add assets/css/site.css
git commit -m "style: add nav, button, and featured-projects component CSS"
```

---

## Task 3: JS — Nav Toggle + Scroll Animations

**Files:**
- Create: `assets/js/nav-toggle.js`
- Create: `assets/js/scroll-animations.js`

- [ ] **Step 1: Create `assets/js/nav-toggle.js`**

```javascript
(function () {
  var nav = document.getElementById('site-nav');
  var btn = nav && nav.querySelector('.nav-toggle');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // close nav when a link is clicked (mobile)
  nav.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();
```

- [ ] **Step 2: Create `assets/js/scroll-animations.js`**

```javascript
(function () {
  if (!('IntersectionObserver' in window)) {
    // fallback: just make everything visible
    document.querySelectorAll('.animate-in').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.animate-in').forEach(function (el) {
    observer.observe(el);
  });
})();
```

- [ ] **Step 3: Verify nav toggle works on mobile**

Open `index.html` in browser. Resize to ≤736px.
- Hamburger button appears
- Clicking it opens/closes nav links
- Clicking a nav link closes the menu

- [ ] **Step 4: Commit**

```bash
git add assets/js/nav-toggle.js assets/js/scroll-animations.js
git commit -m "feat: add mobile nav toggle and scroll-entry animation JS"
```

---

## Task 4: `index.html` — Full Rewrite

**Files:**
- Rewrite: `index.html`

**What this task does:** Replaces the entire page with the new hero, about, featured projects, and CTA sections. Keeps the TxtRotate JS. Loads new nav-toggle and scroll-animations JS.

- [ ] **Step 1: Replace `index.html` entirely with the following**

```html
<!DOCTYPE HTML>
<html lang="en">
<head>
  <title>Aashrith - Home</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
  <link rel="stylesheet" href="assets/css/main.css" />
  <link rel="stylesheet" href="assets/css/site.css" />
</head>
<body>

  <nav id="site-nav">
    <a href="index.html" class="nav-logo">Aashrith</a>
    <ul class="nav-links">
      <li><a href="index.html" class="active">Home</a></li>
      <li><a href="resume.html">Resume</a></li>
      <li><a href="projects.html">Projects</a></li>
    </ul>
    <a href="contact.html" class="nav-cta">Contact</a>
    <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <!-- HERO -->
  <section id="hero">
    <!-- PCB artwork slot: replace this comment with <img> or <svg> when ready -->
    <div class="hero-pcb-slot"></div>
    <div class="hero-text">
      <span class="hero-annotation">// portfolio_v2 · EECS + ME · UC Berkeley</span>
      <h1 class="hero-name">Hi, I'm<br><span class="hero-green">Aashrith.</span></h1>
      <p class="hero-tagline">
        and I am a <span
          class="txt-rotate"
          data-period="2000"
          data-rotate='["Engineer.","Designer.","Programmer.","Maker.","Tinkerer."]'
        ></span>
      </p>
      <div class="hero-cta">
        <a href="projects.html" class="btn-primary">View Projects</a>
        <a href="#about" class="btn-ghost">Learn More ↓</a>
      </div>
    </div>
    <div class="hero-corner">AASHRITH_B · REV_02</div>
  </section>

  <hr class="section-divider">

  <!-- ABOUT -->
  <section id="about" class="about-section animate-in">
    <div class="about-grid">
      <div class="about-text">
        <span class="eyebrow">// about_me</span>
        <h2>About Me</h2>
        <p>Hello there! My name is Aashrith Beesabathuni, a senior at UC Berkeley studying EECS (Electrical Engineering + Computer Science) and
          Mechanical Engineering. My area of interest is robotics, as I love the intersection between hardware and software to create a system for any purpose.
          I believe the best way to learn is by doing, so I love gaining hands-on experience to learn new skills! As a senior graduating in May 2026, I wanted to create
          a portfolio to show off some of my technical work throughout the years.
          On the non-technical end, I love photography, and expressing my creativity through street and concert style photos. Feel free to reach out if you want to chat about anything
          that interests you on here!</p>
        <div class="company-logos">
          <div class="logos-container">
            <img src="images/aws-color.png" alt="AWS">
            <img src="images/Apple_logo_grey.svg" alt="Apple">
            <img src="images/Molex-Logo.svg" alt="Molex">
            <img src="images/berkeley-logo.png" alt="UC Berkeley">
          </div>
        </div>
      </div>
      <div class="about-photo">
        <img src="images/aashrithpfp2.jpg" alt="Aashrith Beesabathuni" class="profile-image">
      </div>
    </div>
  </section>

  <hr class="section-divider">

  <!-- FEATURED PROJECTS -->
  <section class="featured-projects-section animate-in">
    <div class="featured-projects-header">
      <h2>Featured Projects</h2>
      <a href="projects.html" class="see-all-link">// see_all →</a>
    </div>
    <div class="featured-grid">

      <a href="slytherdrive.html" class="project-card" style="text-decoration:none;">
        <img src="images/ME139/IMG_3265.jpeg" alt="SlytherDrive snake robot">
        <div class="project-description">
          <h3>SlytherDrive</h3>
          <p>Bio-inspired Snake Robot</p>
        </div>
        <div class="project-tags">
          <span class="project-tag">Robotics</span>
          <span class="project-tag">Simulation</span>
          <span class="project-tag">Controls</span>
          <span class="project-tag">Biomechanics</span>
        </div>
      </a>

      <a href="midi_keyboard.html" class="project-card" style="text-decoration:none;">
        <img src="images/HOPE/midi_real.png" alt="MIDI Keyboard">
        <div class="project-description">
          <h3>MIDI Keyboard Controller</h3>
          <p>HOPE PCB Design Final Project</p>
        </div>
        <div class="project-tags">
          <span class="project-tag">PCB Design</span>
          <span class="project-tag">Firmware</span>
          <span class="project-tag">Microcontroller</span>
          <span class="project-tag">Misc. Electronics</span>
        </div>
      </a>

      <a href="holycr@b.html" class="project-card" style="text-decoration:none;">
        <img src="images/CR@B/robotcad.png" alt="HOLY CR@B !!">
        <div class="project-description">
          <h3>HOLY CR@B !!</h3>
          <p>Finalist 15 pound combat robot</p>
        </div>
        <div class="project-tags">
          <span class="project-tag">CAD</span>
          <span class="project-tag">Motor Control</span>
          <span class="project-tag">Machining</span>
          <span class="project-tag">Misc. Electronics</span>
        </div>
      </a>

    </div>
  </section>

  <!-- CTA STRIP -->
  <div class="cta-strip animate-in">
    <h3>Want to collaborate or chat?</h3>
    <div class="hero-cta">
      <a href="projects.html" class="btn-ghost">See All Projects</a>
      <a href="contact.html" class="btn-primary">Contact Me</a>
    </div>
  </div>

  <footer id="site-footer">
    <p>&copy; Aashrith Beesabathuni</p>
  </footer>

  <!-- TxtRotate typewriter animation -->
  <script>
    class TxtRotate {
      constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.isDeleting = false;
        this.tick();
      }
      tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];
        this.txt = this.isDeleting
          ? fullTxt.substring(0, this.txt.length - 1)
          : fullTxt.substring(0, this.txt.length + 1);
        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
        let delta = 200 - Math.random() * 100;
        if (this.isDeleting) delta /= 2;
        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 500;
        }
        setTimeout(() => this.tick(), delta);
      }
    }
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.querySelectorAll('.txt-rotate').forEach(el => {
          const toRotate = el.getAttribute('data-rotate');
          const period = el.getAttribute('data-period');
          if (toRotate) new TxtRotate(el, JSON.parse(toRotate), period);
        });
      }, 400);
    });
  </script>
  <script src="assets/js/nav-toggle.js"></script>
  <script src="assets/js/scroll-animations.js"></script>

</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Check:
- Hero: Big Shoulders Display name, typewriter animation cycles after ~400ms
- Dot-grid visible on right side of hero, fades on left
- About section: original text, photo on right
- Company logos row visible
- 3 project cards visible with images and tags
- CTA strip at bottom
- No console errors

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: rewrite homepage with new hero, about, and projects sections"
```

---

## Task 5: `projects.html` — Nav + Header

**Files:**
- Modify: `projects.html`

- [ ] **Step 1: Replace the `<header id="header">...</header>` block**

Find:
```html
<header id="header">
  <h1><a href="index.html">Aashrith</a></h1>
  <nav id="nav">
    ...
  </nav>
</header>
```

Replace with the nav snippet (Projects link gets `class="active"`):
```html
<nav id="site-nav">
  <a href="index.html" class="nav-logo">Aashrith</a>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="resume.html">Resume</a></li>
    <li><a href="projects.html" class="active">Projects</a></li>
  </ul>
  <a href="contact.html" class="nav-cta">Contact</a>
  <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>
```

- [ ] **Step 2: Replace the `<article id="main">` page header**

Find:
```html
<article id="main">
  <header>
    <h2>Projects</h2>
    <p>Engineering Projects throughout the years</p>
  </header>
</article>
```

Replace with:
```html
<div class="projects-page-header" style="padding: 3em 7vw 1em;">
  <span class="eyebrow">// all_projects</span>
  <h2 style="font-family: var(--font-heading); font-size: clamp(2rem,4vw,3rem); font-weight:800; letter-spacing:-0.01em; color:var(--text); margin-top:0.4em;">Projects</h2>
  <p style="color:var(--muted); font-size:0.95em;">Engineering Projects throughout the years</p>
</div>
```

- [ ] **Step 3: Replace the existing `<footer id="footer">` with new footer**

Find:
```html
<footer id="footer">
  <ul class="copyright">
    <li>&copy; Aashrith Beesabathuni </li>
  </ul>
</footer>
```

Replace with:
```html
<footer id="site-footer">
  <p>&copy; Aashrith Beesabathuni</p>
</footer>
```

- [ ] **Step 4: Replace scripts block at bottom**

Find and replace all `<script src="assets/js/...">` tags with:
```html
<script src="assets/js/nav-toggle.js"></script>
<script src="assets/js/scroll-animations.js"></script>
```

- [ ] **Step 5: Verify in browser**

Open `projects.html`. Confirm:
- New nav renders correctly, Projects link is active
- Page header shows eyebrow + title
- All 7 project cards still visible with correct images and links

- [ ] **Step 6: Commit**

```bash
git add projects.html
git commit -m "style: update projects page nav and header"
```

---

## Task 6: `contact.html` + `resume.html`

**Files:**
- Modify: `contact.html`
- Modify: `resume.html`

### contact.html

- [ ] **Step 1: Replace `<header id="header">...</header>` in contact.html**

```html
<nav id="site-nav">
  <a href="index.html" class="nav-logo">Aashrith</a>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="resume.html">Resume</a></li>
    <li><a href="projects.html">Projects</a></li>
  </ul>
  <a href="contact.html" class="nav-cta active">Contact</a>
  <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>
```

- [ ] **Step 2: Replace footer and scripts in contact.html**

Footer:
```html
<footer id="site-footer">
  <p>&copy; Aashrith Beesabathuni</p>
</footer>
```

Scripts:
```html
<script src="assets/js/nav-toggle.js"></script>
<script src="assets/js/scroll-animations.js"></script>
```

### resume.html

- [ ] **Step 3: Replace `<header id="header">...</header>` in resume.html**

```html
<nav id="site-nav">
  <a href="index.html" class="nav-logo">Aashrith</a>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="resume.html" class="active">Resume</a></li>
    <li><a href="projects.html">Projects</a></li>
  </ul>
  <a href="contact.html" class="nav-cta">Contact</a>
  <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>
```

- [ ] **Step 4: Replace footer and scripts in resume.html**

Footer:
```html
<footer id="site-footer">
  <p>&copy; Aashrith Beesabathuni</p>
</footer>
```

Scripts:
```html
<script src="assets/js/nav-toggle.js"></script>
```

- [ ] **Step 5: Verify both pages in browser**

Confirm nav renders, active state correct, page content unchanged.

- [ ] **Step 6: Commit**

```bash
git add contact.html resume.html
git commit -m "style: update nav on contact and resume pages"
```

---

## Task 7: Project Detail Pages — Nav Swap (batch)

**Files:** `slytherdrive.html`, `midi_keyboard.html`, `holycr@b.html`, `drone_automation.html`, `fire_suspension.html`, `frc.html`, `machine_monitoring.html`, `spotifymuse.html`

**Rule:** On every file — replace the `<header id="header">` block, replace `<footer id="footer">`, replace scripts. Touch nothing else.

- [ ] **Step 1: For each of the 8 files, replace `<header id="header">...</header>`**

Paste this nav (no active class on any link — user is on a project page):
```html
<nav id="site-nav">
  <a href="index.html" class="nav-logo">Aashrith</a>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="resume.html">Resume</a></li>
    <li><a href="projects.html">Projects</a></li>
  </ul>
  <a href="contact.html" class="nav-cta">Contact</a>
  <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>
```

- [ ] **Step 2: For each of the 8 files, replace `<footer id="footer">...</footer>`**

```html
<footer id="site-footer">
  <p>&copy; Aashrith Beesabathuni</p>
</footer>
```

- [ ] **Step 3: For each of the 8 files, replace the scripts block**

```html
<script src="assets/js/nav-toggle.js"></script>
<script src="assets/js/scroll-animations.js"></script>
```

- [ ] **Step 4: Verify one project page end-to-end**

Open `slytherdrive.html`. Confirm:
- Nav is visible and sticky
- All galleries, images, videos, text exactly as before
- No console errors
- Mobile hamburger works

- [ ] **Step 5: Commit**

```bash
git add slytherdrive.html midi_keyboard.html "holycr@b.html" drone_automation.html \
        fire_suspension.html frc.html machine_monitoring.html spotifymuse.html
git commit -m "style: update nav on all project detail pages"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Big Shoulders Display hero name — Task 4 (`hero-name` class, `var(--font-display)`)
- ✅ Space Grotesk headings/buttons — `:root` in Task 1, button/nav CSS in Task 2
- ✅ IBM Plex Mono labels — `var(--font-mono)` on `.eyebrow`, `.hero-annotation`, tags
- ✅ Sora body — `var(--font-body)` on body
- ✅ Color tokens — Task 1 `:root` block
- ✅ Dot-grid hero background — Task 1 `#hero::before`
- ✅ PCB artwork slot — `.hero-pcb-slot` empty div in Task 4, masked and ready
- ✅ Typewriter rotation — TxtRotate inline JS in Task 4
- ✅ Original about me text — verbatim in Task 4 HTML
- ✅ Scroll animations — Task 3 JS + Task 1 `.animate-in` CSS, applied to about/projects/cta in Task 4
- ✅ Simple hairline divider — `.section-divider` in Task 1
- ✅ Project cards — existing `.project-card` styles in site.css, reused in Task 4
- ✅ Nav on all 14 pages — Tasks 4–7
- ✅ Mobile nav hamburger — Task 2 CSS + Task 3 JS
- ✅ All project page content untouched — Task 7 only touches header/footer/scripts
