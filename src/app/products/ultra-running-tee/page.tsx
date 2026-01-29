import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function UltraRunningTeePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[#0d0d0d] mb-6">
          Ultra Running Tee
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-4">
          Soar
        </p>
        <div className="flex items-center gap-3">
          <p className="text-2xl font-semibold text-[#0d0d0d]">$110</p>
          <p className="text-xl text-gray-400 line-through">$145</p>
          <span className="bg-[#e63946] text-white text-xs font-display font-semibold px-3 py-1.5 uppercase tracking-wider">
            Sale
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
