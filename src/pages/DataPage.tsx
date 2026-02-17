import { BarChart3, Database, FileText, Map, Download, TrendingUp, PieChart, Activity } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-offshore.jpg";

const dataResources = [
  {
    icon: Map,
    title: "Mapa de Concessões",
    description: "Mapa interactivo de todos os blocos petrolíferos com informações sobre operadores e participações.",
    href: "/ep-data/maps",
  },
  {
    icon: Database,
    title: "Plataforma IONA",
    description: "Sistema integrado de gestão de dados de exploração e produção.",
    href: "/ep-data/iona",
  },
  {
    icon: FileText,
    title: "Pacotes de Dados",
    description: "Dados técnicos disponíveis para licenciamento por operadores e investidores.",
    href: "/ep-data/packages",
  },
  {
    icon: TrendingUp,
    title: "Estatísticas de Produção",
    description: "Dados actualizados sobre a produção petrolífera angolana.",
    href: "/production",
  },
];

const keyMetrics = [
  { value: "1.1M", label: "Barris/Dia", description: "Produção actual de petróleo" },
  { value: "47", label: "Blocos Activos", description: "Em exploração e produção" },
  { value: "15+", label: "Operadores", description: "Empresas internacionais" },
  { value: "8B+", label: "Barris", description: "Reservas provadas" },
];

const publications = [
  {
    title: "Relatório Anual 2024",
    type: "Relatório",
    date: "Janeiro 2025",
  },
  {
    title: "Estatísticas de Produção Q4 2024",
    type: "Estatísticas",
    date: "Janeiro 2025",
  },
  {
    title: "Boletim Mensal Dezembro 2024",
    type: "Boletim",
    date: "Dezembro 2024",
  },
  {
    title: "Análise do Sector Petrolífero",
    type: "Análise",
    date: "Novembro 2024",
  },
];

export default function DataPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      pageKey="data"
      title={t("services.analytics.title")}
      subtitle={t("services.label")}
      description={t("services.analytics.description")}
      backgroundImage={heroImage}
      icon={<BarChart3 className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { label: t("services.analytics.title") },
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
              A ANPG é responsável pela recolha, análise e publicação de dados e estatísticas sobre o sector 
              energético angolano. Disponibilizamos informação actualizada e transparente para apoiar a tomada 
              de decisões de investidores, operadores e entidades governamentais.
            </p>
          </div>
        </motion.section>

        {/* Key Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {keyMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-elevated transition-all duration-300">
                  <div className="text-3xl font-bold text-primary mb-1">{metric.value}</div>
                  <div className="text-foreground font-medium mb-1">{metric.label}</div>
                  <div className="text-muted-foreground text-xs">{metric.description}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Data Resources */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">Recursos de Dados</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {dataResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Link to={resource.href}>
                  <Card className="h-full hover:shadow-elevated transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <resource.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {resource.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Publications */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Publicações Recentes</h2>
            <Button variant="outline" asChild>
              <Link to="/media">Ver Todas</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {publications.map((pub, index) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Card className="hover:shadow-elevated transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <FileText className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {pub.title}
                        </h3>
                        <p className="text-muted-foreground text-xs">
                          {pub.type} • {pub.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Dashboard Preview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-foreground text-primary-foreground overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Activity className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Dashboard Interactivo</h3>
                    <p className="text-primary-foreground/70">
                      Explore dados de produção e estatísticas em tempo real.
                    </p>
                  </div>
                </div>
                <Button asChild>
                  <Link to="/production">Aceder ao Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </PageLayout>
  );
}
