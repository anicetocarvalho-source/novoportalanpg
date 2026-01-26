import { History, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import heroImage from "@/assets/angola-coast.jpg";

export default function HistoryPage() {
  const { t } = useTranslation();

  const timelineEvents = ["1978", "2019", "2020", "2023"];

  return (
    <PageLayout
      titleKey="pages.history.title"
      subtitleKey="pages.history.subtitle"
      descriptionKey="pages.history.description"
      backgroundImage={heroImage}
      icon={<History className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.aboutUs", href: "/about" },
        { labelKey: "nav.submenu.ourHistory" },
      ]}
    >
      {/* Introduction */}
      <SectionTransition>
        <section className="mb-16">
          <div className="max-w-3xl">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("pages.history.content.intro")}
            </p>
          </div>
        </section>
      </SectionTransition>

      {/* Timeline */}
      <SectionTransition delay={0.1}>
        <section>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Linha do Tempo
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            <div className="space-y-12">
              {timelineEvents.map((year, index) => (
                <div 
                  key={year}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 mt-2" />
                  
                  {/* Content */}
                  <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div className="p-6 rounded-2xl bg-secondary/50 border border-border hover:border-primary/30 transition-colors">
                      <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-lg mb-3">
                        {year}
                      </span>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {t(`pages.history.content.timeline.${year}.title`)}
                      </h3>
                      <p className="text-muted-foreground">
                        {t(`pages.history.content.timeline.${year}.description`)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionTransition>
    </PageLayout>
  );
}