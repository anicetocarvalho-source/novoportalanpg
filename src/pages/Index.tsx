import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { InvestmentSection } from "@/components/home/InvestmentSection";
import { NewsSection } from "@/components/home/NewsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <InvestmentSection />
        <NewsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
