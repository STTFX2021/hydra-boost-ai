import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  UtensilsCrossed, Stethoscope, Car, Scissors, Home, Building2,
  ArrowRight, MessageSquare, Zap, Globe, Bot, Calendar,
  Brain, Radar, Target, Mail, Factory, CalendarCheck, 
  BarChart3, Clock, TrendingUp, Users, Sparkles, Puzzle, Star, Crown
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const Industrias = () => {
  const { t, language } = useTranslation();

  // Automation cards data
  const automations = [
    {
      id: "opportunity-engine",
      icon: Brain,
      title: language === 'es' ? "Opportunity Intelligence Engine" : "Opportunity Intelligence Engine",
      tag: "WF1 CORE",
      description: language === 'es' 
        ? "Detecta oportunidades de negocio, puntúa leads y dispara acciones automáticas."
        : "Detects business opportunities, scores leads and triggers automatic actions."
    },
    {
      id: "radar-tendencias",
      icon: Radar,
      title: language === 'es' ? "Radar de Tendencias & Señales" : "Trends & Signals Radar",
      tag: "WF2",
      description: language === 'es' 
        ? "Señales programadas a Discord, Slack o Email según patrones de mercado."
        : "Scheduled signals to Discord, Slack or Email based on market patterns."
    },
    {
      id: "lead-engine",
      icon: Target,
      title: language === 'es' ? "Lead Engine (Captura + Scoring)" : "Lead Engine (Capture + Scoring)",
      tag: null,
      description: language === 'es' 
        ? "Ingesta de leads multicanal + scoring hot/warm/cold + routing automático."
        : "Multichannel lead ingestion + hot/warm/cold scoring + automatic routing."
    },
    {
      id: "nutricion-automatica",
      icon: Mail,
      title: language === 'es' ? "Nutrición Automática (Email/Brevo)" : "Automatic Nurturing (Email/Brevo)",
      tag: null,
      description: language === 'es' 
        ? "Secuencias de emails y seguimiento automático hasta la conversión."
        : "Email sequences and automatic follow-up until conversion."
    },
    {
      id: "sales-message-factory",
      icon: Factory,
      title: language === 'es' ? "Sales Message Factory" : "Sales Message Factory",
      tag: "WF3",
      description: language === 'es' 
        ? "Generación de mensajes de ventas para leads hot/warm + reporting automático."
        : "Sales message generation for hot/warm leads + automatic reporting."
    },
    {
      id: "bookings-management",
      icon: CalendarCheck,
      title: language === 'es' ? "Bookings & Consultation Management" : "Bookings & Consultation Management",
      tag: null,
      description: language === 'es' 
        ? "Diagnóstico, agenda, recordatorios y follow-up post-cita automatizados."
        : "Automated diagnosis, scheduling, reminders and post-appointment follow-up."
    },
    {
      id: "analytics-insights",
      icon: BarChart3,
      title: language === 'es' ? "Analytics & Insights (Daily/Weekly)" : "Analytics & Insights (Daily/Weekly)",
      tag: null,
      description: language === 'es' 
        ? "Reportes automáticos con métricas clave + recomendaciones accionables."
        : "Automatic reports with key metrics + actionable recommendations."
    },
    {
      id: "ops-24-7",
      icon: Clock,
      title: language === 'es' ? "Operaciones 24/7 (Cola Priorizada)" : "24/7 Operations (Priority Queue)",
      tag: null,
      description: language === 'es' 
        ? "Ejecución continua de tareas con sistema de prioridades inteligente."
        : "Continuous task execution with intelligent priority system."
    },
    {
      id: "predictive-ops",
      icon: TrendingUp,
      title: language === 'es' ? "Rutinas Predictivas (Predictive Ops)" : "Predictive Routines (Predictive Ops)",
      tag: null,
      description: language === 'es' 
        ? "Anticipa fallos, tareas pendientes y actúa antes de que sea tarde."
        : "Anticipates failures, pending tasks and acts before it's too late."
    },
    {
      id: "agentes-rol",
      icon: Users,
      title: language === 'es' ? "Agentes por Rol (CEO/CTO/Tribe/Guild)" : "Role Agents (CEO/CTO/Tribe/Guild)",
      tag: null,
      description: language === 'es' 
        ? "Estrategia, innovación y coordinación interna con agentes especializados."
        : "Strategy, innovation and internal coordination with specialized agents."
    },
    {
      id: "dynamic-creator",
      icon: Sparkles,
      title: language === 'es' ? "Dynamic Workflow Creator" : "Dynamic Workflow Creator",
      tag: null,
      description: language === 'es' 
        ? "Creación controlada de nuevos workflows y agentes según necesidad."
        : "Controlled creation of new workflows and agents as needed."
    },
    {
      id: "extras-integraciones",
      icon: Puzzle,
      title: language === 'es' ? "Extras (Chrome / Integraciones)" : "Extras (Chrome / Integrations)",
      tag: null,
      description: language === 'es' 
        ? "Extensión Chrome, APIs externas y conectores personalizados."
        : "Chrome extension, external APIs and custom connectors."
    },
  ];

  // Recommended packs
  const packs = [
    {
      id: "starter",
      name: "Starter",
      price: "199",
      period: language === 'es' ? "/mes" : "/mo",
      badge: null,
      description: language === 'es' 
        ? "Core + Leads básico + Bookings + Analytics básico"
        : "Core + Basic Leads + Bookings + Basic Analytics",
      features: language === 'es' 
        ? ["Opportunity Engine básico", "Lead Engine (hasta 100/mes)", "Bookings Management", "Analytics semanal"]
        : ["Basic Opportunity Engine", "Lead Engine (up to 100/mo)", "Bookings Management", "Weekly Analytics"]
    },
    {
      id: "pro",
      name: "Pro",
      price: "499",
      period: language === 'es' ? "/mes" : "/mo",
      badge: language === 'es' ? "Más popular" : "Most popular",
      description: language === 'es' 
        ? "Starter + Radar + Sales Factory + Content + 1 Agent (CEO o CTO)"
        : "Starter + Radar + Sales Factory + Content + 1 Agent (CEO or CTO)",
      features: language === 'es' 
        ? ["Todo de Starter +", "Radar de Tendencias", "Sales Message Factory", "Nutrición Automática", "1 Agente (CEO o CTO)"]
        : ["Everything in Starter +", "Trends Radar", "Sales Message Factory", "Automatic Nurturing", "1 Agent (CEO or CTO)"]
    },
    {
      id: "autonomous",
      name: "Autonomous",
      price: "999",
      period: language === 'es' ? "/mes" : "/mo",
      badge: "Premium",
      description: language === 'es' 
        ? "Pro + Ops 24/7 + Predictive Ops + 3 Agents + soporte prioritario"
        : "Pro + 24/7 Ops + Predictive Ops + 3 Agents + priority support",
      features: language === 'es' 
        ? ["Todo de Pro +", "Operaciones 24/7", "Rutinas Predictivas", "3 Agentes especializados", "Soporte prioritario", "Dynamic Workflow Creator"]
        : ["Everything in Pro +", "24/7 Operations", "Predictive Routines", "3 Specialized Agents", "Priority Support", "Dynamic Workflow Creator"]
    },
  ];

  const industries = [
    {
      id: "restaurante",
      icon: UtensilsCrossed,
      title: language === 'es' ? "Restaurante / Cafetería / Hostelería" : "Restaurant / Café / Hospitality",
      description: language === 'es' 
        ? "Automatiza reservas, responde preguntas frecuentes y gestiona la lista de espera."
        : "Automate bookings, answer FAQs and manage the waiting list.",
      packs: [t("industries.packWebPresencia"), t("industries.packWebChatbot"), t("industries.packAutomatiza")],
      flow: language === 'es' 
        ? ["Cliente pregunta por mesa", "Bot verifica disponibilidad en tiempo real", "Confirma reserva con detalles", "Recordatorio día anterior", "Post-visita: solicitud de reseña"]
        : ["Client asks for a table", "Bot checks real-time availability", "Confirms booking with details", "Reminder day before", "Post-visit: review request"],
      intake: language === 'es' 
        ? ["Nombre", "Fecha y hora", "Número de personas", "Preferencias", "Alergias"]
        : ["Name", "Date and time", "Number of guests", "Preferences", "Allergies"],
      conversation: language === 'es' 
        ? {
            client: "Quiero reservar mesa para 4 el sábado noche",
            bot: "¡Hola! 🍽️ Para el sábado tenemos disponibilidad a las 20:30 o 22:00. Interior o terraza, ¿qué prefieres?",
            client2: "22:00 en terraza",
            bot2: "Perfecto! Mesa para 4, sábado 22:00, terraza. ¿A qué nombre?",
          }
        : {
            client: "I want to book a table for 4 on Saturday night",
            bot: "Hi! 🍽️ For Saturday we have availability at 8:30pm or 10pm. Indoor or terrace, which do you prefer?",
            client2: "10pm on the terrace",
            bot2: "Perfect! Table for 4, Saturday 10pm, terrace. Under what name?",
          },
      kpis: language === 'es' ? ["-70% no-shows", "+25% ocupación", "FAQ resueltas 24/7"] : ["-70% no-shows", "+25% occupancy", "FAQs answered 24/7"],
    },
    {
      id: "clinica",
      icon: Stethoscope,
      title: language === 'es' ? "Clínica Dental / Fisio / Salud" : "Dental / Physio / Health Clinic",
      description: language === 'es' 
        ? "Gestiona citas médicas, recordatorios y seguimiento de pacientes automáticamente."
        : "Manage medical appointments, reminders and patient follow-up automatically.",
      packs: [t("industries.packWebChatbot"), t("industries.packAutomatiza")],
      flow: language === 'es' 
        ? ["Paciente contacta para cita", "Bot verifica tipo de consulta", "Muestra disponibilidad del profesional", "Reserva y confirmación inmediata", "Recordatorio + instrucciones pre-cita"]
        : ["Patient contacts for appointment", "Bot verifies consultation type", "Shows professional's availability", "Immediate booking and confirmation", "Reminder + pre-appointment instructions"],
      intake: language === 'es' 
        ? ["Nombre completo", "Tipo de consulta", "Profesional preferido", "Seguro médico"]
        : ["Full name", "Consultation type", "Preferred professional", "Health insurance"],
      conversation: language === 'es' 
        ? {
            client: "Necesito cita con el fisio para dolor de espalda",
            bot: "Hola! Para dolor de espalda te recomiendo sesión de valoración (45min). Tenemos hueco el lunes 15:00 o miércoles 10:00.",
            client2: "Miércoles",
            bot2: "¡Reservado! Miércoles 10:00 valoración fisioterapia. Trae ropa cómoda. Te envío recordatorio el martes. 📋",
          }
        : {
            client: "I need an appointment with the physio for back pain",
            bot: "Hi! For back pain I recommend an assessment session (45min). We have slots on Monday 3pm or Wednesday 10am.",
            client2: "Wednesday",
            bot2: "Booked! Wednesday 10:00 physio assessment. Wear comfortable clothes. I'll send a reminder on Tuesday. 📋",
          },
      kpis: language === 'es' ? ["-60% llamadas", "+30% ocupación", "Seguimiento 100%"] : ["-60% calls", "+30% occupancy", "100% follow-up"],
    },
    {
      id: "taller",
      icon: Car,
      title: language === 'es' ? "Taller Mecánico / Neumáticos" : "Mechanic Shop / Tires",
      description: language === 'es' 
        ? "Gestiona citas de revisión, presupuestos y seguimiento de reparaciones."
        : "Manage service appointments, quotes and repair tracking.",
      packs: [t("industries.packWebPresencia"), t("industries.packWebChatbot")],
      flow: language === 'es' 
        ? ["Cliente pide cita o presupuesto", "Bot identifica tipo de servicio", "Reserva hueco en el taller", "Seguimiento del estado del vehículo", "Notificación cuando está listo"]
        : ["Client requests appointment or quote", "Bot identifies service type", "Books slot at the shop", "Vehicle status tracking", "Notification when ready"],
      intake: language === 'es' 
        ? ["Nombre", "Matrícula", "Tipo de vehículo", "Servicio necesario"]
        : ["Name", "License plate", "Vehicle type", "Service needed"],
      conversation: language === 'es' 
        ? {
            client: "Quiero cambiar las ruedas del coche, matrícula 1234ABC",
            bot: "¡Hola! Para cambio de neumáticos del 1234ABC, ¿qué medida llevas? También puedo mirarlo si me dices marca y modelo.",
            client2: "Es un Golf 2019",
            bot2: "Perfecto, Golf VII. Tenemos 205/55 R16 desde 65€/ud montados. ¿Te viene bien mañana a las 9:00?",
          }
        : {
            client: "I want to change my car tires, plate 1234ABC",
            bot: "Hi! For tire change on 1234ABC, what size do you need? I can also check if you tell me make and model.",
            client2: "It's a 2019 Golf",
            bot2: "Perfect, Golf VII. We have 205/55 R16 from €65/ea fitted. Does tomorrow at 9:00am work for you?",
          },
      kpis: language === 'es' ? ["+40% citas online", "-50% llamadas", "Presupuestos instantáneos"] : ["+40% online bookings", "-50% calls", "Instant quotes"],
    },
    {
      id: "peluqueria",
      icon: Scissors,
      title: language === 'es' ? "Peluquería / Barbería / Estética" : "Hair Salon / Barber / Beauty",
      description: language === 'es' 
        ? "Automatiza citas, reduce no-shows y consigue más reseñas sin esfuerzo."
        : "Automate appointments, reduce no-shows and get more reviews effortlessly.",
      packs: [t("industries.packWebPresencia"), t("industries.packAutomatiza")],
      flow: language === 'es' 
        ? ["Cliente escribe por WhatsApp/IG", "Bot muestra servicios y disponibilidad", "Cliente elige fecha y hora", "Confirmación automática + recordatorio 24h antes", "Post-cita: solicitud de reseña automática"]
        : ["Client writes via WhatsApp/IG", "Bot shows services and availability", "Client chooses date and time", "Auto confirmation + 24h reminder", "Post-appointment: auto review request"],
      intake: language === 'es' 
        ? ["Nombre", "Teléfono", "Servicio deseado", "Preferencia de fecha/hora"]
        : ["Name", "Phone", "Desired service", "Date/time preference"],
      conversation: language === 'es' 
        ? {
            client: "Hola! Quiero pedir cita para corte + barba",
            bot: "¡Hola! 👋 Claro, tenemos disponibilidad mañana a las 10:00, 12:00 o 17:00. ¿Cuál prefieres?",
            client2: "Las 12",
            bot2: "Perfecto! ✅ Tienes cita mañana a las 12:00 para corte + barba. Te enviaré un recordatorio. ¿A qué nombre?",
          }
        : {
            client: "Hi! I want to book a haircut + beard trim",
            bot: "Hi! 👋 Sure, we have availability tomorrow at 10:00, 12:00 or 17:00. Which do you prefer?",
            client2: "12:00",
            bot2: "Perfect! ✅ You're booked tomorrow at 12:00 for haircut + beard. I'll send you a reminder. What name?",
          },
      kpis: language === 'es' ? ["-75% no-shows", "+50% reseñas", "-80% tiempo en citas"] : ["-75% no-shows", "+50% reviews", "-80% booking time"],
    },
    {
      id: "inmobiliaria",
      icon: Building2,
      title: language === 'es' ? "Inmobiliaria / Alquiler Vacacional" : "Real Estate / Vacation Rental",
      description: language === 'es' 
        ? "Automatiza consultas de propiedades, visitas y check-in de huéspedes."
        : "Automate property inquiries, viewings and guest check-in.",
      packs: [t("industries.packWebChatbot"), t("industries.packAutomatiza")],
      flow: language === 'es' 
        ? ["Interesado pregunta por propiedad", "Bot envía ficha técnica y fotos", "Propone visita o reserva", "Gestiona documentación básica", "Check-in automático (vacacional)"]
        : ["Lead asks about property", "Bot sends specs and photos", "Proposes viewing or booking", "Manages basic documentation", "Auto check-in (vacation)"],
      intake: language === 'es' 
        ? ["Nombre", "Email", "Tipo de propiedad", "Presupuesto", "Zona preferida"]
        : ["Name", "Email", "Property type", "Budget", "Preferred area"],
      conversation: language === 'es' 
        ? {
            client: "Busco piso de 2 hab en centro, máximo 900€/mes",
            bot: "¡Hola! Tenemos 3 opciones que encajan. ¿Te envío las fichas?",
            client2: "Sí, por favor",
            bot2: "Aquí tienes: 1) C/Sol - 850€ 2) Plaza Mayor - 890€ 3) C/Luna - 875€. ¿Quieres agendar una visita?",
          }
        : {
            client: "Looking for a 2-bed apartment downtown, max €900/month",
            bot: "Hi! We have 3 matching options. Shall I send you the details?",
            client2: "Yes, please",
            bot2: "Here they are: 1) Sol St - €850 2) Main Square - €890 3) Luna St - €875. Would you like to schedule a viewing?",
          },
      kpis: language === 'es' ? ["+50% leads cualificados", "Visitas auto-agendadas", "Check-in sin fricciones"] : ["+50% qualified leads", "Auto-scheduled viewings", "Frictionless check-in"],
    },
    {
      id: "servicios-domicilio",
      icon: Home,
      title: language === 'es' ? "Servicios a Domicilio" : "Home Services",
      description: language === 'es' 
        ? "Limpieza, fontanería, electricistas. Gestiona solicitudes y presupuestos automáticamente."
        : "Cleaning, plumbing, electricians. Manage requests and quotes automatically.",
      packs: [t("industries.packWebPresencia"), t("industries.packWebChatbot")],
      flow: language === 'es' 
        ? ["Cliente describe el problema", "Bot cualifica urgencia y tipo", "Propone franja horaria disponible", "Confirma visita con profesional asignado", "Seguimiento post-servicio"]
        : ["Client describes the problem", "Bot qualifies urgency and type", "Proposes available time slot", "Confirms visit with assigned pro", "Post-service follow-up"],
      intake: language === 'es' 
        ? ["Tipo de servicio", "Dirección", "Descripción del problema", "Urgencia"]
        : ["Service type", "Address", "Problem description", "Urgency"],
      conversation: language === 'es' 
        ? {
            client: "Tengo una fuga de agua en el baño, es urgente",
            bot: "Entendido, fuga urgente. ¿Puedes enviarme una foto? Tenemos un fontanero disponible en las próximas 2h.",
            client2: "[foto] Calle Mayor 15, 3º",
            bot2: "Recibido. Juan llegará entre 16:00-17:00. Te avisará 15min antes. Desplazamiento: 25€ + diagnóstico gratis.",
          }
        : {
            client: "I have a water leak in the bathroom, it's urgent",
            bot: "Got it, urgent leak. Can you send me a photo? We have a plumber available in the next 2h.",
            client2: "[photo] 15 Main St, 3rd floor",
            bot2: "Received. Juan will arrive between 4-5pm. He'll call you 15min before. Callout: €25 + free diagnosis.",
          },
      kpis: language === 'es' ? ["Respuesta < 5min", "+60% leads convertidos", "Seguimiento automático"] : ["Response < 5min", "+60% converted leads", "Auto follow-up"],
    },
  ];

  const packIcons: Record<string, any> = {
    [t("industries.packWebPresencia")]: Globe,
    [t("industries.packWebChatbot")]: Bot,
    [t("industries.packAutomatiza")]: Calendar,
  };

  return (
    <PageLayout>
      {/* Hero - NEW Commercial Section */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-secondary w-96 h-96 -top-48 -left-48" />
        <div className="glow-orb-accent w-64 h-64 bottom-0 right-0" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="badge-secondary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> {t("industries.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              {t("industries.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {t("industries.subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auditoria">
                <Button size="lg" className="btn-neon text-lg px-8">
                  {language === 'es' ? 'Auditoría Gratis' : 'Free Audit'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/precios">
                <Button size="lg" variant="outline" className="btn-outline-neon text-lg px-8">
                  {language === 'es' ? 'Ver Precios' : 'See Pricing'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Automations Grid */}
      <section className="section-padding bg-muted/5">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {language === 'es' ? 'Catálogo de Automatizaciones' : 'Automations Catalog'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'es' 
                ? 'Cada módulo puede contratarse individualmente o como parte de un pack.'
                : 'Each module can be purchased individually or as part of a pack.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {automations.map((automation) => (
              <div key={automation.id} className="card-premium group hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <automation.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-semibold text-sm leading-tight">{automation.title}</h3>
                      {automation.tag && (
                        <span className="badge-primary text-[10px] px-1.5 py-0.5">{automation.tag}</span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{automation.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Packs */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {language === 'es' ? 'Packs Recomendados' : 'Recommended Packs'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'es' 
                ? 'Combina automatizaciones con descuento. Incluye setup y soporte.'
                : 'Bundle automations with a discount. Includes setup and support.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packs.map((pack) => (
              <div 
                key={pack.id} 
                className={`relative card-premium flex flex-col ${pack.badge === (language === 'es' ? 'Más popular' : 'Most popular') ? 'border-primary neon-border' : pack.badge === 'Premium' ? 'border-accent' : ''}`}
              >
                {pack.badge && (
                  <div className="absolute top-0 right-4 -translate-y-1/2">
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      pack.badge === 'Premium' 
                        ? 'bg-accent text-accent-foreground' 
                        : 'badge-primary'
                    }`}>
                      {pack.badge === 'Premium' ? <Crown className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                      {pack.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold">{pack.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{pack.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-bold">{pack.price}€</span>
                    <span className="text-muted-foreground text-sm">{pack.period}</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-8 flex-1">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contacto">
                  <Button className={`w-full ${pack.badge ? 'btn-neon' : 'btn-outline-neon'}`}>
                    {language === 'es' ? 'Solicitar' : 'Request'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Annual discount notice */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            {language === 'es' 
              ? '💡 Pago anual: 2 meses gratis. Pregunta por descuentos para startups.'
              : '💡 Annual payment: 2 months free. Ask about startup discounts.'}
          </p>
        </div>
      </section>

      {/* Sector Templates (Previously Industries) */}
      <section className="section-padding bg-muted/5">
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="badge-secondary mb-4 inline-flex">
              <Globe className="w-3 h-3 mr-1" /> {language === 'es' ? 'Plantillas' : 'Templates'}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {language === 'es' ? 'Plantillas por Sector' : 'Templates by Sector'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'es' 
                ? 'Ejemplos de automatizaciones adaptadas a industrias específicas.'
                : 'Examples of automations adapted to specific industries.'}
            </p>
          </div>

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
                  <p className="text-sm text-muted-foreground mb-2">{t("industries.packs")}</p>
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
                      <h4 className="font-display font-semibold mb-4">{language === 'es' ? 'Flujo del Bot' : 'Bot Flow'}</h4>
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
                      <h4 className="font-display font-semibold mb-4">{language === 'es' ? 'Datos que Captura' : 'Data Captured'}</h4>
                      <div className="flex flex-wrap gap-2">
                        {industry.intake.map((field, i) => (
                          <span key={i} className="badge-primary text-xs">{field}</span>
                        ))}
                      </div>
                    </div>

                    {/* KPIs */}
                    <div className="card-premium">
                      <h4 className="font-display font-semibold mb-4">{language === 'es' ? 'Resultados Esperados' : 'Expected Results'}</h4>
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
                      {language === 'es' ? 'Ejemplo de Conversación' : 'Conversation Example'}
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
                          {t("industries.apply")}
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
      <section className="section-padding">
        <div className="section-container">
          <div className="card-premium text-center p-12 neon-border max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {language === 'es' ? '¿Tu sector no está aquí?' : "Your sector not listed?"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {language === 'es' 
                ? 'Creamos automatizaciones personalizadas para cualquier negocio. Cuéntanos tu caso.'
                : 'We create custom automations for any business. Tell us your case.'}
            </p>
            <Link to="/contacto">
              <Button size="lg" className="btn-neon text-lg px-8">
                {t("nav.contact")}
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
