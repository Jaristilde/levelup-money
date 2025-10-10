import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Home from "./pages/Home";
import Milestones from "./pages/Milestones";
import CreditReport from "./pages/CreditReport";
import DisputeLetter from "./pages/DisputeLetter";
import Budget from "./pages/Budget";
import Debt from "./pages/Debt";
import Goals from "./pages/Goals";
import Retirement from "./pages/Retirement";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/milestones" element={<Milestones />} />
            <Route path="/credit-report" element={<CreditReport />} />
            <Route path="/dispute-letter" element={<DisputeLetter />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/debt" element={<Debt />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/retirement" element={<Retirement />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
