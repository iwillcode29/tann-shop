import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function MarathonGearGuidePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto">
          <span className="text-sm text-gray-400 mb-3 block">Jan 10, 2024 • Guide</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[#0d0d0d] mb-6">
            Essential Gear for Your First Marathon
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Everything you need to know about choosing the right gear for race day success.
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
