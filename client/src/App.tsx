
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import Books from "./pages/Books";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact";
import Articles from "./pages/Articles";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import SEOGuide from "./pages/SEOGuide";
import DigitalMarketingTips from "./pages/DigitalMarketingTips";
import ContentStrategy from "./pages/ContentStrategy";
import MediaProduction from "./pages/service/MediaProduction";
import PaidAds from "./pages/service/PaidAds";
import SeoServices from "./pages/service/SeoServices";
import WebDevelopment from "./pages/service/WebDevelopment";
import SocialMediaManagement from "./pages/service/SocialMediaManagement";
import ServiceEditor from "./pages/ServiceEditor";

const App = () => {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/media-production" element={<MediaProduction />} />
            <Route path="/services/paid-ads" element={<PaidAds />} />
            <Route path="/services/seo" element={<SeoServices />} />
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/services/social-media" element={<SocialMediaManagement />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/books" element={<Books />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/seo-guide" element={<SEOGuide />} />
            <Route path="/digital-marketing-tips" element={<DigitalMarketingTips />} />
            <Route path="/content-strategy" element={<ContentStrategy />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
