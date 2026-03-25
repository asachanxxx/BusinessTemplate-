# SMB Website Template — Image Reference

All images referenced in `siteConfig.json` must be placed in the `public/images/` folder
(or served from an external CDN — just update the URLs in the config).

Images in `public/` are served at the root path, so `/images/hero-1.jpg` is available
at `http://localhost:5173/images/hero-1.jpg` during development.

---

## Index

1. [Meta / SEO Images](#1-meta--seo-images)
2. [Hero Carousel](#2-hero-carousel)
3. [About Section](#3-about-section)
4. [Testimonials](#4-testimonials)
5. [Gallery](#5-gallery)
6. [Partners & Certifications](#6-partners--certifications)
7. [Logo](#7-logo)
8. [Team Section](#8-team-section)
9. [Before & After Section](#9-before--after-section)
10. [Menu Section](#10-menu-section)
11. [Services — Courses / Rooms / Products Variants](#11-services--courses--rooms--products-variants)
12. [General Guidelines](#12-general-guidelines)

---

## 1. Meta / SEO Images

| File path | Dimensions | Format | Description |
|---|---|---|---|
| `/public/og-image.jpg` | 1200 × 630 px | JPEG | Open Graph / social share preview image. Shown when the page is shared on Facebook, Twitter/X, LinkedIn, WhatsApp, etc. Should include the business name, tagline, and a strong visual. Keep important content away from edges. |
| `/public/favicon.ico` | 32 × 32 px (multi-size) | ICO | Browser tab icon. Use a multi-resolution `.ico` containing 16×16, 32×32, and 48×48 variants. |
| `/public/favicon.svg` | Scalable | SVG | Modern browsers prefer SVG favicons. Use a simplified version of the logo mark. |
| `/public/apple-touch-icon.png` | 180 × 180 px | PNG | Home-screen icon on iPhone / iPad when the site is saved as a web app. No rounded corners needed — the OS clips it. |

---

## 2. Hero Carousel

Location in config: `content.hero.slides`

These are the full-screen background images behind the headline and CTA buttons.
A dark overlay (`bg-black/50`) is applied on top, so lighter or mid-tone photos work best.

| File path | Dimensions | Format | Description |
|---|---|---|---|
| `/public/images/hero-1.jpg` | 1920 × 1080 px | JPEG (≤ 300 KB) | First slide — primary hero image. Should communicate the core business activity at a glance. Examples: a team at work, the main service in action, the interior of the venue. |
| `/public/images/hero-2.jpg` | 1920 × 1080 px | JPEG (≤ 300 KB) | Second slide — an alternative angle or related action shot. |
| `/public/images/hero-3.jpg` | 1920 × 1080 px | JPEG (≤ 300 KB) | Third slide — a lifestyle or mood image that reinforces the brand. |

**Tips:**
- Use landscape-orientation photos with the main subject centred or slightly left/right of centre.
- Avoid images with important details in the very bottom quarter — the CTA overlay covers that area on mobile.
- Compress with [Squoosh](https://squoosh.app) or [TinyJPG](https://tinyjpg.com) to keep each file under 300 KB.
- To add more slides: add extra objects to the `content.hero.slides` array with their own `imageUrl` and `imageAlt`.
- To use fewer slides: keep just one object — the carousel will not show arrows or dots for a single slide.

---

## 3. About Section

Location in config: `content.about.imageUrl`

| File path | Dimensions | Format | Description |
|---|---|---|---|
| `/public/images/about.jpg` | 800 × 600 px (4:3) | JPEG (≤ 150 KB) | A photo of the team, the owner, the workspace, or the product. Appears beside the "About Us" text. The image side can be switched between left and right via `content.about.imagePosition`. |

**Tips:**
- A genuine, unposed photo of real staff or the workspace builds more trust than stock photography.
- Slightly warm colour tones photograph well next to the default colour theme.
- The image is displayed with `object-cover` inside a fixed aspect-ratio box, so composition is flexible.

---

## 4. Testimonials

Location in config: `content.testimonials.items[].photoUrl`

These are small circular avatar photos displayed beside each customer quote.

| File path | Dimensions | Format | Description |
|---|---|---|---|
| `/public/images/testimonial-1.jpg` | 200 × 200 px | JPEG / PNG (≤ 30 KB) | Avatar for testimonial 1 (Jane Smith). Close-up headshot, centred face. |
| `/public/images/testimonial-2.jpg` | 200 × 200 px | JPEG / PNG (≤ 30 KB) | Avatar for testimonial 2 (Mark Johnson). |
| `/public/images/testimonial-3.jpg` | 200 × 200 px | JPEG / PNG (≤ 30 KB) | Avatar for testimonial 3 (Sarah Lee). |

**Tips:**
- `photoUrl` is optional — if omitted, the avatar area is simply not rendered.
- The image is cropped to a circle (`rounded-full`), so aim for the face to fill most of the frame.
- For privacy or unavailability, omit `photoUrl` or use a generated avatar (e.g. [ui-avatars.com](https://ui-avatars.com)).
- To add more testimonials: add extra items to `content.testimonials.items` with their own `photoUrl`.

---

## 5. Gallery

Location in config: `content.gallery.items[].imageUrl`

A responsive 2 → 3 → 4 column grid. Clicking any image opens a full-screen lightbox.

| File path | Dimensions | Format | Description |
|---|---|---|---|
| `/public/images/gallery-1.jpg` | 800 × 800 px (1:1) | JPEG (≤ 150 KB) | Gallery item 1. Show a completed project, service in action, or the venue. |
| `/public/images/gallery-2.jpg` | 800 × 800 px (1:1) | JPEG (≤ 150 KB) | Gallery item 2. |
| `/public/images/gallery-3.jpg` | 800 × 800 px (1:1) | JPEG (≤ 150 KB) | Gallery item 3. |
| `/public/images/gallery-4.jpg` | 800 × 800 px (1:1) | JPEG (≤ 150 KB) | Gallery item 4. |
| `/public/images/gallery-5.jpg` | 800 × 800 px (1:1) | JPEG (≤ 150 KB) | Gallery item 5. |
| `/public/images/gallery-6.jpg` | 800 × 800 px (1:1) | JPEG (≤ 150 KB) | Gallery item 6. |

**Tips:**
- Square images (1:1) are strongly recommended — the grid cell is `aspect-square`. Non-square images will be cropped by `object-cover`.
- Shoot or crop originals to 1:1 before resizing, rather than letting the browser crop.
- The full-resolution version is shown in the lightbox, so you can optionally keep the file larger (up to 600 KB) if you want sharp zoom quality.
- Add or remove items freely in the config — the grid adapts to any count.

---

## 6. Partners & Certifications

Location in config: `content.partners.items[].logoUrl`

These are the logos displayed in the greyscale strip. They appear faded/greyscale by default
and reveal full colour on hover.

| File path | Dimensions | Format | Description |
|---|---|---|---|
| `/public/images/partner-1.png` | 240 × 80 px (3:1) | PNG with transparent background | Logo for Partner One. |
| `/public/images/partner-2.png` | 240 × 80 px (3:1) | PNG with transparent background | Logo for Partner Two. |
| `/public/images/partner-3.png` | 240 × 80 px (3:1) | PNG with transparent background | Logo for Partner Three. |
| `/public/images/partner-4.png` | 240 × 80 px (3:1) | PNG with transparent background | Logo for Partner Four. |

**Tips:**
- **PNG with transparency is required** — the logos are displayed on both light and dark backgrounds; a white rectangle background will look broken.
- If only a JPEG version is available, use a tool like [remove.bg](https://remove.bg) to remove the background, then export as PNG.
- The component renders images at `h-10 max-w-[140px]`, so the exact pixel size does not need to match exactly — just keep the aspect ratio approximately 3:1.
- If a partner provides a logo on a dark background, set `--color-bg-alt` to match or use a dark-mode variant.

---

## 7. Logo

Location in config: `business.logoUrl`

| Field | Dimensions | Format | Description |
|---|---|---|---|
| `business.logoUrl` | 200 × 60 px max | PNG with transparent background or SVG | The main brand logo displayed in the Header and Footer. If left empty (`""`), the text in `business.logoText` is shown as a text fallback. |

**Tips:**
- SVG is preferred — it will remain sharp at any screen resolution.
- PNG should be @2x (400 × 120 px actual pixels) for Retina display sharpness.
- The logo is constrained in height in the header — it will not overflow, but a very wide or very tall image may look unbalanced. Aim for a landscape or square aspect ratio.

---

## 8. Team Section

Location in config: `content.team.items[].photoUrl`

Headshots displayed in a card grid. If `photoUrl` is omitted, the component shows the member's initials in a coloured circle.

| File path | Dimensions | Format | Description |
|---|---|---|---|
| `/public/images/team-1.jpg` | 400 × 400 px (1:1) | JPEG (≤ 80 KB) | Team member 1 — close-up headshot. |
| `/public/images/team-2.jpg` | 400 × 400 px (1:1) | JPEG (≤ 80 KB) | Team member 2. |
| `/public/images/team-3.jpg` | 400 × 400 px (1:1) | JPEG (≤ 80 KB) | Team member 3. |

**Tips:**
- Square images with the face centred work best — the image is displayed with `rounded-full` or `rounded-lg` inside an `aspect-square` container.
- Consistent background colours or neutral backdrops make the grid look cohesive.
- Shoot all headshots in the same session/location for a unified look.

---

## 9. Before & After Section

Location in config: `content.beforeAfter.pairs[].beforeUrl` and `.afterUrl`

Full-width image pairs displayed side by side with a drag-handle comparison slider.

| File path | Dimensions | Format | Description |
|---|---|---|---|
| `/public/images/before-1.jpg` | 1200 × 800 px (3:2) | JPEG (≤ 250 KB) | "Before" image for pair 1. Shows the problem state (dirty car, uncleaned kitchen, hair before treatment, etc.). |
| `/public/images/after-1.jpg` | 1200 × 800 px (3:2) | JPEG (≤ 250 KB) | "After" image for pair 1. Must be **exactly the same crop and framing** as before-1.jpg for the slider to look correct. |
| `/public/images/before-2.jpg` | 1200 × 800 px (3:2) | JPEG (≤ 250 KB) | "Before" image for pair 2. |
| `/public/images/after-2.jpg` | 1200 × 800 px (3:2) | JPEG (≤ 250 KB) | "After" image for pair 2. |

**Critical:** Both images in a pair **must be the same dimensions and the same shot angle**.
A tripod between shots is ideal — any shift in camera position makes the slider look broken.

---

## 10. Menu Section

Location in config: `content.menu.categories[].items[].imageUrl`

Optional small thumbnail for individual menu items. Most deployments omit these and let the layout be text-only.

| File path | Dimensions | Format | Description |
|---|---|---|---|
| `/public/images/menu-item-1.jpg` | 400 × 300 px (4:3) | JPEG (≤ 60 KB) | Food/product photo for a specific menu item. |
| `/public/images/menu-item-2.jpg` | 400 × 300 px (4:3) | JPEG (≤ 60 KB) | Food/product photo for another menu item. |

**Tips:**
- `imageUrl` is optional on every menu item — omit it for text-only menus (most common).
- When used, consistent overhead or 45° shots look the best in the list layout.

---

## 11. Services — Courses / Rooms / Products Variants

Location in config: `content.services.items[].imageUrl`

Used when `content.services.variant` is `"courses"`, `"rooms"`, or `"products"`.
The default `"services"` variant uses icons only — no images needed.

| File path | Dimensions | Format | Description |
|---|---|---|---|
| `/public/images/service-1.jpg` | 800 × 500 px (16:10) | JPEG (≤ 120 KB) | Photo for service/course/room/product item 1. |
| `/public/images/service-2.jpg` | 800 × 500 px (16:10) | JPEG (≤ 120 KB) | Item 2. |
| `/public/images/service-3.jpg` | 800 × 500 px (16:10) | JPEG (≤ 120 KB) | Item 3. |
| `/public/images/service-4.jpg` | 800 × 500 px (16:10) | JPEG (≤ 120 KB) | Item 4. |

**Tips:**
- `"products"` variant crops to a square (`aspect-square`) — use square images or centred subjects.
- `"rooms"` and `"courses"` variants use a wider card — landscape images (16:10 or 4:3) work best.
- `imageUrl` is optional for all variants — omit it to show icon-only cards.

---

## 12. General Guidelines

### File naming
- All lowercase, words separated by hyphens: `hero-1.jpg`, `gallery-3.jpg`
- No spaces, no special characters

### Formats
| Use case | Recommended format |
|---|---|
| Photos (hero, gallery, about, testimonials) | JPEG |
| Logos & icons with transparency | PNG or SVG |
| Illustrations / line art | SVG |
| Animated graphics | WebP or GIF (avoid in hero) |

### File sizes
| Image type | Target size |
|---|---|
| Hero slides | ≤ 300 KB each |
| Gallery items | ≤ 150 KB each |
| About photo | ≤ 150 KB |
| Testimonial avatars | ≤ 30 KB each |
| Partner logos | ≤ 50 KB each |
| OG image | ≤ 150 KB |
| Team headshots | ≤ 80 KB each |
| Before/after pairs | ≤ 250 KB each |
| Menu item thumbnails | ≤ 60 KB each |
| Service / room / product cards | ≤ 120 KB each |

### Optimisation tools
- [Squoosh](https://squoosh.app) — browser-based, free, excellent quality settings
- [TinyJPG / TinyPNG](https://tinyjpg.com) — quick drag-and-drop compression
- [SVGOMG](https://jakearchibald.github.io/svgomg/) — SVG optimiser

### Accessibility
- Every image must have a meaningful `alt` or `imageAlt` value in the config.
- Avoid embedding important text inside images — screen readers cannot read it.
- Partner logo `name` field is used as the `alt` attribute automatically.

### CDN / External URLs
All `imageUrl` fields accept any valid URL, not just local paths. You can point them to:
- Cloudinary, Imgix, or any image CDN
- Your CMS media library
- Unsplash / Pexels for placeholder photography during development

Example:
```jsonc
{ "imageUrl": "https://images.unsplash.com/photo-xxxx?w=800&q=80", "imageAlt": "Team at work" }
```
