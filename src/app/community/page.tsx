"use client";

import { useState, useEffect, useRef, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
// Data
// ─────────────────────────────────────────────

const upcomingEvents = [
  {
    id: 1,
    title: "Saturday Morning Run",
    date: "Every Saturday",
    time: "7:00 AM",
    location: "Lumpini Park, Bangkok",
    distance: "5-10K",
    pace: "All paces",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=85",
    tag: "Weekly",
    href: "/events/morning-run",
  },
  {
    id: 2,
    title: "Trail Tuesday",
    date: "Every Tuesday",
    time: "5:30 PM",
    location: "Doi Suthep Trail, Chiang Mai",
    distance: "8-15K",
    pace: "Moderate",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=85",
    tag: "Weekly",
    href: "/events/morning-run",
  },
  {
    id: 3,
    title: "Full Moon Run",
    date: "March 14, 2026",
    time: "8:00 PM",
    location: "Riverside Promenade",
    distance: "10K",
    pace: "Easy social pace",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=85",
    tag: "Special",
    href: "/events/morning-run",
  },
  {
    id: 4,
    title: "Long Run Sunday",
    date: "1st Sunday / Month",
    time: "6:00 AM",
    location: "Bang Krachao Green Lung",
    distance: "15-25K",
    pace: "Marathon prep",
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=85",
    tag: "Monthly",
    href: "/events/morning-run",
  },
];

const communityStories = [
  {
    id: 1,
    name: "Nat S.",
    role: "Ultra Runner",
    quote: "TANN introduced me to trail running. Now I can't imagine a weekend without dirt under my feet.",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80",
    km: "3,200",
    since: "2023",
  },
  {
    id: 2,
    name: "Pim K.",
    role: "Marathon Finisher",
    quote: "The Saturday group got me from couch to marathon in 8 months. This crew is family.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    km: "1,800",
    since: "2024",
  },
  {
    id: 3,
    name: "Alex R.",
    role: "Trail Guide",
    quote: "Best gear shop and best people. Every run with this group reminds me why I started.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    km: "5,400",
    since: "2022",
  },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80", alt: "Group run sunrise", span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&q=80", alt: "Trail running", span: "" },
  { src: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80", alt: "Runner silhouette", span: "" },
  { src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80", alt: "Mountain trail", span: "" },
  { src: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80", alt: "Post-run coffee", span: "col-span-2" },
  { src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80", alt: "Running gear", span: "" },
];

// ─────────────────────────────────────────────
// Event Card
// ─────────────────────────────────────────────

const EventCard = memo(({ event, index }: { event: (typeof upcomingEvents)[0]; index: number }) => {
  const { ref, isVisible } = useInView(0.1);

  return (
    <div
      ref={ref}
      className="group transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <Link href={event.href} className="block">
        <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/9]">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Tag */}
          <div className="absolute top-4 left-4">
            <span className={`text-[9px] font-display font-bold uppercase tracking-[0.2em] px-2.5 py-1 ${
              event.tag === "Special"
                ? "bg-[#e63946] text-white"
                : event.tag === "Monthly"
                  ? "bg-amber-500 text-black"
                  : "bg-white text-black"
            }`}>
              {event.tag}
            </span>
          </div>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2 group-hover:underline underline-offset-4 decoration-white/40">
              {event.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/60">
              <span className="flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {event.date}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {event.time}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.location}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-[10px] font-display font-semibold uppercase tracking-[0.15em] text-white/80 bg-white/10 px-2.5 py-1 backdrop-blur-sm">
                {event.distance}
              </span>
              <span className="text-[10px] text-white/40">
                {event.pace}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});
EventCard.displayName = "EventCard";

// ─────────────────────────────────────────────
// Story Card
// ─────────────────────────────────────────────

const StoryCard = memo(({ story, index }: { story: (typeof communityStories)[0]; index: number }) => {
  const { ref, isVisible } = useInView(0.1);

  return (
    <div
      ref={ref}
      className="relative transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${index * 120}ms`,
      }}
    >
      <div className="bg-[#f7f6f3] p-6 sm:p-8 h-full flex flex-col">
        {/* Quote */}
        <div className="flex-1">
          <svg className="w-6 h-6 text-[#0d0d0d]/10 mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
          </svg>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-[#0d0d0d]/70 italic">
            &ldquo;{story.quote}&rdquo;
          </p>
        </div>

        {/* Author */}
        <div className="mt-6 pt-5 border-t border-[#0d0d0d]/5 flex items-center gap-4">
          <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={story.image}
              alt={story.name}
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-display font-semibold text-[#0d0d0d]">
              {story.name}
            </p>
            <p className="text-[11px] text-[#0d0d0d]/40">{story.role}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[13px] font-display font-bold text-[#0d0d0d]">{story.km} km</p>
            <p className="text-[10px] text-[#0d0d0d]/30 uppercase tracking-wider">Since {story.since}</p>
          </div>
        </div>
      </div>
    </div>
  );
});
StoryCard.displayName = "StoryCard";

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────

export default function CommunityPage() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const statsSection = useInView(0.2);
  const gallerySection = useInView(0.1);
  const joinSection = useInView(0.2);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <Navigation variant="dark" />

      {/* ═══════════════════════════════════════════
          HERO — Warm, inviting, human
          ═══════════════════════════════════════════ */}
      <section className="relative pt-28 lg:pt-32 pb-0 overflow-hidden">
        {/* Background — warm gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f7] via-[#f5f3ef] to-[#faf9f7]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl pt-8 lg:pt-16 pb-12 lg:pb-20">
            {/* Overline */}
            <div
              className="transition-all duration-700"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(15px)",
              }}
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#0d0d0d]/30 font-display font-semibold">
                TANN Run Club
              </span>
            </div>

            {/* Headline */}
            <h1
              className="mt-5 transition-all duration-700 delay-100"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-[#0d0d0d] leading-[1.05] tracking-tight">
                We run
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.05] tracking-tight">
                <span className="italic font-light text-[#0d0d0d]/40">together.</span>
              </span>
            </h1>

            <p
              className="mt-6 text-[15px] sm:text-base leading-[1.8] text-[#0d0d0d]/50 max-w-lg transition-all duration-700 delay-300"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(15px)",
              }}
            >
              No minimum pace. No maximum distance. Just people who love to move, share a trail,
              and grab coffee after. Every week, rain or shine.
            </p>

            <div
              className="mt-8 flex flex-wrap items-center gap-3 transition-all duration-700 delay-500"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(15px)",
              }}
            >
              <a
                href="#events"
                className="btn-primary text-[11px] px-7 py-4 min-h-0"
              >
                Upcoming Runs
              </a>
              <a
                href="#join"
                className="btn-secondary text-[11px] px-7 py-4 min-h-0"
              >
                Join the Club
              </a>
            </div>
          </div>

          {/* Hero Image Mosaic */}
          <div
            className="relative grid grid-cols-3 gap-2 sm:gap-3 transition-all duration-1000 delay-500"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <div className="col-span-2 relative aspect-[16/10] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1000&q=85"
                alt="Community run at sunrise"
                fill
                priority
                className="object-cover"
                sizes="66vw"
              />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&q=85"
                alt="Trail running group"
                fill
                priority
                className="object-cover"
                sizes="33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS BAR
          ═══════════════════════════════════════════ */}
      <section className="bg-[#0d0d0d] py-10 lg:py-14">
        <div
          ref={statsSection.ref}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 transition-all duration-700"
            style={{
              opacity: statsSection.isVisible ? 1 : 0,
              transform: statsSection.isVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {[
              { value: "400+", label: "Active Members" },
              { value: "52", label: "Runs Per Year" },
              { value: "12K", label: "Total KM in 2025" },
              { value: "100%", label: "Free to Join" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="text-center lg:text-left transition-all duration-700"
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <p className="text-3xl sm:text-4xl font-display font-bold text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/30 font-display">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          UPCOMING EVENTS
          ═══════════════════════════════════════════ */}
      <section id="events" className="py-20 lg:py-28 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#0d0d0d]/30 font-display font-semibold">
                Get Moving
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#0d0d0d] tracking-tight">
                Upcoming Runs
              </h2>
            </div>
            <Link
              href="/events/morning-run"
              className="text-[11px] uppercase tracking-[0.12em] font-display font-semibold text-[#0d0d0d]/40 hover:text-[#0d0d0d] transition-colors border-b border-[#0d0d0d]/10 hover:border-[#0d0d0d]/40 pb-0.5 self-start sm:self-auto"
            >
              View Calendar
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
            {upcomingEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS — Simple 3-step
          ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-24 bg-white border-y border-[#0d0d0d]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#0d0d0d]/30 font-display font-semibold">
              How It Works
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-display font-bold text-[#0d0d0d] tracking-tight">
              Three steps. Zero excuses.
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 lg:gap-16 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Show Up",
                desc: "Check our schedule, pick a run, and just come. No signup, no membership fee, no gear requirement.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Run Together",
                desc: "We split into pace groups so nobody gets left behind. Trails, roads, tracks \u2014 we mix it up every week.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Stay Connected",
                desc: "Post-run coffee is mandatory. Join our group chat for route tips, gear advice, and race day support.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full border border-[#0d0d0d]/10 flex items-center justify-center text-[#0d0d0d]/40 group-hover:bg-[#0d0d0d] group-hover:text-white group-hover:border-[#0d0d0d] transition-all duration-300">
                  {item.icon}
                </div>
                <p className="text-[10px] text-[#0d0d0d]/20 font-display font-bold uppercase tracking-[0.3em] mb-2">
                  {item.step}
                </p>
                <h3 className="text-[15px] font-display font-bold text-[#0d0d0d] mb-2">
                  {item.title}
                </h3>
                <p className="text-[12px] leading-[1.8] text-[#0d0d0d]/40">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COMMUNITY STORIES
          ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#0d0d0d]/30 font-display font-semibold">
              Real Runners
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#0d0d0d] tracking-tight">
              From the crew
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 lg:gap-5">
            {communityStories.map((story, i) => (
              <StoryCard key={story.id} story={story} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GALLERY — Masonry-style photo grid
          ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#0d0d0d]/30 font-display font-semibold">
              On The Road
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#0d0d0d] tracking-tight">
              Moments from the run
            </h2>
          </div>

          <div
            ref={gallerySection.ref}
            className="grid grid-cols-3 gap-2 sm:gap-3 auto-rows-[140px] sm:auto-rows-[180px] lg:auto-rows-[220px] transition-all duration-700"
            style={{
              opacity: gallerySection.isVisible ? 1 : 0,
              transform: gallerySection.isVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden group ${img.span}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          JOIN CTA — Newsletter + Social
          ═══════════════════════════════════════════ */}
      <section id="join" className="relative py-24 lg:py-32 bg-[#0d0d0d] overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div
          ref={joinSection.ref}
          className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700"
          style={{
            opacity: joinSection.isVisible ? 1 : 0,
            transform: joinSection.isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-display font-semibold">
            Don&apos;t Run Alone
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-[1.1]">
            Join the crew
          </h2>
          <p className="mt-4 text-[14px] text-white/40 leading-relaxed max-w-md mx-auto">
            Get weekly run schedules, event invites, and first access to new gear drops.
            No spam, just runs.
          </p>

          {/* Email signup */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            {isSubmitted ? (
              <div className="w-full py-4 text-[13px] text-green-400 font-display font-semibold flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                You&apos;re in. See you on the road.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-white/5 border border-white/10 text-white placeholder-white/20 px-5 py-4 text-[13px] focus:outline-none focus:border-white/30 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-white text-[#0d0d0d] px-7 py-4 text-[11px] font-display font-bold uppercase tracking-[0.15em] hover:bg-white/90 transition-colors flex-shrink-0"
                >
                  Count Me In
                </button>
              </>
            )}
          </form>

          {/* Social links */}
          <div className="mt-10 flex items-center justify-center gap-5">
            {[
              { label: "Instagram", icon: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 1h11A5.5 5.5 0 0123 6.5v11a5.5 5.5 0 01-5.5 5.5h-11A5.5 5.5 0 011 17.5v-11A5.5 5.5 0 016.5 1z" },
              { label: "Strava", icon: "M12 2L5.5 14h4.17L12 9.5l2.33 4.5h4.17L12 2zM15.5 14l-1.5 3-1.5-3" },
              { label: "LINE", icon: "M12 2C6.48 2 2 5.82 2 10.5c0 3.27 2.15 6.14 5.36 7.73-.07.65-.42 2.42-.48 2.79 0 0-.01.08.04.11.05.03.12.01.12.01.66-.09 3.84-2.51 4.33-2.87.54.08 1.09.12 1.63.12 5.52 0 10-3.82 10-8.5S17.52 2 12 2z" },
            ].map((social) => (
              <button
                key={social.label}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all duration-300"
                aria-label={social.label}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={social.icon} />
                </svg>
              </button>
            ))}
          </div>

          <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-white/15">
            Free forever. No membership fees.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
