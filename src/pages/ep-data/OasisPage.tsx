import { Image } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";

export default function OasisPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      pageKey="oasis"
      titleKey="pages.oasis.title"
      subtitleKey="pages.oasis.subtitle"
      descriptionKey="pages.oasis.description"
      icon={<Image className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.epData", href: "/ep-data" },
        { labelKey: "nav.submenu.oasisImageBank" },
      ]}
    >
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground text-lg">{t("common.placeholder")}</p>
      </div>
    </PageLayout>
  );
}
