import { Building2, Users, Shield, Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { StaggerContainer, StaggerItem } from "@/components/layout/StaggerContainer";
import heroImage from "@/assets/refinery.jpg";

export default function AnpgPage() {
  const { t } = useTranslation();

  const boardMembers = ["pca", "admin1", "admin2", "admin3", "admin4"];
  const supervisionItems = ["fiscal", "audit", "external"];
  const operators = t("pages.anpg.operators.list").split(", ");

  return (
    <PageLayout
      titleKey="pages.anpg.title"
      subtitleKey="pages.anpg.subtitle"
      descriptionKey="pages.anpg.description"
      backgroundImage={heroImage}
      icon={<Building2 className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.aboutUs", href: "/about" },
        { labelKey: "nav.submenu.anpg" },
      ]}
    >
      {/* Introduction */}
      <SectionTransition>
        <section className="mb-16">
          <div className="max-w-4xl">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {t("pages.anpg.content.intro")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("pages.anpg.content.role")}
            </p>
          </div>
        </section>
      </SectionTransition>

      {/* Board of Directors */}
      <SectionTransition delay={0.1}>
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {t("pages.anpg.board.title")}
            </h2>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardMembers.map((member, index) => (
              <StaggerItem key={member}>
                <div className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                  index === 0 
                    ? "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 lg:col-span-1" 
                    : "bg-secondary/50 border-border hover:border-primary/30"
                }`}>
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {t(`pages.anpg.board.members.${member}.name`).split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground mb-1">
                    {t(`pages.anpg.board.members.${member}.name`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`pages.anpg.board.members.${member}.role`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </SectionTransition>

      {/* Supervision Bodies */}
      <SectionTransition delay={0.2}>
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {t("pages.anpg.supervision.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {supervisionItems.map((item) => (
              <div 
                key={item}
                className="p-6 rounded-xl bg-secondary/50 border border-border text-center hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">
                  {t(`pages.anpg.supervision.items.${item}`)}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </SectionTransition>

      {/* Sector Operators */}
      <SectionTransition delay={0.3}>
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {t("pages.anpg.operators.title")}
              </h2>
              <p className="text-muted-foreground text-sm">
                {t("pages.anpg.operators.description")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {operators.map((operator) => (
              <div 
                key={operator}
                className="px-6 py-3 rounded-full bg-secondary border border-border text-foreground font-medium hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                {operator}
              </div>
            ))}
          </div>
        </section>
      </SectionTransition>
    </PageLayout>
  );
}