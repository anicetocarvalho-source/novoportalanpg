import { Database } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import heroImage from "@/assets/angola-offshore-platform.jpg";

export default function ProcessingPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      pageKey="exploration-processing"
      titleKey="pages.exploration.processing"
      subtitleKey="pages.exploration.processingSubtitle"
      backgroundImage={heroImage}
      icon={<Database className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.exploration", href: "/exploration" },
        { labelKey: "pages.exploration.processing" },
      ]}
    >
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p className="text-muted-foreground text-lg leading-relaxed">
          {t("pages.exploration.processingContent")}
        </p>
      </div>
    </PageLayout>
  );
}
