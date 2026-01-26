import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { 
  FileCheck, 
  Shield, 
  BarChart3, 
  ArrowUpRight,
  Scale,
  Globe2,
  Leaf
} from "lucide-react";

export function ServicesSection() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: <FileCheck className="w-7 h-7" />,
      titleKey: "services.licensing.title",
      descriptionKey: "services.licensing.description",
      href: "/regulation/licensing",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      titleKey: "services.oversight.title",
      descriptionKey: "services.oversight.description",
      href: "/regulation/oversight",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: <Scale className="w-7 h-7" />,
      titleKey: "services.regulation.title",
      descriptionKey: "services.regulation.description",
      href: "/regulation",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: <Globe2 className="w-7 h-7" />,
      titleKey: "services.tenders.title",
      descriptionKey: "services.tenders.description",
      href: "/regulation/tenders",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      titleKey: "services.analytics.title",
      descriptionKey: "services.analytics.description",
      href: "/data",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: <Leaf className="w-7 h-7" />,
      titleKey: "services.sustainability.title",
      descriptionKey: "services.sustainability.description",
      href: "/sustainability",
      color: "bg-primary/10 text-primary",
    },
  ];

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
            {t("services.label")}
          </span>
          <h2 className="section-title mb-4 text-primary-foreground">
            {t("services.title")}
          </h2>
          <p className="section-subtitle mx-auto text-pearl/70">
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={service.href}
                className="group relative p-8 rounded-sm border border-pearl/10 hover:border-primary/50 bg-pearl/5 hover:bg-primary/10 transition-all duration-300 block h-full"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-sm ${service.color} flex items-center justify-center mb-6`}>
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-primary-foreground mb-3 group-hover:text-primary transition-colors">
                  {t(service.titleKey)}
                </h3>
                <p className="text-pearl/70 text-sm leading-relaxed">
                  {t(service.descriptionKey)}
                </p>

                {/* Arrow */}
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
