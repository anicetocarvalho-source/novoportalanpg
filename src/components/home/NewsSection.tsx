import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { newsItems, getCategoryLabel } from "@/data/newsData";

export function NewsSection() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Get the 8 most recent news items
  const displayNews = newsItems.slice(0, 8);
  const featuredNews = displayNews[0];
  const secondaryNews = displayNews.slice(1, 4);
  const compactNews = displayNews.slice(4, 8);

  return (
    <section ref={ref} className="section-padding bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10"
        >
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
              {t("news.label")}
            </span>
            <h2 className="section-title">
              {t("news.title")}
            </h2>
          </div>
          <Link to="/media">
            <Button variant="heroOutlineLight" size="default" className="mt-6 md:mt-0 group">
              {t("news.viewAll")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Main Grid: Featured + 3 Secondary Cards */}
        <div className="grid lg:grid-cols-12 gap-6 mb-6">
          {/* Featured News - Large Card */}
          {featuredNews && (
            <Link to={`/news/${featuredNews.id}`} className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="h-full group bg-background rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-out before:z-10 before:pointer-events-none"
              >
                <div className="relative overflow-hidden">
                  <AspectRatio ratio={16 / 9}>
                    <img 
                      src={featuredNews.image} 
                      alt={featuredNews.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-pill mb-3">
                        {getCategoryLabel(featuredNews.category)}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg line-clamp-2">
                        {featuredNews.title}
                      </h3>
                    </div>
                  </AspectRatio>
                </div>
                <div className="p-5">
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {featuredNews.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredNews.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          )}

          {/* Secondary News Grid - 3 Medium Cards */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {secondaryNews.map((item, index) => (
              <Link key={item.id} to={`/news/${item.id}`}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
                  className="h-full group flex gap-4 p-3 bg-background rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 border border-transparent relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary/10 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500 before:ease-out before:pointer-events-none"
                >
                  {/* Thumbnail */}
                  <div className="flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                      {getCategoryLabel(item.category)}
                    </span>
                    <h4 className="font-semibold text-foreground mt-0.5 mb-1.5 group-hover:text-primary transition-colors line-clamp-2 text-sm leading-tight">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Compact News Row - 4 Small Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {compactNews.map((item, index) => (
            <Link key={item.id} to={`/news/${item.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.06 }}
                className="h-full group bg-background rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500 before:ease-out before:z-20 before:pointer-events-none"
              >
                {/* Small Image */}
                <div className="relative overflow-hidden">
                  <AspectRatio ratio={16 / 10}>
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-semibold rounded-pill">
                      {getCategoryLabel(item.category)}
                    </span>
                  </AspectRatio>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-xs leading-tight mb-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      {item.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}