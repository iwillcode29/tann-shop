"use client";

const brands = [
  "DISTRICT VISION",
  "BANDIT RUNNING",
  "SOAR",
  "SATISFY",
  "CIELE",
  "TRACKSMITH",
];

export default function BrandMarquee() {
  // Double the array for seamless loop
  const allBrands = [...brands, ...brands];

  return (
    <section className="py-6 sm:py-8 bg-white border-y border-gray-100 overflow-hidden">
      <div className="marquee" aria-label="Featured brands">
        <div className="marquee-content flex items-center">
          {allBrands.map((brand, index) => (
            <span
              key={index}
              className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-gray-200 tracking-tight px-6 sm:px-8 whitespace-nowrap select-none"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
