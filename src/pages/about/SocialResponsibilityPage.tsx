import { Heart, GraduationCap, Leaf, Users, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { StaggerContainer, StaggerItem } from "@/components/layout/StaggerContainer";
import heroImage from "@/assets/angola-coast.jpg";

const areaIcons = {
  education: GraduationCap,
  environment: Leaf,
  community: Users,
  health: Shield,
};

export default function SocialResponsibilityPage() {
  const { t } = useTranslation();

  const areas = ["education", "environment", "community", "health"];

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
      {/* Introduction */}
      <SectionTransition>
        <section className="mb-16">
          <div className="max-w-4xl">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("pages.socialResponsibility.content.intro")}
            </p>
          </div>
        </section>
      </SectionTransition>

      {/* Areas of Focus */}
      <SectionTransition delay={0.1}>
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Áreas de Actuação
            </h2>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {areas.map((area) => {
              const Icon = areaIcons[area as keyof typeof areaIcons];
              return (
                <StaggerItem key={area}>
                  <div className="p-8 rounded-2xl bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg h-full group">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {t(`pages.socialResponsibility.content.areas.${area}.title`)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`pages.socialResponsibility.content.areas.${area}.description`)}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>
      </SectionTransition>

      {/* Environment & Safety */}
      <SectionTransition delay={0.2}>
        <section>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 md:p-12 border border-primary/20">
            <div className="flex items-start gap-6">
              <div className="hidden md:flex w-16 h-16 rounded-2xl bg-primary/20 items-center justify-center flex-shrink-0">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {t("pages.socialResponsibility.content.environment.title")}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("pages.socialResponsibility.content.environment.description")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>
    </PageLayout>
  );
}