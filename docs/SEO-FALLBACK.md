# SEO Fallback - Documentación Técnica

## Estado Actual

### ✅ Implementado en Lovable (React + Vite)

1. **SEOHead Component**: Metadata dinámica por ruta
   - `<title>` único por página
   - `<meta name="description">` única
   - Canonical URLs completas
   - Open Graph (og:title, og:description, og:image, og:url)
   - Twitter Cards
   - Keywords

2. **Schema.org JSON-LD**:
   - Organization (site-wide)
   - LocalBusiness (servicios)
   - Service (páginas de servicio)
   - FAQPage (secciones FAQ)
   - BreadcrumbList (navegación)
   - WebPage (páginas generales)

3. **Archivos Estáticos**:
   - `/sitemap.xml` - Todas las rutas indexables
   - `/robots.txt` - Reglas de crawling
   - `/og-image.png` - Imagen OG por defecto

4. **Estructura Semántica**:
   - 1 H1 por página
   - H2/H3 jerárquicos
   - Texto visible suficiente

---

## ⚠️ Limitación: Pre-rendering no disponible

### El Problema

En Lovable (React SPA), el HTML inicial solo contiene:

```html
<!DOCTYPE html>
<html>
  <head><!-- scripts --></head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

El contenido real (H1, texto, metadata) se inyecta vía JavaScript. Aunque `react-helmet-async` actualiza el `<head>` dinámicamente, **Google puede tener problemas indexando contenido JS-dependiente**.

### Por qué vite-plugin-prerender no funciona en Lovable

1. **Build process limitado**: Lovable controla el proceso de build
2. **Hosting dinámico**: No se sirven archivos HTML estáticos pre-generados
3. **SPA routing**: El servidor siempre sirve `index.html`

---

## 🔧 Soluciones Recomendadas

### Opción A: SEO Site Externo (Recomendado para máximo SEO)

Crear un sitio estático separado para las páginas de marketing:

**Stack recomendado**:
- **Next.js 14+ (App Router)** con SSG/SSR
- **Astro** (100% estático, ideal para SEO)
- Deploy en Vercel o Netlify

**Rutas a migrar**:
```
/ (Home)
/servicios
/servicios/chatbots-ia
/servicios/automatizaciones
/servicios/pedidos-online-restaurantes
/sectores/restaurantes
/sectores/inmobiliarias
/sectores/clinicas-estetica
/industrias
/precios
/casos
/blog
/blog/[slug]
/contacto
/auditoria-gratis
```

**Mantener en Lovable**:
```
/admin/* (dashboard interno)
/login
/auditoria (wizard interactivo)
```

**Arquitectura**:
```
hydrailabs.com (Next.js/Astro) → Páginas SEO
app.hydrailabs.com (Lovable) → Admin/Portal
```

### Opción B: Hybrid con Redirect

1. Deploy sitio SEO en subdominio: `www.hydrailabs.com`
2. Lovable en: `app.hydrailabs.com`
3. Configurar DNS para apuntar `hydrailabs.com` al sitio SEO

### Opción C: Servicio de Pre-rendering Externo

Usar servicios como:
- **Prerender.io**
- **Rendertron**
- **Puppeteer Cloud**

Configurar en el hosting para servir HTML pre-renderizado a bots.

---

## 📋 Checklist de Validación SEO

### Antes de Deploy

- [ ] Cada página tiene `<SEOHead>` con title y description únicos
- [ ] Schema.org JSON-LD presente en páginas clave
- [ ] Imágenes con alt text
- [ ] H1 único por página
- [ ] Canonical URLs configuradas
- [ ] sitemap.xml incluye todas las rutas
- [ ] robots.txt permite indexación

### Después de Deploy

- [ ] Google Search Console: Enviar sitemap
- [ ] Inspección de URL: Verificar renderizado
- [ ] Lighthouse SEO: Score > 90
- [ ] Rich Results Test: Validar schemas
- [ ] Mobile-Friendly Test: Pasar

### Herramientas de Testing

```bash
# Ver código fuente (lo que ve Google sin JS)
curl https://hydrailabs.com/servicios

# Testing local de schema
npx schema-dts-gen validate

# Lighthouse CLI
npx lighthouse https://hydrailabs.com --only-categories=seo
```

---

## 📊 Comparativa de Opciones

| Aspecto | Lovable Actual | Next.js SSG | Astro |
|---------|---------------|-------------|-------|
| SEO Score | 70-85 | 95-100 | 95-100 |
| Indexación | Parcial (JS) | Completa | Completa |
| Velocidad | Buena | Excelente | Excelente |
| Complejidad | Baja | Media | Baja |
| Mantenimiento | 1 repo | 2 repos | 2 repos |

---

## 🎯 Recomendación Final

Para **máximo SEO** con HydrAI Labs:

1. **Corto plazo**: Usar la implementación actual con react-helmet-async
2. **Medio plazo**: Monitorear indexación en Google Search Console
3. **Largo plazo**: Si hay problemas de indexación, migrar páginas de marketing a Next.js/Astro

La implementación actual es **suficiente para la mayoría de casos**, especialmente porque:
- Googlebot ejecuta JavaScript (aunque con delays)
- Las páginas tienen contenido único y bien estructurado
- El schema.org está correctamente implementado
