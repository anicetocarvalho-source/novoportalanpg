

## Plano: Substituir dados sintéticos por levantamentos sísmicos reais dos PDFs

### Contexto

Analisei os 3 PDFs carregados, que contêm mapas oficiais da ANPG com levantamentos sísmicos reais:

1. **Mapas_Print_II.pdf** -- "Sísmica 2D Proprietária" (15 levantamentos)
2. **Mapas_Print_II - copia.pdf** -- "Sísmica 2D Multicliente" (14 levantamentos)
3. **Mapas_Print_II - copia_2.pdf** -- "Sísmica 3D/4D Proprietária" (~100+ levantamentos com cobertura em km²)

Os dados actuais em `src/data/seismicData.ts` são completamente sintéticos. Este plano substitui-os por dados reais extraídos dos mapas.

---

### Alterações Propostas

#### 1. Reestruturar o modelo de dados (`src/data/seismicData.ts`)

Adicionar campo `category` ao interface `SeismicSurvey` para distinguir entre "proprietária" e "multicliente":

```text
SeismicSurvey
├── id, name, year, basin, operator, type (2d/3d/4d)
├── coverage, coverageUnit
├── category: "proprietary" | "multiclient"  ← NOVO
└── coordinates: [lat, lng][]
```

**Dados 2D Proprietária** (do PDF 1) -- ~15 levantamentos reais:
- Lower Congo 2D (Gulf Oil Corp, 1968)
- 2D-KONCGG69_BA (CGG, 1969)
- 2D-KONCGG70_S (CGG, 1970)
- 2D-KONCGG72_G (CGG, 1973)
- 2D-KONCGG73 (CGG, 1973)
- 2D-KONCGG74 (CGG, 1974)
- 2D-BBCTNG08 (Group Alrosa, 2008)
- Angola 2D (CGG, 2012)
- Cabinda Norte 2D (Grant Geophysical, 2007)
- Cabinda Centro (BGP, 2022)
- Cabinda Sul 3D (Geophysical Institute of Israel, 2005)
- KON 6 (BGP, 2025)
- KON 8 (BGP, 2024)

**Dados 2D Multicliente** (do PDF 2) -- ~14 levantamentos reais:
- A89 (WesternGeco, 1989)
- NB91 (WesternGeco, 1991)
- WG96 (WesternGeco, 1996)
- AWG97 (Western Geophysical, 1997)
- AWG99 (Western Geophysical Co, 1999)
- Angola Offshore MC2D (PGS, 2010)
- CongoSpan II (GX Technology Corp, 2007)
- NamibeSPAN (GX Technology Corp, 2019)
- Southern Angola MC2D (Geokinetics Inc, 2012)
- 2D-BBCTNG07 (Tyumenneftegeofizika, 2007)
- 2D-KONCGG83_GLF (CGG, 1983)
- 2D-KONGSI70 (Geophysical Service Inc, 1970)
- 2D-KONGSI71_PGP (Geophysical Service Inc, 1971)
- 2D-KONGSI82_MCP (Geophysical Service Inc, 1982)

**Dados 3D/4D Proprietária** (do PDF 3) -- ~100+ levantamentos reais com cobertura em km²:
- Block 14 MC3D (PGS, 2013, 3698.2 km²)
- Block 15 3D Phase I-V (WesternGeco, 1995-1999)
- Block 16 South 3D (WesternGeco, 1997, 183 km²)
- Block 17 3D (PGS, 2002, 685 km²)
- Block 18 3D (CGG, 2000, 510 km²)
- Block 31/14 3D (PGS, 2021, 3000 km²)
- Block 32 4D (PGS, 2019, 883.1 km²)
- Girassol complex 4D (WesternGeco, 2012, 967.42 km²)
- CLOV 4D (PGS, 2017, 1649.51 km²)
- E muitos mais...

As coordenadas serão aproximadas a partir das posições visíveis nos mapas UTM, convertidas para lat/lng com base nas bacias conhecidas (Baixo Congo ~5-8°S, Kwanza ~8-11°S, Namibe ~12-17°S, Cabinda onshore).

#### 2. Actualizar a página SeismicMapPage (`src/pages/exploration/SeismicMapPage.tsx`)

- Adicionar filtro por **categoria** (Proprietária / Multicliente) na barra de filtros, aplicável apenas na vista 2D
- Actualizar a legenda do mapa para incluir a distinção de categoria (linha contínua vs tracejada)
- Adicionar coluna "Categoria" na tabela de dados
- Manter todos os filtros existentes (bacia, ano)

#### 3. Actualizar a página SeismicCampaignsPage (`src/pages/exploration/SeismicCampaignsPage.tsx`)

- Adicionar resumo estatístico com dados reais (total de levantamentos por tipo e por bacia)
- Apresentar tabela resumo das campanhas mais recentes extraída dos dados

#### 4. Copiar os PDFs dos mapas para o projecto

- Copiar os 3 PDFs para `public/documents/seismic/` para que possam ser disponibilizados como downloads directos na página de Campanhas Sísmicas

---

### Detalhes Técnicos

**Conversão UTM para Lat/Lng**: Os mapas usam projecção UTM (zonas 32S/33S). As coordenadas serão convertidas usando referências conhecidas: costa angolana (5°S-17°S), longitude offshore (8°E-13°E). As linhas 2D serão traçadas como polilinhas e os levantamentos 3D/4D como polígonos rectangulares baseados nos blocos de referência.

**Interface actualizada**:
```typescript
export interface SeismicSurvey {
  id: string;
  name: string;
  year: number;
  basin: string;
  operator: string;
  type: "2d" | "3d" | "4d";
  category: "proprietary" | "multiclient";
  coverage: number;
  coverageUnit: "km" | "km²";
  coordinates: [number, number][];
}
```

**Ficheiros a criar/modificar**:
- `src/data/seismicData.ts` -- reescrita completa com ~130 levantamentos reais
- `src/pages/exploration/SeismicMapPage.tsx` -- filtro de categoria + legenda actualizada
- `src/pages/exploration/SeismicCampaignsPage.tsx` -- resumo estatístico + downloads
- `public/documents/seismic/` -- PDFs copiados para download

