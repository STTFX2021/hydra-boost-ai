import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ChatWidgetWorld } from "@/components/landing/ChatWidgetWorld";
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
// Service pages
import ChatbotsIA from "./pages/servicios/ChatbotsIA";
import Automatizaciones from "./pages/servicios/Automatizaciones";
import PedidosRestaurantes from "./pages/servicios/PedidosRestaurantes";
// Sector pages
import SectorRestaurantes from "./pages/sectores/Restaurantes";
import SectorInmobiliarias from "./pages/sectores/Inmobiliarias";
import SectorClinicasEstetica from "./pages/sectores/ClinicasEstetica";

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
            <Route path="/industrias" element={<Industrias />} />
            <Route path="/arquitectura" element={<Arquitectura />} />
            <Route path="/precios" element={<Precios />} />
            <Route path="/casos" element={<Casos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/blog" element={<Blog />} />
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
          {/* Global Chatbot - only one across all pages */}
          <ChatWidgetWorld />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
