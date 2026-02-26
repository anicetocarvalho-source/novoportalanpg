
# Plano: Actualizar a Base de Conhecimento do SOBA

## Situação Actual
A base de conhecimento tem apenas **12 entradas** cobrindo tópicos básicos (missão, produção, regulação, contactos, licitações, sustentabilidade, conteúdo local). O site contém informação detalhada sobre **30+ páginas** que o chatbot desconhece.

## Conteúdo em Falta (a adicionar)

### Português (≈25 novas entradas)
1. **Mensagem do PCA** — Discurso completo do Paulino Jerónimo, novo ciclo estratégico, nova identidade
2. **Propósito e Princípios** — 6 princípios institucionais (Angola, global, futuro, mobilização, excelência, responsabilidade)
3. **Objectivos Estratégicos** — 5 objectivos (regulação, reservas, excelência operacional, capital humano, descarbonização)
4. **Conselho de Administração** — Composição e pelouros dos 5 membros
5. **História de Angola (Petróleo)** — Timeline completa 1910-2021 com 20+ marcos
6. **Responsabilidade Social** — Áreas (educação, ambiente, comunidades, saúde), Lei 10/04
7. **Licenciamento** — 3 tipos de licença, processo em 6 etapas
8. **Fiscalização** — 4 áreas, 8 áreas de conformidade, estatísticas (450+ inspecções)
9. **Licitações (Processo)** — 5 fases, elegibilidade, processos activos
10. **Licitação 2025** — Blocos, objectivos, documentação, cronograma
11. **Oferta Permanente** — Mecanismo, 6 blocos disponíveis, vantagens, elegibilidade
12. **Licitação 2023** — Resultados
13. **Gás Natural** — Angola LNG (5.2 MTPA), oportunidades, exportação
14. **Integração Energética e Biocombustíveis** — Núcleo, 4 áreas, timeline 2020-2025, indicadores
15. **Exploração** — Campanhas sísmicas, processamento, novas áreas, mapas 2D/3D/4D
16. **Produção (Detalhada)** — Histórico desde 1978, pico 2008, dados actuais ~1.1M bbl/dia
17. **Dados de E&P** — Recursos disponíveis, métricas (47 blocos, 15+ operadores, 8B+ reservas)
18. **Plataforma IONA** — Sistema integrado de gestão de dados E&P
19. **OASIS** — Banco de imagens sísmicas e geológicas
20. **Pacotes de Dados** — Dados técnicos para licenciamento
21. **Canal de Denúncias** — Mecanismo, confidencialidade, contactos compliance
22. **Portal do Investidor** — Funcionalidades (Data Room, Dashboard, reuniões)
23. **Privacidade e Termos** — Políticas de dados, cookies, direitos
24. **FAQ Completo** — Investimento, licitações, contratos (CPP), conteúdo local, dados técnicos
25. **Conferências de Dados** — 2021 e 2023

### Inglês (≈25 entradas equivalentes)
Mesmos tópicos traduzidos para inglês.

## Implementação Técnica

1. **Inserção via SQL** — Usar a ferramenta de inserção de dados para adicionar ~50 registos na tabela `knowledge_base`
2. **Categorias organizadas** — Expandir de 6 para ~15 categorias (institucional, história, regulação, licenciamento, fiscalização, licitações, exploração, produção, gás, dados, investidor, sustentabilidade, biocombustíveis, compliance, contactos)
3. **Conteúdo condensado** — Cada entrada terá texto informativo denso extraído dos ficheiros i18n e content_blocks, optimizado para o contexto RAG do chatbot
4. **Sem alterações ao edge function** — A arquitectura actual já suporta múltiplas entradas; o SOBA carrega automaticamente todo o conteúdo activo

## Resultado Esperado
O SOBA passará de responder a ~6 tópicos genéricos para cobrir a totalidade do site (~15 categorias), incluindo detalhes sobre licitações, blocos disponíveis, processos de licenciamento, história, composição do CA, biocombustíveis e dados técnicos.
