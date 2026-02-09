import { Building2, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { BoardOrgChart } from "@/components/about/BoardOrgChart";
import { InstitutionalContent } from "@/components/about/InstitutionalContent";
import heroImage from "@/assets/refinery.jpg";
import coastImage from "@/assets/angola-coast.jpg";

export default function AnpgPage() {
  const { t } = useTranslation();

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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            {/* Text content - 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("pages.anpg.content.intro")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("pages.anpg.content.role")}
              </p>
            </div>

            {/* Image - 2 columns */}
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-card aspect-[4/3]">
                <img
                  src={coastImage}
                  alt="Costa de Angola - Operações Petrolíferas"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
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

      {/* Institutional Content: Purpose, Principles, Objectives, Social Responsibility, Environment */}
      <SectionTransition delay={0.3}>
        <section>
          <InstitutionalContent />
        </section>
      </SectionTransition>
    </PageLayout>
  );
}