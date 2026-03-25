

## Plano: Alterar subtítulo da página ANPG

### O que muda
A descrição da página ANPG será alterada de **"A Agência Nacional de Petróleo, Gás e Biocombustíveis é a entidade reguladora do sector petrolífero angolano."** para **"Somos a ANPG, a Agência Nacional de Petróleo, Gás e Biocombustíveis."**

### Alterações

1. **`src/i18n/locales/pt.json`** (linha 143)
   - De: `"description": "A Agência Nacional de Petróleo, Gás e Biocombustíveis é a entidade reguladora do sector petrolífero angolano."`
   - Para: `"description": "Somos a ANPG, a Agência Nacional de Petróleo, Gás e Biocombustíveis."`

2. **`src/i18n/locales/en.json`** (linha 143)
   - De: `"description": "The National Oil, Gas and Biofuels Agency is the regulatory body for Angola's petroleum sector."`
   - Para: `"description": "We are ANPG, the National Oil, Gas and Biofuels Agency."`

3. **Verificação CMS** — Confirmar se existe override na tabela `page_banners` com `page_key = 'anpg'` que contenha subtítulo a sobrepor este valor. Se existir, actualizar `subtitle_pt` e `subtitle_en`.

