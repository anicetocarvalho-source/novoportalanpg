import { History } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import heroImage from "@/assets/angola-coast.jpg";

export default function HistoryPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      titleKey="pages.history.title"
      subtitleKey="pages.history.subtitle"
      descriptionKey="pages.history.description"
      backgroundImage={heroImage}
      icon={<History className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.aboutUs", href: "/about" },
        { labelKey: "nav.submenu.ourHistory" },
      ]}
    >
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground text-lg">{t("common.placeholder")}</p>
      </div>
    </PageLayout>
  );
}
