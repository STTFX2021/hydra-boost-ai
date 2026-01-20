# Guía de Migración a Next.js con SSR

## Resumen

Este proyecto está optimizado al máximo dentro de React+Vite. Para SSR real (Server-Side Rendering), necesitarás migrar a Next.js externamente.

## Lo que ya está implementado (Lovable)

✅ **SEO Técnico:**
- Metadata dinámica por ruta (react-helmet-async)
- Schema.org (Organization, LocalBusiness, Service, FAQPage)
- sitemap.xml y robots.txt estáticos
- Canonical URLs por página
- Open Graph y Twitter Cards

✅ **Estructura de URLs:**
- /servicios/chatbots-ia
- /servicios/automatizaciones
- /servicios/pedidos-online-restaurantes
- /sectores/restaurantes
- /sectores/inmobiliarias
- /sectores/clinicas-estetica
- /auditoria-gratis

✅ **Contenido SEO:**
- H1 único por página
- Jerarquía H2/H3 correcta
- FAQs con Schema
- Keywords en meta tags

## Lo que falta para SSR completo (Next.js)

### 1. Estructura de proyecto Next.js

```
app/
├── layout.tsx          # Root layout con metadata
├── page.tsx            # Home (/)
├── servicios/
│   ├── page.tsx        # /servicios
│   ├── chatbots-ia/
│   │   └── page.tsx    # SSG
│   └── automatizaciones/
│       └── page.tsx    # SSG
├── sectores/
│   ├── restaurantes/
│   │   └── page.tsx    # SSG
│   └── ...
└── api/
    └── leads/
        └── route.ts    # API Route para leads
```

### 2. Metadata por ruta (Next.js)

```typescript
// app/servicios/chatbots-ia/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chatbots IA para Negocios | HydrAI Labs',
  description: 'Implementamos chatbots con IA que responden 24/7...',
  openGraph: { ... },
  alternates: {
    canonical: 'https://hydrailabs.com/servicios/chatbots-ia',
  },
};
```

### 3. Sitemap dinámico (Next.js)

```typescript
// app/sitemap.ts
export default async function sitemap() {
  const pages = [
    { url: 'https://hydrailabs.com/', lastModified: new Date() },
    { url: 'https://hydrailabs.com/servicios', lastModified: new Date() },
    // ...
  ];
  
  // También puedes añadir posts del blog dinámicamente
  const posts = await fetchBlogPosts();
  
  return [...pages, ...posts.map(post => ({
    url: `https://hydrailabs.com/blog/${post.slug}`,
    lastModified: post.updatedAt,
  }))];
}
```

### 4. API Routes para leads

```typescript
// app/api/leads/route.ts
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  const data = await request.json();
  
  // Validación honeypot
  if (data.website) {
    return Response.json({ error: 'Spam detected' }, { status: 400 });
  }
  
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
  
  const { error } = await supabase.from('leads').insert(data);
  
  if (error) {
    return Response.json({ error: 'Failed to save' }, { status: 500 });
  }
  
  return Response.json({ ok: true });
}
```

### 5. Pasos de migración

1. **Crear proyecto Next.js:**
   ```bash
   npx create-next-app@latest hydrailabs-next --typescript --tailwind --app
   ```

2. **Copiar componentes:**
   - `src/components/ui/*` → `components/ui/*`
   - `src/components/seo/*` → `components/seo/*`
   - Adaptar imports

3. **Migrar páginas:**
   - Convertir cada página a Server Component
   - Añadir `export const metadata` en lugar de `<SEOHead>`

4. **Configurar Supabase:**
   - Variables de entorno en `.env.local`
   - Cliente para server y client components

5. **Deploy en Vercel:**
   ```bash
   vercel --prod
   ```

### 6. Checklist pre-deploy

- [ ] Metadata en todas las rutas
- [ ] sitemap.ts dinámico
- [ ] robots.ts configurado
- [ ] Imágenes con next/image
- [ ] API routes con rate limiting
- [ ] Headers de seguridad en next.config.js

## Conclusión

Con la implementación actual en Lovable tienes ~80% del SEO técnico cubierto. La migración a Next.js añadiría:
- HTML server-rendered (mejor para crawlers)
- Sitemap dinámico
- ISR para blog posts
- Mejor Time to First Byte
