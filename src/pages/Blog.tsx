import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Zap, Calendar, Clock, Tag } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-secondary w-96 h-96 -top-48 -right-48" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-secondary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> Recursos
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-gradient-secondary">Blog</span> & Recursos
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Artículos, guías y casos de uso sobre automatización con IA para negocios locales.
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="section-padding -mt-16">
        <div className="section-container">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card-premium animate-pulse">
                  <div className="h-48 bg-muted rounded-xl mb-4" />
                  <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                  <div className="h-6 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <article className="card-premium group h-full flex flex-col">
                    {post.cover_image_url && (
                      <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="badge-primary text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground mb-4 flex-1">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
                      {post.published_at && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(post.published_at), "d MMM yyyy", { locale: es })}
                        </span>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">Próximamente</h3>
              <p className="text-muted-foreground mb-8">
                Estamos preparando contenido de valor. ¡Vuelve pronto!
              </p>
              <Link to="/contacto">
                <Button className="btn-outline-neon">
                  Recibir novedades
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/10">
        <div className="section-container">
          <div className="card-premium text-center p-12 neon-border max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              ¿Quieres ver la IA en acción?
            </h2>
            <p className="text-muted-foreground mb-8">
              Haz nuestra auditoría gratuita y recibe recomendaciones personalizadas.
            </p>
            <Link to="/auditoria">
              <Button size="lg" className="btn-neon text-lg px-8">
                Auditoría AI gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
