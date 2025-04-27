
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tenders from "./pages/Tenders";
import TenderDetails from "./pages/TenderDetails";
import CreateTender from "./pages/CreateTender";
import SubmitBid from "./pages/SubmitBid";
import MyBids from "./pages/MyBids";
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
          <Route path="/tenders" element={<Tenders />} />
          <Route path="/tenders/:id" element={<TenderDetails />} />
          <Route path="/tenders/:id/bid" element={<SubmitBid />} />
          <Route path="/create-tender" element={<CreateTender />} />
          <Route path="/my-bids" element={<MyBids />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
