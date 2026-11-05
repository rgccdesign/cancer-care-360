import type { APIRoute } from 'astro';
import { site, isProductionUrl } from '../config/site';
import { cancerTypes } from '../content/cancers';

export const GET: APIRoute = () => {
  const paths = ['/', '/learn-about-cancer/', '/precision-medicine/', '/patient-resources/', '/healthcare-professionals/', '/contact/', '/privacy-policy/', '/terms-of-use/', '/medical-disclaimer/', ...cancerTypes.map(cancer => `/learn-about-cancer/${cancer.slug}/`)];
  const urls = isProductionUrl ? paths.map(path => `<url><loc>${new URL(path, site.url).href.replaceAll('&', '&amp;')}</loc></url>`).join('') : '';
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
