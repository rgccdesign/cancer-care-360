export type ResourceType = 'videos' | 'stories' | 'webinars' | 'insights';
export interface Resource {
  title: string;
  description: string;
  type: ResourceType;
  provider: string;
  href: string;
  format: string;
}

// Add approved individual videos here. Use the original institutional YouTube
// watch URL; do not upload or imply ownership of another organisation's media.
export const educationalVideos: { title: string; description: string; youtubeUrl: string; provider: string }[] = [];

export const resources: Resource[] = [
  {
    title: 'Cancer explained by the NCI',
    description: 'Explore educational videos from the US National Cancer Institute. Videos open on YouTube.',
    type: 'videos', provider: 'National Cancer Institute',
    href: 'https://www.youtube.com/user/NCIgov', format: 'Video collection',
  },
  {
    title: 'Cancer science, made clearer',
    description: 'Watch explainers about cancer research and treatment from Cancer Research UK.',
    type: 'videos', provider: 'Cancer Research UK',
    href: 'https://www.youtube.com/user/cancerresearchuk', format: 'Video collection',
  },
  {
    title: 'Blood cancer education programmes',
    description: 'Browse the provider’s current education programmes, including available online sessions. Dates and eligibility are set by the provider.',
    type: 'webinars', provider: 'The Leukemia & Lymphoma Society',
    href: 'https://www.lls.org/support-resources/education-programs', format: 'External programme directory',
  },
  {
    title: 'Understanding biomarker testing',
    description: 'Read how biomarkers can inform some treatment decisions, and why results may not identify a suitable treatment.',
    type: 'insights', provider: 'National Cancer Institute',
    href: 'https://www.cancer.gov/about-cancer/treatment/types/biomarker-testing-cancer-treatment', format: 'Expert information',
  },
  {
    title: 'Questions to ask about treatment',
    description: 'Prepare for a conversation about treatment goals, benefits, risks and practical support.',
    type: 'insights', provider: 'National Cancer Institute',
    href: 'https://www.cancer.gov/about-cancer/treatment/questions', format: 'Appointment guide',
  },
];

export const resourceTypes: { key: ResourceType; label: string }[] = [
  { key: 'videos', label: 'Educational Videos' },
  { key: 'stories', label: 'Patient Stories' },
  { key: 'webinars', label: 'Webinars' },
  { key: 'insights', label: 'Expert Insights' },
];
