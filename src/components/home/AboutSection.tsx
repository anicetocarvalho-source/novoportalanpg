import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Shield, Target, Globe, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import refineryImage from "@/assets/refinery.jpg";

const values = [
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Transparência",
    description: "Compromisso com a clareza e abertura em todas as operações.",
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Excelência",
    description: "Padrões internacionais de qualidade e eficiência.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Sustentabilidade",
    description: "Desenvolvimento responsável dos recursos energéticos.",
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Inovação",
    description: "Adopção de tecnologias avançadas no sector.",
  },
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <img
                src={refineryImage}
                alt="Modern refinery"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
              
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-6 left-6 right-6 md:right-auto md:w-64 bg-background rounded-sm p-6 shadow-hero"
              >
                <div className="text-3xl font-bold text-primary mb-1">45+</div>
                <div className="text-sm text-muted-foreground">
                  Anos de experiência no sector petrolífero angolano
                </div>
              </motion.div>
            </div>

            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-8 -right-8 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
              Sobre a ANPG
            </span>
            <h2 className="section-title mb-6">
              Regulando o Presente,<br />
              <span className="text-primary">Construindo o Futuro</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              A Agência Nacional de Petróleo, Gás e Biocombustíveis é a entidade 
              reguladora do sector petrolífero angolano, responsável pela gestão 
              e supervisão das actividades de exploração, produção e comercialização 
              de hidrocarbonetos.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center text-primary">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="heroOutlineLight" size="lg" className="group">
              Conhecer a ANPG
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
