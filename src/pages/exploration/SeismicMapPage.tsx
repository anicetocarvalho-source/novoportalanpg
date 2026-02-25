import { useEffect, useRef } from "react";
import { Map as MapIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { useContentBlocks } from "@/hooks/useCMSData";
import {
  seismic2dSurveys,
  seismic3dSurveys,
  seismic4dSurveys,
  basinColors,
  type SeismicSurvey,
} from "@/data/seismicData";
import heroImage from "@/assets/angola-coast.jpg";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface SeismicMapPageProps {
  type: "2d" | "3d" | "4d";
}

const surveysByType: Record<string, SeismicSurvey[]> = {
  "2d": seismic2dSurveys,
  "3d": seismic3dSurveys,
  "4d": seismic4dSurveys,
};

export default function SeismicMapPage({ type }: SeismicMapPageProps) {
  const { t, i18n } = useTranslation();
  const { data: cmsBlocks } = useContentBlocks(`exploration-seismic-${type}`);
  const intro = cmsBlocks?.find((b) => b.section_key === "intro")?.content;
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const isEn = i18n.language === "en";

  const titleKey = `pages.exploration.seismic${type}`;
  const subtitleKey = `pages.exploration.seismic${type}Subtitle`;
  const pageKey = `exploration-seismic-${type}`;

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([-9.0, 11.5], 5);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const surveys = surveysByType[type] || [];

    surveys.forEach((survey) => {
      const color = basinColors[survey.basin] || "#8e44ad";
      const coords = survey.coordinates as [number, number][];

      if (type === "2d") {
        const line = L.polyline(coords, {
          color,
          weight: 3,
          opacity: 0.8,
          dashArray: "6 4",
        }).addTo(map);
        line.bindPopup(buildPopup(survey, isEn));
      } else {
        const polygon = L.polygon(coords, {
          color,
          fillColor: color,
          fillOpacity: 0.2,
          weight: 2,
        }).addTo(map);
        polygon.bindPopup(buildPopup(survey, isEn));
      }
    });

    // Legend
    const legend = new L.Control({ position: "bottomright" });
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "leaflet-legend");
      div.style.cssText =
        "background:white;padding:10px 14px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.15);font-size:13px;line-height:1.8;";
      const basins = [...new Set(surveys.map((s) => s.basin))];
      div.innerHTML =
        `<strong style="margin-bottom:4px;display:block">${isEn ? "Basins" : "Bacias"}</strong>` +
        basins
          .map(
            (b) =>
              `<span style="display:flex;align-items:center;gap:6px"><span style="width:14px;height:14px;border-radius:3px;background:${basinColors[b] || "#8e44ad"};display:inline-block"></span>${b}</span>`
          )
          .join("");
      return div;
    };
    legend.addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [type, isEn]);

  const totalSurveys = (surveysByType[type] || []).length;
  const totalCoverage = (surveysByType[type] || []).reduce(
    (sum, s) => sum + s.coverage,
    0
  );
  const unit = type === "2d" ? "km" : "km²";

  return (
    <PageLayout
      pageKey={pageKey}
      titleKey={titleKey}
      subtitleKey={subtitleKey}
      backgroundImage={heroImage}
      icon={<MapIcon className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.exploration", href: "/exploration" },
        { labelKey: titleKey },
      ]}
    >
      <div className="space-y-8">
        {intro ? (
          <>
            <h2 className="text-2xl font-bold text-foreground">
              {intro.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {intro.body}
            </p>
          </>
        ) : (
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t(`pages.exploration.seismic${type}Content`)}
          </p>
        )}

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-secondary/50 border border-border text-center">
            <p className="text-3xl font-bold text-primary">{totalSurveys}</p>
            <p className="text-sm text-muted-foreground">
              {isEn ? "Surveys" : "Levantamentos"}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50 border border-border text-center">
            <p className="text-3xl font-bold text-primary">
              {totalCoverage.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              {isEn ? `Total Coverage (${unit})` : `Cobertura Total (${unit})`}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50 border border-border text-center col-span-2 md:col-span-1">
            <p className="text-3xl font-bold text-primary">
              {[...new Set((surveysByType[type] || []).map((s) => s.basin))]
                .length}
            </p>
            <p className="text-sm text-muted-foreground">
              {isEn ? "Basins Covered" : "Bacias Cobertas"}
            </p>
          </div>
        </div>

        {/* Map */}
        <div
          ref={mapRef}
          className="w-full h-[500px] lg:h-[600px] rounded-2xl border border-border overflow-hidden shadow-lg"
        />

        {/* Survey table */}
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/70">
              <tr>
                <th className="text-left p-3 font-semibold text-foreground">
                  {isEn ? "Survey" : "Levantamento"}
                </th>
                <th className="text-left p-3 font-semibold text-foreground">
                  {isEn ? "Year" : "Ano"}
                </th>
                <th className="text-left p-3 font-semibold text-foreground">
                  {isEn ? "Basin" : "Bacia"}
                </th>
                <th className="text-left p-3 font-semibold text-foreground">
                  {isEn ? "Operator" : "Operador"}
                </th>
                <th className="text-right p-3 font-semibold text-foreground">
                  {isEn ? `Coverage (${unit})` : `Cobertura (${unit})`}
                </th>
              </tr>
            </thead>
            <tbody>
              {(surveysByType[type] || []).map((s, i) => (
                <tr
                  key={s.id}
                  className={
                    i % 2 === 0 ? "bg-background" : "bg-secondary/30"
                  }
                >
                  <td className="p-3 text-foreground font-medium">{s.name}</td>
                  <td className="p-3 text-muted-foreground">{s.year}</td>
                  <td className="p-3">
                    <span
                      className="inline-flex items-center gap-1.5"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{
                          backgroundColor: basinColors[s.basin] || "#8e44ad",
                        }}
                      />
                      <span className="text-muted-foreground">{s.basin}</span>
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground">{s.operator}</td>
                  <td className="p-3 text-right text-muted-foreground">
                    {s.coverage.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}

function buildPopup(survey: SeismicSurvey, isEn: boolean): string {
  const unit = survey.type === "2d" ? "km" : "km²";
  return `
    <div style="min-width:200px">
      <strong style="font-size:14px">${survey.name}</strong><br/>
      <span style="color:#666">${isEn ? "Year" : "Ano"}: ${survey.year}</span><br/>
      <span style="color:#666">${isEn ? "Basin" : "Bacia"}: ${survey.basin}</span><br/>
      <span style="color:#666">${isEn ? "Operator" : "Operador"}: ${survey.operator}</span><br/>
      <span style="color:#666">${isEn ? "Coverage" : "Cobertura"}: ${survey.coverage.toLocaleString()} ${unit}</span>
    </div>
  `;
}
