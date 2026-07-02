# Royal Cuts Lawn Care — Website

Fast, mobile-first marketing site for Royal Cuts Lawn Care (Baton Rouge, LA).
Static HTML/CSS/JS, no build step, hosted free on GitHub Pages.

- **Live goal:** convert visitors into calls and quote requests.
- **Services:** Lawn Maintenance, Landscaping, Irrigation, Drainage, Landscape Lighting, Christmas Lights, Final Grade, Sod.
- **Contact:** (225) 202-4029 · randall@royalcutslc.com

## Files

```
index.html          Single-page site (all sections + SEO meta + JSON-LD schema)
css/styles.css      Design system (royal green + gold, responsive)
js/main.js          Nav, scroll reveal, gallery lightbox, quote-form submit
img/                hero, about, services/, gallery/  (stock photos — see below)
img/favicon.svg     Crown favicon
CNAME               Custom domain (royalcutslc.com)
robots.txt, sitemap.xml, 404.html
```

## Editing content

All copy lives in `index.html` and is plain text — edit it directly. No framework, no tooling.

## Before launch — punch list for Randall

1. **Connect the quote form (required).**
   - Go to https://web3forms.com, enter your email, get a free **Access Key**.
   - In `index.html`, find `YOUR_WEB3FORMS_ACCESS_KEY` and paste your key in its place.
   - Submissions then email you directly. Until this is done, the form shows a "call us" message instead of failing silently.

2. **Replace sample reviews.** In `index.html`, the three cards under `<!-- REVIEWS -->` say `Sample Review`. Swap in real Google reviews (name + parish). Grep the file for `TODO(Randall)` to find every placeholder.

3. **Swap in your own job photos (recommended).** The images in `img/` are licensed stock (Pexels, free for commercial use, no attribution required). Your real before/after photos will convert far better. Keep the same filenames to drop them in with no code changes, or update the `src=` paths.

4. **Add real social links** (or delete the block). In the footer, the Facebook/Instagram links point to `#`. Replace with real URLs or remove.

5. **Google Business Profile (biggest local-SEO lever).** Claim/optimize your profile at https://business.google.com — same name, phone, and service area as this site. This is how most local customers will find you.

## Optional: background video hero

The hero uses `img/hero.jpg` with a subtle zoom. To use a video instead:
1. Add a small, web-optimized `img/hero.mp4` (aim for **≤ 5 MB, 1280×720**; big files hurt mobile speed).
2. In `index.html`, inside `.hero-media`, replace the `<img>` with:
   ```html
   <video autoplay muted loop playsinline poster="img/hero.jpg">
     <source src="img/hero.mp4" type="video/mp4">
   </video>
   ```
   Add `.hero-media video { width:100%; height:100%; object-fit:cover; }` to `css/styles.css`.

Free clips: https://www.pexels.com/videos/ or https://coverr.co (download the smallest HD rendition and compress).

## Custom domain (royalcutslc.com)

The `CNAME` file is set. To finish:
1. At your domain registrar's DNS, add four **A records** for the apex (`@`) pointing to GitHub Pages:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
2. Add a **CNAME record** for `www` → `noginblast.github.io`.
3. In the repo: **Settings → Pages** → set custom domain to `royalcutslc.com` and enable **Enforce HTTPS**.
4. Update the URLs in `sitemap.xml`, `robots.txt`, and the `<link rel="canonical">` / Open Graph / JSON-LD in `index.html` if the final domain differs.

## Local preview

Open `index.html` in a browser, or run a local server:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Image credits

Stock imagery from [Pexels](https://www.pexels.com) under the Pexels License (free for commercial use, no attribution required). Replace with owned photography when available.
