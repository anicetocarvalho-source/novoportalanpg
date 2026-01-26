import { BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import heroImage from "@/assets/hero-offshore.jpg";

export default function ProductionPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      titleKey="pages.production.title"
      subtitleKey="pages.production.subtitle"
      descriptionKey="pages.production.description"
      backgroundImage={heroImage}
      icon={<BarChart3 className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.production" },
      ]}
    >
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground text-lg">{t("common.placeholder")}</p>
      </div>
    </PageLayout>
  );
}
