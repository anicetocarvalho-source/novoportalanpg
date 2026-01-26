import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import heroImage from "@/assets/angola-coast.jpg";

export default function SocialResponsibilityPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      titleKey="pages.socialResponsibility.title"
      subtitleKey="pages.socialResponsibility.subtitle"
      descriptionKey="pages.socialResponsibility.description"
      backgroundImage={heroImage}
      icon={<Heart className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.aboutUs", href: "/about" },
        { labelKey: "nav.submenu.socialResponsibility" },
      ]}
    >
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground text-lg">{t("common.placeholder")}</p>
      </div>
    </PageLayout>
  );
}
