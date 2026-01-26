import { Building2, Target, Eye, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import heroImage from "@/assets/refinery.jpg";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      titleKey="pages.about.title"
      subtitleKey="pages.about.subtitle"
      descriptionKey="pages.about.description"
      backgroundImage={heroImage}
      icon={<Building2 className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.aboutUs", href: "/about" },
      ]}
    >
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-6">
            {t("about.title")} <span className="text-primary">{t("about.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {t("about.description")}
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Missão</h3>
                <p className="text-muted-foreground">{t("pages.about.content.mission")}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Visão</h3>
                <p className="text-muted-foreground">{t("pages.about.content.vision")}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {Object.entries({
            transparency: Award,
            excellence: Award,
            sustainability: Award,
            innovation: Award,
          }).map(([key, Icon]) => (
            <div key={key} className="p-6 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-colors">
              <Icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">
                {t(`about.values.${key}.title`)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(`about.values.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
