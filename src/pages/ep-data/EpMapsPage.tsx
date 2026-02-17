import { Map, Download, Building2, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { ConcessionsMap, blocksData } from "@/components/concessions/ConcessionsMap";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-offshore.jpg";
import { useMemo } from "react";

export default function EpMapsPage() {
  const { t } = useTranslation();

  const operatorStats = useMemo(() => {
    const operators: Record<string, { blocks: number; production: number }> = {};
    
    blocksData.forEach(block => {
      if (!operators[block.operator]) {
        operators[block.operator] = { blocks: 0, production: 0 };
      }
      operators[block.operator].blocks++;
      if (block.status === "production") {
        operators[block.operator].production++;
      }
    });

    return Object.entries(operators)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.blocks - a.blocks)
      .slice(0, 8);
  }, []);

  const basinStats = useMemo(() => {
    const basins: Record<string, number> = {};
    blocksData.forEach(block => {
      basins[block.basin] = (basins[block.basin] || 0) + 1;
    });
    return basins;
  }, []);

  return (
    <PageLayout
      pageKey="ep-maps"
      titleKey="pages.epMaps.title"
      subtitleKey="pages.epMaps.subtitle"
      descriptionKey="pages.epMaps.description"
      backgroundImage={heroImage}
      icon={<Map className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.epData", href: "/ep-data" },
        { labelKey: "nav.submenu.epMaps" },
      ]}
      heroChildren={
        <div className="flex flex-wrap gap-4 mt-4">
          <Button variant="hero" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Descarregar Mapa PDF
          </Button>
        </div>
      }
    >
      {/* Basin Distribution */}
      <SectionTransition>
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Layers className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Distribuição por Bacia</h2>
              <p className="text-muted-foreground text-sm">Blocos concessionados por região sedimentar</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
              <h3 className="font-bold text-foreground mb-1">Bacia do Baixo Congo</h3>
              <p className="text-3xl font-bold text-blue-600">{basinStats["baixo-congo"] || 0}</p>
              <p className="text-sm text-muted-foreground">blocos concessionados</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
              <h3 className="font-bold text-foreground mb-1">Bacia do Kwanza</h3>
              <p className="text-3xl font-bold text-green-600">{basinStats["kwanza"] || 0}</p>
              <p className="text-sm text-muted-foreground">blocos concessionados</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30">
              <h3 className="font-bold text-foreground mb-1">Bacia de Benguela</h3>
              <p className="text-3xl font-bold text-amber-600">{basinStats["benguela"] || 0}</p>
              <p className="text-sm text-muted-foreground">blocos disponíveis</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
              <h3 className="font-bold text-foreground mb-1">Bacia do Namibe</h3>
              <p className="text-3xl font-bold text-purple-600">{basinStats["namibe"] || 0}</p>
              <p className="text-sm text-muted-foreground">blocos concessionados</p>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Interactive Map */}
      <SectionTransition delay={0.1}>
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Map className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Mapa de Concessões</h2>
              <p className="text-muted-foreground text-sm">Pesquise e explore todos os blocos por bacia, operador e estado</p>
            </div>
          </div>

          <ConcessionsMap />
        </section>
      </SectionTransition>

      {/* Top Operators */}
      <SectionTransition delay={0.2}>
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Principais Operadores</h2>
              <p className="text-muted-foreground text-sm">Empresas com maior presença no sector</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {operatorStats.map((operator, index) => (
              <div
                key={operator.name}
                className="p-5 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-foreground">{operator.name}</h3>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Blocos Operados</span>
                  <span className="font-medium text-foreground">{operator.blocks}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Em Produção</span>
                  <span className="font-medium text-green-600">{operator.production}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </SectionTransition>

      {/* Info Note */}
      <SectionTransition delay={0.3}>
        <section>
          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Map className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">{t("pages.epMaps.updatedData")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("pages.epMaps.updatedDataDesc")}{" "}
                  <a href="https://anpg.co.ao" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {t("pages.epMaps.officialPortal")}
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>
    </PageLayout>
  );
}
