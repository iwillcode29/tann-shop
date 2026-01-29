"use client";

import { useRef, useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage: string;
  href: string;
  isNew?: boolean;
  isSale?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Pace Lite Tank",
    brand: "District Vision",
    price: 95,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    href: "/products/pace-lite-tank",
    isNew: true,
  },
  {
    id: 2,
    name: "Speed Short 5\"",
    brand: "Bandit Running",
    price: 78,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    href: "/products/speed-short",
  },
  {
    id: 3,
    name: "Ultra Running Tee",
    brand: "Soar",
    price: 110,
    originalPrice: 145,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    href: "/products/ultra-running-tee",
    isSale: true,
  },
  {
    id: 4,
    name: "Long Distance Jacket",
    brand: "Satisfy",
    price: 285,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    href: "/products/long-distance-jacket",
    isNew: true,
  },
  {
    id: 5,
    name: "Compression Tight",
    brand: "District Vision",
    price: 145,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1618453292459-53424b66bb6a?w=600&q=80",
    href: "/products/compression-tight",
  },
  {
    id: 6,
    name: "Trail Cap",
    brand: "Ciele",
    price: 45,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80",
    href: "/products/trail-cap",
    isNew: true,
  },
];

// Memoized arrow icons
const ArrowIcon = memo(({ direction }: { direction: "left" | "right" }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
    />
  </svg>
));
ArrowIcon.displayName = "ArrowIcon";

// Memoized Product Card
const ProductCard = memo(({ product, index }: { product: Product; index: number }) => (
  <Link
    href={product.href}
    className="product-card flex-shrink-0 w-64 sm:w-72 group"
  >
    {/* Image Container */}
    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4 rounded-sm">
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(max-width: 640px) 256px, 288px"
        quality={80}
        loading={index < 3 ? "eager" : "lazy"}
        className="primary-image object-cover transition-all duration-500 group-hover:scale-105"
      />
      <Image
        src={product.hoverImage}
        alt=""
        fill
        sizes="(max-width: 640px) 256px, 288px"
        quality={80}
        loading="lazy"
        className="secondary-image object-cover"
      />

      {/* Badges */}
      {(product.isNew || product.isSale) && (
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-[#0d0d0d] text-white text-[10px] font-display font-semibold px-3 py-1.5 uppercase tracking-wider">
              New
            </span>
          )}
          {product.isSale && (
            <span className="bg-[#e63946] text-white text-[10px] font-display font-semibold px-3 py-1.5 uppercase tracking-wider">
              Sale
            </span>
          )}
        </div>
      )}

      {/* Quick Add Button */}
      <div className="quick-add absolute bottom-0 left-0 right-0 p-3">
        <button
          className="w-full bg-[#0d0d0d] text-white py-3.5 text-xs font-display font-semibold uppercase tracking-wider hover:bg-[#1a1a1a] transition-colors rounded-sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Add to cart logic here
          }}
        >
          Quick Add
        </button>
      </div>
    </div>

    {/* Product Info */}
    <div className="px-0.5">
      <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1 font-display">
        {product.brand}
      </p>
      <h3 className="text-sm font-medium text-[#0d0d0d] mb-2 group-hover:underline underline-offset-2">
        {product.name}
      </h3>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-[#0d0d0d]">
          ${product.price}
        </span>
        {product.originalPrice && (
          <span className="text-sm text-gray-400 line-through">
            ${product.originalPrice}
          </span>
        )}
      </div>
    </div>
  </Link>
));
ProductCard.displayName = "ProductCard";

export default function ProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll, { passive: true });
      return () => {
        scrollContainer.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [checkScroll]);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0d0d0d] tracking-tight mb-3">
              New Arrivals
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl">
              The latest gear from the world&apos;s most innovative running brands
            </p>
          </div>

          {/* Navigation Arrows - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-12 h-12 border flex items-center justify-center transition-all duration-200 rounded-sm ${
                canScrollLeft
                  ? "border-[#0d0d0d] text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
              aria-label="Scroll left"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-12 h-12 border flex items-center justify-center transition-all duration-200 rounded-sm ${
                canScrollRight
                  ? "border-[#0d0d0d] text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
              aria-label="Scroll right"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>

        {/* Products Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 scroll-smooth snap-x snap-mandatory"
        >
          {products.map((product, index) => (
            <div key={product.id} className="snap-start">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        {/* Mobile scroll hint */}
        <div className="flex items-center justify-center gap-2 mt-6 md:hidden">
          <span className="w-8 h-0.5 bg-[#0d0d0d] rounded-full" />
          <span className="w-8 h-0.5 bg-gray-200 rounded-full" />
          <span className="w-8 h-0.5 bg-gray-200 rounded-full" />
        </div>

        {/* View All Link */}
        <div className="text-center mt-10 sm:mt-12">
          <Link href="/new-arrivals" className="btn-secondary inline-flex items-center gap-2 group">
            View All New Arrivals
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
