# Mejoras comerciales y visuales · Home HydrAI Labs

Tras revisar la home en vivo, detecto que el mensaje es correcto pero visualmente **falta jerarquía comercial, prueba social y remate emocional**. Se ve técnica, no vendedora. Propongo mejoras quirúrgicas manteniendo el estilo dark/cyan actual.

## Diagnóstico rápido

| Zona | Problema | Impacto |
|---|---|---|
| Hero | Titular ocupa 4 líneas, arte lateral casi vacío (líneas sueltas), sin prueba social sobre CTA | Baja conversión, se ve "beta" |
| Beneficios (4 iconos) | Muy pequeños, sin números | No transmite ROI |
| Logos "conectamos con..." | Texto plano, sin logos reales | Poco creíble |
| SENTRA | Sección técnica sin gancho comercial | El visitante no sabe qué comprar |
| VOZRA PID | Bloque plano, logo enorme, feature grid gris | No destaca el producto estrella |
| Servicios | Cards correctas pero sin precio "desde" ni resultado | No genera clic |
| Falta | Testimonios, casos con métricas, FAQ, CTA final potente | Sin cierre comercial |

## Mejoras propuestas (solo visual/copy, sin tocar backend)

### 1. Hero más comercial
- Titular más corto y con beneficio: **"Automatiza tu negocio con IA. En 7 días, 24/7."** + subtítulo actual.
- Badge superior de prueba social: `● +120 negocios automatizados · 4.9/5`.
- Sustituir el arte lateral (líneas sueltas) por un **mockup real**: tarjeta Vozra activa + tarjeta "Reserva confirmada" + tarjeta "Llamada resuelta 00:42" con animación sutil de entrada.
- CTA primario más grande con glow cyan; CTA secundario "Ver demo en 60s" con icono play.
- Debajo: mini-fila de avatares/logos de clientes + rating.

### 2. Barra de logos real
Reemplazar el texto plano por **logos SVG monocromo** (WhatsApp, Twilio, HubSpot, Google Calendar, Ringover, Zapier, Stripe) en escala de grises con hover cyan. Auto-scroll infinito lento.

### 3. Bloque de métricas (nuevo, tras hero)
Franja horizontal con 4 KPIs animados al hacer scroll:
`+120 negocios · 15h/semana ahorradas · 7 días setup · 4.9/5 satisfacción`.

### 4. SENTRA + VOZRA rediseñados
- **SENTRA**: mantener el orbital pero añadir 1 línea comercial: *"Un solo sistema para orquestar IA, datos y conversaciones."* + micro-CTA "Ver arquitectura".
- **VOZRA PID**: convertirlo en **card premium destacada** con borde gradiente cyan, badge "Producto estrella", 3 métricas reales ("responde en <2s · +40% reservas · 0 llamadas perdidas") y CTA "Escuchar demo de voz".

### 5. Servicios (4 cards)
- Añadir a cada card: **precio "desde X€"** o "a medida", **tiempo de entrega** ("7-14 días") y **1 resultado tipo** ("+35% leads").
- Hover: elevar card + glow cyan en el icono.
- Reemplazar "Saber más" por "Ver ejemplos →".

### 6. Casos de éxito (nueva sección)
Carrusel de 3 casos reales/plantilla con: logo del sector, 1 métrica grande ("+62% reservas"), quote de 1 línea, foto/avatar, sector. Fondo con radial cyan sutil.

### 7. Cómo trabajamos
- Añadir conector visual (línea con gradiente cyan) entre los 5 pasos.
- Iconos con contenedor cyan translúcido en lugar de círculo blanco.
- Añadir tiempo estimado bajo cada paso ("Día 1", "Día 2-3"...).

### 8. FAQ (nueva sección, antes del CTA)
Accordion con 6 preguntas comerciales típicas: precio, tiempo, integraciones, permanencia, soporte, propiedad de los datos. Reduce fricción antes de contactar.

### 9. CTA final potente
Rediseñar el bloque de cierre:
- Fondo con gradiente radial cyan/navy más intenso.
- Titular grande: **"¿Listo para que la IA trabaje por ti?"**
- Subtítulo: "Auditoría gratis de 30 min. Sin compromiso."
- 2 CTAs: "Reservar auditoría gratis" (primario cyan) + "WhatsApp directo" (outline).
- Debajo: garantías tipo iconos ("Sin permanencia · Setup en 7 días · Cancelas cuando quieras").

### 10. Micro-mejoras transversales
- **Tipografía**: aumentar tracking de títulos SENTRA / SOLUCIONES para look editorial.
- **Espaciados**: unificar `py-24` entre secciones (hoy alternan 16/20).
- **Motion**: fade+rise on scroll con `framer-motion` (ya instalado) en cada sección.
- **Sticky CTA sutil solo desktop** en scroll >50%: barra fina superior "Auditoría gratis en 7 días → Reservar".
- **Focus states y contraste**: reforzar accesibilidad en botones outline.

## Fuera de alcance
- No tocar backend, edge functions, formularios, rutas ni i18n.
- No cambiar la paleta ni las fuentes (Space Grotesk / Inter).
- No reintroducir popups, WhatsApp flotante, chatbot antiguo, sticky mobile ni progress bar (siguen desactivados).
- No modificar Sentra/Vozra/Servicios/Casos como páginas — solo la home `/` (`src/pages/Index.tsx` + nuevos subcomponentes en `src/components/landing/`).

## Archivos que se tocarían
- `src/pages/Index.tsx` (reestructura de secciones)
- `src/components/landing/` (nuevos: `HeroMockup.tsx`, `TrustLogos.tsx`, `KPIStrip.tsx`, `CasesCarousel.tsx`, `FAQHome.tsx`, `FinalCTA.tsx`)
- `src/index.css` (2-3 utilidades nuevas para glow/gradient border)

## Entrega sugerida (por fases, para validar rápido)
1. **Fase A (impacto alto)**: Hero + KPIs + logos reales + CTA final. *(1 iteración)*
2. **Fase B**: VOZRA premium card + Servicios con precio/tiempo + conector proceso. *(1 iteración)*
3. **Fase C**: Casos de éxito + FAQ + micro-motion. *(1 iteración)*

¿Apruebo y arranco por la **Fase A**, hago las **3 fases seguidas**, o prefieres que te muestre 3 direcciones visuales del nuevo Hero antes de tocar nada?
