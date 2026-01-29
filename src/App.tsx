import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
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
import BlockDetailsPage from "./pages/ep-data/BlockDetailsPage";
import Conference2021Page from "./pages/ep-data/Conference2021Page";
import Conference2023Page from "./pages/ep-data/Conference2023Page";

// Regulation pages
import RegulationPage from "./pages/regulation/RegulationPage";
import LicensingPage from "./pages/regulation/LicensingPage";
import OversightPage from "./pages/regulation/OversightPage";
import TendersPage from "./pages/regulation/TendersPage";

// Other pages
import MediaPage from "./pages/MediaPage";
import NewsArchivePage from "./pages/NewsArchivePage";
import NewsDetailPage from "./pages/NewsDetailPage";
import ProductionPage from "./pages/ProductionPage";
import ProductionHistoryPage from "./pages/production/ProductionHistoryPage";
import LocalContentPage from "./pages/LocalContentPage";
import DataPage from "./pages/DataPage";
import SustainabilityPage from "./pages/SustainabilityPage";
import InvestorPortalPage from "./pages/investor/InvestorPortalPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import TermsPage from "./pages/legal/TermsPage";
import FAQPage from "./pages/FAQPage";

// Admin pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNewsPage from "./pages/admin/AdminNewsPage";
import AdminNewsEditorPage from "./pages/admin/AdminNewsEditorPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminBlocksPage from "./pages/admin/AdminBlocksPage";
import AdminCMSPage from "./pages/admin/AdminCMSPage";
import AdminProductionPage from "./pages/admin/AdminProductionPage";
import AdminEOIPage from "./pages/admin/AdminEOIPage";
import AdminDocumentsPage from "./pages/admin/AdminDocumentsPage";
import AdminAuditPage from "./pages/admin/AdminAuditPage";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          
          {/* About Us */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/anpg" element={<AnpgPage />} />
          <Route path="/about/history" element={<HistoryPage />} />
          <Route path="/about/social-responsibility" element={<SocialResponsibilityPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          
          {/* Opportunities */}
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/opportunities/tender-2025" element={<Tender2025Page />} />
          <Route path="/opportunities/permanent-offer" element={<PermanentOfferPage />} />
          <Route path="/opportunities/tender-2023" element={<Tender2023Page />} />
          
          {/* E&P Data */}
          <Route path="/ep-data" element={<EpDataPage />} />
          <Route path="/ep-data/iona" element={<IonaPage />} />
          <Route path="/ep-data/oasis" element={<OasisPage />} />
          <Route path="/ep-data/packages" element={<DataPackagesPage />} />
          <Route path="/ep-data/maps" element={<EpMapsPage />} />
          <Route path="/ep-data/blocks/:blockId" element={<BlockDetailsPage />} />
          <Route path="/ep-data/conference-2021" element={<Conference2021Page />} />
          <Route path="/ep-data/conference-2023" element={<Conference2023Page />} />
          
          {/* Regulation pages */}
          <Route path="/regulation" element={<RegulationPage />} />
          <Route path="/regulation/licensing" element={<LicensingPage />} />
          <Route path="/regulation/oversight" element={<OversightPage />} />
          <Route path="/regulation/tenders" element={<TendersPage />} />
          
          {/* Other pages */}
          <Route path="/media" element={<MediaPage />} />
          <Route path="/media/archive" element={<NewsArchivePage />} />
          <Route path="/news/:newsId" element={<NewsDetailPage />} />
          <Route path="/production" element={<ProductionPage />} />
          <Route path="/production/history" element={<ProductionHistoryPage />} />
          <Route path="/local-content" element={<LocalContentPage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/investor-portal" element={<InvestorPortalPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/news" element={<ProtectedRoute requiredPermission="content"><AdminNewsPage /></ProtectedRoute>} />
          <Route path="/admin/news/:id" element={<ProtectedRoute requiredPermission="content"><AdminNewsEditorPage /></ProtectedRoute>} />
          <Route path="/admin/pages" element={<ProtectedRoute requiredPermission="content"><AdminCMSPage /></ProtectedRoute>} />
          <Route path="/admin/blocks" element={<ProtectedRoute requiredPermission="operations"><AdminBlocksPage /></ProtectedRoute>} />
          <Route path="/admin/production" element={<ProtectedRoute requiredPermission="operations"><AdminProductionPage /></ProtectedRoute>} />
          <Route path="/admin/eoi" element={<ProtectedRoute requiredPermission="investors"><AdminEOIPage /></ProtectedRoute>} />
          <Route path="/admin/documents" element={<ProtectedRoute requiredPermission="investors"><AdminDocumentsPage /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute requiredPermission="admin"><AdminUsersPage /></ProtectedRoute>} />
          <Route path="/admin/audit" element={<ProtectedRoute requiredPermission="admin"><AdminAuditPage /></ProtectedRoute>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
