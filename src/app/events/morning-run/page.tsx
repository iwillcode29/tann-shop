import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function MorningRunPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto">
          <span className="text-sm text-gray-400 mb-3 block">Every Week • Event</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[#0d0d0d] mb-6">
            Morning Run Club - Every Saturday 7AM
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Join our weekly community run through the city. All paces welcome. Coffee included.
          </p>
          <div className="text-base text-gray-500">
            <p>Event details coming soon.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
