# Putting the Samagra site online

This is a **static site** — plain files, no server to run. That means hosting is
free (you only pay for a domain name, ~$10–15/year), and it comes with free
HTTPS. No VPS, no Linux, nothing to maintain.

Everything below is a one-time setup. After that, updating the site is just
"edit → run `deploy.py`" (see the last section).

---

## Before you start — the one thing you must do yourself

**Set up the contact form (Formspree).** The form on the site needs a free
Formspree account to actually deliver messages.

1. Go to <https://formspree.io> and sign up (free).
2. Create a new form; it gives you an endpoint like
   `https://formspree.io/f/abcdwxyz`.
3. Open **`config.js`**, find:
   ```js
   formAction: "https://formspree.io/f/REPLACE_THIS",
   ```
   and replace `REPLACE_THIS` (keep the rest) with your real form ID.
4. Save. (It'll go live next time you deploy.)

Until you do this, the form's success message will show but messages won't be
delivered.

---

## Step 1 — Put it online (free, ~5 minutes)

The site is already on GitHub, so the easiest path is a host that connects to
the repo and **auto-publishes every time you push**. Two great free options —
pick one:

### Option A — Cloudflare Pages (recommended)

1. Make a free account at <https://pages.cloudflare.com>.
2. **Create a project → Connect to Git →** choose the
   `friendlycrackhead/samagra-website` repo.
3. Build settings: leave the **build command empty**, and set
   **output directory** to `/` (root). (There's no build step — it's plain files.)
4. **Save and Deploy.**
5. You immediately get a free URL like `samagra-website.pages.dev`. Open it on
   your phone, laptop, anything — this is your live site (with real HTTPS).

### Option B — Netlify

1. Make a free account at <https://netlify.com>.
2. **Add new site → Import an existing project → GitHub →** pick the repo.
3. Leave build command empty, publish directory `.` (a dot). Deploy.
4. You get a free URL like `samagra.netlify.app`.

Both hosts read the included `_headers` file, so caching is already set up
correctly (your future edits show up right away).

---

## Step 2 — Use your own domain

1. **Buy a domain** (~$10–15/yr). Good registrars: Cloudflare Registrar
   (cheapest, no markup), Namecheap, or Porkbun. Pick something like
   `samagraworkplaceadvisory.com`.
2. In your host's dashboard (Cloudflare Pages / Netlify), open the project →
   **Custom domains → Add domain →** type your domain.
3. The host tells you exactly which DNS records to add (usually a couple of
   `CNAME`/`A` records). Add them at your registrar. If you bought the domain at
   Cloudflare and use Cloudflare Pages, this is basically one click.
4. Wait a few minutes. HTTPS turns on automatically. Done.

---

## Step 3 — Update the email address (optional but recommended)

The site currently shows a placeholder email. In `config.js`:
```js
email: "hello@samagraworkplaceadvisory.com",
```
Change it to the real one once you have it (ideally an address on your new
domain). It updates the header link, contact section, and footer everywhere.

---

## Updating the site after it's live

This is the everyday part, and it's simple:

1. **Edit `config.js`** for any wording, team member, bio, social link, etc.,
   **or** drop a replacement image into `source/images/…` (keep the same file
   name — team photos are named after each person).
2. **Run the publish script:**
   ```
   python3 deploy.py
   ```
   It shows what changed, asks for a short message, and (after you confirm)
   pushes to GitHub.
3. Your host rebuilds and the **live site updates in under a minute.**

No terminal? You can also edit `config.js` directly on
`github.com/friendlycrackhead/samagra-website` (open the file → pencil icon →
Commit changes) — that alone triggers a deploy.

**Editing `config.js` safely:** it's just text, but keep the punctuation intact
— text stays inside `"quotes"`, and each line inside a list ends with a comma.
If a change ever breaks the page, undo your last edit and it's fine again.

---

## A couple of housekeeping notes

- **Working files in the repo.** The repo also contains files that aren't part
  of the website — `deploy.py`, `preview.html` (the motion-options demo), the
  `References/` folder, the `Samagra Workplace Advisory logo/` folder, and
  `Samagra_Workplace_Advisory_Company_Profile-2.docx`. On most hosts these would
  be publicly reachable if someone guessed the URL. Nothing here is secret, but
  if you'd rather they not be public, delete them from the repo before launch
  (or tell me and I'll set that up).
- **Images re-download only when editing locally.** While you preview on your
  Mac's Python server, images refresh instantly on reload. On the live domain
  they're cached-but-revalidated (fast), so visitors aren't re-downloading them
  every time — but your swaps still show.

---

## Quick reference

| I want to… | Do this |
|---|---|
| Change any text | Edit `config.js`, run `python3 deploy.py` |
| Change a team photo | Replace the file in `source/images/team/` (same name), run `python3 deploy.py` |
| Add/remove a team member | Copy or delete one `{ … }` block in `team.members` in `config.js` |
| Add a social link | Set the link in `config.js` (`"None"` hides it) |
| Publish changes | `python3 deploy.py` |
