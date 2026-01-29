import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import BrandMarquee from "@/components/BrandMarquee";
import ProductCarousel from "@/components/ProductCarousel";
import BrandShowcase from "@/components/BrandShowcase";
import Categories from "@/components/Categories";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Community from "@/components/Community";
import Newsletter from "@/components/Newsletter";
import InstagramFeed from "@/components/InstagramFeed";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <BrandMarquee />
      <ProductCarousel />
      <Categories />
      <Features />
      <BrandShowcase />
      {/* <Testimonials /> */}
      <Community />
      <Newsletter />
      <InstagramFeed />
      <Footer />
    </main>
  );
}
