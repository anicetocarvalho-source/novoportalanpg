import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function NewsSection() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const news = [
    {
      id: 1,
      categoryKey: "news.categories.institutional",
      titleKey: "news.articles.tender2025.title",
      excerptKey: "news.articles.tender2025.excerpt",
      date: "24 Jan 2025",
      readTime: "3 min",
      featured: true,
      image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      categoryKey: "news.categories.energy",
      titleKey: "news.articles.gasProduction.title",
      excerptKey: "news.articles.gasProduction.excerpt",
      date: "22 Jan 2025",
      readTime: "2 min",
      featured: false,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      categoryKey: "news.categories.sustainability",
      titleKey: "news.articles.biofuels.title",
      excerptKey: "news.articles.biofuels.excerpt",
      date: "20 Jan 2025",
      readTime: "4 min",
      featured: false,
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      categoryKey: "news.categories.investments",
      titleKey: "news.articles.totalExpansion.title",
      excerptKey: "news.articles.totalExpansion.excerpt",
      date: "18 Jan 2025",
      readTime: "3 min",
      featured: false,
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=300&fit=crop",
    },
  ];

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
              {t("news.label")}
            </span>
            <h2 className="section-title">
              {t("news.title")}
            </h2>
          </div>
          <Button variant="heroOutlineLight" size="default" className="mt-6 md:mt-0 group">
            {t("news.viewAll")}
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
              className="group bg-background rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              {/* Featured image */}
              <div className="relative overflow-hidden">
                <AspectRatio ratio={16 / 10}>
                  <img 
                    src={featuredNews.image} 
                    alt={t(featuredNews.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-pill mb-3">
                      {t(featuredNews.categoryKey)}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg line-clamp-2">
                      {t(featuredNews.titleKey)}
                    </h3>
                  </div>
                </AspectRatio>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {t(featuredNews.excerptKey)}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {featuredNews.date}
                  </span>
                  <span className="flex items-center gap-1.5">
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
                className="group flex gap-4 p-4 bg-background rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-24 rounded-lg overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={t(item.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {t(item.categoryKey)}
                  </span>
                  <h4 className="font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2 text-sm md:text-base">
                    {t(item.titleKey)}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
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
