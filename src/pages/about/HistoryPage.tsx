import { History, Calendar, Droplets, Factory, Ship, Building2, Award, TrendingUp, Flame, Landmark } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import heroImage from "@/assets/angola-coast.jpg";

// Timeline images
import img1910 from "@/assets/history/1910-exploration.jpg";
import img1958 from "@/assets/history/1958-refinery.jpg";
import img1999 from "@/assets/history/1999-fpso.jpg";
import img2013 from "@/assets/history/2013-lng.jpg";
import img2019 from "@/assets/history/2019-anpg.jpg";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1910",
    title: "Primeira Licença de Exploração",
    description: "Primeira licença de exploração de hidrocarbonetos atribuída à empresa Canha & Formigal, no onshore do Kwanza.",
    image: img1910,
    icon: <Droplets className="w-5 h-5" />,
  },
  {
    year: "1915",
    title: "Primeiro Poço Perfurado",
    description: "Perfuração do primeiro poço de petróleo, Dande-1, na Bacia do Kwanza.",
    icon: <Factory className="w-5 h-5" />,
  },
  {
    year: "1955",
    title: "Primeira Descoberta Comercial",
    description: "Petrofina realiza a primeira descoberta comercial de petróleo, no vale do Kwanza, com a perfuração do poço Benfica 2.",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    year: "1958",
    title: "Início da Refinação",
    description: "Início da actividade de refinação de petróleo, com a criação da Refinaria de Luanda, propriedade da Petrangol.",
    image: img1958,
    icon: <Factory className="w-5 h-5" />,
  },
  {
    year: "1966",
    title: "Descoberta no Bloco 0",
    description: "Nova fase com atribuição de diversas concessões e criação de blocos. Primeira descoberta no poço Limba, Bloco 0.",
    icon: <Droplets className="w-5 h-5" />,
  },
  {
    year: "1968",
    title: "Campo de Malongo",
    description: "Entrada em funcionamento do campo de Malongo, em Cabinda. Primeiro grande salto na produção petrolífera angolana.",
    icon: <TrendingUp className="w-5 h-5" />,
    highlight: true,
  },
  {
    year: "1973",
    title: "Petróleo: Principal Exportação",
    description: "O petróleo torna-se na principal exportação de Angola, superando o café.",
    icon: <Award className="w-5 h-5" />,
  },
  {
    year: "1976",
    title: "Criação da Sonangol",
    description: "Criação da Sociedade Nacional de Combustíveis de Angola – Sonangol. A produção rondava os 100 mil barris/dia.",
    icon: <Building2 className="w-5 h-5" />,
    highlight: true,
  },
  {
    year: "1978",
    title: "Primeira Lei Petrolífera",
    description: "Primeira Lei das Actividades Petrolíferas (Lei 13/78), estabelecendo o quadro regulatório do sector.",
    icon: <Landmark className="w-5 h-5" />,
  },
  {
    year: "1990",
    title: "500 Mil Barris/Dia",
    description: "Angola atinge a produção de 500 mil barris/dia, consolidando-se como produtor relevante na região.",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    year: "1999",
    title: "Produção em Águas Profundas",
    description: "Entra em funcionamento o primeiro FPSO no offshore angolano (Bloco 14), marcando o início da produção em águas profundas.",
    image: img1999,
    icon: <Ship className="w-5 h-5" />,
    highlight: true,
  },
  {
    year: "2000",
    title: "1 Milhão de Barris/Dia",
    description: "Angola atinge a produção máxima de 1.000.000 de barris/dia, tornando-se um player global.",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    year: "2007",
    title: "Adesão à OPEP",
    description: "Angola torna-se membro da OPEP – Organização dos Países Exportadores de Petróleo.",
    icon: <Award className="w-5 h-5" />,
    highlight: true,
  },
  {
    year: "2008",
    title: "Pico Histórico: 2 Milhões",
    description: "Angola atinge a produção máxima diária de 2.000.000 de barris. Produção média anual de 1.993.000 barris/dia.",
    icon: <TrendingUp className="w-5 h-5" />,
    highlight: true,
  },
  {
    year: "2009",
    title: "Presidência da OPEP",
    description: "Angola assume a presidência da OPEP, tornando-se o maior produtor de crude da África subsariana.",
    icon: <Award className="w-5 h-5" />,
  },
  {
    year: "2011",
    title: "Descobertas no Pré-Sal",
    description: "Descobertas significativas no Pré-Sal (Azul – Bloco 23; Cameia – Bloco 21), abrindo novas fronteiras exploratórias.",
    icon: <Droplets className="w-5 h-5" />,
  },
  {
    year: "2013",
    title: "Exportação de LNG",
    description: "Início da produção de gás natural liquefeito (LNG) e expedição do primeiro carregamento para o Brasil.",
    image: img2013,
    icon: <Flame className="w-5 h-5" />,
    highlight: true,
  },
  {
    year: "2019",
    title: "Criação da ANPG",
    description: "Reestruturação do sector petrolífero que resulta na criação da ANPG. Licitação de 10 blocos nas Bacias de Benguela e Namibe.",
    image: img2019,
    icon: <Building2 className="w-5 h-5" />,
    highlight: true,
  },
  {
    year: "2020",
    title: "Regulamentação do Conteúdo Local",
    description: "Publicação do Decreto Presidencial n.º 271/20, definindo os Procedimentos de Implementação do Conteúdo Local.",
    icon: <Landmark className="w-5 h-5" />,
  },
  {
    year: "2021",
    title: "Nova Licitação",
    description: "Licitação por Concurso Limitado de 8 blocos nas Bacias Marítimas do Baixo Congo e do Kwanza.",
    icon: <TrendingUp className="w-5 h-5" />,
  },
];

// Era divisions for the timeline
const eras = [
  { name: "Pioneirismo", years: "1910-1955", color: "from-amber-500/20 to-amber-600/20" },
  { name: "Crescimento", years: "1958-1990", color: "from-orange-500/20 to-orange-600/20" },
  { name: "Expansão", years: "1999-2008", color: "from-primary/20 to-primary/30" },
  { name: "Modernização", years: "2009-2021", color: "from-emerald-500/20 to-emerald-600/20" },
];

export default function HistoryPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      titleKey="pages.history.title"
      subtitleKey="pages.history.subtitle"
      descriptionKey="pages.history.description"
      backgroundImage={heroImage}
      icon={<History className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.aboutUs", href: "/about" },
        { labelKey: "nav.submenu.ourHistory" },
      ]}
    >
      {/* Introduction */}
      <SectionTransition>
        <section className="mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Mais de um século de história petrolífera, desde a primeira licença de exploração em 1910 
              até à criação da ANPG em 2019. Uma jornada de descoberta, crescimento e transformação 
              que posicionou Angola como um dos principais produtores de petróleo da África.
            </p>
          </div>
        </section>
      </SectionTransition>

      {/* Era Legend */}
      <SectionTransition delay={0.1}>
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {eras.map((era, index) => (
              <motion.div
                key={era.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`px-4 py-2 rounded-full bg-gradient-to-r ${era.color} border border-border/50`}
              >
                <span className="text-sm font-medium text-foreground">{era.name}</span>
                <span className="text-xs text-muted-foreground ml-2">{era.years}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </SectionTransition>

      {/* Creative Timeline */}
      <SectionTransition delay={0.2}>
        <section>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Linha do Tempo
            </h2>
          </div>

          <div className="relative">
            {/* Central timeline line - desktop only */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 -translate-x-1/2 rounded-full" />
            
            {/* Mobile timeline line */}
            <div className="md:hidden absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 rounded-full" />

            <div className="space-y-8 md:space-y-0">
              {timelineEvents.map((event, index) => {
                const isLeft = index % 2 === 0;
                const hasImage = !!event.image;

                return (
                  <motion.div
                    key={event.year}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`relative flex items-start ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    } md:py-8`}
                  >
                    {/* Timeline node */}
                    <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 z-10 ${
                      event.highlight 
                        ? "w-12 h-12 bg-primary shadow-lg shadow-primary/30" 
                        : "w-10 h-10 bg-secondary border-2 border-primary/30"
                    } rounded-full flex items-center justify-center`}>
                      <span className={event.highlight ? "text-primary-foreground" : "text-primary"}>
                        {event.icon}
                      </span>
                    </div>

                    {/* Content card */}
                    <div className={`
                      flex-1 ml-20 md:ml-0 
                      ${isLeft ? "md:pr-20 md:mr-8" : "md:pl-20 md:ml-8"}
                    `}>
                      <div className={`
                        group relative overflow-hidden rounded-2xl 
                        ${hasImage ? "bg-foreground text-pearl" : "bg-secondary/50 border border-border/50"}
                        ${event.highlight ? "ring-2 ring-primary/30 shadow-lg" : ""}
                        hover:shadow-xl transition-all duration-500
                      `}>
                        {/* Background image */}
                        {hasImage && (
                          <div className="absolute inset-0">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/80 to-foreground/40" />
                          </div>
                        )}

                        {/* Content */}
                        <div className="relative p-6 md:p-8">
                          {/* Year badge */}
                          <div className={`
                            inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4
                            ${hasImage 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-primary/10 text-primary"
                            }
                          `}>
                            <span className="font-bold text-lg">{event.year}</span>
                          </div>

                          <h3 className={`text-xl md:text-2xl font-bold mb-3 ${
                            hasImage ? "text-pearl" : "text-foreground"
                          }`}>
                            {event.title}
                          </h3>

                          <p className={`leading-relaxed ${
                            hasImage ? "text-pearl/80" : "text-muted-foreground"
                          }`}>
                            {event.description}
                          </p>

                          {/* Highlight indicator */}
                          {event.highlight && !hasImage && (
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-2xl" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Empty space for desktop alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                );
              })}
            </div>

            {/* End marker */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center pt-8"
            >
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="text-primary-foreground font-bold text-sm">Hoje</span>
              </div>
            </motion.div>
          </div>
        </section>
      </SectionTransition>

      {/* Statistics Summary */}
      <SectionTransition delay={0.3}>
        <section className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "110+", label: "Anos de História" },
              { value: "2M", label: "Barris/Dia (Pico)" },
              { value: "1976", label: "Criação da Sonangol" },
              { value: "2019", label: "Criação da ANPG" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-secondary/50 border border-border/50"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>
      </SectionTransition>
    </PageLayout>
  );
}
