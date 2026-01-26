import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  FileCheck, 
  Shield, 
  BarChart3, 
  Users, 
  ArrowUpRight,
  Scale,
  Globe2,
  Leaf
} from "lucide-react";

const services = [
  {
    icon: <FileCheck className="w-7 h-7" />,
    title: "Licenciamento",
    description: "Gestão de concessões e licenças para exploração e produção de hidrocarbonetos.",
    href: "/regulation/licensing",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Fiscalização",
    description: "Supervisão e controlo das operações petrolíferas em todo o território nacional.",
    href: "/regulation/oversight",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: <Scale className="w-7 h-7" />,
    title: "Regulação",
    description: "Desenvolvimento e aplicação do quadro regulatório do sector energético.",
    href: "/regulation",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: <Globe2 className="w-7 h-7" />,
    title: "Concursos Públicos",
    description: "Organização de licitações para atribuição de direitos de exploração.",
    href: "/regulation/tenders",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: <BarChart3 className="w-7 h-7" />,
    title: "Dados & Analytics",
    description: "Publicação de estatísticas e relatórios sobre o sector energético.",
    href: "/data",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: <Leaf className="w-7 h-7" />,
    title: "Sustentabilidade",
    description: "Promoção de práticas ambientalmente responsáveis no sector.",
    href: "/sustainability",
    color: "bg-primary/10 text-primary",
  },
];

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-foreground text-primary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            Serviços & Competências
          </span>
          <h2 className="section-title mb-4 text-primary-foreground">
            O Que Fazemos
          </h2>
          <p className="section-subtitle mx-auto text-pearl/70">
            As principais áreas de actuação da ANPG no sector energético angolano
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.a
              key={service.title}
              href={service.href}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-sm border border-pearl/10 hover:border-primary/50 bg-pearl/5 hover:bg-primary/10 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-sm ${service.color} flex items-center justify-center mb-6`}>
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-primary-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-pearl/70 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Arrow */}
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
