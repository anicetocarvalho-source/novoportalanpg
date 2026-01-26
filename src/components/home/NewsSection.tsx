import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import useEmblaCarousel from "embla-carousel-react";

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

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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

          {/* Carousel for Other News */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Carousel Navigation */}
            <div className="flex items-center justify-end gap-2 mb-4">
              <button
                onClick={scrollPrev}
                className="p-2 rounded-lg bg-background border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                aria-label="Previous news"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={scrollNext}
                className="p-2 rounded-lg bg-background border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                aria-label="Next news"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Embla Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {otherNews.map((item, index) => (
                  <a
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="group flex-shrink-0 w-full sm:w-[calc(100%-1rem)] flex gap-4 p-4 bg-background rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
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
                  </a>
                ))}
              </div>
            </div>

            {/* Carousel Dots Indicator */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {otherNews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className="w-2 h-2 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors"
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}