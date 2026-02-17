
# Auditoria de Prontidao para Producao e Plano de Migracao CMS

## Resumo da Auditoria

Analisei todas as paginas, componentes e modulos do backoffice. O sistema CMS ja cobre banners, menus, FAQ, board members, history events, blocos petroliferos, producao, documentos e configuracoes do site. No entanto, existem lacunas criticas que impedem a gestao completa via backoffice.

## Lacunas Identificadas

### 1. CRITICA: Noticias leem de ficheiro hardcoded (nao da BD)

As 4 paginas publicas de noticias -- `NewsSection` (homepage), `MediaPage`, `NewsArchivePage` e `NewsDetailPage` -- importam dados de `src/data/newsData.ts` em vez de consultar a tabela `news_articles` do banco de dados. O backoffice ja permite criar/editar noticias na BD, mas o frontend ignora-as.

**Impacto**: Qualquer noticia criada no backoffice NAO aparece no site publico.

### 2. CRITICA: Conteudo de corpo de pagina hardcoded

Varias paginas tem conteudo extenso directamente no codigo (nao editavel pelo backoffice):

| Pagina | Conteudo Hardcoded |
|---|---|
| SustainabilityPage | Pilares, estatisticas ambientais, iniciativas, ODS |
| LocalContentPage | Estatisticas, regimes de contratacao, etapas de registo, links externos |
| ContactsPage | Morada, telefone, email escritos inline (nao usa `site_settings`) |
| HeroSection | Imagem hero, quick access cards (3 links fixos) |
| AboutSection | Imagem refinery, "45+" anos fixo |
| ServicesSection | Lista de 6 servicos com icones e URLs fixos |
| InvestmentSection | Lista de blocos, highlights, imagem fixa |

### 3. MEDIA: Footer links nao vem do CMS

O `Footer.tsx` usa um array hardcoded de links agrupados em 4 colunas. Os menus CMS apenas alimentam o Header.

### 4. MENOR: Dashboard sem contagens reais

Os 4 cards de resumo no AdminDashboard mostram "--" em vez de contagens reais das tabelas.

---

## Plano de Implementacao

### Fase 1 -- Noticias dinamicas no frontend (Prioridade Maxima)

Migrar as 4 paginas publicas de `newsData.ts` para a tabela `news_articles`:

1. **Criar hook `useCMSNews`** em `useCMSData.ts` com:
   - `useNewsArticles(category?, page?, pageSize?)` -- lista paginada
   - `useNewsArticleBySlug(slug)` -- artigo individual
   - Suporte bilingue (PT/EN) usando os campos `title_pt/title_en`, `content_pt/content_en`

2. **Actualizar `NewsSection.tsx`** (homepage) para usar `useNewsArticles` com limite de 8 artigos

3. **Actualizar `MediaPage.tsx`** para carregar noticias da BD com filtros e paginacao

4. **Actualizar `NewsArchivePage.tsx`** para carregar da BD com busca e filtros

5. **Actualizar `NewsDetailPage.tsx`** para usar `useNewsArticleBySlug` em vez de procurar no array local

6. **Manter `newsData.ts` como seed/fallback** temporariamente, removivel apos dados estarem na BD

### Fase 2 -- Contactos dinamicos

Actualizar `ContactsPage.tsx` para ler morada, telefone e email da tabela `site_settings` (via `useSiteSettings`) em vez de ter os valores escritos directamente no codigo.

### Fase 3 -- Conteudo de paginas via content_blocks

Para as paginas com conteudo extenso hardcoded, usar o sistema de `content_blocks` ja existente:

1. **SustainabilityPage** -- carregar pilares, stats e iniciativas do `content_block` com `pageKey="sustainability"` e `sectionKey` por seccao (`pillars`, `stats`, `initiatives`, `sdg`)

2. **LocalContentPage** -- carregar stats, regimes e links do `content_block` com `pageKey="local-content"`

3. **Homepage sections**: 
   - `HeroSection` -- permitir override de imagem e quick access cards via content_block `home/hero`
   - `AboutSection` -- override de imagem e estatistica "45+" via content_block `home/about`
   - `ServicesSection` -- lista de servicos via content_block `home/services`
   - `InvestmentSection` -- blocos e highlights via content_block `home/investment`

Cada componente mantera os valores i18n como fallback, tal como ja funciona em `StatsSection` e `CTASection`.

### Fase 4 -- Footer dinamico e Dashboard

1. **Footer**: Adicionar um `menu_group="footer"` aos `menu_items` e carregar os links do footer via `useMenuItems` filtrado por grupo
2. **AdminDashboard**: Substituir "--" por contagens reais (`SELECT count(*) FROM news_articles`, etc.)

---

## Detalhes Tecnicos

### Ficheiros a criar
| Ficheiro | Descricao |
|---|---|
| (nenhum ficheiro novo) | Todos os hooks vao no `useCMSData.ts` existente |

### Ficheiros a editar
| Ficheiro | Alteracao |
|---|---|
| `src/hooks/useCMSData.ts` | Adicionar `useNewsArticles` e `useNewsArticleBySlug` |
| `src/components/home/NewsSection.tsx` | Substituir import de `newsData` por hook CMS |
| `src/pages/MediaPage.tsx` | Idem |
| `src/pages/NewsArchivePage.tsx` | Idem |
| `src/pages/NewsDetailPage.tsx` | Idem |
| `src/pages/ContactsPage.tsx` | Usar `useSiteSettings()` para dados de contacto |
| `src/pages/SustainabilityPage.tsx` | Usar `useContentBlocks("sustainability")` com fallback |
| `src/pages/LocalContentPage.tsx` | Usar `useContentBlocks("local-content")` com fallback |
| `src/components/home/HeroSection.tsx` | Usar `useContentBlock("home", "hero")` com fallback |
| `src/components/home/AboutSection.tsx` | Usar `useContentBlock("home", "about")` com fallback |
| `src/components/home/ServicesSection.tsx` | Usar `useContentBlock("home", "services")` com fallback |
| `src/components/home/InvestmentSection.tsx` | Usar `useContentBlock("home", "investment")` com fallback |
| `src/components/layout/Footer.tsx` | Adicionar `useMenuItems("footer")` para links dinamicos |
| `src/hooks/useCMSData.ts` | Parametrizar `useMenuItems(group)` |
| `src/pages/admin/AdminDashboard.tsx` | Queries de contagem real |

### Padrao de integracao (consistente com o existente)

```typescript
// Exemplo: ServicesSection com CMS + fallback
const { data: cmsBlock } = useContentBlock("home", "services");
const cmsServices = cmsBlock?.content?.items;

const services = cmsServices?.length ? cmsServices : defaultServices;
```

### Migracao de BD necessaria

Adicionar coluna `menu_group` default 'footer' ou reutilizar a existente para filtrar menus de footer separadamente do main.

### Sem dependencias novas

Toda a implementacao usa hooks e componentes ja existentes.
