# Validation record

Validated on 5 November 2026 with Node.js 24.22.1, Astro 5.18.2 and system Chromium.

| Check | Result |
| --- | --- |
| `npm run build` | Passed; 18 static HTML pages, plus `robots.txt` and sitemap endpoints |
| `npm run check` | Passed; 32 files, no errors, warnings or hints |
| `npm test` | 31 passed, no failures or skipped checks |
| Page and asset checks | All 17 content routes, image loading and browser scripts passed |
| Links | Internal links and fragment targets passed |
| Responsive layouts | 1440, 1280, 768 and 390 px; no horizontal overflow on the six main routes |
| Interaction | Hero navigation, mobile menu and Escape, keyboard FAQ, filters and browser back passed |
| Contact and errors | Official Facebook link, no simulated enquiry form, custom 404 passed |
| Automated accessibility | No serious or critical axe violations on home, contact and resource pages |
| Default search directives | Placeholder-origin build uses `noindex`, blocks crawling and omits placeholder sitemap entries |
| Configured-origin SEO | Separate temporary build verified 17 sitemap URLs, canonical links, robots sitemap entry and index metadata |

Automated accessibility checks do not establish full WCAG compliance. Manual assistive-technology testing and the actual production host remain outside these local checks. Apache `.htaccess` behaviour must be verified on GoDaddy rather than Astro preview.

External reference content could not be verified live: the environment proxy rejected CONNECT requests to `mycancerinfo.org` and `www.cancer.gov` with HTTP 403. Other external resource links have not been exhaustively validated. Recheck sources before launch.

The current `dist/` and review archive deliberately contain an unconfigured production origin. Set the real `SITE_URL` and rebuild before deployment. The original logo, real licensed photography or approval of the generated illustrations, clinical/legal review and any additional contact channels remain launch items. No deployment or publication was performed.

## Visual enhancement validation

Production build: passed, 18 HTML pages; Astro check: 36 files, zero errors/warnings/hints. All 33 browser tests passed. After a final adjustment placing the cell comparison alongside the existing text, the six affected educational/resource and four-viewport checks passed again. A desktop screenshot of the updated Learn section was inspected. Brand preparation was tested using temporary fixture images: all four icon sizes were correct and the source logo bytes were unchanged. This does not validate the official branding files, which remain unavailable as source attachments.

Original PNGs are still required to finish official logo/favicon replacement. Current header/footer/favicon deliberately retain the interim assets. No official branding is reconstructed from the inline reference images.
