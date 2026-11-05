# Launch checklist

The generated site is a reviewable implementation. Complete these items before public launch.

## Brand and assets

- [ ] Supply the original Cancer Care 360 logo as an authorised PNG or SVG and replace or approve the temporary brand treatment.
- [ ] Confirm the homepage against the approved mockup at 1440 and 1280 px.
- [ ] Review all photographs for appropriateness and provenance; record the rights to use them in `docs/assets.md`.
- [ ] Confirm image crops, alt text and legibility at 768 and 390 px.

## Medical content

- [ ] Have an appropriately qualified clinical professional review all educational pages, cancer type summaries, precision medicine explanations and FAQs.
- [ ] Verify the currency and relevance of each reference. Linked organisations have not endorsed the site merely because a link is included.
- [ ] Check external references and resource URLs from an authorised browser. Development checks could not confirm live content: the proxy rejected CONNECT requests to `mycancerinfo.org` and `www.cancer.gov` with HTTP 403.
- [ ] Confirm the wording about CTCs, ctDNA, NGS and drug sensitivity testing clearly distinguishes established uses from investigational uses.
- [ ] Confirm no text promises treatment response, programme access or a particular outcome.
- [ ] Establish an editorial owner and review schedule; add genuine reviewer names and review dates only after review has taken place.
- [ ] Publish patient stories only after documented consent and editorial approval; publish webinars and video entries only after validating their actual URLs and descriptions.

## Contact and privacy

- [ ] Confirm the official Facebook profile is correct and managed by the operator.
- [ ] Add a real email address and WhatsApp number only if these channels will be monitored. Otherwise leave them unconfigured.
- [ ] Confirm that contact text discourages sharing medical records or sensitive information through ordinary email or social media.
- [ ] Identify the operating legal entity and applicable jurisdiction; obtain legal review of the privacy policy, terms and medical disclaimer.
- [ ] Confirm GoDaddy’s actual logging, retention and privacy practices and update the privacy policy accordingly.
- [ ] Reassess privacy obligations before adding analytics, embedded videos, cookies, forms or other data collection. No working enquiry form is included in this version.

## Technical release

- [ ] Confirm GoDaddy Web Hosting/cPanel or another static-capable host; Websites + Marketing requires a different deployment approach.
- [ ] Configure the actual HTTPS production origin using `SITE_URL`; rebuild and verify canonical URLs, Open Graph metadata, sitemap and indexing directives.
- [ ] Run `npm ci`, `npm run check`, `npm run build`, `npx playwright install chromium` and `npm test`; inspect any failures or skipped checks.
- [ ] Check internal links, filter results, FAQ accordions, mobile menu, keyboard navigation, focus visibility and colour contrast.
- [ ] Back up the existing hosting document root and configuration before replacing files.
- [ ] Merge the supplied `.htaccess` with existing host configuration, enable visibility of hidden files and upload all contents of `dist/`.
- [ ] Verify HTTPS, direct page navigation, the error response for an unknown URL, the security headers and supported compression on the actual host.
- [ ] Make the final publication decision separately from local development and testing.
