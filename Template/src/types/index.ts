// ─── Business Type ────────────────────────────────────────────────────────────

export type BusinessType =
  | 'generic'
  | 'restaurant'
  | 'salon'
  | 'gym'
  | 'cleaning'
  | 'auto'
  | 'clinic'
  | 'photography'
  | 'coaching'
  | 'hotel'
  | 'retail'

// ─── Theme ────────────────────────────────────────────────────────────────────

export type SectionStyle = 'minimal' | 'bold' | 'soft' | 'luxury' | 'industrial'

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  bg: string;
  bgAlt: string;
  surface: string;
  border: string;
  text: string;
  textMuted: string;
  textInverse: string;
}

export interface ThemeFonts {
  sans: string;
  heading: string;
  /** Full Google Fonts <link> href — injected at runtime */
  googleFontUrl?: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  fonts: ThemeFonts;
  radius: string;        // CSS value e.g. "0.5rem"
  sectionStyle: SectionStyle;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavDropdownItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  /** Optional children for dropdown menus */
  children?: NavDropdownItem[];
}

// ─── Social / Contact ─────────────────────────────────────────────────────────

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'linkedin' | 'tiktok' | string;
  url: string;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  mapEmbedUrl?: string;
}

// ─── Business / Brand ─────────────────────────────────────────────────────────

export interface BusinessInfo {
  name: string;
  tagline?: string;
  logoUrl?: string;
  logoText?: string;  // text fallback when no image logo
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export interface HeroSlide {
  imageUrl: string;
  imageAlt: string;
}

export interface HeroContent {
  headline: string;
  subheadline?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  slides: HeroSlide[];
  autoPlayInterval?: number;  // ms, default 5000
}

// ─── Services ─────────────────────────────────────────────────────────────────

export type ServicesVariant = 'services' | 'courses' | 'rooms' | 'products'

export interface ServiceItem {
  id: string;
  icon?: string;           // lucide icon name
  title: string;
  description: string;
  href?: string;
  /** Used in rooms/products/courses variants */
  imageUrl?: string;
  price?: string;          // e.g. "$49" or "$99 / night"
  tags?: string[];         // amenities, categories, etc.
  duration?: string;       // e.g. "60 min"
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export interface ServicesContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  variant?: ServicesVariant;
  items: ServiceItem[];
}

// ─── About ────────────────────────────────────────────────────────────────────

export interface TrustStat {
  value: string;     // e.g. "10+"
  label: string;     // e.g. "Years Experience"
}

export interface AboutContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  body: string;
  imageUrl: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  stats?: TrustStat[];
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

export interface CTABannerContent {
  headline: string;
  subtext?: string;
  cta: { label: string; href: string };
  variant?: 'primary' | 'accent' | 'dark';
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role?: string;
  photoUrl?: string;
  rating?: number;   // 1-5
}

export interface TestimonialsContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  items: TestimonialItem[];
  autoPlayInterval?: number;
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export interface GalleryItem {
  id: string;
  imageUrl: string;
  thumbUrl?: string;
  alt: string;
  caption?: string;
}

export type GalleryMode = 'grid' | 'portfolio'

export interface GalleryContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  mode?: GalleryMode;
  items: GalleryItem[];
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  items: FAQItem[];
}

// ─── Partners ─────────────────────────────────────────────────────────────────

export interface PartnerItem {
  id: string;
  name: string;
  logoUrl: string;
  href?: string;
}

export interface PartnersContent {
  sectionTitle?: string;
  items: PartnerItem[];
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;     // e.g. "/ month"
  description?: string;
  features: PricingFeature[];
  cta: { label: string; href: string };
  featured?: boolean;
}

export interface PricingContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  plans: PricingPlan[];
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export interface ContactContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  apiEndpoint: string;
}

// ─── Booking ──────────────────────────────────────────────────────────────────

export interface BookingService {
  id: string;
  label: string;
}

export type ExternalProviderType = 'calendly' | 'simplybook' | 'iframe'

export interface BookingContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  services: BookingService[];
  apiEndpoint: string;
  /** When set, renders an iframe instead of the internal form */
  externalProvider?: {
    type: ExternalProviderType;
    url: string;
    height?: number;  // px, default 600
  };
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string;
  socialLinks?: SocialLink[];
}

export interface TeamContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  layout?: 'grid' | 'carousel';
  items: TeamMember[];
}

// ─── Menu ─────────────────────────────────────────────────────────────────────

export type MenuDietaryTag = 'vegan' | 'vegetarian' | 'glutenFree' | 'spicy' | 'nuts' | 'dairy'

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: string;
  tags?: MenuDietaryTag[];
  imageUrl?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  items: MenuItem[];
}

export interface MenuContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  categories: MenuCategory[];
}

// ─── Schedule ─────────────────────────────────────────────────────────────────

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export type ClassLevel = 'beginner' | 'intermediate' | 'advanced'

export interface ScheduleClass {
  id: string;
  name: string;
  trainer?: string;
  day: DayOfWeek;
  time: string;       // e.g. "9:00 AM"
  duration: string;   // e.g. "60 min"
  level?: ClassLevel;
  href?: string;      // link to booking or class detail
}

export interface ScheduleContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  classes: ScheduleClass[];
}

// ─── Opening Hours ────────────────────────────────────────────────────────────

export type DayHours = { open: string; close: string } | 'closed'

export interface OpeningHoursContent {
  sectionTitle: string;
  /** Optional alert banner above hours table */
  holidayNotice?: string;
  days: Record<DayOfWeek, DayHours>;
}

// ─── Before / After ───────────────────────────────────────────────────────────

export interface BeforeAfterPair {
  id: string;
  beforeUrl: string;
  afterUrl: string;
  caption?: string;
}

export interface BeforeAfterContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  pairs: BeforeAfterPair[];
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export interface FooterLinkGroup {
  heading: string;
  links: { label: string; href: string }[];
}

export interface FooterContent {
  linkGroups: FooterLinkGroup[];
  copyrightText?: string;   // e.g. "© 2026 BusinessName. All rights reserved."
  legalLinks?: { label: string; href: string }[];
}

// ─── Section visibility flags ─────────────────────────────────────────────────

export interface SectionFlags {
  hero: boolean;
  services: boolean;
  about: boolean;
  ctaBanner: boolean;
  testimonials: boolean;
  gallery: boolean;
  faq: boolean;
  partners: boolean;
  pricing: boolean;
  booking: boolean;
  contact: boolean;
  map: boolean;
  // New sections
  team: boolean;
  menu: boolean;
  schedule: boolean;
  openingHours: boolean;
  beforeAfter: boolean;
}

// ─── SEO ──────────────────────────────────────────────────────────────────────

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

// ─── Root SiteConfig ──────────────────────────────────────────────────────────

export interface SiteConfig {
  /** Optional remote URL to fetch config JSON from (overrides local) */
  apiConfigUrl?: string;

  /** Drives section defaults, ordering, and theme preset */
  businessType?: BusinessType;

  /** Partial theme overrides — merged on top of the businessType preset */
  theme?: Partial<ThemeConfig>;

  /**
   * Explicit order and set of sections to render.
   * If omitted, the businessType preset order is used.
   * Any section listed here must also have `sections[key]: true` to render.
   */
  sectionOrder?: Array<keyof SectionFlags>;

  business: BusinessInfo;
  nav: {
    items: NavItem[];
    ctaButton: { label: string; href: string };
  };
  seo: SEOConfig;
  sections: SectionFlags;
  content: {
    hero: HeroContent;
    services: ServicesContent;
    about: AboutContent;
    ctaBanner: CTABannerContent;
    testimonials: TestimonialsContent;
    gallery: GalleryContent;
    faq: FAQContent;
    partners: PartnersContent;
    pricing: PricingContent;
    booking: BookingContent;
    contact: ContactContent;
    footer: FooterContent;
    // New sections
    team?: TeamContent;
    menu?: MenuContent;
    schedule?: ScheduleContent;
    openingHours?: OpeningHoursContent;
    beforeAfter?: BeforeAfterContent;
  };
}
