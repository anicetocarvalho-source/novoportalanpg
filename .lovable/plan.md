

## Plano: Alterar a fonte do website para Poppins

### O que muda
A fonte principal do site passa de **Inter** para **Poppins** em todo o website.

### Alterações necessárias

1. **`src/index.css`** — Substituir o import do Google Fonts de `Inter` para `Poppins` com os mesmos pesos (300–800)

2. **`tailwind.config.ts`** — Alterar a configuração `fontFamily.sans` de `'Inter'` para `'Poppins'`

3. **`src/components/concessions/GeographicMap.tsx`** — Nenhuma alteração necessária (usa `system-ui` como fallback inline)

Estas 2 alterações aplicam Poppins globalmente a todo o site, incluindo header, footer, conteúdo e admin.

