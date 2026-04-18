# GeBA.ge — Project context for Claude Code

STATUS: Redesign implemented. Pending branch push and PR merge.

Repo: https://github.com/Luka9815/Geba.ge
Live: https://geba.ge
Stack: Eleventy v2, Nunjucks, single style.css, GitHub Pages + Actions

## Commands
```bash
npm run serve   # dev server at localhost:8080
npm run build   # production build to public/
```

## Brand colors
- Primary red:  #C82315  (headlines, buttons, active nav, links)
- Primary teal: #2E7D6E  (tags, labels, outline button, accents)
- Hero bg:      #f4f4f2 (neutral off-white, not cream)
- Footer bg:    #f5f5f3
- Footer bar:   #eeede9
- Body text:    #555555
- Headings:     #1a1a1a

## Typography
- Headings: Space Grotesk (Google Fonts)
- Body + Georgian: IBM Plex Sans (Google Fonts)
- Do NOT use Inter, Roboto, or system fonts

## Design direction: "Biotech hybrid"
- Red = primary action color
- Teal = secondary accent
- Cards: white bg, 0.5px #ebebeb border, 8px radius
- Hero: background-image hero-bg.jpg (cover/center) with rgba(244,244,242,0.82) overlay, full-width
  DNA helix SVGs and grain ::before removed — clean background image only
  ::after fades bottom edge transparent → #fef8f7
- Focus cards (hero right): 5 cards in 3+2 flex layout with bridge connector between rows
  Teal top border (odd cards), red top border (.focus-card--red, even cards)
  Cards: Agriculture, Environment(red), Health | Food(red), Education
  GE: სოფლის მეურნეობა, გარემო, ჯანდაცვა | სურსათი, განათლება
  Bridge: teal→red→teal gradient line with center dot (.focus-bridge / .focus-bridge-line / .focus-bridge-dot)
  Mobile (≤640px): single column, bridge hidden

## Homepage structure (implemented)
1. Nav: logo image only, nav links, GB/GE flag images inline (NOT position:fixed)
2. Hero: 2-col layout, full bleed edge-to-edge
   - Left: org name tag pill + headline ("Advancing Biotech" in red) + subtext + 2 CTAs
   - Right: 2×2 focus areas grid (Agriculture, Environment, Health, Education)
3. What We Do: full-bleed #fef8f7 warm cream bg section (.wwd-section / .wwd-section-inner)
   5 cards in flex-wrap layout: 3 on top row, 2 centered on bottom (justify-content: center)
   Each card: white bg, 3px teal top border, 1.5rem padding, emoji icon + bold title + desc
   EN heading: "What We Do" | GE heading: "ჩვენი საქმიანობა" (both use .section-title red border)
4. About GeBA: prose + red 3px left-border accent on section title
5. Latest news: 3-col card strip with "View all" link
6. Footer: 3-col light gray — logo+tagline | nav links | contact info
   Copyright bar in #eeede9

## Contact page (implemented)
- EN: /pages/contact.html | GE: /pages/contact-ge.html
- Teal hero banner (.contact-hero) with label, heading, subtitle
- Centered white card (.contact-card) with email row (mailto link), address row, social buttons
- Facebook (#1877F2) and LinkedIn (#0A66C2) as full-width branded buttons with inline SVG icons
- LinkedIn: https://www.linkedin.com/company/georgian-biotechnology-association-geba/
- Facebook: https://www.facebook.com/Geba2020
- Header nav "Contact" now links to standalone page (both languages)

## About page (implemented)
- EN: /pages/about.html | GE: /pages/about-ge.html
- Warm page-hero banner, About GeBA prose section, Key Activities section
- Key Activities: 5 items with emoji icon + h3 title + full paragraph each
  (`.about-activities` flex column, `.activity-item` flex row with icon + body)
- Nav "About" link now routes to standalone page (updated in header.njk)

## Projects page (implemented)
- Warm hero banner (#fef8f7)
- 2-col card grid (.projects-grid)
- Cards with `logo` field use white bg + object-fit:contain (.project-card-image--logo)
- Cards with `cover` field use object-fit:cover
- Cards with neither use teal-tint (odd) or red-tint (even) placeholder
- Each card: funder line in teal, status badge, red "Read more" link
  (status/funder require front matter fields — not yet in content files)

## File structure (key files changed in redesign)
```
src/
  style.css                          # full rewrite — all design tokens + components
  index.njk                          # Georgian homepage (uses base layout)
  en.njk                             # English homepage (uses base layout)
  _includes/
    layouts/base.njk                 # Space Grotesk + IBM Plex Sans, footer wired in
    partials/header.njk              # bilingual, flags in nav, logo only
    partials/footer.njk              # NEW — bilingual 3-col footer
  pages/
    projects.njk                     # updated — page-hero + projects-grid
    projects-ge.njk                  # same, Georgian
  content/projects/
    dinara-welwet.md                 # has both cover and logo fields
.eleventy.js                         # added limit() and date() filters
```

## Content data model (collections)
- `collections.news` — sorted by date asc; fields: title_en, title_ka, date, cover, permalink_en, permalink_ka
- `collections.projects` — fields: title_en, title_ka, cover, logo (optional), summary_en, summary_ka, permalink_en, permalink_ka, funder (optional), status (optional)

## CSS class conventions
- `.btn` / `.btn-primary` — red filled button
- `.btn-outline` — teal outline button
- `.section-title` — heading with red 3px left border
- `.section-block` — full-width content section with bottom border
- `.focus-grid` — 2-col grid (inside hero) or adjust columns as needed
- `.news-strip` / `.news-card` — 3-col news grid
- `.projects-grid` / `.project-card` — 2-col project listing
- `.project-card-image--logo` — white bg, object-fit:contain card image
- `.preview-image--logo` — same for hero preview card
- `.page-hero` / `.page-hero-inner` — inner page warm banner
- `.wwd-section` / `.wwd-section-inner` — full-bleed #f0f7f6 wrapper for What We Do
- `.what-we-do-grid` / `.wwd-card` / `.wwd-icon` / `.wwd-title` / `.wwd-desc` — homepage 5-card flex grid (3+2 layout)
- `.about-activities` / `.activity-item` / `.activity-icon` / `.activity-title` / `.activity-body` — about page activities list

## Eleventy config notes
- Input: `src/`, output: `public/`, includes: `src/_includes/`
- Passthrough: style.css, assets/, admin/, CNAME
- Custom filters: `limit(n)`, `date(fmt)` (fmt ignored — always outputs "dd MMM yyyy")
- Do NOT modify .eleventy.js without checking passthrough copies

## Workflow
- Always commit to a NEW branch, never directly to main
- Luka merges the PR manually on GitHub
- GitHub Actions deploys on merge (~30 seconds)
- Local preview: npm run serve at localhost:8080

## Do NOT change
- URL structure / page paths
- Admin panel / Decap CMS config (post-redesign)
- GitHub Actions workflow
