"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    quote:
      "The gear from RYA has completely transformed my running experience. The quality and attention to detail is unmatched.",
    author: "Sarah Chen",
    role: "Ultra Marathon Runner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Finally found a store that understands what serious runners need. The curated selection of brands is exactly what I was looking for.",
    author: "Marcus Williams",
    role: "Running Coach",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "From customer service to product quality, everything about RYA exceeds expectations. They truly care about the running community.",
    author: "Emma Rodriguez",
    role: "Trail Runner",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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
      { threshold: 0.25, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goToTestimonial = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-[#fafafa]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-10 sm:mb-12 ${
            isVisible ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0d0d0d] tracking-tight mb-3">
            What Runners Say
          </h2>
          <p className="text-gray-500 text-base sm:text-lg">
            Join thousands of satisfied athletes
          </p>
        </div>

        {/* Testimonial Card */}
        <div
          className={`relative ${
            isVisible ? "animate-fadeInUp stagger-2" : "opacity-0"
          }`}
        >
          <div className="bg-white p-6 sm:p-8 lg:p-12 shadow-lg rounded-sm relative">
            {/* Quote Icon */}
            <div className="absolute -top-3 left-6 sm:left-10">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-gray-100"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Testimonial Content */}
            <div className="relative min-h-[280px] sm:min-h-[240px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === currentIndex
                      ? "opacity-100 translate-x-0 relative"
                      : "opacity-0 absolute top-0 left-0 right-0 translate-x-4 pointer-events-none"
                  }`}
                  aria-hidden={index !== currentIndex}
                >
                  {index === currentIndex && (
                    <>
                      {/* Rating */}
                      <div className="flex items-center mb-5 sm:mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-[#0d0d0d] leading-relaxed mb-6 sm:mb-8">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center">
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden mr-4">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.author}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-display font-semibold text-[#0d0d0d] text-sm sm:text-base">
                            {testimonial.author}
                          </p>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 sm:mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-10 flex items-center justify-center transition-all duration-300 ${
                  index === currentIndex ? "w-8" : "w-4"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              >
                <span
                  className={`block h-1.5 w-full rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[#0d0d0d]"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
