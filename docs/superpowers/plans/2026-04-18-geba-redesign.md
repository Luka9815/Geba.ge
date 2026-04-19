# Geba.ge Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Geba.ge website to the approved "Biotech Hybrid" visual direction — red primary, teal accent, Space Grotesk headings, IBM Plex Sans body, 2-col hero with DNA helix background, and a 3-col footer.

**Architecture:** Approach C — audit existing selectors, define CSS tokens, then update each component together (CSS + template) to avoid writing styles for ghost classes. `index.njk` and `en.njk` are converted from standalone HTML documents to Eleventy layouts. A new `footer.njk` partial is created and wired into `base.njk`.

**Tech Stack:** Eleventy v2, Nunjucks, single `style.css`, Google Fonts (Space Grotesk + IBM Plex Sans), GitHub Pages via GitHub Actions.

---

## Files Changed

| Action   | Path                                      | Purpose                                      |
|----------|-------------------------------------------|----------------------------------------------|
| Create   | `src/_includes/partials/footer.njk`       | Bilingual 3-col footer + copyright bar       |
| Modify   | `src/_includes/layouts/base.njk`          | Font swap, favicon, footer include           |
| Modify   | `src/_includes/partials/header.njk`       | Flags moved into nav, logo image only        |
| Modify   | `src/style.css`                           | Full rewrite with new design tokens          |
| Modify   | `src/index.njk`                           | Convert to base layout, full hero + sections |
| Modify   | `src/en.njk`                              | Convert to base layout, full hero + sections |
| Modify   | `src/pages/projects.njk`                  | Hero banner, updated 2-col card grid         |
| Modify   | `src/pages/projects-ge.njk`               | Same as above, Georgian                      |

---

## Brand Reference

```
--primary:    #C82315   (headlines, buttons, active nav, links)
--accent:     #2E7D6E   (tags, labels, outline buttons, funder lines)
--hero-bg:    #fef8f7
--footer-bg:  #f5f5f3
--footer-bar: #eeede9
--text:       #555555
--heading:    #1a1a1a
--border:     #ebebeb
Headings: 'Space Grotesk', sans-serif
Body:     'IBM Plex Sans', sans-serif
```

---

## Task 1: Create footer partial

**Files:**
- Create: `src/_includes/partials/footer.njk`

- [ ] **Step 1: Create the file**

```nunjucks
{% if lang == 'ka' %}
<footer class="site-footer" id="contact">
  <div class="footer-inner">
    <div class="footer-col">
      <img src="/assets/images/Geba logo picture.png" class="footer-logo" alt="GEBA">
      <p class="footer-tagline">საქართველოს ბიოტექნოლოგიის ასოციაცია</p>
    </div>
    <div class="footer-col">
      <h4>ნავიგაცია</h4>
      <ul>
        <li><a href="/index.html">მთავარი</a></li>
        <li><a href="/pages/projects-ge.html">პროექტები</a></li>
        <li><a href="/pages/news-ge.html">სიახლეები</a></li>
        <li><a href="/pages/partners-ge/">პარტნიორები</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>კონტაქტი</h4>
      <p><a href="mailto:info@geba.ge">info@geba.ge</a></p>
      <p>შალვა ნუცუბიძის ქ. #75, თბილისი</p>
      <p><a href="https://www.facebook.com/Geba2020" target="_blank" rel="noopener">Facebook</a></p>
    </div>
  </div>
  <div class="footer-bar">
    <p>© 2026 საქართველოს ბიოტექნოლოგიის ასოციაცია</p>
  </div>
</footer>
{% else %}
<footer class="site-footer" id="contact">
  <div class="footer-inner">
    <div class="footer-col">
      <img src="/assets/images/Geba logo picture.png" class="footer-logo" alt="GEBA">
      <p class="footer-tagline">Georgian Biotechnology Association</p>
    </div>
    <div class="footer-col">
      <h4>Navigation</h4>
      <ul>
        <li><a href="/en.html">Home</a></li>
        <li><a href="/pages/projects.html">Projects</a></li>
        <li><a href="/pages/news.html">News</a></li>
        <li><a href="/pages/partners/">Partners</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <p><a href="mailto:info@geba.ge">info@geba.ge</a></p>
      <p>75 Shalva Nutsubidze St., Tbilisi</p>
      <p><a href="https://www.facebook.com/Geba2020" target="_blank" rel="noopener">Facebook</a></p>
    </div>
  </div>
  <div class="footer-bar">
    <p>© 2026 Georgian Biotechnology Association</p>
  </div>
</footer>
{% endif %}
```

- [ ] **Step 2: Commit**

```bash
git add src/_includes/partials/footer.njk
git commit -m "feat: add bilingual footer partial"
```

---

## Task 2: Update base layout

**Files:**
- Modify: `src/_includes/layouts/base.njk`

- [ ] **Step 1: Replace the entire file**

```nunjucks
<!doctype html>
<html lang="{{ lang or 'en' }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ title }}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=IBM+Plex+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32.png">
  <link rel="icon" type="image/png" sizes="180x180" href="/assets/images/favicon-180.png">
  <link rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg">
</head>
<body>
  {% include "partials/header.njk" %}
  <main>
    {{ content | safe }}
  </main>
  {% include "partials/footer.njk" %}
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/_includes/layouts/base.njk
git commit -m "feat: update base layout — Space Grotesk + IBM Plex Sans, add footer"
```

---

## Task 3: Update header partial

**Files:**
- Modify: `src/_includes/partials/header.njk`

Changes: remove `.lang-toggle` fixed div, move flags into nav, remove `<h1>` site name (logo image only).

- [ ] **Step 1: Replace the entire file**

```nunjucks
{% if lang == 'ka' %}
<header class="site-header">
  <div class="header-inner">
    <a href="/index.html" class="header-logo-link">
      <img src="/assets/images/Geba logo picture.png" class="header-logo" alt="GeBA">
    </a>
    <nav class="main-nav">
      <a href="/index.html">მთავარი</a>
      <a href="/index.html#about">ჩვენ შესახებ</a>
      <a href="/pages/projects-ge.html"{% if nav_active=='projects' %} class="active"{% endif %}>პროექტები</a>
      <a href="/pages/news-ge.html"{% if nav_active=='news' %} class="active"{% endif %}>სიახლეები</a>
      <a href="/index.html#contact">კონტაქტი</a>
      <a href="/pages/partners-ge/"{% if nav_active=='partners' %} class="active"{% endif %}>პარტნიორები</a>
    </nav>
    <div class="header-flags">
      <a href="{{ alt_url_en or '/en.html' }}" title="English"><img src="https://flagcdn.com/24x18/gb.png" alt="English"></a>
      <a href="{{ page.url }}" class="flag-active" title="Georgian"><img src="https://flagcdn.com/24x18/ge.png" alt="Georgian"></a>
    </div>
  </div>
</header>
{% else %}
<header class="site-header">
  <div class="header-inner">
    <a href="/en.html" class="header-logo-link">
      <img src="/assets/images/Geba logo picture.png" class="header-logo" alt="GeBA">
    </a>
    <nav class="main-nav">
      <a href="/en.html">Home</a>
      <a href="/en.html#about">About</a>
      <a href="/pages/projects.html"{% if nav_active=='projects' %} class="active"{% endif %}>Projects</a>
      <a href="/pages/news.html"{% if nav_active=='news' %} class="active"{% endif %}>News</a>
      <a href="/en.html#contact">Contact</a>
      <a href="/pages/partners/"{% if nav_active=='partners' %} class="active"{% endif %}>Partners</a>
    </nav>
    <div class="header-flags">
      <a href="{{ page.url }}" class="flag-active" title="English"><img src="https://flagcdn.com/24x18/gb.png" alt="English"></a>
      <a href="{{ alt_url_ka or '/index.html' }}" title="Georgian"><img src="https://flagcdn.com/24x18/ge.png" alt="Georgian"></a>
    </div>
  </div>
</header>
{% endif %}
```

- [ ] **Step 2: Commit**

```bash
git add src/_includes/partials/header.njk
git commit -m "feat: update header — flags in nav, logo only, remove fixed lang-toggle"
```

---

## Task 4: Rewrite style.css

**Files:**
- Modify: `src/style.css`

- [ ] **Step 1: Replace the entire file**

```css
/* ===================================================
   TOKENS
=================================================== */
:root {
  --primary:    #C82315;
  --accent:     #2E7D6E;
  --hero-bg:    #fef8f7;
  --footer-bg:  #f5f5f3;
  --footer-bar: #eeede9;
  --text:       #555555;
  --heading:    #1a1a1a;
  --border:     #ebebeb;
  --white:      #ffffff;
  --font-head:  'Space Grotesk', sans-serif;
  --font-body:  'IBM Plex Sans', sans-serif;
  --radius:     8px;
  --container:  1100px;
}

/* ===================================================
   RESET + BASE
=================================================== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  color: var(--text);
  background: var(--white);
  line-height: 1.65;
}

h1, h2, h3, h4, h5 {
  font-family: var(--font-head);
  color: var(--heading);
  line-height: 1.25;
}

a { color: var(--primary); text-decoration: none; }
a:hover { text-decoration: underline; }

img { max-width: 100%; display: block; }

ul { list-style: none; }

/* ===================================================
   LAYOUT
=================================================== */
.container {
  width: 90%;
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 20px;
}

/* ===================================================
   HEADER
=================================================== */
.site-header {
  background: var(--white);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 24px;
  height: 72px;
}

.header-logo-link { display: flex; align-items: center; flex-shrink: 0; }
.header-logo { height: 48px; width: auto; }

.main-nav {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.main-nav a {
  font-family: var(--font-head);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--heading);
  padding: 4px 2px;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}

.main-nav a:hover,
.main-nav a.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
  text-decoration: none;
}

.header-flags {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
}

.header-flags img {
  width: 26px;
  height: 19px;
  border-radius: 3px;
  opacity: 0.6;
  transition: opacity 0.15s, transform 0.15s;
  cursor: pointer;
}

.header-flags a:hover img,
.header-flags .flag-active img {
  opacity: 1;
  transform: scale(1.08);
}

/* ===================================================
   HERO
=================================================== */
.hero {
  background: var(--hero-bg);
  padding: 64px 24px;
  position: relative;
  overflow: hidden;
}

.hero-inner {
  max-width: var(--container);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-dna {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 140px;
  opacity: 0.07;
  pointer-events: none;
}
.hero-dna-left  { left: 0; }
.hero-dna-right { right: 0; transform: scaleX(-1); }

.hero-tag {
  display: inline-block;
  background: var(--accent);
  color: var(--white);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 4px;
  margin-bottom: 18px;
}

.hero-heading {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  margin-bottom: 16px;
  color: var(--heading);
}

.hero-heading .red { color: var(--primary); }

.hero-sub {
  font-size: 1rem;
  color: var(--text);
  margin-bottom: 28px;
  line-height: 1.7;
}

.hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }

/* ===================================================
   BUTTONS
=================================================== */
.btn,
.btn-primary {
  display: inline-block;
  background: var(--primary);
  color: var(--white);
  font-family: var(--font-head);
  font-weight: 600;
  font-size: 0.875rem;
  padding: 10px 22px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
  text-decoration: none;
}
.btn:hover,
.btn-primary:hover { background: #a51c0f; text-decoration: none; color: var(--white); }

.btn-outline {
  display: inline-block;
  background: transparent;
  color: var(--accent);
  font-family: var(--font-head);
  font-weight: 600;
  font-size: 0.875rem;
  padding: 10px 22px;
  border-radius: 6px;
  border: 1.5px solid var(--accent);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  text-decoration: none;
}
.btn-outline:hover { background: var(--accent); color: var(--white); text-decoration: none; }

/* ===================================================
   PROJECT PREVIEW CARD (hero right col)
=================================================== */
.project-preview-card {
  background: var(--white);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.preview-image {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.05em;
  color: var(--accent);
  background: linear-gradient(135deg, #2E7D6E15, #2E7D6E30);
}

.preview-body { padding: 18px; }
.preview-funder { font-size: 0.75rem; color: var(--accent); font-weight: 600; margin-bottom: 6px; }
.preview-title  { font-size: 0.95rem; font-weight: 700; color: var(--heading); margin-bottom: 8px; line-height: 1.4; }
.preview-status {
  display: inline-block;
  background: #e6f4f1;
  color: var(--accent);
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 3px;
  margin-bottom: 10px;
}
.preview-read-more { font-size: 0.8rem; color: var(--primary); font-weight: 600; }
.preview-read-more:hover { text-decoration: underline; }

/* ===================================================
   SECTION TITLES
=================================================== */
.section-block {
  max-width: var(--container);
  margin: 0 auto;
  padding: 56px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--heading);
  border-left: 3px solid var(--primary);
  padding-left: 14px;
  margin-bottom: 20px;
}

/* ===================================================
   FOCUS AREAS GRID
=================================================== */
.focus-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 8px;
}

.focus-card {
  background: #fafafa;
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  padding: 24px 16px;
  text-align: center;
  transition: border-color 0.15s;
}

.focus-card:hover { border-color: var(--accent); }

.focus-icon { font-size: 1.75rem; margin-bottom: 10px; }
.focus-label { font-family: var(--font-head); font-size: 0.875rem; font-weight: 600; color: var(--heading); }

/* ===================================================
   NEWS STRIP (homepage)
=================================================== */
.news-strip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.news-strip-header .section-title { margin-bottom: 0; }

.view-all { font-size: 0.85rem; color: var(--primary); font-weight: 600; }
.view-all:hover { text-decoration: underline; }

.news-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.news-card {
  background: var(--white);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.15s;
}

.news-card:hover { border-color: var(--primary); }

.news-card-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  background: #f0ede8;
}

.news-card-body { padding: 16px; flex: 1; }
.news-date { font-size: 0.75rem; color: #999; margin-bottom: 6px; }
.news-headline { font-family: var(--font-head); font-size: 0.9rem; font-weight: 600; color: var(--heading); line-height: 1.4; }

/* ===================================================
   PAGE HERO BANNER (projects / inner pages)
=================================================== */
.page-hero {
  background: var(--hero-bg);
  padding: 48px 24px;
  border-bottom: 1px solid var(--border);
}

.page-hero-inner {
  max-width: var(--container);
  margin: 0 auto;
}

.page-hero h1 {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  color: var(--heading);
  margin-bottom: 10px;
}

.page-hero p { color: var(--text); font-size: 1rem; }

/* ===================================================
   PROJECT CARDS (projects listing page)
=================================================== */
.projects-grid {
  max-width: var(--container);
  margin: 0 auto;
  padding: 48px 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.project-card {
  background: var(--white);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.15s;
}

.project-card:hover { border-color: var(--accent); }

.project-card-image {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
  width: 100%;
}

.project-card-image.teal-tint { background: linear-gradient(135deg, #2E7D6E15, #2E7D6E35); }
.project-card-image.red-tint  { background: linear-gradient(135deg, #C8231515, #C8231530); }

.project-card img.project-card-image {
  height: 180px;
  object-fit: cover;
}

.project-card-body { padding: 20px; flex: 1; display: flex; flex-direction: column; }
.project-funder { font-size: 0.75rem; color: var(--accent); font-weight: 600; margin-bottom: 8px; }
.project-card-title { font-size: 1.05rem; font-weight: 700; color: var(--heading); margin-bottom: 8px; line-height: 1.4; }
.project-card-status {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 3px;
  margin-bottom: 10px;
}
.status-active    { background: #e6f4f1; color: var(--accent); }
.status-completed { background: #fdecea; color: var(--primary); }

.project-card p { font-size: 0.875rem; color: var(--text); line-height: 1.6; margin-bottom: 16px; flex: 1; }

.project-read-more { font-size: 0.85rem; color: var(--primary); font-weight: 600; align-self: flex-start; }
.project-read-more:hover { text-decoration: underline; }

/* ===================================================
   CONTENT SECTIONS (about, news, detail pages)
=================================================== */
.content-wrap {
  max-width: var(--container);
  margin: 0 auto;
  padding: 40px 24px;
}

.prose p { margin-bottom: 1.2em; }
.prose h3 { font-size: 1.1rem; margin: 1.5em 0 0.5em; }
.prose ul { list-style: disc; padding-left: 1.5em; }
.prose ul li { margin-bottom: 0.5em; }

/* Section headings used in detail/inner pages */
section h2 {
  font-size: 1.5rem;
  border-left: 3px solid var(--primary);
  padding-left: 14px;
  margin-bottom: 16px;
  color: var(--heading);
}

/* ===================================================
   PARTNERS / NEWS (inner pages inherit .content-wrap)
=================================================== */
.partner-item {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}

.partner-item img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  padding: 4px;
}

.partner-item a {
  font-family: var(--font-head);
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent);
}

.news-article img {
  width: 100%;
  max-width: 900px;
  border-radius: var(--radius);
  margin: 18px 0;
}

.proj-img {
  width: 100%;
  max-width: 900px;
  margin: 12px 0;
  border-radius: var(--radius);
  display: block;
}

/* ===================================================
   FOOTER
=================================================== */
.site-footer { background: var(--footer-bg); }

.footer-inner {
  max-width: var(--container);
  margin: 0 auto;
  padding: 48px 24px 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.footer-logo { height: 44px; width: auto; margin-bottom: 12px; }
.footer-tagline { font-size: 0.85rem; color: var(--text); line-height: 1.5; }

.site-footer h4 {
  font-family: var(--font-head);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--heading);
  margin-bottom: 12px;
}

.site-footer ul { display: flex; flex-direction: column; gap: 8px; }
.site-footer ul a,
.site-footer p a { font-size: 0.875rem; color: var(--text); }
.site-footer ul a:hover,
.site-footer p a:hover { color: var(--primary); text-decoration: none; }
.site-footer p { font-size: 0.875rem; color: var(--text); line-height: 1.8; }

.footer-bar {
  background: var(--footer-bar);
  text-align: center;
  padding: 14px 24px;
}

.footer-bar p { font-size: 0.8rem; color: #888; }

/* ===================================================
   RESPONSIVE
=================================================== */
@media (max-width: 900px) {
  .hero-inner          { grid-template-columns: 1fr; }
  .hero-dna-left,
  .hero-dna-right      { display: none; }
  .focus-grid          { grid-template-columns: repeat(2, 1fr); }
  .news-strip          { grid-template-columns: 1fr 1fr; }
  .projects-grid       { grid-template-columns: 1fr; }
  .footer-inner        { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 600px) {
  .header-inner        { padding: 0 16px; }
  .main-nav            { display: none; }
  .focus-grid          { grid-template-columns: repeat(2, 1fr); }
  .news-strip          { grid-template-columns: 1fr; }
  .footer-inner        { grid-template-columns: 1fr; }
  .hero                { padding: 40px 16px; }
}
```

- [ ] **Step 2: Verify server builds without error**

```bash
cd C:/Users/admin/Geba.ge
npm run serve
```

Expected: Eleventy builds successfully, no template errors. Open http://localhost:8080 — pages will look unstyled until templates are updated in Tasks 5–8.

- [ ] **Step 3: Commit**

```bash
git add src/style.css
git commit -m "feat: rewrite style.css — biotech hybrid design tokens and components"
```

---

## Task 5: Redesign Georgian homepage (index.njk)

**Files:**
- Modify: `src/index.njk`

Convert from standalone HTML document to Eleventy base layout. Add hero, about, focus areas, latest news sections.

- [ ] **Step 1: Replace the entire file**

```nunjucks
---
layout: layouts/base.njk
permalink: /index.html
lang: ka
title: "საქართველოს ბიოტექნოლოგიის ასოციაცია | GEBA"
alt_url_en: /en.html
---

<!-- HERO -->
<section class="hero">
  <svg class="hero-dna hero-dna-left" viewBox="0 0 140 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20,0 Q120,62 20,125 Q-80,187 20,250 Q120,312 20,375 Q-80,437 20,500" stroke="#C82315" stroke-width="2.5" fill="none"/>
    <path d="M100,0 Q0,62 100,125 Q200,187 100,250 Q0,312 100,375 Q200,437 100,500" stroke="#2E7D6E" stroke-width="2.5" fill="none"/>
    <circle cx="60" cy="62"  r="5" fill="#C82315"/><circle cx="60" cy="187" r="5" fill="#2E7D6E"/>
    <circle cx="60" cy="312" r="5" fill="#C82315"/><circle cx="60" cy="437" r="5" fill="#2E7D6E"/>
    <line x1="20"  y1="62"  x2="100" y2="62"  stroke="#C82315" stroke-width="1" opacity="0.5"/>
    <line x1="20"  y1="187" x2="100" y2="187" stroke="#2E7D6E" stroke-width="1" opacity="0.5"/>
    <line x1="20"  y1="312" x2="100" y2="312" stroke="#C82315" stroke-width="1" opacity="0.5"/>
    <line x1="20"  y1="437" x2="100" y2="437" stroke="#2E7D6E" stroke-width="1" opacity="0.5"/>
  </svg>
  <svg class="hero-dna hero-dna-right" viewBox="0 0 140 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20,0 Q120,62 20,125 Q-80,187 20,250 Q120,312 20,375 Q-80,437 20,500" stroke="#C82315" stroke-width="2.5" fill="none"/>
    <path d="M100,0 Q0,62 100,125 Q200,187 100,250 Q0,312 100,375 Q200,437 100,500" stroke="#2E7D6E" stroke-width="2.5" fill="none"/>
    <circle cx="60" cy="62"  r="5" fill="#C82315"/><circle cx="60" cy="187" r="5" fill="#2E7D6E"/>
    <circle cx="60" cy="312" r="5" fill="#C82315"/><circle cx="60" cy="437" r="5" fill="#2E7D6E"/>
  </svg>

  <div class="hero-inner">
    <div>
      <span class="hero-tag">ბიოტექნოლოგია · საქართველო</span>
      <h1 class="hero-heading"><span class="red">ბიოტექნოლოგიის</span> განვითარება საქართველოში</h1>
      <p class="hero-sub">ვაერთიანებთ მკვლევრებს, სპეციალისტებსა და სტუდენტებს ჯანდაცვის, სოფლის მეურნეობისა და გარემოს სფეროებში ინოვაციების სტიმულირებისთვის.</p>
      <div class="hero-ctas">
        <a href="/pages/projects-ge.html" class="btn-primary">ჩვენი პროექტები</a>
        <a href="#about" class="btn-outline">ჩვენ შესახებ</a>
      </div>
    </div>

    <div>
      <div class="project-preview-card">
        <div class="preview-image">DINARA-WELWET</div>
        <div class="preview-body">
          <p class="preview-funder">EU Horizon · 2023–2026</p>
          <p class="preview-title">დიაგნოსტიკური ინსტრუმენტები შემოჭრილი წყლის სახეობებისთვის</p>
          <span class="preview-status">აქტიური</span>
          <br>
          <a class="preview-read-more" href="/pages/project-detail.html">ვრცლად →</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ABOUT -->
<div class="section-block" id="about">
  <h2 class="section-title">ჩვენ შესახებ</h2>
  <p>2019 წელს დაფუძნებული საქართველოს ბიოტექნოლოგიის ასოციაცია (GeBA) არის არამომგებიანი, არასამთავრობო ორგანიზაცია, რომელიც მიზნად ისახავს ბიოტექნოლოგიის, გამოყენებითი ბიომეცნიერებების, მწვანე ტექნოლოგიებისა და ინოვაციების განვითარებას საქართველოში. GeBA აერთიანებს დაახლოებით 200 წევრს, მათ შორის ახალგაზრდა მკვლევრებს, სპეციალისტებს და კომპანიებს, რომლებიც საქმიანობენ აგრარულ, საკვებ, გარემოს დაცვისა და სამედიცინო სფეროებში.</p>
</div>

<!-- FOCUS AREAS -->
<div class="section-block">
  <h2 class="section-title">საქმიანობის სფეროები</h2>
  <div class="focus-grid">
    <div class="focus-card"><div class="focus-icon">🌾</div><div class="focus-label">სოფლის მეურნეობა</div></div>
    <div class="focus-card"><div class="focus-icon">🌿</div><div class="focus-label">გარემო</div></div>
    <div class="focus-card"><div class="focus-icon">🏥</div><div class="focus-label">ჯანდაცვა</div></div>
    <div class="focus-card"><div class="focus-icon">📚</div><div class="focus-label">განათლება</div></div>
  </div>
</div>

<!-- LATEST NEWS -->
<div class="section-block">
  <div class="news-strip-header">
    <h2 class="section-title">სიახლეები</h2>
    <a href="/pages/news-ge.html" class="view-all">ყველა სიახლე →</a>
  </div>
  <div class="news-strip">
    {% for item in collections.news | reverse | limit(3) %}
    <article class="news-card">
      {% if item.data.cover %}
        <img src="{{ item.data.cover }}" alt="{{ item.data.title_ka | escape }}" class="news-card-img">
      {% else %}
        <div class="news-card-img"></div>
      {% endif %}
      <div class="news-card-body">
        {% if item.data.date %}<p class="news-date">{{ item.data.date | date("MMMM YYYY") }}</p>{% endif %}
        <p class="news-headline"><a href="{{ item.data.permalink_ka }}">{{ item.data.title_ka }}</a></p>
      </div>
    </article>
    {% endfor %}
  </div>
</div>
```

> **Note on `| limit(3)` filter:** Eleventy's default Nunjucks does not include a `limit` filter. Add it to `.eleventy.js` before this step:
> 
> ```js
> eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));
> ```

- [ ] **Step 2: Add `limit` filter to .eleventy.js**

Open `C:/Users/admin/Geba.ge/.eleventy.js` and add the filter before the `return` statement:

```js
eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));
```

The complete `.eleventy.js` should look like:

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/style.css": "style.css" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  eleventyConfig.addCollection("news", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/content/news/*.md")
      .sort((a,b)=> (a.data.date||0) - (b.data.date||0));
  });

  eleventyConfig.addCollection("projects", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/content/projects/*.md");
  });

  return {
    dir: { input: "src", output: "public", includes: "_includes" }
  };
};
```

- [ ] **Step 3: Check the server builds, no template errors**

```bash
npm run serve
```

Open http://localhost:8080 — the Georgian homepage should show the 2-col hero, DNA helix, about section, focus grid, and news strip.

- [ ] **Step 4: Commit**

```bash
git add src/index.njk .eleventy.js
git commit -m "feat: redesign Georgian homepage with hero, focus grid, news strip"
```

---

## Task 6: Redesign English homepage (en.njk)

**Files:**
- Modify: `src/en.njk`

- [ ] **Step 1: Replace the entire file**

```nunjucks
---
layout: layouts/base.njk
permalink: /en.html
lang: en
title: "Georgian Biotechnology Association | GEBA"
alt_url_ka: /index.html
---

<!-- HERO -->
<section class="hero">
  <svg class="hero-dna hero-dna-left" viewBox="0 0 140 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20,0 Q120,62 20,125 Q-80,187 20,250 Q120,312 20,375 Q-80,437 20,500" stroke="#C82315" stroke-width="2.5" fill="none"/>
    <path d="M100,0 Q0,62 100,125 Q200,187 100,250 Q0,312 100,375 Q200,437 100,500" stroke="#2E7D6E" stroke-width="2.5" fill="none"/>
    <circle cx="60" cy="62"  r="5" fill="#C82315"/><circle cx="60" cy="187" r="5" fill="#2E7D6E"/>
    <circle cx="60" cy="312" r="5" fill="#C82315"/><circle cx="60" cy="437" r="5" fill="#2E7D6E"/>
    <line x1="20"  y1="62"  x2="100" y2="62"  stroke="#C82315" stroke-width="1" opacity="0.5"/>
    <line x1="20"  y1="187" x2="100" y2="187" stroke="#2E7D6E" stroke-width="1" opacity="0.5"/>
    <line x1="20"  y1="312" x2="100" y2="312" stroke="#C82315" stroke-width="1" opacity="0.5"/>
    <line x1="20"  y1="437" x2="100" y2="437" stroke="#2E7D6E" stroke-width="1" opacity="0.5"/>
  </svg>
  <svg class="hero-dna hero-dna-right" viewBox="0 0 140 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20,0 Q120,62 20,125 Q-80,187 20,250 Q120,312 20,375 Q-80,437 20,500" stroke="#C82315" stroke-width="2.5" fill="none"/>
    <path d="M100,0 Q0,62 100,125 Q200,187 100,250 Q0,312 100,375 Q200,437 100,500" stroke="#2E7D6E" stroke-width="2.5" fill="none"/>
    <circle cx="60" cy="62"  r="5" fill="#C82315"/><circle cx="60" cy="187" r="5" fill="#2E7D6E"/>
    <circle cx="60" cy="312" r="5" fill="#C82315"/><circle cx="60" cy="437" r="5" fill="#2E7D6E"/>
  </svg>

  <div class="hero-inner">
    <div>
      <span class="hero-tag">Biotechnology · Georgia</span>
      <h1 class="hero-heading"><span class="red">Advancing Biotech</span> in Georgia</h1>
      <p class="hero-sub">Uniting researchers, professionals, and students to drive innovation in health, agriculture, and environmental science.</p>
      <div class="hero-ctas">
        <a href="/pages/projects.html" class="btn-primary">Our Projects</a>
        <a href="#about" class="btn-outline">Learn More</a>
      </div>
    </div>

    <div>
      <div class="project-preview-card">
        <div class="preview-image">DINARA-WELWET</div>
        <div class="preview-body">
          <p class="preview-funder">EU Horizon · 2023–2026</p>
          <p class="preview-title">Diagnostic tools for invasive aquatic species in Georgian waterways</p>
          <span class="preview-status">Active</span>
          <br>
          <a class="preview-read-more" href="/pages/project-detail.html">Read more →</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ABOUT -->
<div class="section-block" id="about">
  <h2 class="section-title">About GEBA</h2>
  <p>Established in 2019, the Georgian Biotechnology Association (GeBA) is a nonprofit, non-governmental organization dedicated to advancing biotechnology, applied biosciences, green solutions, and innovation in Georgia. GeBA unites around 200 members, including young researchers, professionals, and businesses working across agriculture, food, environment, and health.</p>
</div>

<!-- FOCUS AREAS -->
<div class="section-block">
  <h2 class="section-title">Focus Areas</h2>
  <div class="focus-grid">
    <div class="focus-card"><div class="focus-icon">🌾</div><div class="focus-label">Agriculture</div></div>
    <div class="focus-card"><div class="focus-icon">🌿</div><div class="focus-label">Environment</div></div>
    <div class="focus-card"><div class="focus-icon">🏥</div><div class="focus-label">Health</div></div>
    <div class="focus-card"><div class="focus-icon">📚</div><div class="focus-label">Education</div></div>
  </div>
</div>

<!-- LATEST NEWS -->
<div class="section-block">
  <div class="news-strip-header">
    <h2 class="section-title">Latest News</h2>
    <a href="/pages/news.html" class="view-all">View all →</a>
  </div>
  <div class="news-strip">
    {% for item in collections.news | reverse | limit(3) %}
    <article class="news-card">
      {% if item.data.cover %}
        <img src="{{ item.data.cover }}" alt="{{ item.data.title_en | escape }}" class="news-card-img">
      {% else %}
        <div class="news-card-img"></div>
      {% endif %}
      <div class="news-card-body">
        {% if item.data.date %}<p class="news-date">{{ item.data.date | date("MMMM YYYY") }}</p>{% endif %}
        <p class="news-headline"><a href="{{ item.data.permalink_en }}">{{ item.data.title_en }}</a></p>
      </div>
    </article>
    {% endfor %}
  </div>
</div>
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:8080/en.html — verify 2-col hero, DNA helix visible, news strip shows 3 items, flag switching works between `/index.html` and `/en.html`.

- [ ] **Step 3: Commit**

```bash
git add src/en.njk
git commit -m "feat: redesign English homepage with hero, focus grid, news strip"
```

---

## Task 7: Update projects page (English)

**Files:**
- Modify: `src/pages/projects.njk`

Replace `.projects-list` section with `.page-hero` banner + `.projects-grid` 2-col layout with tinted cards.

- [ ] **Step 1: Replace the entire file**

```nunjucks
---
layout: layouts/base.njk
title: "Projects | GEBA"
lang: en
nav_active: projects
alt_url_ka: "/pages/projects-ge.html"
permalink: "/pages/projects.html"
---
<div class="page-hero">
  <div class="page-hero-inner">
    <h1>Our Projects</h1>
    <p>Ongoing and completed initiatives supported by GeBA.</p>
  </div>
</div>

<div class="projects-grid">
  {% for item in collections.projects %}
  <div class="project-card">
    {% if item.data.cover %}
      <img src="{{ item.data.cover }}" alt="{{ item.data.title_en | escape }}" class="project-card-image">
    {% else %}
      <div class="project-card-image {% if loop.index is odd %}teal-tint{% else %}red-tint{% endif %}">
        {{ item.data.title_en }}
      </div>
    {% endif %}
    <div class="project-card-body">
      {% if item.data.funder %}<p class="project-funder">{{ item.data.funder }}</p>{% endif %}
      <h3 class="project-card-title">{{ item.data.title_en }}</h3>
      {% if item.data.status %}
        <span class="project-card-status {% if item.data.status == 'active' %}status-active{% else %}status-completed{% endif %}">
          {{ item.data.status | capitalize }}
        </span>
      {% endif %}
      <p>{{ item.data.summary_en }}</p>
      <a class="project-read-more" href="{{ item.data.permalink_en }}">Read more →</a>
    </div>
  </div>
  {% endfor %}
</div>
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:8080/pages/projects.html — warm hero banner visible, 2-col card grid, tinted image areas for cards without covers.

- [ ] **Step 3: Commit**

```bash
git add src/pages/projects.njk
git commit -m "feat: update projects page — hero banner, 2-col card grid"
```

---

## Task 8: Update projects page (Georgian)

**Files:**
- Modify: `src/pages/projects-ge.njk`

- [ ] **Step 1: Replace the entire file**

```nunjucks
---
layout: layouts/base.njk
title: "პროექტები | GEBA"
lang: ka
nav_active: projects
alt_url_en: "/pages/projects.html"
permalink: "/pages/projects-ge.html"
---
<div class="page-hero">
  <div class="page-hero-inner">
    <h1>ჩვენი პროექტები</h1>
    <p>იხილეთ მიმდინარე და დასრულებული პროექტები.</p>
  </div>
</div>

<div class="projects-grid">
  {% for item in collections.projects %}
  <div class="project-card">
    {% if item.data.cover %}
      <img src="{{ item.data.cover }}" alt="{{ item.data.title_ka | escape }}" class="project-card-image">
    {% else %}
      <div class="project-card-image {% if loop.index is odd %}teal-tint{% else %}red-tint{% endif %}">
        {{ item.data.title_ka }}
      </div>
    {% endif %}
    <div class="project-card-body">
      {% if item.data.funder %}<p class="project-funder">{{ item.data.funder }}</p>{% endif %}
      <h3 class="project-card-title">{{ item.data.title_ka }}</h3>
      {% if item.data.status %}
        <span class="project-card-status {% if item.data.status == 'active' %}status-active{% else %}status-completed{% endif %}">
          {{ item.data.status | capitalize }}
        </span>
      {% endif %}
      <p>{{ item.data.summary_ka }}</p>
      <a class="project-read-more" href="{{ item.data.permalink_ka }}">ვრცლად →</a>
    </div>
  </div>
  {% endfor %}
</div>
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:8080/pages/projects-ge.html — Georgian labels, same 2-col grid layout, flag switching works.

- [ ] **Step 3: Commit**

```bash
git add src/pages/projects-ge.njk
git commit -m "feat: update Georgian projects page — hero banner, 2-col card grid"
```

---

## Task 9: Smoke test all pages

- [ ] **Step 1: Run build and check all key pages**

```bash
npm run serve
```

Open each URL and check:

| URL                              | Check                                                        |
|----------------------------------|--------------------------------------------------------------|
| http://localhost:8080/           | Hero 2-col, DNA helix visible, focus grid, 3 news cards      |
| http://localhost:8080/en.html    | Same in English, flag → Georgian switches correctly          |
| http://localhost:8080/pages/projects.html    | Warm hero, 2-col card grid                    |
| http://localhost:8080/pages/projects-ge.html | Georgian labels, same grid                    |
| http://localhost:8080/pages/news.html        | News grid inherits new card styles             |
| http://localhost:8080/pages/partners/        | Partner items inherit new styles               |

- [ ] **Step 2: Check responsive at 600px**

In browser DevTools set viewport to 600px wide. Verify: nav collapses, hero stacks single-col, DNA helix hidden, focus grid is 2-col.

---

## Task 10: Create branch and push for PR

- [ ] **Step 1: Create and push branch**

```bash
git checkout -b redesign/biotech-hybrid
git push -u origin redesign/biotech-hybrid
```

- [ ] **Step 2: Open PR on GitHub**

Title: `Redesign: Biotech Hybrid — red/teal, Space Grotesk, 2-col hero, DNA helix`

Body should reference:
- Design spec: `docs/superpowers/plans/2026-04-18-geba-redesign.md`
- Pages changed: index.njk, en.njk, projects.njk, projects-ge.njk, style.css, header.njk, base.njk, new footer.njk
- **Do not merge** — Luka merges manually; GitHub Actions deploys on merge

---

## Known Limitations

- **Status/funder badges on project cards** depend on `status` and `funder` fields in content front matter. These fields don't exist yet (content is frozen). Cards will render without badges until content is updated in the next phase.
- **`dinara-welwet` preview card** in the hero is hardcoded in both homepages. If the project data changes, update `index.njk` and `en.njk` manually.
