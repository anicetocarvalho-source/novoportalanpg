import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import angolaCoast from "@/assets/angola-coast.jpg";

const highlights = [
  "Acesso a 47 blocos petrolíferos onshore e offshore",
  "Regime fiscal competitivo e estável",
  "Infraestrutura de classe mundial",
  "Apoio regulatório dedicado aos investidores",
  "Reservas comprovadas superiores a 8 mil milhões de barris",
];

const blocks = [
  { name: "Bloco 15/06", status: "Em Produção", operator: "Eni" },
  { name: "Bloco 31", status: "Em Produção", operator: "BP" },
  { name: "Bloco 17", status: "Em Produção", operator: "TotalEnergies" },
  { name: "Bloco 32", status: "Em Desenvolvimento", operator: "TotalEnergies" },
];

export function InvestmentSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
              Oportunidades de Investimento
            </span>
            <h2 className="section-title mb-6">
              Invista no Futuro<br />
              <span className="text-primary">Energético de Angola</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Angola oferece um ambiente favorável ao investimento no sector 
              petrolífero, com um quadro regulatório transparente, incentivos 
              fiscais atractivos e acesso a recursos de classe mundial.
            </p>

            {/* Highlights */}
            <ul className="space-y-4 mb-10">
              {highlights.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" className="group">
                Guia do Investidor
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="heroOutlineLight" size="lg">
                Ver Blocos Disponíveis
              </Button>
            </div>
          </motion.div>

          {/* Visual Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <img
                src={angolaCoast}
                alt="Angola coastline"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
              
              {/* Location indicator */}
              <div className="absolute top-6 left-6 flex items-center gap-2 text-primary-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Luanda, Angola</span>
              </div>
            </div>

            {/* Blocks Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-8 -left-8 md:left-auto md:-right-8 bg-background rounded-sm p-6 shadow-hero border border-border max-w-xs"
            >
              <h4 className="font-semibold text-foreground mb-4">Blocos em Destaque</h4>
              <div className="space-y-3">
                {blocks.map((block) => (
                  <div key={block.name} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{block.name}</span>
                    <span className="text-muted-foreground">{block.operator}</span>
                  </div>
                ))}
              </div>
              <a href="/investment/blocks" className="mt-4 text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                Ver todos os blocos
                <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>

            {/* Decorative */}
            <div className="absolute -z-10 -top-8 -right-8 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
