import { Database } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";

export default function DataPackagesPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      titleKey="pages.dataPackages.title"
      subtitleKey="pages.dataPackages.subtitle"
      descriptionKey="pages.dataPackages.description"
      icon={<Database className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.epData", href: "/ep-data" },
        { labelKey: "nav.submenu.dataPackages" },
      ]}
    >
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground text-lg">{t("common.placeholder")}</p>
      </div>
    </PageLayout>
  );
}
