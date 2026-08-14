# Putting the Samagra site online

This is a **static site** — plain files, no server to run. Hosting is free on
**GitHub Pages** (you only pay for the domain name), and it comes with free
HTTPS. No VPS, no Cloudflare, no third party.

Everything below is a one-time setup. After that, updating the site is just
"edit → run `deploy.py`" (see the last section).

---

## Step 1 — Make the repo public

GitHub Pages is free only on **public** repositories. The site's source has
nothing secret in it (the internal files — the company profile `.docx`, the
logo source folder, References, `deploy.py`, `preview.html` — are already kept
out of the repo), so it's safe to make public.

1. Go to the repo → **Settings → General**.
2. Scroll to **"Danger Zone" → "Change repository visibility" → Make public.**

---

## Step 2 — Turn on GitHub Pages

1. **Settings → Pages.**
2. **Source:** "Deploy from a branch".
3. **Branch:** `main`, **folder:** `/ (root)` → **Save.**
4. Wait about a minute. Your site is live at
   **https://anshdeo.github.io/Samagra-website/** — open it on your phone,
   laptop, anything. This is the real thing, with HTTPS.

---

## Step 3 — Set up the contact form (Formspree)

The form needs a free Formspree account to actually deliver messages.

1. Go to <https://formspree.io> and sign up (free).
2. Create a new form; it gives you an endpoint like
   `https://formspree.io/f/abcdwxyz`.
3. Open **`config.js`**, find:
   ```js
   formAction: "https://formspree.io/f/REPLACE_THIS",
   ```
   and replace `REPLACE_THIS` (keep the rest) with your real form ID.
4. Save, then run `python3 deploy.py`.

Until you do this, the form shows its success message but messages aren't
delivered.

---

## Step 4 — Connect your domain (samagraworkplace.com)

Do this once the domain is off GoDaddy's KYC/verification hold.

1. In **Settings → Pages → Custom domain**, type `samagraworkplace.com` →
   **Save**. (GitHub adds a `CNAME` file to the repo.)
2. In **GoDaddy → your domain → DNS**, add these records:

   **Four A records** (host `@` — the bare domain):
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
   **One CNAME** (host `www` → value `anshdeo.github.io`) — optional, for the
   `www.` version.

3. Back in **Settings → Pages**, wait for the DNS check to pass ✓, then tick
   **"Enforce HTTPS."** The certificate provisions automatically (can take up
   to an hour).

GitHub does **not** give you nameservers — just the A records above, which you
paste into GoDaddy's DNS. That's the whole domain hookup.

---

## Step 5 — Update the email address (optional)

The site shows a placeholder email. In `config.js`:
```js
email: "hello@samagraworkplaceadvisory.com",
```
Change it to the real one once you have it. It updates the header link, contact
section, and footer everywhere.

---

## Updating the site after it's live

1. **Edit `config.js`** for any wording, team member, bio, or social link —
   **or** drop a replacement image into `source/images/…` (keep the same file
   name; team photos are named after each person).
2. **Run the publish script:**
   ```
   python3 deploy.py
   ```
   It shows what changed, asks for a short message, and (after you confirm)
   pushes to GitHub.
3. The **live site updates within ~10 minutes** (or instantly if you
   hard-refresh). GitHub Pages caches files for about 10 minutes.

**No terminal?** You can also edit `config.js` directly on
github.com/anshdeo/Samagra-website (open the file → pencil icon → Commit
changes) — that alone republishes.

**Editing `config.js` safely:** it's just text, but keep the punctuation intact
— text stays inside `"quotes"`, and each line inside a list ends with a comma.
If a change ever breaks the page, undo your last edit and it's fine again.

---

## Quick reference

| I want to… | Do this |
|---|---|
| Change any text | Edit `config.js`, run `python3 deploy.py` |
| Change a team photo | Replace the file in `source/images/team/` (same name), run `python3 deploy.py` |
| Add/remove a team member | Copy or delete one `{ … }` block in `team.members` in `config.js` |
| Add a social link | Set the link in `config.js` (`"None"` hides it) |
| Publish changes | `python3 deploy.py` |
