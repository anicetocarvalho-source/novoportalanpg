import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { Flame, BarChart3, Globe2, TrendingUp } from "lucide-react";

export default function GasPage() {
  const { t } = useTranslation();

  const highlights = [
    { icon: Flame, titleKey: "pages.gas.highlights.lng.title", descKey: "pages.gas.highlights.lng.desc" },
    { icon: BarChart3, titleKey: "pages.gas.highlights.production.title", descKey: "pages.gas.highlights.production.desc" },
    { icon: Globe2, titleKey: "pages.gas.highlights.export.title", descKey: "pages.gas.highlights.export.desc" },
    { icon: TrendingUp, titleKey: "pages.gas.highlights.investment.title", descKey: "pages.gas.highlights.investment.desc" },
  ];

  return (
    <PageLayout
      title={t("pages.gas.title")}
      subtitle={t("pages.gas.subtitle")}
      breadcrumbs={[
        { label: t("nav.opportunities"), href: "/opportunities" },
        { label: t("pages.gas.title") },
      ]}
    >
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionTransition>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("pages.gas.intro")}
              </p>
            </div>
          </SectionTransition>

          <SectionTransition delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{t(item.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
                  </div>
                );
              })}
            </div>
          </SectionTransition>

          <SectionTransition delay={0.3}>
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-10 lg:p-14">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t("pages.gas.opportunitiesTitle")}</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>{t("pages.gas.p1")}</p>
                <p>{t("pages.gas.p2")}</p>
              </div>
            </div>
          </SectionTransition>
        </div>
      </section>
    </PageLayout>
  );
}
