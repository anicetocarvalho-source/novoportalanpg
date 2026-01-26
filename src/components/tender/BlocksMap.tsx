import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Layers, Info } from "lucide-react";

interface Block {
  id: string;
  name: string;
  basin: "kwanza" | "benguela";
  area: string;
  depth: string;
  status: "available" | "under-evaluation";
  x: number;
  y: number;
  width: number;
  height: number;
}

const blocks: Block[] = [
  // Kwanza Basin Blocks
  { id: "KON-1", name: "Bloco KON-1", basin: "kwanza", area: "2,450 km²", depth: "500-1,500m", status: "available", x: 120, y: 80, width: 60, height: 50 },
  { id: "KON-2", name: "Bloco KON-2", basin: "kwanza", area: "2,180 km²", depth: "800-2,000m", status: "available", x: 185, y: 80, width: 55, height: 50 },
  { id: "KON-3", name: "Bloco KON-3", basin: "kwanza", area: "1,950 km²", depth: "1,000-2,500m", status: "under-evaluation", x: 245, y: 80, width: 50, height: 50 },
  { id: "KON-4", name: "Bloco KON-4", basin: "kwanza", area: "2,320 km²", depth: "600-1,800m", status: "available", x: 120, y: 135, width: 60, height: 45 },
  { id: "KON-5", name: "Bloco KON-5", basin: "kwanza", area: "2,100 km²", depth: "1,200-2,800m", status: "available", x: 185, y: 135, width: 55, height: 45 },
  { id: "KON-6", name: "Bloco KON-6", basin: "kwanza", area: "1,880 km²", depth: "1,500-3,000m", status: "available", x: 245, y: 135, width: 50, height: 45 },
  
  // Benguela Basin Blocks
  { id: "BEN-1", name: "Bloco BEN-1", basin: "benguela", area: "3,200 km²", depth: "400-1,200m", status: "available", x: 100, y: 220, width: 65, height: 55 },
  { id: "BEN-2", name: "Bloco BEN-2", basin: "benguela", area: "2,850 km²", depth: "600-1,600m", status: "available", x: 170, y: 220, width: 60, height: 55 },
  { id: "BEN-3", name: "Bloco BEN-3", basin: "benguela", area: "2,680 km²", depth: "800-2,000m", status: "under-evaluation", x: 235, y: 220, width: 55, height: 55 },
  { id: "BEN-4", name: "Bloco BEN-4", basin: "benguela", area: "3,100 km²", depth: "500-1,400m", status: "available", x: 100, y: 280, width: 65, height: 50 },
  { id: "BEN-5", name: "Bloco BEN-5", basin: "benguela", area: "2,920 km²", depth: "1,000-2,200m", status: "available", x: 170, y: 280, width: 60, height: 50 },
  { id: "BEN-6", name: "Bloco BEN-6", basin: "benguela", area: "2,500 km²", depth: "1,200-2,600m", status: "available", x: 235, y: 280, width: 55, height: 50 },
];

export function BlocksMap() {
  const [hoveredBlock, setHoveredBlock] = useState<Block | null>(null);
  const [selectedBasin, setSelectedBasin] = useState<"all" | "kwanza" | "benguela">("all");

  const filteredBlocks = selectedBasin === "all" 
    ? blocks 
    : blocks.filter(b => b.basin === selectedBasin);

  const kwanzaCount = blocks.filter(b => b.basin === "kwanza").length;
  const benguelaCount = blocks.filter(b => b.basin === "benguela").length;

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedBasin("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedBasin === "all"
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          Todas as Bacias ({blocks.length})
        </button>
        <button
          onClick={() => setSelectedBasin("kwanza")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedBasin === "kwanza"
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          Bacia do Kwanza ({kwanzaCount})
        </button>
        <button
          onClick={() => setSelectedBasin("benguela")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedBasin === "benguela"
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          Bacia de Benguela ({benguelaCount})
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2 relative">
          <div className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-2xl border border-border p-4 md:p-6 overflow-hidden">
            <svg
              viewBox="0 0 400 380"
              className="w-full h-auto"
              style={{ minHeight: "300px" }}
            >
              {/* Background Ocean */}
              <defs>
                <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary) / 0.1)" />
                  <stop offset="100%" stopColor="hsl(var(--primary) / 0.05)" />
                </linearGradient>
                <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--muted) / 0.6)" />
                  <stop offset="100%" stopColor="hsl(var(--muted) / 0.4)" />
                </linearGradient>
                <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border) / 0.3)" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Ocean Background */}
              <rect x="0" y="0" width="400" height="380" fill="url(#oceanGradient)" />
              <rect x="0" y="0" width="400" height="380" fill="url(#gridPattern)" />

              {/* Angola Coastline (simplified) */}
              <path
                d="M 50 20 
                   Q 60 60, 55 100
                   Q 50 140, 60 180
                   Q 65 220, 55 260
                   Q 50 300, 60 340
                   L 60 380
                   L 0 380
                   L 0 20
                   Z"
                fill="url(#landGradient)"
                stroke="hsl(var(--border))"
                strokeWidth="1"
              />

              {/* Basin Labels */}
              {(selectedBasin === "all" || selectedBasin === "kwanza") && (
                <g>
                  <text x="185" y="55" textAnchor="middle" className="fill-foreground text-xs font-bold">
                    BACIA DO KWANZA
                  </text>
                  <text x="185" y="68" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                    Offshore
                  </text>
                </g>
              )}

              {(selectedBasin === "all" || selectedBasin === "benguela") && (
                <g>
                  <text x="175" y="200" textAnchor="middle" className="fill-foreground text-xs font-bold">
                    BACIA DE BENGUELA
                  </text>
                  <text x="175" y="213" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                    Offshore
                  </text>
                </g>
              )}

              {/* Blocks */}
              {filteredBlocks.map((block) => (
                <g key={block.id}>
                  <motion.rect
                    x={block.x}
                    y={block.y}
                    width={block.width}
                    height={block.height}
                    rx="4"
                    className={`cursor-pointer transition-colors duration-200 ${
                      block.status === "available"
                        ? "fill-primary/60 stroke-primary"
                        : "fill-amber-500/40 stroke-amber-500"
                    }`}
                    strokeWidth={hoveredBlock?.id === block.id ? 3 : 1.5}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: hoveredBlock?.id === block.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() => setHoveredBlock(block)}
                    onMouseLeave={() => setHoveredBlock(null)}
                  />
                  <text
                    x={block.x + block.width / 2}
                    y={block.y + block.height / 2 + 4}
                    textAnchor="middle"
                    className="fill-foreground text-[10px] font-semibold pointer-events-none"
                  >
                    {block.id}
                  </text>
                </g>
              ))}

              {/* Legend */}
              <g transform="translate(300, 340)">
                <rect x="0" y="0" width="12" height="12" rx="2" className="fill-primary/60 stroke-primary" strokeWidth="1" />
                <text x="18" y="10" className="fill-muted-foreground text-[9px]">Disponível</text>
                <rect x="0" y="18" width="12" height="12" rx="2" className="fill-amber-500/40 stroke-amber-500" strokeWidth="1" />
                <text x="18" y="28" className="fill-muted-foreground text-[9px]">Em avaliação</text>
              </g>

              {/* Compass */}
              <g transform="translate(360, 30)">
                <circle cx="0" cy="0" r="18" className="fill-secondary stroke-border" strokeWidth="1" />
                <path d="M 0 -12 L 4 4 L 0 0 L -4 4 Z" className="fill-primary" />
                <text x="0" y="-4" textAnchor="middle" className="fill-primary text-[8px] font-bold">N</text>
              </g>

              {/* Scale */}
              <g transform="translate(20, 360)">
                <line x1="0" y1="0" x2="60" y2="0" className="stroke-muted-foreground" strokeWidth="2" />
                <line x1="0" y1="-4" x2="0" y2="4" className="stroke-muted-foreground" strokeWidth="2" />
                <line x1="60" y1="-4" x2="60" y2="4" className="stroke-muted-foreground" strokeWidth="2" />
                <text x="30" y="12" textAnchor="middle" className="fill-muted-foreground text-[8px]">~100 km</text>
              </g>
            </svg>

            {/* Hover Tooltip */}
            <AnimatePresence>
              {hoveredBlock && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-64 bg-background/95 backdrop-blur-sm rounded-xl border border-border shadow-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-bold text-foreground">{hoveredBlock.name}</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bacia:</span>
                      <span className="text-foreground capitalize">{hoveredBlock.basin === "kwanza" ? "Kwanza" : "Benguela"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Área:</span>
                      <span className="text-foreground">{hoveredBlock.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Profundidade:</span>
                      <span className="text-foreground">{hoveredBlock.depth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estado:</span>
                      <span className={hoveredBlock.status === "available" ? "text-primary font-medium" : "text-amber-500 font-medium"}>
                        {hoveredBlock.status === "available" ? "Disponível" : "Em avaliação"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Blocks List */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-primary" />
            <h4 className="font-bold text-foreground">Lista de Blocos</h4>
          </div>
          
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {filteredBlocks.map((block) => (
              <motion.div
                key={block.id}
                className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                  hoveredBlock?.id === block.id
                    ? "bg-primary/10 border-primary/50 shadow-md"
                    : "bg-secondary/50 border-border hover:border-primary/30"
                }`}
                onMouseEnter={() => setHoveredBlock(block)}
                onMouseLeave={() => setHoveredBlock(null)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-foreground text-sm">{block.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    block.status === "available"
                      ? "bg-primary/20 text-primary"
                      : "bg-amber-500/20 text-amber-600"
                  }`}>
                    {block.status === "available" ? "Disponível" : "Avaliação"}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {block.area} • {block.depth}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info Note */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/20">
            <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Passe o rato sobre os blocos no mapa para ver informações detalhadas. Os dados apresentados são indicativos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
