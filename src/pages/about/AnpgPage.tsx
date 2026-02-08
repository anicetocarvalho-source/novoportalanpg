import { Building2, Users, Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { BoardOrgChart } from "@/components/about/BoardOrgChart";
import heroImage from "@/assets/refinery.jpg";

export default function AnpgPage() {
  const { t } = useTranslation();

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

      {/* Board of Directors - Creative Org Chart */}
      <SectionTransition delay={0.1}>
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {t("pages.anpg.board.title")}
            </h2>
          </div>

          <BoardOrgChart />
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