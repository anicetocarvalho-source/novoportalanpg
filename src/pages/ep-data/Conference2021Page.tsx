import { Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";

export default function Conference2021Page() {
  const { t } = useTranslation();

  return (
    <PageLayout
      pageKey="conference-2021"
      titleKey="pages.conference2021.title"
      subtitleKey="pages.conference2021.subtitle"
      descriptionKey="pages.conference2021.description"
      icon={<Calendar className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.epData", href: "/ep-data" },
        { labelKey: "nav.submenu.conference2021" },
      ]}
    >
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground text-lg">{t("common.placeholder")}</p>
      </div>
    </PageLayout>
  );
}
