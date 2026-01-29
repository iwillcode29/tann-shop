import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function TrailCapPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[#0d0d0d] mb-6">
          Trail Cap
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-4">
          Ciele
        </p>
        <div className="flex items-center gap-3">
          <p className="text-2xl font-semibold text-[#0d0d0d]">$45</p>
          <span className="bg-[#0d0d0d] text-white text-xs font-display font-semibold px-3 py-1.5 uppercase tracking-wider">
            New
          </span>
        </div>
        <p className="text-base text-gray-500 mt-6 max-w-2xl">
          Product details coming soon.
        </p>
      </div>
      <Footer />
    </main>
  );
}
