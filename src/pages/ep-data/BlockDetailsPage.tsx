import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { 
  ArrowLeft, Building2, MapPin, Droplets, Calendar, 
  TrendingUp, Users, FileText, Download, ExternalLink,
  Fuel, Gauge, Layers, Target
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { StaggerContainer, StaggerItem } from "@/components/layout/StaggerContainer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { blocksData, BlockData } from "@/components/concessions/ConcessionsMap";
import heroImage from "@/assets/hero-offshore.jpg";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Mock production data generator based on block status
const generateProductionHistory = (block: BlockData) => {
  if (block.status !== "production") return [];
  
  const baseProduction = Math.floor(Math.random() * 50) + 20;
  const years = ["2019", "2020", "2021", "2022", "2023", "2024"];
  
  return years.map((year, index) => ({
    year,
    oil: Math.floor(baseProduction * (0.8 + Math.random() * 0.4) * (1 - index * 0.02)),
    gas: Math.floor(baseProduction * 0.15 * (0.8 + Math.random() * 0.4)),
  }));
};

const generateMonthlyProduction = (block: BlockData) => {
  if (block.status !== "production") return [];
  
  const baseProduction = Math.floor(Math.random() * 40) + 15;
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
  
  return months.map(month => ({
    month,
    production: Math.floor(baseProduction * (0.9 + Math.random() * 0.2)),
  }));
};

// Technical specifications based on block type
const getTechnicalSpecs = (block: BlockData) => {
  const specs: Record<string, { depth: string; area: string; water: string; reserves: string }> = {
    "onshore": { depth: "500 - 2,500m", area: "1,200 - 2,500 km²", water: "N/A", reserves: "50 - 200 MMbbl" },
    "shallow": { depth: "800 - 3,000m", area: "2,000 - 4,000 km²", water: "50 - 500m", reserves: "100 - 500 MMbbl" },
    "deep": { depth: "2,000 - 5,000m", area: "3,000 - 6,000 km²", water: "500 - 2,000m", reserves: "200 - 1,000 MMbbl" },
    "ultra-deep": { depth: "4,000 - 7,000m", area: "4,000 - 8,000 km²", water: "2,000 - 3,500m", reserves: "500 - 2,000 MMbbl" },
  };
  return specs[block.type];
};

const basinLabels: Record<string, string> = {
  "baixo-congo": "Baixo Congo",
  "kwanza": "Kwanza",
  "benguela": "Benguela",
  "namibe": "Namibe",
};

const typeLabels: Record<string, string> = {
  "onshore": "Onshore",
  "shallow": "Águas Rasas",
  "deep": "Águas Profundas",
  "ultra-deep": "Águas Ultra-Profundas",
};

const statusLabels: Record<string, string> = {
  "production": "Em Produção",
  "exploration": "Em Exploração",
  "development": "Em Desenvolvimento",
  "available": "Disponível",
};

const statusColors: Record<string, string> = {
  production: "bg-green-500/20 text-green-600 border-green-500/30",
  exploration: "bg-blue-500/20 text-blue-600 border-blue-500/30",
  development: "bg-amber-500/20 text-amber-600 border-amber-500/30",
  available: "bg-primary/20 text-primary border-primary/30",
};

export default function BlockDetailsPage() {
  const { blockId } = useParams<{ blockId: string }>();
  const { t } = useTranslation();

  const block = useMemo(() => {
    return blocksData.find(b => b.id === blockId);
  }, [blockId]);

  const productionHistory = useMemo(() => {
    return block ? generateProductionHistory(block) : [];
  }, [block]);

  const monthlyProduction = useMemo(() => {
    return block ? generateMonthlyProduction(block) : [];
  }, [block]);

  const technicalSpecs = useMemo(() => {
    return block ? getTechnicalSpecs(block) : null;
  }, [block]);

  if (!block) {
    return (
      <PageLayout
        titleKey="pages.blockDetails.notFound"
        subtitleKey="pages.blockDetails.subtitle"
        descriptionKey="pages.blockDetails.notFoundDesc"
        icon={<MapPin className="w-8 h-8 text-primary" />}
        breadcrumbs={[
          { labelKey: "nav.epData", href: "/ep-data" },
          { labelKey: "nav.submenu.epMaps", href: "/ep-data/maps" },
        ]}
      >
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-6">O bloco solicitado não foi encontrado.</p>
          <Link to="/ep-data/maps">
            <Button variant="default">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Mapa
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      pageKey={`block-${block.id}`}
      title={block.name}
      subtitle={`Bacia do ${basinLabels[block.basin]}`}
      description={`Informações detalhadas sobre o ${block.name}, operado por ${block.operator}.`}
      backgroundImage={heroImage}
      icon={<MapPin className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.epData", href: "/ep-data" },
        { labelKey: "nav.submenu.epMaps", href: "/ep-data/maps" },
        { label: block.name },
      ]}
      heroChildren={
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Badge variant="outline" className={`text-sm px-4 py-2 ${statusColors[block.status]}`}>
            {statusLabels[block.status]}
          </Badge>
          <Badge variant="outline" className="text-sm px-4 py-2 bg-secondary/50 border-border">
            {typeLabels[block.type]}
          </Badge>
        </div>
      }
    >
      {/* Back Link */}
      <div className="mb-8">
        <Link 
          to="/ep-data/maps" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Mapa de Concessões
        </Link>
      </div>

      {/* Overview Cards */}
      <SectionTransition>
        <section className="mb-16">
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StaggerItem>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Operador</span>
                </div>
                <p className="text-xl font-bold text-foreground">{block.operator}</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-6 rounded-2xl bg-secondary/50 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Parceiros</span>
                </div>
                <p className="text-xl font-bold text-foreground">{block.partners.length}</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-6 rounded-2xl bg-secondary/50 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Bacia</span>
                </div>
                <p className="text-xl font-bold text-foreground">{basinLabels[block.basin]}</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-6 rounded-2xl bg-secondary/50 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Tipo</span>
                </div>
                <p className="text-xl font-bold text-foreground">{typeLabels[block.type]}</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </section>
      </SectionTransition>

      {/* Partners & Participation */}
      <SectionTransition delay={0.1}>
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Consórcio</h2>
              <p className="text-muted-foreground text-sm">Participações no bloco</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Partners List */}
            <div className="space-y-4">
              {block.partners.map((partner, index) => (
                <div
                  key={partner.name}
                  className="p-5 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                        index === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{partner.name}</h3>
                        {index === 0 && (
                          <span className="text-xs text-primary">Operador</span>
                        )}
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-primary">{partner.share}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-500"
                      style={{ width: `${partner.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Participation Chart */}
            <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
              <h3 className="font-semibold text-foreground mb-6">Distribuição de Participações</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={block.partners}
                    layout="vertical"
                    margin={{ top: 0, right: 30, left: 80, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} width={75} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value}%`, "Participação"]}
                    />
                    <Bar dataKey="share" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Technical Specifications */}
      <SectionTransition delay={0.15}>
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Gauge className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Especificações Técnicas</h2>
              <p className="text-muted-foreground text-sm">Características geológicas e operacionais</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-xl bg-secondary/50 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Profundidade Alvo</span>
              </div>
              <p className="text-lg font-bold text-foreground">{technicalSpecs?.depth}</p>
            </div>
            <div className="p-6 rounded-xl bg-secondary/50 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Área do Bloco</span>
              </div>
              <p className="text-lg font-bold text-foreground">{technicalSpecs?.area}</p>
            </div>
            <div className="p-6 rounded-xl bg-secondary/50 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Droplets className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Lâmina de Água</span>
              </div>
              <p className="text-lg font-bold text-foreground">{technicalSpecs?.water}</p>
            </div>
            <div className="p-6 rounded-xl bg-secondary/50 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Fuel className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Reservas Estimadas</span>
              </div>
              <p className="text-lg font-bold text-foreground">{technicalSpecs?.reserves}</p>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Production History (only for production blocks) */}
      {block.status === "production" && productionHistory.length > 0 && (
        <SectionTransition delay={0.2}>
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Histórico de Produção</h2>
                <p className="text-muted-foreground text-sm">Evolução da produção de petróleo e gás</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Historical Chart */}
              <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
                <h3 className="font-semibold text-foreground mb-6">Produção Anual (2019-2024)</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={productionHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorOilBlock" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorGasBlock" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="oil"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorOilBlock)"
                        strokeWidth={2}
                        name="Petróleo (kbbl/dia)"
                      />
                      <Area
                        type="monotone"
                        dataKey="gas"
                        stroke="hsl(var(--chart-2))"
                        fillOpacity={1}
                        fill="url(#colorGasBlock)"
                        strokeWidth={2}
                        name="Gás (MMscf/dia)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Monthly Chart */}
              <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
                <h3 className="font-semibold text-foreground mb-6">Produção Mensal (2024)</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyProduction} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`${value} kbbl/dia`, "Produção"]}
                      />
                      <Bar dataKey="production" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>
        </SectionTransition>
      )}

      {/* Available Block CTA */}
      {block.status === "available" && (
        <SectionTransition delay={0.2}>
          <section className="mb-16">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl p-8 md:p-12 border border-primary/30 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Bloco Disponível para Licitação
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Este bloco faz parte da Licitação 2025. Manifeste o seu interesse e receba 
                informações detalhadas sobre o processo.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/opportunities/tender-2025">
                  <Button variant="default" size="lg">
                    Ver Licitação 2025
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  <Download className="w-4 h-4 mr-2" />
                  Descarregar Ficha Técnica
                </Button>
              </div>
            </div>
          </section>
        </SectionTransition>
      )}

      {/* Documents */}
      <SectionTransition delay={0.25}>
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Documentação</h2>
              <p className="text-muted-foreground text-sm">Fichas técnicas e relatórios</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <FileText className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">Ficha Técnica</h4>
                  <p className="text-sm text-muted-foreground">PDF • 2.4 MB</p>
                </div>
                <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
            <div className="p-5 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <FileText className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">Dados Sísmicos</h4>
                  <p className="text-sm text-muted-foreground">ZIP • 156 MB</p>
                </div>
                <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
            <div className="p-5 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <FileText className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">Mapa do Bloco</h4>
                  <p className="text-sm text-muted-foreground">PDF • 8.1 MB</p>
                </div>
                <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>
    </PageLayout>
  );
}
