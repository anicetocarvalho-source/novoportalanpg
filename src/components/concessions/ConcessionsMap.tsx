import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building2, Droplets, Filter, Search, ChevronDown, Info, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export interface BlockData {
  id: string;
  name: string;
  basin: "baixo-congo" | "kwanza" | "benguela" | "namibe";
  type: "onshore" | "shallow" | "deep" | "ultra-deep";
  operator: string;
  partners: { name: string; share: number }[];
  status: "production" | "exploration" | "development" | "available";
  area?: string;
}

// Real data from ANPG May 2025
export const blocksData: BlockData[] = [
  // Baixo Congo Basin - Deep Water
  {
    id: "block-0",
    name: "Bloco 0 (Área A & B)",
    basin: "baixo-congo",
    type: "shallow",
    operator: "Chevron",
    status: "production",
    partners: [
      { name: "Sonangol", share: 41 },
      { name: "Chevron", share: 39.2 },
      { name: "TotalEnergies", share: 10 },
      { name: "Azule Energy", share: 9.8 },
    ],
  },
  {
    id: "block-14",
    name: "Bloco 14",
    basin: "baixo-congo",
    type: "deep",
    operator: "Chevron",
    status: "production",
    partners: [
      { name: "Chevron", share: 31 },
      { name: "Sonangol E&P", share: 20 },
      { name: "Azule Energy", share: 20 },
      { name: "Angola Block 14 B.V.", share: 20 },
      { name: "Galp", share: 9 },
    ],
  },
  {
    id: "block-15",
    name: "Bloco 15",
    basin: "baixo-congo",
    type: "deep",
    operator: "ExxonMobil",
    status: "production",
    partners: [
      { name: "Esso", share: 36 },
      { name: "Azule Energy", share: 42 },
      { name: "Equinor", share: 12 },
      { name: "Sonangol E&P", share: 10 },
    ],
  },
  {
    id: "block-15-06",
    name: "Bloco 15/06",
    basin: "baixo-congo",
    type: "deep",
    operator: "Azule Energy",
    status: "production",
    partners: [
      { name: "Azule Energy", share: 36.84 },
      { name: "Sonangol E&P", share: 26.84 },
      { name: "SSI", share: 26.32 },
      { name: "Namcor", share: 10 },
    ],
  },
  {
    id: "block-17",
    name: "Bloco 17",
    basin: "baixo-congo",
    type: "deep",
    operator: "TotalEnergies",
    status: "production",
    partners: [
      { name: "TotalEnergies", share: 38 },
      { name: "Esso", share: 19 },
      { name: "Azule Energy", share: 15.84 },
      { name: "Equinor", share: 22.16 },
      { name: "Sonangol E&P", share: 5 },
    ],
  },
  {
    id: "block-18",
    name: "Bloco 18",
    basin: "baixo-congo",
    type: "deep",
    operator: "Azule Energy",
    status: "production",
    partners: [
      { name: "Azule Energy", share: 36.34 },
      { name: "SSI", share: 37.72 },
      { name: "Sonangol E&P", share: 16.28 },
      { name: "Azule Exploration Beta", share: 9.66 },
    ],
  },
  {
    id: "block-31",
    name: "Bloco 31",
    basin: "baixo-congo",
    type: "ultra-deep",
    operator: "Azule Energy",
    status: "production",
    partners: [
      { name: "Azule Energy", share: 26.67 },
      { name: "Sonangol E&P", share: 45 },
      { name: "SSI", share: 15 },
      { name: "Equinor", share: 13.33 },
    ],
  },
  {
    id: "block-32",
    name: "Bloco 32",
    basin: "baixo-congo",
    type: "ultra-deep",
    operator: "TotalEnergies",
    status: "production",
    partners: [
      { name: "TotalEnergies", share: 30 },
      { name: "Sonangol E&P", share: 30 },
      { name: "SSI", share: 27.5 },
      { name: "Etu Energias", share: 7.5 },
      { name: "Falcon Oil", share: 5 },
    ],
  },
  {
    id: "block-20-11",
    name: "Bloco 20/11",
    basin: "baixo-congo",
    type: "deep",
    operator: "TotalEnergies",
    status: "exploration",
    partners: [
      { name: "TotalEnergies", share: 40 },
      { name: "Petronas", share: 40 },
      { name: "Sonangol E&P", share: 20 },
    ],
  },
  // Kwanza Basin
  {
    id: "block-1-14",
    name: "Bloco 1/14",
    basin: "kwanza",
    type: "deep",
    operator: "Azule Energy",
    status: "exploration",
    partners: [
      { name: "Azule Energy", share: 35 },
      { name: "Equinor", share: 30 },
      { name: "Sonangol E&P", share: 25 },
      { name: "Acrep", share: 10 },
    ],
  },
  {
    id: "block-2-05",
    name: "Bloco 2/05",
    basin: "kwanza",
    type: "shallow",
    operator: "Etu Energias",
    status: "production",
    partners: [
      { name: "Etu Energias", share: 36 },
      { name: "Falcon Oil", share: 24 },
      { name: "Kotoil", share: 12.5 },
      { name: "Poliedro", share: 12.5 },
      { name: "Prodoil", share: 15 },
    ],
  },
  {
    id: "block-3-05",
    name: "Bloco 3/05",
    basin: "kwanza",
    type: "shallow",
    operator: "Sonangol E&P",
    status: "production",
    partners: [
      { name: "Sonangol E&P", share: 36 },
      { name: "Afentra", share: 30 },
      { name: "Maurel & Prom", share: 20 },
      { name: "Etu Energias", share: 10 },
      { name: "NIS-Naftgas", share: 4 },
    ],
  },
  {
    id: "kon-4",
    name: "Bloco KON-4",
    basin: "kwanza",
    type: "onshore",
    operator: "Sonangol E&P",
    status: "production",
    partners: [
      { name: "Sonangol E&P", share: 55 },
      { name: "Afentra", share: 45 },
    ],
  },
  {
    id: "kon-8",
    name: "Bloco KON-8",
    basin: "kwanza",
    type: "onshore",
    operator: "Alfort",
    status: "exploration",
    partners: [
      { name: "Alfort", share: 50 },
      { name: "Simples Oil", share: 20 },
      { name: "MTI Energy", share: 20 },
      { name: "Monka Oil", share: 10 },
    ],
  },
  {
    id: "kon-12",
    name: "Bloco KON-12",
    basin: "kwanza",
    type: "onshore",
    operator: "Apex",
    status: "exploration",
    partners: [
      { name: "Apex", share: 35 },
      { name: "Intank Group", share: 30 },
      { name: "MTI Energy", share: 20 },
      { name: "Brite's Oil", share: 15 },
    ],
  },
  {
    id: "kon-15",
    name: "Bloco KON-15",
    basin: "kwanza",
    type: "onshore",
    operator: "Sonangol E&P",
    status: "exploration",
    partners: [
      { name: "Sonangol E&P", share: 30 },
      { name: "MTI Energy", share: 30 },
      { name: "Apex", share: 25 },
      { name: "Omega Risk", share: 15 },
    ],
  },
  {
    id: "kon-17",
    name: "Bloco KON-17",
    basin: "kwanza",
    type: "onshore",
    operator: "MTI Energy",
    status: "exploration",
    partners: [
      { name: "MTI Energy", share: 60 },
      { name: "Brite's", share: 20 },
      { name: "Mineral One", share: 20 },
    ],
  },
  {
    id: "kon-19",
    name: "Bloco KON-19",
    basin: "kwanza",
    type: "onshore",
    operator: "Acrep",
    status: "exploration",
    partners: [
      { name: "Acrep", share: 45 },
      { name: "Afentra", share: 45 },
      { name: "Enagol", share: 10 },
    ],
  },
  {
    id: "kon-20",
    name: "Bloco KON-20",
    basin: "kwanza",
    type: "onshore",
    operator: "MTI Energy",
    status: "exploration",
    partners: [
      { name: "MTI Energy", share: 50 },
      { name: "Brite's", share: 50 },
    ],
  },
  // Namibe Basin
  {
    id: "block-27",
    name: "Bloco 27",
    basin: "namibe",
    type: "deep",
    operator: "Sonangol E&P",
    status: "exploration",
    partners: [
      { name: "Sonangol E&P", share: 65 },
      { name: "Namcor", share: 35 },
    ],
  },
  {
    id: "block-28",
    name: "Bloco 28",
    basin: "namibe",
    type: "deep",
    operator: "Azule Energy",
    status: "exploration",
    partners: [
      { name: "Azule Energy", share: 60 },
      { name: "Tiptop Energy", share: 20 },
      { name: "Sonangol E&P", share: 20 },
    ],
  },
  {
    id: "block-29",
    name: "Bloco 29",
    basin: "namibe",
    type: "deep",
    operator: "TotalEnergies",
    status: "exploration",
    partners: [
      { name: "TotalEnergies", share: 42.8 },
      { name: "Equinor", share: 22.8 },
      { name: "Sonangol E&P", share: 20 },
      { name: "Azule Energy", share: 8.8 },
      { name: "Petronas", share: 5.6 },
    ],
  },
  {
    id: "block-30",
    name: "Bloco 30",
    basin: "namibe",
    type: "deep",
    operator: "ExxonMobil",
    status: "exploration",
    partners: [
      { name: "Esso", share: 60 },
      { name: "Sonangol E&P", share: 40 },
    ],
  },
  // Benguela Basin - 2025 Tender blocks
  {
    id: "block-25",
    name: "Bloco 25",
    basin: "benguela",
    type: "deep",
    operator: "ANPG",
    status: "available",
    partners: [{ name: "ANPG", share: 100 }],
  },
  {
    id: "block-26",
    name: "Bloco 26",
    basin: "benguela",
    type: "deep",
    operator: "ANPG",
    status: "available",
    partners: [{ name: "ANPG", share: 100 }],
  },
  {
    id: "block-39",
    name: "Bloco 39",
    basin: "benguela",
    type: "deep",
    operator: "ANPG",
    status: "available",
    partners: [{ name: "ANPG", share: 100 }],
  },
  {
    id: "block-40",
    name: "Bloco 40",
    basin: "benguela",
    type: "deep",
    operator: "ANPG",
    status: "available",
    partners: [{ name: "ANPG", share: 100 }],
  },
];

const basinLabels = {
  "baixo-congo": "Baixo Congo",
  "kwanza": "Kwanza",
  "benguela": "Benguela",
  "namibe": "Namibe",
};

const typeLabels = {
  "onshore": "Onshore",
  "shallow": "Águas Rasas",
  "deep": "Águas Profundas",
  "ultra-deep": "Águas Ultra-Profundas",
};

const statusLabels = {
  "production": "Produção",
  "exploration": "Exploração",
  "development": "Desenvolvimento",
  "available": "Disponível",
};

const statusColors = {
  production: "bg-status-success/20 text-status-success-foreground border-status-success/30",
  exploration: "bg-status-info/20 text-status-info-foreground border-status-info/30",
  development: "bg-status-warning/20 text-status-warning-foreground border-status-warning/30",
  available: "bg-primary/20 text-primary border-primary/30",
};

interface ConcessionsMapProps {
  onBlockSelect?: (block: BlockData | null) => void;
}

export function ConcessionsMap({ onBlockSelect }: ConcessionsMapProps) {
  const [selectedBasin, setSelectedBasin] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlock, setSelectedBlock] = useState<BlockData | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredBlocks = useMemo(() => {
    return blocksData.filter((block) => {
      const matchesBasin = selectedBasin === "all" || block.basin === selectedBasin;
      const matchesType = selectedType === "all" || block.type === selectedType;
      const matchesStatus = selectedStatus === "all" || block.status === selectedStatus;
      const matchesSearch = 
        block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        block.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        block.partners.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesBasin && matchesType && matchesStatus && matchesSearch;
    });
  }, [selectedBasin, selectedType, selectedStatus, searchQuery]);

  const stats = useMemo(() => {
    const production = blocksData.filter(b => b.status === "production").length;
    const exploration = blocksData.filter(b => b.status === "exploration").length;
    const available = blocksData.filter(b => b.status === "available").length;
    const operators = [...new Set(blocksData.map(b => b.operator))].length;
    
    return { production, exploration, available, operators };
  }, []);

  const handleBlockClick = (block: BlockData) => {
    setSelectedBlock(block);
    onBlockSelect?.(block);
  };

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-status-success/10 border border-status-success/20">
          <p className="text-2xl font-bold text-status-success-foreground">{stats.production}</p>
          <p className="text-sm text-muted-foreground">Em Produção</p>
        </div>
        <div className="p-4 rounded-xl bg-status-info/10 border border-status-info/20">
          <p className="text-2xl font-bold text-status-info-foreground">{stats.exploration}</p>
          <p className="text-sm text-muted-foreground">Em Exploração</p>
        </div>
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
          <p className="text-2xl font-bold text-primary">{stats.available}</p>
          <p className="text-sm text-muted-foreground">Disponíveis</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary border border-border">
          <p className="text-2xl font-bold text-foreground">{stats.operators}</p>
          <p className="text-sm text-muted-foreground">Operadores</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar blocos, operadores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border hover:border-primary/30 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filtros</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid sm:grid-cols-3 gap-4 p-4 rounded-xl bg-secondary/50 border border-border">
                {/* Basin Filter */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Bacia</label>
                  <div className="flex flex-wrap gap-2">
                    <FilterButton active={selectedBasin === "all"} onClick={() => setSelectedBasin("all")}>
                      Todas
                    </FilterButton>
                    {Object.entries(basinLabels).map(([key, label]) => (
                      <FilterButton
                        key={key}
                        active={selectedBasin === key}
                        onClick={() => setSelectedBasin(key)}
                      >
                        {label}
                      </FilterButton>
                    ))}
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Tipo</label>
                  <div className="flex flex-wrap gap-2">
                    <FilterButton active={selectedType === "all"} onClick={() => setSelectedType("all")}>
                      Todos
                    </FilterButton>
                    {Object.entries(typeLabels).map(([key, label]) => (
                      <FilterButton
                        key={key}
                        active={selectedType === key}
                        onClick={() => setSelectedType(key)}
                      >
                        {label}
                      </FilterButton>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Estado</label>
                  <div className="flex flex-wrap gap-2">
                    <FilterButton active={selectedStatus === "all"} onClick={() => setSelectedStatus("all")}>
                      Todos
                    </FilterButton>
                    {Object.entries(statusLabels).map(([key, label]) => (
                      <FilterButton
                        key={key}
                        active={selectedStatus === key}
                        onClick={() => setSelectedStatus(key)}
                      >
                        {label}
                      </FilterButton>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        A mostrar <strong className="text-foreground">{filteredBlocks.length}</strong> de {blocksData.length} blocos
      </p>

      {/* Blocks Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBlocks.map((block) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
              selectedBlock?.id === block.id
                ? "bg-primary/10 border-primary shadow-lg"
                : "bg-secondary/50 border-border hover:border-primary/30 hover:shadow-md"
            }`}
            onClick={() => handleBlockClick(block)}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  {block.type === "onshore" ? (
                    <MapPin className="w-5 h-5 text-primary" />
                  ) : (
                    <Droplets className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{block.name}</h3>
                  <p className="text-xs text-muted-foreground">{basinLabels[block.basin]}</p>
                </div>
              </div>
              <Badge variant="outline" className={statusColors[block.status]}>
                {statusLabels[block.status]}
              </Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Operador</span>
                <span className="font-medium text-foreground">{block.operator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo</span>
                <span className="text-foreground">{typeLabels[block.type]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Parceiros</span>
                <span className="text-foreground">{block.partners.length}</span>
              </div>
            </div>

            {/* Mini partners list */}
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex flex-wrap gap-1">
                {block.partners.slice(0, 3).map((partner) => (
                  <span
                    key={partner.name}
                    className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
                  >
                    {partner.name} ({partner.share}%)
                  </span>
                ))}
                {block.partners.length > 3 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    +{block.partners.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBlocks.length === 0 && (
        <div className="text-center py-12">
          <Info className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum bloco encontrado com os filtros seleccionados.</p>
        </div>
      )}

      {/* Selected Block Details Modal */}
      <AnimatePresence>
        {selectedBlock && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBlock(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-2xl border border-border shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{selectedBlock.name}</h2>
                      <p className="text-sm text-muted-foreground">{basinLabels[selectedBlock.basin]}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={statusColors[selectedBlock.status]}>
                    {statusLabels[selectedBlock.status]}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <p className="text-sm text-muted-foreground">Operador</p>
                      <p className="font-semibold text-foreground">{selectedBlock.operator}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <p className="font-semibold text-foreground">{typeLabels[selectedBlock.type]}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Participações</h3>
                    <div className="space-y-2">
                      {selectedBlock.partners.map((partner) => (
                        <div key={partner.name} className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-foreground">{partner.name}</span>
                              <span className="text-sm font-medium text-primary">{partner.share}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-secondary overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                                style={{ width: `${partner.share}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Link
                    to={`/ep-data/blocks/${selectedBlock.id}`}
                    className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    Ver Detalhes
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setSelectedBlock(null)}
                    className="flex-1 py-3 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterButton({ 
  children, 
  active, 
  onClick 
}: { 
  children: React.ReactNode; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
      }`}
    >
      {children}
    </button>
  );
}
