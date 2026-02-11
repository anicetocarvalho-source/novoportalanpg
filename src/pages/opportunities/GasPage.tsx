import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { Flame, BarChart3, Globe2, TrendingUp } from "lucide-react";

export default function GasPage() {
  const { t } = useTranslation();

  const highlights = [
    { icon: Flame, title: "Angola LNG", desc: "Planta de liquefacção com capacidade de 5.2 MTPA" },
    { icon: BarChart3, title: "Produção", desc: "Crescimento sustentado da produção de gás natural" },
    { icon: Globe2, title: "Exportação", desc: "Angola como exportador estratégico de GNL" },
    { icon: TrendingUp, title: "Investimento", desc: "Novas oportunidades em projectos de gás" },
  ];

  return (
    <PageLayout
      title={t("nav.submenu.gas")}
      subtitle={t("nav.submenu.gasDesc")}
      breadcrumbs={[
        { label: t("nav.opportunities"), href: "/opportunities" },
        { label: t("nav.submenu.gas") },
      ]}
    >
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionTransition>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-lg text-muted-foreground leading-relaxed">
                O sector do gás natural em Angola representa uma oportunidade estratégica de crescimento e diversificação energética. Com reservas significativas e infraestruturas em expansão, Angola posiciona-se como um actor relevante no mercado global de GNL.
              </p>
            </div>
          </SectionTransition>

          <SectionTransition delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </SectionTransition>

          <SectionTransition delay={0.3}>
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-10 lg:p-14">
              <h2 className="text-2xl font-bold text-foreground mb-6">Oportunidades no Sector do Gás</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Angola dispõe de reservas comprovadas de gás natural que sustentam projectos de grande envergadura, incluindo a planta de GNL do Soyo e novos desenvolvimentos em curso. O aproveitamento do gás associado e a redução da queima representam prioridades estratégicas.
                </p>
                <p>
                  A ANPG promove activamente o investimento em projectos de gás, oferecendo condições atractivas para operadores interessados em desenvolver recursos gasíferos nas bacias sedimentares angolanas.
                </p>
              </div>
            </div>
          </SectionTransition>
        </div>
      </section>
    </PageLayout>
  );
}
