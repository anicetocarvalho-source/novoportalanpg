import { FileCheck, Target, Calendar, FileText, Download, ArrowRight, CheckCircle2, Clock, Users, Lightbulb, TrendingUp, Shield, Map, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { StaggerContainer, StaggerItem } from "@/components/layout/StaggerContainer";
import { Button } from "@/components/ui/button";
import { BlocksMap } from "@/components/tender/BlocksMap";
import { TenderFAQ } from "@/components/tender/TenderFAQ";
import heroImage from "@/assets/hero-offshore.jpg";

const objectives = [
  {
    icon: Target,
    title: "Reavaliar Potencial",
    description: "Reavaliar o potencial petrolífero existente nas Bacias Terrestres do Baixo Congo e do Kwanza."
  },
  {
    icon: Lightbulb,
    title: "Inovação Tecnológica",
    description: "Alavancar a inovação tecnológica e as boas práticas de governação."
  },
  {
    icon: TrendingUp,
    title: "Relançar E&P",
    description: "Relançar a exploração e produção de hidrocarbonetos nas zonas terrestres das bacias."
  },
  {
    icon: Users,
    title: "PMEs e Emprego",
    description: "Estimular a participação de pequenas e médias empresas petrolíferas e promover a incorporação de mão-de-obra angolana qualificada."
  },
  {
    icon: Shield,
    title: "Mitigar Declínio",
    description: "Atenuar o declínio da produção com o incremento das actividades de exploração e descoberta de novos recursos."
  }
];

const processPhases = [
  {
    phase: 1,
    title: "Envio de Cartas",
    description: "Envio de cartas a informar sobre o processo e promoção.",
    period: "Março - Outubro 2025",
    status: "active"
  },
  {
    phase: 2,
    title: "Lançamento Oficial",
    description: "Lançamento da Licitação para atribuição de concessões petrolíferas.",
    period: "4º Trimestre 2025",
    status: "upcoming"
  },
  {
    phase: 3,
    title: "Submissão de Propostas",
    description: "Período de 30 a 40 dias para submissão das propostas após o lançamento oficial.",
    period: "1º Trimestre 2026",
    status: "upcoming"
  },
  {
    phase: 4,
    title: "Acto Público",
    description: "Abertura das propostas no primeiro dia útil após o término do prazo.",
    period: "1º Trimestre 2026",
    status: "upcoming"
  },
  {
    phase: 5,
    title: "Qualificação e Avaliação",
    description: "Período de 30 a 45 dias para qualificação e avaliação das propostas.",
    period: "1º Trimestre 2026",
    status: "upcoming"
  },
  {
    phase: 6,
    title: "Adjudicação",
    description: "Comunicação dos resultados aos concorrentes.",
    period: "1º Trimestre 2026",
    status: "upcoming"
  },
  {
    phase: 7,
    title: "Negociação",
    description: "Período de 15 a 65 dias para negociação dos contratos.",
    period: "1º - 2º Trimestre 2026",
    status: "upcoming"
  },
  {
    phase: 8,
    title: "Assinatura",
    description: "Assinatura final dos contratos de concessão.",
    period: "1º - 3º Trimestre 2026",
    status: "upcoming"
  }
];

const documents = [
  {
    title: "Brochura Técnica",
    description: "Informações técnicas sobre as Bacias do Kwanza e Benguela",
    type: "PDF",
    size: "4.2 MB"
  },
  {
    title: "Modelo de Contrato",
    description: "Contrato de Partilha de Produção 2025",
    type: "PDF",
    size: "1.8 MB"
  },
  {
    title: "Termos de Referência",
    description: "Requisitos e critérios de avaliação",
    type: "PDF",
    size: "2.1 MB"
  },
  {
    title: "Mapa de Blocos",
    description: "Localização geográfica dos blocos disponíveis",
    type: "PDF",
    size: "8.5 MB"
  }
];

export default function Tender2025Page() {
  const { t } = useTranslation();

  return (
    <PageLayout
      titleKey="pages.tender2025.title"
      subtitleKey="pages.tender2025.subtitle"
      descriptionKey="pages.tender2025.description"
      backgroundImage={heroImage}
      icon={<FileCheck className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.opportunities", href: "/opportunities" },
        { labelKey: "nav.submenu.tender2025" },
      ]}
      heroChildren={
        <div className="flex flex-wrap gap-4 mt-4">
          <Button variant="hero" size="lg">
            Manifestar Interesse
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="heroOutline" size="lg">
            Descarregar Brochura
          </Button>
        </div>
      }
    >
      {/* Intro Banner */}
      <SectionTransition>
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl p-8 md:p-10 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="hidden md:flex w-16 h-16 rounded-2xl bg-primary/20 items-center justify-center flex-shrink-0">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-3">
                  Lançamento: 4º Trimestre 2025
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  Angola, o local certo para o seu investimento!
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-3xl">
                  A Agência Nacional de Petróleo, Gás e Biocombustíveis (ANPG), na sua qualidade de Concessionária Nacional, 
                  anuncia a Licitação 2025 para atribuição de concessões petrolíferas 
                  para a exploração das <strong className="text-foreground">Bacias Marítimas do Kwanza e de Benguela</strong>, 
                  aberto a entidades nacionais ou estrangeiras.
                </p>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Objectives */}
      <SectionTransition delay={0.1}>
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Objectivos</h2>
              <p className="text-muted-foreground text-sm">Metas estratégicas da Licitação 2025</p>
            </div>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((objective, index) => {
              const Icon = objective.icon;
              return (
                <StaggerItem key={index}>
                  <div className="p-6 rounded-2xl bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg h-full group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{objective.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{objective.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>
      </SectionTransition>

      {/* Process Timeline */}
      <SectionTransition delay={0.2}>
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Fases do Processo</h2>
              <p className="text-muted-foreground text-sm">Cronograma detalhado da licitação</p>
            </div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-6">
              {processPhases.map((phase, index) => (
                <div key={phase.phase} className="relative flex gap-6 md:gap-8">
                  {/* Phase number */}
                  <div className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg ${
                    phase.status === 'active' 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                      : 'bg-secondary border-2 border-border text-foreground'
                  }`}>
                    {phase.phase}
                  </div>
                  
                  {/* Content */}
                  <div className={`flex-1 pb-6 ${index === processPhases.length - 1 ? 'pb-0' : ''}`}>
                    <div className={`p-5 rounded-xl border transition-all duration-300 ${
                      phase.status === 'active'
                        ? 'bg-primary/5 border-primary/30 shadow-md'
                        : 'bg-secondary/30 border-border hover:border-primary/20'
                    }`}>
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-foreground">{phase.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          phase.status === 'active'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-secondary text-muted-foreground'
                        }`}>
                          {phase.period}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                      {phase.status === 'active' && (
                        <div className="flex items-center gap-2 mt-3 text-primary text-sm font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          Em curso
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Interactive Map */}
      <SectionTransition delay={0.25}>
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Map className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Mapa de Blocos</h2>
              <p className="text-muted-foreground text-sm">Localização dos blocos disponíveis nas Bacias do Kwanza e Benguela</p>
            </div>
          </div>

          <BlocksMap />
        </section>
      </SectionTransition>

      {/* Documents */}
      <SectionTransition delay={0.3}>
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Documentos Úteis</h2>
              <p className="text-muted-foreground text-sm">Materiais de apoio ao processo</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {documents.map((doc, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-5 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-md group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <FileText className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{doc.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">{doc.description}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-muted-foreground">{doc.type} • {doc.size}</span>
                  <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </SectionTransition>

      {/* FAQ Section */}
      <SectionTransition delay={0.35}>
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Perguntas Frequentes</h2>
              <p className="text-muted-foreground text-sm">Esclarecimentos sobre o processo de licitação</p>
            </div>
          </div>

          <TenderFAQ />
        </section>
      </SectionTransition>

      {/* CTA */}
      <SectionTransition delay={0.4}>
        <section>
          <div className="bg-gradient-to-br from-foreground to-foreground/90 rounded-3xl p-8 md:p-12 text-primary-foreground text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Interessado em Participar?
            </h3>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Manifeste o seu interesse e receba informações actualizadas sobre o processo de licitação, 
              incluindo datas importantes e requisitos de participação.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg">
                Manifestar Interesse
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-foreground"
              >
                Contactar Equipa
              </Button>
            </div>
          </div>
        </section>
      </SectionTransition>
    </PageLayout>
  );
}