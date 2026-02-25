

# Auditoria CMS: O que esta gerido vs. o que falta

## Resumo Executivo

O projecto tem uma arquitectura CMS robusta e a maioria dos componentes ja consome dados dinamicos. No entanto, existem lacunas significativas em paginas que dependem exclusivamente de ficheiros i18n ou dados hardcoded no codigo, sem possibilidade de edicao via backoffice.

---

## 1. O que JA esta gerido pelo CMS/Backoffice

### Tabelas dedicadas (CRUD completo no backoffice)
| Elemento | Tabela | Admin Page |
|---|---|---|
| Noticias | `news_articles` | AdminNewsPage + AdminNewsEditorPage |
| Blocos Petroliferos | `petroleum_blocks` | AdminBlocksPage |
| FAQ | `faq_items` | AdminFAQPage |
| Membros do Conselho | `board_members` | AdminBoardMembersPage |
| Eventos Historicos | `history_events` | AdminHistoryEventsPage |
| Menu Principal + Footer | `menu_items` | AdminMenuItemsPage |
| Banners de Pagina | `page_banners` (34 paginas) | AdminPageBannersPage |
| Media (Publicacoes, Videos, etc.) | `media_items` | AdminMediaPage |
| Documentos de Investidores | `investor_documents` | AdminDocumentsPage |
| Expressoes de Interesse | `expressions_of_interest` | AdminEOIPage |
| Registos de Investidores | `investor_registrations` | AdminInvestorsPage |
| Utilizadores e Roles | `user_roles` + `profiles` | AdminUsersPage |
| Knowledge Base (Soba Chat) | `knowledge_base` | AdminKnowledgeBasePage |
| Definicoes do Site | `site_settings` | AdminSettingsPage |
| Paginas CMS | `cms_pages` | AdminCMSPage |
| Logs de Auditoria | `audit_logs` | AdminAuditPage |
| Producao Estatisticas | `production_statistics` | AdminProductionPage |

### Content Blocks (editaveis via AdminHomepageContentPage + AdminContentBlocksPage)

Paginas COM content blocks populados na base de dados:
- **Homepage** (`home`): hero, stats, services, about, investment, cta, news
- **Sustentabilidade** (`sustainability`): intro, stats, pillars, initiatives, sdg
- **Conteudo Local** (`local-content`): intro, stats, regimes, registration, docs, dashboard
- **Regulacao** (`regulation`): principles (apenas PT)

### Componentes dinamicos
- Header: menu dinamico via `useMenuItems()`
- Footer: menu dinamico via `useMenuItems("footer")` + `useSiteSettings()`
- Contactos: dados via `useSiteSettings()` (morada, telefone, email)
- Privacidade/Termos: email e morada via `useSiteSettings()`

---

## 2. Paginas com FALLBACK hibrido (CMS preparado mas sem dados inseridos)

Estas paginas ja tem hooks `useContentBlocks()` integrados e usam fallbacks locais. O conteudo e editavel via `AdminContentBlocksPage` se forem inseridos registos na tabela `content_blocks`, mas actualmente usam os defaults hardcoded:

| Pagina | page_key | Seccoes sem dados no CMS |
|---|---|---|
| Sobre a ANPG | `about` | strategy, cta (parcial - so fallback i18n) |
| Regulacao | `regulation` | intro, areas, legal, principles (EN em falta) |
| Licenciamento | `licensing` | intro, types, process, cta |
| Fiscalizacao | `oversight` | intro, stats, areas, compliance, reporting |
| Concursos | `tenders` | intro, active, phases, past |
| Producao | `production` | stats, historical, monthly, operators, basins |
| Dados Energeticos | `data` | intro, metrics, resources, publications, dashboard |
| Responsabilidade Social | `social-responsibility` | stats, areas, partners, sdg, intro, objectives |
| Historico Producao | `production-history` | milestones, eras (usa useContentBlocks) |
| Tender 2025 | `tender-2025` | intro, timeline, faq |

---

## 3. Paginas SEM integracao CMS (100% hardcoded ou i18n)

Estas paginas NAO consomem `useContentBlocks` nem nenhum hook CMS para o seu conteudo principal:

| Pagina | Ficheiro | Problema |
|---|---|---|
| **ANPG Institucional** | `AnpgPage.tsx` + `InstitutionalContent.tsx` | Todo o conteudo (proposito, principios, objectivos) vem de chaves i18n hardcoded. Nao ha hook CMS. |
| **Mensagem do PCA** | `PcaMessagePage.tsx` | Tem `useContentBlock` mas fallback pesado (foto local, paragrafos i18n). Parcialmente CMS. |
| **Gas** | `GasPage.tsx` | 100% i18n. Sem hooks CMS. Cards e textos nao editaveis. |
| **Integracao Energetica** | `EnergyIntegrationPage.tsx` | 100% i18n. Areas, estatisticas, timeline, formulario - nada gerido pelo CMS. |
| **Whistleblower** | `WhistleblowerPage.tsx` | 100% i18n. Email e telefone hardcoded nas chaves i18n. |
| **Oportunidades (index)** | `OpportunitiesPage.tsx` | Lista de links hardcoded via chaves i18n. |
| **E&P Data (index)** | `EpDataPage.tsx` | Lista de links hardcoded via chaves i18n. |
| **Iona** | `IonaPage.tsx` | Pagina placeholder sem conteudo. |
| **Oasis** | `OasisPage.tsx` | Pagina placeholder sem conteudo. |
| **Data Packages** | `DataPackagesPage.tsx` | Pagina placeholder sem conteudo. |
| **Conference 2021** | `Conference2021Page.tsx` | Pagina placeholder sem conteudo. |
| **Conference 2023** | `Conference2023Page.tsx` | Pagina placeholder sem conteudo. |
| **Tender 2023** | `Tender2023Page.tsx` | Pagina placeholder sem conteudo. |
| **Privacidade** | `PrivacyPage.tsx` | Seccoes legais 100% i18n. Nao editavel pelo CMS. |
| **Termos** | `TermsPage.tsx` | Seccoes legais 100% i18n. Nao editavel pelo CMS. |
| **E&P Maps** | `EpMapsPage.tsx` | Labels de UI hardcoded em portugues (nao i18n): "Distribuicao por Bacia", "Mapa de Concessoes", etc. |
| **Producao Historica** | `ProductionHistoryPage.tsx` | Dados numericos historicos hardcoded (1978-2025). Graficos nao editaveis. |

---

## 4. Elementos de UI com texto hardcoded (nao i18n)

- `EpMapsPage.tsx`: "Distribuicao por Bacia", "Mapa de Concessoes", "Principais Operadores", "Vista Mapa", "Vista Lista", "Descarregar Mapa PDF", "blocos", "Blocos Operados", "Em Producao"
- `ProductionPage.tsx`: "Petróleo (kbbl/dia)", "Gas (MMscf/dia)", "Dados de Producao por Operador", headers da tabela
- `ProductionHistoryPage.tsx`: Dados numericos extensivos e labels hardcoded
- `InstitutionalContent.tsx`: Estructura inteiramente baseada em chaves i18n sem CMS

---

## 5. Plano de accao recomendado

### Prioridade Alta (conteudo institucional critico)
1. **Migrar `AnpgPage` + `InstitutionalContent` para CMS** - Adicionar `useContentBlocks("anpg")` com seccoes: purpose, principles, objectives, social, environment
2. **Migrar `GasPage` para CMS** - Adicionar `useContentBlocks("gas")` para cards e textos
3. **Migrar `EnergyIntegrationPage` para CMS** - Areas, stats, timeline e opcoes do formulario
4. **Migrar `WhistleblowerPage` para CMS** - Email/telefone/textos editaveis
5. **Migrar `PrivacyPage` e `TermsPage` para CMS** - Textos legais devem ser editaveis

### Prioridade Media (completar content blocks em falta)
6. **Popular content_blocks** para as 10 paginas que ja tem hooks mas sem dados (Regulacao, Licenciamento, Fiscalizacao, etc.)
7. **Migrar labels hardcoded** em `EpMapsPage` e `ProductionPage` para i18n

### Prioridade Baixa (paginas placeholder)
8. **Decidir destino** das 5 paginas placeholder (Iona, Oasis, DataPackages, Conference2021, Conference2023, Tender2023) - popular com conteudo real ou remover

### Detalhes tecnicos da implementacao

Para cada pagina a migrar, o padrao e consistente:

```text
1. Adicionar useContentBlocks("page-key") ao componente
2. Criar getSection helper
3. Substituir textos hardcoded/i18n por cms?.field || fallback
4. Inserir content_blocks na base de dados (PT + EN) via migration
5. Garantir que AdminContentBlocksPage ou AdminHomepageContentPage cobre a nova pagina
```

Estimativa: ~8-12 paginas a migrar, cada uma requer modificacao do componente React + insercao de dados iniciais na base de dados.

