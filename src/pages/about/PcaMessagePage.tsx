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
                <p>
                  A criação da ANPG, em 2019, representou um passo decisivo do Estado angolano no processo de reorganização do sector energético. Enquanto Concessionária Nacional, assumimos desde o primeiro momento a responsabilidade de regular, fiscalizar e promover as actividades no domínio do petróleo, do gás natural e dos biocombustíveis, num sector vital para a economia nacional e para o posicionamento de Angola no contexto internacional.
                </p>
                <p>
                  Neste curto espaço de tempo, consolidámos a função Concessionária, retomámos os processos de licitação, reforçámos a colaboração com os operadores. Contribuímos para mitigar o declínio natural da produção, dinamizar o investimento e criar condições de maior previsibilidade e confiança no sector. Estes avanços só foram possíveis graças ao compromisso, competência e dedicação das nossas equipas, bem como ao diálogo permanente com todos os stakeholders.
                </p>
                <p>
                  Nestes sete anos da nossa actividade como ANPG, o mundo tem conhecido mudanças consideráveis. O sector energético atravessa hoje transformações profundas, marcadas por novas exigências ambientais, diversidade de fontes de energia, pressão regulatória e pelo surgimento de países com novas descobertas e mais oferta, originando uma concorrência cada vez mais intensa na captação de investimento. Este novo contexto exige instituições mais ágeis, mais claras, mais abertas ao diálogo internacional e mais preparadas para pensar o futuro de forma integrada.
                </p>
                <p>
                  É neste quadro que iniciamos um novo ciclo estratégico. Um ciclo orientado para o reforço do nosso papel enquanto regulador alinhado com as melhores práticas internacionais. Os pilares deste novo ciclo serão apresentados e desenvolvidos com ambição, responsabilidade e visão de longo prazo.
                </p>
                <p>
                  A nova identidade da ANPG assinala simbolicamente esta nova etapa. Uma marca mais fluida, contemporânea e mais representativa da diversidade de energias que hoje regulamos. Uma marca que melhor reflecte a evolução da Concessionária Nacional, assim como a ambição de acompanhar e liderar as matérias sob nossa jurisdição com impacto global.
                </p>
                <p>
                  Com esta nova marca e uma nova assinatura, afirmamos que a ANPG e Angola têm energia para mais.
                </p>
              </div>

              {/* Highlight block */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 mt-8">
                <div className="space-y-3">
                  <p className="text-foreground font-semibold">Mais clareza na regulação.</p>
                  <p className="text-foreground font-semibold">Mais confiança e atracção de investimento.</p>
                  <p className="text-foreground font-semibold">Mais integração, mais sustentabilidade e mais futuro para o País.</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mt-6">
                É com energia para mais que continuamos comprometidos com a excelência, com a integridade e com a construção de um sector energético forte, competitivo e preparado para os desafios.
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
