export const guideVisuals: Record<string, string> = Object.fromEntries(['breast-cancer','lung-cancer','colorectal-cancer','liver-cancer','prostate-cancer','stomach-cancer','lymphoma','leukaemia'].map(slug => [slug, `/images/education/${slug}.svg`]));
export const pageVisuals: Record<string, string> = {
  '/learn-about-cancer/': '/images/cards/dna.webp',
  '/precision-medicine/': '/images/cards/laboratory.webp',
  '/patient-resources/': '/images/cards/support.webp',
  '/healthcare-professionals/': '/images/resources/team.webp',
  '/contact/': '/images/hero/consultation.webp',
  '/privacy-policy/': '/images/education/privacy.svg',
  '/terms-of-use/': '/images/education/documents.svg',
  '/medical-disclaimer/': '/images/resources/doctor.webp',
};
