import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function TrailRunningArtPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto">
          <span className="text-sm text-gray-400 mb-3 block">Jan 15, 2024 • Story</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[#0d0d0d] mb-6">
            The Art of Trail Running: Finding Flow in Nature
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Discover how trail running connects us with the natural world and transforms our relationship with movement.
          </p>
          <div className="mt-8 text-base text-gray-500">
            <p>Article content coming soon.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
