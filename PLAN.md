# TANN Shop — Development Plan & Roadmap

---

## Current Status Overview

**Progress:** ~70% complete (Landing + Basic E-commerce)
**Stack:** Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4 · Shopify Storefront API
**Branch:** `main`

---

## What's Done

### Pages (40+ pages)

| Area | Pages | Status |
|------|-------|--------|
| Landing Page | Home with 12 sections (Navigation, Hero, BrandMarquee, ProductCarousel, Categories, Features, BrandShowcase, Community, Newsletter, InstagramFeed, Footer) | Done |
| Shop | `/shop` — Full product listing with search, filters, sorting, grid/list toggle | Done |
| Product Detail | `/products/[handle]` — Image gallery, size/color selection, quantity, add-to-cart | Done |
| Men's Collection | 7 pages — New, Tees, Long Sleeve, Shorts, Pants, Accessories, Main | Done |
| Women's Collection | 7 pages — New, Tees, Bras, Shorts, Pants, Accessories, Main | Done |
| Blog | `/blog` — Listing page with featured post + grid | Done (placeholder content) |
| Blog Articles | `/blog/trail-running-art`, `/blog/marathon-gear-guide` | Structure only |
| Community | `/community` — Events, stories, gallery, newsletter | Done |
| Events | `/events/morning-run` | Structure only |
| Brands | `/brands` — Directory index + `/brands/[slug]` dynamic pages | Done |
| Info Pages | About, Contact, FAQ, Size Guide, Privacy, Terms, Shipping, Returns | Done |
| Account | `/account` | Placeholder ("Coming soon") |
| Other | Sale, New Arrivals, Performance, Track, Careers | Route exists |

### Features

| Feature | Status |
|---------|--------|
| Shopping Cart (add/remove/update/persist to localStorage) | Done |
| Cart Drawer UI | Done |
| Product Filtering (brand, price range, sale, new arrivals) | Done |
| Product Sorting (featured, newest, price, name) | Done |
| Quick Add to Cart from collection pages | Done |
| Shopify Storefront API integration | Done |
| Mock product data fallback | Done |
| Responsive design (mobile/tablet/desktop) | Done |
| Mobile hamburger menu + filter drawer | Done |
| Animations & micro-interactions | Done |
| Reusable `CollectionPage` component | Done |
| API routes (`/api/products`, `/api/products/[handle]`, `/api/collections/[handle]`) | Done |

---

## Phase 1 — Production Ready (High Priority)

> Goal: Make the store functional for real purchases.

### 1.1 Connect Shopify Checkout
- [ ] Hook up Cart → Shopify Checkout URL
- [ ] Create checkout session via Storefront API
- [ ] Redirect to Shopify hosted checkout
- [ ] Handle checkout success/cancel callbacks
- **Why:** Cart system is built, Shopify API is configured — this is the shortest path to real sales.

### 1.2 Sync Real Product Data
- [ ] Replace mock/fallback products with real Shopify products
- [ ] Map Shopify Collections to existing category pages
- [ ] Ensure product images load from Shopify CDN
- [ ] Add Shopify image domains to `next.config.ts` remotePatterns
- [ ] Test filter/sort with real product data
- **Why:** Currently using placeholder data — needs real products to launch.

### 1.3 Complete Blog Content
- [ ] Write real content for existing blog articles
- [ ] Add proper meta tags (title, description, og:image) per article
- [ ] Add more blog posts or remove placeholder ones
- **Why:** Blog pages exist but have placeholder/Lorem ipsum content.

### 1.4 Fill Placeholder Pages
- [ ] Account page — either implement or show clear "register on checkout" messaging
- [ ] Size Guide — add real sizing charts and measurement instructions
- [ ] Order Tracking — implement basic lookup via Shopify order API or remove from nav
- **Why:** Placeholder pages look unfinished and hurt credibility.

---

## Phase 2 — User Experience (Medium Priority)

> Goal: Improve engagement and conversion.

### 2.1 User Authentication & Accounts
- [ ] Implement login/registration (Shopify Customer API or NextAuth)
- [ ] Account dashboard with order history
- [ ] Saved addresses
- [ ] Password reset flow
- **Effort:** Medium-High

### 2.2 Product Reviews & Ratings
- [ ] Add review display on product detail pages
- [ ] Star rating summary on collection cards
- [ ] Connect to Shopify native reviews or third-party (Judge.me, Stamped)
- **Effort:** Medium

### 2.3 Wishlist / Favorites
- [ ] Heart icon on product cards
- [ ] Wishlist page under account
- [ ] Persist to localStorage (guest) or account (logged in)
- **Effort:** Medium

### 2.4 Search Enhancement
- [ ] Improve search with autocomplete/suggestions
- [ ] Search results page with filters
- [ ] Recent searches
- **Effort:** Medium

### 2.5 Newsletter Backend
- [ ] Connect newsletter form to email service (Mailchimp, Klaviyo, or Shopify Email)
- [ ] Email confirmation/welcome flow
- [ ] Unsubscribe handling
- **Effort:** Low-Medium

---

## Phase 3 — SEO & Performance (Lower Priority)

> Goal: Improve discoverability and speed.

### 3.1 SEO Optimization
- [ ] Dynamic meta tags per page (title, description, og:image)
- [ ] Generate `sitemap.xml` (use Next.js built-in sitemap)
- [ ] Add `robots.txt`
- [ ] Structured data / JSON-LD (Product, BreadcrumbList, Organization)
- [ ] Canonical URLs
- **Effort:** Medium

### 3.2 Performance
- [ ] Audit with Lighthouse — target 90+ scores
- [ ] Optimize images (next/image sizing, lazy loading)
- [ ] Review bundle size — code split large components
- [ ] Add loading skeletons for async data
- **Effort:** Medium

### 3.3 Analytics & Tracking
- [ ] Google Analytics 4 integration
- [ ] Facebook Pixel (if running ads)
- [ ] Conversion tracking on checkout
- [ ] Event tracking (add to cart, view product, search)
- **Effort:** Low-Medium

---

## Phase 4 — Growth Features (Future)

> Goal: Scale the business.

### 4.1 Email Marketing
- [ ] Abandoned cart emails
- [ ] Order confirmation & shipping notification emails
- [ ] Promotional campaign emails
- **Effort:** Medium (mostly Shopify/Klaviyo config)

### 4.2 Product Recommendations
- [ ] "You may also like" on product detail pages
- [ ] "Recently viewed" section
- [ ] "Complete the look" cross-sell
- **Effort:** Medium

### 4.3 Promotions & Discounts
- [ ] Discount code input at cart
- [ ] Sale banner / announcement bar
- [ ] Bundle deals
- **Effort:** Medium

### 4.4 Multi-language Support
- [ ] Thai + English language toggle
- [ ] i18n setup with Next.js
- **Effort:** High

### 4.5 Admin / CMS
- [ ] Blog content management (headless CMS like Sanity or Contentful)
- [ ] Banner/hero content management
- [ ] Event management for community page
- **Effort:** High

---

## Quick Reference — File Locations

| What | Where |
|------|-------|
| Home page composition | `src/app/page.tsx` |
| Shop page | `src/app/shop/page.tsx` |
| Product detail | `src/app/products/[handle]/page.tsx` |
| Collection component | `src/components/CollectionPage.tsx` |
| Cart state | `src/contexts/CartContext.tsx` |
| Shopify API client | `src/lib/shopify/` |
| API routes | `src/app/api/` |
| Global styles | `src/app/globals.css` |
| Next.js config | `next.config.ts` |
| Pricing doc | `PRICING.md` |

---

## Notes

- Shopify credentials are already configured in `.env.local`
- Mock data fallback exists so the site works without Shopify connection
- All components use `"use client"` directive
- Remote image domains (Unsplash, Facebook CDN) configured in `next.config.ts`
- Fonts: Outfit (headings) + DM Sans (body) via Google Fonts
