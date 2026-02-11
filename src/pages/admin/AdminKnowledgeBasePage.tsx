import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Pencil, Trash2, Bot, Search, BookOpen } from "lucide-react";
import { toast } from "sonner";

interface KnowledgeEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  language: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const CATEGORIES = [
  { value: "general", label: "Geral" },
  { value: "licensing", label: "Licenciamento" },
  { value: "production", label: "Produção" },
  { value: "investment", label: "Investimento" },
  { value: "regulation", label: "Regulação" },
  { value: "tenders", label: "Concursos" },
  { value: "contacts", label: "Contactos" },
  { value: "faq", label: "FAQ" },
];

export default function AdminKnowledgeBasePage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<KnowledgeEntry | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [language, setLanguage] = useState("pt");
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("knowledge_base")
      .select("*")
      .order("category")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar base de conhecimento");
      console.error(error);
    } else {
      setEntries((data as KnowledgeEntry[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("general");
    setLanguage("pt");
    setIsActive(true);
    setEditingEntry(null);
  };

  const openEdit = (entry: KnowledgeEntry) => {
    setEditingEntry(entry);
    setTitle(entry.title);
    setContent(entry.content);
    setCategory(entry.category);
    setLanguage(entry.language);
    setIsActive(entry.is_active);
    setDialogOpen(true);
  };

  const openNew = () => {
    resetForm();
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Título e conteúdo são obrigatórios");
      return;
    }
    setSaving(true);

    if (editingEntry) {
      const { error } = await supabase
        .from("knowledge_base")
        .update({ title, content, category, language, is_active: isActive })
        .eq("id", editingEntry.id);

      if (error) {
        toast.error("Erro ao atualizar");
        console.error(error);
      } else {
        toast.success("Entrada atualizada com sucesso");
      }
    } else {
      const { error } = await supabase
        .from("knowledge_base")
        .insert({
          title,
          content,
          category,
          language,
          is_active: isActive,
          created_by: user?.id,
        });

      if (error) {
        toast.error("Erro ao criar entrada");
        console.error(error);
      } else {
        toast.success("Entrada criada com sucesso");
      }
    }

    setSaving(false);
    setDialogOpen(false);
    resetForm();
    fetchEntries();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem a certeza que deseja eliminar esta entrada?")) return;

    const { error } = await supabase
      .from("knowledge_base")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Erro ao eliminar");
      console.error(error);
    } else {
      toast.success("Entrada eliminada");
      fetchEntries();
    }
  };

  const filtered = entries.filter((e) => {
    const matchSearch =
      !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.content.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === "all" || e.category === filterCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex items-center gap-3 mb-6">
          <Bot className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Base de Conhecimento – SOBA</h1>
            <p className="text-sm text-muted-foreground">
              Gerir os conteúdos que alimentam o assistente virtual SOBA
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNew}>
                <Plus className="h-4 w-4 mr-1" /> Nova Entrada
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingEntry ? "Editar Entrada" : "Nova Entrada"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Título *</label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Processo de Licenciamento" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Conteúdo *</label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Descreva o conteúdo que o SOBA deve saber sobre este tema..."
                    rows={10}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Categoria</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Idioma</label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt">Português</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="both">Ambos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded border-input"
                  />
                  <label htmlFor="is_active" className="text-sm text-foreground">Ativo (visível para o chatbot)</label>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? "A guardar..." : editingEntry ? "Atualizar" : "Criar"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Card className="hover:shadow-none hover:translate-y-0">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{entries.length}</p>
              <p className="text-xs text-muted-foreground">Total de Entradas</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-none hover:translate-y-0">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{entries.filter((e) => e.is_active).length}</p>
              <p className="text-xs text-muted-foreground">Ativas</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-none hover:translate-y-0">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                {new Set(entries.map((e) => e.category)).size}
              </p>
              <p className="text-xs text-muted-foreground">Categorias</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-none hover:translate-y-0">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                {entries.filter((e) => e.language === "both").length}
              </p>
              <p className="text-xs text-muted-foreground">Bilingue</p>
            </CardContent>
          </Card>
        </div>

        {/* Entries list */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">A carregar...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhuma entrada encontrada</p>
            <Button onClick={openNew} variant="outline" className="mt-3">
              <Plus className="h-4 w-4 mr-1" /> Adicionar primeira entrada
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((entry) => (
              <Card key={entry.id} className="hover:shadow-none hover:translate-y-0">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground truncate">{entry.title}</h3>
                        <Badge variant={entry.is_active ? "default" : "secondary"} className="text-[10px]">
                          {entry.is_active ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{entry.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-[10px]">
                          {CATEGORIES.find((c) => c.value === entry.category)?.label || entry.category}
                        </Badge>
                        <Badge variant="outline" className="text-[10px]">
                          {entry.language === "both" ? "PT/EN" : entry.language.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(entry)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(entry.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
