import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Entregas from "./pages/Entregas";
import NotasEmpenho from "./pages/NotasEmpenho";
import Configuracoes from "./pages/Configuracoes";
import CadastroEntrega from "./pages/CadastroEntrega";
import CadastroNotaEmpenho from "./pages/CadastroNotaEmpenho";
import Login from "./pages/Login";
import Relatorios from "./pages/Relatorios";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          <Route path="/entregas" element={<Entregas />} />
          <Route path="/nova-entrega" element={<CadastroEntrega />} />
          <Route path="/notas" element={<NotasEmpenho />} />
          <Route path="/nova-nota" element={<CadastroNotaEmpenho />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/relatorios" element={<Relatorios />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;