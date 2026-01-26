import { Newspaper } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";

export default function MediaPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      titleKey="pages.media.title"
      subtitleKey="pages.media.subtitle"
      descriptionKey="pages.media.description"
      icon={<Newspaper className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.media" },
      ]}
    >
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground text-lg">{t("common.placeholder")}</p>
      </div>
    </PageLayout>
  );
}
