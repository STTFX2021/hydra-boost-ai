# CLAUDE.md - HydrAI Labs Codebase Guide

This document provides essential context for AI assistants working with the HydrAI Labs codebase.

## Project Overview

**HydrAI Labs** is a Spanish-language (es-ES) marketing website and lead management platform for an AI automation agency. The platform offers chatbots, automation solutions, and AI-powered tools for local businesses (restaurants, clinics, real estate).

## Tech Stack

| Category | Technology |
|----------|------------|
| Build Tool | Vite 5 |
| Framework | React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS 3 + CSS Variables |
| UI Components | shadcn/ui (Radix primitives) |
| State Management | Zustand, TanStack Query |
| Backend | Supabase (Auth, Database, Edge Functions) |
| Animations | Framer Motion |
| Routing | React Router DOM 6 |
| Forms | React Hook Form + Zod |
| SEO | react-helmet-async |

## Project Structure

```
hydra-boost-ai/
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives (button, card, dialog, etc.)
│   │   ├── layout/             # Header, Footer, PageLayout
│   │   ├── landing/            # Homepage sections (Hero, Process, TechStack, etc.)
│   │   ├── pricing/            # Pricing page components
│   │   ├── diagnostic/         # Diagnostic form & results
│   │   ├── hydrai-navigator/   # AI chat assistant widget (Alex)
│   │   └── seo/                # SEOHead, SchemaOrg
│   ├── pages/
│   │   ├── admin/              # Protected admin dashboard
│   │   ├── legal/              # Privacy, Terms, Cookies
│   │   ├── sectores/           # Industry-specific landing pages
│   │   └── servicios/          # Service-specific pages
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities (cn, constants, i18n)
│   ├── integrations/supabase/  # Supabase client & auto-generated types
│   ├── data/                   # Static data (cases, testimonials)
│   └── assets/                 # Static assets
├── supabase/
│   ├── functions/              # Deno Edge Functions
│   │   ├── navigator-chat/     # AI chat endpoint (uses Lovable API Gateway)
│   │   ├── contact-submit/     # Contact form handler
│   │   └── send-lead-notification/
│   └── migrations/             # Database migrations
├── public/                     # Static files (sitemap.xml, robots.txt, images)
└── docs/                       # Documentation (migration guides)
```

## Key Conventions

### Path Aliases

Use `@/` for imports from `src/`:
```typescript
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
```

### Component Patterns

1. **UI Components**: Use shadcn/ui from `@/components/ui/`. These are Radix-based and styled with Tailwind.

2. **Page Components**: Located in `src/pages/`, wrapped with `PageLayout` for consistent header/footer.

3. **Index Exports**: Most component folders have `index.ts` barrel exports:
   ```typescript
   // src/components/landing/index.ts
   export { HeroSection } from './HeroSection';
   export { ProcessSection } from './ProcessSection';
   ```

### Styling

- **Tailwind CSS** with custom design tokens defined in `src/index.css`
- **CSS Variables** for theming (HSL-based colors)
- **Design System**: Dark premium neon theme
  - Primary: Cyan (`hsl(185 100% 50%)`)
  - Secondary: Purple (`hsl(280 100% 60%)`)
  - Accent: Magenta (`hsl(320 100% 55%)`)
- **Utility function**: Always use `cn()` for conditional classes:
  ```typescript
  import { cn } from "@/lib/utils";
  <div className={cn("base-class", isActive && "active-class")} />
  ```

### Fonts

- **Display**: Space Grotesk (headings)
- **Body**: Inter (text)

### State Management

1. **TanStack Query**: For server state (Supabase data fetching)
2. **Zustand**: For client state (navigator widget state)
3. **React Hook Form + Zod**: For form validation

### Supabase Integration

- **Client**: `@/integrations/supabase/client.ts`
- **Types**: Auto-generated in `@/integrations/supabase/types.ts`
- **Environment Variables**:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`

### Database Schema (Key Tables)

| Table | Purpose |
|-------|---------|
| `leads` | Lead management (name, email, status, score) |
| `assessments` | Diagnostic assessment results |
| `blog_posts` | Blog content |
| `contact_submissions` | Contact form entries |
| `user_roles` | Admin role assignments |
| `testimonials` | Customer testimonials |

### Enums

```typescript
lead_status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost"
lead_priority: "high" | "medium" | "low"
app_role: "admin" | "editor" | "user"
```

## Development Commands

```bash
# Install dependencies
npm install

# Development server (port 8080)
npm run dev

# Production build
npm run build

# Development build
npm run build:dev

# Preview production build
npm run preview

# Lint
npm run lint
```

## Key Features

### 1. HydrAI Navigator (Alex)

An AI-powered chat assistant widget (`src/components/hydrai-navigator/`):
- Floating button on all pages
- Multi-step flow: mission selection → business info → recommendations
- Uses Supabase Edge Function (`navigator-chat`) with Gemini Flash via Lovable API Gateway
- Persona: "Alex" - Senior Solutions Architect at HydrAI Labs

### 2. Diagnostic System

Self-assessment flow for leads (`src/components/diagnostic/`, `src/pages/Auditoria.tsx`):
- Multi-step questionnaire
- Score calculation and recommendations
- Stores results in `assessments` table

### 3. Admin Dashboard

Protected route at `/admin/*`:
- Lead management
- Blog post editor
- Assessment viewer
- Settings

Protected by `useAdmin` hook and `ProtectedAdminRoute` component.

### 4. SEO Implementation

- `SEOHead` component with react-helmet-async
- Schema.org structured data (`SchemaOrg` component)
- Static `sitemap.xml` and `robots.txt`
- Canonical URLs per page

## Supabase Edge Functions

Located in `supabase/functions/`, written in Deno:

```typescript
// Example: navigator-chat/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  // CORS headers
  // AI API call via Lovable Gateway
  // Return JSON response
});
```

**Required secrets**: `LOVABLE_API_KEY` for AI gateway access.

## Important Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Root component, routing configuration |
| `src/index.css` | CSS variables, design tokens, base styles |
| `tailwind.config.ts` | Tailwind theme extensions |
| `components.json` | shadcn/ui configuration |
| `src/lib/constants.ts` | App-wide constants (URLs, links) |
| `src/lib/i18n.ts` | Spanish translations/content |

## Content Language

All user-facing content is in **Spanish (es-ES)**. Keep this consistent when:
- Adding UI text
- Writing error messages
- Creating new pages
- Modifying form labels

## Testing

No test framework is currently configured. When adding tests:
- Consider Vitest (Vite-native)
- React Testing Library for component tests

## Common Tasks

### Adding a New Page

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Use `PageLayout` wrapper
4. Add `SEOHead` with appropriate metadata

### Adding a UI Component

```bash
npx shadcn@latest add [component-name]
```

Components install to `src/components/ui/`.

### Working with Supabase Types

Types are auto-generated. To use:
```typescript
import { Tables } from "@/integrations/supabase/types";

type Lead = Tables<"leads">;
```

### Adding Edge Functions

1. Create folder in `supabase/functions/[function-name]/`
2. Add `index.ts` with Deno server
3. Deploy via Supabase CLI or Lovable

## Notes for AI Assistants

1. **Preserve Spanish content**: Don't translate Spanish UI text to English
2. **Respect the design system**: Use existing CSS variables and Tailwind classes
3. **Use shadcn/ui patterns**: Check `src/components/ui/` before creating custom components
4. **Follow barrel exports**: Add exports to `index.ts` files when creating new components
5. **Type safety**: Leverage Supabase auto-generated types
6. **Keep animations subtle**: Use Framer Motion patterns from existing components
7. **Environment variables**: Prefix with `VITE_` for client-side access

## Future Considerations

- Migration to Next.js for SSR (see `docs/MIGRACION-NEXTJS.md`)
- Test coverage implementation
- Performance monitoring integration
