

## Plano: Adicionar paginação à vista de lista dos blocos

### Problema
A vista de lista mostra todos os blocos de uma vez (grid na linha 204-279), tornando a página muito longa quando há muitos resultados.

### Solução
Adicionar paginação ao grid de blocos, mostrando 12 blocos por página com controlos de navegação.

### Alteração

**`src/components/concessions/ConcessionsMap.tsx`**
1. Adicionar estado `currentPage` (default 1) e constante `BLOCKS_PER_PAGE = 12`
2. Calcular `paginatedBlocks` a partir de `filteredBlocks` com slice baseado na página actual
3. Resetar `currentPage` para 1 quando os filtros ou pesquisa mudam
4. Substituir `filteredBlocks.map(...)` no grid por `paginatedBlocks.map(...)`
5. Adicionar controlos de paginação abaixo do grid usando os componentes `Pagination` já existentes no projecto (`@/components/ui/pagination`)
6. Actualizar o texto "A mostrar X de Y" para indicar o intervalo actual (ex: "A mostrar 1-12 de 45 blocos")

