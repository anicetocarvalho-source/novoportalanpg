

## Plano: Corrigir popup de detalhes do bloco na página Mapas E&P

### Problema
O popup de detalhes do bloco usa `position: fixed` dentro de um componente que tem `transform` CSS (via framer-motion/SectionTransition). Quando um elemento pai tem `transform`, o `fixed` passa a ser relativo a esse pai em vez do viewport, fazendo o popup aparecer no meio da página em vez de centrado no ecrã.

### Solução
Substituir o popup manual (div com `fixed`) pelo componente `Dialog` do Radix UI que já existe no projecto. O Radix Dialog usa um Portal para renderizar o overlay fora da árvore DOM, evitando o problema do `transform`.

### Alteração

**`src/components/concessions/ConcessionsMap.tsx`**
- Importar `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` de `@/components/ui/dialog`
- Substituir o bloco `AnimatePresence` + `motion.div` (linhas 288-391) por um `<Dialog>` controlado via `open={!!selectedBlock}` e `onOpenChange`
- Manter todo o conteúdo interno (detalhes do bloco, parceiros, botões) inalterado
- Remover imports desnecessários de `AnimatePresence`/`motion` se já não forem usados noutro lado do componente (neste caso, `AnimatePresence` e `motion` ainda são usados nos filtros e grid, portanto mantêm-se)

