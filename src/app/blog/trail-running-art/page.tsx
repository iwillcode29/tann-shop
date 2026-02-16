"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function TrailRunningArtPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Image */}
      <div className="relative w-full h-[50vh] sm:h-[60vh]">
        <Image
          src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1600&q=80"
          alt="Trail running through nature"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 lg:p-16 max-w-4xl mx-auto">
          <span className="inline-block bg-white px-3 py-1 text-xs font-display font-semibold uppercase tracking-wider mb-4">
            Story
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
            The Art of Trail Running: Finding Flow in Nature
          </h1>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-10 pb-10 border-b border-gray-100">
          <span>Jan 15, 2024</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>8 min read</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>By TANN Editorial</span>
        </div>

        {/* Body */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
          <p className="text-xl text-gray-900 font-medium leading-relaxed">
            There&apos;s a moment in every trail run where the world falls away. The noise of daily life, the buzzing phone, the endless to-do list — it all dissolves into the rhythm of your footsteps on dirt, the sound of wind through trees, and the steady beat of your own breath.
          </p>

          <h2 className="text-2xl font-display font-bold text-[#0d0d0d] mt-12 mb-4">
            Why Trails Change Everything
          </h2>
          <p>
            Road running is efficient. It&apos;s measurable. You can track every split, every pace, every heartbeat zone. But trail running is something different entirely. It asks you to let go of the watch and pay attention to the world around you.
          </p>
          <p>
            Every step on a trail is a micro-decision. Your body learns to read the terrain — roots, rocks, mud, sand — and your feet respond instinctively. This constant engagement with the ground beneath you creates a state of flow that&apos;s almost impossible to achieve on pavement.
          </p>

          <blockquote className="border-l-4 border-[#e63946] pl-6 my-10 text-xl italic text-gray-600">
            &ldquo;The trail doesn&apos;t care about your PR. It only asks that you show up, pay attention, and move.&rdquo;
          </blockquote>

          <h2 className="text-2xl font-display font-bold text-[#0d0d0d] mt-12 mb-4">
            The Gear That Gets You There
          </h2>
          <p>
            Trail running demands a different approach to gear. You need shoes that grip, fabrics that breathe and dry fast, and layers that move with your body over hours of varied terrain. Brands like <strong>Satisfy</strong>, <strong>District Vision</strong>, and <strong>Nnormal</strong> understand this. They design for the runner who sees the trail as both a playground and a meditation space.
          </p>
          <p>
            A good trail shoe — like the Nnormal Tomir — gives you confidence on technical descents without sacrificing feel on the uphills. And when you pair that with a lightweight, moisture-wicking tee from Satisfy, you&apos;re not just dressed for the trail — you&apos;re dressed for the experience.
          </p>

          <h2 className="text-2xl font-display font-bold text-[#0d0d0d] mt-12 mb-4">
            Finding Your Trail
          </h2>
          <p>
            The beauty of trail running is that it starts wherever the pavement ends. A local park, a hillside path, a forest reserve — these are all doorways to a different kind of running. You don&apos;t need to fly to the Alps to find flow. You just need to take a left where you usually go straight.
          </p>
          <p>
            In Bangkok, runners are discovering trails in Doi Suthep, Khao Yai, and even the hidden green corridors of Bang Krachao. The TANN Run Club regularly organizes trail sessions for all levels — from first-timers to ultra runners — because we believe the trail belongs to everyone.
          </p>

          <h2 className="text-2xl font-display font-bold text-[#0d0d0d] mt-12 mb-4">
            Start Small, Go Far
          </h2>
          <p>
            If you&apos;re new to trail running, start with short, easy trails. Don&apos;t worry about pace. Walk the uphills. Take photos at the top. Let yourself be slow and curious. The speed will come later — and honestly, on the trail, it matters less than you think.
          </p>
          <p>
            What matters is showing up. What matters is putting one foot in front of the other on ground that isn&apos;t flat, isn&apos;t predictable, and isn&apos;t boring. What matters is finding that moment of flow where you and the trail become one.
          </p>

          <div className="bg-gray-50 rounded-lg p-8 mt-12">
            <h3 className="text-lg font-display font-bold text-[#0d0d0d] mb-3">Trail Running Essentials</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">—</span> Trail shoes with good grip and protection</li>
              <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">—</span> Lightweight, quick-dry top and shorts</li>
              <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">—</span> Hydration vest or handheld bottle</li>
              <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">—</span> Cap or visor for sun protection</li>
              <li className="flex items-start gap-2"><span className="text-[#e63946] font-bold mt-0.5">—</span> Trail map or GPS watch</li>
            </ul>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
          {["Trail Running", "Flow State", "Nature", "Gear Guide", "TANN Run Club"].map((tag) => (
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
            <Link href="/blog/marathon-gear-guide" className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1590333748338-d629e4564ad9?w=800&q=80"
                  alt="Marathon gear guide"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white px-3 py-1 text-[10px] font-display font-semibold uppercase tracking-wider rounded-sm">
                    Guide
                  </span>
                </div>
              </div>
              <h4 className="font-display font-semibold text-[#0d0d0d] group-hover:underline underline-offset-2">
                Essential Gear for Your First Marathon
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
