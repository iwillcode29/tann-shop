"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function MarathonGearGuidePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Image */}
      <div className="relative w-full h-[50vh] sm:h-[60vh]">
        <Image
          src="https://images.unsplash.com/photo-1590333748338-d629e4564ad9?w=1600&q=80"
          alt="Marathon gear essentials"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 lg:p-16 max-w-4xl mx-auto">
          <span className="inline-block bg-white px-3 py-1 text-xs font-display font-semibold uppercase tracking-wider mb-4">
            Guide
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
            Essential Gear for Your First Marathon
          </h1>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-10 pb-10 border-b border-gray-100">
          <span>Jan 10, 2024</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>10 min read</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>By TANN Editorial</span>
        </div>

        {/* Body */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
          <p className="text-xl text-gray-900 font-medium leading-relaxed">
            Your first marathon is more than a race — it&apos;s a personal milestone that will stay with you for life. And while training is the foundation, the gear you choose on race day can make the difference between a painful slog and a triumphant finish.
          </p>

          <h2 className="text-2xl font-display font-bold text-[#0d0d0d] mt-12 mb-4">
            The Golden Rule: Nothing New on Race Day
          </h2>
          <p>
            Before we dive into specific gear, here&apos;s the single most important piece of advice: never wear anything on race day that you haven&apos;t tested in training. That beautiful new singlet? Try it on a long run first. Those fresh shoes? Give them at least 50km before race day. Your body needs to know exactly how everything feels at kilometer 35.
          </p>

          <h2 className="text-2xl font-display font-bold text-[#0d0d0d] mt-12 mb-4">
            Shoes: Your Most Important Decision
          </h2>
          <p>
            Marathon shoes should be lightweight but supportive enough for the distance. The trend toward carbon-plated super shoes is real — and the technology works. But more important than any plate is the fit. Visit a specialty running store, get your gait analyzed, and try multiple pairs.
          </p>
          <p>
            Brands like <strong>Hoka</strong> and <strong>On Running</strong> offer excellent options across the cushioning spectrum. The Hoka Mach series provides a soft, responsive ride for most runners, while On&apos;s Cloudboom line delivers a firmer, more race-focused feel.
          </p>

          <div className="bg-gray-50 rounded-lg p-8 my-10">
            <h3 className="text-lg font-display font-bold text-[#0d0d0d] mb-4">Shoe Selection Checklist</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">—</span> Get fitted at a specialty store</li>
              <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">—</span> Run at least 50km in race shoes before the marathon</li>
              <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">—</span> Consider going half a size up for swelling</li>
              <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">—</span> Test in the same socks you&apos;ll race in</li>
            </ul>
          </div>

          <h2 className="text-2xl font-display font-bold text-[#0d0d0d] mt-12 mb-4">
            Top: Light, Breathable, Chafe-Free
          </h2>
          <p>
            For your upper body, you want a singlet or tee that&apos;s lightweight, moisture-wicking, and most importantly — won&apos;t cause chafing over 42 kilometers. Flat seams and seamless construction are your best friends here.
          </p>
          <p>
            The <strong>Soar</strong> Ultra Running Tee is a standout choice. Its mesh panels keep you cool, and the anti-odor treatment means you won&apos;t clear a path through the crowd. For cooler conditions, a lightweight long-sleeve from <strong>Tracksmith</strong> offers warmth without weight.
          </p>

          <h2 className="text-2xl font-display font-bold text-[#0d0d0d] mt-12 mb-4">
            Shorts: Comfort Over Distance
          </h2>
          <p>
            Marathon shorts need a reliable waistband that stays put without digging in, a built-in liner (or your preferred underwear), and a pocket for gels. Split shorts offer maximum freedom of movement, while half-tights provide compression for those who prefer support.
          </p>
          <p>
            The <strong>Bandit Running</strong> Speed Short strikes a great balance — light enough that you forget it&apos;s there, with a secure zip pocket for nutrition.
          </p>

          <blockquote className="border-l-4 border-[#e63946] pl-6 my-10 text-xl italic text-gray-600">
            &ldquo;Race day is not the time for experiments. Train in your gear, trust your gear, then forget about your gear and run.&rdquo;
          </blockquote>

          <h2 className="text-2xl font-display font-bold text-[#0d0d0d] mt-12 mb-4">
            Accessories That Matter
          </h2>
          <p>
            <strong>Socks:</strong> Invest in proper running socks with padding in the right places and moisture-wicking fabric. Blisters at kilometer 30 can turn a good race into a survival exercise.
          </p>
          <p>
            <strong>Cap or visor:</strong> <strong>Ciele</strong> caps are the gold standard here — ultralight, quick-dry, and they actually look good in race photos. A cap keeps sun out of your eyes and sweat off your face.
          </p>
          <p>
            <strong>Sunglasses:</strong> <strong>District Vision</strong> makes performance eyewear that stays put during a marathon and protects your eyes without the distraction of slipping frames.
          </p>
          <p>
            <strong>Watch:</strong> A GPS watch helps you pace yourself — crucial in a marathon where going out too fast is the most common mistake. But trust your body over your watch. Use it as a guide, not a dictator.
          </p>

          <h2 className="text-2xl font-display font-bold text-[#0d0d0d] mt-12 mb-4">
            Race Day Checklist
          </h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-display font-bold text-[#0d0d0d] mb-3">Wear</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">&#10003;</span> Tested race shoes</li>
                  <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">&#10003;</span> Running socks</li>
                  <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">&#10003;</span> Singlet or tee</li>
                  <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">&#10003;</span> Shorts or half-tights</li>
                  <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">&#10003;</span> Cap or visor</li>
                  <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">&#10003;</span> GPS watch</li>
                </ul>
              </div>
              <div>
                <h4 className="font-display font-bold text-[#0d0d0d] mb-3">Carry</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">&#10003;</span> Energy gels (4-6 for a full marathon)</li>
                  <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">&#10003;</span> Anti-chafe balm</li>
                  <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">&#10003;</span> Race bib + pins</li>
                  <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">&#10003;</span> Sunscreen (applied before start)</li>
                  <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">&#10003;</span> Throwaway top for warmth at the start</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-display font-bold text-[#0d0d0d] mt-12 mb-4">
            Final Thoughts
          </h2>
          <p>
            The best gear for your first marathon is gear you trust. Start building your race day kit early in your training, test everything on long runs, and by the time race day arrives, you&apos;ll have one less thing to worry about. All that&apos;s left is to run — and enjoy every kilometer of it.
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
          {["Marathon", "Gear Guide", "Race Day", "Shoes", "Training"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-gray-100 text-xs font-medium text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Related Posts */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <h3 className="text-xl font-display font-bold text-[#0d0d0d] mb-8">Read Next</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link href="/blog/trail-running-art" className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80"
                  alt="Trail running art"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white px-3 py-1 text-[10px] font-display font-semibold uppercase tracking-wider rounded-sm">
                    Story
                  </span>
                </div>
              </div>
              <h4 className="font-display font-semibold text-[#0d0d0d] group-hover:underline underline-offset-2">
                The Art of Trail Running: Finding Flow in Nature
              </h4>
            </Link>
            <Link href="/community" className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1544899489-a083461b088c?w=800&q=80"
                  alt="Morning run club"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white px-3 py-1 text-[10px] font-display font-semibold uppercase tracking-wider rounded-sm">
                    Event
                  </span>
                </div>
              </div>
              <h4 className="font-display font-semibold text-[#0d0d0d] group-hover:underline underline-offset-2">
                Morning Run Club — Every Saturday 7AM
              </h4>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
