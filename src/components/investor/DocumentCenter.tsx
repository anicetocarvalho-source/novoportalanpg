import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  FileText, 
  Download, 
  Search,
  FileCheck,
  Scale,
  BookOpen,
  Landmark,
  Globe2,
  Filter,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StaggerContainer } from "@/components/layout/StaggerContainer";

interface Document {
  id: string;
  title: string;
  description: string;
  category: "legislation" | "contracts" | "brochures" | "guides" | "reports";
  type: "PDF" | "DOC" | "XLS" | "ZIP";
  size: string;
  date: string;
  language: "PT" | "EN" | "PT/EN";
}

const documents: Document[] = [
  // Legislation
  {
    id: "leg-1",
    title: "Lei das Actividades Petrolíferas",
    description: "Lei nº 10/04 de 12 de Novembro - Quadro legal para actividades petrolíferas em Angola",
    category: "legislation",
    type: "PDF",
    size: "2.4 MB",
    date: "2024-01-15",
    language: "PT"
  },
  {
    id: "leg-2",
    title: "Decreto Presidencial nº 49/19",
    description: "Criação e estatutos da ANPG - Agência Nacional de Petróleo, Gás e Biocombustíveis",
    category: "legislation",
    type: "PDF",
    size: "1.8 MB",
    date: "2019-02-06",
    language: "PT"
  },
  {
    id: "leg-3",
    title: "Regulamento de Conteúdo Local",
    description: "Requisitos de conteúdo local para operações petrolíferas",
    category: "legislation",
    type: "PDF",
    size: "3.2 MB",
    date: "2023-06-20",
    language: "PT"
  },
  {
    id: "leg-4",
    title: "Petroleum Activities Law (English)",
    description: "Law No. 10/04 - Legal framework for petroleum activities in Angola",
    category: "legislation",
    type: "PDF",
    size: "2.6 MB",
    date: "2024-01-15",
    language: "EN"
  },
  
  // Contracts
  {
    id: "con-1",
    title: "Modelo de Contrato de Partilha de Produção",
    description: "Modelo padrão de CPP para novos contratos de E&P",
    category: "contracts",
    type: "PDF",
    size: "4.5 MB",
    date: "2024-03-01",
    language: "PT/EN"
  },
  {
    id: "con-2",
    title: "Termos de Referência - Licitação 2025",
    description: "Requisitos e critérios de avaliação para a licitação de 2025",
    category: "contracts",
    type: "PDF",
    size: "2.1 MB",
    date: "2025-01-10",
    language: "PT/EN"
  },
  {
    id: "con-3",
    title: "Modelo de Acordo de Operações Conjuntas",
    description: "JOA padrão para parcerias em blocos petrolíferos",
    category: "contracts",
    type: "PDF",
    size: "3.8 MB",
    date: "2024-06-15",
    language: "PT/EN"
  },
  
  // Brochures
  {
    id: "bro-1",
    title: "Angola: Investir no Sector Petrolífero",
    description: "Brochura institucional sobre oportunidades de investimento",
    category: "brochures",
    type: "PDF",
    size: "12.5 MB",
    date: "2024-09-01",
    language: "PT/EN"
  },
  {
    id: "bro-2",
    title: "Licitação 2025 - Apresentação",
    description: "Apresentação detalhada dos blocos disponíveis na licitação",
    category: "brochures",
    type: "PDF",
    size: "18.2 MB",
    date: "2025-01-15",
    language: "PT/EN"
  },
  {
    id: "bro-3",
    title: "Bacias Sedimentares de Angola",
    description: "Caracterização geológica das principais bacias sedimentares",
    category: "brochures",
    type: "PDF",
    size: "25.8 MB",
    date: "2024-04-10",
    language: "EN"
  },
  
  // Guides
  {
    id: "gui-1",
    title: "Guia do Investidor",
    description: "Guia completo para investir no sector petrolífero angolano",
    category: "guides",
    type: "PDF",
    size: "8.4 MB",
    date: "2024-11-01",
    language: "PT/EN"
  },
  {
    id: "gui-2",
    title: "Processo de Licenciamento",
    description: "Guia passo-a-passo para obtenção de licenças",
    category: "guides",
    type: "PDF",
    size: "4.2 MB",
    date: "2024-07-20",
    language: "PT"
  },
  {
    id: "gui-3",
    title: "Requisitos Ambientais",
    description: "Normas e procedimentos ambientais para operações petrolíferas",
    category: "guides",
    type: "PDF",
    size: "5.6 MB",
    date: "2024-08-15",
    language: "PT/EN"
  },
  
  // Reports
  {
    id: "rep-1",
    title: "Relatório Anual 2024",
    description: "Relatório de actividades e resultados da ANPG",
    category: "reports",
    type: "PDF",
    size: "15.3 MB",
    date: "2025-01-20",
    language: "PT"
  },
  {
    id: "rep-2",
    title: "Estatísticas de Produção 2024",
    description: "Dados consolidados de produção de petróleo e gás",
    category: "reports",
    type: "XLS",
    size: "2.8 MB",
    date: "2025-01-05",
    language: "PT/EN"
  },
];

const categories = [
  { key: "all", label: "Todos", icon: FileText },
  { key: "legislation", label: "Legislação", icon: Scale },
  { key: "contracts", label: "Contratos", icon: FileCheck },
  { key: "brochures", label: "Brochuras", icon: BookOpen },
  { key: "guides", label: "Guias", icon: Landmark },
  { key: "reports", label: "Relatórios", icon: Globe2 },
];

export function DocumentCenter() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.key === category);
    return cat?.icon || FileText;
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.key === category);
    return cat?.label || category;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PDF": return "bg-red-500/10 text-red-600";
      case "DOC": return "bg-blue-500/10 text-blue-600";
      case "XLS": return "bg-green-500/10 text-green-600";
      case "ZIP": return "bg-purple-500/10 text-purple-600";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-AO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Search and Tabs */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("investorPortal.searchDocuments")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-transparent p-0">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const count = cat.key === "all" 
                    ? documents.length 
                    : documents.filter(d => d.category === cat.key).length;
                  
                  return (
                    <TabsTrigger
                      key={cat.key}
                      value={cat.key}
                      className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-lg"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{cat.label}</span>
                      <Badge variant="secondary" className="text-xs h-5 px-1.5">
                        {count}
                      </Badge>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocuments.map((doc) => {
          const CategoryIcon = getCategoryIcon(doc.category);
          
          return (
            <Card key={doc.id} className="group hover:border-primary/30 transition-all">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <CategoryIcon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {doc.title}
                      </h4>
                      <div className="flex gap-1 flex-shrink-0">
                        <Badge className={`${getTypeColor(doc.type)} text-xs`}>
                          {doc.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {doc.language}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {doc.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{formatDate(doc.date)}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 px-3">
                        <Download className="w-4 h-4 mr-1" />
                        {t("investorPortal.download")}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </StaggerContainer>

      {filteredDocuments.length === 0 && (
        <Card className="py-12">
          <CardContent className="text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              {t("investorPortal.noDocuments")}
            </h3>
            <p className="text-muted-foreground">
              {t("investorPortal.adjustSearch")}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4 className="font-medium text-foreground mb-1">
                {t("investorPortal.needMore")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("investorPortal.requestAccess")}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                {t("investorPortal.dataRoom")}
              </Button>
              <Button variant="default">
                {t("investorPortal.contactUs")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
