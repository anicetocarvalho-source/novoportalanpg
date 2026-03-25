

## Plano: Actualizar texto introdutório da ANPG na base de dados

### Problema
O texto não mudou porque a base de dados (tabela `content_blocks`) contém o texto antigo e tem **prioridade** sobre as traduções i18n. O componente lê primeiro do CMS (`intro?.intro`) e só usa o i18n como fallback.

### Solução
Actualizar os 2 registos na tabela `content_blocks` (PT e EN) com o novo texto e adicionar o campo `vision` que falta.

### Alterações

1. **Migração SQL** — Actualizar os registos `content_blocks` onde `page_key='anpg'` e `section_key='intro'`:

   **Registo PT:**
   - `intro` → "A ANPG é a concessionária Nacional, responsável por regular, fiscalizar e promover o desenvolvimento do sector do petróleo, gás e biocombustíveis no segmento upstream em Angola."
   - `role` → "Desde 2019, devolvemos dinamismo ao sector: reforçámos a previsibilidade regulatória, criámos um ambiente de maior confiança para operadores e investidores nacionais e internacionais, impulsionámos novas concessões, novas perfurações e novas descobertas e mantivemos o foco onde ele tem de estar: no valor que o sector gera para Angola. E assim, reforçámos a posição de Angola no mapa energético internacional."
   - `vision` → "Hoje, acompanhamos e guiamos o futuro deste sector em rápida transformação e evolução. Com a integração energética a nível global, é urgente acompanhar e liderar esta tendência, alargando a nossa actuação do petróleo ao gás e aos biocombustíveis. Pelo desenvolvimento do país e pela sustentabilidade do planeta. Mostrando que temos sempre energia para mais."

   **Registo EN:** tradução equivalente dos 3 campos.

2. **Nenhuma alteração de código** — o componente já suporta os 3 campos (`intro`, `role`, `vision`).

### Detalhe técnico
Será executado um `UPDATE` na tabela `content_blocks` via migração, actualizando o campo JSON `content` dos 2 registos existentes (IDs `ee4403a8...` e `0513b5b4...`).

