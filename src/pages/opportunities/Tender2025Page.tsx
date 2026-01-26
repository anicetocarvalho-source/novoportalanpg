import { FileCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import heroImage from "@/assets/hero-offshore.jpg";

export default function Tender2025Page() {
  const { t } = useTranslation();

  return (
    <PageLayout
      titleKey="pages.tender2025.title"
      subtitleKey="pages.tender2025.subtitle"
      descriptionKey="pages.tender2025.description"
      backgroundImage={heroImage}
      icon={<FileCheck className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.opportunities", href: "/opportunities" },
        { labelKey: "nav.submenu.tender2025" },
      ]}
    >
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground text-lg">{t("common.placeholder")}</p>
      </div>
    </PageLayout>
  );
}
