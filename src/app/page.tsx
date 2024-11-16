import Header from "@/components/Header";
import HeroSection from "@/components/heroSection";
import FeaturedCategories from "@/components/FeaturedCategories";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedCategories />
      <main className="container mx-auto px-4 py-16">
        {/* Autre contenu */}
      </main>
      <footer className="bg-primary text-white py-8">
        {/* Footer content */}
      </footer>
    </div>
  );
}
