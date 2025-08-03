import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/components/ui/use-toast";
import { 
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Star,
  Settings,
  BarChart3,
  Calendar,
  Bell,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  Activity,
  User,
  LogOut,
  Menu,
  X,
  LogIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BooksManager from "@/components/dashboard/BooksManager";
import ServicesManager from "@/components/dashboard/ServicesManager";
import TestimonialsManager from "@/components/dashboard/TestimonialsManager";
import SettingsManager from "@/components/dashboard/SettingsManager";
import IndustriesManager from "@/components/dashboard/IndustriesManager";
import UsersManager from "@/components/dashboard/UsersManager";
import ContactFormsManager from "@/components/dashboard/ContactFormsManager";
import AnalyticsManager from "@/components/dashboard/AnalyticsManager";
import ArticlesManager from "@/components/dashboard/ArticlesManager";
import MediaManager from "@/components/dashboard/MediaManager";
import AdvancedSEOManager from "@/components/dashboard/AdvancedSEOManager";
import ArticleEditor from "@/components/dashboard/ArticleEditor";
import ServiceEditor from "./ServiceEditor";
import IndustryEditor from "./IndustryEditor";

const AdminDashboard = () => {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [serviceEditorId, setServiceEditorId] = useState<string | null>(null);
  const [industryEditorId, setIndustryEditorId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user, isLoading } = useAuth();
  const isAuthenticated = !!user;
  
  // Get current tab from URL
  const currentPath = location.replace('/admin/', '') || 'dashboard';
  const [activeTab, setActiveTab] = useState(currentPath);

  // Update activeTab when URL changes
  useEffect(() => {
    const pathTab = location.replace('/admin/', '') || 'dashboard';
    if (pathTab !== activeTab) {
      setActiveTab(pathTab);
    }
  }, [location]);

  // Stay on admin routes if authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "تسجيل الدخول مطلوب",
        description: "يجب تسجيل الدخول للوصول للوحة التحكم...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/auth";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">جارٍ التحميل...</p>
        </div>
      </div>
    );
  }

  // Show login required if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LogIn className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">تسجيل الدخول مطلوب</h2>
          <p className="text-gray-600 mb-6">يجب تسجيل الدخول للوصول لوحة التحكم</p>
          <Button onClick={() => window.location.href = "/auth"}>
            تسجيل الدخول
          </Button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: "dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
    { id: "articles", label: "المقالات", icon: FileText },
    { id: "article-editor", label: "محرر المقالات", icon: Edit },
    { id: "services", label: "الخدمات", icon: Star },
    { id: "service-editor", label: "محرر الخدمات", icon: Edit },
    { id: "books", label: "الكتب", icon: FileText },
    { id: "testimonials", label: "آراء العملاء", icon: MessageSquare },
    { id: "industry-editor", label: "محرر الصناعات", icon: Edit },
    { id: "industries", label: "الصناعات", icon: BarChart3 },
    { id: "users", label: "المستخدمين", icon: Users },
    { id: "contact-forms", label: "نماذج التواصل", icon: MessageSquare },
    { id: "media", label: "إدارة الوسائط", icon: FileText },
    { id: "seo", label: "SEO المتطور", icon: Search },
    { id: "analytics", label: "التحليلات", icon: Activity },
    { id: "settings", label: "الإعدادات", icon: Settings },
  ];

  const stats = [
    { label: "إجمالي المقالات", value: "156", change: "+12%", trend: "up", color: "text-green-600" },
    { label: "المستخدمين النشطين", value: "2,845", change: "+8%", trend: "up", color: "text-green-600" },
    { label: "آراء العملاء", value: "89", change: "-3%", trend: "down", color: "text-red-600" },
    { label: "معدل المشاهدات", value: "15.2K", change: "+15%", trend: "up", color: "text-green-600" },
  ];

  const recentArticles = [
    { id: 1, title: "كيفية تحسين SEO", author: "أحمد محمد", date: "2024-01-15", status: "published", views: 1250 },
    { id: 2, title: "استراتيجيات السوشيال ميديا", author: "سارة أحمد", date: "2024-01-14", status: "draft", views: 0 },
    { id: 3, title: "التسويق الرقمي الحديث", author: "محمد علي", date: "2024-01-13", status: "published", views: 890 },
    { id: 4, title: "تطوير المواقع الإلكترونية", author: "فاطمة حسن", date: "2024-01-12", status: "review", views: 567 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </CardTitle>
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-inception-purple">{stat.value}</div>
                    <p className={`text-xs ${stat.color} mt-1`}>
                      {stat.change} من الشهر الماضي
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Articles */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold text-inception-purple">المقالات الأخيرة</CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 ml-1" />
                  مقال جديد
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentArticles.map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-semibold text-inception-purple">{article.title}</h4>
                        <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 mt-1">
                          <span>بواسطة {article.author}</span>
                          <span>{new Date(article.date).toLocaleDateString('ar-EG')}</span>
                          <span>{article.views} مشاهدة</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Badge variant={
                          article.status === "published" ? "default" : 
                          article.status === "draft" ? "secondary" : "outline"
                        }>
                          {article.status === "published" ? "منشور" : 
                           article.status === "draft" ? "مسودة" : "مراجعة"}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <FileText className="w-12 h-12 text-inception-purple mx-auto mb-4" />
                  <h3 className="font-semibold text-inception-purple mb-2">إنشاء مقال جديد</h3>
                  <p className="text-sm text-gray-600">ابدأ في كتابة مقال جديد ومشاركة خبراتك</p>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-inception-orange mx-auto mb-4" />
                  <h3 className="font-semibold text-inception-purple mb-2">إدارة المستخدمين</h3>
                  <p className="text-sm text-gray-600">عرض وإدارة حسابات المستخدمين</p>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-inception-purple mb-2">تقارير الأداء</h3>
                  <p className="text-sm text-gray-600">مراجعة إحصائيات وتحليلات الموقع</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case "articles":
        return <ArticlesManager />;
      
      case "article-editor":
        return <ArticleEditor />;
      
      case "services":
        return <ServicesManager onEditService={(serviceId) => {
          setServiceEditorId(serviceId);
          setActiveTab("service-editor");
        }} onCreateService={() => {
          setServiceEditorId("new");
          setActiveTab("service-editor");
        }} />;
      
      case "service-editor":
        return <ServiceEditor serviceId={serviceEditorId} onBack={() => {
          setActiveTab("services");
          setServiceEditorId(null);
        }} />;
      
      case "books":
        return <BooksManager />;
      
      case "testimonials":
        return <TestimonialsManager />;
        
      case "industries":
        return <IndustriesManager onEditIndustry={(industryId) => {
          setIndustryEditorId(industryId);
          setActiveTab("industry-editor");
        }} onCreateIndustry={() => {
          setIndustryEditorId("new");
          setActiveTab("industry-editor");
        }} />;
        
      case "industry-editor":
        return <IndustryEditor industryId={industryEditorId} onBack={() => {
          setActiveTab("industries");
          setIndustryEditorId(null);
        }} />;
        
      case "users":
        return <UsersManager />;
        
      case "contact-forms":
        return <ContactFormsManager />;
        
      case "media":
        return <MediaManager />;
        
      case "seo":
        return <AdvancedSEOManager />;
        
      case "analytics":
        return <AnalyticsManager />;
      
      case "settings":
        return <SettingsManager />;
      
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">المحتوى قيد التطوير...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white shadow-lg border-l flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-xl font-bold text-inception-purple">لوحة التحكم</h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                    }}
                    className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-inception-purple text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <span className="mr-3 font-medium">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t">
          <div className={`flex items-center ${sidebarOpen ? 'space-x-3 space-x-reverse' : 'justify-center'}`}>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>أ</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">أحمد المدير</p>
                <p className="text-xs text-gray-500 truncate">admin@example.com</p>
              </div>
            )}
            {sidebarOpen && (
              <Button variant="ghost" size="icon" className="text-gray-500">
                <LogOut className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h2 className="text-2xl font-bold text-inception-purple">
                {menuItems.find(item => item.id === activeTab)?.label}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 left-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>أ</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">أحمد المدير</p>
                  <p className="text-xs text-gray-500">المدير العام</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;