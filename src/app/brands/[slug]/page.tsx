import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

// Brand data - can be moved to a separate file or database later
const brands: Record<string, { name: string; description: string }> = {
  "district-vision": {
    name: "District Vision",
    description: "Performance eyewear and apparel for the modern athlete.",
  },
  bandit: {
    name: "Bandit Running",
    description: "New York based running collective.",
  },
  soar: {
    name: "Soar",
    description: "British running innovation.",
  },
  // "satisfy" has its own dedicated page at /brands/satisfy
  ciele: {
    name: "Ciele",
    description: "Performance headwear.",
  },
  tracksmith: {
    name: "Tracksmith",
    description: "Athletic excellence.",
  },
  // Example: Adding new brands is this easy!
  "on-running": {
    name: "On Running",
    description: "Swiss performance running shoes and apparel.",
  },
  hoka: {
    name: "Hoka",
    description: "Maximalist cushioning for long-distance comfort.",
  },
  nnormal: {
    name: "Nnormal",
    description: "Trail running gear from Kilian Jornet.",
  },
};

interface BrandPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(brands).map((slug) => ({
    slug,
  }));
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = brands[slug];

  // Return 404 if brand doesn't exist
  if (!brand) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[#0d0d0d] mb-6">
          {brand.name}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          {brand.description} Coming soon.
        </p>
      </div>
      <Footer />
    </main>
  );
}
