import { PageLayout } from "@/components/layout/PageLayout";

const Cookies = () => {
  return (
    <PageLayout>
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-display font-bold mb-8">Política de Cookies</h1>
            
            <div className="prose prose-invert max-w-none space-y-6">
              <p className="text-muted-foreground">
                Última actualización: {new Date().toLocaleDateString("es-ES")}
              </p>

              <h2 className="text-2xl font-display font-semibold mt-8">¿Qué son las cookies?</h2>
              <p className="text-muted-foreground">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Se utilizan para recordar tus preferencias y mejorar tu experiencia.
              </p>

              <h2 className="text-2xl font-display font-semibold mt-8">Tipos de cookies que utilizamos</h2>

              <h3 className="text-xl font-semibold mt-6">Cookies técnicas (necesarias)</h3>
              <p className="text-muted-foreground">
                Son esenciales para el funcionamiento del sitio. Permiten la navegación y el uso de funciones básicas. No pueden desactivarse.
              </p>

              <h3 className="text-xl font-semibold mt-6">Cookies de preferencias</h3>
              <p className="text-muted-foreground">
                Permiten recordar información como tu idioma preferido o la región desde la que accedes.
              </p>

              <h3 className="text-xl font-semibold mt-6">Cookies analíticas</h3>
              <p className="text-muted-foreground">
                Nos ayudan a entender cómo los visitantes interactúan con el sitio, recopilando información de forma anónima.
              </p>

              <h2 className="text-2xl font-display font-semibold mt-8">Cookies de terceros</h2>
              <p className="text-muted-foreground">
                Utilizamos servicios de terceros que pueden establecer sus propias cookies:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Google Analytics (análisis de tráfico)</li>
                <li>Servicios de autenticación y base de datos</li>
              </ul>

              <h2 className="text-2xl font-display font-semibold mt-8">Gestión de cookies</h2>
              <p className="text-muted-foreground">
                Puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que esto puede afectar al funcionamiento del sitio.
              </p>
              <p className="text-muted-foreground mt-4">
                Instrucciones por navegador:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener" className="text-primary">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-" target="_blank" rel="noopener" className="text-primary">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener" className="text-primary">Safari</a></li>
                <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener" className="text-primary">Microsoft Edge</a></li>
              </ul>

              <h2 className="text-2xl font-display font-semibold mt-8">Contacto</h2>
              <p className="text-muted-foreground">
                Si tienes preguntas sobre nuestra política de cookies, contacta en: 
                <a href="mailto:privacidad@hydraiservices.com" className="text-primary"> privacidad@hydraiservices.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Cookies;