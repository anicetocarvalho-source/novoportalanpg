import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Play, BarChart3, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-offshore.jpg";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImage}
          alt="Offshore oil platform"
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] hero-overlay" />
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 z-[2] opacity-10 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container mx-auto px-6 lg:px-8 pt-24"
      >
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse-slow" />
            <span className="text-sm text-primary-foreground font-medium">
              Angola Energy Summit 2025 — Inscrições Abertas
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-title text-primary-foreground mb-6"
          >
            Potenciando o Futuro<br />
            <span className="text-primary">Energético de Angola</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-subtitle text-primary-foreground/80 max-w-2xl mb-10"
          >
            A Agência Nacional de Petróleo, Gás e Biocombustíveis lidera a 
            transformação do sector energético, promovendo transparência, 
            investimento e desenvolvimento sustentável.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button variant="hero" size="xl" className="group">
              Explorar Oportunidades
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl" className="group">
              <Play className="w-5 h-5" />
              Ver Apresentação
            </Button>
          </motion.div>
        </div>

        {/* Quick Access Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <QuickAccessCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Investimentos"
            description="Descubra oportunidades em blocos petrolíferos"
            href="/investment"
            delay={0.6}
          />
          <QuickAccessCard
            icon={<Shield className="w-6 h-6" />}
            title="Regulação"
            description="Quadro legal e normativo do sector"
            href="/regulation"
            delay={0.7}
          />
          <QuickAccessCard
            icon={<BarChart3 className="w-6 h-6" />}
            title="Dados de Energia"
            description="Estatísticas e relatórios em tempo real"
            href="/data"
            delay={0.8}
          />
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
            Scroll
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
  title: string;
  description: string;
  href: string;
  delay: number;
}

function QuickAccessCard({ icon, title, description, href, delay }: QuickAccessCardProps) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group glass-dark rounded-sm p-6 hover:bg-primary-foreground/5 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-primary/20 flex items-center justify-center text-primary">
          {icon}
        </div>
        <div>
          <h3 className="text-primary-foreground font-semibold mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-primary-foreground/60">
            {description}
          </p>
        </div>
      </div>
    </motion.a>
  );
}
