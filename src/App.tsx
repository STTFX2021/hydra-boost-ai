import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SmartChatbot } from "@/components/smart-chatbot/SmartChatbot";
import { WhatsAppButton } from "@/components/ux/WhatsAppButton";
import { ExitIntentPopup } from "@/components/ux/ExitIntentPopup";
import { ScrollProgressBar } from "@/components/ux/ScrollProgressBar";
import { MobileStickyCTA } from "@/components/ux/MobileStickyCAT";
import { ProtectedAdminRoute } from "@/components/ProtectedAdminRoute";
import Index from "./pages/Index";
import Servicios from "./pages/Servicios";
import Industrias from "./pages/Industrias";
import Precios from "./pages/Precios";
import Casos from "./pages/Casos";
import Contacto from "./pages/Contacto";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Auditoria from "./pages/Auditoria";
import AuditoriaGratis from "./pages/AuditoriaGratis";
import AuditoriaSelector from "./pages/AuditoriaSelector";
import AuditoriaLocal from "./pages/AuditoriaLocal";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import Privacidad from "./pages/legal/Privacidad";
import Terminos from "./pages/legal/Terminos";
import Cookies from "./pages/legal/Cookies";
import Inversores from "./pages/Inversores";
import NotFound from "./pages/NotFound";
import Arquitectura from "./pages/Arquitectura";
import AgentesIA from "./pages/AgentesIA";
// Service pages
import ChatbotsIA from "./pages/servicios/ChatbotsIA";
import Automatizaciones from "./pages/servicios/Automatizaciones";
import PedidosRestaurantes from "./pages/servicios/PedidosRestaurantes";
// Sector pages
import SectorRestaurantes from "./pages/sectores/Restaurantes";
import SectorInmobiliarias from "./pages/sectores/Inmobiliarias";
import SectorClinicasEstetica from "./pages/sectores/ClinicasEstetica";
import SectorGimnasios from "./pages/sectores/Gimnasios";
import AIAutomationMarbella from "./pages/AIAutomationMarbella";
import AIAutomationMalaga from "./pages/AIAutomationMalaga";
import AIAutomationCostadelSol from "./pages/AIAutomationCostadelSol";
import AIAutomationEstepona from "./pages/AIAutomationEstepona";
import AIAutomationFuengirola from "./pages/AIAutomationFuengirola";
import AIAutomationBenalmadena from "./pages/AIAutomationBenalmadena";
import AIAutomationTorremolinos from "./pages/AIAutomationTorremolinos";
// Blog article pages
import ChatbotWhatsappRestaurante from "./pages/blog/ChatbotWhatsappRestaurante";
import ScrapingLeadsInmobiliaria from "./pages/blog/ScrapingLeadsInmobiliaria";
import AutomatizacionIANegocioLocal from "./pages/blog/AutomatizacionIANegocioLocal";
import ChatbotVsPersona from "./pages/blog/ChatbotVsPersona";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/servicios/chatbots-ia" element={<ChatbotsIA />} />
            <Route path="/servicios/automatizaciones" element={<Automatizaciones />} />
            <Route path="/servicios/pedidos-online-restaurantes" element={<PedidosRestaurantes />} />
            <Route path="/sectores/restaurantes" element={<SectorRestaurantes />} />
            <Route path="/sectores/inmobiliarias" element={<SectorInmobiliarias />} />
            <Route path="/sectores/clinicas-estetica" element={<SectorClinicasEstetica />} />
            <Route path="/sectores/gimnasios" element={<SectorGimnasios />} />
            <Route path="/ai-automation-marbella" element={<AIAutomationMarbella />} />
            <Route path="/ai-automation-malaga" element={<AIAutomationMalaga />} />
            <Route path="/ai-automation-costa-del-sol" element={<AIAutomationCostadelSol />} />
            <Route path="/ai-automation-estepona" element={<AIAutomationEstepona />} />
            <Route path="/ai-automation-fuengirola" element={<AIAutomationFuengirola />} />
            <Route path="/ai-automation-benalmadena" element={<AIAutomationBenalmadena />} />
            <Route path="/ai-automation-torremolinos" element={<AIAutomationTorremolinos />} />
            <Route path="/industrias" element={<Industrias />} />
            <Route path="/arquitectura" element={<Arquitectura />} />
            <Route path="/agentes-ia" element={<AgentesIA />} />
            <Route path="/precios" element={<Precios />} />
            <Route path="/casos" element={<Casos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/chatbot-whatsapp-restaurante" element={<ChatbotWhatsappRestaurante />} />
            <Route path="/blog/scraping-leads-inmobiliaria" element={<ScrapingLeadsInmobiliaria />} />
            <Route path="/blog/automatizacion-ia-negocio-local" element={<AutomatizacionIANegocioLocal />} />
            <Route path="/blog/chatbot-vs-persona-atencion-cliente" element={<ChatbotVsPersona />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/auditoria" element={<Auditoria />} />
            <Route path="/auditoria-gratis" element={<AuditoriaGratis />} />
            <Route path="/auditoria-selector" element={<AuditoriaSelector />} />
            <Route path="/auditoria-local" element={<AuditoriaLocal />} />
            <Route path="/inversores" element={<Inversores />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/*" element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            } />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Global Smart Chatbot */}
          <SmartChatbot />
          {/* UX Improvements */}
          <WhatsAppButton />
          <ExitIntentPopup />
          <ScrollProgressBar />
          <MobileStickyCTA />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
