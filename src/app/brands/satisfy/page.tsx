"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

// ─────────────────────────────────────────────
// Satisfy brand products (curated selection)
// ─────────────────────────────────────────────

const satisfyProducts = [
  {
    id: "sat-1",
    handle: "long-distance-jacket",
    title: "MothTech\u2122 Long Distance Jacket",
    price: 285,
    compareAtPrice: null,
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=90",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=90",
    ],
    variants: [{ id: "sat-1-m", title: "M / Black", available: true, price: 285 }],
    isNew: true,
    isSale: false,
    category: "Jackets",
  },
  {
    id: "sat-2",
    handle: "justice-short-5",
    title: "Justice\u2122 Short 5\" Unlined",
    price: 128,
    compareAtPrice: null,
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=90",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=90",
    ],
    variants: [{ id: "sat-2-m", title: "M / Aged Black", available: true, price: 128 }],
    isNew: false,
    isSale: false,
    category: "Shorts",
  },
  {
    id: "sat-3",
    handle: "auralite-singlet",
    title: "Auralite\u2122 Singlet",
    price: 95,
    compareAtPrice: 120,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=90",
    ],
    variants: [{ id: "sat-3-m", title: "M / Dusty Olive", available: true, price: 95 }],
    isNew: false,
    isSale: true,
    category: "Tops",
  },
  {
    id: "sat-4",
    handle: "coffeering-long-sleeve",
    title: "CoffeeRing\u2122 Long Sleeve",
    price: 145,
    compareAtPrice: null,
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=90",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
    ],
    variants: [{ id: "sat-4-m", title: "M / Washed Black", available: true, price: 145 }],
    isNew: true,
    isSale: false,
    category: "Tops",
  },
  {
    id: "sat-5",
    handle: "peaceshell-tight",
    title: "PeaceShell\u2122 Running Tight",
    price: 198,
    compareAtPrice: null,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=90",
      "https://images.unsplash.com/photo-1618453292459-53424b66bb6a?w=800&q=90",
    ],
    variants: [{ id: "sat-5-m", title: "M / Black", available: true, price: 198 }],
    isNew: false,
    isSale: false,
    category: "Tights",
  },
  {
    id: "sat-6",
    handle: "running-cap-ao",
    title: "Running Cap A.O.",
    price: 55,
    compareAtPrice: null,
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=90",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=90",
    ],
    variants: [{ id: "sat-6-os", title: "One Size / Aged Black", available: true, price: 55 }],
    isNew: false,
    isSale: false,
    category: "Accessories",
  },
];

// ─────────────────────────────────────────────
// Utility
// ─────────────────────────────────────────────

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

// ─────────────────────────────────────────────
// Film Grain Overlay
// ─────────────────────────────────────────────

const FilmGrain = memo(() => (
  <div
    className="pointer-events-none fixed inset-0 z-[100] opacity-[0.04] mix-blend-multiply"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
      backgroundSize: "128px 128px",
    }}
  />
));
FilmGrain.displayName = "FilmGrain";

// ─────────────────────────────────────────────
// Scroll-triggered animation hook
// ─────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ─────────────────────────────────────────────
// Product Card (Satisfy aesthetic)
// ─────────────────────────────────────────────

const SatisfyProductCard = memo(({
  product,
  index,
  onQuickAdd,
}: {
  product: (typeof satisfyProducts)[0];
  index: number;
  onQuickAdd: (product: (typeof satisfyProducts)[0]) => void;
}) => {
  const { ref, isVisible } = useInView(0.1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    onQuickAdd(product);
    setTimeout(() => setIsAdding(false), 900);
  };

  return (
    <div
      ref={ref}
      className="group transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <Link href={`/products/${product.handle}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition-all duration-[1.2s] ease-out group-hover:scale-[1.04] group-hover:brightness-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Dark vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-60 group-hover:opacity-30 transition-opacity duration-700" />

          {/* Second image on hover */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-white text-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-[0.2em]">
                New
              </span>
            )}
            {product.isSale && product.compareAtPrice && (
              <span className="bg-[#c1272d] text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-[0.2em]">
                {Math.round((1 - product.price / product.compareAtPrice) * 100)}% Off
              </span>
            )}
          </div>

          {/* Category tag */}
          <div className="absolute bottom-3 left-3">
            <span className="text-[9px] text-white/50 uppercase tracking-[0.25em] font-medium">
              {product.category}
            </span>
          </div>

          {/* Quick Add */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <button
              onClick={handleAdd}
              disabled={isAdding}
              className="w-full bg-white text-black py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors disabled:opacity-60"
            >
              {isAdding ? "Added" : "Add to Bag"}
            </button>
          </div>
        </div>
      </Link>

      <div className="mt-3 space-y-1">
        <Link href={`/products/${product.handle}`}>
          <h3 className="text-[12px] text-white/80 font-medium leading-snug group-hover:text-white transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-white/60 font-medium">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-[11px] text-white/30 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});
SatisfyProductCard.displayName = "SatisfyProductCard";

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────

export default function SatisfyBrandPage() {
  const { addToCart } = useCart();
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [mounted, setMounted] = useState(false);

  const section1 = useInView(0.2);
  const section2 = useInView(0.2);
  const section3 = useInView(0.15);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax scroll effect for hero
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const opacity = Math.max(0, 1 - scrollY / 600);
      setHeroOpacity(opacity);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuickAdd = useCallback((product: (typeof satisfyProducts)[0]) => {
    const v = product.variants[0];
    addToCart({
      id: product.id,
      variantId: v.id,
      title: product.title,
      variant: v.title,
      price: product.price,
      compareAtPrice: product.compareAtPrice || undefined,
      image: product.images[0],
      handle: product.handle,
    });
  }, [addToCart]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <FilmGrain />
      <Navigation />

      {/* ═══════════════════════════════════════════
          HERO — Full-bleed cinematic opening
          ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-[100svh] flex items-end">
        {/* Background image with parallax feel */}
        <div
          className="absolute inset-0"
          style={{ opacity: heroOpacity }}
        >
          <Image
            src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1800&q=85"
            alt="Runner in motion"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Moody overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/30" />
        </div>

        {/* Hero content */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
          {/* Overline */}
          <div
            className="mb-6 transition-all duration-1000"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-medium">
              Paris, France &mdash; Est. 2015
            </span>
          </div>

          {/* Brand name — massive editorial type */}
          <h1
            className="transition-all duration-1000 delay-200"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <span
              className="block text-[clamp(3.5rem,12vw,11rem)] font-display font-bold leading-[0.85] tracking-[-0.03em] text-white"
              style={{ textShadow: "0 4px 60px rgba(0,0,0,0.5)" }}
            >
              SATISFY
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="mt-4 text-[13px] sm:text-[15px] text-white/50 max-w-md leading-relaxed font-light tracking-wide transition-all duration-1000 delay-500"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
            }}
          >
            Running luxury. Where high performance meets the counterculture of distance running.
          </p>

          {/* CTA */}
          <div
            className="mt-8 flex items-center gap-4 transition-all duration-1000 delay-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <a
              href="#collection"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-[#0a0a0a] text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-white/90 transition-colors"
            >
              Shop Collection
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <Link
              href="/brands"
              className="text-[11px] uppercase tracking-[0.15em] text-white/40 hover:text-white/70 transition-colors"
            >
              All Brands
            </Link>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute right-6 lg:right-8 bottom-16 lg:bottom-24 hidden sm:flex flex-col items-center gap-3 transition-all duration-1000 delay-1000"
            style={{
              opacity: mounted ? 0.4 : 0,
            }}
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 [writing-mode:vertical-lr]">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
              <div className="absolute inset-x-0 h-4 bg-white/60 animate-[scrollPulse_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BRAND PHILOSOPHY — Editorial split layout
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-40">
        {/* Subtle line decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-white/10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={section1.ref}
            className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center"
          >
            {/* Left — Text */}
            <div
              className="transition-all duration-1000"
              style={{
                opacity: section1.isVisible ? 1 : 0,
                transform: section1.isVisible ? "translateX(0)" : "translateX(-40px)",
              }}
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-medium">
                The Philosophy
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-[1.1] tracking-tight text-white">
                Run for the
                <br />
                <span className="italic font-light text-white/60">pleasure of it.</span>
              </h2>
              <p className="mt-6 text-[14px] leading-[1.8] text-white/40 max-w-md">
                Satisfy was born from the belief that running is more than sport &mdash; it&apos;s a
                meditative act, a creative pursuit, a way of seeing the world differently.
                Every piece is crafted in small batches using innovative materials that
                perform at the highest level while looking unlike anything else on the road.
              </p>
              <div className="mt-8 flex items-center gap-6">
                <div>
                  <p className="text-2xl font-display font-bold text-white">9+</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-1">Years</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-2xl font-display font-bold text-white">Paris</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-1">Based</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-2xl font-display font-bold text-white">100%</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-1">Independent</p>
                </div>
              </div>
            </div>

            {/* Right — Image with asymmetric framing */}
            <div
              className="relative transition-all duration-1000 delay-200"
              style={{
                opacity: section1.isVisible ? 1 : 0,
                transform: section1.isVisible ? "translateX(0)" : "translateX(40px)",
              }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=900&q=85"
                  alt="Satisfy running apparel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent" />
              </div>
              {/* Overlapping accent box */}
              <div className="absolute -bottom-6 -left-6 lg:-bottom-8 lg:-left-8 bg-[#0a0a0a] border border-white/10 p-5 lg:p-6 max-w-[200px]">
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 mb-2">Signature</p>
                <p className="text-[13px] text-white/70 leading-relaxed font-light">
                  &ldquo;Running is the new punk rock.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TECHNOLOGY STRIP — Horizontal scroll cards
          ═══════════════════════════════════════════ */}
      <section className="relative py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={section2.ref}
            className="transition-all duration-1000"
            style={{
              opacity: section2.isVisible ? 1 : 0,
              transform: section2.isVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-medium">
              Proprietary Technologies
            </span>

            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
              {[
                {
                  name: "MothTech\u2122",
                  desc: "Waterproof membrane inspired by moth-eye nanostructure. Breathable, silent, and completely weatherproof.",
                },
                {
                  name: "PeaceShell\u2122",
                  desc: "Bio-based water-repellent outer shell. Zero PFCs. Protects without polluting.",
                },
                {
                  name: "CoffeeRing\u2122",
                  desc: "Recycled coffee ground yarn. Natural odor control and UV protection built into the fiber.",
                },
                {
                  name: "Justice\u2122",
                  desc: "Ultralight woven fabric with 4-way stretch. Sub-100gsm weight that moves like a second skin.",
                },
              ].map((tech, i) => (
                <div
                  key={tech.name}
                  className="bg-[#0a0a0a] p-6 lg:p-8 group hover:bg-white/[0.03] transition-colors duration-500"
                  style={{
                    transitionDelay: section2.isVisible ? `${i * 100}ms` : "0ms",
                  }}
                >
                  <p className="text-[13px] font-display font-bold text-white mb-3">
                    {tech.name}
                  </p>
                  <p className="text-[11px] leading-[1.7] text-white/30 group-hover:text-white/50 transition-colors duration-500">
                    {tech.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRODUCT COLLECTION
          ═══════════════════════════════════════════ */}
      <section id="collection" className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={section3.ref}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 transition-all duration-1000"
            style={{
              opacity: section3.isVisible ? 1 : 0,
              transform: section3.isVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-medium">
                Curated Selection
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
                The Collection
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-[11px] uppercase tracking-[0.15em] text-white/40 hover:text-white transition-colors border-b border-white/10 hover:border-white/40 pb-0.5 self-start sm:self-auto"
            >
              View All Products
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {satisfyProducts.map((product, i) => (
              <SatisfyProductCard
                key={product.id}
                product={product}
                index={i}
                onQuickAdd={handleQuickAdd}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EDITORIAL BANNER — Full-width visual break
          ═══════════════════════════════════════════ */}
      <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1800&q=85"
          alt="Running on trail at dawn"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-4">
              Mantra
            </p>
            <p
              className="text-2xl sm:text-4xl lg:text-5xl font-display font-light text-white/80 italic tracking-tight max-w-2xl mx-auto leading-snug"
            >
              &ldquo;Run to the edge of
              <br />
              what you know.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BRAND VALUES — Minimal footer section
          ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-16">
            {[
              {
                title: "Small Batch",
                desc: "Limited production runs. When it's gone, it's gone. No restock, no waste.",
              },
              {
                title: "Planet First",
                desc: "Bio-based materials, recycled yarns, zero PFC treatments. Performance without compromise.",
              },
              {
                title: "Made in Europe",
                desc: "Manufactured in Portugal and Italy. Supporting craft, reducing distance, ensuring quality.",
              },
            ].map((val) => (
              <div key={val.title} className="group">
                <div className="w-8 h-px bg-white/20 mb-5 group-hover:w-14 group-hover:bg-white/40 transition-all duration-500" />
                <h3 className="text-[13px] font-display font-bold text-white uppercase tracking-wider mb-3">
                  {val.title}
                </h3>
                <p className="text-[12px] leading-[1.8] text-white/30">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Scroll pulse animation */}
      <style jsx>{`
        @keyframes scrollPulse {
          0% { top: -16px; }
          100% { top: 100%; }
        }
      `}</style>
    </main>
  );
}
