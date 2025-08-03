
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
import ArticleDetail from "./pages/ArticleDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminArticles from "./pages/admin/AdminArticles";
import AdminServices from "./pages/admin/AdminServices";
import AdminIndustries from "./pages/admin/AdminIndustries";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminContactForms from "./pages/admin/AdminContactForms";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminSEO from "./pages/admin/AdminSEO";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminHomeContent from "./pages/admin/AdminHomeContent";
import AdminContactContent from "./pages/admin/AdminContactContent";
import AdminAboutContent from "./pages/admin/AdminAboutContent";
import AdminArticleEditor from "./pages/admin/AdminArticleEditor";
import AdminServiceEditor from "./pages/admin/AdminServiceEditor";
import AdminIndustryEditor from "./pages/admin/AdminIndustryEditor";
import EnhancedArticleEditor from "./components/dashboard/EnhancedArticleEditor";
import EnhancedServiceEditor from "./components/dashboard/EnhancedServiceEditor";
import EnhancedIndustryEditor from "./components/dashboard/EnhancedIndustryEditor";
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
import IndustryDetail from "./pages/IndustryDetail";

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
              <Route path="/industries/:id" component={IndustryDetail} />
              <Route path="/books" component={Books} />
              <Route path="/articles" component={Articles} />
              <Route path="/articles/:id" component={ArticleDetail} />
              <Route path="/about" component={AboutMe} />
              <Route path="/contact" component={Contact} />
              <Route path="/seo-guide" component={SEOGuide} />
              <Route path="/digital-marketing-tips" component={DigitalMarketingTips} />
              <Route path="/content-strategy" component={ContentStrategy} />
              
              {/* Auth page */}
              <Route path="/auth" component={AuthPage} />
              
              {/* Protected admin routes */}
              <ProtectedRoute path="/admin" component={AdminDashboard} />
              <ProtectedRoute path="/admin/articles" component={AdminArticles} />
              <ProtectedRoute path="/admin/article-editor" component={AdminArticleEditor} />
              <ProtectedRoute path="/admin/enhanced-article-editor" component={EnhancedArticleEditor} />
              <ProtectedRoute path="/admin/services" component={AdminServices} />
              <ProtectedRoute path="/admin/service-editor" component={AdminServiceEditor} />
              <ProtectedRoute path="/admin/enhanced-service-editor" component={EnhancedServiceEditor} />
              <ProtectedRoute path="/admin/industries" component={AdminIndustries} />
              <ProtectedRoute path="/admin/industry-editor" component={AdminIndustryEditor} />
              <ProtectedRoute path="/admin/enhanced-industry-editor" component={EnhancedIndustryEditor} />
              <ProtectedRoute path="/admin/books" component={AdminBooks} />
              <ProtectedRoute path="/admin/testimonials" component={AdminTestimonials} />
              <ProtectedRoute path="/admin/users" component={AdminUsers} />
              <ProtectedRoute path="/admin/contact-forms" component={AdminContactForms} />
              <ProtectedRoute path="/admin/media" component={AdminMedia} />
              <ProtectedRoute path="/admin/seo" component={AdminSEO} />
              <ProtectedRoute path="/admin/analytics" component={AdminAnalytics} />
              <ProtectedRoute path="/admin/settings" component={AdminSettings} />
              <ProtectedRoute path="/admin/content/home" component={AdminHomeContent} />
              <ProtectedRoute path="/admin/content/contact" component={AdminContactContent} />
              <ProtectedRoute path="/admin/content/about" component={AdminAboutContent} />
              
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
