"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const brands = [
  {
    name: "District Vision",
    logo: "DV",
    description: "Performance eyewear & apparel",
    href: "/brands/district-vision",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
  },
  {
    name: "Bandit Running",
    logo: "BR",
    description: "New York based running collective",
    href: "/brands/bandit",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
  },
  {
    name: "Soar",
    logo: "SOAR",
    description: "British running innovation",
    href: "/brands/soar",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
  },
  {
    name: "Satisfy",
    logo: "SAT",
    description: "Running luxury from Paris",
    href: "/brands/satisfy",
    image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800&q=80",
  },
  {
    name: "Ciele",
    logo: "CL",
    description: "Performance headwear",
    href: "/brands/ciele",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
  },
  {
    name: "Tracksmith",
    logo: "TS",
    description: "Athletic excellence",
    href: "/brands/tracksmith",
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80",
  },
];

export default function BrandShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0d0d0d] tracking-tight mb-3 ${
              isVisible ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            Shop by Brand
          </h2>
          <p
            className={`text-gray-500 text-base sm:text-lg max-w-2xl mx-auto ${
              isVisible ? "animate-fadeInUp stagger-1" : "opacity-0"
            }`}
          >
            Curated selection from the world&apos;s most innovative running brands
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {brands.map((brand, index) => (
            <Link
              key={brand.name}
              href={brand.href}
              className={`group relative aspect-square overflow-hidden rounded-sm ${
                isVisible ? "animate-scaleIn" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Background Image */}
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                quality={80}
                loading={index < 4 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors duration-300" />

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center text-center p-4 sm:p-6">
                {/* Logo */}
                <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-2 tracking-wider">
                  {brand.logo}
                </div>

                {/* Brand Name */}
                <h3 className="text-sm sm:text-base lg:text-lg font-display font-medium text-white mb-1">
                  {brand.name}
                </h3>

                {/* Description - Hidden on small mobile */}
                <p className="text-xs sm:text-sm text-white/60 mb-3 hidden sm:block">
                  {brand.description}
                </p>

                {/* Shop Now - Appears on hover */}
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white font-display font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Shop Now
                  <svg
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10 sm:mt-12">
          <Link href="/brands" className="btn-primary inline-flex items-center gap-2 group">
            View All Brands
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
