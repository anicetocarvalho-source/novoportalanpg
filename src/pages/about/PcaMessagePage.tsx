import { MessageSquareQuote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import heroImage from "@/assets/refinery.jpg";
import pcaPhoto from "@/assets/board/paulino-jeronimo-official.png";

export default function PcaMessagePage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      titleKey="pages.pcaMessage.title"
      subtitleKey="pages.pcaMessage.subtitle"
      descriptionKey="pages.pcaMessage.description"
      backgroundImage={heroImage}
      icon={<MessageSquareQuote className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.aboutUs", href: "/about" },
        { labelKey: "nav.submenu.pcaMessage" },
      ]}
    >
      <section className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Photo column */}
          <SectionTransition direction="right" className="lg:col-span-2">
            <div className="sticky top-32">
              <div className="relative rounded-2xl overflow-hidden shadow-card aspect-[2/3]">
                <img
                  src={pcaPhoto}
                  alt="Paulino Jerónimo – Presidente do Conselho de Administração da ANPG"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-foreground">Paulino Jerónimo</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("pages.pcaMessage.role")}
                </p>
              </div>
            </div>
          </SectionTransition>

          {/* Text column */}
          <SectionTransition delay={0.15} className="lg:col-span-3">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider">
                <span className="w-8 h-px bg-primary" />
                {t("pages.pcaMessage.subtitle")}
              </span>

              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-5">
                <p>{t("pages.pcaMessage.p1")}</p>
                <p>{t("pages.pcaMessage.p2")}</p>
                <p>{t("pages.pcaMessage.p3")}</p>
                <p>{t("pages.pcaMessage.p4")}</p>
                <p>{t("pages.pcaMessage.p5")}</p>
                <p>{t("pages.pcaMessage.p6")}</p>
              </div>

              {/* Highlight block */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 mt-8">
                <div className="space-y-3">
                  <p className="text-foreground font-semibold">{t("pages.pcaMessage.highlight1")}</p>
                  <p className="text-foreground font-semibold">{t("pages.pcaMessage.highlight2")}</p>
                  <p className="text-foreground font-semibold">{t("pages.pcaMessage.highlight3")}</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mt-6">
                {t("pages.pcaMessage.closing")}
              </p>

              {/* Signature */}
              <div className="pt-8 border-t border-border mt-8">
                <p className="text-foreground font-bold text-lg">Paulino Jerónimo</p>
                <p className="text-muted-foreground text-sm">{t("pages.pcaMessage.role")}</p>
                <p className="text-muted-foreground text-sm">ANPG</p>
              </div>
            </div>
          </SectionTransition>
        </div>
      </section>
    </PageLayout>
  );
}
