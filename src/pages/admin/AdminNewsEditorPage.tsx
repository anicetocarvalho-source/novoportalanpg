import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Save, Eye, Loader2, Image as ImageIcon } from 'lucide-react';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import RichTextEditor from '@/components/admin/RichTextEditor';

type NewsArticle = Tables<'news_articles'>;

const CATEGORIES = [
  { value: 'geral', label: 'Geral' },
  { value: 'producao', label: 'Produção' },
  { value: 'exploracao', label: 'Exploração' },
  { value: 'licitacao', label: 'Licitação' },
  { value: 'institucional', label: 'Institucional' },
  { value: 'sustentabilidade', label: 'Sustentabilidade' },
];

const STATUSES = [
  { value: 'draft', label: 'Rascunho' },
  { value: 'published', label: 'Publicado' },
  { value: 'archived', label: 'Arquivado' },
];

export default function AdminNewsEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const isNew = !id || id === 'new';

  const [formData, setFormData] = useState<Partial<TablesInsert<'news_articles'>>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'geral',
    status: 'draft',
    featured_image: '',
  });
  const [uploading, setUploading] = useState(false);

  // Fetch article if editing
  const { data: article, isLoading } = useQuery({
    queryKey: ['admin-article', id],
    queryFn: async () => {
      if (isNew) return null;
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data as NewsArticle | null;
    },
    enabled: !isNew,
  });

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt || '',
        content: article.content || '',
        category: article.category || 'geral',
        status: article.status,
        featured_image: article.featured_image || '',
      });
    }
  }, [article]);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `articles/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('news-images')
      .upload(filePath, file);

    if (uploadError) {
      toast.error('Erro ao fazer upload da imagem');
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('news-images')
      .getPublicUrl(filePath);

    setFormData({ ...formData, featured_image: publicUrl });
    setUploading(false);
    toast.success('Imagem carregada com sucesso');
  };

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (data: TablesInsert<'news_articles'> | TablesUpdate<'news_articles'>) => {
      if (isNew) {
        const { error } = await supabase.from('news_articles').insert(data as TablesInsert<'news_articles'>);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('news_articles').update(data).eq('id', id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      toast.success(isNew ? 'Notícia criada com sucesso' : 'Notícia actualizada com sucesso');
      navigate('/admin/news');
    },
    onError: (error) => {
      toast.error(`Erro ao guardar: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug) {
      toast.error('Título e slug são obrigatórios');
      return;
    }

    const submitData: TablesInsert<'news_articles'> = {
      title: formData.title!,
      slug: formData.slug!,
      excerpt: formData.excerpt || null,
      content: formData.content || null,
      category: formData.category || 'geral',
      status: formData.status || 'draft',
      featured_image: formData.featured_image || null,
      author_id: user?.id || null,
      published_at: formData.status === 'published' ? new Date().toISOString() : null,
    };

    saveMutation.mutate(submitData);
  };

  if (!isNew && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin/news">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <span className="font-semibold text-lg">
              {isNew ? 'Nova Notícia' : 'Editar Notícia'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
              <a href="/" target="_blank" rel="noopener noreferrer">Ver Website ↗</a>
            </Button>
            {!isNew && formData.status === 'published' && (
              <Button variant="outline" asChild>
                <Link to={`/news/${formData.slug}`} target="_blank">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver no Site
                </Link>
              </Button>
            )}
            <Button onClick={handleSubmit} disabled={saveMutation.isPending}>
              {saveMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Guardar
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Conteúdo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={formData.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      setFormData({
                        ...formData,
                        title,
                        slug: formData.slug || generateSlug(title),
                      });
                    }}
                    placeholder="Título da notícia"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL) *</Label>
                  <Input
                    id="slug"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="titulo-da-noticia"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerto</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt || ''}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Breve descrição da notícia..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Conteúdo</Label>
                  <RichTextEditor
                    content={formData.content || ''}
                    onChange={(html) => setFormData({ ...formData, content: html })}
                    placeholder="Escreva o conteúdo da notícia..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publicação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select
                    value={formData.status || 'draft'}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select
                    value={formData.category || 'geral'}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Imagem de Destaque</CardTitle>
                <CardDescription>Imagem principal da notícia</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.featured_image ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={formData.featured_image}
                      alt="Featured"
                      className="object-cover w-full h-full"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData({ ...formData, featured_image: '' })}
                    >
                      Remover
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 cursor-pointer hover:border-primary/50 transition-colors">
                    {uploading ? (
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Clique para carregar</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                )}
              </CardContent>
            </Card>
          </div>
        </form>
      </main>
    </div>
  );
}
