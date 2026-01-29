"use client";

import { useEffect, useRef, useState, memo } from "react";

// Memoized feature icons for performance
const ShippingIcon = memo(() => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
  </svg>
));
ShippingIcon.displayName = "ShippingIcon";

const ReturnsIcon = memo(() => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
));
ReturnsIcon.displayName = "ReturnsIcon";

const SecureIcon = memo(() => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
));
SecureIcon.displayName = "SecureIcon";

const SupportIcon = memo(() => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
));
SupportIcon.displayName = "SupportIcon";

const features = [
  {
    icon: <ShippingIcon />,
    title: "Free Shipping",
    description: "On orders over $150",
  },
  {
    icon: <ReturnsIcon />,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: <SecureIcon />,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: <SupportIcon />,
    title: "Expert Support",
    description: "Running specialists on call",
  },
];

export default function Features() {
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
      { threshold: 0.3, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`text-center group ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center text-white/80 mb-4 group-hover:text-white transition-colors">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-white font-display font-semibold text-sm sm:text-base mb-1">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-xs sm:text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
