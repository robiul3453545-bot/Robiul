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

export interface SiteContent {
  brand: {
    prefix: string;
    highlight: string;
    suffix: string;
    iconPath: string;
    fullLogoPath: string;
  };
  navLinks: Array<{ label: string; href: string }>;
  hero: {
    kicker: string;
    headlineStart: string;
    headlineAccent: string;
    headlineEnd: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    navCta: string;
  };
  stats: StatItem[];
  servicesTitle: string;
  servicesIntro: string;
  services: ServiceItem[];
  workTitle: string;
  workIntro: string;
  work: WorkItem[];
  processTitle: string;
  processIntro: string;
  steps: ProcessStep[];
  contactTitle: string;
  contactIntro: string;
  contactForm: {
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    serviceLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    servicePlaceholder: string;
    messagePlaceholder: string;
    submitButton: string;
    submittingButton: string;
    successTitle: string;
    successMessage: string;
    openEmailButton: string;
    sendAnotherButton: string;
    confirmNote: string;
  };
  contact: {
    web: string;
    email: string;
    location: string;
  };
  footer: {
    rights: string;
    lightTheme: string;
    darkTheme: string;
  };
}

export const SITE_CONTENT_EN: SiteContent = {
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
    kicker: 'Leading Digital Marketing Agency in Dhaka',
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
  ],
  servicesTitle: 'Our services',
  servicesIntro: 'Everything you need to get found on Google and win customers online.',
  services: [
    {
      id: 'seo',
      number: '01',
      title: 'SEO',
      description: 'Search Engine Optimization to rank your website higher on Google and bring steady organic traffic.',
      accentColor: '#1a3c8e',
      iconName: 'search',
    },
    {
      id: 'sem',
      number: '02',
      title: 'SEM',
      description: 'Search Engine Marketing that puts your business in front of people actively searching for your services.',
      accentColor: '#f8701a',
      iconName: 'trending',
    },
    {
      id: 'smm',
      number: '03',
      title: 'SMM',
      description: 'Social Media Marketing to grow your brand and engage customers on Facebook, Instagram, LinkedIn and more.',
      accentColor: '#0c77bb',
      iconName: 'share',
    },
    {
      id: 'google-ads',
      number: '04',
      title: 'Google Ads campaigns',
      description: 'Data-driven Google Ads campaigns built to bring qualified leads and sales for every taka you spend.',
      accentColor: '#1ea5e8',
      iconName: 'target',
    },
  ],
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
  ],
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
  ],
  contactTitle: 'Talk to us',
  contactIntro: 'Tell us about your business and we will reply within 24 hours.',
  contactForm: {
    nameLabel: 'Your name',
    emailLabel: 'Your email address',
    phoneLabel: 'Phone or WhatsApp',
    serviceLabel: 'Service you need',
    messageLabel: 'About your business',
    namePlaceholder: 'Your full name',
    emailPlaceholder: 'you@example.com',
    phonePlaceholder: '+880 1XXX-XXXXXX',
    servicePlaceholder: 'SEO, Google Ads, Social Media...',
    messagePlaceholder: 'Share your website URL, monthly goals, or target market...',
    submitButton: 'Send message',
    submittingButton: 'Sending message...',
    successTitle: 'Thank you! Message Sent Successfully',
    successMessage: 'Your enquiry has been delivered directly to robiconicdigital@gmail.com and a confirmation has been sent to your email.',
    openEmailButton: 'Open Email App',
    sendAnotherButton: 'Send Another Message',
    confirmNote: 'We will contact you within 24 hours via Phone or WhatsApp.',
  },
  contact: {
    web: 'robiconicdigital.com',
    email: 'robiconicdigital@gmail.com',
    location: 'Dhaka, Bangladesh',
  },
  footer: {
    rights: 'All rights reserved.',
    lightTheme: 'Light theme',
    darkTheme: 'Dark theme',
  },
};

export const SITE_CONTENT_BN: SiteContent = {
  brand: {
    prefix: 'ROB',
    highlight: 'ICONIC',
    suffix: 'DIGITAL',
    iconPath: '/logo-icon.png',
    fullLogoPath: '/logo-full.png',
  },
  navLinks: [
    { label: 'হোম', href: '#home' },
    { label: 'সার্ভিসসমূহ', href: '#services' },
    { label: 'পোর্টফোলিও', href: '#work' },
    { label: 'কাজের পদ্ধতি', href: '#process' },
    { label: 'যোগাযোগ', href: '#contact' },
  ],
  hero: {
    kicker: 'ঢাকায় বিশ্বমানের ডিজিটাল মার্কেটিং এজেন্সি',
    headlineStart: 'আপনার ব্যবসাকে বড় করুন ',
    headlineAccent: 'গুগল',
    headlineEnd: ' ও সোশ্যাল মিডিয়ার মাধ্যমে',
    lead: 'রবিকনিক ডিজিটাল আপনাকে অনলাইনে গ্রাহকদের কাছে পৌঁছাতে, মানসম্মত লিড বৃদ্ধি করতে এবং বিক্রয় বাড়াতে এসইও, এসইএম, সোশ্যাল মিডিয়া মার্কেটিং ও গুগল অ্যাডস সেবা দেয়।',
    primaryCta: 'ফ্রি কনসালটেশন নিন',
    secondaryCta: 'আমাদের সার্ভিসসমূহ',
    navCta: 'ফ্রি কোটেশন নিন',
  },
  stats: [
    { value: 100, suffix: '+', label: 'সফল প্রজেক্ট ডেলিভারি' },
    { value: 3, suffix: 'x', label: 'গড় রিটার্ন অন অ্যাড স্পেন্ড (ROAS)' },
    { value: 50, suffix: '+', label: 'সন্তুষ্ট ক্লায়েন্ট' },
    { value: 24, suffix: '/7', label: 'সার্বক্ষণিক ক্যাম্পেইন মনিটরিং' },
  ],
  servicesTitle: 'আমাদের সেবাসমূহ',
  servicesIntro: 'গুগলে সবার শীর্ষে পৌঁছাতে এবং অনলাইনের নতুন কাস্টমার আকর্ষণ করতে যা কিছু প্রয়োজন।',
  services: [
    {
      id: 'seo',
      number: '০১',
      title: 'এসইও (SEO)',
      description: 'গুগল সার্চে আপনার ওয়েবসাইটকে সবার উপরে রাখতে এবং নিয়মিত অর্গানিক ট্রাফিক পেতে সার্চ ইঞ্জিন অপ্টিমাইজেশন।',
      accentColor: '#1a3c8e',
      iconName: 'search',
    },
    {
      id: 'sem',
      number: '০২',
      title: 'এসইএম (SEM)',
      description: 'যারা গুগলে আপনার সার্ভিসগুলো সক্রিয়ভাবে খুঁজছেন সরাসরি তাদের সামনে আপনার ব্যবসা তুলে ধরার সার্চ মার্কেটিং।',
      accentColor: '#f8701a',
      iconName: 'trending',
    },
    {
      id: 'smm',
      number: '০৩',
      title: 'সোশ্যাল মিডিয়া মার্কেটিং (SMM)',
      description: 'ফেসবুক, ইনস্টাগ্রাম ও লিঙ্কডইনে আপনার ব্র্যান্ডের পরিচিতি বাড়াতে এবং কাস্টমারদের সাথে সুসম্পর্ক তৈরি করতে।',
      accentColor: '#0c77bb',
      iconName: 'share',
    },
    {
      id: 'google-ads',
      number: '০৪',
      title: 'গুগল অ্যাডস ক্যাম্পেইন',
      description: 'আপনার প্রতিটা টাকার সর্বোচ্চ মুনাফা নিশ্চিত করতে ডেটা-ভিত্তিক গুগল অ্যাডস ক্যাম্পেইন ও লিড জেনারেশন।',
      accentColor: '#1ea5e8',
      iconName: 'target',
    },
  ],
  workTitle: 'আমাদের সফল ফলাফল',
  workIntro: 'পরিমাপযোগ্য রাজস্ব বৃদ্ধি, কাস্টমার কল এবং কোয়ালিফাইড লিড তৈরির বাস্তব ফলাফল।',
  work: [
    {
      id: 'ecommerce',
      category: 'ই-কমার্স',
      metric: '৯০ দিনে +১৮৫% বেশি অনলাইন অর্ডার',
      title: 'সেলস গ্রোথ ক্যাম্পেইন',
      description: 'টেকনিক্যাল এসইও এবং গুগল শপিং বিজ্ঞাপনের সাহায্যে বিক্রয় বহুগুণে বৃদ্ধি।',
      bars: [40, 70, 100],
    },
    {
      id: 'local',
      category: 'লোকাল ব্যবসা',
      metric: '৩.৪ গুণ বেশি কল ও ম্যাপ ভিজিট',
      title: 'লোকাল কাস্টমার গ্রোথ',
      description: 'লোকাল এসইও, গুগল বিজনেস প্রোফাইল অপ্টিমাইজেশন এবং টার্গেটেড সোশ্যাল বিজ্ঞাপন।',
      bars: [52, 80, 94],
    },
    {
      id: 'startup',
      category: 'স্টার্টআপ',
      metric: '-৪২% কম খরচে কোয়ালিফাইড লিড',
      title: 'লিড জেনারেশন ফানেল',
      description: 'উচ্চ কনভার্সন-বান্ধব ল্যান্ডিং পেজ এবং সুনির্দিষ্ট সার্চ ক্যাম্পেইনের যুগলবন্দী।',
      bars: [64, 90, 88],
    },
  ],
  processTitle: 'আমরা যেভাবে কাজ করি',
  processIntro: 'প্রথম আলোচনা থেকে শুরু করে প্রতি মাসের ক্যাম্পেইন অপ্টিমাইজেশন পর্যন্ত স্বচ্ছ কাজের ধাপ।',
  steps: [
    {
      number: '০১',
      title: 'ডিসকভারি ও অডিট',
      description: 'আমরা আপনার ব্যবসার মডেল, রাজস্ব লক্ষ্য এবং টার্গেট কাস্টমারদের গভীরভাবে বুঝি।',
    },
    {
      number: '০২',
      title: 'কাস্টম স্ট্র্যাটেজি',
      description: 'আমরা সুনির্দিষ্ট লক্ষ্য ও কেপিআই (KPI) নির্ধারণ করে পরিকল্পনা তৈরি করি।',
    },
    {
      number: '০৩',
      title: 'ক্যাম্পেইন এক্সিকিউশন',
      description: 'আমরা আপনার এসইও ও পেইড অ্যাড ক্যাম্পেইন চালু করি ও ট্র্যাকিং সেটআপ করি।',
    },
    {
      number: '০৪',
      title: 'নিয়মিত অপ্টিমাইজেশন',
      description: 'প্রতি মাসে আরও ভালো রেজাল্ট নিশ্চিত করতে বিড, কি-ওয়ার্ড ও বিজ্ঞাপন কন্টেন্ট অপ্টিমাইজ করি।',
    },
  ],
  contactTitle: 'আমাদের সাথে যোগাযোগ করুন',
  contactIntro: 'আপনার ব্যবসার পরিকল্পনা আমাদের জানান, আমরা ২৪ ঘণ্টার মধ্যে উত্তর দেব।',
  contactForm: {
    nameLabel: 'আপনার নাম',
    emailLabel: 'আপনার ইমেইল এড্রেস',
    phoneLabel: 'ফোন অথবা হোয়াটসঅ্যাপ নম্বর',
    serviceLabel: 'আপনার প্রয়োজনীয় সার্ভিস',
    messageLabel: 'আপনার ব্যবসা সম্পর্কে সংক্ষেপে লিখুন',
    namePlaceholder: 'আপনার পুরো নাম',
    emailPlaceholder: 'you@example.com',
    phonePlaceholder: '+880 1XXX-XXXXXX',
    servicePlaceholder: 'এসইও, গুগল অ্যাডস, সোশ্যাল মিডিয়া...',
    messagePlaceholder: 'আপনার ওয়েবসাইটের লিংক, মাসিক লক্ষ্য বা টার্গেট মার্কেট জানান...',
    submitButton: 'মেসেজ পাঠান',
    submittingButton: 'মেসেজ পাঠানো হচ্ছে...',
    successTitle: 'ধন্যবাদ! আপনার মেসেজটি সফলভাবে পাঠানো হয়েছে',
    successMessage: 'আপনার বার্তাটি সরাসরি robiconicdigital@gmail.com এ পৌঁছেছে এবং আপনার ইমেইলে একটি কনফার্মেশন পাঠানো হয়েছে।',
    openEmailButton: 'ইমেইল অ্যাপ খুলুন',
    sendAnotherButton: 'আরেকটি মেসেজ পাঠান',
    confirmNote: 'আমরা ২৪ ঘণ্টার মধ্যে আপনার ফোন বা হোয়াটসঅ্যাপে যোগাযোগ করব।',
  },
  contact: {
    web: 'robiconicdigital.com',
    email: 'robiconicdigital@gmail.com',
    location: 'ঢাকা, বাংলাদেশ',
  },
  footer: {
    rights: 'সর্বস্বত্ব সংরক্ষিত।',
    lightTheme: 'লাইট থিম',
    darkTheme: 'ডার্ক থিম',
  },
};

// Default export
export const SITE_CONTENT = SITE_CONTENT_BN;
