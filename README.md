# ENJO Supplier Meeting-Prep Form

A bilingual (English / Arabic) landing page + multi-step form for collecting
information from potential suppliers before a partnership meeting. Built
standalone — no build tools, no framework. Just open `index.html` or host
the folder anywhere static (Vercel, Netlify, S3, a subdomain like
`partners.enjoapp.com`).

## What it does

- Hero screen explains why we're asking and how long it takes, then a
  6-step form collects the details, then a thank-you screen.
- Each step shows 2–4 fields max (never a long scroll).
- Full English/Arabic toggle in the header — switches text direction (RTL
  for Arabic) and re-renders the current step without losing answers.
- Built with ENJO's actual brand fonts (Somar Sans / Noto Sans Arabic),
  colors, and logo mark, pulled from `Branding/enjo 2/final`.
- Client-side validation on required fields before advancing a step.

## Fields collected

| Step | Fields | Required? |
|---|---|---|
| Company basics | Company name, website, city, industry/category | Name, city, industry required · website optional |
| Business profile | Years operating, company size, yearly revenue (JD) | Years + size required · revenue optional (sensitive) |
| Your offering | Average package/ticket size (JD), online booking readiness, description | Ticket size + booking status required · description optional |
| Online presence | Platforms currently listed on, Instagram handle | Platforms required · Instagram optional |
| Point of contact | Name, title, email, phone | All required |
| Last thing | Anything else, consent to be contacted | Consent required · notes optional |

Reasoning for what's mandatory vs optional: anything needed to *reach* the
supplier (contact details) or *quickly judge seriousness/fit* (company
name, city, category, years operating, size, ticket size, listing status)
is required. Anything sensitive or not always available (exact revenue,
website, social handle, extra notes) is optional so it doesn't block
submission — happy to flip any of these if you'd rather make revenue
mandatory or ticket size optional, etc.

## Connecting it to a Google Sheet (no backend needed)

The form is wired to POST straight into a Google Form's hidden endpoint,
so every submission lands in a connected Google Sheet automatically.
Right now it's in **demo mode** — submitting just logs the answers to the
browser console and shows the thank-you screen, so you can test the full
flow before connecting anything.

To go live:

1. **Create a Google Form** with one question per row in the table above
   (21 questions total incl. the "Other" free-text fields for industry and
   listed-on). Match the question type: Short answer / Paragraph for text,
   Multiple choice for single-select (city, years, size, revenue, booking
   status), Checkboxes for multi-select (industry, listed-on), and a
   Checkbox question for consent.
2. Open the live form (not the editor) and go to **View Page Source**
   (right-click → View Page Source, or `Cmd+Option+U` in Chrome). Search
   for `entry.` — each question has a unique `entry.XXXXXXXXX` id in the
   HTML near its input. Copy each one down against its field name.
3. Take the form's edit URL, e.g.
   `https://docs.google.com/forms/d/e/XXXXX/viewform`, and change
   `/viewform` to `/formResponse` — that's your **action URL**.
4. Open `script.js`, find the `CONFIG.GOOGLE_FORM` block at the very top,
   and:
   - Paste the action URL into `ACTION_URL`.
   - Replace each `"entry.REPLACE_ME"` in `ENTRY_IDS` with the real id you
     collected in step 2, matching by field name (e.g. `companyName`,
     `pocEmail`, etc.).
5. In the Google Form's **Responses** tab, click the green Sheets icon to
   create the connected spreadsheet — that's where every submission will
   appear, in real time, before your meetings.

Once `ACTION_URL` no longer contains `REPLACE_ME`, the form automatically
switches out of demo mode and submits for real.

## Previewing locally

Run `node serve.js` from inside this folder and open `http://localhost:8934`
— it's a tiny static file server with no dependencies, just for local
testing. It's not needed for actual hosting (see below).

## Hosting

Any static host works — this is plain HTML/CSS/JS with local font and
image assets, no server required. Quick options:
- Drag the `Supplier-Intake-Form` folder into Netlify Drop
- `vercel deploy` from inside this folder
- Put it on a subdomain (e.g. `partners.enjoapp.com`) via your existing
  DNS/hosting provider

## Files

- `index.html` — page structure (hero, wizard, thank-you screen)
- `styles.css` — ENJO brand styling, responsive, RTL-aware
- `script.js` — all copy (EN/AR), field config, form logic, Google Forms
  submission wiring (see `CONFIG` at the top)
- `assets/fonts/` — Somar Sans + Noto Sans Arabic, copied from the brand kit
- `assets/img/` — ENJO logo mark (teal + white versions) and favicon
