import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const news = [
  {
    id: 1,
    category: "Institucional",
    title: "ANPG anuncia resultados do Concurso Público 2025",
    excerpt: "Seis novos blocos atribuídos a consórcios internacionais, representando um investimento de USD 2.3 mil milhões.",
    date: "24 Jan 2025",
    readTime: "3 min",
    featured: true,
  },
  {
    id: 2,
    category: "Energia",
    title: "Produção de gás natural atinge recorde histórico",
    excerpt: "Angola registou um aumento de 15% na produção de gás natural no último trimestre.",
    date: "22 Jan 2025",
    readTime: "2 min",
    featured: false,
  },
  {
    id: 3,
    category: "Sustentabilidade",
    title: "Novo quadro regulatório para biocombustíveis aprovado",
    excerpt: "Legislação visa promover a transição energética e diversificar a matriz energética nacional.",
    date: "20 Jan 2025",
    readTime: "4 min",
    featured: false,
  },
  {
    id: 4,
    category: "Investimentos",
    title: "TotalEnergies expande operações no Bloco 32",
    excerpt: "Investimento adicional de USD 1.5 mil milhões para desenvolvimento de novas infraestruturas.",
    date: "18 Jan 2025",
    readTime: "3 min",
    featured: false,
  },
];

export function NewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const featuredNews = news.find((n) => n.featured);
  const otherNews = news.filter((n) => !n.featured);

  return (
    <section ref={ref} className="section-padding bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
              Notícias & Insights
            </span>
            <h2 className="section-title">
              Últimas Actualizações
            </h2>
          </div>
          <Button variant="heroOutlineLight" size="default" className="mt-6 md:mt-0 group">
            Ver Todas as Notícias
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured News */}
          {featuredNews && (
            <motion.a
              href={`/news/${featuredNews.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-background rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Featured placeholder image area */}
              <div className="h-64 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-foreground/5" />
                <div className="relative z-10 text-center px-8">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-sm mb-4">
                    {featuredNews.category}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {featuredNews.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredNews.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredNews.readTime}
                  </span>
                </div>
              </div>
            </motion.a>
          )}

          {/* Other News */}
          <div className="space-y-4">
            {otherNews.map((item, index) => (
              <motion.a
                key={item.id}
                href={`/news/${item.id}`}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group flex gap-6 p-6 bg-background rounded-sm shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Category indicator */}
                <div className="flex-shrink-0 w-1 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                
                <div className="flex-1">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.readTime}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
