import { Layers } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";

export default function IonaPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      pageKey="iona"
      titleKey="pages.iona.title"
      subtitleKey="pages.iona.subtitle"
      descriptionKey="pages.iona.description"
      icon={<Layers className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.epData", href: "/ep-data" },
        { labelKey: "nav.submenu.platformIona" },
      ]}
    >
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground text-lg">{t("common.placeholder")}</p>
      </div>
    </PageLayout>
  );
}
