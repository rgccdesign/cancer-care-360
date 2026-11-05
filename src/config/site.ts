/** Public settings only. Never put credentials or patient information here. */
export const site = {
  name: 'Cancer Care 360',
  description: 'Clear cancer information, precision medicine education and practical resources for patients, families and healthcare professionals.',
  url: import.meta.env.SITE_URL || 'https://example.invalid',
  // Replace with the supplied official image file when the original is available.
  logo: '/images/brand/wordmark.svg',
  officialLogoConfigured: false,
  facebook: 'https://www.facebook.com/profile.php?id=61595618420291',
  email: null as string | null,
  // International digits only, without a leading +, spaces or punctuation.
  whatsapp: null as string | null,
};

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Learn', href: '/learn-about-cancer/' },
  { label: 'Precision Medicine', href: '/precision-medicine/' },
  { label: 'Resources', href: '/patient-resources/' },
  { label: 'For Professionals', href: '/healthcare-professionals/' },
];

export const isProductionUrl = !new URL(site.url).hostname.endsWith('.invalid');
