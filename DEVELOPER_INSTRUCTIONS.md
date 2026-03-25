# SMB Website Template — Developer Instructions

A generic, fully reusable React + TypeScript website template for small-to-medium businesses.
Swap content, images, colours, and toggled sections to deploy for any business type
(gym, dance academy, bookshop, clinic, salon, etc.) without touching source code.

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Project Structure](#2-project-structure)
3. [Getting Started](#3-getting-started)
4. [Configuration — siteConfig.json](#4-configuration--siteconfigjson)
5. [Brand Colours & Design Tokens](#5-brand-colours--design-tokens)
6. [Sections Reference](#6-sections-reference)
7. [Adding / Removing Sections](#7-adding--removing-sections)
8. [Forms & API Endpoints](#8-forms--api-endpoints)
9. [Remote Config (API Override)](#9-remote-config-api-override)
10. [SEO](#10-seo)
11. [Component Library](#11-component-library)
12. [Icons](#12-icons)
13. [Routing](#13-routing)
14. [Build & Deployment](#14-build--deployment)
15. [Adapting for a New Business](#15-adapting-for-a-new-business)
16. [Business Type System](#16-business-type-system)
17. [New Sections Reference](#17-new-sections-reference)
18. [Known Gotchas](#18-known-gotchas)

---

## 1. Tech Stack

| Layer | Library / Version |
|---|---|
| Framework | React 19 + Vite 8 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` — no config file) |
| UI Primitives | Radix UI (accordion, dialog, select, toast, label, tabs, slot) |
| Component Patterns | Shadcn/ui style — manual install, `cn()` + CVA |
| Forms | react-hook-form + zod + @hookform/resolvers |
| HTTP | axios |
| Icons | lucide-react v1.7.0 (curated map) + custom SVG for social icons |
| Routing | react-router-dom v7 — BrowserRouter |
| SEO | react-helmet-async |
| Path Alias | `@/` → `./src/` |

---

## 2. Project Structure

```
src/
├── App.tsx                   # Root — router, layout, all section rendering
├── index.css                 # Tailwind v4 import + CSS custom properties (brand tokens)
├── main.tsx                  # React DOM entry
│
├── assets/                   # Static assets imported by JS (logo, etc.)
│
├── components/
│   ├── BackToTop.tsx         # Floating scroll-to-top button
│   ├── Container.tsx         # Max-width centring wrapper
│   ├── Footer.tsx            # Dark multi-column footer
│   ├── Header.tsx            # Sticky transparent→opaque nav, mobile drawer
│   ├── Layout.tsx            # Root wrapper with ToastProvider
│   ├── SEOHead.tsx           # <Helmet> — title, description, OG, Twitter Card
│   └── ui/
│       ├── accordion.tsx     # Radix Accordion
│       ├── button.tsx        # CVA button variants
│       ├── dialog.tsx        # Radix Dialog (modal)
│       ├── form-fields.tsx   # Label, Input, Textarea
│       ├── select.tsx        # Radix Select
│       ├── social-icons.tsx  # Inline SVG brand icons + getSocialIcon()
│       └── toast.tsx         # Radix Toast
│
├── data/
│   └── siteConfig.json       # ← SINGLE SOURCE OF TRUTH for all content
│
├── hooks/
│   ├── useConfig.ts          # Loads siteConfig.json; merges preset + remote override
│   ├── useTheme.ts           # Injects CSS vars from ThemeConfig into :root (prevents FOUC)
│   ├── useScrolled.ts        # Returns true when window.scrollY > threshold
│   └── useToast.ts           # Toast state manager
│
├── lib/
│   ├── getLucideIcon.ts      # Maps icon name string → lucide-react component
│   ├── mergeConfig.ts        # Three-layer config merge (preset → local → remote)
│   ├── smoothScroll.ts       # Scroll to #anchor with sticky-header offset
│   └── utils.ts              # cn() = clsx + tailwind-merge
│
├── presets/
│   ├── themes.ts             # ThemeConfig for all 11 business types
│   ├── businessTypes.ts      # Default section flags + order per business type
│   └── configs/              # Ready-to-use siteConfig.json starters
│       ├── restaurant.json
│       ├── salon.json
│       ├── gym.json
│       ├── cleaning.json
│       ├── auto.json
│       ├── clinic.json
│       ├── photography.json
│       ├── coaching.json
│       ├── hotel.json
│       └── retail.json
│
├── sections/
│   ├── HeroSection.tsx       # Full-screen carousel
│   ├── ServicesSection.tsx   # Card grid — icon/course/room/product variants
│   ├── AboutSection.tsx      # Two-column image + text + stats
│   ├── CTABannerSection.tsx  # Full-width call-to-action banner
│   ├── TestimonialsSection.tsx # Auto-scroll testimonial slider
│   ├── GallerySection.tsx    # Photo grid + lightbox | portfolio mode
│   ├── FAQSection.tsx        # Accordion FAQ
│   ├── PartnersSection.tsx   # Greyscale → colour logo strip
│   ├── PricingSection.tsx    # 3-tier pricing cards
│   ├── BookingSection.tsx    # Form or external provider iframe (lazy-loaded)
│   ├── ContactSection.tsx    # Contact info + message form (lazy-loaded)
│   ├── MapSection.tsx        # Google Maps iframe embed
│   ├── TeamSection.tsx       # Team member grid with photos and social links
│   ├── MenuSection.tsx       # Tabbed menu categories with dietary tags
│   ├── ScheduleSection.tsx   # Class schedule with day filter + level badges
│   ├── OpeningHoursSection.tsx # Weekly hours table — today highlighted
│   └── BeforeAfterSection.tsx  # Drag-slider image comparison
│
└── types/
    └── index.ts              # All TypeScript interfaces for the entire config shape
```

---

## 3. Getting Started

```bash
# Install dependencies
npm install

# Start development server (default port 5173)
npm run dev

# Type-check without building
npx tsc --noEmit

# Production build (output → dist/)
npm run build

# Preview production build locally
npm run preview
```

---

## 4. Configuration — siteConfig.json

**File:** `src/data/siteConfig.json`

This is the **only file** you need to edit to customise content for a new business.
No React or TypeScript knowledge is required for basic customisation.

### Top-level keys

| Key | Purpose |
|---|---|
| `apiConfigUrl` | Optional URL to fetch a remote JSON config (overrides local). Leave `""` to use local file. |
| `business` | Business name, tagline, logo, contact info, social links |
| `nav` | Navigation items (supports one level of dropdown children) + CTA button |
| `seo` | Page title, meta description, keywords, OG image URL, canonical URL |
| `sections` | Boolean flags to show/hide each section |
| `content` | All section text, images, and data |

### `sections` flags — show or hide any section

```jsonc
"sections": {
  "hero":         true,   // Full-screen hero carousel
  "services":     true,   // Service / course / room / product cards
  "about":        true,   // About us image + text
  "ctaBanner":    true,   // Mid-page call-to-action strip
  "testimonials": true,   // Customer quotes slider
  "gallery":      true,   // Photo gallery grid or portfolio mode
  "faq":          true,   // Accordion FAQ
  "partners":     true,   // Partner / certification logos
  "pricing":      true,   // Pricing plan cards
  "booking":      true,   // Appointment booking form or external iframe
  "contact":      true,   // Contact form + info
  "map":          true,   // Google Maps embed
  "team":         false,  // Team member grid (new)
  "menu":         false,  // Tabbed restaurant/café menu (new)
  "schedule":     false,  // Class / session schedule (new)
  "openingHours": false,  // Weekly opening hours table (new)
  "beforeAfter":  false   // Drag-slider image comparison pairs (new)
}
```

Set any flag to `false` to completely exclude that section from the rendered page and the build.

---

## 5. Brand Colours & Design Tokens

All colours and design variables live in `src/index.css` as CSS custom properties.
**Change these to rebrand the entire site** — no component edits needed.

```css
:root {
  /* ── Primary brand colour ──────────────────── */
  --color-primary:         #2563eb;   /* Buttons, links, accents */
  --color-primary-light:   #3b82f6;
  --color-primary-dark:    #1d4ed8;

  /* ── Secondary colour ──────────────────────── */
  --color-secondary:       #7c3aed;
  --color-secondary-light: #8b5cf6;
  --color-secondary-dark:  #6d28d9;

  /* ── Accent (highlights, stars, badges) ────── */
  --color-accent:          #f59e0b;
  --color-accent-light:    #fbbf24;
  --color-accent-dark:     #d97706;

  /* ── Backgrounds ───────────────────────────── */
  --color-bg:              #ffffff;   /* Main page background */
  --color-bg-alt:          #f8fafc;   /* Alternate section background */
  --color-surface:         #f1f5f9;   /* Cards, inputs */
  --color-border:          #e2e8f0;   /* All borders */

  /* ── Text ──────────────────────────────────── */
  --color-text:            #0f172a;   /* Headings, body copy */
  --color-text-muted:      #64748b;   /* Subtitles, labels */
  --color-text-inverse:    #ffffff;   /* Text on dark backgrounds */

  /* ── Typography ────────────────────────────── */
  --font-sans:    "Inter", system-ui, sans-serif;
  --font-heading: "Inter", system-ui, sans-serif;

  /* ── Spacing & shape ───────────────────────── */
  --section-padding-y: 5rem;
  --container-max: 1280px;
  --container-px:  1.5rem;
  --radius:        0.5rem;
  --radius-lg:     1rem;
}
```

### Dark mode

To add a dark theme, add a `[data-theme="dark"]` or `.dark` block and override the same variables.
No component changes are needed — all colours are consumed via the token names above.

---

## 6. Sections Reference

### HeroSection
- **Config path:** `content.hero`
- Full-screen carousel with auto-play, keyboard nav (←/→), dot indicators
- `slides` array — each slide requires `imageUrl` (1920 × 1080 px, full-bleed) and `imageAlt`
- Dual CTA buttons link to any `#anchor` or URL
- `autoPlayInterval` in milliseconds (default 5000)

### ServicesSection
- **Config path:** `content.services`
- Responsive card grid: 1 col → 2 col (sm) → 3 col (lg)
- Each card has `icon` (string from the lucide icon map), `title`, `description`, optional `href`
- See [Icons](#12-icons) for available icon names

### AboutSection
- **Config path:** `content.about`
- `imagePosition: "left" | "right"` controls which side the photo appears on desktop
- `stats` array — up to 4 trust statistics displayed in a row below the image on desktop
- Image: 800 × 600 px recommended

### CTABannerSection
- **Config path:** `content.ctaBanner`
- `variant: "primary" | "accent" | "dark"` sets the background colour scheme

### TestimonialsSection
- **Config path:** `content.testimonials`
- Slider auto-advances; pauses on hover
- Each item: `quote`, `name`, `role`, optional `photoUrl` (round avatar), optional `rating` (1–5)

### GallerySection
- **Config path:** `content.gallery`
- Click any image to open a full-screen lightbox with prev/next navigation and keyboard support
- Images should be square or near-square for a consistent grid

### FAQSection
- **Config path:** `content.faq`
- Uses the Radix Accordion — only one answer open at a time
- Add as many items as needed

### PartnersSection
- **Config path:** `content.partners`
- Logos displayed greyscale + faded; hover reveals full colour
- PNG with transparent background recommended (see [Images file](./IMAGES.md))

### PricingSection
- **Config path:** `content.pricing`
- `featured: true` on one plan highlights it with a ring, scale, and inverted colours
- `features` array: each feature has `text` (string) and `included` (boolean)

### BookingSection
- **Config path:** `content.booking`
- Fields: name, email, phone, service (from `services` array), date, time slot, notes
- On submit, POSTs JSON to `apiEndpoint`
- **Lazy-loaded** — only downloads its JS bundle when scrolled into view

### ContactSection
- **Config path:** `content.contact`
- Left column: phone / email / address pulled from `business.contactInfo`
- Right column: name, email, phone (optional), message form
- On submit, POSTs JSON to `apiEndpoint`
- **Lazy-loaded**

### MapSection
- **Config path:** `business.contactInfo.mapEmbedUrl`
- Paste the Google Maps embed URL here. The section is automatically hidden when the URL is empty.
- To get the embed URL: Google Maps → Share → Embed a map → copy the `src` value from the iframe code

---

## 7. Adding / Removing Sections

### Disable a section (simplest)

```jsonc
// src/data/siteConfig.json
"sections": {
  "gallery": false   // ← section is removed from the page
}
```

### Add a completely new section

1. Create `src/sections/MyNewSection.tsx` — accept a typed `content` prop
2. Add its interface to `src/types/index.ts`
3. Add placeholder content to `src/data/siteConfig.json` under `content`
4. Add a boolean flag to `sections` in the config
5. Import and render it in `src/App.tsx` inside `SinglePage`, guarded by the flag

---

## 8. Forms & API Endpoints

Both `BookingSection` and `ContactSection` POST JSON to the URL in their `apiEndpoint` config field.

### Booking payload

```ts
{
  name:    string,
  email:   string,
  phone:   string,
  service: string,   // BookingService.id from the services array
  date:    string,   // YYYY-MM-DD
  time:    string,   // e.g. "10:00 AM"
  notes?:  string,
}
```

### Contact payload

```ts
{
  name:    string,
  email:   string,
  phone?:  string,
  message: string,
}
```

Both forms show a success state on `2xx` response and a user-friendly error message on failure.
Validation is enforced client-side with zod before any network request is made.

### Backend options

- **REST API:** set `apiEndpoint` to your own endpoint (e.g. `/api/bookings`)
- **Third-party services:** replace the `axios.post` call inside the section with a fetch to Formspree, EmailJS, Make.com webhook, etc.
- **Testing locally:** run `npm run dev` and point to a local mock server or use [mockoon](https://mockoon.com/)

---

## 9. Remote Config (API Override)

Set `apiConfigUrl` at the top of `siteConfig.json` to a URL that returns a JSON object
matching the `SiteConfig` shape. The `useConfig` hook fetches it on mount and merges it
over the local config. This lets you update content from a CMS or backend without redeploying.

```jsonc
{
  "apiConfigUrl": "https://api.yoursite.com/site-config"
}
```

The local `siteConfig.json` is always used as the initial / fallback value.

---

## 10. SEO

Configure in `siteConfig.json` under `seo`:

```jsonc
"seo": {
  "title":        "Business Name | Your Tagline",       // <title> tag
  "description":  "150-160 char summary for search results",
  "keywords":     "keyword1, keyword2, keyword3",
  "ogImage":      "/og-image.jpg",                      // place file in /public/
  "canonicalUrl": "https://www.yoursite.com"
}
```

`SEOHead` writes `<title>`, `<meta name="description">`, canonical `<link>`,
Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`),
and Twitter Card tags automatically.

**OG image:** create a `1200 × 630 px` image saved as `/public/og-image.jpg`.

---

## 11. Component Library

All components in `src/components/ui/` follow the Shadcn/ui pattern
(Radix primitive + `cn()` for className merging + CVA for variants).

### Button variants

```tsx
<Button variant="default">   // Primary filled
<Button variant="secondary"> // Secondary filled
<Button variant="accent">    // Accent/amber filled
<Button variant="outline">   // Bordered, transparent bg
<Button variant="ghost">     // No border or bg
<Button variant="link">      // Underlined text link

// Sizes
<Button size="sm">
<Button size="default">
<Button size="lg">
<Button size="icon">       // Square icon button
```

### Container

```tsx
<Container>         // max-w-[1280px] centred, px-6
<Container fluid>   // Full-width, px-6 only
```

### Toast

Toasts are managed globally via `useToast()`. Call from any component:

```ts
const { toast } = useToast()
toast({ title: 'Success', description: 'Your message', variant: 'success' })
// variants: 'default' | 'success' | 'destructive'
```

---

## 12. Icons

`src/lib/getLucideIcon.ts` maps a name string to a lucide-react icon component.
Use these names in `content.services[].icon` and anywhere you need a dynamic icon.

| Name | Icon |
|---|---|
| `Circle` | Generic circle |
| `Star` | Star / favourite |
| `Zap` | Lightning bolt / fast |
| `Shield` | Security / trust |
| `Heart` | Health / care |
| `Check` / `CheckCircle` | Done / verified |
| `Briefcase` | Business / work |
| `Clock` | Time / schedule |
| `Phone` / `Mail` / `MapPin` | Contact info |
| `Globe` | Website / global |
| `Users` | Team / community |
| `Award` | Achievement / quality |
| `Building` / `Store` / `Home` | Business premises |
| `Wrench` / `Settings` | Maintenance / config |
| `Camera` / `Image` / `Video` | Media |
| `Music` / `Play` | Entertainment |
| `CreditCard` / `DollarSign` / `Tag` | Payment / pricing |
| `ShoppingCart` / `ShoppingBag` / `Package` | Commerce |
| `Activity` / `Dumbbell` / `Bike` / `Flame` | Fitness / sport |
| `Leaf` / `Sparkles` | Eco / beauty |
| `ThumbsUp` / `MessageCircle` | Social / feedback |
| `BookOpen` / `GraduationCap` | Education |
| `Calendar` / `Bell` | Booking / notifications |
| `Info` | Information |

**Social icons** (used automatically by Footer from `business.socialLinks`):
`facebook`, `instagram`, `twitter`, `youtube`, `linkedin`, `tiktok`

These are custom inline SVGs in `src/components/ui/social-icons.tsx` because lucide-react v1 removed brand icons.

---

## 13. Routing

The template uses React Router `BrowserRouter`. The default setup is **single-page scroll navigation** — all `nav` hrefs are `#anchor` IDs.

### Adding a multi-page route

```tsx
// src/App.tsx — inside <Routes>
<Route path="/about"   element={<AboutPage />} />
<Route path="/services/:id" element={<ServiceDetailPage />} />
```

Smooth-scroll links still work for the home page. For deep links from other pages,
`smoothScroll.ts` falls back to native `window.location.hash` if the element is not found.

---

## 14. Build & Deployment

```bash
npm run build          # Compiles TypeScript, then Vite bundles to dist/
npm run preview        # Serve dist/ locally to verify before deploying
```

### Output chunks (approximate)

| Chunk | Size (gzip) | Notes |
|---|---|---|
| `index.js` | ~101 KB | Core app — everything except forms |
| `BookingSection.js` | ~24 KB | Lazy-loaded on scroll |
| `form-fields.js` | ~40 KB | Shared form lib (zod + react-hook-form) |
| `ContactSection.js` | ~2 KB | Lazy-loaded on scroll |
| `index.css` | ~7.5 KB | All styles |

### Deployment targets

- **Netlify / Vercel:** drag-and-drop `dist/` or connect the repo. Set build command to `npm run build` and publish directory to `dist`.
- **SPA routing:** add a rewrite rule so all paths serve `index.html`:
  - Netlify: add `public/_redirects` with `/* /index.html 200`
  - Vercel: add `vercel.json` with a rewrites rule
- **HTTPS:** required for `navigator.geolocation` and some browser security policies. Use Netlify/Vercel free TLS or Cloudflare.

---

## 15. Adapting for a New Business

Quick checklist when reusing this template for a new client:

- [ ] Edit `src/data/siteConfig.json`:
  - [ ] `business.name`, `tagline`, `logoUrl` / `logoText`
  - [ ] `business.contactInfo` — phone, email, address, `mapEmbedUrl`
  - [ ] `business.socialLinks` — update URLs, remove unused platforms
  - [ ] `nav.items` — adjust labels and hrefs as needed
  - [ ] `nav.ctaButton` — label and href
  - [ ] `seo` — title, description, keywords, `ogImage`, `canonicalUrl`
  - [ ] `sections` — disable any sections not needed
  - [ ] All `content.*` — replace placeholder text, names, prices, FAQ answers, etc.
  - [ ] `content.booking.apiEndpoint` and `content.contact.apiEndpoint`
- [ ] Replace images in `public/images/` (see [IMAGES.md](./IMAGES.md) for the full list)
- [ ] Update brand colours in `src/index.css` — change the CSS custom properties
- [ ] Update font: swap `"Inter"` in `index.css` and the `<link>` in `index.html` for the client's font
- [ ] Add `public/og-image.jpg` (1200 × 630 px)
- [ ] Add `public/favicon.ico` / `favicon.svg`
- [ ] Update `public/manifest.json` if targeting PWA

---

## 16. Business Type System

The template ships with a multi-business-type preset system.
Setting a single `businessType` field in `siteConfig.json` automatically applies a matching
colour theme, typography, and default section layout — with zero code changes.

### Setting the business type

```jsonc
// src/data/siteConfig.json
{
  "businessType": "restaurant"  // see table below for valid values
}
```

### Supported business types

| Value | Description |
|---|---|
| `"generic"` | Default — neutral blue theme, all sections optional |
| `"restaurant"` | Warm amber/terracotta, menu + openingHours on by default |
| `"salon"` | Soft rose + cream, team + beforeAfter on by default |
| `"gym"` | Dark steel + electric blue, schedule + team + openingHours on |
| `"cleaning"` | Fresh teal, beforeAfter + pricing prominent |
| `"auto"` | Dark charcoal + amber, beforeAfter + openingHours on |
| `"clinic"` | Clean white + navy, team + openingHours + pricing on |
| `"photography"` | Near-black + warm white, portfolio gallery mode on |
| `"coaching"` | Navy + gold, schedule + team + courses variant on |
| `"hotel"` | Off-white + deep gold (luxury), rooms variant on |
| `"retail"` | Clean white + sage green, products variant + openingHours on |

### Starter config files

Ready-to-use config files live in `src/presets/configs/`.
Copy any of them over `src/data/siteConfig.json` to get a fully-populated site for that type:

```
src/presets/configs/
├── restaurant.json
├── salon.json
├── gym.json
├── cleaning.json
├── auto.json
├── clinic.json
├── photography.json
├── coaching.json
├── hotel.json
└── retail.json
```

### How theming works

`src/presets/themes.ts` defines a `ThemeConfig` for each business type.
On mount, `useTheme(config)` (called in `App.tsx`) reads the resolved theme and writes
**16 CSS custom properties** directly to `:root` via `document.documentElement.style.setProperty()`.

This means:
- Theme changes take effect on the next render without a page reload
- A `<link id="template-google-font">` tag is injected/swapped automatically for Google Fonts
- All Tailwind utilities that reference `var(--color-*)` automatically pick up the new values

You can override individual theme values per-deployment in `siteConfig.json`:

```jsonc
{
  "businessType": "restaurant",
  "theme": {
    "colors": {
      "primary": "#c0392b"  // override just this one colour
    },
    "fonts": {
      "heading": "'Playfair Display', serif"
    }
  }
}
```

### Section order

The rendered order of sections is controlled by `sectionOrder`:

```jsonc
{
  "sectionOrder": ["hero","menu","gallery","openingHours","about","booking","contact","map"]
}
```

Each business type preset defines a sensible default order.
Override it in `siteConfig.json` for any deployment.

### How config merging works (`src/lib/mergeConfig.ts`)

`mergeConfig(local, remote?)` applies a three-layer merge:

```
1. Business type preset (sections + order + theme)
2. Local siteConfig.json (overrides preset)
3. Remote API config if apiConfigUrl is set (overrides local)
```

Only defined (non-null, non-undefined) values override lower layers,
so partial overrides are safe.

### Adding a new business type

1. Add the new value to the `BusinessType` union in `src/types/index.ts`
2. Add a `ThemeConfig` entry to `THEMES` in `src/presets/themes.ts`
3. Add a preset entry to `BUSINESS_PRESETS` in `src/presets/businessTypes.ts`
4. Create a starter config file in `src/presets/configs/<type>.json`

---

## 17. New Sections Reference

Five sections were added as part of the Business Type System.
They follow the same `<section> + <Container>` pattern as all other sections.

### TeamSection

**Config path:** `content.team` | **Toggle:** `sections.team`

```jsonc
"team": {
  "sectionTitle": "Our Team",
  "sectionSubtitle": "Optional subtitle",
  "layout": "grid",      // "grid" or "list" (grid is default)
  "items": [
    {
      "id": "t1",
      "name": "Jane Smith",
      "role": "Head Stylist",
      "bio": "Optional short bio text.",
      "photoUrl": "/images/team-1.jpg",       // optional — shows initials if absent
      "socialLinks": [                         // optional
        { "platform": "instagram", "url": "https://instagram.com/janesmith" }
      ]
    }
  ]
}
```

`socialLinks.platform` values: `"facebook"`, `"instagram"`, `"twitter"`, `"youtube"`, `"linkedin"`, `"tiktok"`

---

### MenuSection

**Config path:** `content.menu` | **Toggle:** `sections.menu`

```jsonc
"menu": {
  "sectionTitle": "Our Menu",
  "sectionSubtitle": "Optional",
  "categories": [
    {
      "id": "starters",
      "label": "Starters",       // ← use "label", NOT "name"
      "items": [
        {
          "id": "i1",
          "name": "Bruschetta",
          "description": "Toasted bread with tomato and basil.",
          "price": "$9",         // string — include currency symbol
          "tags": ["vegan"],     // optional: "vegan" | "vegetarian" | "glutenFree" | "spicy" | "nuts" | "dairy"
          "imageUrl": "/images/menu-bruschetta.jpg"  // optional
        }
      ]
    }
  ]
}
```

---

### ScheduleSection

**Config path:** `content.schedule` | **Toggle:** `sections.schedule`

```jsonc
"schedule": {
  "sectionTitle": "Class Schedule",
  "sectionSubtitle": "Optional",
  "classes": [
    {
      "id": "c1",
      "name": "Morning HIIT",
      "day": "mon",          // "mon"|"tue"|"wed"|"thu"|"fri"|"sat"|"sun"
      "time": "6:00 AM",
      "duration": "45 min",  // required string
      "trainer": "Alex P.",  // optional — use "trainer", NOT "instructor"
      "level": "intermediate", // optional: "beginner"|"intermediate"|"advanced"
      "href": "/class/hiit"  // optional booking link
    }
  ]
}
```

---

### OpeningHoursSection

**Config path:** `content.openingHours` | **Toggle:** `sections.openingHours`

```jsonc
"openingHours": {
  "sectionTitle": "Opening Hours",
  "holidayNotice": "Holiday hours may vary.",  // optional notice shown below table
  "days": {
    "mon": { "open": "9:00 AM", "close": "6:00 PM" },
    "tue": { "open": "9:00 AM", "close": "6:00 PM" },
    "wed": { "open": "9:00 AM", "close": "6:00 PM" },
    "thu": { "open": "9:00 AM", "close": "6:00 PM" },
    "fri": { "open": "9:00 AM", "close": "5:00 PM" },
    "sat": { "open": "10:00 AM","close": "4:00 PM" },
    "sun": "closed"           // ← the string "closed", not { "closed": true }
  }
}
```

Today's row is highlighted automatically with a ring and "Today" badge.
Note: this section has **no** `sectionSubtitle` field.

---

### BeforeAfterSection

**Config path:** `content.beforeAfter` | **Toggle:** `sections.beforeAfter`

```jsonc
"beforeAfter": {
  "sectionTitle": "See the Difference",
  "sectionSubtitle": "Drag the slider to compare.",
  "pairs": [
    {
      "id": "ba1",
      "beforeUrl": "/images/before-1.jpg",  // ← "beforeUrl", NOT "beforeImage"
      "afterUrl":  "/images/after-1.jpg",   // ← "afterUrl",  NOT "afterImage"
      "caption": "Kitchen deep clean"        // optional
    }
  ]
}
```

The comparison slider is fully keyboard-accessible (ArrowLeft / ArrowRight keys).

---

### Extended Sections

#### ServicesSection — variants

Add `"variant"` to `content.services` to change how service items are displayed:

```jsonc
"services": {
  "variant": "services",    // "services" (default icon cards)
                            // "courses"  (image + duration + level badge)
                            // "rooms"    (image + tags + price — for hotels)
                            // "products" (square image + price — for retail)
  "items": [ ... ]
}
```

Variant-specific item fields:
- `"courses"`: `imageUrl?`, `duration?` (string), `level?` (`"beginner"|"intermediate"|"advanced"`)
- `"rooms"` / `"products"`: `imageUrl?`, `price?` (string), `tags?` (string array)

#### GallerySection — portfolio mode

```jsonc
"gallery": {
  "mode": "portfolio",   // "grid" (default) | "portfolio"
  "items": [
    { "id": "g1", "imageUrl": "...", "alt": "...", "caption": "Project title" }
  ]
}
```

Portfolio mode renders alternating full-width image + caption rows instead of the square grid.
Add a `"caption"` string to each item for the text beside the image.

#### BookingSection — external provider

To embed an external booking system instead of the built-in form:

```jsonc
"booking": {
  "externalProvider": {
    "type": "calendly",         // "calendly" | "simplybook" | "iframe"
    "url": "https://calendly.com/yourbusiness/consult",
    "height": 700               // optional, defaults to 600
  }
}
```

When `externalProvider` is set the form is replaced with a sandboxed `<iframe>`.

---

## 18. Known Gotchas

### PowerShell file encoding (Windows dev machines)

PowerShell 5.1 defaults to **CP1252** encoding. Writing source files with `Set-Content`
can corrupt Unicode characters and cause Vite to throw `invalid UTF-8` errors.

**Always use the editor (VS Code) to create and edit files**, or use this PowerShell workaround:

```powershell
[System.IO.File]::WriteAllText(
  $path,
  $content,
  (New-Object System.Text.UTF8Encoding $false)
)
```

### lucide-react v1 — brand icons removed

`lucide-react` v1.7.0 removed all brand/social icons (Facebook, Instagram, Twitter, etc.).
These are provided as custom inline SVGs in `src/components/ui/social-icons.tsx`.
Do **not** try to import `FacebookIcon` etc. from lucide-react.

### Tailwind CSS v4 — no config file

This project uses Tailwind v4 with the `@import "tailwindcss"` approach.
There is **no** `tailwind.config.js`. Custom tokens are set as CSS variables in `index.css`
and referenced in Tailwind utilities via `@theme inline {}`.
Adding the v3 config file will break the build.

### getLucideIcon — curated map only

`getLucideIcon()` uses a hand-picked map of ~40 icons, **not** the full lucide bundle.
Importing the full bundle (`import * as icons from "lucide-react"`) caused an 807 KB chunk.
To add a new icon, import it by name at the top of `getLucideIcon.ts` and add it to the map.

### MapSection — placeholder embed URL

The default `mapEmbedUrl` in `siteConfig.json` is a placeholder (`!1m18!1m12!...`) that will
not render a real map. Replace it with a real Google Maps embed URL before going live.
