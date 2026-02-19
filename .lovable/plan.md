

# Mapa Geografico Real com Leaflet para Blocos Petroliferos de Angola

## Resumo

Adicionar um mapa interactivo real usando **Leaflet** (gratuito e open-source) na pagina de concessoes (`/ep-data/maps`), mostrando os blocos petroliferos sobre o mapa de Angola. O mapa coexistira com a listagem de blocos existente, permitindo ao utilizador alternar entre vista de mapa e vista de lista.

## Onde colocar o mapa

O local ideal e a pagina **E&P Maps** (`/ep-data/maps`), na seccao "Mapa de Concessoes" onde actualmente esta o componente `ConcessionsMap` (vista de lista/cards). O mapa geografico sera adicionado como uma **vista alternativa** -- o utilizador podera alternar entre "Vista Mapa" e "Vista Lista" com tabs.

Opcionalmente, uma versao mais compacta do mapa pode ser embebida tambem na pagina de **Oferta Permanente** e na **Licitacao 2025**.

## O que e necessario

### 1. Dados de coordenadas

Actualmente a coluna `coordinates` (jsonb) existe na tabela `petroleum_blocks` mas esta vazia em todos os 59 blocos. Sera necessario:

- Definir o formato das coordenadas (centro do bloco como `{ lat, lng }` ou poligono como array de pontos)
- Populacar a base de dados com coordenadas aproximadas para cada bloco/bacia

Para a primeira versao, usaremos **coordenadas centrais aproximadas por bacia** como fallback quando o bloco nao tiver coordenadas proprias, garantindo que todos os blocos aparecem no mapa desde o inicio.

### 2. Coordenadas aproximadas por bacia

| Bacia | Latitude | Longitude |
|-------|----------|-----------|
| Cabinda | -5.3 | 11.8 |
| Baixo Congo | -6.5 | 11.5 |
| Congo Onshore | -5.8 | 13.0 |
| Kwanza | -9.5 | 12.5 |
| Kwanza Onshore | -9.2 | 14.5 |
| Benguela | -12.5 | 12.0 |
| Namibe | -15.5 | 11.5 |

## Plano tecnico

### Passo 1 -- Instalar Leaflet

Adicionar as dependencias `leaflet` e `react-leaflet` ao projecto, mais os tipos TypeScript (`@types/leaflet`).

### Passo 2 -- Migrar coordenadas para a base de dados

Executar uma migracao SQL para popular a coluna `coordinates` com coordenadas centrais aproximadas por bacia, usando um formato padrao: `{"lat": -6.5, "lng": 11.5}`. Cada bloco recebera coordenadas ligeiramente dispersas dentro da bacia para evitar sobreposicao total.

### Passo 3 -- Criar componente `GeographicMap`

Novo componente em `src/components/concessions/GeographicMap.tsx`:

- Mapa Leaflet centrado em Angola (~-10, 17) com zoom adequado
- Tiles do OpenStreetMap (gratuito, sem API key)
- Marcadores coloridos por **estado** (producao=verde, exploracao=azul, disponivel=vermelho)
- Popup ao clicar num marcador com: nome do bloco, operador, estado, link para detalhes
- Cluster de marcadores quando ha muitos blocos proximos (plugin `react-leaflet-cluster`)
- Legenda com cores por estado

### Passo 4 -- Actualizar `EpMapsPage`

Na seccao "Mapa de Concessoes":

- Adicionar tabs "Vista Mapa" / "Vista Lista"
- Vista Mapa mostra o novo `GeographicMap`
- Vista Lista mostra o `ConcessionsMap` existente
- Os filtros (bacia, tipo, estado) aplicam-se a ambas as vistas

### Passo 5 -- Actualizar hook `usePetroleumBlocks`

Adicionar campos `lat` e `lng` ao interface `PetroleumBlock`, extraidos da coluna `coordinates`.

### Passo 6 -- CSS do Leaflet

Importar o CSS do Leaflet (`leaflet/dist/leaflet.css`) no componente ou no `index.css`.

## Resultado esperado

- Na pagina `/ep-data/maps`, o utilizador ve um **mapa real de Angola** com todos os blocos representados como marcadores coloridos
- Pode clicar num marcador para ver detalhes rapidos e navegar para a pagina completa do bloco
- Pode alternar para a vista de lista actual sem perder filtros
- Futuramente, podera substituir as coordenadas aproximadas por poligonos reais dos blocos

