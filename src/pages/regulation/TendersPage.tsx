import { Globe2, Calendar, FileText, Users, ArrowRight, Clock, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import heroImage from "@/assets/angola-coast.jpg";

const activeTenders = [
  {
    id: "tender-2025",
    title: "Concurso Público 2025",
    status: "active",
    blocks: 10,
    deadline: "30 Junho 2025",
    href: "/opportunities/tender-2025",
  },
  {
    id: "permanent-offer",
    title: "Oferta Permanente",
    status: "ongoing",
    blocks: 15,
    deadline: "Contínuo",
    href: "/opportunities/permanent-offer",
  },
];

const pastTenders = [
  {
    year: "2023",
    title: "Concurso Público 2023",
    blocksOffered: 12,
    blocksAwarded: 8,
    investment: "USD 2.3B",
    href: "/opportunities/tender-2023",
  },
  {
    year: "2020",
    title: "Primeira Ronda de Licenciamento",
    blocksOffered: 10,
    blocksAwarded: 6,
    investment: "USD 1.8B",
    href: "#",
  },
];

const tenderPhases = [
  {
    phase: 1,
    title: "Anúncio e Data Room",
    description: "Publicação do edital e disponibilização de dados técnicos aos interessados.",
  },
  {
    phase: 2,
    title: "Qualificação",
    description: "Análise das credenciais técnicas e financeiras dos candidatos.",
  },
  {
    phase: 3,
    title: "Submissão de Propostas",
    description: "Período para apresentação de propostas técnicas e comerciais.",
  },
  {
    phase: 4,
    title: "Avaliação",
    description: "Análise e classificação das propostas recebidas.",
  },
  {
    phase: 5,
    title: "Negociação",
    description: "Negociação dos termos contratuais com os candidatos seleccionados.",
  },
  {
    phase: 6,
    title: "Adjudicação",
    description: "Anúncio dos resultados e assinatura dos contratos.",
  },
];

export default function TendersPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t("services.tenders.title")}
      subtitle={t("services.label")}
      description={t("services.tenders.description")}
      backgroundImage={heroImage}
      icon={<Globe2 className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { label: t("services.regulation.title"), href: "/regulation" },
        { label: t("services.tenders.title") },
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
              A ANPG organiza concursos públicos internacionais para a atribuição de direitos de exploração e 
              produção de hidrocarbonetos. Os processos são conduzidos de forma transparente, competitiva e em 
              conformidade com as melhores práticas internacionais.
            </p>
          </div>
        </motion.section>

        {/* Active Tenders */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">Oportunidades Activas</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {activeTenders.map((tender, index) => (
              <motion.div
                key={tender.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Link to={tender.href}>
                  <Card className="h-full hover:shadow-elevated transition-all duration-300 group cursor-pointer">
                    <CardHeader className="flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {tender.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {tender.blocks} blocos
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {tender.deadline}
                          </span>
                        </div>
                      </div>
                      <Badge variant={tender.status === "active" ? "default" : "secondary"}>
                        {tender.status === "active" ? "Em Curso" : "Permanente"}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="gap-2 p-0 h-auto text-primary">
                        Ver detalhes <ArrowRight className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tender Phases */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">Fases do Concurso</h2>
          <p className="text-muted-foreground mb-8">O processo típico de um concurso público de blocos petrolíferos</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tenderPhases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold flex-shrink-0">
                        {phase.phase}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{phase.title}</h3>
                        <p className="text-muted-foreground text-sm">{phase.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Past Tenders */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">Concursos Anteriores</h2>
          <div className="space-y-4">
            {pastTenders.map((tender, index) => (
              <motion.div
                key={tender.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Link to={tender.href}>
                  <Card className="hover:shadow-elevated transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-foreground" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {tender.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {tender.blocksOffered} blocos oferecidos • {tender.blocksAwarded} atribuídos
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Investimento Captado</p>
                            <p className="text-lg font-semibold text-primary">{tender.investment}</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </PageLayout>
  );
}
