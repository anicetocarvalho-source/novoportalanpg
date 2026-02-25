import { useEffect, useRef } from "react";
import { Map as MapIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { useContentBlocks } from "@/hooks/useCMSData";
import heroImage from "@/assets/angola-coast.jpg";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface SeismicMapPageProps {
  type: "2d" | "3d" | "4d";
}

export default function SeismicMapPage({ type }: SeismicMapPageProps) {
  const { t } = useTranslation();
  const { data: cmsBlocks } = useContentBlocks(`exploration-seismic-${type}`);
  const intro = cmsBlocks?.find(b => b.section_key === "intro")?.content;
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const titleKey = `pages.exploration.seismic${type}`;
  const subtitleKey = `pages.exploration.seismic${type}Subtitle`;
  const pageKey = `exploration-seismic-${type}`;

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([-8.5, 13.0], 6);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

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
      <div className="space-y-6">
        {intro ? (
          <>
            <h2 className="text-2xl font-bold text-foreground">{intro.title}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{intro.body}</p>
          </>
        ) : (
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t(`pages.exploration.seismic${type}Content`)}
          </p>
        )}
        <div
          ref={mapRef}
          className="w-full h-[500px] lg:h-[600px] rounded-2xl border border-border overflow-hidden shadow-lg"
        />
      </div>
    </PageLayout>
  );
}
