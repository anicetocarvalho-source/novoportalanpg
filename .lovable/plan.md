

## Plano: Alterar texto do card "Responsabilidade Social"

### Alterações

1. **`src/i18n/locales/pt.json`** (linha 227) — Substituir o `desc` do `socialResp` pelo novo texto com quebras de linha:
   - `"Trabalhamos diariamente para que a energia de Angola tenha um impacto positivo nas comunidades de hoje e de amanhã.\n\nAsseguramos um impacto social positivo através de:\n\n– Formação\n– Emprego\n– Responsabilidade social\n– Desenvolvimento local"`

2. **`src/i18n/locales/en.json`** (linha 227) — Tradução EN equivalente:
   - `"We work daily to ensure Angola's energy has a positive impact on today's and tomorrow's communities.\n\nWe ensure a positive social impact through:\n\n– Training\n– Employment\n– Social responsibility\n– Local development"`

3. **Base de dados** — UPDATE dos registos `content_blocks` onde `page_key='anpg'` e `section_key='social-responsibility'` para ambas as línguas, actualizando o campo `desc` no JSON `content`.

4. **Componente `InstitutionalContent.tsx`** — Adicionar `whitespace-pre-line` à classe do parágrafo na `SocialResponsibilitySection` (linha 189) para que as quebras de linha `\n` sejam renderizadas correctamente.

### Detalhe técnico
- O componente já usa `{cms?.desc || t(...)}`, portanto basta actualizar ambas as fontes (i18n + CMS).
- A classe `whitespace-pre-line` já é usada noutras secções do projecto (ex: introdução da ANPG).

