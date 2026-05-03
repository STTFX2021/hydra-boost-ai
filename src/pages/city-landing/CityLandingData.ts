export interface CityLandingConfig {
  slug: string;
  city: string;
  region: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string;
  heroSubline: string;
  problemText: string[];
  ctaFinalHeadline: string;
  ctaFinalText: string;
  faqItems: { question: string; answer: string }[];
  industryDescriptions: Record<string, string>;
}

const baseFaq = (city: string): { question: string; answer: string }[] => [
  {
    question: `¿Qué tipo de negocios en ${city} pueden beneficiarse de la automatización IA?`,
    answer: `Restaurantes, clínicas de estética, inmobiliarias, gimnasios, consultorías y cualquier negocio local en ${city} que quiera automatizar la atención al cliente, captación de leads o procesos internos.`,
  },
  {
    question: "¿Cuánto tiempo se tarda en implementar un sistema de automatización IA?",
    answer: "Nuestros sistemas se implementan en un plazo de 5 a 10 días laborables, dependiendo de la complejidad. Incluye configuración, pruebas y formación para tu equipo.",
  },
  {
    question: "¿Es necesario tener conocimientos técnicos para usar los chatbots IA?",
    answer: "No. Nuestros sistemas están diseñados para ser completamente intuitivos. Además, ofrecemos formación personalizada y soporte continuo para que tu equipo se sienta cómodo desde el primer día.",
  },
  {
    question: "¿Los chatbots funcionan en WhatsApp y redes sociales?",
    answer: "Sí. Integramos chatbots IA en WhatsApp, Instagram, Facebook Messenger, tu página web y cualquier canal que utilice tu negocio para comunicarse con clientes.",
  },
  {
    question: `¿Cuánto cuesta la automatización IA para mi negocio en ${city}?`,
    answer: "Ofrecemos planes desde 297 €/mes adaptados a las necesidades de cada negocio. La auditoría inicial es completamente gratuita y sin compromiso.",
  },
];

export const cityConfigs: Record<string, CityLandingConfig> = {
  malaga: {
    slug: "ai-automation-malaga",
    city: "Málaga",
    region: "Costa del Sol",
    seoTitle: "Automatización IA en Málaga | HydrAI Labs",
    metaDescription: "Soluciones de IA para negocios en Málaga. Chatbots 24/7, automatizaciones n8n y captación de clientes para pymes y negocios locales de Málaga capital.",
    keywords: "automatización IA Málaga, agencia IA Málaga, IA para negocios Málaga, automatización de procesos Málaga, chatbot IA Málaga",
    heroSubline: "Automatiza atención al cliente, captación de leads y procesos con inteligencia artificial 24/7. Diseñado para negocios locales en la capital de la Costa del Sol.",
    problemText: [
      `Málaga se ha convertido en uno de los polos tecnológicos y empresariales más dinámicos de España. Con más de 30.000 negocios locales compitiendo por la atención de residentes, turistas y nómadas digitales, la velocidad de respuesta es un factor decisivo. Sin embargo, la mayoría de empresas malagueñas pierden hasta el <strong class="text-foreground">67% de las oportunidades de venta</strong> simplemente porque no responden a tiempo. Cada mensaje de WhatsApp sin contestar, cada formulario web que nadie revisa hasta el día siguiente y cada llamada perdida fuera del horario comercial representa un cliente que se va con la competencia.`,
      `El ecosistema empresarial de Málaga es diverso: desde restaurantes en el Soho y el centro histórico, hasta clínicas de estética en Teatinos, inmobiliarias en la zona este y gimnasios en toda el área metropolitana. Todos comparten un problema común: la gestión manual de las comunicaciones consume demasiado tiempo del equipo y no escala. Un camarero no puede atender reservas por teléfono mientras sirve mesas; una recepcionista de clínica no puede responder WhatsApps mientras atiende pacientes presenciales.`,
      `La transformación digital de Málaga exige soluciones de <strong class="text-foreground">automatización con inteligencia artificial</strong> que permitan a los negocios locales competir al nivel de las grandes empresas tecnológicas que se instalan en la ciudad, sin necesidad de grandes inversiones en personal ni infraestructura.`,
    ],
    ctaFinalHeadline: "¿Listo para automatizar tu negocio en Málaga?",
    ctaFinalText: "Solicita tu auditoría de automatización gratuita. Analizamos tu negocio en Málaga, identificamos las oportunidades de mejora y te presentamos un plan personalizado para implementar IA en tus procesos. Sin compromiso, sin coste inicial y con resultados medibles desde la primera semana.",
    faqItems: baseFaq("Málaga"),
    industryDescriptions: {
      restaurants: "Reservas automáticas, pedidos online, gestión de reseñas y respuestas instantáneas. Ideal para restaurantes del Soho, el centro histórico, Pedregalejo y Huelin.",
      beauty: "Agendamiento automático, recordatorios por WhatsApp y campañas de fidelización para clínicas y centros de estética en Teatinos, Carretera de Cádiz y el centro.",
      realEstate: "Cualificación automática de compradores, seguimiento de propiedades y respuestas instantáneas para agencias inmobiliarias en Málaga capital y área metropolitana.",
      gyms: "Gestión de inscripciones, seguimiento de miembros y comunicación personalizada para gimnasios y centros deportivos en toda Málaga.",
      consulting: "Captación y cualificación automática de clientes, agendamiento de reuniones y automatización de procesos para consultoras y despachos profesionales.",
    },
  },
  "costa-del-sol": {
    slug: "ai-automation-costa-del-sol",
    city: "Costa del Sol",
    region: "Andalucía",
    seoTitle: "Automatización IA en Costa del Sol | HydrAI Labs",
    metaDescription: "Agencia especializada en automatización con IA en Costa del Sol. Chatbots WhatsApp, webs SEO y sistemas automáticos para negocios de Marbella a Torremolinos.",
    keywords: "automatización IA Costa del Sol, agencia IA Costa del Sol, IA para negocios Costa del Sol, automatización de procesos Costa del Sol, chatbot IA Costa del Sol",
    heroSubline: "Automatiza atención al cliente, captación de leads y procesos con inteligencia artificial 24/7. Soluciones diseñadas para el mercado turístico y empresarial de la Costa del Sol.",
    problemText: [
      `La Costa del Sol recibe más de 13 millones de turistas al año y cuenta con una comunidad internacional de residentes que espera un servicio digital ágil y multilingüe. Los negocios de la zona —desde Torremolinos hasta Estepona— se enfrentan a un reto común: atender una demanda estacional altísima con equipos limitados. Sin automatización, se pierde hasta el <strong class="text-foreground">67% de las oportunidades de venta</strong> por falta de respuesta inmediata.`,
      `Hoteles boutique, chiringuitos, agencias inmobiliarias de lujo, clínicas de medicina estética, gimnasios y restaurantes compiten por la atención de un público exigente que compara opciones en segundos desde su móvil. Cada consulta sin responder en WhatsApp, cada formulario web olvidado y cada llamada perdida es un cliente que se va con otro negocio a pocos kilómetros de distancia. La temporalidad amplifica el problema: en temporada alta no hay suficiente personal, y en temporada baja cada lead cuenta.`,
      `La solución no es contratar más personal, sino implementar <strong class="text-foreground">automatización con inteligencia artificial</strong> que trabaje 24/7 en múltiples idiomas, gestione reservas, cualifique leads y libere a tu equipo para que se concentre en ofrecer la experiencia que ha hecho famosa a la Costa del Sol.`,
    ],
    ctaFinalHeadline: "¿Listo para automatizar tu negocio en la Costa del Sol?",
    ctaFinalText: "Solicita tu auditoría de automatización gratuita. Analizamos tu negocio en la Costa del Sol, identificamos oportunidades de mejora y te presentamos un plan personalizado. Sin compromiso, sin coste inicial y con resultados medibles desde la primera semana.",
    faqItems: baseFaq("la Costa del Sol"),
    industryDescriptions: {
      restaurants: "Reservas automáticas, pedidos online y gestión de reseñas multilingüe. Ideal para chiringuitos, restaurantes de playa y establecimientos de la costa.",
      beauty: "Citas automáticas, recordatorios y fidelización para clínicas de estética y centros wellness que atienden a una clientela internacional exigente.",
      realEstate: "Cualificación automática de compradores internacionales, seguimiento de propiedades de lujo y respuestas en múltiples idiomas para agencias de la Costa del Sol.",
      gyms: "Gestión de inscripciones estacionales, seguimiento de miembros y renovaciones automáticas para centros deportivos y de fitness.",
      consulting: "Captación de clientes internacionales, agendamiento multilingüe y automatización de procesos para consultoras y despachos profesionales.",
    },
  },
  estepona: {
    slug: "ai-automation-estepona",
    city: "Estepona",
    region: "Costa del Sol",
    seoTitle: "Automatización IA en Estepona | HydrAI Labs",
    metaDescription: "Chatbots IA y automatizaciones para negocios en Estepona. Webs profesionales, WhatsApp Business 24/7 y captación automática de clientes en Estepona.",
    keywords: "automatización IA Estepona, agencia IA Estepona, IA para negocios Estepona, automatización de procesos Estepona, chatbot IA Estepona",
    heroSubline: "Automatiza atención al cliente, captación de leads y procesos con inteligencia artificial 24/7. Pensado para negocios locales en Estepona y alrededores.",
    problemText: [
      `Estepona ha experimentado un crecimiento espectacular en los últimos años, atrayendo tanto a residentes internacionales como a turistas de alto poder adquisitivo. Este crecimiento ha multiplicado la competencia entre negocios locales, y quienes no responden rápido pierden hasta el <strong class="text-foreground">67% de las oportunidades de venta</strong>. En un mercado donde el boca a boca digital y las reseñas online son decisivos, la velocidad de respuesta marca la diferencia.`,
      `Restaurantes del casco antiguo, clínicas de estética en la zona nueva, inmobiliarias especializadas en propiedades de lujo y gimnasios de la localidad comparten un mismo problema: gestionan sus comunicaciones de forma manual. WhatsApps que tardan horas en contestarse, formularios que nadie revisa hasta el día siguiente, llamadas perdidas fuera de horario. Mientras tanto, el cliente potencial ya ha contactado con tres competidores.`,
      `Estepona merece herramientas de <strong class="text-foreground">automatización con inteligencia artificial</strong> a la altura de su crecimiento. Sistemas que respondan en segundos, cualifiquen leads automáticamente y liberen al equipo para centrarse en ofrecer un servicio de excelencia que fidelice al cliente.`,
    ],
    ctaFinalHeadline: "¿Listo para automatizar tu negocio en Estepona?",
    ctaFinalText: "Solicita tu auditoría de automatización gratuita. Analizamos tu negocio en Estepona, identificamos las oportunidades de mejora y te presentamos un plan personalizado para implementar IA. Sin compromiso, sin coste y con resultados medibles.",
    faqItems: baseFaq("Estepona"),
    industryDescriptions: {
      restaurants: "Reservas automáticas, pedidos online y gestión de reseñas para restaurantes del casco antiguo, el paseo marítimo y urbanizaciones de Estepona.",
      beauty: "Agendamiento automático y recordatorios para clínicas de estética y centros de belleza en Estepona que atienden a clientela local e internacional.",
      realEstate: "Cualificación automática de compradores, respuestas multilingüe y seguimiento de propiedades para inmobiliarias de Estepona y la costa occidental.",
      gyms: "Gestión de inscripciones, seguimiento de miembros y comunicación personalizada para gimnasios y centros deportivos en Estepona.",
      consulting: "Captación automática de clientes, agendamiento y automatización de procesos para profesionales y consultoras locales.",
    },
  },
  fuengirola: {
    slug: "ai-automation-fuengirola",
    city: "Fuengirola",
    region: "Costa del Sol",
    seoTitle: "Automatización IA en Fuengirola | HydrAI Labs",
    metaDescription: "Soluciones IA para negocios en Fuengirola. Chatbots WhatsApp, automatizaciones y webs para restaurantes, clínicas y comercios de Fuengirola.",
    keywords: "automatización IA Fuengirola, agencia IA Fuengirola, IA para negocios Fuengirola, automatización de procesos Fuengirola, chatbot IA Fuengirola",
    heroSubline: "Automatiza atención al cliente, captación de leads y procesos con inteligencia artificial 24/7. Soluciones para negocios locales en Fuengirola.",
    problemText: [
      `Fuengirola es una de las ciudades más dinámicas de la Costa del Sol, con una mezcla única de residentes internacionales, turistas y una vibrante comunidad empresarial local. Con más de 80.000 habitantes y millones de visitantes al año, la competencia entre negocios es feroz. Sin embargo, la mayoría de empresas locales pierden hasta el <strong class="text-foreground">67% de sus oportunidades de venta</strong> porque no responden con la rapidez que el mercado actual exige.`,
      `Desde los restaurantes del paseo marítimo hasta las inmobiliarias de Los Boliches, desde las clínicas de estética hasta los gimnasios del centro, todos los negocios de Fuengirola enfrentan el mismo desafío: gestionar manualmente un volumen creciente de consultas por WhatsApp, email, redes sociales y teléfono. Los equipos están saturados, las respuestas tardan demasiado y los clientes potenciales se marchan a la competencia.`,
      `La solución es clara: implementar <strong class="text-foreground">automatización con inteligencia artificial</strong> que permita a tu negocio en Fuengirola responder instantáneamente, cualificar leads de forma automática y automatizar los procesos que consumen tiempo sin aportar valor directo.`,
    ],
    ctaFinalHeadline: "¿Listo para automatizar tu negocio en Fuengirola?",
    ctaFinalText: "Solicita tu auditoría de automatización gratuita. Analizamos tu negocio en Fuengirola, encontramos oportunidades de mejora y diseñamos un plan de IA personalizado. Sin compromiso, sin coste inicial y con resultados visibles en días.",
    faqItems: baseFaq("Fuengirola"),
    industryDescriptions: {
      restaurants: "Reservas automáticas, pedidos online y gestión de reseñas para restaurantes del paseo marítimo, Los Boliches y el centro de Fuengirola.",
      beauty: "Agendamiento automático, recordatorios y fidelización para clínicas de estética y centros de belleza en Fuengirola.",
      realEstate: "Cualificación automática de compradores, seguimiento de propiedades y respuestas multilingüe para inmobiliarias de Fuengirola y Mijas Costa.",
      gyms: "Gestión de inscripciones, seguimiento de miembros y renovaciones automáticas para gimnasios y centros de CrossFit en Fuengirola.",
      consulting: "Captación automática de clientes, agendamiento y automatización de procesos para consultoras y profesionales locales.",
    },
  },
  benalmadena: {
    slug: "ai-automation-benalmadena",
    city: "Benalmádena",
    region: "Costa del Sol",
    seoTitle: "Automatización IA en Benalmádena | HydrAI Labs",
    metaDescription: "Automatización con IA para negocios en Benalmádena. Chatbots 24/7, webs SEO y flujos automáticos para negocios locales de Benalmádena y Arroyo de la Miel.",
    keywords: "automatización IA Benalmádena, agencia IA Benalmádena, IA para negocios Benalmádena, automatización de procesos Benalmádena, chatbot IA Benalmádena",
    heroSubline: "Automatiza atención al cliente, captación de leads y procesos con inteligencia artificial 24/7. Soluciones para negocios locales en Benalmádena.",
    problemText: [
      `Benalmádena, con su Puerto Marina, sus playas y su oferta turística de primer nivel, es uno de los municipios más visitados de la Costa del Sol. Los negocios locales se enfrentan a un flujo constante de consultas de turistas internacionales y residentes que esperan respuestas inmediatas. Sin embargo, la realidad es que hasta el <strong class="text-foreground">67% de las oportunidades de venta se pierden</strong> por tiempos de respuesta lentos y procesos manuales.`,
      `Restaurantes en Benalmádena Costa, hoteles boutique, clínicas de estética en Arroyo de la Miel, inmobiliarias y centros deportivos comparten un problema: sus equipos están desbordados gestionando comunicaciones por múltiples canales. WhatsApps acumulados, emails sin revisar, reservas perdidas y seguimiento manual de clientes que se queda a medias. Todo esto mientras la competencia —a veces a solo unos metros— sí responde a tiempo.`,
      `La <strong class="text-foreground">automatización con inteligencia artificial</strong> permite a los negocios de Benalmádena ofrecer atención instantánea 24/7, gestionar reservas automáticamente, cualificar leads sin intervención humana y liberar al equipo para que se centre en lo que realmente importa: la experiencia del cliente.`,
    ],
    ctaFinalHeadline: "¿Listo para automatizar tu negocio en Benalmádena?",
    ctaFinalText: "Solicita tu auditoría de automatización gratuita. Analizamos tu negocio en Benalmádena, detectamos oportunidades y diseñamos un plan de IA a medida. Sin compromiso, sin coste y con resultados desde la primera semana.",
    faqItems: baseFaq("Benalmádena"),
    industryDescriptions: {
      restaurants: "Reservas automáticas, pedidos online y gestión de reseñas para restaurantes en Puerto Marina, Benalmádena Costa y Arroyo de la Miel.",
      beauty: "Agendamiento automático, recordatorios y campañas de fidelización para clínicas y centros de estética en Benalmádena y alrededores.",
      realEstate: "Cualificación automática de compradores internacionales, seguimiento de propiedades y respuestas multilingüe para inmobiliarias de Benalmádena.",
      gyms: "Gestión de inscripciones, seguimiento de miembros y comunicación personalizada para gimnasios y centros deportivos en Benalmádena.",
      consulting: "Captación automática de clientes, agendamiento de reuniones y automatización de procesos para profesionales y consultoras.",
    },
  },
  torremolinos: {
    slug: "ai-automation-torremolinos",
    city: "Torremolinos",
    region: "Costa del Sol",
    seoTitle: "Automatización IA en Torremolinos | HydrAI Labs",
    metaDescription: "IA y automatización para negocios en Torremolinos. Chatbots WhatsApp, captación automática de clientes y webs profesionales para hostelería y comercios.",
    keywords: "automatización IA Torremolinos, agencia IA Torremolinos, IA para negocios Torremolinos, automatización de procesos Torremolinos, chatbot IA Torremolinos",
    heroSubline: "Automatiza atención al cliente, captación de leads y procesos con inteligencia artificial 24/7. Diseñado para negocios locales en Torremolinos.",
    problemText: [
      `Torremolinos, cuna del turismo en la Costa del Sol, sigue siendo uno de los destinos más visitados de Andalucía. Con una oferta hostelera enorme, comercios, clínicas y servicios que compiten por captar tanto a turistas como a residentes, la agilidad en la respuesta al cliente es crucial. Sin embargo, la mayoría de negocios locales pierden hasta el <strong class="text-foreground">67% de las oportunidades de venta</strong> por no responder a tiempo.`,
      `Desde La Carihuela hasta el centro urbano, los negocios de Torremolinos gestionan manualmente sus comunicaciones: WhatsApps sin responder durante horas, formularios olvidados, llamadas perdidas fuera de horario y procesos internos que consumen demasiado tiempo. En una ciudad donde el turista decide en minutos dónde comer, reservar o comprar, cada segundo sin respuesta es una venta perdida. Y la competencia está literalmente en la acera de enfrente.`,
      `Torremolinos necesita <strong class="text-foreground">automatización con inteligencia artificial</strong> para que sus negocios puedan competir al más alto nivel: respuestas instantáneas en varios idiomas, cualificación automática de leads, reservas sin intervención humana y un equipo liberado para ofrecer el servicio cercano y personal que caracteriza a la ciudad.`,
    ],
    ctaFinalHeadline: "¿Listo para automatizar tu negocio en Torremolinos?",
    ctaFinalText: "Solicita tu auditoría de automatización gratuita. Analizamos tu negocio en Torremolinos, identificamos mejoras y te entregamos un plan de IA personalizado. Sin compromiso, sin coste y con resultados rápidos.",
    faqItems: baseFaq("Torremolinos"),
    industryDescriptions: {
      restaurants: "Reservas automáticas, pedidos online y gestión de reseñas para restaurantes en La Carihuela, el centro y el paseo marítimo de Torremolinos.",
      beauty: "Agendamiento automático, recordatorios y fidelización para clínicas de estética y centros de belleza en Torremolinos.",
      realEstate: "Cualificación automática de compradores, seguimiento de propiedades y respuestas multilingüe para inmobiliarias de Torremolinos.",
      gyms: "Gestión de inscripciones, seguimiento de miembros y renovaciones automáticas para gimnasios y centros deportivos en Torremolinos.",
      consulting: "Captación y cualificación automática de clientes, agendamiento y automatización de procesos para profesionales locales.",
    },
  },

  // ─── Spanish-friendly slugs (Agencia IA …) ───
  "agencia-ia-malaga": {
    slug: "agencia-ia-malaga",
    city: "Málaga",
    region: "Costa del Sol",
    seoTitle: "Agencia IA en Málaga | HydrAI Labs",
    metaDescription: "Agencia IA en Málaga: chatbots WhatsApp, agentes IA y automatizaciones n8n para pymes, restaurantes, clínicas e inmobiliarias. Auditoría gratuita.",
    keywords: "agencia IA Málaga, automatización IA Málaga, chatbot WhatsApp Málaga, agentes IA Málaga, agencia inteligencia artificial Málaga",
    heroSubline: "Somos la agencia de inteligencia artificial de referencia en Málaga. Implementamos chatbots, agentes IA y automatizaciones que captan clientes mientras tu equipo se centra en lo que realmente aporta valor.",
    problemText: [
      `Málaga vive un boom económico sin precedentes: polo tecnológico, capital cultural y destino turístico de primer nivel. Pero esa misma bonanza ha disparado la competencia local. Más del <strong class="text-foreground">67% de las consultas comerciales en Málaga se pierden</strong> porque el negocio no responde en los primeros 10 minutos. Cada WhatsApp ignorado, cada formulario sin atender y cada llamada perdida fuera de horario es un cliente que ya está hablando con la competencia.`,
      `Como agencia de IA en Málaga, vemos a diario el mismo patrón: equipos pequeños desbordados, mucho ruido digital y pocas herramientas conectadas entre sí. El CRM por un lado, WhatsApp Business por otro, el email por su cuenta y el calendario aparte. Resultado: tareas duplicadas, leads perdidos y dueños trabajando 12 horas para cubrir lo que un sistema bien montado haría solo.`,
      `Nuestro trabajo como <strong class="text-foreground">agencia de inteligencia artificial en Málaga</strong> es montar la capa de automatización que falta. Chatbots IA en WhatsApp, agentes que cualifican leads, flujos n8n que conectan todo y dashboards que te dicen qué funciona. Sin humo, con resultados medibles desde la primera semana.`,
    ],
    ctaFinalHeadline: "¿Buscas una agencia IA en Málaga?",
    ctaFinalText: "Solicita una auditoría gratuita. Analizamos tu negocio en Málaga, detectamos las oportunidades reales de automatización y te entregamos un plan claro con coste, plazos e impacto esperado. Sin compromiso.",
    faqItems: baseFaq("Málaga"),
    industryDescriptions: {
      restaurants: "Reservas automáticas, pedidos online, recordatorios y reseñas. Ideal para restaurantes del Soho, centro histórico, Pedregalejo y Huelin.",
      beauty: "Citas automáticas, recordatorios anti no-show y campañas de fidelización para clínicas estéticas en Teatinos, Carretera de Cádiz y centro.",
      realEstate: "Cualificación automática de compradores e inquilinos, scraping de leads y respuestas multilingüe para inmobiliarias en Málaga capital.",
      gyms: "Inscripciones, renovaciones y comunicación personalizada para gimnasios y boxes de CrossFit en Málaga y área metropolitana.",
      consulting: "Captación, cualificación y agendamiento automático para consultoras, abogados y despachos profesionales de Málaga.",
    },
  },

  "agencia-ia-marbella": {
    slug: "agencia-ia-marbella",
    city: "Marbella",
    region: "Costa del Sol",
    seoTitle: "Agencia IA en Marbella | HydrAI Labs",
    metaDescription: "Agencia IA en Marbella: chatbots, agentes IA y automatizaciones premium para hoteles, clínicas, inmobiliarias y restaurantes. Auditoría gratuita.",
    keywords: "agencia IA Marbella, agencia inteligencia artificial Marbella, chatbot WhatsApp Marbella, agentes IA Marbella, automatización IA Marbella",
    heroSubline: "Agencia IA premium en Marbella. Construimos sistemas de automatización con inteligencia artificial para negocios que compiten al más alto nivel en la Milla de Oro y Puerto Banús.",
    problemText: [
      `Marbella es uno de los mercados más competitivos y exigentes de Europa. Clientes internacionales, ticket medio alto y una competencia local que invierte fuerte en digital. Aquí no basta con responder rápido: hay que responder en varios idiomas, en cualquier huso horario y con la calidad que el cliente premium espera. Los negocios que no automatizan pierden hasta el <strong class="text-foreground">67% de las oportunidades</strong>.`,
      `Como agencia de IA en Marbella vemos lo mismo en hoteles boutique, clínicas estéticas, restaurantes de la Milla de Oro e inmobiliarias de lujo: equipos saturados, conversaciones perdidas en WhatsApp y procesos manuales que no escalan en temporada alta. Y un denominador común: ningún sistema unificado que cualifique, derive y haga seguimiento de cada lead automáticamente.`,
      `Nuestro enfoque como <strong class="text-foreground">agencia de inteligencia artificial en Marbella</strong> es montar la capa de automatización que el negocio premium necesita: chatbots multilingües, agentes IA que cualifican según presupuesto y urgencia, integración con CRMs (HubSpot, Salesforce, Zoho) y flujos n8n que orquestan todo el ciclo de venta.`,
    ],
    ctaFinalHeadline: "¿Buscas una agencia IA en Marbella?",
    ctaFinalText: "Solicita una auditoría gratuita. Analizamos tu negocio en Marbella, identificamos las oportunidades de automatización con mayor impacto y te entregamos un plan personalizado. Sin compromiso, sin coste inicial.",
    faqItems: baseFaq("Marbella"),
    industryDescriptions: {
      restaurants: "Reservas automáticas y respuestas multilingües para restaurantes en Puerto Banús, centro de Marbella y la Milla de Oro.",
      beauty: "Citas automáticas, recordatorios y fidelización para clínicas estéticas y centros wellness premium de Marbella.",
      realEstate: "Cualificación de compradores internacionales y respuestas multilingüe para inmobiliarias de lujo en la Costa del Sol.",
      gyms: "Inscripciones, renovaciones y seguimiento de miembros para gimnasios y centros deportivos de Marbella.",
      consulting: "Captación, cualificación y agendamiento automático para consultoras y servicios profesionales de la zona.",
    },
  },

  "agencia-ia-fuengirola": {
    slug: "agencia-ia-fuengirola",
    city: "Fuengirola",
    region: "Costa del Sol",
    seoTitle: "Agencia IA en Fuengirola | HydrAI Labs",
    metaDescription: "Agencia IA en Fuengirola: chatbots WhatsApp, agentes IA y automatizaciones para restaurantes, clínicas, gimnasios e inmobiliarias. Auditoría gratuita.",
    keywords: "agencia IA Fuengirola, agencia inteligencia artificial Fuengirola, chatbot WhatsApp Fuengirola, agentes IA Fuengirola, automatización IA Fuengirola",
    heroSubline: "Agencia IA en Fuengirola para negocios locales que quieren automatizar la atención al cliente, captar más leads y liberar al equipo de tareas repetitivas.",
    problemText: [
      `Fuengirola combina turismo internacional, residentes europeos y un tejido empresarial local muy activo. Esta mezcla genera un volumen alto de consultas en varios idiomas y por múltiples canales. La mayoría de negocios locales no llegan a atenderlo bien: pierden hasta el <strong class="text-foreground">67% de las ventas potenciales</strong> por respuestas tardías o inexistentes.`,
      `Restaurantes del paseo marítimo, clínicas estéticas, inmobiliarias en Los Boliches y gimnasios del centro comparten el mismo cuello de botella: equipos pequeños, muchos canales, cero automatización. Sin un sistema centralizado que cualifique y responda en segundos, el cliente se va al siguiente resultado de Google.`,
      `Como <strong class="text-foreground">agencia de IA en Fuengirola</strong> implementamos chatbots WhatsApp 24/7, agentes IA que cualifican y derivan, y automatizaciones n8n que conectan tu negocio con CRM, calendario, email y herramientas internas. Implementación en 5-10 días.`,
    ],
    ctaFinalHeadline: "¿Buscas una agencia IA en Fuengirola?",
    ctaFinalText: "Solicita una auditoría de automatización gratuita. Analizamos tu negocio en Fuengirola y te entregamos un plan claro de IA con coste, plazos e impacto esperado.",
    faqItems: baseFaq("Fuengirola"),
    industryDescriptions: {
      restaurants: "Reservas automáticas y reseñas para restaurantes del paseo marítimo, Los Boliches y centro de Fuengirola.",
      beauty: "Citas y recordatorios automáticos para clínicas estéticas y centros de belleza en Fuengirola.",
      realEstate: "Cualificación automática de compradores y respuestas multilingüe para inmobiliarias en Fuengirola y Mijas Costa.",
      gyms: "Inscripciones, renovaciones y comunicación personalizada para gimnasios y boxes de Fuengirola.",
      consulting: "Captación y agendamiento automático para profesionales y consultoras locales.",
    },
  },

  "agencia-ia-estepona": {
    slug: "agencia-ia-estepona",
    city: "Estepona",
    region: "Costa del Sol",
    seoTitle: "Agencia IA en Estepona | HydrAI Labs",
    metaDescription: "Agencia IA en Estepona: chatbots, agentes IA y automatizaciones para restaurantes, clínicas, inmobiliarias y servicios locales. Auditoría gratuita.",
    keywords: "agencia IA Estepona, agencia inteligencia artificial Estepona, chatbot WhatsApp Estepona, agentes IA Estepona, automatización IA Estepona",
    heroSubline: "Agencia IA en Estepona para negocios que quieren competir con sistemas de automatización de nivel premium sin estructuras de gran empresa.",
    problemText: [
      `Estepona es uno de los mercados de mayor crecimiento de la Costa del Sol. Clientes internacionales con poder adquisitivo, una oferta hostelera y residencial cada vez más sofisticada y una competencia que invierte fuerte en digital. En este entorno, no responder rápido cuesta dinero: hasta el <strong class="text-foreground">67% de las oportunidades comerciales</strong> se pierden por falta de respuesta inmediata.`,
      `Restaurantes del casco antiguo, clínicas estéticas, inmobiliarias premium y servicios profesionales de Estepona necesitan herramientas que estén a la altura del cliente al que sirven. Y eso no se consigue con WhatsApp manual y un Excel: requiere una capa de automatización con IA que trabaje 24/7 en varios idiomas.`,
      `Como <strong class="text-foreground">agencia de IA en Estepona</strong> diseñamos e implementamos chatbots WhatsApp, agentes IA y flujos n8n que se integran con tu CRM, calendario y herramientas internas. Sin código por tu parte, con resultados medibles desde la primera semana.`,
    ],
    ctaFinalHeadline: "¿Buscas una agencia IA en Estepona?",
    ctaFinalText: "Solicita una auditoría de automatización gratuita. Analizamos tu negocio en Estepona y te entregamos un plan personalizado de IA con coste, plazos e impacto esperado.",
    faqItems: baseFaq("Estepona"),
    industryDescriptions: {
      restaurants: "Reservas automáticas y gestión de reseñas para restaurantes del casco antiguo, paseo marítimo y urbanizaciones de Estepona.",
      beauty: "Agendamiento automático y recordatorios para clínicas estéticas y centros de belleza en Estepona.",
      realEstate: "Cualificación automática de compradores internacionales para inmobiliarias premium de Estepona y costa occidental.",
      gyms: "Gestión de inscripciones y renovaciones para gimnasios y centros deportivos de Estepona.",
      consulting: "Captación, cualificación y agendamiento para consultoras y profesionales locales.",
    },
  },

  "automatizacion-ia-costa-del-sol": {
    slug: "automatizacion-ia-costa-del-sol",
    city: "Costa del Sol",
    region: "Andalucía",
    seoTitle: "Automatización IA en Costa del Sol | HydrAI Labs",
    metaDescription: "Automatización con inteligencia artificial para negocios en Costa del Sol. Chatbots WhatsApp, agentes IA y flujos n8n para hostelería, real estate y clínicas.",
    keywords: "automatización IA Costa del Sol, agencia IA Costa del Sol, agentes IA Costa del Sol, chatbots WhatsApp Costa del Sol, automatización procesos Costa del Sol",
    heroSubline: "Automatización con IA para negocios locales en toda la Costa del Sol. De Torremolinos a Estepona: chatbots, agentes IA y flujos n8n que captan clientes mientras tú duermes.",
    problemText: [
      `La Costa del Sol concentra más de 13 millones de turistas al año, una comunidad internacional permanente y un tejido empresarial extremadamente competitivo. Los negocios que no automatizan pierden hasta el <strong class="text-foreground">67% de las oportunidades comerciales</strong> simplemente porque no responden a tiempo. La estacionalidad amplifica el problema: en temporada alta el equipo no llega, en baja cada lead cuenta el doble.`,
      `Hoteles, chiringuitos, clínicas estéticas, agencias inmobiliarias de lujo, restaurantes y gimnasios comparten un mismo dolor: gestionan sus comunicaciones de forma manual y multicanal. WhatsApp por aquí, formularios por allá, llamadas que no se cogen y un CRM que casi nadie actualiza. El resultado son leads perdidos y dueños quemados.`,
      `La <strong class="text-foreground">automatización con inteligencia artificial</strong> es la única forma realista de escalar la atención al cliente y la captación de leads sin disparar la nómina. Chatbots WhatsApp 24/7 multilingües, agentes IA que cualifican según intención y presupuesto, flujos n8n que conectan todo y dashboards que te dicen qué funciona.`,
    ],
    ctaFinalHeadline: "¿Listo para automatizar tu negocio en Costa del Sol?",
    ctaFinalText: "Solicita una auditoría gratuita. Analizamos tu operativa, identificamos las oportunidades de automatización con mayor ROI y te entregamos un plan claro. Sin compromiso, sin coste, con resultados medibles.",
    faqItems: baseFaq("la Costa del Sol"),
    industryDescriptions: {
      restaurants: "Reservas automáticas, pedidos online y reseñas multilingüe para chiringuitos y restaurantes de toda la costa.",
      beauty: "Citas automáticas y fidelización para clínicas estéticas y centros wellness con clientela internacional.",
      realEstate: "Cualificación automática de compradores internacionales y seguimiento de propiedades de lujo en toda la Costa del Sol.",
      gyms: "Inscripciones estacionales, seguimiento de miembros y renovaciones automáticas para centros deportivos.",
      consulting: "Captación multilingüe, agendamiento y automatización de procesos para consultoras y servicios profesionales.",
    },
  },
};
