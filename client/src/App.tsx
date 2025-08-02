
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import Books from "./pages/Books";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact";
import Articles from "./pages/Articles";
import AdminDashboard from "./pages/AdminDashboard";
import AuthPage from "./pages/auth-page";
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
import ServiceDetail from "./pages/ServiceDetail";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <Switch>
              {/* Public routes */}
              <Route path="/" component={Index} />
              <Route path="/services" component={Services} />
              <Route path="/services/media-production" component={MediaProduction} />
              <Route path="/services/paid-ads" component={PaidAds} />
              <Route path="/services/seo" component={SeoServices} />
              <Route path="/services/web-development" component={WebDevelopment} />
              <Route path="/services/social-media" component={SocialMediaManagement} />
              <Route path="/services/:id" component={ServiceDetail} />
              <Route path="/industries" component={Industries} />
              <Route path="/books" component={Books} />
              <Route path="/articles" component={Articles} />
              <Route path="/about" component={AboutMe} />
              <Route path="/contact" component={Contact} />
              <Route path="/seo-guide" component={SEOGuide} />
              <Route path="/digital-marketing-tips" component={DigitalMarketingTips} />
              <Route path="/content-strategy" component={ContentStrategy} />
              
              {/* Auth page */}
              <Route path="/auth" component={AuthPage} />
              
              {/* Protected admin routes */}
              <ProtectedRoute path="/admin" component={AdminDashboard} />
              <ProtectedRoute path="/admin/:rest*" component={AdminDashboard} />
              
              {/* Catch-all route for 404 */}
              <Route component={NotFound} />
            </Switch>
          </Router>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
