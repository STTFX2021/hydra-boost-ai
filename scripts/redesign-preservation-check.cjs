const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const appSource = read('src/App.tsx');
const contactSource = read('src/pages/Contacto.tsx');

const requiredRoutes = [
  '/',
  '/servicios',
  '/servicios/chatbots-ia',
  '/servicios/automatizaciones',
  '/servicios/pedidos-online-restaurantes',
  '/sectores/restaurantes',
  '/sectores/inmobiliarias',
  '/sectores/clinicas-estetica',
  '/sectores/gimnasios',
  '/ai-automation-marbella',
  '/ai-automation-malaga',
  '/ai-automation-costa-del-sol',
  '/ai-automation-estepona',
  '/ai-automation-fuengirola',
  '/ai-automation-benalmadena',
  '/ai-automation-torremolinos',
  '/agencia-ia-malaga',
  '/agencia-ia-marbella',
  '/agencia-ia-fuengirola',
  '/agencia-ia-estepona',
  '/automatizacion-ia-costa-del-sol',
  '/chatbot-whatsapp-restaurantes-malaga',
  '/automatizacion-ia-clinicas-esteticas-malaga',
  '/agentes-ia-inmobiliarias-costa-del-sol',
  '/chatbot-ia-hoteles-marbella',
  '/automatizacion-ia-pymes-malaga',
  '/automatizacion-ia-restaurantes-costa-del-sol',
  '/automatizacion-ia-clinicas-costa-del-sol',
  '/automatizacion-ia-inmobiliarias-costa-del-sol',
  '/chatbots-whatsapp-negocios-locales',
  '/agentes-ia-voz-restaurantes',
  '/n8n-automatizaciones-empresas',
  '/automatizacion-ia-estepona',
  '/automatizacion-ia-marbella',
  '/automatizacion-ia-malaga',
  '/automatizacion-ia-fuengirola',
  '/ai-discoverability',
  '/eastern-europe-ai-automation-costa-del-sol',
  '/ru',
  '/ru/audit',
  '/ru/ai-automation-costa-del-sol',
  '/ru/ai-automation-restaurants',
  '/ru/whatsapp-chatbots',
  '/ru/voice-ai-agents-restaurants',
  '/industrias',
  '/arquitectura',
  '/agentes-ia',
  '/agentes-ia/:slug',
  '/precios',
  '/casos',
  '/contacto',
  '/blog',
  '/blog/chatbot-whatsapp-restaurante',
  '/blog/scraping-leads-inmobiliaria',
  '/blog/automatizacion-ia-negocio-local',
  '/blog/chatbot-vs-persona-atencion-cliente',
  '/blog/automatizar-reservas-restaurante-whatsapp',
  '/blog/agente-voz-ia-restaurantes-costa-del-sol',
  '/blog/chatbot-whatsapp-inmobiliarias-costa-del-sol',
  '/blog/automatizacion-ia-clinicas-recordatorios-citas',
  '/blog/negocios-costa-del-sol-clientes-perdidos-whatsapp',
  '/restaurantes-ia-reservas-whatsapp-costa-del-sol',
  '/blog/:slug',
  '/auditoria',
  '/auditoria-gratis',
  '/auditoria-selector',
  '/auditoria-local',
  '/inversores',
  '/login',
  '/admin/*',
  '/privacidad',
  '/terminos',
  '/cookies',
  '*',
];

const failures = [];
const passes = [];

function check(name, condition, detail) {
  if (condition) {
    passes.push(name);
  } else {
    failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
  }
}

for (const route of requiredRoutes) {
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  check(`Route preserved: ${route}`, new RegExp(`path=["']${escaped}["']`).test(appSource));
}

const contactRequirements = [
  ['Supabase table contact_submissions', 'contact_submissions'],
  ['Supabase function contact-submit', 'contact-submit'],
  ['Supabase function lead-intake', 'lead-intake'],
  ['WhatsApp fallback', 'https://wa.me/34634425921'],
  ['Contact email', 'hola@hydrailabs.com'],
  ['Contact validation', 'contactSchema.safeParse'],
];

for (const [name, token] of contactRequirements) {
  check(name, contactSource.includes(token));
}

const sourceFiles = [];
function collectSourceFiles(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) collectSourceFiles(fullPath);
    else if (/\.(ts|tsx|js|jsx|json|md)$/i.test(entry.name)) sourceFiles.push(fullPath);
  }
}
collectSourceFiles(path.join(root, 'src'));

const combinedSource = sourceFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const hasSarahLabel = /habla con sarah/i.test(combinedSource);
const hasVozraRapidReference = /vozra\s*rapid|pedidos inteligentes directos/i.test(combinedSource);

if (process.env.STRICT_SARAH === '1') {
  check('Sarah demo CTA present', hasSarahLabel, 'Expected visible copy “Habla con Sarah”');
  check('Vozra Rapid reference present', hasVozraRapidReference);
} else {
  console.log(`Sarah CTA audit: ${hasSarahLabel ? 'FOUND' : 'NOT FOUND (release blocker, not baseline failure)'}`);
  console.log(`Vozra Rapid audit: ${hasVozraRapidReference ? 'FOUND' : 'NOT FOUND (release blocker, not baseline failure)'}`);
}

console.log(`Preservation checks passed: ${passes.length}`);
if (failures.length) {
  console.error(`Preservation checks failed: ${failures.length}`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('PASS — existing routes and contact integrations are preserved.');
