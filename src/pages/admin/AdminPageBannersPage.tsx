import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Pencil, Trash2, Loader2, Image } from 'lucide-react';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';
import { ImageUpload } from '@/components/admin/ImageUpload';

type PageBanner = Tables<'page_banners'>;

export default function AdminPageBannersPage() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editing, setEditing] = useState<PageBanner | null>(null);
  const [deleteItem, setDeleteItem] = useState<PageBanner | null>(null);
  const [formData, setFormData] = useState({
    page_key: '', title_pt: '', title_en: '', subtitle_pt: '', subtitle_en: '', image_url: '', overlay_opacity: 0.6, is_active: true,
  });

  const { data: banners, isLoading } = useQuery({
    queryKey: ['admin-page-banners'],
    queryFn: async () => {
      const { data, error } = await supabase.from('page_banners').select('*').order('page_key');
      if (error) throw error;
      return data as PageBanner[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: TablesInsert<'page_banners'>) => {
      const { error } = await supabase.from('page_banners').insert(data);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-page-banners'] }); toast.success('Banner criado'); handleClose(); },
    onError: (e) => toast.error(`Erro: ${e.message}`),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<PageBanner> }) => {
      const { error } = await supabase.from('page_banners').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-page-banners'] }); toast.success('Banner actualizado'); handleClose(); },
    onError: (e) => toast.error(`Erro: ${e.message}`),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('page_banners').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-page-banners'] }); toast.success('Banner eliminado'); setDeleteItem(null); },
    onError: (e) => toast.error(`Erro: ${e.message}`),
  });

  const handleClose = () => { setIsDialogOpen(false); setEditing(null); setFormData({ page_key: '', title_pt: '', title_en: '', subtitle_pt: '', subtitle_en: '', image_url: '', overlay_opacity: 0.6, is_active: true }); };

  const handleEdit = (b: PageBanner) => {
    setEditing(b);
    setFormData({ page_key: b.page_key, title_pt: b.title_pt || '', title_en: b.title_en || '', subtitle_pt: b.subtitle_pt || '', subtitle_en: b.subtitle_en || '', image_url: b.image_url || '', overlay_opacity: Number(b.overlay_opacity) || 0.6, is_active: b.is_active });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.page_key) { toast.error('Page key é obrigatório'); return; }
    const submitData = { page_key: formData.page_key, title_pt: formData.title_pt || null, title_en: formData.title_en || null, subtitle_pt: formData.subtitle_pt || null, subtitle_en: formData.subtitle_en || null, image_url: formData.image_url || null, overlay_opacity: formData.overlay_opacity, is_active: formData.is_active };
    if (editing) { updateMutation.mutate({ id: editing.id, data: submitData }); } else { createMutation.mutate(submitData); }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild><Link to="/admin"><ArrowLeft className="h-5 w-5" /></Link></Button>
            <Image className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Banners de Página</span>
          </div>
          <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
            <a href="/" target="_blank" rel="noopener noreferrer">Ver Website ↗</a>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div><CardTitle>Page Banners</CardTitle><CardDescription>Gerir imagens de cabeçalho, títulos e subtítulos de cada página</CardDescription></div>
              <Button onClick={() => { handleClose(); setIsDialogOpen(true); }}><Plus className="h-4 w-4 mr-2" />Novo Banner</Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader><TableRow><TableHead>Página</TableHead><TableHead>Título PT</TableHead><TableHead>Imagem</TableHead><TableHead>Opacidade</TableHead><TableHead>Estado</TableHead><TableHead className="text-right">Acções</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {banners?.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Nenhum banner registado</TableCell></TableRow>
                    ) : banners?.map(b => (
                      <TableRow key={b.id}>
                        <TableCell className="font-medium">{b.page_key}</TableCell>
                        <TableCell>{b.title_pt || '—'}</TableCell>
                        <TableCell>{b.image_url ? <img src={b.image_url} alt="" className="h-8 w-16 object-cover rounded" /> : '—'}</TableCell>
                        <TableCell>{Number(b.overlay_opacity).toFixed(1)}</TableCell>
                        <TableCell><Badge variant={b.is_active ? 'default' : 'secondary'}>{b.is_active ? 'Activo' : 'Inactivo'}</Badge></TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(b)}><Pencil className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => setDeleteItem(b)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            <div className="mt-4 text-sm text-muted-foreground">{banners?.length || 0} banner(s)</div>
          </CardContent>
        </Card>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader><DialogTitle>{editing ? 'Editar Banner' : 'Novo Banner'}</DialogTitle><DialogDescription>Configure o banner de cabeçalho da página</DialogDescription></DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2"><Label>Page Key *</Label><Input value={formData.page_key} onChange={e => setFormData({...formData, page_key: e.target.value})} placeholder="Ex: about, production, faq" required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Título PT</Label><Input value={formData.title_pt} onChange={e => setFormData({...formData, title_pt: e.target.value})} /></div>
                <div className="space-y-2"><Label>Título EN</Label><Input value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Subtítulo PT</Label><Input value={formData.subtitle_pt} onChange={e => setFormData({...formData, subtitle_pt: e.target.value})} /></div>
                <div className="space-y-2"><Label>Subtítulo EN</Label><Input value={formData.subtitle_en} onChange={e => setFormData({...formData, subtitle_en: e.target.value})} /></div>
              </div>
              <ImageUpload value={formData.image_url} onChange={(url) => setFormData({...formData, image_url: url})} folder="page-banners" label="Imagem do Banner" />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Opacidade do Overlay ({formData.overlay_opacity})</Label><Input type="range" min="0" max="1" step="0.1" value={formData.overlay_opacity} onChange={e => setFormData({...formData, overlay_opacity: Number(e.target.value)})} /></div>
                <div className="flex items-end gap-2 pb-1"><Switch checked={formData.is_active} onCheckedChange={v => setFormData({...formData, is_active: v})} /><Label>Activo</Label></div>
              </div>
            </div>
            <DialogFooter><Button type="button" variant="outline" onClick={handleClose}>Cancelar</Button><Button type="submit" disabled={isSaving}>{isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}{editing ? 'Guardar' : 'Criar'}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Eliminar Banner</AlertDialogTitle><AlertDialogDescription>Eliminar o banner da página "{deleteItem?.page_key}"?</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => deleteItem && deleteMutation.mutate(deleteItem.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">{deleteMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}Eliminar</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
