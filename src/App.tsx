
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CustomCursor from "./components/ui/CustomCursor";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Tenders from "./pages/Tenders";
import TenderDetails from "./pages/TenderDetails";
import CreateTender from "./pages/CreateTender";
import SubmitBid from "./pages/SubmitBid";
import MyBids from "./pages/MyBids";
import ManageOfficers from "./pages/ManageOfficers";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CustomCursor />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes for all authenticated users */}
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/tenders" element={
              <ProtectedRoute>
                <Tenders />
              </ProtectedRoute>
            } />
            <Route path="/tenders/:id" element={
              <ProtectedRoute>
                <TenderDetails />
              </ProtectedRoute>
            } />
            
            {/* Bidder-specific routes */}
            <Route path="/tenders/:id/bid" element={
              <ProtectedRoute allowedRoles={["bidder"]}>
                <SubmitBid />
              </ProtectedRoute>
            } />
            <Route path="/my-bids" element={
              <ProtectedRoute allowedRoles={["bidder"]}>
                <MyBids />
              </ProtectedRoute>
            } />
            
            {/* Admin and Officer routes */}
            <Route path="/create-tender" element={
              <ProtectedRoute allowedRoles={["admin", "officer"]}>
                <CreateTender />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute allowedRoles={["admin", "officer"]}>
                <Reports />
              </ProtectedRoute>
            } />
            
            {/* Admin-only routes */}
            <Route path="/manage-officers" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageOfficers />
              </ProtectedRoute>
            } />
            
            {/* Not found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
