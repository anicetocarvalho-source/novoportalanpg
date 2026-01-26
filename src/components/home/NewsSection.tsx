import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// News images
import tender2025Img from "@/assets/news/tender-2025.jpg";
import gasProductionImg from "@/assets/news/gas-production.jpg";
import biofuelsImg from "@/assets/news/biofuels-sustainability.jpg";
import totalExpansionImg from "@/assets/news/total-expansion.jpg";
import fpsoVesselImg from "@/assets/news/fpso-vessel.jpg";
import partnershipImg from "@/assets/news/partnership-meeting.jpg";
import drillingImg from "@/assets/news/drilling-exploration.jpg";
import localContentImg from "@/assets/news/local-content-training.jpg";

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
      image: tender2025Img,
    },
    {
      id: 2,
      categoryKey: "news.categories.energy",
      titleKey: "news.articles.gasProduction.title",
      excerptKey: "news.articles.gasProduction.excerpt",
      date: "22 Jan 2025",
      readTime: "2 min",
      featured: false,
      image: gasProductionImg,
    },
    {
      id: 3,
      categoryKey: "news.categories.sustainability",
      titleKey: "news.articles.biofuels.title",
      excerptKey: "news.articles.biofuels.excerpt",
      date: "20 Jan 2025",
      readTime: "4 min",
      featured: false,
      image: biofuelsImg,
    },
    {
      id: 4,
      categoryKey: "news.categories.investments",
      titleKey: "news.articles.totalExpansion.title",
      excerptKey: "news.articles.totalExpansion.excerpt",
      date: "18 Jan 2025",
      readTime: "3 min",
      featured: false,
      image: totalExpansionImg,
    },
    {
      id: 5,
      categoryKey: "news.categories.operations",
      titleKey: "news.articles.fpsoDeployment.title",
      excerptKey: "news.articles.fpsoDeployment.excerpt",
      date: "15 Jan 2025",
      readTime: "3 min",
      featured: false,
      image: fpsoVesselImg,
    },
    {
      id: 6,
      categoryKey: "news.categories.partnerships",
      titleKey: "news.articles.newPartnership.title",
      excerptKey: "news.articles.newPartnership.excerpt",
      date: "12 Jan 2025",
      readTime: "2 min",
      featured: false,
      image: partnershipImg,
    },
    {
      id: 7,
      categoryKey: "news.categories.exploration",
      titleKey: "news.articles.drillingSuccess.title",
      excerptKey: "news.articles.drillingSuccess.excerpt",
      date: "10 Jan 2025",
      readTime: "4 min",
      featured: false,
      image: drillingImg,
    },
    {
      id: 8,
      categoryKey: "news.categories.localContent",
      titleKey: "news.articles.trainingProgram.title",
      excerptKey: "news.articles.trainingProgram.excerpt",
      date: "8 Jan 2025",
      readTime: "3 min",
      featured: false,
      image: localContentImg,
    },
  ];

  const featuredNews = news.find((n) => n.featured);
  const secondaryNews = news.filter((n) => !n.featured).slice(0, 3);
  const compactNews = news.filter((n) => !n.featured).slice(3);

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
          <Button variant="heroOutlineLight" size="default" className="mt-6 md:mt-0 group">
            {t("news.viewAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Main Grid: Featured + 3 Secondary Cards */}
        <div className="grid lg:grid-cols-12 gap-6 mb-6">
          {/* Featured News - Large Card */}
          {featuredNews && (
            <motion.a
              href={`/news/${featuredNews.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 group bg-background rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <img 
                    src={featuredNews.image} 
                    alt={t(featuredNews.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />
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
              <div className="p-5">
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {t(featuredNews.excerptKey)}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredNews.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredNews.readTime}
                  </span>
                </div>
              </div>
            </motion.a>
          )}

          {/* Secondary News Grid - 3 Medium Cards */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {secondaryNews.map((item, index) => (
              <motion.a
                key={item.id}
                href={`/news/${item.id}`}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
                className="group flex gap-4 p-3 bg-background rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={t(item.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                    {t(item.categoryKey)}
                  </span>
                  <h4 className="font-semibold text-foreground mt-0.5 mb-1.5 group-hover:text-primary transition-colors line-clamp-2 text-sm leading-tight">
                    {t(item.titleKey)}
                  </h4>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
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

        {/* Compact News Row - 4 Small Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {compactNews.map((item, index) => (
            <motion.a
              key={item.id}
              href={`/news/${item.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.06 }}
              className="group bg-background rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              {/* Small Image */}
              <div className="relative overflow-hidden">
                <AspectRatio ratio={16 / 10}>
                  <img 
                    src={item.image} 
                    alt={t(item.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-semibold rounded-pill">
                    {t(item.categoryKey)}
                  </span>
                </AspectRatio>
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-xs leading-tight mb-2">
                  {t(item.titleKey)}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5" />
                    {item.date}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}