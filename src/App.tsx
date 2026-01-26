import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// About pages
import AboutPage from "./pages/about/AboutPage";
import AnpgPage from "./pages/about/AnpgPage";
import HistoryPage from "./pages/about/HistoryPage";
import SocialResponsibilityPage from "./pages/about/SocialResponsibilityPage";
import ContactsPage from "./pages/ContactsPage";

// Opportunities pages
import OpportunitiesPage from "./pages/opportunities/OpportunitiesPage";
import Tender2025Page from "./pages/opportunities/Tender2025Page";
import PermanentOfferPage from "./pages/opportunities/PermanentOfferPage";
import Tender2023Page from "./pages/opportunities/Tender2023Page";

// E&P Data pages
import EpDataPage from "./pages/ep-data/EpDataPage";
import IonaPage from "./pages/ep-data/IonaPage";
import OasisPage from "./pages/ep-data/OasisPage";
import DataPackagesPage from "./pages/ep-data/DataPackagesPage";
import EpMapsPage from "./pages/ep-data/EpMapsPage";
import Conference2021Page from "./pages/ep-data/Conference2021Page";
import Conference2023Page from "./pages/ep-data/Conference2023Page";

// Other pages
import MediaPage from "./pages/MediaPage";
import ProductionPage from "./pages/ProductionPage";
import LocalContentPage from "./pages/LocalContentPage";
import { PageTransition } from "@/components/layout/PageTransition";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        
        {/* About Us */}
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/about/anpg" element={<PageTransition><AnpgPage /></PageTransition>} />
        <Route path="/about/history" element={<PageTransition><HistoryPage /></PageTransition>} />
        <Route path="/about/social-responsibility" element={<PageTransition><SocialResponsibilityPage /></PageTransition>} />
        <Route path="/contacts" element={<PageTransition><ContactsPage /></PageTransition>} />
        
        {/* Opportunities */}
        <Route path="/opportunities" element={<PageTransition><OpportunitiesPage /></PageTransition>} />
        <Route path="/opportunities/tender-2025" element={<PageTransition><Tender2025Page /></PageTransition>} />
        <Route path="/opportunities/permanent-offer" element={<PageTransition><PermanentOfferPage /></PageTransition>} />
        <Route path="/opportunities/tender-2023" element={<PageTransition><Tender2023Page /></PageTransition>} />
        
        {/* E&P Data */}
        <Route path="/ep-data" element={<PageTransition><EpDataPage /></PageTransition>} />
        <Route path="/ep-data/iona" element={<PageTransition><IonaPage /></PageTransition>} />
        <Route path="/ep-data/oasis" element={<PageTransition><OasisPage /></PageTransition>} />
        <Route path="/ep-data/packages" element={<PageTransition><DataPackagesPage /></PageTransition>} />
        <Route path="/ep-data/maps" element={<PageTransition><EpMapsPage /></PageTransition>} />
        <Route path="/ep-data/conference-2021" element={<PageTransition><Conference2021Page /></PageTransition>} />
        <Route path="/ep-data/conference-2023" element={<PageTransition><Conference2023Page /></PageTransition>} />
        
        {/* Other pages */}
        <Route path="/media" element={<PageTransition><MediaPage /></PageTransition>} />
        <Route path="/production" element={<PageTransition><ProductionPage /></PageTransition>} />
        <Route path="/local-content" element={<PageTransition><LocalContentPage /></PageTransition>} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
