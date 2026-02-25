import { Layers } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import heroImage from "@/assets/angola-offshore-platform.jpg";

export default function SeismicCampaignsPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      pageKey="exploration-seismic-campaigns"
      titleKey="pages.exploration.seismicCampaigns"
      subtitleKey="pages.exploration.seismicCampaignsSubtitle"
      backgroundImage={heroImage}
      icon={<Layers className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.exploration", href: "/exploration" },
        { labelKey: "pages.exploration.seismicCampaigns" },
      ]}
    >
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p className="text-muted-foreground text-lg leading-relaxed">
          {t("pages.exploration.seismicCampaignsContent")}
        </p>
      </div>
    </PageLayout>
  );
}
