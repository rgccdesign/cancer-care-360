# Deploy to GoDaddy cPanel

This site is designed for **GoDaddy Web Hosting with cPanel**, or another host that serves static files. It does not require Node.js on the production host.

## Build locally

1. From the repository root, run `npm ci` and `npm run check`.
2. Set `SITE_URL` to the final HTTPS origin and run `npm run build`. For a deployment at the domain root, the origin has no path suffix. Use the real domain, not the documentation example or `example.invalid`.
3. Run `npm run preview`, check the generated pages and run the browser checks (`npx playwright install chromium` once, then `npm test`).
4. Confirm the generated canonical URLs, Open Graph URLs, sitemap and `robots.txt` refer to the real site and permit indexing only when the site is approved for launch.

`dist/` is the deployable output. Source files, `node_modules/`, lockfiles, development tools and credentials must not be uploaded to the public document root.

## Upload safely

1. Confirm the hosting product and domain document root in cPanel. It is commonly `public_html/` for the primary domain; addon domains may use a different directory.
2. Back up any existing website outside the public document root. Preserve its files, configuration and restoration instructions before replacing it. Do not remove unrelated sites or hosting files.
3. Review and merge the supplied `.htaccess` with any existing hosting configuration before uploading. Enable “Show Hidden Files (dotfiles)” in cPanel File Manager or the equivalent option in the transfer client so `.htaccess` is visible.
4. Upload the **contents of `dist/`**, including `.htaccess`, `_astro/`, `images/`, page directories, `robots.txt`, the sitemap and `404.html`, into the selected document root. Do not create an extra public `dist/` folder.
5. Use cPanel File Manager or your hosting account’s supported SFTP workflow. Keep authentication out of this repository.
6. Enable or verify a valid HTTPS certificate in the hosting control panel. Configure a single preferred hostname and redirect HTTP to HTTPS using the host’s supported settings.

Astro generates directory-style pages such as `learn-about-cancer/index.html`. The baseline `public/.htaccess`, copied into `dist/`, sets `DirectoryIndex index.html` and uses `/404.html` as the error document. This is a multi-page static site: do not add a single-page-app rewrite that serves the homepage for every path. Verify that an unknown URL returns HTTP 404 rather than 200 on the actual host.

The supplied `.htaccess` also adds `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` and `X-Frame-Options: SAMEORIGIN` when Apache’s `mod_headers` is available. When `mod_deflate` is available, it requests compression for HTML, CSS, JavaScript and SVG. These optional directives depend on the hosting account’s enabled modules; verify the deployed response headers. Keep existing host redirects and other required rules when merging, and do not overwrite them blindly. The baseline does not configure HTTPS redirection or long-lived caching; use cPanel or an operator-reviewed configuration appropriate to the account.

## Check the deployed site

- Open the homepage and every main navigation destination over HTTPS.
- Open an internal URL directly in a new tab and refresh it.
- Check all eight cancer type pages and the legal pages.
- Verify the logo, hero photograph, card images, fonts and icons load without mixed-content warnings.
- Check mobile navigation at 390 px and tablet layout at 768 px, then desktop at 1280 and 1440 px.
- Follow the home resource links and test filtering, FAQ accordions and keyboard focus.
- Test each configured contact channel and external resource link. Do not submit medical data as a test.
- Check external source destinations in an authorised browser. Live source validation was incomplete in development because the proxy rejected CONNECT requests to `mycancerinfo.org` and `www.cancer.gov` with HTTP 403.
- Check `robots.txt`, the sitemap, canonical URLs and social metadata.
- Confirm an invented URL returns a useful 404 response.

Keep the previous release until the new release is verified. To roll back, restore the backed-up site and its matching hosting configuration.

## Subdirectory hosting

The default build targets the domain root. If the site must live at a path such as `/cancer-care/`, do not simply move the root build into that directory: root-relative URLs would point to the wrong place. Configure Astro’s `base` and update URL handling consistently, then rebuild and rerun link and browser checks. A dedicated domain or subdomain with this site at its document root avoids that extra configuration.

## GoDaddy Websites + Marketing

GoDaddy Websites + Marketing is a managed site builder, not cPanel file hosting. It does not generally accept an arbitrary Astro `dist/` upload as a complete site. Confirm the exact product before deployment.

Options are to add a static-capable Web Hosting/cPanel plan, use another static host and connect the domain using DNS, or rebuild the design using the builder’s supported components. An embedded HTML section is not equivalent to hosting the complete site. DNS changes and publication should be performed only by an authorised account owner after the final build has been reviewed.
