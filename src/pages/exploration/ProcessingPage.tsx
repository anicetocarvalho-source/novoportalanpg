import { Database } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { useContentBlocks } from "@/hooks/useCMSData";
import heroImage from "@/assets/angola-offshore-platform.jpg";

export default function ProcessingPage() {
  const { t } = useTranslation();
  const { data: cmsBlocks } = useContentBlocks("exploration-processing");
  const getSection = (key: string) => cmsBlocks?.find(b => b.section_key === key)?.content;

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
      <div className="space-y-12">
        {["intro", "workflow", "centres"].map((key) => {
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
            {t("pages.exploration.processingContent")}
          </p>
        )}
      </div>
    </PageLayout>
  );
}
