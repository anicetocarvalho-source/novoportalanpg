import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useDashboardCounts } from '@/hooks/useCMSData';
import {
  LayoutDashboard,
  Newspaper,
  FileText,
  MapPin,
  BarChart3,
  Briefcase,
  FolderOpen,
  Users,
  History,
  LogOut,
  Settings,
  BookOpen,
  LayoutGrid,
  Menu,
  UserCheck,
  HelpCircle,
  Image,
  Clock,
} from 'lucide-react';

const modules = [
  {
    title: 'Notícias',
    description: 'Gerir artigos e comunicados',
    icon: Newspaper,
    href: '/admin/news',
    permission: 'content',
    color: 'bg-blue-500',
  },
  {
    title: 'Páginas CMS',
    description: 'Editar páginas do website',
    icon: FileText,
    href: '/admin/pages',
    permission: 'content',
    color: 'bg-purple-500',
  },
  {
    title: 'Blocos de Conteúdo',
    description: 'Secções editáveis (Hero, Stats, etc.)',
    icon: LayoutGrid,
    href: '/admin/content-blocks',
    permission: 'content',
    color: 'bg-indigo-500',
  },
  {
    title: 'Banners de Página',
    description: 'Imagens e títulos de cabeçalho',
    icon: Image,
    href: '/admin/page-banners',
    permission: 'content',
    color: 'bg-pink-500',
  },
  {
    title: 'Menu / Navegação',
    description: 'Estrutura de menus e submenus',
    icon: Menu,
    href: '/admin/menu-items',
    permission: 'content',
    color: 'bg-violet-500',
  },
  {
    title: 'Conselho de Administração',
    description: 'Membros, biografias e mensagens',
    icon: UserCheck,
    href: '/admin/board-members',
    permission: 'content',
    color: 'bg-rose-500',
  },
  {
    title: 'FAQ',
    description: 'Perguntas frequentes bilingues',
    icon: HelpCircle,
    href: '/admin/faq',
    permission: 'content',
    color: 'bg-cyan-500',
  },
  {
    title: 'Linha do Tempo',
    description: 'Marcos históricos da ANPG',
    icon: Clock,
    href: '/admin/history-events',
    permission: 'content',
    color: 'bg-amber-500',
  },
  {
    title: 'Blocos Petrolíferos',
    description: 'Gestão de blocos e concessões',
    icon: MapPin,
    href: '/admin/blocks',
    permission: 'operations',
    color: 'bg-orange-500',
  },
  {
    title: 'Estatísticas de Produção',
    description: 'Dados de produção mensal',
    icon: BarChart3,
    href: '/admin/production',
    permission: 'operations',
    color: 'bg-green-500',
  },
  {
    title: 'Expressões de Interesse',
    description: 'Gerir submissões de investidores',
    icon: Briefcase,
    href: '/admin/eoi',
    permission: 'investors',
    color: 'bg-amber-500',
  },
  {
    title: 'Documentos',
    description: 'Biblioteca de documentos',
    icon: FolderOpen,
    href: '/admin/documents',
    permission: 'investors',
    color: 'bg-teal-500',
  },
  {
    title: 'Utilizadores',
    description: 'Gestão de acessos e roles',
    icon: Users,
    href: '/admin/users',
    permission: 'admin',
    color: 'bg-red-500',
  },
  {
    title: 'Audit Logs',
    description: 'Histórico de alterações',
    icon: History,
    href: '/admin/audit',
    permission: 'admin',
    color: 'bg-gray-500',
  },
  {
    title: 'Configurações',
    description: 'Logotipos, contactos e rodapé',
    icon: Settings,
    href: '/admin/settings',
    permission: 'admin',
    color: 'bg-slate-600',
  },
  {
    title: 'Base de Conhecimento',
    description: 'Gerir conteúdo do chatbot SOBA',
    icon: BookOpen,
    href: '/admin/knowledge-base',
    permission: 'content',
    color: 'bg-emerald-500',
  },
];

function getRoleBadge(role: string) {
  const roleLabels: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
    admin: { label: 'Administrador', variant: 'destructive' },
    editor_comunicacao: { label: 'Editor Comunicação', variant: 'default' },
    editor_tecnico: { label: 'Editor Técnico', variant: 'secondary' },
    gestor_investidores: { label: 'Gestor Investidores', variant: 'outline' },
    viewer: { label: 'Visualizador', variant: 'outline' },
  };
  return roleLabels[role] || { label: role, variant: 'outline' as const };
}

export default function AdminDashboard() {
  const { profile, roles, signOut, isAdmin, canManageContent, canManageOperations, canManageInvestors } = useAuth();
  const { data: counts } = useDashboardCounts();
  const hasPermission = (permission: string) => {
    switch (permission) {
      case 'admin':
        return isAdmin;
      case 'content':
        return canManageContent;
      case 'operations':
        return canManageOperations;
      case 'investors':
        return canManageInvestors;
      default:
        return true;
    }
  };

  const availableModules = modules.filter((m) => hasPermission(m.permission));

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Backoffice ANPG</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{profile?.full_name}</p>
              <div className="flex gap-1 justify-end">
                {roles.map((r, i) => {
                  const { label, variant } = getRoleBadge(r.role);
                  return (
                    <Badge key={i} variant={variant} className="text-xs">
                      {label}
                    </Badge>
                  );
                })}
              </div>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin/settings">
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Bem-vindo, {profile?.full_name?.split(' ')[0]}</h1>
          <p className="text-muted-foreground mt-1">
            Seleccione um módulo para começar a gerir o conteúdo.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{counts?.newsCount ?? '--'}</div>
              <p className="text-sm text-muted-foreground">Notícias publicadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{counts?.blocksCount ?? '--'}</div>
              <p className="text-sm text-muted-foreground">Blocos activos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{counts?.eoisCount ?? '--'}</div>
              <p className="text-sm text-muted-foreground">EOIs pendentes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{counts?.docsCount ?? '--'}</div>
              <p className="text-sm text-muted-foreground">Documentos</p>
            </CardContent>
          </Card>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {availableModules.map((module) => (
            <Link key={module.href} to={module.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${module.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* Back to Website */}
        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link to="/">← Voltar ao Website</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
