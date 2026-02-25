import { Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import heroImage from "@/assets/angola-offshore-platform.jpg";

export default function NewAreasPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      pageKey="exploration-new-areas"
      titleKey="pages.exploration.newAreas"
      subtitleKey="pages.exploration.newAreasSubtitle"
      backgroundImage={heroImage}
      icon={<Globe2 className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.exploration", href: "/exploration" },
        { labelKey: "pages.exploration.newAreas" },
      ]}
    >
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p className="text-muted-foreground text-lg leading-relaxed">
          {t("pages.exploration.newAreasContent")}
        </p>
      </div>
    </PageLayout>
  );
}
