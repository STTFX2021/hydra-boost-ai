import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, Tag, Share2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <PageLayout>
        <div className="section-container py-32">
          <div className="max-w-3xl mx-auto animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4" />
            <div className="h-12 bg-muted rounded mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !post) {
    return (
      <PageLayout>
        <div className="section-container py-32 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Artículo no encontrado</h1>
          <p className="text-muted-foreground mb-8">El artículo que buscas no existe o no está publicado.</p>
          <Link to="/blog">
            <Button className="btn-outline-neon">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Volver al blog
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <article className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {/* Back */}
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-8">
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>

            {/* Header */}
            <header className="mb-8">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="badge-primary text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {post.published_at && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(post.published_at), "d MMMM yyyy", { locale: es })}
                  </span>
                )}
                <button
                  onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                  className="flex items-center gap-1 hover:text-foreground transition"
                >
                  <Share2 className="w-4 h-4" />
                  Compartir
                </button>
              </div>
            </header>

            {/* Cover Image */}
            {post.cover_image_url && (
              <div className="rounded-2xl overflow-hidden mb-8">
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br/>") }} />
              ) : (
                <p className="text-muted-foreground">Sin contenido disponible.</p>
              )}
            </div>

            {/* CTA */}
            <div className="mt-16 card-premium neon-border text-center p-8">
              <h3 className="text-xl font-display font-bold mb-2">¿Te ha sido útil?</h3>
              <p className="text-muted-foreground mb-4">
                Descubre cómo la IA puede transformar tu negocio.
              </p>
              <Link to="/auditoria-gratis">
                <Button className="btn-neon">Auditoría AI gratis</Button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default BlogPost;
