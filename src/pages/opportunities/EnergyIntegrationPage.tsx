import { Fuel, Leaf, Zap, Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import heroImage from "@/assets/refinery.jpg";

export default function EnergyIntegrationPage() {
  const { t } = useTranslation();

  const areas = [
    {
      icon: Fuel,
      titleKey: "pages.energyIntegration.areas.biofuels.title",
      descKey: "pages.energyIntegration.areas.biofuels.desc",
    },
    {
      icon: Zap,
      titleKey: "pages.energyIntegration.areas.transition.title",
      descKey: "pages.energyIntegration.areas.transition.desc",
    },
    {
      icon: Leaf,
      titleKey: "pages.energyIntegration.areas.sustainability.title",
      descKey: "pages.energyIntegration.areas.sustainability.desc",
    },
    {
      icon: Globe2,
      titleKey: "pages.energyIntegration.areas.partnerships.title",
      descKey: "pages.energyIntegration.areas.partnerships.desc",
    },
  ];

  return (
    <PageLayout
      title={t("pages.energyIntegration.title")}
      subtitle={t("pages.energyIntegration.subtitle")}
      backgroundImage={heroImage}
      breadcrumbs={[
        { label: t("nav.opportunities"), href: "/opportunities" },
        { label: t("nav.submenu.energyIntegration") },
      ]}
    >
      <SectionTransition>
        <section className="mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
            {t("pages.energyIntegration.intro")}
          </p>
        </section>
      </SectionTransition>

      <SectionTransition delay={0.1}>
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">
            {t("pages.energyIntegration.areasTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {areas.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.titleKey}
                  className="group p-6 rounded-2xl border border-border bg-card hover:shadow-card transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-200">
                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t(area.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(area.descKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </SectionTransition>
    </PageLayout>
  );
}
