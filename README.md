# Cancer Care 360

A responsive cancer education website built with Astro and TypeScript. It generates ordinary HTML, CSS and a small amount of JavaScript in `dist/`; production hosting needs no Node.js process, database or application server.

The homepage follows the supplied reference: compact navigation, consultation hero, three image cards, a four-item resource strip and a professional contact banner. Internal pages cover cancer education, eight cancer types, precision medicine, patient resources, professional resources, contact and legal information.

## Develop and verify

Use Node.js 22.12 or newer; this environment uses Node.js 24.

```sh
npm ci
npm run dev -- --host 0.0.0.0
```

Run commands from the repository root. The development URL is printed by Astro. Build and inspect the static output with:

```sh
npm run check
npm run build
npm run preview -- --host 0.0.0.0
```

Install the test browser once, then run the browser checks:

```sh
npx playwright install chromium
npm test
```

On a new Linux machine, Chromium may also need system libraries; use Playwright’s supported dependency installation if the runner reports missing libraries. The package scripts disable Astro telemetry for this Linux environment. A passing build checks generation, while browser checks exercise navigation and responsive behaviour; neither replaces clinical, legal or content review.

## Edit the site

| Change | Location |
| --- | --- |
| Brand and contact settings | `src/config/site.ts` |
| Homepage layout | `src/pages/index.astro` and `src/components/` |
| Shared colours, typography and spacing | `src/styles/` |
| Cancer type entries and resources | `src/content/` |
| Educational page text | `src/pages/learn-about-cancer/`, `precision-medicine/`, `patient-resources/`, `healthcare-professionals/` |
| Privacy, terms and disclaimer | Corresponding files in `src/pages/` |
| Photographs and logo | `public/images/` |

Keep text concise on the homepage. Put fuller explanations on internal pages. Use British English, cite reputable sources and qualify the limits of tests and treatments. Arrange clinical review whenever medical text changes.

### Logo and photographs

Use an authorised, separate logo file, preserving its proportions and transparent background where appropriate. The inline chat reference is not a substitute for the original downloadable brand asset. The interim `public/images/brand/wordmark.svg` must be replaced or explicitly approved before launch. Set `site.logo` to the new public path and `site.officialLogoConfigured` to `true` only after the actual official asset is installed.

The development visuals are original, photorealistic generated illustrations; they are not documentary photographs of real patients or clinicians. Replace them with authorised real photography if required for launch. Use the documented image paths in the components, or update the corresponding paths when replacing assets. Optimise photographs as WebP, keep useful intrinsic dimensions and review crops at desktop and mobile widths. Maintain meaningful alt text for informative images; decorative images should have empty alt text. Record provenance and permissions in [`docs/assets.md`](docs/assets.md).

### Contact details

Edit `site.facebook`, `site.email` and `site.whatsapp` in `src/config/site.ts`. The supplied official Facebook profile is available by default. Email and WhatsApp remain `null` until the owner provides real details. Use an international WhatsApp number containing digits only, without `+`, spaces or punctuation. The contact page renders only usable configured channels; it does not simulate form submission. Do not put credentials or private patient information in source files.

### Videos, stories and webinars

Edit `src/content/resources.ts`. The `resources` collection contains `title`, `description`, `type`, `provider`, `href` and `format`. Supported types are `videos`, `stories`, `webinars` and `insights`. Add approved individual videos to `educationalVideos` with `title`, `description`, `youtubeUrl` and `provider`. Use a real institutional YouTube watch URL, without embedding a tracking player. Keep titles, descriptions and publishers accurate, and test each URL after editing.

Publish patient experiences only with documented, appropriate consent and editorial review. Do not create fictional identities, testimonials or treatment outcomes. Webinar entries must point to real events or recordings; empty states are deliberate until approved resources are available.

Live validation of external educational sources is incomplete: the environment proxy rejected CONNECT requests to `mycancerinfo.org` and `www.cancer.gov` with HTTP 403. The linked medical references and external resource destinations must be checked from an authorised browser before launch. These responses do not establish that the destination content is missing or current.

## Production domain and deployment

Set `SITE_URL` to the final HTTPS origin when building. Until a production origin is configured, the site uses a development placeholder and discourages indexing; do not publish that build as the final site. For example, after substituting the real domain:

```sh
SITE_URL=https://your-real-domain.example npm run build
```

Upload the **contents** of `dist/` to the domain’s cPanel document root, including the hidden `.htaccess` file after merging it with any existing host configuration. See [`docs/deployment.md`](docs/deployment.md) for backups, clean URLs, HTTPS, checks and the limitations of GoDaddy Websites + Marketing.

This repository does not deploy automatically. No hosting credentials are needed for local development or a static build.

## Before launch

Complete [`docs/launch-checklist.md`](docs/launch-checklist.md). In particular, configure the real domain, supply the original logo, approve image rights, review the medical and legal text and confirm the contact channels. Clinical and legal copy is a reviewable draft, not approved advice or a final legal assessment.
