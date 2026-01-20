import { SEOHead } from "@/components/seo";

const NotFound = () => {
  return (
    <>
      <SEOHead
        title="Página no encontrada | HydrAI Labs"
        description="La página que buscas no existe. Vuelve al inicio para explorar nuestros servicios de automatización con IA."
        noindex={true}
      />
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">¡Ups! Página no encontrada</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Volver al inicio
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
