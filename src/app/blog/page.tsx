"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    id: 1,
    category: "Story",
    title: "The Art of Trail Running: Finding Flow in Nature",
    excerpt:
      "Discover how trail running connects us with the natural world and transforms our relationship with movement.",
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
    href: "/blog/trail-running-art",
    date: "Jan 15, 2024",
    readTime: "8 min read",
  },
  {
    id: 2,
    category: "Guide",
    title: "Essential Gear for Your First Marathon",
    excerpt:
      "Everything you need to know about choosing the right gear for race day success — from shoes to accessories.",
    image:
      "https://images.unsplash.com/photo-1590333748338-d629e4564ad9?w=800&q=80",
    href: "/blog/marathon-gear-guide",
    date: "Jan 10, 2024",
    readTime: "10 min read",
  },
  {
    id: 3,
    category: "Event",
    title: "Morning Run Club — Every Saturday 7AM",
    excerpt:
      "Join our weekly community run through the city. All paces welcome. Coffee included after every session.",
    image:
      "https://images.unsplash.com/photo-1544899489-a083461b088c?w=800&q=80",
    href: "/community",
    date: "Every Week",
    readTime: "3 min read",
  },
  {
    id: 4,
    category: "Guide",
    title: "How to Choose the Right Running Shorts",
    excerpt:
      "Split shorts, half-tights, or 5-inch? We break down the pros and cons of every style to help you find your perfect pair.",
    image:
      "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80",
    href: "/blog",
    date: "Dec 28, 2023",
    readTime: "6 min read",
  },
  {
    id: 5,
    category: "Story",
    title: "Bangkok to Chiang Mai: A Runner's Road Trip",
    excerpt:
      "We drove 700km north to find Thailand's best running routes — from temple loops to mountain trails.",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
    href: "/blog",
    date: "Dec 15, 2023",
    readTime: "12 min read",
  },
  {
    id: 6,
    category: "Guide",
    title: "Recovery 101: What to Do After a Long Run",
    excerpt:
      "Foam rolling, nutrition timing, and sleep — the three pillars of post-run recovery that every runner should know.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    href: "/blog",
    date: "Dec 5, 2023",
    readTime: "7 min read",
  },
];

const categories = ["All", "Story", "Guide", "Event"];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[#0d0d0d] mb-4">
            Blog
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Stories, guides, and insights from the running community.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 text-sm font-display font-medium rounded-full transition-colors whitespace-nowrap ${
                cat === "All"
                  ? "bg-[#0d0d0d] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <Link href={posts[0].href} className="group block mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={posts[0].image}
                alt={posts[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white px-3 py-1.5 text-xs font-display font-semibold uppercase tracking-wider rounded-sm">
                  {posts[0].category}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                <span>{posts[0].date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>{posts[0].readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#0d0d0d] mb-4 group-hover:underline underline-offset-4">
                {posts[0].title}
              </h2>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                {posts[0].excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-display font-semibold text-[#0d0d0d] mt-6 group-hover:gap-3 transition-all">
                Read Article
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Link>

        {/* Divider */}
        <hr className="border-gray-100 mb-12" />

        {/* Post Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {posts.slice(1).map((post) => (
            <Link key={post.id} href={post.href} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white px-3 py-1.5 text-[10px] font-display font-semibold uppercase tracking-wider rounded-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-lg font-display font-semibold text-[#0d0d0d] mb-2 group-hover:underline underline-offset-2">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
