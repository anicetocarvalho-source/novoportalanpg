import { Map } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";

export default function EpMapsPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      titleKey="pages.epMaps.title"
      subtitleKey="pages.epMaps.subtitle"
      descriptionKey="pages.epMaps.description"
      icon={<Map className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.epData", href: "/ep-data" },
        { labelKey: "nav.submenu.epMaps" },
      ]}
    >
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground text-lg">{t("common.placeholder")}</p>
      </div>
    </PageLayout>
  );
}
