import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Play, BarChart3, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContentBlock } from "@/hooks/useCMSData";
import heroImage from "@/assets/hero-offshore.jpg";

const defaultQuickAccess = [
  {
    iconKey: "TrendingUp",
    titleKey: "nav.investment",
    descriptionKey: "services.tenders.description",
    href: "/investor-portal",
  },
  {
    iconKey: "Shield",
    titleKey: "services.regulation.title",
    descriptionKey: "services.regulation.description",
    href: "/regulation",
  },
  {
    iconKey: "BarChart3",
    titleKey: "nav.data",
    descriptionKey: "services.analytics.description",
    href: "/ep-data",
  },
];

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
};

export function HeroSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // CMS content block with fallback
  const { data: cmsBlock } = useContentBlock("home", "hero");
  const cmsContent = cmsBlock?.content;
  const heroImg = cmsContent?.image || heroImage;
  const quickAccessItems = cmsContent?.quickAccess?.length ? cmsContent.quickAccess : defaultQuickAccess;

  // Multi-layer parallax transforms with different speeds
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const midgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.6, 0.9]);
  
  // Floating particles parallax
  const particle1Y = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const particle2Y = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const particle3Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Layer 1: Background Image (slowest parallax) */}
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImg}
          alt="Offshore oil platform"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Layer 2: Gradient Overlay with parallax */}
      <motion.div 
        style={{ y: midgroundY, opacity: overlayOpacity }}
        className="absolute inset-0 z-[1] hero-overlay" 
      />
      
      {/* Layer 3: Floating Particles/Orbs for depth */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: particle1Y }}
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ y: particle2Y }}
          className="absolute bottom-40 -left-32 w-64 h-64 rounded-full bg-primary/10 blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          style={{ y: particle3Y }}
          className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-primary/15 blur-xl"
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Layer 4: Geometric patterns overlay */}
      <motion.div 
        style={{ y: foregroundY }}
        className="absolute inset-0 z-[3] opacity-[0.03]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,hsl(var(--primary))_49%,hsl(var(--primary))_51%,transparent_52%)] bg-[length:60px_60px]" />
      </motion.div>
      
      {/* Layer 5: Radial vignette */}
      <div className="absolute inset-0 z-[4] opacity-40 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_100%)]" />

      {/* Layer 6: Content */}
      <motion.div
        style={{ opacity, y: contentY }}
        className="relative z-10 container mx-auto px-6 lg:px-8 pt-24"
      >
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse-slow" />
            <span className="text-sm text-primary-foreground font-medium">
              {cmsContent?.subtitle || t("hero.subtitle")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-title text-primary-foreground mb-6"
          >
            {cmsContent?.title || t("hero.title")}<br />
            <span className="text-primary">{cmsContent?.titleHighlight || t("hero.titleHighlight")}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-subtitle text-primary-foreground/80 max-w-2xl mb-10"
          >
            {cmsContent?.description || t("hero.description")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button variant="hero" size="xl" className="group">
              {cmsContent?.ctaPrimary || t("hero.ctaPrimary")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl" className="group">
              <Play className="w-5 h-5" />
              {cmsContent?.ctaSecondary || t("hero.ctaSecondary")}
            </Button>
          </motion.div>
        </div>

        {/* Quick Access Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {quickAccessItems.map((item: any, idx: number) => (
            <QuickAccessCard
              key={idx}
              icon={iconMap[item.iconKey] || <TrendingUp className="w-6 h-6" />}
              titleKey={item.titleKey}
              title={item.title}
              descriptionKey={item.descriptionKey}
              description={item.description}
              href={item.href}
              delay={0.6 + idx * 0.1}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-primary-foreground/60 uppercase tracking-widest">
            {t("hero.scrollHint")}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary-foreground rounded-full"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

interface QuickAccessCardProps {
  icon: React.ReactNode;
  titleKey?: string;
  title?: string;
  descriptionKey?: string;
  description?: string;
  href: string;
  delay: number;
}

function QuickAccessCard({ icon, titleKey, title, descriptionKey, description, href, delay }: QuickAccessCardProps) {
  const { t } = useTranslation();
  
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group glass-dark rounded-sm p-6 hover:bg-primary-foreground/5 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div>
          <h3 className="text-primary-foreground font-semibold mb-1 group-hover:text-primary transition-colors">
            {title || (titleKey ? t(titleKey) : "")}
          </h3>
          <p className="text-sm text-primary-foreground/60">
            {description || (descriptionKey ? t(descriptionKey) : "")}
          </p>
        </div>
      </div>
    </motion.a>
  );
}
