import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";

const ChatbotWhatsappRestaurante = () => (
  <PageLayout>
    <SEOHead
      title="Cómo un Restaurante en Madrid Redujo los No-Shows un 40% con un Chatbot de WhatsApp"
      description="Un restaurante de cocina mediterránea en Madrid perdía 3-4 mesas por servicio. Con un chatbot de WhatsApp redujo las ausencias un 40% en 30 días."
      canonical="/blog/chatbot-whatsapp-restaurante"
      ogType="article"
      publishedTime="2026-02-28"
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Cómo un Restaurante en Madrid Redujo los No-Shows un 40% con un Chatbot de WhatsApp",
        datePublished: "2026-02-28",
        author: { "@type": "Organization", name: "HydrAI Labs" },
        publisher: { "@type": "Organization", name: "HydrAI Labs" }
      })}</script>
    </Helmet>
    <BreadcrumbSchema items={[
      { name: "Inicio", url: "/" }, { name: "Blog", url: "/blog" },
      { name: "Chatbot WhatsApp Restaurante", url: "/blog/chatbot-whatsapp-restaurante" }
    ]} />

    <article className="section-padding">
      <div className="section-container max-w-3xl mx-auto">
        <Link to="/blog" className="text-primary text-sm flex items-center gap-1 mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Volver al blog
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-success/20 text-success">Casos de Éxito</span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> 5 min</span>
          <span className="text-xs text-muted-foreground">28 febrero 2026</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-8">
          Cómo un Restaurante en Madrid Redujo los No-Shows un 40% con un Chatbot de WhatsApp
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>Los no-shows son uno de los mayores problemas de los restaurantes en España. Una mesa reservada que no aparece es dinero directamente perdido: el personal está, la comida está preparada, pero los ingresos no llegan.</p>
          <p>Un restaurante de cocina mediterránea en el centro de Madrid nos contactó con exactamente este problema. Perdían entre 3 y 4 mesas por servicio, especialmente en cenas de fin de semana. Con 40 mesas de capacidad, eso significa que el 10% de su capacidad se evaporaba cada noche.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">El problema: reservas por teléfono sin seguimiento</h2>
          <p>El restaurante gestionaba todas las reservas por teléfono y anotación manual. Sin recordatorios automáticos, sin confirmación por escrito, sin sistema de cancelación fácil para el cliente.</p>
          <p>El resultado era predecible: clientes que reservaban con días de antelación y simplemente se olvidaban, o que cancelaban pero no avisaban porque llamar les parecía un trámite.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">La solución: chatbot de WhatsApp con recordatorios</h2>
          <p>Implementamos un chatbot de WhatsApp Business que gestionaba el flujo completo de reservas:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>El cliente escribe por WhatsApp para reservar</li>
            <li>El chatbot confirma disponibilidad en tiempo real</li>
            <li>Solicita nombre, número de comensales y alergias</li>
            <li>Envía confirmación escrita con los datos</li>
            <li>Manda recordatorio 24 horas antes</li>
            <li>Manda segundo recordatorio 2 horas antes con opción de cancelar fácilmente</li>
          </ol>
          <p>La clave estaba en el segundo recordatorio: dar al cliente una forma fácil de cancelar si no puede venir. Paradójicamente, facilitarles la cancelación reduce las ausencias porque los que no pueden venir avisan en lugar de simplemente no aparecer.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Los resultados en 30 días</h2>
          <p>Los primeros resultados llegaron en la primera semana. Al finalizar el primer mes completo:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>No-shows reducidos del 10% al 6% de las reservas</li>
            <li>3 mesas recuperadas por servicio de media</li>
            <li>Ahorro mensual estimado de 2.400€ en ingresos recuperados</li>
            <li>El 78% de los clientes prefirió reservar por WhatsApp al teléfono</li>
          </ul>
          <p>El restaurante también detectó un efecto secundario positivo: al tener las reservas por escrito en WhatsApp, podían reorganizar mesas con más anticipación cuando llegaban cancelaciones de último momento.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">¿Cuánto cuesta implementar esto?</h2>
          <p>El chatbot de reservas para este restaurante tuvo un coste de implementación de 295€. El retorno de inversión llegó en la primera semana de uso, con las 3 mesas recuperadas por servicio.</p>
        </div>

        <div className="card-premium text-center p-10 neon-border mt-12">
          <h2 className="text-2xl font-display font-bold mb-3">¿Tienes un restaurante y quieres reducir los no-shows?</h2>
          <p className="text-muted-foreground mb-6">Solicita una auditoría gratuita y te mostramos exactamente cómo implementarlo.</p>
          <Link to="/auditoria?vertical=restaurante">
            <Button size="lg" className="btn-neon text-lg px-8">
              Solicitar auditoría gratuita <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  </PageLayout>
);

export default ChatbotWhatsappRestaurante;
