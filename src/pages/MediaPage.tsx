import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Newspaper, 
  Calendar, 
  ExternalLink, 
  FileText, 
  Video, 
  Scissors, 
  CalendarDays,
  Filter,
  ChevronRight,
  Play
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { StaggerContainer, StaggerItem } from "@/components/layout/StaggerContainer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { newsItems, getCategoryLabel, getCategoryColor } from "@/data/newsData";

interface Publication {
  id: string;
  title: string;
  image: string;
  pdfUrl: string;
}

interface PressClipping {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  image: string;
  url: string;
}

const newsCategories = [
  { key: "all", label: "Todas" },
  { key: "press", label: "Comunicado de Imprensa" },
  { key: "tender", label: "Concurso Público" },
  { key: "highlight", label: "Destaque" },
  { key: "production", label: "Produção Mensal" },
];

const publications: Publication[] = [
  {
    id: "1",
    title: "Boletim N.º 44",
    image: "https://anpg.co.ao/wp-content/uploads/2025/08/44-741x1024.jpg",
    pdfUrl: "https://anpg.co.ao/wp-content/uploads/2025/08/0.ANPG_Newsletter_Primeiro_Oleo_Edicao44.pdf",
  },
  {
    id: "2",
    title: "Boletim N.º 43",
    image: "https://anpg.co.ao/wp-content/uploads/2025/08/43-741x1024.jpg",
    pdfUrl: "https://anpg.co.ao/wp-content/uploads/2025/08/0.ANPG_Newsletter_Primeiro_Oleo_Edicao43.pdf",
  },
  {
    id: "3",
    title: "Boletim N.º 42",
    image: "https://anpg.co.ao/wp-content/uploads/2025/08/42-741x1024.jpg",
    pdfUrl: "https://anpg.co.ao/wp-content/uploads/2025/08/0.ANPG_Newsletter_Primeiro_Oleo_Edicao_42.pdf",
  },
  {
    id: "4",
    title: "Boletim N.º 41",
    image: "https://anpg.co.ao/wp-content/uploads/2025/06/NL_41_cover_846x1169px-741x1024.jpg",
    pdfUrl: "https://anpg.co.ao/wp-content/uploads/2025/06/0.ANPG_Newsletter_Primeiro_Oleo_Edicao_41_Web.pdf",
  },
  {
    id: "5",
    title: "Boletim N.º 40",
    image: "https://anpg.co.ao/wp-content/uploads/2025/06/NL_40_cover_846x1169px-741x1024.jpg",
    pdfUrl: "https://anpg.co.ao/wp-content/uploads/2025/06/0.ANPG_Newsletter_Primeiro_Oleo_Edicao_40_Web.pdf",
  },
  {
    id: "6",
    title: "Boletim N.º 39",
    image: "https://anpg.co.ao/wp-content/uploads/2025/06/NL_39_cover_846x1169px-741x1024.jpg",
    pdfUrl: "https://anpg.co.ao/wp-content/uploads/2025/06/0.ANPG_Newsletter_Primeiro_Oleo_Edicao_39_web.pdf",
  },
];

const pressClippings: PressClipping[] = [
  {
    id: "1",
    title: "Angola busca novos investidores para sector petrolífero",
    source: "Jornal de Angola",
    date: "20 de Janeiro, 2026",
    url: "#",
  },
  {
    id: "2",
    title: "ANPG lança concurso para novos blocos offshore",
    source: "Correio Kianda",
    date: "18 de Janeiro, 2026",
    url: "#",
  },
  {
    id: "3",
    title: "Produção de petróleo atinge novo recorde mensal",
    source: "Expansão",
    date: "15 de Janeiro, 2026",
    url: "#",
  },
  {
    id: "4",
    title: "Biocombustíveis: Angola prepara legislação pioneira",
    source: "Novo Jornal",
    date: "10 de Janeiro, 2026",
    url: "#",
  },
];

const events: Event[] = [
  {
    id: "1",
    title: "1.ª MISSÃO EMPRESARIAL ANGOLA – CANADÁ",
    date: "Novembro, 2025",
    image: "https://anpg.co.ao/wp-content/uploads/2025/11/canada-mission.jpg",
    url: "#",
  },
  {
    id: "2",
    title: "CONFERÊNCIA DE DADOS E&P 2023",
    date: "Outubro, 2023",
    image: "https://anpg.co.ao/wp-content/uploads/2023/10/conference-2023.jpg",
    url: "/ep-data/conference-2023",
  },
  {
    id: "3",
    title: "ANGOLA OIL & GAS 2025",
    date: "Junho, 2025",
    image: "https://anpg.co.ao/wp-content/uploads/2025/06/aog-2025.jpg",
    url: "#",
  },
];

export default function MediaPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredNews = selectedCategory === "all" 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  return (
    <PageLayout
      titleKey="pages.media.title"
      subtitleKey="pages.media.subtitle"
      descriptionKey="pages.media.description"
      icon={<Newspaper className="w-8 h-8 text-primary" />}
      breadcrumbs={[
        { labelKey: "nav.media" },
      ]}
    >
      <Tabs defaultValue="news" className="w-full">
        <SectionTransition>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2 bg-transparent p-0 mb-8">
            <TabsTrigger 
              value="news" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-secondary/50 border border-border rounded-lg py-3"
            >
              <Newspaper className="w-4 h-4 mr-2" />
              Notícias
            </TabsTrigger>
            <TabsTrigger 
              value="publications"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-secondary/50 border border-border rounded-lg py-3"
            >
              <FileText className="w-4 h-4 mr-2" />
              Publicações
            </TabsTrigger>
            <TabsTrigger 
              value="videos"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-secondary/50 border border-border rounded-lg py-3"
            >
              <Video className="w-4 h-4 mr-2" />
              Vídeos
            </TabsTrigger>
            <TabsTrigger 
              value="press"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-secondary/50 border border-border rounded-lg py-3"
            >
              <Scissors className="w-4 h-4 mr-2" />
              Recortes
            </TabsTrigger>
            <TabsTrigger 
              value="events"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-secondary/50 border border-border rounded-lg py-3"
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Eventos
            </TabsTrigger>
          </TabsList>
        </SectionTransition>

        {/* News Tab */}
        <TabsContent value="news">
          <SectionTransition delay={0.1}>
            {/* Category Filter */}
            <div className="flex items-center gap-2 mb-8 flex-wrap">
              <Filter className="w-4 h-4 text-muted-foreground" />
              {newsCategories.map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.key)}
                  className={cn(
                    "rounded-full",
                    selectedCategory === category.key && "bg-primary text-primary-foreground"
                  )}
                >
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Featured News */}
            {filteredNews.length > 0 && (
              <div className="mb-8">
                <Link 
                  to={`/news/${filteredNews[0].id}`}
                  className="group block"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-300">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="aspect-video md:aspect-auto md:h-full">
                        <img
                          src={filteredNews[0].image}
                          alt={filteredNews[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <Badge className={cn("w-fit mb-4", getCategoryColor(filteredNews[0].category))}>
                          {getCategoryLabel(filteredNews[0].category)}
                        </Badge>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-3">
                          {filteredNews[0].title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {filteredNews[0].excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {filteredNews[0].date}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* News Grid */}
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.slice(1).map((news) => (
                <StaggerItem key={news.id}>
                  <Link 
                    to={`/news/${news.id}`}
                    className="group block h-full"
                  >
                    <div className="bg-secondary/50 border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <Badge className={cn("w-fit mb-3", getCategoryColor(news.category))}>
                          {getCategoryLabel(news.category)}
                        </Badge>
                        <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-1">
                          {news.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-auto pt-3 border-t border-border">
                          <Calendar className="w-4 h-4" />
                          {news.date}
                        </div>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Ver Mais Notícias
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </SectionTransition>
        </TabsContent>

        {/* Publications Tab */}
        <TabsContent value="publications">
          <SectionTransition delay={0.1}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Boletim "Primeiro Óleo"</h2>
              <p className="text-muted-foreground">
                Newsletter oficial da ANPG com informações sobre o sector petrolífero angolano.
              </p>
            </div>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {publications.map((pub) => (
                <StaggerItem key={pub.id}>
                  <a
                    href={pub.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="bg-secondary/50 border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={pub.image}
                          alt={pub.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-3 text-center">
                        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                          {pub.title}
                        </h3>
                        <span className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                          <FileText className="w-3 h-3" />
                          PDF
                        </span>
                      </div>
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Ver Todas as Publicações
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </SectionTransition>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos">
          <SectionTransition delay={0.1}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Canal ANPG</h2>
              <p className="text-muted-foreground">
                Vídeos institucionais, reportagens e cobertura de eventos do sector petrolífero.
              </p>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 gap-6">
              {/* Angola Oil & Gas 2024: Opening remarks & special address */}
              <StaggerItem>
                <div className="bg-secondary/50 border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all">
                  <div className="aspect-video">
                    <iframe
                      src="https://www.youtube.com/embed/6cs4tVX9siI"
                      title="Angola Oil & Gas 2024: Opening remarks & special address"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">Angola Oil & Gas 2024: Opening Remarks</h3>
                    <p className="text-sm text-muted-foreground">Cerimónia de abertura e discurso especial</p>
                  </div>
                </div>
              </StaggerItem>

              {/* Angola Oil and Gas Conference 2023 Highlights */}
              <StaggerItem>
                <div className="bg-secondary/50 border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all">
                  <div className="aspect-video">
                    <iframe
                      src="https://www.youtube.com/embed/izPuSt7wzJg"
                      title="Angola Oil and Gas Conference 2023 Highlights"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">Angola Oil & Gas 2023 Highlights</h3>
                    <p className="text-sm text-muted-foreground">Destaques e vozes-chave do evento</p>
                  </div>
                </div>
              </StaggerItem>

              {/* Additional Video */}
              <StaggerItem>
                <div className="bg-secondary/50 border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all">
                  <div className="aspect-video">
                    <iframe
                      src="https://www.youtube.com/embed/LeSAb7xaT4U"
                      title="Angola Oil & Gas Conference"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">Conferência Angola Oil & Gas</h3>
                    <p className="text-sm text-muted-foreground">Cobertura do evento</p>
                  </div>
                </div>
              </StaggerItem>

              {/* ANPG Interview */}
              <StaggerItem>
                <div className="bg-secondary/50 border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all">
                  <div className="aspect-video">
                    <iframe
                      src="https://www.youtube.com/embed/m1rhQ6Xiwz4"
                      title="Angola Oil & Gas Interview"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">Entrevistas Angola Oil & Gas</h3>
                    <p className="text-sm text-muted-foreground">Entrevistas com representantes do sector</p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>

            <div className="mt-8 text-center">
              <a
                href="https://www.youtube.com/results?search_query=Angola+Oil+Gas+ANPG"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  Ver Mais Vídeos no YouTube
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </SectionTransition>
        </TabsContent>

        {/* Press Clippings Tab */}
        <TabsContent value="press">
          <SectionTransition delay={0.1}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Recortes de Imprensa</h2>
              <p className="text-muted-foreground">
                Cobertura mediática sobre a ANPG e o sector petrolífero angolano.
              </p>
            </div>

            <div className="space-y-4">
              {pressClippings.map((clipping) => (
                <a
                  key={clipping.id}
                  href={clipping.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="bg-secondary/50 border border-border rounded-xl p-5 hover:border-primary/30 transition-all duration-300 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                        {clipping.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground/80">{clipping.source}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {clipping.date}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Ver Mais Recortes
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </SectionTransition>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events">
          <SectionTransition delay={0.1}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Eventos</h2>
              <p className="text-muted-foreground">
                Conferências, missões empresariais e eventos do sector petrolífero.
              </p>
            </div>

            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {events.map((event) => (
                <StaggerItem key={event.id}>
                  <a href={event.url} className="group block h-full">
                    <div className="bg-secondary/50 border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg h-full">
                      <div className="aspect-video overflow-hidden bg-muted flex items-center justify-center">
                        <CalendarDays className="w-12 h-12 text-muted-foreground/50" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                      </div>
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Ver Todos os Eventos
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </SectionTransition>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
