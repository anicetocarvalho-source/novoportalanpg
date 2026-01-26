import { Gift } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import heroImage from "@/assets/hero-offshore.jpg";

export default function PermanentOfferPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      titleKey="pages.permanentOffer.title"
      subtitleKey="pages.permanentOffer.subtitle"
      descriptionKey="pages.permanentOffer.description"
      backgroundImage={heroImage}
      icon={<Gift className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.opportunities", href: "/opportunities" },
        { labelKey: "nav.submenu.permanentOffer" },
      ]}
    >
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground text-lg">{t("common.placeholder")}</p>
      </div>
    </PageLayout>
  );
}
