import { useState, useMemo } from "react";
import { Database, Map, BarChart3, Users, Globe, Calendar, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { useContentBlocks } from "@/hooks/useCMSData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { seismic2dSurveys, seismic3dSurveys, seismic4dSurveys, basinColors } from "@/data/seismic";
import type { SeismicSurvey } from "@/data/seismic";
import heroImage from "@/assets/angola-offshore-platform.jpg";

export default function ProcessingPage() {
  const { t, i18n } = useTranslation();
  const isPt = i18n.language === "pt";
  const { data: cmsBlocks } = useContentBlocks("exploration-processing");
  const getSection = (key: string) => cmsBlocks?.find(b => b.section_key === key)?.content;

  const [filterBasin, setFilterBasin] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const allSurveys = useMemo<SeismicSurvey[]>(
    () => [...seismic2dSurveys, ...seismic3dSurveys, ...seismic4dSurveys],
    []
  );

  const basins = useMemo(() => [...new Set(allSurveys.map(s => s.basin))].sort(), [allSurveys]);
  const operators = useMemo(() => [...new Set(allSurveys.map(s => s.operator))], [allSurveys]);
  const years = useMemo(() => allSurveys.map(s => s.year), [allSurveys]);

  const coverage2d = useMemo(() => allSurveys.filter(s => s.type === "2d").reduce((a, s) => a + s.coverage, 0), [allSurveys]);
  const coverage3d4d = useMemo(() => allSurveys.filter(s => s.type !== "2d").reduce((a, s) => a + s.coverage, 0), [allSurveys]);

  // Basin aggregation
  const basinStats = useMemo(() => {
    const rec: Record<string, { count2d: number; count3d: number; count4d: number; coverage: number; operators: Set<string> }> = {};
    allSurveys.forEach(s => {
      if (!rec[s.basin]) rec[s.basin] = { count2d: 0, count3d: 0, count4d: 0, coverage: 0, operators: new Set() };
      const b = rec[s.basin];
      if (s.type === "2d") b.count2d++;
      else if (s.type === "3d") b.count3d++;
      else b.count4d++;
      b.coverage += s.coverage;
      b.operators.add(s.operator);
    });
    return Object.entries(rec).sort((a, b) => b[1].coverage - a[1].coverage);
  }, [allSurveys]);

  // Block extraction
  const blockSurveys = useMemo(() => {
    const rec: Record<string, SeismicSurvey[]> = {};
    [...seismic3dSurveys, ...seismic4dSurveys].forEach(s => {
      const match = s.name.match(/Block\s+(\d+[\w/]*)/i);
      if (match) {
        const key = `Block ${match[1]}`;
        if (!rec[key]) rec[key] = [];
        rec[key].push(s);
      }
    });
    return Object.entries(rec).sort((a, b) => {
      const numA = parseInt(a[0].replace(/\D/g, ""));
      const numB = parseInt(b[0].replace(/\D/g, ""));
      return numA - numB;
    });
  }, []);

  // Filtered inventory
  const filteredSurveys = useMemo(() =>
    allSurveys.filter(s =>
      (filterBasin === "all" || s.basin === filterBasin) &&
      (filterType === "all" || s.type === filterType)
    ), [allSurveys, filterBasin, filterType]
  );

  const stats = [
    { icon: Database, label: isPt ? "Levantamentos Processados" : "Processed Surveys", value: allSurveys.length },
    { icon: Map, label: isPt ? "Cobertura 2D" : "2D Coverage", value: `${coverage2d.toLocaleString()} km` },
    { icon: BarChart3, label: isPt ? "Cobertura 3D/4D" : "3D/4D Coverage", value: `${coverage3d4d.toLocaleString()} km²` },
    { icon: Users, label: isPt ? "Operadores" : "Operators", value: operators.length },
    { icon: Globe, label: isPt ? "Bacias" : "Basins", value: basins.length },
    { icon: Calendar, label: isPt ? "Período" : "Period", value: `${Math.min(...years)}–${Math.max(...years)}` },
  ];

  const mapLinks = [
    { href: "/exploration/seismic-2d", label: isPt ? "Mapa Sísmico 2D" : "2D Seismic Map", desc: isPt ? "Polilinhas de levantamentos 2D" : "2D survey polylines" },
    { href: "/exploration/seismic-3d", label: isPt ? "Mapa Sísmico 3D" : "3D Seismic Map", desc: isPt ? "Polígonos de cobertura 3D" : "3D coverage polygons" },
    { href: "/exploration/seismic-4d", label: isPt ? "Mapa Sísmico 4D" : "4D Seismic Map", desc: isPt ? "Monitorização time-lapse 4D" : "4D time-lapse monitoring" },
  ];

  return (
    <PageLayout
      pageKey="exploration-processing"
      titleKey="pages.exploration.processing"
      subtitleKey="pages.exploration.processingSubtitle"
      backgroundImage={heroImage}
      icon={<Database className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.exploration", href: "/exploration" },
        { labelKey: "pages.exploration.processing" },
      ]}
    >
      <div className="space-y-12">
        {/* CMS intro */}
        {["intro", "workflow", "centres"].map((key) => {
          const section = getSection(key);
          if (!section) return null;
          return (
            <section key={key}>
              <h2 className="text-2xl font-bold text-foreground mb-4">{(section as any).title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{(section as any).body}</p>
            </section>
          );
        })}

        {/* Stats */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {isPt ? "Resumo Estatístico" : "Statistical Summary"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((s) => (
              <Card key={s.label} className="hover:-translate-y-0">
                <CardContent className="p-4 text-center">
                  <s.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Basin table */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {isPt ? "Dados Processados por Bacia" : "Processed Data by Basin"}
          </h2>
          <Card className="hover:-translate-y-0">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{isPt ? "Bacia" : "Basin"}</TableHead>
                    <TableHead className="text-center">2D</TableHead>
                    <TableHead className="text-center">3D</TableHead>
                    <TableHead className="text-center">4D</TableHead>
                    <TableHead className="text-right">{isPt ? "Cobertura Total" : "Total Coverage"}</TableHead>
                    <TableHead className="text-center">{isPt ? "Operadores" : "Operators"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {basinStats.map(([basin, d]) => (
                    <TableRow key={basin}>
                      <TableCell className="font-medium">
                        <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: basinColors[basin] || "#888" }} />
                        {basin}
                      </TableCell>
                      <TableCell className="text-center">{d.count2d}</TableCell>
                      <TableCell className="text-center">{d.count3d}</TableCell>
                      <TableCell className="text-center">{d.count4d}</TableCell>
                      <TableCell className="text-right font-mono">{d.coverage.toLocaleString()}</TableCell>
                      <TableCell className="text-center">{d.operators.size}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Block history */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {isPt ? "Dados por Bloco" : "Data by Block"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blockSurveys.map(([block, surveys]) => (
              <Card key={block} className="hover:-translate-y-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{block}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {surveys.sort((a, b) => a.year - b.year).map(s => (
                    <div key={s.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate mr-2">{s.name}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant="outline" className="text-xs">{s.type.toUpperCase()}</Badge>
                        <span className="font-mono text-xs">{s.year}</span>
                        <span className="font-mono text-xs text-muted-foreground">{s.coverage.toLocaleString()} {s.coverageUnit}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Full inventory */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {isPt ? "Inventário Completo" : "Full Inventory"}
          </h2>
          <div className="flex flex-wrap gap-3 mb-4">
            <Select value={filterBasin} onValueChange={setFilterBasin}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={isPt ? "Bacia" : "Basin"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isPt ? "Todas as Bacias" : "All Basins"}</SelectItem>
                {basins.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder={isPt ? "Tipo" : "Type"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isPt ? "Todos" : "All"}</SelectItem>
                <SelectItem value="2d">2D</SelectItem>
                <SelectItem value="3d">3D</SelectItem>
                <SelectItem value="4d">4D</SelectItem>
              </SelectContent>
            </Select>
            <span className="self-center text-sm text-muted-foreground">
              {filteredSurveys.length} {isPt ? "resultados" : "results"}
            </span>
          </div>
          <Card className="hover:-translate-y-0">
            <CardContent className="p-0">
              <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{isPt ? "Nome" : "Name"}</TableHead>
                      <TableHead>{isPt ? "Tipo" : "Type"}</TableHead>
                      <TableHead>{isPt ? "Categoria" : "Category"}</TableHead>
                      <TableHead>{isPt ? "Bacia" : "Basin"}</TableHead>
                      <TableHead>{isPt ? "Operador" : "Operator"}</TableHead>
                      <TableHead className="text-center">{isPt ? "Ano" : "Year"}</TableHead>
                      <TableHead className="text-right">{isPt ? "Cobertura" : "Coverage"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSurveys.sort((a, b) => b.year - a.year).map(s => (
                      <TableRow key={s.id}>
                        <TableCell className="font-medium max-w-[200px] truncate">{s.name}</TableCell>
                        <TableCell><Badge variant="secondary" className="text-xs">{s.type.toUpperCase()}</Badge></TableCell>
                        <TableCell className="text-xs text-muted-foreground capitalize">{s.category === "proprietary" ? (isPt ? "Proprietária" : "Proprietary") : "Multicliente"}</TableCell>
                        <TableCell>{s.basin}</TableCell>
                        <TableCell className="text-sm">{s.operator}</TableCell>
                        <TableCell className="text-center font-mono">{s.year}</TableCell>
                        <TableCell className="text-right font-mono">{s.coverage.toLocaleString()} {s.coverageUnit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Map links */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {isPt ? "Mapas Interactivos" : "Interactive Maps"}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {mapLinks.map(m => (
              <Link key={m.href} to={m.href}>
                <Card className="group cursor-pointer">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{m.label}</p>
                      <p className="text-sm text-muted-foreground">{m.desc}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
