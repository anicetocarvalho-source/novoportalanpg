import { Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import heroImage from "@/assets/angola-coast.jpg";

export default function LocalContentPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      titleKey="pages.localContent.title"
      subtitleKey="pages.localContent.subtitle"
      descriptionKey="pages.localContent.description"
      backgroundImage={heroImage}
      icon={<Users className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.localContent" },
      ]}
    >
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground text-lg">{t("common.placeholder")}</p>
      </div>
    </PageLayout>
  );
}
