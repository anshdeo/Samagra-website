# Samagra Workplace Advisory Website — Build Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Note on format:** This plan was written in "plan only, no code" mode at the user's request. Tasks below define exact structure, classes, behavior, and verification steps, but withhold full code bodies. When execution starts, the executing skill should write the actual HTML/CSS/JS following this structure exactly — there is no ambiguity left to resolve, just typing.

**Goal:** Build a single-file (`index.html`), mobile-first, vanilla HTML/CSS/JS scrolling website for Samagra Workplace Advisory, covering all 8 sections defined in CLAUDE.md, with working accordion, bio popups, smooth-scroll nav, and a contact form.

**Architecture:** One `index.html` containing all markup, a single inline `<style>` block organized by design tokens → base/reset → layout primitives → per-section rules → component rules (accordion, popup, nav), and a single inline `<script>` block at the end of `<body>` handling accordion toggling, popup open/close, mobile nav toggle, and active-section nav highlighting. No build step, no bundler, no external JS/CSS files.

**Tech Stack:** Plain HTML5, CSS3 (custom properties, Grid, Flexbox, native `<dialog>`), vanilla JS (ES2017+, no transpilation). Google Fonts (Lora + Jost) loaded via `<link>`. Real photography sourced from Unsplash (direct CDN URLs, no API/library). Playwright (MCP browser tools) for verification only — not shipped.

## Global Constraints

(Copied verbatim from CLAUDE.md — apply to every task below.)

- Plain HTML, CSS, JS only. No frameworks, no libraries.
- Single file: `index.html`.
- Mobile-first. Every change must work on a 375px viewport.
- Bio popups must use vanilla JS, no libraries.
- Never use inline `style=""` attributes where a class works.
- Smooth scroll between sections.
- All sections have anchor IDs for nav.
- Verify with Playwright before marking any task done.
- Colors: `#2C3B2D` (dark primary), `#1A2B1B` (dark secondary), `#F8FAF8` (background), `#1A1A1A` (text), `#D6D6D6` (dividers/borders), `#E9E4D8` (warm accent — sparing use on at most one section, not a dominant tone).
- Fonts: Lora (serif, weights 400/500/700 + italic 400) for headlines/display, Jost (sans-serif, weights 300/400/500) for body/labels/UI — loaded via the exact Google Fonts link in CLAUDE.md. This matches the typography already established in the brand logo system file.

## Decisions Made During Planning (flagging for visibility, not asking again unless you object)

1. **Contact form submits to Formspree via AJAX mode.** `<form method="POST" action="https://formspree.io/f/REPLACE_THIS">` — the action is a placeholder until the real Formspree endpoint exists (sign up, create a form, swap the ID in). Fields get HTML5 client-side validation (`required`, `type="email"`, `pattern` for phone) before submission. JS intercepts `submit`, calls `event.preventDefault()`, runs `form.checkValidity()` (bail out if invalid — let native validation messages show), then `fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })`. On a response with `ok: true`, hide the form and show a `.form__success` message in its place, without leaving the page. On a non-ok response (or a thrown network error), show a `.form__error` message asking the user to retry or email directly, and leave the form's entered values intact so nothing is lost. This keeps the user on the page either way — no redirect to a Formspree-hosted page.
2. **Team bio popups use the native `<dialog>` element**, not a hand-rolled overlay `<div>`. It's plain HTML/JS (not a library), and gives focus handling, ESC-to-close, and top-layer stacking for free, which keeps the JS small and avoids reinventing modal accessibility.
3. **"What We Do" accordion is single-open** (opening one panel closes any other open panel) — the conventional behavior for the term "accordion." Implemented with `aria-expanded`/`aria-controls`, not `<details>`, so panel close/open can be animated and tied into the root-line signature.
4. **Real photography from Unsplash for scenery/backgrounds, not placeholder boxes.** The hero background, "Why Samagra" image slot, and "One Tree Five Roots" imagery use real banyan-tree/workplace photos pulled from Unsplash via direct CDN URLs (`images.unsplash.com/...`) — no API key, no library, just `<img>`/CSS `background-image`. The root-line signature motif (separate from the hero photo) stays inline SVG using the exact path data from the logo system file. **Superseded for team photos** — see Decision 9: the team is real named people, so generic initials-avatars are used instead of stock photos standing in for real individuals.
5. **No git repository exists** in this folder. The "frequent commits" guidance from the planning skill is replaced with "frequent saves + Playwright verification per task" — there's nothing to commit to. If you want version history, say so and I'll `git init` first (will ask before doing it, since repo init is a one-way setup decision).
6. **Nav active-section highlighting** uses `IntersectionObserver` (native browser API, not a library) to add an `is-active` class to the current section's nav link as the user scrolls.
7. **Typography is Lora + Jost, not Almarai.** Changed after seeing a reference design and getting direct feedback that Almarai read as generic. Lora (serif) + Jost (sans) is what the brand's own logo system file already uses for the wordmark and labels — reusing it keeps the site consistent with the existing brand asset rather than introducing a third typeface choice.
8. **Warm Stone (`#E9E4D8`) is a sparing accent, not a section-wide beige wash.** Used on at most one alternating section background for warmth; the rest of the page stays on the sage/forest palette. This was an explicit user call after reviewing a beige-heavy reference — they like green, are "tired of" heavy beige, but don't mind a light warm touch paired with the greens.
9. **All copy comes from `Samagra_Workplace_Advisory_Company_Profile.docx`, not invented placeholder text.** This is real client content — About/identity copy, the 5 real services, the 5 real named consultants with real bios, and the real office address. See CLAUDE.md's "Content source" section for the exact mapping. Team photos are generic initials-on-circle avatars (`.avatar` — a `<div>` with the person's initials, colored per design tokens, no image file at all) rather than stock photos, because attaching a random Unsplash portrait to a real named professional (e.g. "Chandra Deo") would misrepresent them — confirmed directly with the user.
10. **"How We Work" is the doc's real 3-tier framework, not the original 4-step placeholder.** CLAUDE.md originally specified 4 generic steps (Assess/Design/Implement/Sustain); the company profile describes something different — a ground-up, "brick by brick" progression: (1) **Foundation** — compliance, labour relations, business discipline; (2) **Build** — HR & people practices, capability, succession, wellbeing; (3) **Culture** — organisational systems serving vision/mission/purpose. The user explicitly chose to replace the placeholder with this real framework rather than keep the generic one. 3 tiers, not 4 — Task 6 and the Section 5 breakdown below reflect this.
11. **Motion: scroll-reveal + hover micro-interactions, added per explicit user request.** Sections below the fold (everything except the hero, which must render instantly) fade/rise/settle into view as the user scrolls them into the viewport. **Revised twice after feedback:** first from a plain opacity fade to a fade+rise+scale with eased timing (too generic/templated); then from a JS `IntersectionObserver`-triggered fixed-duration transition to a pure CSS scroll-driven animation (`animation-timeline: view()`) — the user wanted the effect to progress *as* you scroll, not fire once and play out on a timer regardless of further scrolling, and to reverse for free when scrolling back (the scroll-driven approach gets this automatically, no JS needed at all for `.reveal`). Interactive elements (nav links, buttons, cards) get subtle hover feedback (lift, underline-grow, color shift) — photos deliberately do **not** get a hover-zoom (see the Motion section below for why). Everything respects `prefers-reduced-motion: reduce`. See the "Motion & Micro-interactions" section below for the exact implementation.

---

## Design Tokens (CSS custom properties, defined in `:root`)

| Token | Value | Use |
|---|---|---|
| `--forest` | `#2C3B2D` | Primary dark — nav bg, CTA bg, headings on light bg |
| `--forest-deep` | `#1A2B1B` | Secondary dark — footer bg, hover states, root-line stroke |
| `--sage` | `#F8FAF8` | Page background (dominant), text-on-dark color |
| `--stone` | `#E9E4D8` | Warm accent — sparing use, at most one section background, never the dominant tone |
| `--ink` | `#1A1A1A` | Body text |
| `--mist` | `#D6D6D6` | Borders, dividers, disabled states |
| `--font-display` | `'Lora', serif` | Headlines, H1/H2, logo wordmark, pull-quote-style subtext |
| `--font-body` | `'Jost', sans-serif` | Body copy, nav, buttons, labels, captions |
| `--weight-display` | `700` | Lora bold — hero headline, section H2s, wordmark |
| `--weight-display-regular` | `400` | Lora regular — supporting subheads, descriptor text |
| `--weight-label` | `500` | Jost medium — nav links, buttons, step numbers, card names |
| `--weight-body` | `400` | Jost regular — paragraphs |
| `--weight-caption` | `300` | Jost light — eyebrow labels, footer fine print, form helper text |
| `--space-1`…`--space-6` | `4px, 8px, 16px, 24px, 40px, 64px` | Spacing scale, all margin/padding/gap values pull from this list only |
| `--radius` | `4px` | Card/button/dialog corner radius (small, not pill-shaped — keeps the grounded, architectural feel rather than soft-app feel) |
| `--bp-tablet` | `640px` | First mobile-first breakpoint |
| `--bp-desktop` | `1024px` | Second breakpoint |
| `--max-width` | `1200px` | Content container cap |
| `--transition-fast` | `150ms` | Hover color/background shifts |
| `--transition-base` | `250ms` | Hover lift/underline on cards, nav links, buttons |
| `--ease` | `ease` | Shared easing for all transitions (kept simple, no custom cubic-bezier needed) |

Breakpoints are `min-width` media queries only (mobile-first): base styles target 375px, then `@media (min-width: 640px)`, then `@media (min-width: 1024px)`.

Google Fonts link (replaces the Almarai link in CLAUDE.md's original Typography section):
```html
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,700;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
```

---

## File Structure

```
Samagra Website/
└── index.html          # Everything: <head> (meta, font link, <style>), <body> (8 sections + nav + footer), <script>
```

No `/css`, `/js`, or `/assets` directories. Everything — including the SVG banyan/root-line art — is inlined directly in `index.html` as `<svg>` markup, per the single-file constraint. A favicon is intentionally skipped (out of scope; CLAUDE.md doesn't mention one) rather than adding a second file.

---

## CSS Architecture

**Naming convention:** BEM-lite, scoped per block, single-class selectors only (no type+class combos like `section.hero`, no ID selectors for styling — IDs are reserved for anchor targets and JS hooks only). Pattern: `.block`, `.block__element`, `.block--modifier`. Example: `.accordion`, `.accordion__item`, `.accordion__item--open`, `.accordion__trigger`, `.accordion__panel`.

**Specificity discipline:** every rule is exactly one class deep. No nested descendant selectors beyond one level (`.card__title` not `.card .title`) so that later sections never accidentally override earlier ones through specificity collisions. State changes (open/active/expanded) are modifier classes toggled by JS, never `style=""`.

**Structure of the `<style>` block, top to bottom:**
1. `:root` — design tokens (table above)
2. Reset — `box-sizing`, margin/padding zero, `scroll-behavior: smooth`, `html { scroll-padding-top: <nav height> }` so anchor jumps don't hide under the sticky nav
3. Base typography — body font, base sizes using `clamp()` for fluid scaling between 375px and 1024px
4. Layout primitives — `.container` (max-width + auto margins + horizontal padding), `.section` (consistent vertical padding via spacing scale), `.visually-hidden` (for skip-link / a11y labels)
5. Nav component
6. Per-section blocks, in document order (hero → footer)
7. Shared components used across sections: `.btn`, `.dialog`, `.accordion`, root-line SVG styling
8. `@media (prefers-reduced-motion: reduce)` block at the very end, disabling the root-line draw animation and any transitions

**Root-line signature implementation:** one continuous inline `<svg>` (or several stitched per-section `<svg>` fragments with matching stroke color/width so they read as one line) positioned absolutely/behind content, `stroke: var(--forest-deep)`, low opacity (~0.15–0.25) so it reads as texture, not a UI element. At "One Tree, Five Roots" the path forks into 5 strokes; each fork terminates near one of the 5 accordion items in "What We Do" (visually, not necessarily 1:1 DOM-connected). On mobile, the line simplifies to a single straight vertical stroke (no room for 5 visible forks at 375px) — full forking detail is a tablet/desktop enhancement. This is called out explicitly so the implementer doesn't try to force 5 visible forks into a 375px column.

---

## Motion & Micro-interactions

(Decision 11 — added per explicit user request after reviewing Task 2.)

**Scroll-reveal pattern — CSS scroll-driven animation, not a JS trigger:**
- CSS: a base `.reveal { opacity: 1; }` (so unsupported browsers just show content normally — see fallback note below), then inside `@supports (animation-timeline: view())`: `.reveal { animation: reveal-in linear both; animation-timeline: view(); animation-range: entry; }` with `@keyframes reveal-in { from { opacity: 0; transform: translateY(22px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }`. Timing function is `linear` deliberately — once an animation's progress is driven by scroll position rather than time, an eased timing-function fights the natural feel of scroll speed, so the convention for scroll-driven animations is linear.
- **No JS at all for `.reveal`.** `animation-range: entry` ties the animation's progress directly to the element's scroll position as it enters the viewport — it plays out *as* the user scrolls (not "trigger once, then animate on a fixed timer regardless of further scrolling"), and reverses for free when scrolling back up, since the browser is just sampling the timeline's current position continuously. This replaced an earlier `IntersectionObserver`-based version after two rounds of feedback: first that a one-shot trigger didn't feel scroll-linked, second that even the toggle-based fix still played on a fixed-duration timer disconnected from scroll position.
- **Fallback:** browsers without `animation-timeline: view()` support never enter the `@supports` block, so `.reveal` elements stay at `opacity: 1` — content is just immediately visible, never stuck hidden.
- Apply `.reveal` to: section headings, body copy blocks, photos/`.media`, team cards, accordion items, "How We Work" tier blocks, the contact form. Grouped siblings (team cards, accordion items, tier blocks) get natural stagger for free — each element's own scroll position drives its own animation, no explicit per-child delay needed.
- **Hero is explicitly excluded** from `.reveal` — it's above the fold and must render fully visible on first paint, no fade-in delay on the first thing a visitor sees.

**Hover micro-interactions (per component):**
- Buttons (`.btn--primary`): already has the `--stone` background hover (Decision 8's use-case); add `transform: translateY(-1px)` on hover, `transition: background-color var(--transition-fast) var(--ease), transform var(--transition-base) var(--ease)`.
- Nav links (`.nav__link`): an underline that grows from 0 to full width on hover — a `::after` pseudo-element, `transform: scaleX(0)` → `scaleX(1)` via `transform-origin: left`, `transition: transform var(--transition-base) var(--ease)`. (One pseudo-element rule, still one-class-deep per the specificity discipline above — `.nav__link::after` is the same selector depth as `.nav__link`.)
- Cards (`.team-card`, `.accordion__trigger`, `.step`): `transform: translateY(-4px)` + a soft `box-shadow` increase on hover, `transition: transform var(--transition-base) var(--ease), box-shadow var(--transition-base) var(--ease)`.
- **Photos (`.media-frame`) deliberately get no hover-zoom.** Originally planned as a `scale(1.05)` on the inner `<img>` on container `:hover`, but that competes with the scroll-driven `.reveal` transform when both are active on overlapping elements, and applying it to only some photos and not others (the Identity section's photo was flattened for a different reason — see Decision 4/identity styling) read as inconsistent. Static frame everywhere instead.
- Accordion chevron icon: `transform: rotate(180deg)` when `.accordion__item--open`, transition on `transform`.

**Reduced motion:** the existing `@media (prefers-reduced-motion: reduce)` block (end of the `<style>` block) gets: (1) `.reveal { animation: none !important; opacity: 1 !important; transform: none !important; }` so content is simply present, no animation; (2) every hover `transform` rule above is neutralized (`transform: none !important` under the reduced-motion query for `.btn--primary:hover`, `.team-card:hover`, etc.) while the color-based feedback (background-color, box-shadow) stays, since static color feedback isn't the kind of motion this media query is meant to suppress.

---

## Section-by-Section Breakdown

### Nav (persistent, not in CLAUDE.md's numbered list but required by "all sections have anchor IDs for nav")
- Fixed/sticky top bar, `background: var(--forest)`, text `var(--sage)`.
- Desktop (≥1024px): horizontal list of 8 links (`Home, Why Samagra, Our Identity, What We Do, How We Work, Team, Contact` — Footer excluded from nav, it's not a navigable destination).
- Mobile (<1024px): logo/wordmark + hamburger button (`<button class="nav__toggle" aria-expanded="false" aria-controls="nav-menu">`). Toggling adds `.nav__menu--open` which slides/reveals a full-width stacked menu. Vanilla JS toggles the class and the `aria-expanded` attribute.
- Active link gets `.nav__link--active` via `IntersectionObserver` watching all 8 `<section>` elements.

### 1. Hero (`#hero`)
- Full-viewport-height section. Background is a real banyan tree photo from Unsplash (`background-image` on `.hero`, with a `.hero::before`-style dark overlay — actually implemented as a semi-transparent `var(--forest-deep)` gradient layer in markup or via `background-image` layering — to keep white text legible over the photo), not an SVG silhouette.
- Content: eyebrow label ("WORKPLACE ADVISORY" — Jost weight 500, small caps via CSS `text-transform`), `<h1>` headline (Lora weight 700, fluid clamp sizing), subtext `<p>` (Jost weight 400), one CTA `<a class="btn btn--primary" href="#contact">`.
- Mobile: text and CTA stack centered, background photo uses `background-size: cover` + `background-position: center` so it crops sensibly rather than distorting at 375px.

### 2. Why Samagra (`#why-samagra`)
- Two-column on desktop (text | photo), single column stacked on mobile (text first, then photo).
- Photo: real Unsplash image (`<img class="media" src="..." alt="...">` — the warm consulting-meeting photo picked in Task 2/3 research), not a placeholder box.
- Copy (`<h2>Why Samagra</h2>` + paragraphs, condensed from `Samagra_Workplace_Advisory_Company_Profile.docx`'s "About Samagra Workplace Advisory" section):
  - Para 1: "Samagra Workplace Advisory is a Mumbai-based consulting practice built on a single conviction: workplace compliance and workplace wellbeing are two halves of the same responsibility. The name draws from the Sanskrit *samagra* — whole, or complete — reflecting a deliberate choice to bring legal compliance, HR strategy, and psychosocial care under one advisory roof, rather than leaving organisations to coordinate these functions separately."
  - Para 2: "Most Indian organisations treat labour law adherence, HR governance, capability development, and wellbeing as four unconnected responsibilities, each outsourced to specialists who never talk to each other. A labour law advisory that ignores HR realities produces policies that are legally sound but operationally unworkable. Samagra was built to bridge that gap — five consultants, integrated by design, not by coincidence."
- Below the prose, a `<ul class="why-list reveal">` (staggered reveal, see Motion section) titled "Why Organisations Choose Samagra" with these 6 items (from the doc's "Why Organisations Choose Samagra Workplace Advisory" bullets — use the doc's bullet heading, not the earlier draft heading the doc itself flags for removal):
  1. **Integrated Expertise, Single Point of Accountability** — five complementary disciplines working as one team, eliminating coordination gaps.
  2. **Deep Regulatory and Compliance Expertise** — over five decades of combined experience within the Government of India's Central Labour Service.
  3. **End-to-End Legal Support** — from policy design and advisory to dispute resolution and litigation support.
  4. **Practical HR and Leadership Capability** — decades working with senior leaders, plant managers, supervisors, and unions.
  5. **Well-being Embedded in Workplace Solutions** — clinical and psychosocial expertise integrated into every intervention.
  6. **Built for Organisational Growth** — addresses foundational compliance, strengthens capability, supports long-term effectiveness.

### 3. One Tree Five Roots (`#identity`)
- Background `var(--forest-deep)` (dark, matching the moody tree-canopy feel from the reference) with a real Unsplash banyan-root close-up photo alongside the text (two-column on desktop, stacked on mobile) — same `.media` pattern as section 2.
- `<h2>One Tree, Five Roots</h2>` + narrative copy, taken near-verbatim from the doc's "Our Identity: One Tree, Five Roots" section (this is the authoritative version, not a paraphrase):
  - Para 1: "The Samagra emblem is a banyan tree — chosen deliberately. The banyan is unique among trees for its aerial roots: multiple independent root systems descending from a single canopy, each capable of drawing nourishment on its own, yet all sustaining one organism. The five aerial roots in the Samagra logo represent the firm's five consultants — each an independent expert in their own domain, each capable of standing alone, yet all anchored to one shared canopy of purpose: making Indian workplaces safer, fairer, humane and competent."
  - Para 2: "This is not merely a design metaphor — it describes how the firm actually works. A client engagement rarely stays inside one discipline: a POSH complaint surfaces a labour law question; a labour law dispute reveals an HR process failure; an HR restructuring uncovers the need for careful change management and employee wellbeing support. Samagra's five-consultant structure exists so that when an engagement crosses a disciplinary boundary — as it almost always does — the right expert is already in the room, not a phone call away."
- Then the SVG fork art (see CSS Architecture above) layered over/near the photo, not replacing it.

### 4. What We Do (`#what-we-do`)
- 5 accordion items, each: `<button class="accordion__trigger" aria-expanded="false" aria-controls="panel-N" id="trigger-N">Item title</button>` + `<div class="accordion__panel" id="panel-N" role="region" aria-labelledby="trigger-N" hidden>...</div>`.
- The 5 real services, from the doc's "Our Services" section (title → panel body text, used exactly):
  1. **Labour Law Advisory** — "Statutory compliance under the new Labour Codes, industrial relations counsel, service-matter representation before CAT and High Court, and disciplinary proceedings support."
  2. **POSH Compliance** — "ICC constitution and training, External Member services, fair and legally defensible inquiry conduct, and annual compliance reporting support."
  3. **HR & Organisation Development** — "Leadership development, culture and change management, talent and succession planning, and employee engagement strategy."
  4. **Training & Capability Building** — "ICC and manager training, union–management workshops, performance management and appraisal feedback workshops, supervisory development, and leadership development for sustained business operations."
  5. **Employee Wellbeing** — "Counselling support embedded into POSH and HR processes for complainants, respondents, and affected employees, alongside broader work-life balance and coping-skills initiatives."
- JS: click handler on triggers. On open: close any other open `.accordion__panel` (remove `hidden`, set `aria-expanded="true"` on its trigger), then open the clicked one. Animate height via CSS `max-height` transition driven by a class toggle (not inline `style.height`, to respect the "no inline styles" rule) — implementer should use a `--panel-height` custom property set via JS `element.style.setProperty()` only if a class-based max-height cap proves too restrictive; default approach is a generous fixed `max-height` in the open class. Chevron icon rotates 180° on open (see Motion section).
- Mobile: full-width single column, generous tap targets (min 44px height on triggers).

### 5. How We Work (`#how-we-work`)
- **3 tiers, not 4 steps** (Decision 10 — supersedes CLAUDE.md's original Assess/Design/Implement/Sustain placeholder). From the doc's "How Our Expertise Is Sequenced — And Why" section:
  1. **01 — Foundation:** "Robust compliance, labour relations, and business discipline — the conditions every other layer depends on. Most workplace issues trace back to gaps here: unclear policies, inconsistent conduct, under-trained supervisors."
  2. **02 — Build:** "Once the fundamentals hold, the focus shifts to HR and people practices — capability building, succession planning, first-time-manager development, and employee wellbeing."
  3. **03 — Culture:** "Organisational systems that serve the company's vision, mission, and purpose. When the foundation and the people practices are solid, culture compounds — and strategy is far more likely to succeed."
- Numbered markers (01–03) are justified — this genuinely is a real, doc-described sequence, not decoration.
- Desktop: horizontal 3-column row connected by a continuation of the root-line. Mobile: vertical stack, numbers on the left, content to the right.
- Each tier: `<div class="step">` with `.step__number`, `.step__title`, `.step__desc`. Hover lift per Motion section.

### 6. Meet the Team (`#team`)
- 5 cards in a responsive grid: 1 column at 375px, 2 columns at ≥640px, grid that can comfortably hold 5 (e.g., 2/2/1 or 3/2) at ≥1024px — exact column count decided at build time based on how 5 divides cleanly; flagged here so the implementer doesn't agonize over it.
- Each card: `<button class="team-card" data-dialog="dialog-N">` wrapping a `.avatar` (a `<div>` showing the person's initials in `--font-display`, background `var(--forest)`, text `var(--sage)` — generic placeholder, NOT a stock photo, since these are real named people — see Decision 9), name, role. Clicking opens the matching `<dialog>`. Hover lift per Motion section.
- The 5 real consultants (name / role / `.avatar` initials / dialog summary — full "Areas of Expertise" lists go in the dialog body), from the doc's "The Team at a Glance" + "Consultant Profiles" sections:
  1. **Chandra Deo** — Head Consultant — initials "CD" — *Advocate | Head Consultant — Labour Law & Compliance Advisory.* 31 years across government regulatory service, corporate HR, and independent compliance consulting; 26 years as a Central Labour Service Officer, Ministry of Labour and Employment, retiring as Welfare & Cess Commissioner. Areas of Expertise: POSH Compliance & ICC Constitution, Government Regulatory Liaison, ICC Chairing & External Member Services, Workplace Wellbeing Strategy, Workplace Investigations, Policy Drafting, Labour Law Advisory, Senior Stakeholder Engagement.
  2. **Sonali Sarma** — Leadership Development & POSH Consultant — initials "SS" — 37 years in HR, Learning, and Organisation Development across manufacturing, public sector, and MNCs; expert in leadership capability, culture transformation, and team dynamics. Areas of Expertise: Leadership Development & Coaching, Change Management & Culture Transformation, Talent Management & Succession Planning, Industrial Relations & Employee Relations, POSH Awareness & IC Training, Employee Engagement & HR Strategy, Conflict & Team Management, Competency-Based Leadership & Managerial Capacity Building.
  3. **Adv. Avdhesh Kumar Dubey** — Advocate, Supreme Court — initials "AD" — practising advocate before the Supreme Court of India and night courts, 15+ years in corporate and family law; provides the firm's litigation-escalation layer for contested POSH and labour matters. Areas of Expertise: Supreme Court Litigation, Night Court Practice, Corporate Law Advisory & Disputes, Client Representation in Contested Proceedings, Family Law Matters, Legal Risk Assessment, Escalated POSH & Workplace Litigation, Cross-Referral Coordination.
  4. **Pravin Parmar** — Labour Law Consultant — initials "PP" — retired Labour Welfare Commissioner, Government of India; 26 years across Assistant Labour Commissioner, Welfare Commissioner, and Labour Welfare Commissioner roles; anchors the firm's statutory and procedural foundation. Areas of Expertise: Labour Law Implementation & Compliance, Labour Welfare Administration, Industrial Relations & Industrial Peace, PSU Labour Law Training, Service Matters (CAT & High Court), Union–Management Relations Training, Disciplinary Proceedings & Domestic Enquiries, Complex Industrial Dispute Resolution.
  5. **Dr. Priyadarshini Deo** — Mental Health & Psychosocial Care Consultant — initials "PD" — MA in Medical & Psychiatric Social Work (TISS), PhD in Psychology (SNDT); Senior Counsellor, Centre for Cancer & Palliative Care, Kokilaben Hospital, since 2009; closes the build by addressing what compliance and legal process alone cannot. Areas of Expertise: Counselling Across Age Groups & Major Mental Illnesses, Psychiatric Social Work, Grief & Bereavement Counselling, PhD Guide, Palliative & End-of-Life Care Counselling, Fieldwork Supervision, Caregiver Support Counselling, International Professional Exchange.
- 5 corresponding `<dialog class="bio-dialog" id="dialog-N">` elements, each with the full bio + Areas of Expertise list above and a `<button class="bio-dialog__close">Close</button>` plus native ESC/backdrop-click dismissal (`<dialog>` gives backdrop click dismissal only if JS listens for clicks on the dialog's own padding area — implementer must add a click-outside-content handler since native `<dialog>` doesn't auto-close on backdrop click).

### 7. Contact (`#contact`)
- `<form method="POST" action="https://formspree.io/f/REPLACE_THIS" id="contact-form">` (placeholder endpoint, see Decision 1).
- Form fields: name (`name="name"`, text, required), email (`name="email"`, `type="email"`, required), phone (`name="phone"`, `type="tel"`, pattern for basic format, optional), message (`name="message"`, `<textarea>`, required).
- A `.form__success` message element and a `.form__error` message element, both adjacent to the form, both hidden by default (`hidden` attribute), toggled by JS.
- Submit button `.btn--primary`, `type="submit"`. JS (see Decision 1): `preventDefault()` → `checkValidity()` → `fetch` with `Accept: application/json` → on success hide the form and reveal `.form__success`; on failure reveal `.form__error` and keep the form/values as-is.
- Mobile: fields stack full-width, generous spacing, large tap targets.

### 8. Footer (`#footer` — not a nav-linked destination but still gets an ID for consistency)
- `background: var(--forest-deep)`, text `var(--sage)`.
- Real address (from the doc): "201, Sun Plaza, Lokmanya Tilak Road, Opp. Diamond Talkies, Mhatre Wadi, Borivali (West), Mumbai – 400092".
- Email link (`mailto:`) — placeholder `hello@samagraworkplaceadvisory.com` per Decision 9/the footer-email choice, clearly a guess pending the real address.
- Tagline line (from the doc): "Labour Law Advisory · POSH Compliance · HR & Organisation Development · Training · Employee Wellbeing".
- Small print/copyright line at weight 300.

---

## Mobile Approach

- All base CSS rules target 375px first; every section verified at exactly 375px width before any wider breakpoint is added.
- Fluid type via `clamp(min, preferred-vw, max)` for headline-scale text only; body text stays at a fixed comfortable size (no fluid scaling needed for paragraphs).
- Touch targets (nav toggle, accordion triggers, dialog close buttons, form submit) all ≥44px tall.
- Nav collapses to hamburger below 1024px; root-line simplifies to a single vertical stroke below 640px (no forking detail at narrow widths).
- No horizontal scroll permitted at any breakpoint — every section's content respects `.container`'s padding and `max-width`.
- Motion stays the same across breakpoints (no perf reason to disable it on mobile) — only `prefers-reduced-motion` turns it off, not viewport width.

---

## Build Order (Tasks)

Each task is a vertical slice: it produces a visibly testable increment, gets verified live in a browser via Playwright before moving on, per superpowers:verification-before-completion (no task is marked done on "should work" — fresh Playwright evidence required each time).

### Task 1: Scaffold + design tokens + nav skeleton — ✅ done, retrofit pending
**Produces:** `index.html` with `<head>` (meta viewport, title, Lora+Jost Google Fonts link), `:root` token block, reset, `.container`/`.section` primitives, and the nav bar with all 8 anchor links (sections themselves are empty `<section id="...">` placeholders at this point).
**Verify:** Open in Playwright at 375px and 1280px. Confirm: fonts load (Lora + Jost visible, not fallback), no console errors, clicking each nav link scrolls to the correct empty section, mobile hamburger opens/closes the menu.
**Retrofit (Decision 11, added after this task was already built):** add the `.nav__link::after` underline-grow hover effect. Re-verify hover state via Playwright (`:hover` pseudo-class can be simulated via `element.dispatchEvent` or `page.hover()`).

### Task 2: Hero section — ✅ done, retrofit pending
**Produces:** Full hero markup with a real Unsplash banyan tree photo background + dark overlay for legibility + headline/subtext/CTA, styled per tokens.
**Verify:** Screenshot at 375px and 1280px — photo loads (not broken-image icon), text legible over it, no overflow, CTA click scrolls to `#contact`.
**Retrofit (Decision 11):** add the `.btn--primary` hover lift (`translateY(-1px)`) on top of the existing background-color hover. Hero itself stays excluded from `.reveal` (renders instantly, no fade-in).

### Task 3: Why Samagra section
**Produces:** Two-column/stacked layout with real About copy (2 paragraphs) + the "Why Organisations Choose Samagra" 6-item list + real Unsplash photo (the warm consulting-meeting shot), per the Section 2 breakdown above. Heading, paragraphs, list, and photo all get `.reveal` (list items stagger via `nth-child` delay).
**Verify:** Screenshot both breakpoints — photo loads correctly, column order correct on mobile (text before photo), no overlap, scroll-reveal fires once each element enters viewport (confirm via Playwright: scroll element into view, confirm `.is-visible` class is added), photo scales slightly on hover (desktop).

### Task 4: One Tree Five Roots section + root-line fork art
**Produces:** Real "One Tree, Five Roots" narrative copy (2 paragraphs, per Section 3 breakdown) + real Unsplash banyan-root photo + SVG fork art layered near it. `.reveal` on heading/copy/photo.
**Verify:** Screenshot both breakpoints — photo loads, fork art visible at desktop width, simplified single line at 375px, no layout shift/jank, scroll-reveal fires correctly.

### Task 5: What We Do accordion
**Produces:** 5 accordion items using the real service names/descriptions from the Section 4 breakdown (Labour Law Advisory, POSH Compliance, HR & Organisation Development, Training & Capability Building, Employee Wellbeing), working single-open JS behavior, ARIA attributes, chevron rotate-on-open, and staggered `.reveal` on the 5 items.
**Verify:** Playwright interaction test — click each trigger in sequence, confirm only one panel open at a time, confirm `aria-expanded` flips correctly and chevron rotates, confirm 44px+ tap target at 375px, zero console errors, confirm panel text matches the real service descriptions (not placeholder text).

### Task 6: How We Work section
**Produces:** 3-tier process (Foundation, Build, Culture — per Decision 10 and the Section 5 breakdown), horizontal on desktop / vertical on mobile, numbered 01–03, with hover lift and staggered `.reveal` on the 3 tiers.
**Verify:** Screenshot both breakpoints — order reads top-to-bottom on mobile, left-to-right on desktop, numbers/labels aligned, confirm exactly 3 tiers (not 4) with the real tier copy, not Assess/Design/Implement/Sustain placeholder text.

### Task 7: Meet the Team section + bio dialogs
**Produces:** 5 cards using the real consultants from the Section 6 breakdown (Chandra Deo, Sonali Sarma, Adv. Avdhesh Kumar Dubey, Pravin Parmar, Dr. Priyadarshini Deo) with `.avatar` initials placeholders (NOT stock photos — Decision 9), hover lift, staggered `.reveal`, and 5 native `<dialog>` popups with the full real bios + Areas of Expertise, working open/close (button, ESC, backdrop click).
**Verify:** Playwright interaction test — open each of the 5 dialogs individually, confirm correct real bio content per card (not generic placeholder bios), confirm ESC closes, confirm backdrop click closes, confirm closing one and opening another doesn't leave two open, zero console errors.

### Task 8: Contact form
**Produces:** `<form method="POST" action="https://formspree.io/f/REPLACE_THIS" id="contact-form">` with name/email/phone/message fields, HTML5 validation attributes, hidden `.form__success`/`.form__error` message elements, and a JS `submit` handler that does `preventDefault()` → `checkValidity()` → `fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })` → show `.form__success` on an ok response or `.form__error` otherwise. `.reveal` on the form block.
**Verify:** Playwright test — (1) submit empty: confirm native validation messages block submission and no `fetch` fires; (2) submit invalid email/phone: confirm rejected client-side before any network call; (3) submit valid data against the placeholder Formspree URL: confirm the `fetch` fires with the right method/headers/body (the request itself will fail/404 against `REPLACE_THIS`, which is expected — assert that the failure path correctly shows `.form__error` and the entered values are preserved, not that the submission actually succeeds). Full success-path verification against a real Formspree endpoint is deferred until the placeholder ID is swapped for a real one post-signup — note as deferred, not a failure.

### Task 9: Footer
**Produces:** Real address, placeholder email (`hello@samagraworkplaceadvisory.com`), real tagline, and copyright line, styled per tokens (per Section 8 breakdown).
**Verify:** Screenshot both breakpoints — readable contrast, email link has correct `mailto:` href, address text matches the real address exactly (not a placeholder).

### Task 10: Full-page integration pass
**Produces:** `IntersectionObserver` nav-highlighting wired across all sections (this is the one remaining JS observer on the page — unrelated to `.reveal`, which is pure CSS); confirm every `.reveal` element across every section has the scroll-driven animation applied (`@supports` block matched); full-page smooth-scroll re-verification; `prefers-reduced-motion` block finalized (reveal + hover-transform neutralization, per the Motion section); final pass for any inline `style=""` attributes to eliminate (rule from CLAUDE.md).
**Verify:** Playwright full-page test — scroll through entire page programmatically, confirm nav active-state updates per section, confirm every `.reveal` element across the whole page reaches `.is-visible` by the time it's been scrolled past, confirm zero `style="..."` attributes remain in rendered DOM (`grep` the saved HTML or query via Playwright `evaluate`), confirm zero console errors/warnings end to end at both 375px and 1280px, then re-run the whole page with `prefers-reduced-motion: reduce` emulated (Playwright `page.emulateMedia`) and confirm all `.reveal` content is immediately visible with no transition delay.

### Task 11: Final acceptance pass
**Produces:** Nothing new — this is pure verification against CLAUDE.md's rule list, line by line.
**Verify:** Checklist run with fresh Playwright evidence for each line of CLAUDE.md's "Rules" section: bio popups vanilla JS only (inspect — no library script tags present), no inline styles (DOM query confirms zero), smooth scroll works (manual scroll test), all 8 section anchor IDs present and reachable (`document.querySelectorAll('section[id]')` count == 8, each nav link's href resolves to a real element), 375px viewport fully functional (re-run the full interaction suite at 375px specifically).

---

## Self-Review Notes

- **Spec coverage:** all 8 CLAUDE.md sections have a task; all 5 CLAUDE.md rules are covered explicitly in Task 11's checklist; color/font/stack constraints are enforced via the token table and Global Constraints section; the Motion & Micro-interactions requirements (added per explicit user request) are covered by Decision 11, the dedicated Motion section, and verification steps in every task from Task 3 onward plus a dedicated reduced-motion check in Task 10.
- **Placeholder scan:** the two "to-be-decided-at-build-time" notes (team grid column count, exact root-line SVG path coordinates) are flagged as genuinely cosmetic micro-decisions with bounded options, not unresolved requirements. All copy is now real content from `Samagra_Workplace_Advisory_Company_Profile.docx` — no invented placeholder text remains in the Section-by-Section Breakdown.
- **Ambiguities resolved and surfaced:** contact form backend, popup mechanism, accordion open behavior, missing image assets, team photo representation (real named people vs. stock photos), the How We Work framework mismatch (4 generic steps vs. the doc's real 3-tier model), and the missing footer email were all open questions and are now explicit decisions in the "Decisions Made During Planning" section above — flag if any of these should change.
- **Tasks 1 and 2 were already built before this revision** — they're marked "✅ done, retrofit pending" with a specific retrofit note each, rather than being rewritten as if not yet started.
