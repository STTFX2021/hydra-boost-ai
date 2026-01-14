import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HydrAINavigator } from "@/components/hydrai-navigator/HydrAINavigator";
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
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import Privacidad from "./pages/legal/Privacidad";
import Terminos from "./pages/legal/Terminos";
import Cookies from "./pages/legal/Cookies";
import Inversores from "./pages/Inversores";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/industrias" element={<Industrias />} />
          <Route path="/precios" element={<Precios />} />
          <Route path="/casos" element={<Casos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/auditoria" element={<Auditoria />} />
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
        <HydrAINavigator />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
