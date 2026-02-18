import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { 
  ArrowLeft, Building2, MapPin, Droplets,
  TrendingUp, Users, Fuel, Gauge, Layers, Target, Loader2
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { StaggerContainer, StaggerItem } from "@/components/layout/StaggerContainer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-offshore.jpg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { usePetroleumBlockById, statusColors } from "@/hooks/usePetroleumBlocks";

export default function BlockDetailsPage() {
  const { blockId } = useParams<{ blockId: string }>();
  const { t } = useTranslation();
  const { data: block, isLoading } = usePetroleumBlockById(blockId);

  if (isLoading) {
    return (
      <PageLayout
        titleKey="pages.blockDetails.title"
        subtitleKey="pages.blockDetails.subtitle"
        descriptionKey="pages.blockDetails.description"
        icon={<MapPin className="w-8 h-8 text-primary" />}
        breadcrumbs={[
          { labelKey: "nav.epData", href: "/ep-data" },
          { labelKey: "nav.submenu.epMaps", href: "/ep-data/maps" },
        ]}
      >
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

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
      subtitle={`Bacia: ${block.basin}`}
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
          <Badge variant="outline" className={`text-sm px-4 py-2 ${statusColors[block.statusKey] || ""}`}>
            {block.status}
          </Badge>
          <Badge variant="outline" className="text-sm px-4 py-2 bg-secondary/50 border-border">
            {block.type}
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
                <p className="text-xl font-bold text-foreground">{block.basin}</p>
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
                <p className="text-xl font-bold text-foreground">{block.type}</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </section>
      </SectionTransition>

      {/* Technical Specs */}
      <SectionTransition delay={0.1}>
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
            {block.area_km2 && (
              <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Área do Bloco</span>
                </div>
                <p className="text-lg font-bold text-foreground">{block.area_km2.toLocaleString()} km²</p>
              </div>
            )}
            {block.water_depth_m != null && block.water_depth_m > 0 && (
              <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Droplets className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Lâmina de Água</span>
                </div>
                <p className="text-lg font-bold text-foreground">{block.water_depth_m.toLocaleString()}m</p>
              </div>
            )}
            <div className="p-6 rounded-xl bg-secondary/50 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Oferta</span>
              </div>
              <p className="text-lg font-bold text-foreground">
                {block.offer_type === "permanent_offer" ? "Oferta Permanente" : "Licitação"}
              </p>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Partners & Participation */}
      {block.partners.length > 0 && (
        <SectionTransition delay={0.15}>
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
      )}

      {/* Description */}
      {block.description && (
        <SectionTransition delay={0.2}>
          <section className="mb-16">
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
              <h3 className="font-semibold text-foreground mb-2">Descrição</h3>
              <p className="text-sm text-muted-foreground">{block.description}</p>
            </div>
          </section>
        </SectionTransition>
      )}

      {/* Back button */}
      <SectionTransition delay={0.25}>
        <div className="flex justify-center">
          <Link to="/ep-data/maps">
            <Button variant="outline" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Mapa de Concessões
            </Button>
          </Link>
        </div>
      </SectionTransition>
    </PageLayout>
  );
}
