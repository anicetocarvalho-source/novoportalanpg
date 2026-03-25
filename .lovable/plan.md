

## Plano: Alterar título da página ANPG

### O que muda
O título da página ANPG será alterado de **"A ANPG"** (PT) / **"About ANPG"** (EN) para **"Energia para mais Angola."** (PT) / **"Energy for more Angola."** (EN).

### Alterações necessárias

1. **`src/i18n/locales/pt.json`** (linha 141)
   - De: `"title": "A ANPG"`
   - Para: `"title": "Energia para mais Angola."`

2. **`src/i18n/locales/en.json`** (linha 141)
   - De: `"title": "About ANPG"`
   - Para: `"title": "Energy for more Angola."`

3. **Verificação CMS** — Confirmar se existe um registo na tabela `page_banners` com `page_key = 'anpg'` que possa estar a sobrepor o título. Se existir, actualizar o campo `title_pt` e `title_en` na base de dados.

