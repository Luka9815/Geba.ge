# GeBA.ge — Project context for Claude Code

STATUS: Design approved. Ready for implementation.

Repo: https://github.com/Luka9815/Geba.ge
Live: https://geba.ge
Stack: Eleventy v2, Nunjucks, single style.css, GitHub Pages + Actions

## Brand colors
- Primary red:  #C82315  (headlines, buttons, active nav, links)
- Primary teal: #2E7D6E  (tags, labels, outline button, accents)
- Hero bg:      #fef8f7
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
- Cards: white bg, 0.5px #ebebeb border, 8px radius, no box-shadow
- Hero: #fef8f7 bg with faint SVG DNA helix on left/right edges (opacity 0.07)
  and molecular node clusters in bottom corners

## Homepage structure (approved)
1. Nav: logo image only (no text beside it), nav links, flag images inline
   (GB/GE flags from flagcdn.com — NOT position:fixed)
2. Hero: 2-col layout
   - Left: tag pill + "Advancing Biotech in Georgia" headline
     ("Advancing Biotech" in red #C82315) + subtext + 2 CTAs
   - Right: DINARA-WELWET project preview card
3. About GeBA: prose + red 3px left-border accent on section title
4. Focus areas: 4-col grid (Agriculture, Environment, Health, Education)
5. Latest news: 3-col card strip with "View all" link
6. Footer: 3-col light gray — logo+tagline | nav links | contact info
   Copyright bar in #eeede9

## Projects page (approved)
- Warm hero banner matching homepage
- 2-col card grid
- DINARA-WELWET: Active, EU 2023-2026 (teal-tinted image area)
- CoLLLab: Completed, EU Erasmus+ 2022-2024 (red-tinted image area)
- Each card: funder line in teal, status badge, red "Read more" link

## CSS changes (full replacement of style.css)
Current uses teal (#0a9396) as primary. New:
- --primary: #C82315
- --accent:  #2E7D6E
- Header: dark teal → white with bottom border
- Footer: dark navy → light warm gray

## Bugs to fix during redesign
- .project-card .button in CSS but templates use .btn (mismatch)
- .lang-toggle is position:fixed — remove, move flags into nav

## Do NOT change
- URL structure / page paths
- Markdown content files (separate phase)
- Admin panel / Decap CMS config (post-redesign)
- .eleventy.js
- GitHub Actions workflow

## Implementation order
1. Rewrite style.css
2. Update base template (nav + footer)
3. Update index.html and en.html (hero)
4. Update projects template
5. Commit to new branch → Luka merges PR → auto-deploys

## Workflow
- GitHub MCP connector is active — read/write repo files directly
- Always commit to a NEW branch, never directly to main
- Luka merges the PR manually on GitHub
- GitHub Actions deploys on merge (~30 seconds)
- Local preview: npx @11ty/eleventy --serve at localhost:8080
