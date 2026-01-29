"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const posts = [
  {
    id: 1,
    category: "Story",
    title: "The Art of Trail Running: Finding Flow in Nature",
    excerpt:
      "Discover how trail running connects us with the natural world and transforms our relationship with movement.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
    href: "/blog/trail-running-art",
    date: "Jan 15, 2024",
  },
  {
    id: 2,
    category: "Event",
    title: "Morning Run Club - Every Saturday 7AM",
    excerpt:
      "Join our weekly community run through the city. All paces welcome. Coffee included.",
    image: "https://images.unsplash.com/photo-1544899489-a083461b088c?w=800&q=80",
    href: "/events/morning-run",
    date: "Every Week",
  },
  {
    id: 3,
    category: "Guide",
    title: "Essential Gear for Your First Marathon",
    excerpt:
      "Everything you need to know about choosing the right gear for race day success.",
    image: "https://images.unsplash.com/photo-1590333748338-d629e4564ad9?w=800&q=80",
    href: "/blog/marathon-gear-guide",
    date: "Jan 10, 2024",
  },
];

export default function Community() {
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
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0d0d0d] tracking-tight mb-3 ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              Blog & Community
            </h2>
            <p
              className={`text-gray-500 text-base sm:text-lg max-w-xl ${
                isVisible ? "animate-fadeInUp stagger-1" : "opacity-0"
              }`}
            >
              Stories, events, and insights from the running community
            </p>
          </div>
          <Link
            href="/community"
            className={`btn-secondary self-start sm:self-auto ${
              isVisible ? "animate-fadeInUp stagger-2" : "opacity-0"
            }`}
          >
            View All
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              href={post.href}
              className={`group ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
              style={{ animationDelay: `${(index + 2) * 0.08}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden mb-4 sm:mb-5 rounded-sm">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={80}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Category Badge */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span className="bg-white px-3 py-1.5 text-[10px] sm:text-xs font-display font-semibold uppercase tracking-wider rounded-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div>
                <span className="text-xs sm:text-sm text-gray-400 mb-2 block">
                  {post.date}
                </span>
                <h3 className="text-lg sm:text-xl font-display font-semibold text-[#0d0d0d] mb-2 group-hover:underline underline-offset-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
