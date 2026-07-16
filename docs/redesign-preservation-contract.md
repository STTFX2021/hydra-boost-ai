# HydrAI Labs conversational redesign — preservation contract

Branch: `work/hydrailabs-conversational-redesign-20260716`

## Must remain operational

- All existing public routes and SEO landing pages in `src/App.tsx`.
- `/contacto` and its current submission pipeline:
  - `contact_submissions` insert.
  - Supabase Edge Function `contact-submit`.
  - Supabase Edge Function `lead-intake`.
  - WhatsApp fallback to `https://wa.me/34634425921`.
  - Email `hola@hydrailabs.com`.
- Global navigation helpers and current conversion components unless replaced with an equivalent tested implementation.
- Vozra Rapid / Sarah demonstrations:
  - Public demo: `https://vozra-direct-demo.lovable.app`.
  - Product label: `Vozra Rapid — Pedidos Inteligentes Directos`.
  - Visible CTA: `Habla con Sarah`.
  - Secondary CTA: `Haz que Sarah te llame` where the callback flow is available.
- HydrAI voice assistant integration where present:
  - ElevenLabs agent ID remains environment-driven and must not be hard-coded into new public components.

## Redesign scope

- Replace the home-page presentation with a focused conversational-intelligence proposition.
- Keep web development as the second commercial pillar.
- Rework `/casos` as projects and functional demonstrations without deleting the route.
- Add product-level pages without removing existing pages.
- Explain the Sarah pizzeria-ordering demo before opening it.

## Release gate

Before merge to `main`:

1. All previous routes resolve.
2. Contact form submissions reach the existing Supabase functions.
3. WhatsApp and email fallbacks work.
4. `Habla con Sarah` reaches the current Vozra Rapid demo or embedded voice experience.
5. `npm run lint`, `npm run build`, and the route smoke test pass.
6. No unverified production claims, testimonials, or metrics are introduced.
