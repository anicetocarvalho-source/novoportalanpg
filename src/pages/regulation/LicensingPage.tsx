import { FileCheck, ClipboardList, FileText, CheckCircle2, Clock, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-offshore.jpg";

const licenseTypes = [
  {
    title: "Licença de Pesquisa",
    description: "Autorização para actividades de prospecção e pesquisa de hidrocarbonetos em áreas definidas.",
    duration: "Até 4 anos, prorrogável",
    icon: ClipboardList,
  },
  {
    title: "Licença de Avaliação",
    description: "Autorização para avaliação de descobertas e estudos de viabilidade comercial.",
    duration: "Até 2 anos",
    icon: FileText,
  },
  {
    title: "Licença de Produção",
    description: "Autorização para desenvolvimento e produção comercial de hidrocarbonetos.",
    duration: "Até 25 anos, prorrogável",
    icon: CheckCircle2,
  },
];

const processSteps = [
  {
    step: 1,
    title: "Manifestação de Interesse",
    description: "Submissão formal de interesse em participar num concurso ou oferta permanente.",
  },
  {
    step: 2,
    title: "Qualificação Técnica",
    description: "Avaliação das capacidades técnicas e financeiras do candidato.",
  },
  {
    step: 3,
    title: "Submissão de Proposta",
    description: "Apresentação de proposta técnica e comercial detalhada.",
  },
  {
    step: 4,
    title: "Avaliação e Negociação",
    description: "Análise das propostas e negociação dos termos contratuais.",
  },
  {
    step: 5,
    title: "Aprovação Governamental",
    description: "Submissão para aprovação final das autoridades competentes.",
  },
  {
    step: 6,
    title: "Assinatura do Contrato",
    description: "Formalização do contrato de concessão petrolífera.",
  },
];

export default function LicensingPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t("services.licensing.title")}
      subtitle={t("services.label")}
      description={t("services.licensing.description")}
      backgroundImage={heroImage}
      icon={<FileCheck className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { label: t("services.regulation.title"), href: "/regulation" },
        { label: t("services.licensing.title") },
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
            <p className="text-muted-foreground leading-relaxed text-lg">
              A ANPG é responsável pela gestão de concessões e licenças para exploração e produção de hidrocarbonetos 
              em Angola. O processo de licenciamento é conduzido de forma transparente e competitiva, garantindo que 
              os recursos naturais do país sejam desenvolvidos de forma eficiente e sustentável.
            </p>
          </div>
        </motion.section>

        {/* License Types */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">Tipos de Licenças</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {licenseTypes.map((license, index) => (
              <motion.div
                key={license.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-elevated transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <license.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{license.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {license.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-foreground font-medium">{license.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Process Steps */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">Processo de Licenciamento</h2>
          <p className="text-muted-foreground mb-8">Etapas do processo de atribuição de concessões petrolíferas</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                        <p className="text-muted-foreground text-sm">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-foreground text-primary-foreground">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Interessado em investir?</h3>
                    <p className="text-primary-foreground/70">Consulte as oportunidades actuais e inicie o seu processo de candidatura.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="heroOutline" asChild>
                    <Link to="/opportunities">Ver Oportunidades</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/contacts">Contactar</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </PageLayout>
  );
}
