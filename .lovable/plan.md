

## Plano: Página de Processamento e Interpretação com dados reais

### Objectivo

Transformar a página `/exploration/processing` (actualmente quase vazia) numa página rica com informações detalhadas sobre dados sísmicos processados e interpretados, organizados por bacia, bloco, tipo e operador, reutilizando os dados reais já existentes nos ficheiros `src/data/seismic/`.

---

### Alterações Propostas

#### 1. Reescrever `src/pages/exploration/ProcessingPage.tsx`

A página passará a incluir:

**a) Resumo Estatístico Global**
- Cards com totais: levantamentos processados, cobertura total 2D (km), cobertura total 3D/4D (km²), operadores envolvidos, bacias cobertas, período temporal

**b) Tabela "Dados Processados por Bacia"**
- Agrupamento por bacia (Baixo Congo, Kwanza, Namibe, Cabinda Onshore, Congo Interior)
- Para cada bacia: n.º de levantamentos 2D, 3D e 4D, cobertura total, operadores activos

**c) Tabela "Inventário Completo de Dados Processados"**
- Tabela filtrável com todos os levantamentos (2D + 3D + 4D combinados)
- Colunas: Nome, Tipo (2D/3D/4D), Categoria (Proprietária/Multicliente), Bacia, Operador, Ano, Cobertura
- Filtros por bacia e por tipo (reutilizando Checkbox + estado local)

**d) Secção "Dados por Bloco"**
- Tabela focada nos levantamentos 3D/4D que referem blocos específicos (Block 14, Block 15, Block 17, etc.)
- Agrupa surveys que partilham o mesmo bloco, mostrando o histórico de cobertura sísmica por bloco

**e) Links para mapas interactivos**
- Cards com links directos para `/exploration/seismic-2d`, `/exploration/seismic-3d`, `/exploration/seismic-4d`

**f) Manutenção do CMS fallback**
- Continua a suportar conteúdo dinâmico de `content_blocks` com `page_key = "exploration-processing"` para texto introdutório

#### 2. Lógica de dados (sem backend, tudo local)

Toda a informação será derivada dos arrays existentes (`seismic2dSurveys`, `seismic3dSurveys`, `seismic4dSurveys`) usando `useMemo` para calcular:
- Agrupamentos por bacia
- Extracção de blocos a partir dos nomes dos surveys (regex para "Block XX")
- Estatísticas agregadas

Não são necessárias alterações à base de dados nem novos ficheiros de dados.

---

### Detalhes Técnicos

**Ficheiros a modificar:**
- `src/pages/exploration/ProcessingPage.tsx` — reescrita completa

**Dependências reutilizadas:**
- `seismic2dSurveys`, `seismic3dSurveys`, `seismic4dSurveys` de `@/data/seismic`
- `basinColors` para cores consistentes com os mapas
- Componentes UI existentes: `Checkbox`, `Card`, `Table`
- `react-router-dom` Link para navegação aos mapas

**Padrão de filtragem:**
```typescript
const [filterBasin, setFilterBasin] = useState<string>("all");
const [filterType, setFilterType] = useState<string>("all");

const filteredSurveys = useMemo(() =>
  allSurveys.filter(s =>
    (filterBasin === "all" || s.basin === filterBasin) &&
    (filterType === "all" || s.type === filterType)
  ), [filterBasin, filterType]
);
```

**Extracção de blocos:**
```typescript
const blockSurveys = useMemo(() => {
  const blockMap = new Map<string, SeismicSurvey[]>();
  [...seismic3dSurveys, ...seismic4dSurveys].forEach(s => {
    const match = s.name.match(/Block\s+(\d+[\w/]*)/i);
    if (match) {
      const key = `Block ${match[1]}`;
      if (!blockMap.has(key)) blockMap.set(key, []);
      blockMap.get(key)!.push(s);
    }
  });
  return blockMap;
}, []);
```

