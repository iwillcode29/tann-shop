"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const categories = [
  {
    id: 1,
    title: "Men",
    subtitle: "Performance gear for every run",
    image: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&q=80",
    href: "/men",
  },
  {
    id: 2,
    title: "Women",
    subtitle: "Designed for movement",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80",
    href: "/women",
  },
  {
    id: 3,
    title: "Accessories",
    subtitle: "Complete your kit",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&q=80",
    href: "/accessories",
  },
];

export default function Categories() {
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
    <section ref={sectionRef} className="section-padding bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0d0d0d] tracking-tight mb-3 ${
              isVisible ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            Shop by Category
          </h2>
          <p
            className={`text-gray-500 text-base sm:text-lg ${
              isVisible ? "animate-fadeInUp stagger-1" : "opacity-0"
            }`}
          >
            Find exactly what you need
          </p>
        </div>

        {/* Categories Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.href}
              className={`group relative overflow-hidden rounded-sm ${
                index === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""
              } ${isVisible ? "animate-fadeInUp" : "opacity-0"}`}
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0
                    ? "aspect-[4/3] sm:aspect-[2/1] lg:aspect-[3/4]"
                    : "aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={80}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-8">
                  <h3
                    className={`font-display font-bold text-white mb-2 ${
                      index === 0
                        ? "text-3xl sm:text-4xl lg:text-5xl"
                        : "text-2xl sm:text-3xl"
                    }`}
                  >
                    {category.title}
                  </h3>
                  <p className="text-white/70 mb-4 text-sm sm:text-base">
                    {category.subtitle}
                  </p>
                  <span className="inline-flex items-center text-white font-display font-medium uppercase tracking-wider text-xs sm:text-sm group-hover:gap-3 gap-2 transition-all">
                    Shop Now
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
