import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[#0d0d0d] mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Our story and mission. Coming soon.
        </p>
      </div>
      <Footer />
    </main>
  );
}
