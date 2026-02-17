import { Shield, Eye, AlertTriangle, CheckCircle2, ClipboardCheck, FileWarning, HardHat } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import heroImage from "@/assets/refinery.jpg";

const oversightAreas = [
  {
    icon: Eye,
    title: "Monitorização de Operações",
    description: "Acompanhamento contínuo das actividades de exploração e produção em todos os blocos petrolíferos.",
  },
  {
    icon: ClipboardCheck,
    title: "Auditorias Técnicas",
    description: "Realização de auditorias regulares para verificar o cumprimento dos planos de desenvolvimento aprovados.",
  },
  {
    icon: HardHat,
    title: "Segurança Operacional",
    description: "Fiscalização das normas de segurança e saúde ocupacional nas instalações petrolíferas.",
  },
  {
    icon: FileWarning,
    title: "Conformidade Ambiental",
    description: "Verificação do cumprimento das normas ambientais e dos planos de gestão de impacto.",
  },
];

const inspectionStats = [
  { value: "450+", label: "Inspecções Anuais" },
  { value: "47", label: "Blocos Monitorizados" },
  { value: "100%", label: "Cobertura Nacional" },
  { value: "24/7", label: "Monitorização Contínua" },
];

const complianceAreas = [
  "Planos de Desenvolvimento de Campo",
  "Programas de Trabalho e Orçamentos",
  "Relatórios de Produção",
  "Gestão de Reservatórios",
  "Segurança de Instalações",
  "Protecção Ambiental",
  "Conteúdo Local",
  "Obrigações Contratuais",
];

export default function OversightPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      pageKey="oversight"
      title={t("services.oversight.title")}
      subtitle={t("services.label")}
      description={t("services.oversight.description")}
      backgroundImage={heroImage}
      icon={<Shield className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { label: t("services.regulation.title"), href: "/regulation" },
        { label: t("services.oversight.title") },
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
              A ANPG exerce funções de supervisão e controlo sobre todas as operações petrolíferas em território 
              nacional. O nosso objectivo é garantir que as actividades sejam conduzidas de acordo com as melhores 
              práticas da indústria, os termos contratuais e a legislação vigente.
            </p>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {inspectionStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Oversight Areas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">Áreas de Fiscalização</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {oversightAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-elevated transition-all duration-300">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <area.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{area.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{area.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Compliance Areas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-secondary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                Áreas de Conformidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                A ANPG verifica o cumprimento das obrigações em diversas áreas fundamentais:
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {complianceAreas.map((area, index) => (
                  <div
                    key={area}
                    className="flex items-center gap-2 p-3 rounded-lg bg-background text-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-foreground">{area}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Reporting */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Reporte de Incidentes</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Todos os operadores são obrigados a reportar incidentes de segurança, derrames ou anomalias 
                  operacionais à ANPG. O reporte deve ser feito de forma imediata para incidentes críticos e 
                  dentro de 24 horas para outras ocorrências.
                </p>
                <p className="text-sm text-foreground font-medium">
                  Linha de Emergência: +244 222 XXX XXX
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </PageLayout>
  );
}
