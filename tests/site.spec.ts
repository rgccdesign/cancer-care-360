import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const cancerSlugs = ['breast-cancer', 'lung-cancer', 'colorectal-cancer', 'liver-cancer', 'prostate-cancer', 'stomach-cancer', 'lymphoma', 'leukaemia'];
const mainRoutes = ['/', '/learn-about-cancer/', '/precision-medicine/', '/patient-resources/', '/healthcare-professionals/', '/contact/'];
const routes = [...mainRoutes, ...cancerSlugs.map(slug => `/learn-about-cancer/${slug}/`), '/privacy-policy/', '/terms-of-use/', '/medical-disclaimer/'];

for (const route of routes) {
  test(`production route ${route} has content and usable image assets`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Cancer Care 360/);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('main h1')).toBeVisible();
    await page.locator('footer').scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator('img').evaluateAll(images => images.every(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('internal links and fragment targets resolve across the whole site', async ({ page, request }) => {
  const links = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const values = await page.locator('a[href]').evaluateAll(anchors => anchors.map(anchor => (anchor as HTMLAnchorElement).href));
    values.filter(value => value.startsWith('http://127.0.0.1:4321/')).forEach(value => links.add(value));
  }
  for (const value of links) {
    const response = await request.get(value);
    expect(response.status(), `Broken internal link: ${value}`).toBe(200);
    const hash = new URL(value).hash;
    if (hash) {
      await page.goto(value);
      expect(await page.evaluate(id => !!document.getElementById(id), decodeURIComponent(hash.slice(1))), `Missing fragment in ${value}`).toBe(true);
    }
  }
});

for (const width of [1440, 1280, 768, 390]) {
  test(`responsive layout at ${width}px fits viewport and exposes homepage actions`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of mainRoutes) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Horizontal overflow at ${width}px on ${route}`).toBe(true);
    }
    await page.goto('/');
    await page.locator('.contact-banner').scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath(`homepage-${width}.png`), fullPage: true });
    await expect(page.getByRole('link', { name: 'Explore Now', exact: true })).toBeVisible();
    for (const title of ['Learn About Cancer', 'Precision Medicine', 'Patient Resources']) {
      await expect(page.locator('.feature-card').getByRole('heading', { name: title, exact: true })).toHaveCount(1);
    }
    await page.getByRole('link', { name: 'Explore Now', exact: true }).click();
    await expect(page).toHaveURL(/\/learn-about-cancer\/$/);
  });
}

test('mobile menu supports toggle, Escape and navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.locator('.menu-toggle');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav).toBeHidden();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(nav).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(nav).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await nav.getByRole('link', { name: 'Contact Us', exact: true }).click();
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeHidden();
});

test('FAQ opens and closes with keyboard interaction', async ({ page }) => {
  await page.goto('/learn-about-cancer/#faqs');
  const question = page.locator('.faq-item summary').first();
  const item = page.locator('.faq-item').first();
  await question.focus();
  await question.press('Enter');
  await expect(item).toHaveAttribute('open', '');
  await expect(item.locator('.faq-answer')).toBeVisible();
  await question.press('Enter');
  await expect(item).not.toHaveAttribute('open');
});

test('resource categories support direct URLs, filtering and browser back', async ({ page }) => {
  await page.goto('/patient-resources/?type=videos#resource-library');
  await expect(page.locator('[data-resource-group="videos"]')).toBeVisible();
  await expect(page.locator('[data-resource-group="stories"]')).toBeHidden();
  await page.locator('[data-filter="stories"]').click();
  await expect(page).toHaveURL(/type=stories#resource-library$/);
  await expect(page.locator('[data-resource-group="stories"]')).toBeVisible();
  await expect(page.locator('[data-resource-group="videos"]')).toBeHidden();
  await expect(page.locator('[data-filter="stories"]')).toHaveAttribute('aria-current', 'true');
  await page.goBack();
  await expect(page.locator('[data-resource-group="videos"]')).toBeVisible();
  await page.locator('[data-filter="all"]').click();
  for (const category of ['videos', 'stories', 'webinars', 'insights']) {
    await expect(page.locator(`[data-resource-group="${category}"]`)).toBeVisible();
  }
});

test('contact exposes the official channel without a pretend submission form', async ({ page }) => {
  await page.goto('/contact/');
  await expect(page.locator('.contact-channel').first()).toHaveAttribute('href', 'https://www.facebook.com/profile.php?id=61595618420291');
  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.locator('a[href^="https://wa.me/"]')).toHaveCount(0);
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
});

test('unknown routes return a helpful 404 page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('main h1')).toContainText('find your way');
  await page.getByRole('link', { name: 'Back to Home', exact: true }).click();
  await expect(page).toHaveURL('/');
});

test('unconfigured production origin stays out of search indexes', async ({ page, request }) => {
  await page.goto('/');
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  // This project builds with a deliberately unconfigured .invalid origin until
  // the operator supplies SITE_URL. Keep the same checks useful after launch.
  const hostname = new URL(canonical!).hostname;
  const robots = await request.get('/robots.txt');
  const sitemap = await request.get('/sitemap.xml');
  expect(robots.status()).toBe(200);
  expect(sitemap.status()).toBe(200);
  if (hostname.endsWith('.invalid')) {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    expect(await robots.text()).toContain('Disallow: /');
    expect(await sitemap.text()).not.toContain('<loc>');
  } else {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
    expect(await robots.text()).toContain(`Sitemap: ${new URL('/sitemap.xml', canonical!).href}`);
    expect(await sitemap.text()).toContain('<loc>');
  }
});

for (const route of ['/', '/contact/', '/patient-resources/']) {
  test(`no serious or critical automated accessibility violations on ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    const significant = results.violations.filter(violation => ['critical', 'serious'].includes(violation.impact || ''));
    expect(significant.map(violation => ({ id: violation.id, help: violation.help, nodes: violation.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) }))).toEqual([]);
  });
}

test('educational visuals explain cell growth and diagnosis without replacing the text', async ({page}, testInfo) => {
  await page.goto('/learn-about-cancer/');
  await expect(page.locator('.cell-growth svg')).toHaveCount(2);
  await page.screenshot({path:testInfo.outputPath('learn-desktop.png')});
  await expect(page.locator('.cell-growth')).toContainText('not to scale');
  await expect(page.locator('.diagnostic-grid article')).toHaveCount(4);
  await expect(page.locator('.treatment-grid article > svg')).toHaveCount(6);
  await page.goto('/precision-medicine/');
  await expect(page.locator('.evaluation-steps li > svg')).toHaveCount(4);
});

test('resource visual index and professional images support existing destinations', async ({page}) => {
  await page.goto('/patient-resources/');
  const categories=page.getByRole('navigation',{name:'Browse patient resources'});
  await expect(categories.locator('a')).toHaveCount(6);
  await categories.getByRole('link',{name:'Webinars',exact:true}).click();
  await expect(page.locator('[data-resource-group="webinars"]')).toBeVisible();
  await expect(page.locator('[data-resource-group="videos"]')).toBeHidden();
  await page.goto('/healthcare-professionals/');
  await expect(page.locator('.editorial-figure img')).toHaveCount(2);
});

test('internal heroes, secondary branding and stage diagram use real assets', async ({page},testInfo) => {
  for(const route of routes.filter(route => route !== '/')) {
    await page.goto(route);
    await expect(page.locator('.unified-intro .intro-visual img')).toBeVisible();
    await expect(page.locator('header .brand-endorsement img')).toHaveAttribute('src','/images/brand/cancer-a-z.svg');
    await expect(page.locator('footer .brand-endorsement img')).toHaveAttribute('alt','Cancer A–Z');
  }
  await page.goto('/learn-about-cancer/#stages');
  await expect(page.locator('.stage-grade-visual svg')).toHaveCount(2);
  await expect(page.locator('#stages .note')).toContainText('A stage or grade alone does not predict');
  await page.screenshot({path:testInfo.outputPath('stages-desktop.png')});
});

test('internal hero imagery and library controls remain separate at requested widths', async ({page},testInfo) => {
  for(const width of [1440,1280,768,390]) {
    await page.setViewportSize({width,height:1000});
    for(const route of ['/patient-resources/','/learn-about-cancer/breast-cancer/','/contact/','/privacy-policy/']) {
      await page.goto(route);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
      const copy=await page.locator('.intro-copy').boundingBox();
      const image=await page.locator('.intro-visual').boundingBox();
      expect(copy).toBeTruthy();expect(image).toBeTruthy();
      if(width>640) expect(copy!.x+copy!.width).toBeLessThanOrEqual(image!.x+1);
      else expect(copy!.y+copy!.height).toBeLessThanOrEqual(image!.y+1);
    }
    await page.goto('/patient-resources/#resource-library');
    await page.getByRole('navigation',{name:'Filter resources'}).getByRole('link',{name:'Educational Videos',exact:true}).click();
    await expect(page.locator('[data-resource-group="videos"]')).toBeVisible();
    await page.screenshot({path:testInfo.outputPath(`library-${width}.png`)});
    await page.goto('/healthcare-professionals/');
    await page.screenshot({path:testInfo.outputPath(`professional-hero-${width}.png`)});
  }
});
