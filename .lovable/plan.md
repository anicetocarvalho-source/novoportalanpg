

## Plano: Novo Menu "Exploração"

### Contexto

A estrutura de menus actual tem 7 itens principais (sort_order 1-7). A "Produção" está na posição 6. O novo menu "Exploração" ficará na posição 6 (antes de "Produção"), e "Produção" passará para 7, "Conteúdo Local" para 8.

### Estrutura do Menu

```text
Exploração (novo - posição 6)
├── Campanhas Sísmicas
├── Processamento e Interpretação
├── Novas Áreas de Exploração
├── Mapa Sísmica 2D
├── Mapa Sísmica 3D
└── Mapa Sísmica 4D
```

### Alterações Necessárias

#### 1. Base de Dados — Menu Items
- Actualizar sort_order de "Produção" para 7 e "Conteúdo Local" para 8
- Inserir novo item pai "Exploração" (sort_order 6, url `/exploration`)
- Inserir 6 sub-itens com ícones apropriados (Map, Layers, Globe2, etc.)

#### 2. Novas Páginas React
- **`/exploration`** — Página índice da secção Exploração (similar à EpDataPage, com cards de navegação)
- **`/exploration/seismic-campaigns`** — Campanhas Sísmicas
- **`/exploration/processing`** — Processamento e Interpretação
- **`/exploration/new-areas`** — Novas Áreas de Exploração
- **`/exploration/seismic-2d`** — Mapa Sísmica 2D (com componente Leaflet)
- **`/exploration/seismic-3d`** — Mapa Sísmica 3D (com componente Leaflet)
- **`/exploration/seismic-4d`** — Mapa Sísmica 4D (com componente Leaflet)

Cada página utilizará `PageLayout` com `useContentBlocks` para conteúdo dinâmico via CMS, seguindo o padrão existente. As páginas de mapas incluirão um componente Leaflet para visualização geográfica dos levantamentos sísmicos.

#### 3. Rotas (App.tsx)
- Adicionar 7 novas rotas no bloco de rotas, antes das rotas de produção

#### 4. Traduções (i18n)
- Adicionar chaves em `en.json` e `pt.json` para títulos, descrições e conteúdo das páginas

#### 5. Icon Map
- Adicionar ícones adicionais ao `iconMap` se necessário (ex: `Compass`, `Radar`)

### Detalhes Técnicos

- As páginas de mapas sísmicos serão inicialmente criadas com placeholder de mapa Leaflet, preparadas para receber dados de coordenadas de levantamentos sísmicos (que poderão ser geridos via CMS ou tabela dedicada futuramente)
- Todo o conteúdo textual será dinâmico via `content_blocks`, com fallback i18n
- Os banners de página poderão ser configurados via `page_banners` no backoffice

