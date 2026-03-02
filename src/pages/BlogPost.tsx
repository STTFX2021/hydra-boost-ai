import { useParams, Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug!)
        .eq("published", true)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <PageLayout>
        <div className="section-container section-padding text-center">
          <div className="animate-pulse space-y-4 max-w-3xl mx-auto">
            <div className="h-8 bg-muted rounded w-3/4 mx-auto" />
            <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
            <div className="h-64 bg-muted rounded-2xl" />
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !post) {
    return (
      <PageLayout>
        <div className="section-container section-padding text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Artículo no encontrado</h1>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al blog
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <>
      <SEOHead
        title={`${post.title} | Blog HydrAI Labs`}
        description={post.excerpt || `Lee ${post.title} en el blog de HydrAI Labs`}
        canonical={`/blog/${post.slug}`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />

      <PageLayout>
        <article className="section-container section-padding max-w-3xl mx-auto">
          {/* Back link */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-8">
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {post.published_at && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.published_at).toLocaleDateString("es-ES")}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />5 min lectura
              </span>
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="badge-primary text-xs">{tag}</span>
                  ))}
                </div>
              )}
              <button
                onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                className="flex items-center gap-1 hover:text-foreground transition"
                aria-label="Compartir artículo"
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
                width={800}
                height={400}
                loading="eager"
                decoding="async"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
          </div>

          {/* CTA */}
          <div className="mt-16 card-premium neon-border text-center p-8">
            <h2 className="text-2xl font-display font-bold mb-3">¿Quieres automatizar tu negocio?</h2>
            <p className="text-muted-foreground mb-6">
              Agenda una auditoría gratuita y descubre cómo la IA puede transformar tu empresa.
            </p>
            <Link to="/auditoria-gratis">
              <Button className="btn-neon btn-depth">
                Solicitar Auditoría Gratuita
              </Button>
            </Link>
          </div>
        </article>
      </PageLayout>
    </>
  );
};

export default BlogPost;
