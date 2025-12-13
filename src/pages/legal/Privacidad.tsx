import { PageLayout } from "@/components/layout/PageLayout";

const Privacidad = () => {
  return (
    <PageLayout>
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-display font-bold mb-8">Política de Privacidad</h1>
            
            <div className="prose prose-invert max-w-none space-y-6">
              <p className="text-muted-foreground">
                Última actualización: {new Date().toLocaleDateString("es-ES")}
              </p>

              <h2 className="text-2xl font-display font-semibold mt-8">1. Responsable del tratamiento</h2>
              <p className="text-muted-foreground">
                HydrAI Labs es el responsable del tratamiento de los datos personales recogidos a través de este sitio web.
              </p>

              <h2 className="text-2xl font-display font-semibold mt-8">2. Datos que recopilamos</h2>
              <p className="text-muted-foreground">Recopilamos los siguientes datos:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Nombre y apellidos</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono (opcional)</li>
                <li>Información sobre tu negocio</li>
                <li>Datos de navegación (cookies)</li>
              </ul>

              <h2 className="text-2xl font-display font-semibold mt-8">3. Finalidad del tratamiento</h2>
              <p className="text-muted-foreground">Utilizamos tus datos para:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Responder a tus consultas</li>
                <li>Enviarte información sobre nuestros servicios</li>
                <li>Procesar auditorías y diagnósticos</li>
                <li>Mejorar nuestros servicios</li>
              </ul>

              <h2 className="text-2xl font-display font-semibold mt-8">4. Base legal</h2>
              <p className="text-muted-foreground">
                El tratamiento de tus datos se basa en tu consentimiento expreso al enviar formularios, y en nuestro interés legítimo para el funcionamiento del negocio.
              </p>

              <h2 className="text-2xl font-display font-semibold mt-8">5. Derechos del usuario</h2>
              <p className="text-muted-foreground">Tienes derecho a:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Acceder a tus datos personales</li>
                <li>Rectificar datos inexactos</li>
                <li>Solicitar la supresión de tus datos</li>
                <li>Oponerte al tratamiento</li>
                <li>Portabilidad de datos</li>
              </ul>

              <h2 className="text-2xl font-display font-semibold mt-8">6. Contacto</h2>
              <p className="text-muted-foreground">
                Para ejercer tus derechos o resolver dudas sobre privacidad, contacta con nosotros en: 
                <a href="mailto:privacidad@hydrailabs.com" className="text-primary"> privacidad@hydrailabs.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Privacidad;
