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
    metaDescription: "Automatización IA para negocios en Torremolinos. Chatbots 24/7, automatización de procesos, captación automática de clientes y CRM inteligente para empresas locales.",
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
};
