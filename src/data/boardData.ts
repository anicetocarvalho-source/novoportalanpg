export interface Department {
  name: string;
  nameEn: string;
  acronym: string;
  subDepartments?: { name: string; nameEn: string }[];
}

export interface BoardMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  roleEn: string;
  isPCA: boolean;
  initials: string;
  departments: Department[];
}

export const boardMembers: BoardMember[] = [
  {
    id: "pca",
    slug: "paulino-jeronimo",
    name: "Paulino Jerónimo",
    role: "Presidente do Conselho de Administração",
    roleEn: "Chairman of the Board of Directors",
    isPCA: true,
    initials: "PJ",
    departments: [
      {
        name: "Gabinete de Apoio ao Conselho de Administração",
        nameEn: "Board of Directors Support Office",
        acronym: "GACA",
      },
      {
        name: "Gabinete de Planeamento Estratégico",
        nameEn: "Strategic Planning Office",
        acronym: "GPE",
      },
      {
        name: "Gabinete Jurídico",
        nameEn: "Legal Office",
        acronym: "GABJUR",
      },
      {
        name: "Gabinete de Auditoria e Integridade",
        nameEn: "Audit and Integrity Office",
        acronym: "GAI",
      },
    ],
  },
  {
    id: "admin1",
    slug: "artur-custodio",
    name: "Artur Custódio",
    role: "Administrador",
    roleEn: "Board Member",
    isPCA: false,
    initials: "AC",
    departments: [
      {
        name: "Gabinete de Tecnologias de Informação",
        nameEn: "Information Technology Office",
        acronym: "GTI",
      },
      {
        name: "Gabinete de Segurança e Ambiente",
        nameEn: "Safety and Environment Office",
        acronym: "GSA",
      },
      {
        name: "Núcleo do Conteúdo Local",
        nameEn: "Local Content Unit",
        acronym: "NCL",
      },
      {
        name: "Núcleo dos Biocombustíveis",
        nameEn: "Biofuels Unit",
        acronym: "NB",
      },
    ],
  },
  {
    id: "admin2",
    slug: "ana-miala",
    name: "Ana Miala",
    role: "Administradora",
    roleEn: "Board Member",
    isPCA: false,
    initials: "AM",
    departments: [
      {
        name: "Direcção de Exploração",
        nameEn: "Exploration Directorate",
        acronym: "DEX",
        subDepartments: [
          { name: "Departamento de Geologia", nameEn: "Geology Department" },
          { name: "Departamento de Geofísica", nameEn: "Geophysics Department" },
          { name: "Departamento de Novas Zonas de Exploração", nameEn: "New Exploration Zones Department" },
        ],
      },
      {
        name: "Direcção de Produção",
        nameEn: "Production Directorate",
        acronym: "PRO",
        subDepartments: [
          { name: "Departamento de Sondagem", nameEn: "Drilling Department" },
          { name: "Departamento de Produção", nameEn: "Production Department" },
          { name: "Departamento de Reservatórios", nameEn: "Reservoirs Department" },
          { name: "Departamento de Instalações Petrolíferas", nameEn: "Petroleum Facilities Department" },
        ],
      },
      {
        name: "Direcção de Controlo das Concessões",
        nameEn: "Concessions Control Directorate",
        acronym: "DCC",
      },
    ],
  },
  {
    id: "admin3",
    slug: "nicola-mvuayi",
    name: "Nicola Isabel Lemos de Mvuayi",
    role: "Administradora",
    roleEn: "Board Member",
    isPCA: false,
    initials: "NM",
    departments: [
      {
        name: "Direcção de Recursos Humanos",
        nameEn: "Human Resources Directorate",
        acronym: "DRH",
        subDepartments: [
          { name: "Departamento de Recrutamento, Formação e Carreiras", nameEn: "Recruitment, Training and Careers Department" },
          { name: "Departamento Administrativo e Contencioso Laboral", nameEn: "Administrative and Labour Litigation Department" },
        ],
      },
      {
        name: "Direcção de Administração e Finanças",
        nameEn: "Administration and Finance Directorate",
        acronym: "DAF",
        subDepartments: [
          { name: "Departamento de Finanças", nameEn: "Finance Department" },
          { name: "Departamento Administrativo", nameEn: "Administrative Department" },
          { name: "Secretaria Geral", nameEn: "General Secretariat" },
        ],
      },
      {
        name: "Gabinete de Comunicação",
        nameEn: "Communications Office",
        acronym: "GC",
      },
      {
        name: "Núcleo de Responsabilidade Social",
        nameEn: "Social Responsibility Unit",
        acronym: "NRS",
      },
    ],
  },
  {
    id: "admin4",
    slug: "alcides-andrade",
    name: "Alcides Andrade",
    role: "Administrador",
    roleEn: "Board Member",
    isPCA: false,
    initials: "AA",
    departments: [
      {
        name: "Direcção de Negociações",
        nameEn: "Negotiations Directorate",
        acronym: "DNEG",
        subDepartments: [
          { name: "Departamento de Contratos das Concessões", nameEn: "Concession Contracts Department" },
          { name: "Departamento de Negociações", nameEn: "Negotiations Department" },
          { name: "Núcleo de Comercialização", nameEn: "Commercialisation Unit" },
        ],
      },
      {
        name: "Direcção de Economia das Concessões",
        nameEn: "Concessions Economics Directorate",
        acronym: "DEC",
        subDepartments: [
          { name: "Departamento de Estudos Económicos", nameEn: "Economic Studies Department" },
          { name: "Departamento de Auditoria dos Custos Recuperáveis", nameEn: "Recoverable Costs Audit Department" },
          { name: "Departamento de Gestão do Património", nameEn: "Asset Management Department" },
          { name: "Departamento de Homologação dos Custos Recuperáveis", nameEn: "Recoverable Costs Approval Department" },
        ],
      },
      {
        name: "Gabinete de Arquivo e Gestão de Dados",
        nameEn: "Archive and Data Management Office",
        acronym: "GAD",
      },
      {
        name: "Gabinete de Segurança Institucional",
        nameEn: "Institutional Security Office",
        acronym: "GSI",
      },
    ],
  },
];

export const supervisionBodies = [
  { name: "Conselho Fiscal", nameEn: "Fiscal Council" },
  { name: "Conselho Técnico", nameEn: "Technical Council" },
];

export function getBoardMemberBySlug(slug: string): BoardMember | undefined {
  return boardMembers.find((m) => m.slug === slug);
}
