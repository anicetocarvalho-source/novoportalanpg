import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { Shield, Eye, Lock, Server, UserCheck, Mail } from "lucide-react";

export default function PrivacyPage() {
  const { t } = useTranslation();

  const sections = [
    {
      icon: Eye,
      titleKey: "pages.privacy.sections.collection.title",
      contentKey: "pages.privacy.sections.collection.content",
    },
    {
      icon: Server,
      titleKey: "pages.privacy.sections.usage.title",
      contentKey: "pages.privacy.sections.usage.content",
    },
    {
      icon: Lock,
      titleKey: "pages.privacy.sections.security.title",
      contentKey: "pages.privacy.sections.security.content",
    },
    {
      icon: UserCheck,
      titleKey: "pages.privacy.sections.rights.title",
      contentKey: "pages.privacy.sections.rights.content",
    },
    {
      icon: Shield,
      titleKey: "pages.privacy.sections.cookies.title",
      contentKey: "pages.privacy.sections.cookies.content",
    },
    {
      icon: Mail,
      titleKey: "pages.privacy.sections.contact.title",
      contentKey: "pages.privacy.sections.contact.content",
    },
  ];

  return (
    <PageLayout
      pageKey="privacy"
      title={t("pages.privacy.title")}
      subtitle={t("pages.privacy.subtitle")}
      description={t("pages.privacy.description")}
      breadcrumbs={[
        { labelKey: "nav.aboutUs", href: "/about" },
        { labelKey: "pages.privacy.title" },
      ]}
    >
      <section className="section-padding bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionTransition>
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {t("pages.privacy.intro")}
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  {t("pages.privacy.lastUpdated")}: Janeiro 2025
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <SectionTransition key={section.titleKey} delay={index * 0.1}>
                    <div className="bg-secondary/30 rounded-lg p-6 border border-border">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <section.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-3">
                            {t(section.titleKey)}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {t(section.contentKey)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SectionTransition>
                ))}
              </div>

              {/* Contact Information */}
              <SectionTransition delay={0.6}>
                <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {t("pages.privacy.dpo.title")}
                  </h3>
                  <div className="text-muted-foreground space-y-2">
                    <p><strong>{t("pages.privacy.dpo.entity")}:</strong> ANPG - Agência Nacional de Petróleo, Gás e Biocombustíveis</p>
                    <p><strong>{t("pages.privacy.dpo.email")}:</strong> privacidade@anpg.co.ao</p>
                    <p><strong>{t("pages.privacy.dpo.address")}:</strong> Rua Kwamme Nkrumah, Nº 6-8, Ingombota, Luanda, Angola</p>
                  </div>
                </div>
              </SectionTransition>
            </div>
          </SectionTransition>
        </div>
      </section>
    </PageLayout>
  );
}