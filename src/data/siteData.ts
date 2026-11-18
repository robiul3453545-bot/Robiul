export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  accentColor: string;
  iconName: 'search' | 'trending' | 'share' | 'target';
}

export interface WorkItem {
  id: string;
  category: string;
  title: string;
  metric: string;
  description: string;
  bars: [number, number, number];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const SITE_CONTENT = {
  brand: {
    prefix: 'ROB',
    highlight: 'ICONIC',
    suffix: 'DIGITAL',
    iconPath: '/logo-icon.png',
    fullLogoPath: '/logo-full.png',
  },
  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    kicker: 'Digital marketing agency in Dhaka',
    headlineStart: 'Grow your business on ',
    headlineAccent: 'Google',
    headlineEnd: ' and social media',
    lead: 'Robiconic Digital helps businesses get found, get more leads and get more sales with SEO, SEM, social media marketing and Google Ads.',
    primaryCta: 'Get a free consultation',
    secondaryCta: 'See our services',
    navCta: 'Get a free quote',
  },
  stats: [
    { value: 100, suffix: '+', label: 'Projects delivered' },
    { value: 3, suffix: 'x', label: 'Average return on ad spend' },
    { value: 50, suffix: '+', label: 'Happy clients' },
    { value: 24, suffix: '/7', label: 'Campaign monitoring' },
  ] satisfies StatItem[],
  servicesTitle: 'Our services',
  servicesIntro: 'Everything you need to get found on Google and win customers online.',
  services: [
    {
      id: 'seo',
      number: '01',
      title: 'SEO',
      description:
        'Search Engine Optimization to rank your website higher on Google and bring steady organic traffic.',
      accentColor: '#1a3c8e',
      iconName: 'search',
    },
    {
      id: 'sem',
      number: '02',
      title: 'SEM',
      description:
        'Search Engine Marketing that puts your business in front of people actively searching for your services.',
      accentColor: '#f8701a',
      iconName: 'trending',
    },
    {
      id: 'smm',
      number: '03',
      title: 'SMM',
      description:
        'Social Media Marketing to grow your brand and engage customers on Facebook, Instagram, LinkedIn and more.',
      accentColor: '#0c77bb',
      iconName: 'share',
    },
    {
      id: 'google-ads',
      number: '04',
      title: 'Google Ads campaigns',
      description:
        'Data-driven Google Ads campaigns built to bring qualified leads and sales for every taka you spend.',
      accentColor: '#1ea5e8',
      iconName: 'target',
    },
  ] satisfies ServiceItem[],
  workTitle: 'Our work',
  workIntro: 'Campaign results structured around measurable revenue, calls, and qualified leads.',
  work: [
    {
      id: 'ecommerce',
      category: 'E-commerce',
      metric: '+185% online orders in 90 days',
      title: 'Sales growth campaign',
      description: 'Technical SEO and high-intent Google Shopping ads to scale online orders.',
      bars: [40, 70, 100],
    },
    {
      id: 'local',
      category: 'Local business',
      metric: '3.4x inbound calls & map visits',
      title: 'More local customers',
      description: 'Local SEO, Google Business Profile optimization, and targeted social ads.',
      bars: [52, 80, 94],
    },
    {
      id: 'startup',
      category: 'Startup',
      metric: '-42% cost per qualified lead',
      title: 'Lead generation funnel',
      description: 'Search campaign paired with a fast, conversion-focused landing page.',
      bars: [64, 90, 88],
    },
  ] satisfies WorkItem[],
  processTitle: 'How we work',
  processIntro: 'A clear, repeatable workflow from discovery call to monthly optimization.',
  steps: [
    {
      number: '01',
      title: 'Discovery',
      description: 'We learn your business model, revenue goals, and target audience.',
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'We build a custom channel plan with measurable KPI targets.',
    },
    {
      number: '03',
      title: 'Execution',
      description: 'We launch, track, and manage your SEO and paid ad campaigns.',
    },
    {
      number: '04',
      title: 'Optimise',
      description: 'We refine bids, keywords, and creatives to improve ROI every month.',
    },
  ] satisfies ProcessStep[],
  contactTitle: 'Talk to us',
  contactIntro: 'Tell us about your business and we will reply within 24 hours.',
  contact: {
    web: 'robiconicdigital.com',
    email: 'robiconicdigital@gmail.com',
    location: 'Dhaka, Bangladesh',
  },
};
