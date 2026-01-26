import { Users, Building2, FileCheck, Award, ClipboardList, ExternalLink, FileText, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from "@/assets/angola-coast.jpg";

const stats = [
  { value: "2.534", label: "Empresas Registadas", icon: Building2 },
  { value: "1.054", label: "Empresas Visitadas", icon: ClipboardList },
  { value: "1.199", label: "Empresas Certificadas", icon: Award },
];

const regimes = [
  {
    title: "Regime de Exclusividade",
    icon: CheckCircle2,
    color: "bg-primary/10 text-primary",
    description: "Consiste na obrigação que impede sobre as empresas do sector dos petróleo e as associadas da concessionária Nacional de utilizar os bens e serviços das sociedades comercias Angolanas (empresas 100% Angolanas) que constem na lista de bens e serviços exclusivos.",
  },
  {
    title: "Regime de Preferência",
    icon: Award,
    color: "bg-amber-500/10 text-amber-600",
    description: "Consiste na obrigação que impede sobre as sociedades comercias do sector dos petróleos e associadas da concessionária Nacional de utilizar os bens e serviços das sociedades de direito Angolano (empresas constituídas e estabelecidas de acordo com a legislação angolana).",
  },
  {
    title: "Regime de Concorrência",
    icon: Users,
    color: "bg-emerald-500/10 text-emerald-600",
    description: "Consiste na permissão de contratar livremente bens e serviços que não constem das listas de exclusividade e preferência.",
  },
];

const registrationSteps = [
  "Geral",
  "Legal e Estatutário",
  "Representantes Legais",
  "Estatuto",
  "Capital",
  "Conteúdo Local",
  "Contabilidade e Finanças",
  "Conformidade",
  "Capacidade Técnica",
  "Informação de Suporte",
  "Actividade e Experiência",
  "Confirmar Actividade",
  "Enviar à ANPG",
];

export default function LocalContentPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      titleKey="pages.localContent.title"
      subtitleKey="pages.localContent.subtitle"
      descriptionKey="pages.localContent.description"
      backgroundImage={heroImage}
      icon={<Users className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.localContent" },
      ]}
    >
      <div className="space-y-16">
        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-foreground mb-6">Introdução</h2>
            <p className="text-muted-foreground leading-relaxed">
              O conteúdo Local do sector Petrolífero é um dos objectivos estabelecidos no plano de desenvolvimento nacional, PDN 2018-2022 e visa o fomento e a dinamização da cadeia de fornecimento de bens e serviços, com a finalidade de aumentar a participação de empresas nacionais de sector, bem como a protecção de empregos e quadros angolanos.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Aos 20 de outubro de 2020, foi publicada a legislação sobre o conteúdo local em Angola por via do <strong className="text-foreground">Decreto Presidencial nº 271/20</strong>, que vem legislar estas actividades com o foco de se criar as condições necessárias para o crescimento efectivo da presença das empresas nacionais no sector assim como a geração de oportunidades de emprego e qualificação da mão de obra nacional.
            </p>
          </div>
        </motion.section>

        {/* Statistics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">Estatísticas de Registo e Certificação</h2>
          <p className="text-muted-foreground mb-8">Dados actualizados a Março de 2025</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-elevated transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contracting Regimes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">Regimes de Contratação</h2>
          <p className="text-muted-foreground mb-8">O Decreto Presidencial nº 271/20 estabelece 3 Regimes de Contratação</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {regimes.map((regime, index) => (
              <motion.div
                key={regime.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-elevated transition-all duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl ${regime.color} flex items-center justify-center mb-4`}>
                      <regime.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{regime.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {regime.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <p className="text-muted-foreground mt-8 text-sm">
            Anualmente a Agência Nacional de Petróleo, Gás e Biocombustíveis (ANPG) enquanto concessionária Nacional, publicará no seu site, as listas dos Bens e Serviços que deveram ser contratados pelos seus operadores e as Associadas da Concessionária em Regime de Exclusividade e Regime de Preferência.
          </p>
        </motion.section>

        {/* Supplier Registration */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="bg-secondary/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Registo de Fornecedor</CardTitle>
                  <p className="text-muted-foreground mt-1">Processo de registo e certificação de empresas</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Etapas do Processo de Registo</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
                {registrationSteps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 text-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground text-xs">{step}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <a 
                    href="https://forms.zohopublic.com/anpg/form/CLRegistoFornecedor/formperma/PaYLej_d7dGFaxmudrISHac0UX2LAkar2h7BOarl7J0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Formulário de Registo
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a 
                    href="https://anpg.co.ao/conteudo-local-lista-de-bens-e-servicos/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    Listas de Bens e Serviços
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Documentation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Documentação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-elevated transition-all duration-300">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">Manual de Instrução ao Fornecedor</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Guia completo com instruções para o processo de registo e certificação de fornecedores.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://anpg.co.ao/conteudo-local/" target="_blank" rel="noopener noreferrer" className="gap-2">
                      Descarregar
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-elevated transition-all duration-300">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">Decreto Presidencial nº 271/20</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Legislação sobre o conteúdo local no sector petrolífero de Angola.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://anpg.co.ao/conteudo-local/" target="_blank" rel="noopener noreferrer" className="gap-2">
                      Ver Documento
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </div>
    </PageLayout>
  );
}
