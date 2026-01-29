# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tann Landing is a Next.js 16 e-commerce landing page for a premium running apparel retailer. Built with React 19, TypeScript 5, and Tailwind CSS 4.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Architecture

**Stack:** Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS 4

**Structure:**
- `src/app/` - App Router pages and layouts
- `src/components/` - React components (all use `"use client"` directive)
- `src/app/globals.css` - Tailwind import + custom CSS utilities and animations

**Page composition:** The home page (`src/app/page.tsx`) composes modular section components in order:
Navigation → Hero → BrandMarquee → ProductCarousel → Categories → Features → BrandShowcase → Testimonials → Community → Newsletter → InstagramFeed → Footer

**Styling approach:**
- Tailwind utility classes for component styling
- Custom CSS utilities in `globals.css`: `.btn-primary`, `.btn-secondary`, `.btn-white`, `.glass`, `.hover-lift`
- Animation classes: `.animate-fadeInUp`, `.animate-slideInLeft`, `.stagger-1` through `.stagger-6`
- Theme variables: `--background`, `--foreground`, `--accent`, `--muted`, `--border`

**Image handling:** Remote images from Unsplash are configured in `next.config.ts`. Add new remote domains to `images.remotePatterns` before using external image sources.

**Font:** Inter loaded via `next/font/google` with CSS variable `--font-inter`

**Path alias:** `@/*` maps to `./src/*`
