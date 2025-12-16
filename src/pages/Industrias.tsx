import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  UtensilsCrossed, Stethoscope, Car, Scissors, Home, Building2,
  ArrowRight, MessageSquare, CheckCircle2, Zap, Globe, Bot, Calendar
} from "lucide-react";

const industries = [
  {
    id: "restaurante",
    icon: UtensilsCrossed,
    title: "Restaurante / Cafetería / Hostelería",
    description: "Automatiza reservas, responde preguntas frecuentes y gestiona la lista de espera.",
    packs: ["Web Presencia IA-Ready", "Web + Chatbot 24/7", "Automatiza tu Agenda"],
    flow: [
      "Cliente pregunta por mesa",
      "Bot verifica disponibilidad en tiempo real",
      "Confirma reserva con detalles",
      "Recordatorio día anterior",
      "Post-visita: solicitud de reseña",
    ],
    intake: ["Nombre", "Fecha y hora", "Número de personas", "Preferencias", "Alergias"],
    conversation: {
      client: "Quiero reservar mesa para 4 el sábado noche",
      bot: "¡Hola! 🍽️ Para el sábado tenemos disponibilidad a las 20:30 o 22:00. Interior o terraza, ¿qué prefieres?",
      client2: "22:00 en terraza",
      bot2: "Perfecto! Mesa para 4, sábado 22:00, terraza. ¿A qué nombre?",
    },
    kpis: ["-70% no-shows", "+25% ocupación", "FAQ resueltas 24/7"],
  },
  {
    id: "clinica",
    icon: Stethoscope,
    title: "Clínica Dental / Fisio / Salud",
    description: "Gestiona citas médicas, recordatorios y seguimiento de pacientes automáticamente.",
    packs: ["Web + Chatbot 24/7", "Automatiza tu Agenda"],
    flow: [
      "Paciente contacta para cita",
      "Bot verifica tipo de consulta",
      "Muestra disponibilidad del profesional",
      "Reserva y confirmación inmediata",
      "Recordatorio + instrucciones pre-cita",
    ],
    intake: ["Nombre completo", "Tipo de consulta", "Profesional preferido", "Seguro médico"],
    conversation: {
      client: "Necesito cita con el fisio para dolor de espalda",
      bot: "Hola! Para dolor de espalda te recomiendo sesión de valoración (45min). Tenemos hueco el lunes 15:00 o miércoles 10:00.",
      client2: "Miércoles",
      bot2: "¡Reservado! Miércoles 10:00 valoración fisioterapia. Trae ropa cómoda. Te envío recordatorio el martes. 📋",
    },
    kpis: ["-60% llamadas", "+30% ocupación", "Seguimiento 100%"],
  },
  {
    id: "taller",
    icon: Car,
    title: "Taller Mecánico / Neumáticos",
    description: "Gestiona citas de revisión, presupuestos y seguimiento de reparaciones.",
    packs: ["Web Presencia IA-Ready", "Web + Chatbot 24/7"],
    flow: [
      "Cliente pide cita o presupuesto",
      "Bot identifica tipo de servicio",
      "Reserva hueco en el taller",
      "Seguimiento del estado del vehículo",
      "Notificación cuando está listo",
    ],
    intake: ["Nombre", "Matrícula", "Tipo de vehículo", "Servicio necesario"],
    conversation: {
      client: "Quiero cambiar las ruedas del coche, matrícula 1234ABC",
      bot: "¡Hola! Para cambio de neumáticos del 1234ABC, ¿qué medida llevas? También puedo mirarlo si me dices marca y modelo.",
      client2: "Es un Golf 2019",
      bot2: "Perfecto, Golf VII. Tenemos 205/55 R16 desde 65€/ud montados. ¿Te viene bien mañana a las 9:00?",
    },
    kpis: ["+40% citas online", "-50% llamadas", "Presupuestos instantáneos"],
  },
  {
    id: "peluqueria",
    icon: Scissors,
    title: "Peluquería / Barbería / Estética",
    description: "Automatiza citas, reduce no-shows y consigue más reseñas sin esfuerzo.",
    packs: ["Web Presencia IA-Ready", "Automatiza tu Agenda"],
    flow: [
      "Cliente escribe por WhatsApp/IG",
      "Bot muestra servicios y disponibilidad",
      "Cliente elige fecha y hora",
      "Confirmación automática + recordatorio 24h antes",
      "Post-cita: solicitud de reseña automática",
    ],
    intake: ["Nombre", "Teléfono", "Servicio deseado", "Preferencia de fecha/hora"],
    conversation: {
      client: "Hola! Quiero pedir cita para corte + barba",
      bot: "¡Hola! 👋 Claro, tenemos disponibilidad mañana a las 10:00, 12:00 o 17:00. ¿Cuál prefieres?",
      client2: "Las 12",
      bot2: "Perfecto! ✅ Tienes cita mañana a las 12:00 para corte + barba. Te enviaré un recordatorio. ¿A qué nombre?",
    },
    kpis: ["-75% no-shows", "+50% reseñas", "-80% tiempo en citas"],
  },
  {
    id: "inmobiliaria",
    icon: Building2,
    title: "Inmobiliaria / Alquiler Vacacional",
    description: "Automatiza consultas de propiedades, visitas y check-in de huéspedes.",
    packs: ["Web + Chatbot 24/7", "Automatiza tu Agenda"],
    flow: [
      "Interesado pregunta por propiedad",
      "Bot envía ficha técnica y fotos",
      "Propone visita o reserva",
      "Gestiona documentación básica",
      "Check-in automático (vacacional)",
    ],
    intake: ["Nombre", "Email", "Tipo de propiedad", "Presupuesto", "Zona preferida"],
    conversation: {
      client: "Busco piso de 2 hab en centro, máximo 900€/mes",
      bot: "¡Hola! Tenemos 3 opciones que encajan. ¿Te envío las fichas?",
      client2: "Sí, por favor",
      bot2: "Aquí tienes: 1) C/Sol - 850€ 2) Plaza Mayor - 890€ 3) C/Luna - 875€. ¿Quieres agendar una visita?",
    },
    kpis: ["+50% leads cualificados", "Visitas auto-agendadas", "Check-in sin fricciones"],
  },
  {
    id: "servicios-domicilio",
    icon: Home,
    title: "Servicios a Domicilio",
    description: "Limpieza, fontanería, electricistas. Gestiona solicitudes y presupuestos automáticamente.",
    packs: ["Web Presencia IA-Ready", "Web + Chatbot 24/7"],
    flow: [
      "Cliente describe el problema",
      "Bot cualifica urgencia y tipo",
      "Propone franja horaria disponible",
      "Confirma visita con profesional asignado",
      "Seguimiento post-servicio",
    ],
    intake: ["Tipo de servicio", "Dirección", "Descripción del problema", "Urgencia"],
    conversation: {
      client: "Tengo una fuga de agua en el baño, es urgente",
      bot: "Entendido, fuga urgente. ¿Puedes enviarme una foto? Tenemos un fontanero disponible en las próximas 2h.",
      client2: "[foto] Calle Mayor 15, 3º",
      bot2: "Recibido. Juan llegará entre 16:00-17:00. Te avisará 15min antes. Desplazamiento: 25€ + diagnóstico gratis.",
    },
    kpis: ["Respuesta < 5min", "+60% leads convertidos", "Seguimiento automático"],
  },
];

const packIcons: Record<string, any> = {
  "Web Presencia IA-Ready": Globe,
  "Web + Chatbot 24/7": Bot,
  "Automatiza tu Agenda": Calendar,
};

const Industrias = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-secondary w-96 h-96 -top-48 -left-48" />
        <div className="glow-orb-accent w-64 h-64 bottom-0 right-0" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-secondary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> Plantillas por Vertical
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Soluciones por <span className="text-gradient-secondary">industria</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Plantillas optimizadas para tu sector. Configuradas y listas para funcionar en 48h.
            </p>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding">
        <div className="section-container">
          <div className="space-y-24">
            {industries.map((industry) => (
              <div key={industry.id} id={industry.id} className="scroll-mt-24">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                    <industry.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold">{industry.title}</h2>
                    <p className="text-muted-foreground">{industry.description}</p>
                  </div>
                </div>

                {/* Recommended Packs */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Packs recomendados:</p>
                  <div className="flex flex-wrap gap-2">
                    {industry.packs.map((pack, i) => {
                      const IconComp = packIcons[pack] || Globe;
                      return (
                        <span key={i} className="badge-primary text-xs flex items-center gap-1">
                          <IconComp className="w-3 h-3" />
                          {pack}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left: Flow & KPIs */}
                  <div className="space-y-6">
                    {/* Flow */}
                    <div className="card-premium">
                      <h4 className="font-display font-semibold mb-4">Flujo del Bot</h4>
                      <ol className="space-y-3">
                        {industry.flow.map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary shrink-0">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Intake Data */}
                    <div className="card-premium">
                      <h4 className="font-display font-semibold mb-4">Datos que Captura</h4>
                      <div className="flex flex-wrap gap-2">
                        {industry.intake.map((field, i) => (
                          <span key={i} className="badge-primary text-xs">{field}</span>
                        ))}
                      </div>
                    </div>

                    {/* KPIs */}
                    <div className="card-premium">
                      <h4 className="font-display font-semibold mb-4">Resultados Esperados</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {industry.kpis.map((kpi, i) => (
                          <div key={i} className="text-center p-3 rounded-xl bg-success/10 border border-success/20">
                            <span className="text-xs font-medium text-success">{kpi}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Conversation Example */}
                  <div className="card-premium">
                    <h4 className="font-display font-semibold mb-4 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      Ejemplo de Conversación
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-end">
                        <div className="max-w-[80%] rounded-2xl rounded-br-sm px-4 py-2 bg-primary text-primary-foreground text-sm">
                          {industry.conversation.client}
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-2 bg-muted text-foreground text-sm">
                          {industry.conversation.bot}
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="max-w-[80%] rounded-2xl rounded-br-sm px-4 py-2 bg-primary text-primary-foreground text-sm">
                          {industry.conversation.client2}
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-2 bg-muted text-foreground text-sm">
                          {industry.conversation.bot2}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border/50">
                      <Link to={`/auditoria?vertical=${industry.id}`}>
                        <Button className="w-full btn-neon">
                          Aplicar esta plantilla
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/10">
        <div className="section-container">
          <div className="card-premium text-center p-12 neon-border">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              ¿Tu industria no está aquí?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Creamos soluciones personalizadas para cualquier negocio local. Cuéntanos tu caso.
            </p>
            <Link to="/contacto">
              <Button size="lg" className="btn-neon text-lg px-8">
                Contactar
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Industrias;
