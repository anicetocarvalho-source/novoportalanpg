import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, Search, Pencil, Trash2, Eye, Loader2, Newspaper } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { toast } from 'sonner';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

export default function AdminNewsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [deleteArticle, setDeleteArticle] = useState<NewsArticle | null>(null);

  // Fetch all news articles
  const { data: articles, isLoading } = useQuery({
    queryKey: ['admin-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as NewsArticle[];
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('news_articles').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      toast.success('Notícia eliminada com sucesso');
      setDeleteArticle(null);
    },
    onError: (error) => {
      toast.error(`Erro ao eliminar: ${error.message}`);
    },
  });

  const filteredArticles = articles?.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500 text-white">Publicado</Badge>;
      case 'draft':
        return <Badge variant="secondary">Rascunho</Badge>;
      case 'archived':
        return <Badge variant="outline">Arquivado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <Newspaper className="h-6 w-6 text-blue-500" />
          <span className="font-semibold text-lg">Gestão de Notícias</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Notícias</CardTitle>
                <CardDescription>Gerir artigos e comunicados de imprensa</CardDescription>
              </div>
              <Button asChild>
                <Link to="/admin/news/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Notícia
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar notícias..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Table */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Acções</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredArticles?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          {search ? 'Nenhuma notícia encontrada.' : 'Ainda não existem notícias. Crie a primeira!'}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredArticles?.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell className="font-medium">{article.title}</TableCell>
                          <TableCell>{getStatusBadge(article.status)}</TableCell>
                          <TableCell className="capitalize">{article.category}</TableCell>
                          <TableCell>
                            {format(new Date(article.created_at), "d MMM yyyy", { locale: pt })}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {article.status === 'published' && (
                                <Button variant="ghost" size="icon" asChild>
                                  <Link to={`/news/${article.slug}`} target="_blank">
                                    <Eye className="h-4 w-4" />
                                  </Link>
                                </Button>
                              )}
                              <Button variant="ghost" size="icon" asChild>
                                <Link to={`/admin/news/${article.id}`}>
                                  <Pencil className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeleteArticle(article)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteArticle} onOpenChange={() => setDeleteArticle(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Notícia</AlertDialogTitle>
            <AlertDialogDescription>
              Tem a certeza que deseja eliminar "{deleteArticle?.title}"?
              Esta acção não pode ser revertida.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteArticle && deleteMutation.mutate(deleteArticle.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
