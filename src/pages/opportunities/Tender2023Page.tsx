import { Archive } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import heroImage from "@/assets/hero-offshore.jpg";

export default function Tender2023Page() {
  const { t } = useTranslation();

  return (
    <PageLayout
      pageKey="tender-2023"
      titleKey="pages.tender2023.title"
      subtitleKey="pages.tender2023.subtitle"
      descriptionKey="pages.tender2023.description"
      backgroundImage={heroImage}
      icon={<Archive className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.opportunities", href: "/opportunities" },
        { labelKey: "nav.submenu.tender2023" },
      ]}
    >
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground text-lg">{t("common.placeholder")}</p>
      </div>
    </PageLayout>
  );
}
