import { PageLayout } from "@/components/layout/PageLayout";

const Terminos = () => {
  return (
    <PageLayout>
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-display font-bold mb-8">Términos y Condiciones</h1>
            
            <div className="prose prose-invert max-w-none space-y-6">
              <p className="text-muted-foreground">
                Última actualización: {new Date().toLocaleDateString("es-ES")}
              </p>

              <h2 className="text-2xl font-display font-semibold mt-8">1. Aceptación de los términos</h2>
              <p className="text-muted-foreground">
                Al acceder y utilizar este sitio web, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguna parte, no debes utilizar este sitio.
              </p>

              <h2 className="text-2xl font-display font-semibold mt-8">2. Servicios</h2>
              <p className="text-muted-foreground">
                HydrAI Labs ofrece servicios de automatización con inteligencia artificial para negocios locales. Los detalles específicos de cada servicio se acuerdan individualmente con cada cliente.
              </p>

              <h2 className="text-2xl font-display font-semibold mt-8">3. Uso del sitio</h2>
              <p className="text-muted-foreground">Te comprometes a:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>No utilizar el sitio para fines ilegales</li>
                <li>No intentar acceder a áreas restringidas</li>
                <li>Proporcionar información veraz en los formularios</li>
                <li>No realizar actividades que puedan dañar el sitio</li>
              </ul>

              <h2 className="text-2xl font-display font-semibold mt-8">4. Propiedad intelectual</h2>
              <p className="text-muted-foreground">
                Todo el contenido de este sitio (textos, imágenes, logos, código) es propiedad de HydrAI Labs o se utiliza con licencia. Queda prohibida su reproducción sin autorización.
              </p>

              <h2 className="text-2xl font-display font-semibold mt-8">5. Limitación de responsabilidad</h2>
              <p className="text-muted-foreground">
                HydrAI Labs no se hace responsable de daños directos o indirectos derivados del uso de este sitio o de la imposibilidad de usarlo.
              </p>

              <h2 className="text-2xl font-display font-semibold mt-8">6. Modificaciones</h2>
              <p className="text-muted-foreground">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entran en vigor desde su publicación en el sitio.
              </p>

              <h2 className="text-2xl font-display font-semibold mt-8">7. Ley aplicable</h2>
              <p className="text-muted-foreground">
                Estos términos se rigen por la legislación española. Para cualquier disputa, serán competentes los juzgados y tribunales de España.
              </p>

              <h2 className="text-2xl font-display font-semibold mt-8">8. Contacto</h2>
              <p className="text-muted-foreground">
                Para cualquier consulta sobre estos términos, contacta en: 
                <a href="mailto:legal@hydrailabs.com" className="text-primary"> legal@hydrailabs.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Terminos;