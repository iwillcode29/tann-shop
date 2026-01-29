"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";

const heroSlides = [
  {
    id: 1,
    title: "Run Beyond",
    subtitle: "Limits",
    description: "Discover the latest collection designed for peak performance",
    cta: "Shop New Arrivals",
    href: "/new-arrivals",
    image: "https://scontent.fcnx3-1.fna.fbcdn.net/v/t51.82787-15/582279420_17895031518352096_3143218361883984992_n.jpg?stp=dst-jpegr_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=zZFbg9R59GcQ7kNvwFyfMF1&_nc_oc=AdkSSX_JHN7PX1pVPUwZZsUZdfeZi2hB5mUD5Y7VLPaJJuZahUaq3N-TVa6tqBmtfjM&_nc_zt=23&se=-1&_nc_ht=scontent.fcnx3-1.fna&_nc_gid=NwHxLUKnxn-R4h1Vcntv3w&oh=00_Afpk2giXSVy4LsHxln6J98QJIAR7uTT8TAZ03Mb2lJ5Kzg&oe=69815346",
  },
  {
    id: 2,
    title: "District Vision",
    subtitle: "Spring 2024",
    description: "Performance eyewear and apparel for the modern athlete",
    cta: "Explore Collection",
    href: "/brands/district-vision",
    image: "https://scontent.fcnx3-1.fna.fbcdn.net/v/t51.82787-15/610730650_17901232491352096_4408349464509425043_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=FWQYtlwnXP4Q7kNvwH-05LG&_nc_oc=AdkoRP6EmUPi0j_W5IdvLRz4Ct-ZWd0BXWU6WdqUKXwaYTVUgRYb4CGNXt6LddyBXLo&_nc_zt=23&_nc_ht=scontent.fcnx3-1.fna&_nc_gid=fXfCdyOXsZjPa1lgMbTe_g&oh=00_AfoESQJveXbJlrbC6TIGmh3x-o9RmXUBRq4_IM_A_3L_hA&oe=6981263B",
  },
  {
    id: 3,
    title: "Engineered",
    subtitle: "For Speed",
    description: "Technical fabrics that move with you",
    cta: "Shop Performance",
    href: "/performance",
    image: "https://scontent.fcnx3-1.fna.fbcdn.net/v/t51.82787-15/586786806_17896346751352096_7635387931521644452_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=hTd4bGcK57cQ7kNvwEQKhOx&_nc_oc=Admijo-IVhu-IMa4YwEWY0CiaS39ZwAlEWfB0xfGa9_DfOi58n0ZwWU3TaItf6R75ZQ&_nc_zt=23&_nc_ht=scontent.fcnx3-1.fna&_nc_gid=7RdK-4UovS8Lkbr3skbjaQ&oh=00_AfolG2p0UFpQm9KMwuTHIXYck3m43qCLQhi5QNrESgXL7Q&oe=69813761",
  },
];

// Memoized arrow icons
const ArrowLeftIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
  </svg>
));
ArrowLeftIcon.displayName = "ArrowLeftIcon";

const ArrowRightIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
  </svg>
));
ArrowRightIcon.displayName = "ArrowRightIcon";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images - Using Next.js Image for optimization */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={index !== currentSlide}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={index === 0}
            quality={85}
            sizes="100vw"
            className={`object-cover transition-transform duration-[6000ms] ease-out ${
              index === currentSlide ? "scale-100" : "scale-110"
            }`}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-700 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0 relative"
                    : "opacity-0 translate-y-8 absolute pointer-events-none"
                }`}
                aria-hidden={index !== currentSlide}
              >
                {index === currentSlide && (
                  <>
                    {/* Title */}
                    <div className="overflow-hidden">
                      <h1
                        className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight leading-[0.95] mb-1 ${
                          isLoaded ? "animate-slideInLeft" : "opacity-0"
                        }`}
                      >
                        {slide.title}
                      </h1>
                    </div>

                    {/* Subtitle */}
                    <div className="overflow-hidden">
                      <h2
                        className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white/80 tracking-tight leading-[0.95] mb-6 ${
                          isLoaded ? "animate-slideInLeft stagger-1" : "opacity-0"
                        }`}
                      >
                        {slide.subtitle}
                      </h2>
                    </div>

                    {/* Description */}
                    <p
                      className={`text-base sm:text-lg md:text-xl text-white/70 mb-8 max-w-md ${
                        isLoaded ? "animate-fadeInUp stagger-2" : "opacity-0"
                      }`}
                    >
                      {slide.description}
                    </p>

                    {/* CTA Button */}
                    <Link
                      href={slide.href}
                      className={`btn-white inline-flex items-center gap-2 group ${
                        isLoaded ? "animate-fadeInUp stagger-3" : "opacity-0"
                      }`}
                    >
                      {slide.cta}
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators - Bottom center, improved touch targets */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-10 flex items-center justify-center transition-all duration-300 ${
              index === currentSlide ? "w-12" : "w-8"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          >
            <span
              className={`block h-[3px] w-full rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Navigation Arrows - Desktop only, improved positioning */}
      <div className="absolute bottom-8 sm:bottom-12 right-4 sm:right-8 z-20 hidden md:flex items-center gap-3">
        <button
          onClick={goToPrevious}
          className="w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#0d0d0d] transition-all duration-200 rounded-sm"
          aria-label="Previous slide"
        >
          <ArrowLeftIcon />
        </button>
        <button
          onClick={goToNext}
          className="w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#0d0d0d] transition-all duration-200 rounded-sm"
          aria-label="Next slide"
        >
          <ArrowRightIcon />
        </button>
      </div>

      {/* Scroll Indicator - Desktop only */}
      <div className="absolute bottom-24 right-8 z-20 hidden lg:flex flex-col items-center text-white/50">
        <span className="text-[10px] tracking-[0.2em] uppercase mb-3 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-6 bg-white/60 animate-pulse" />
        </div>
      </div>

      {/* Slide Counter - Mobile */}
      <div className="absolute bottom-8 left-4 z-20 md:hidden">
        <span className="text-white/60 text-sm font-display">
          <span className="text-white font-medium">{String(currentSlide + 1).padStart(2, "0")}</span>
          <span className="mx-1">/</span>
          <span>{String(heroSlides.length).padStart(2, "0")}</span>
        </span>
      </div>
    </section>
  );
}
