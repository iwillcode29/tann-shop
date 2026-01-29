"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (email && !isLoading) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitted(true);
        setEmail("");
        setIsLoading(false);
      }, 800);
    }
  }, [email, isLoading]);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-[#0d0d0d]"
    >
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Gradient accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#e63946]/5 to-transparent" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={isVisible ? "animate-fadeInUp" : "opacity-0"}>
          {/* Label */}
          <span className="inline-block text-white/40 text-xs sm:text-sm uppercase tracking-[0.2em] mb-4 font-display">
            Join the Community
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight mb-4 sm:mb-6">
            Run With Us
          </h2>

          {/* Description */}
          <p className="text-white/60 text-sm sm:text-base lg:text-lg max-w-xl mx-auto mb-8 sm:mb-10">
            Subscribe to our newsletter for exclusive drops, running tips, and
            member-only discounts. Be the first to know about new arrivals.
          </p>
        </div>

        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto ${
              isVisible ? "animate-fadeInUp stagger-2" : "opacity-0"
            }`}
          >
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors text-sm sm:text-base rounded-sm"
                required
                disabled={isLoading}
                aria-label="Email address"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 sm:px-8 py-4 bg-white text-[#0d0d0d] font-display font-semibold uppercase tracking-wider text-xs sm:text-sm hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed rounded-sm min-h-[52px] flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        ) : (
          <div
            className={`text-center ${
              isVisible ? "animate-scaleIn" : "opacity-0"
            }`}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-emerald-500/20 rounded-full mb-4">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-white text-lg sm:text-xl font-display font-medium mb-2">
              Welcome to the community!
            </p>
            <p className="text-white/50 text-sm">
              Check your inbox for a welcome gift.
            </p>
          </div>
        )}

        {/* Privacy note */}
        <p
          className={`text-white/30 text-[10px] sm:text-xs mt-5 sm:mt-6 ${
            isVisible ? "animate-fadeIn stagger-4" : "opacity-0"
          }`}
        >
          By subscribing, you agree to our Privacy Policy and consent to receive updates.
        </p>
      </div>
    </section>
  );
}
