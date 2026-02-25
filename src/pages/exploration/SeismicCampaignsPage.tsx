import { Layers } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { useContentBlocks } from "@/hooks/useCMSData";
import heroImage from "@/assets/angola-offshore-platform.jpg";

export default function SeismicCampaignsPage() {
  const { t } = useTranslation();
  const { data: cmsBlocks } = useContentBlocks("exploration-seismic-campaigns");
  const getSection = (key: string) => cmsBlocks?.find(b => b.section_key === key)?.content;

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
      <div className="space-y-12">
        {["intro", "details", "technology"].map((key) => {
          const section = getSection(key);
          if (!section) return null;
          return (
            <section key={key}>
              <h2 className="text-2xl font-bold text-foreground mb-4">{section.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{section.body}</p>
            </section>
          );
        })}
        {!cmsBlocks?.length && (
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("pages.exploration.seismicCampaignsContent")}
          </p>
        )}
      </div>
    </PageLayout>
  );
}
