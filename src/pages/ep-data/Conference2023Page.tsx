import { Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";

export default function Conference2023Page() {
  const { t } = useTranslation();

  return (
    <PageLayout
      titleKey="pages.conference2023.title"
      subtitleKey="pages.conference2023.subtitle"
      descriptionKey="pages.conference2023.description"
      icon={<Users className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.epData", href: "/ep-data" },
        { labelKey: "nav.submenu.dataConference2023" },
      ]}
    >
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground text-lg">{t("common.placeholder")}</p>
      </div>
    </PageLayout>
  );
}
