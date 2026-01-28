import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  Pencil,
  Trash2,
  MapPin,
  Filter,
  Loader2,
} from 'lucide-react';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type PetroleumBlock = Tables<'petroleum_blocks'>;

const BASINS = ['Kwanza', 'Benguela', 'Namibe', 'Congo', 'Cabinda'];
const STATUSES = [
  { value: 'available', label: 'Disponível', color: 'bg-green-500' },
  { value: 'licensed', label: 'Licenciado', color: 'bg-blue-500' },
  { value: 'exploration', label: 'Exploração', color: 'bg-amber-500' },
  { value: 'production', label: 'Produção', color: 'bg-purple-500' },
  { value: 'relinquished', label: 'Devolvido', color: 'bg-gray-500' },
];

const emptyBlock: Partial<TablesInsert<'petroleum_blocks'>> = {
  block_name: '',
  basin: '',
  operator: '',
  status: 'available',
  area_km2: undefined,
  water_depth_m: undefined,
  description: '',
};

export default function AdminBlocksPage() {
  const { signOut } = useAuth();
  const queryClient = useQueryClient();
  
  const [search, setSearch] = useState('');
  const [filterBasin, setFilterBasin] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<PetroleumBlock | null>(null);
  const [formData, setFormData] = useState<Partial<TablesInsert<'petroleum_blocks'>>>(emptyBlock);
  
  const [deleteBlock, setDeleteBlock] = useState<PetroleumBlock | null>(null);

  // Fetch blocks
  const { data: blocks, isLoading } = useQuery({
    queryKey: ['admin-blocks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('petroleum_blocks')
        .select('*')
        .order('block_name');
      
      if (error) throw error;
      return data as PetroleumBlock[];
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: TablesInsert<'petroleum_blocks'>) => {
      const { error } = await supabase.from('petroleum_blocks').insert(data);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blocks'] });
      toast.success('Bloco criado com sucesso');
      handleCloseDialog();
    },
    onError: (error) => {
      toast.error(`Erro ao criar bloco: ${error.message}`);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TablesUpdate<'petroleum_blocks'> }) => {
      const { error } = await supabase.from('petroleum_blocks').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blocks'] });
      toast.success('Bloco actualizado com sucesso');
      handleCloseDialog();
    },
    onError: (error) => {
      toast.error(`Erro ao actualizar bloco: ${error.message}`);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('petroleum_blocks').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blocks'] });
      toast.success('Bloco eliminado com sucesso');
      setDeleteBlock(null);
    },
    onError: (error) => {
      toast.error(`Erro ao eliminar bloco: ${error.message}`);
    },
  });

  const handleOpenCreate = () => {
    setEditingBlock(null);
    setFormData(emptyBlock);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (block: PetroleumBlock) => {
    setEditingBlock(block);
    setFormData({
      block_name: block.block_name,
      basin: block.basin || '',
      operator: block.operator || '',
      status: block.status || 'available',
      area_km2: block.area_km2 ? Number(block.area_km2) : undefined,
      water_depth_m: block.water_depth_m || undefined,
      description: block.description || '',
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingBlock(null);
    setFormData(emptyBlock);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.block_name) {
      toast.error('Nome do bloco é obrigatório');
      return;
    }

    const submitData: TablesInsert<'petroleum_blocks'> = {
      block_name: formData.block_name,
      basin: formData.basin || null,
      operator: formData.operator || null,
      status: formData.status || 'available',
      area_km2: formData.area_km2 || null,
      water_depth_m: formData.water_depth_m || null,
      description: formData.description || null,
    };

    if (editingBlock) {
      updateMutation.mutate({ id: editingBlock.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  // Filter blocks
  const filteredBlocks = blocks?.filter((block) => {
    const matchesSearch =
      block.block_name.toLowerCase().includes(search.toLowerCase()) ||
      block.operator?.toLowerCase().includes(search.toLowerCase());
    const matchesBasin = filterBasin === 'all' || block.basin === filterBasin;
    const matchesStatus = filterStatus === 'all' || block.status === filterStatus;
    return matchesSearch && matchesBasin && matchesStatus;
  });

  const getStatusBadge = (status: string | null) => {
    const statusConfig = STATUSES.find((s) => s.value === status) || STATUSES[0];
    return (
      <Badge variant="secondary" className={`${statusConfig.color} text-white`}>
        {statusConfig.label}
      </Badge>
    );
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <MapPin className="h-6 w-6 text-orange-500" />
            <span className="font-semibold text-lg">Blocos Petrolíferos</span>
          </div>
          <Button variant="ghost" onClick={signOut}>
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Gestão de Blocos</CardTitle>
                <CardDescription>
                  Gerir blocos petrolíferos, concessões e operadores
                </CardDescription>
              </div>
              <Button onClick={handleOpenCreate}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Bloco
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar por nome ou operador..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterBasin} onValueChange={setFilterBasin}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Bacia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Bacias</SelectItem>
                  {BASINS.map((basin) => (
                    <SelectItem key={basin} value={basin}>
                      {basin}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Estados</SelectItem>
                  {STATUSES.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                      <TableHead>Nome</TableHead>
                      <TableHead>Bacia</TableHead>
                      <TableHead>Operador</TableHead>
                      <TableHead>Área (km²)</TableHead>
                      <TableHead>Prof. Água (m)</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acções</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBlocks?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Nenhum bloco encontrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBlocks?.map((block) => (
                        <TableRow key={block.id}>
                          <TableCell className="font-medium">{block.block_name}</TableCell>
                          <TableCell>{block.basin || '—'}</TableCell>
                          <TableCell>{block.operator || '—'}</TableCell>
                          <TableCell>
                            {block.area_km2 ? Number(block.area_km2).toLocaleString() : '—'}
                          </TableCell>
                          <TableCell>
                            {block.water_depth_m ? block.water_depth_m.toLocaleString() : '—'}
                          </TableCell>
                          <TableCell>{getStatusBadge(block.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleOpenEdit(block)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeleteBlock(block)}
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

            {/* Stats */}
            <div className="mt-4 text-sm text-muted-foreground">
              {filteredBlocks?.length || 0} bloco(s) encontrado(s)
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingBlock ? 'Editar Bloco' : 'Criar Novo Bloco'}
            </DialogTitle>
            <DialogDescription>
              {editingBlock
                ? 'Actualizar informações do bloco petrolífero'
                : 'Preencha os dados do novo bloco petrolífero'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="block_name">Nome do Bloco *</Label>
                  <Input
                    id="block_name"
                    value={formData.block_name || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, block_name: e.target.value })
                    }
                    placeholder="Ex: Bloco 15"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="basin">Bacia</Label>
                  <Select
                    value={formData.basin || ''}
                    onValueChange={(value) => setFormData({ ...formData, basin: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar bacia" />
                    </SelectTrigger>
                    <SelectContent>
                      {BASINS.map((basin) => (
                        <SelectItem key={basin} value={basin}>
                          {basin}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="operator">Operador</Label>
                  <Input
                    id="operator"
                    value={formData.operator || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, operator: e.target.value })
                    }
                    placeholder="Ex: TotalEnergies"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select
                    value={formData.status || 'available'}
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="area_km2">Área (km²)</Label>
                  <Input
                    id="area_km2"
                    type="number"
                    value={formData.area_km2 || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        area_km2: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    placeholder="Ex: 5000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="water_depth_m">Profundidade da Água (m)</Label>
                  <Input
                    id="water_depth_m"
                    type="number"
                    value={formData.water_depth_m || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        water_depth_m: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    placeholder="Ex: 1500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Informações adicionais sobre o bloco..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingBlock ? 'Guardar Alterações' : 'Criar Bloco'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteBlock} onOpenChange={() => setDeleteBlock(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Bloco</AlertDialogTitle>
            <AlertDialogDescription>
              Tem a certeza que deseja eliminar o bloco "{deleteBlock?.block_name}"? Esta acção não pode ser revertida.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteBlock && deleteMutation.mutate(deleteBlock.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Eliminar'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
