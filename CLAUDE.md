# Samagra Workplace Advisory — Website

## Project
Single-page scrolling website for a Mumbai-based workplace consulting firm.

## Colors
- Dark primary: #2C3B2D
- Dark secondary: #1A2B1B
- Background: #F8FAF8 (very light sage, pairs with forest green)
- Text: #1A1A1A
- Dividers/borders: #D6D6D6
- Warm accent (sparing use only, e.g. one alternating section bg — not a dominant tone): Warm Stone #E9E4D8

## Typography
- Display/headline font: Lora (serif) — weights 400, 500, 700, plus italic 400
- Body/label/UI font: Jost (sans-serif) — weights 300, 400, 500
- These match the typefaces already established in the brand logo system file (`Samagra Workplace Advisory logo/Samagra Logo System.dc.html`) — reuse that pairing rather than introducing a new one.
- Load via: <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,700;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">

## Imagery
- Real photography (not inline-SVG-only) for hero/section backgrounds — sourced from Unsplash via direct CDN image URLs (no API key, no library).
- The banyan icon mark itself stays inline SVG (uses the exact path data from the logo system file) — only photographic backgrounds/scenery use Unsplash.
- Team member photos: stock headshot photography from Unsplash (same sourcing as the rest of the site), one per consultant, swapped for real headshots when available.

## Content source
Real company content lives in `Samagra_Workplace_Advisory_Company_Profile.docx` (converted to read it — it's binary). Use it as the source of truth for the *facts* — but rewrite for the web, don't copy paragraphs verbatim. The doc is written in dense consulting-proposal language (long sentences, heavy jargon); the site needs short, punchy, low-jargon copy that a visitor with no attention span will actually read. Cut sentence length aggressively, drop corporate filler ("leverage," "holistic," stacked qualifiers), keep the real specifics (numbers, names, the banyan metaphor) but say them in fewer words. This applies to every section below, not just one.
- **About / Why Samagra:** the "About Samagra Workplace Advisory" paragraphs (the "samagra" = whole/complete naming rationale, the four-disconnected-disciplines problem statement) plus the "Why Organisations Choose Samagra Workplace Advisory" bullet list.
- **One Tree, Five Roots:** use the doc's "Our Identity: One Tree, Five Roots" section verbatim/near-verbatim — it's the authoritative version of the banyan metaphor.
- **What We Do (5 accordion items) — "Our Services" in the doc:** Labour Law Advisory, POSH Compliance, HR & Organisation Development, Training & Capability Building, Employee Wellbeing — each with the doc's description.
- **How We Work:** NOT 4 steps named Assess/Design/Implement/Sustain (superseded) — use the doc's actual "ground-up, brick by brick" 3-tier progression instead: (1) Foundation — compliance, labour relations, business discipline; (2) Build — HR & people practices, capability, succession, wellbeing; (3) Culture — organisational systems serving vision/mission/purpose, good → great. Numbered markers (01/02/03) are justified here since it's a real sequence.
- **Meet the Team (5 real consultants, not placeholder people):** Chandra Deo (Head Consultant), Sonali Sarma (Leadership Development & POSH Consultant), Adv. Avdhesh Kumar Dubey (Advocate, Supreme Court), Pravin Parmar (Labour Law Consultant), Dr. Priyadarshini Deo (Mental Health & Psychosocial Care Consultant) — full bios and "Areas of Expertise" lists are in the doc, use them for the bio dialogs.
- **Footer:** real address — "201, Sun Plaza, Lokmanya Tilak Road, Opp. Diamond Talkies, Mhatre Wadi, Borivali (West), Mumbai – 400092". No real email exists yet — use a clearly-placeholder email (e.g. hello@samagraworkplaceadvisory.com) until a real one is provided.

## Motion & Micro-interactions
- **Scroll-reveal:** sections/images below the fold fade/rise into view tied directly to scroll position via CSS `animation-timeline: view()` (no JS, no library) — plays out *as* the user scrolls, reverses naturally when scrolling back. Falls back to always-visible (no animation) in browsers without support. Not on the hero (must render instantly, no fade-in delay on first paint).
- **Hover micro-interactions:** nav links, buttons, and cards get subtle feedback on hover (lift, color shift, underline grow) — small, tasteful, never jarring. Photos deliberately do NOT get a hover-zoom — it fights the scroll-driven reveal transform and was inconsistent across sections.
- All motion must respect `prefers-reduced-motion: reduce` — reveal animations snap to their final state instantly and transform-based hover effects are disabled (simple color feedback can stay).

## Stack
- Plain HTML, CSS, JS only. No frameworks, no libraries.
- Single file: index.html
- Mobile-first. Every change must work on 375px viewport.

## Sections (in order)
1. Hero — banyan tree background, headline, subtext, CTA button
2. Why Samagra — real About copy + "Why Organisations Choose Samagra" bullets + image
3. One Tree Five Roots — real banyan identity story from the company profile
4. What We Do — accordion, 5 real services (Labour Law Advisory, POSH Compliance, HR & Organisation Development, Training & Capability Building, Employee Wellbeing)
5. How We Work — 3-tier real progression (Foundation, Build, Culture) — not the old 4-step placeholder
6. Meet the Team — 5 real consultants, initials-avatar placeholders, clickable bio popups with real bios
7. Contact — form (name, email, phone, message), Formspree-backed
8. Footer — real address, placeholder email

## Rules
- Bio popups must use vanilla JS, no libraries
- Never use inline styles where a class works
- Smooth scroll between sections
- All sections have anchor IDs for nav
- Verify with Playwright before marking done
