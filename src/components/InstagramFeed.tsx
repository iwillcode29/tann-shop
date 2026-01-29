"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const instagramPosts = [
  {
    id: 1,
    image: "https://scontent.fcnx3-1.fna.fbcdn.net/v/t51.82787-15/623271512_17903845827352096_9070180374965820307_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=e8LxOKNsIKQQ7kNvwHkGYR1&_nc_oc=AdmNoXyU7774rxnXGIVCmMFwYYEboz-daBRtKBFyCDutX85lMM0J-RTQZ-JNyeVIR10&_nc_zt=23&_nc_ht=scontent.fcnx3-1.fna&_nc_gid=3X_Waq8ekAHwA3Beftggvg&oh=00_AfqQG2iErHC6fjOngwpT3J8G5bso6Yj18QwO96UytduQQA&oe=69813E0A",
    likes: 234,
  },
  {
    id: 2,
    image: "https://scontent.fcnx3-1.fna.fbcdn.net/v/t51.82787-15/619909375_17903455503352096_7815621185551917199_n.jpg?stp=dst-jpegr_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=vdq0euJeTgAQ7kNvwHO26yk&_nc_oc=AdlMDAdSxyuY3cwZbsBvJJ-VdCUihKb3UacDJ1gCTapBiFqgGqfmlJ9TKkDwqTMDmN8&_nc_zt=23&se=-1&_nc_ht=scontent.fcnx3-1.fna&_nc_gid=BedNz9je4H_IWldXrIRDCw&oh=00_AfqsihS8lzTrJFc75GlSenB9DRFvuAhZej__y6kKpXuuRg&oe=69814BA0",
    likes: 567,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&q=80",
    likes: 892,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80",
    likes: 456,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
    likes: 789,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=400&q=80",
    likes: 345,
  },
];

export default function InstagramFeed() {
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
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center gap-2 sm:gap-3 ${
              isVisible ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="font-display font-medium text-sm sm:text-base">@tann.nimmannn</span>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs sm:text-sm font-display font-medium text-gray-500 hover:text-[#0d0d0d] transition-colors ${
              isVisible ? "animate-fadeInUp stagger-1" : "opacity-0"
            }`}
          >
            Follow Us
          </a>
        </div>
      </div>

      {/* Images Grid - Full Width */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-0.5 sm:gap-1">
        {instagramPosts.map((post, index) => (
          <a
            key={post.id}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative aspect-square overflow-hidden ${
              isVisible ? "animate-scaleIn" : "opacity-0"
            }`}
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <Image
              src={post.image}
              alt={`Instagram post with ${post.likes} likes`}
              fill
              sizes="(max-width: 640px) 33vw, 16vw"
              quality={75}
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex items-center gap-1.5 text-white">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm sm:text-base font-medium">{post.likes}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
