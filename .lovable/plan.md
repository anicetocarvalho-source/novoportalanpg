

## Plano: Adicionar subtítulo à secção Princípios

### O que muda
Após o título "Princípios", será adicionado um subtítulo descritivo antes da grelha de princípios: *"Os nossos princípios orientam, de forma clara e consistente, a nossa actuação diária."*

### Alterações

1. **`src/i18n/locales/pt.json`** — Adicionar chave `subtitle` dentro de `principles`:
   ```json
   "principles": {
     "title": "Princípios",
     "subtitle": "Os nossos princípios orientam, de forma clara e consistente, a nossa actuação diária.",
     ...
   }
   ```

2. **`src/i18n/locales/en.json`** — Adicionar tradução equivalente:
   ```json
   "subtitle": "Our principles guide our daily actions in a clear and consistent way."
   ```

3. **`src/components/about/InstitutionalContent.tsx`** (linha 98-99) — Adicionar parágrafo de subtítulo entre o `SectionTitle` e a grelha `grid`:
   ```tsx
   <SectionTitle ...>{...}</SectionTitle>
   <p className="text-muted-foreground leading-relaxed mb-6">
     {cms?.subtitle || t("pages.anpg.institutional.principles.subtitle")}
   </p>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
   ```

