import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

const AdminBlog = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", tags: "" });

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const createPost = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("blog_posts").insert({
        title: form.title, slug: form.slug, excerpt: form.excerpt, content: form.content,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean), published: false,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      setCreating(false);
      setForm({ title: "", slug: "", excerpt: "", content: "", tags: "" });
      toast.success("Post creado");
    },
  });

  const updatePost = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").update({
        title: form.title, slug: form.slug, excerpt: form.excerpt, content: form.content,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      setEditing(null);
      toast.success("Post actualizado");
    },
  });

  const togglePublish = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { error } = await supabase.from("blog_posts").update({
        published, published_at: published ? new Date().toISOString() : null,
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      toast.success("Estado actualizado");
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      toast.success("Post eliminado");
    },
  });

  const startEdit = (post: any) => {
    setEditing(post.id);
    setForm({
      title: post.title, slug: post.slug, excerpt: post.excerpt || "",
      content: post.content || "", tags: post.tags?.join(", ") || "",
    });
  };

  if (isLoading) return <div className="text-muted-foreground">Cargando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold">Blog CMS</h2>
        <Button onClick={() => setCreating(true)} className="btn-neon" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo post
        </Button>
      </div>

      {(creating || editing) && (
        <div className="card-premium space-y-4">
          <h3 className="font-semibold">{creating ? "Crear post" : "Editar post"}</h3>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Título" className="input-premium" />
          <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug (url)" className="input-premium" />
          <Input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Extracto" className="input-premium" />
          <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Contenido" className="input-premium min-h-[200px]" />
          <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Tags (separados por coma)" className="input-premium" />
          <div className="flex gap-2">
            <Button onClick={() => creating ? createPost.mutate() : updatePost.mutate(editing!)} className="btn-neon">Guardar</Button>
            <Button variant="ghost" onClick={() => { setCreating(false); setEditing(null); }}>Cancelar</Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {posts?.map((post) => (
          <div key={post.id} className="card-premium flex items-center justify-between">
            <div>
              <h4 className="font-semibold">{post.title}</h4>
              <p className="text-sm text-muted-foreground">/{post.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" onClick={() => togglePublish.mutate({ id: post.id, published: !post.published })}>
                {post.published ? <Eye className="w-4 h-4 text-success" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => startEdit(post)}><Edit className="w-4 h-4" /></Button>
              <Button size="sm" variant="ghost" onClick={() => deletePost.mutate(post.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;
