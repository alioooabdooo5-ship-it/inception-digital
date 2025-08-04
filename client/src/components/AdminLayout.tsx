import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X,
  Briefcase,
  Building,
  BookOpen,
  Star,
  Image,
  Search,
  BarChart3,
  Home,
  Phone,
  Info,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const navigation = [
    { 
      name: "لوحة التحكم", 
      href: "/admin", 
      icon: LayoutDashboard,
      color: "text-inception-purple/80 bg-inception-purple/5 hover:bg-inception-purple/10"
    },
    { 
      name: "إدارة المحتوى",
      icon: FileText,
      color: "text-inception-purple/70",
      children: [
        { 
          name: "المقالات", 
          href: "/admin/articles", 
          icon: FileText,
          color: "text-inception-purple/80 bg-inception-purple/5 hover:bg-inception-purple/10"
        },
        { 
          name: "محرر المقالات", 
          href: "/admin/article-editor", 
          icon: FileText,
          color: "text-inception-purple/90 bg-inception-purple/10 hover:bg-inception-purple/15"
        },
        { 
          name: "الخدمات", 
          href: "/admin/services", 
          icon: Briefcase,
          color: "text-inception-orange/80 bg-inception-orange/5 hover:bg-inception-orange/10"
        },
        { 
          name: "محرر الخدمات", 
          href: "/admin/service-editor", 
          icon: Briefcase,
          color: "text-inception-orange/90 bg-inception-orange/10 hover:bg-inception-orange/15"
        },
        { 
          name: "الصناعات", 
          href: "/admin/industries", 
          icon: Building,
          color: "text-inception-purple/80 bg-inception-purple/5 hover:bg-inception-purple/10"
        },
        { 
          name: "محرر الصناعات", 
          href: "/admin/industry-editor", 
          icon: Building,
          color: "text-inception-purple/90 bg-inception-purple/10 hover:bg-inception-purple/15"
        },
        { 
          name: "الكتب", 
          href: "/admin/books", 
          icon: BookOpen,
          color: "text-inception-orange/80 bg-inception-orange/5 hover:bg-inception-orange/10"
        },
        { 
          name: "آراء العملاء", 
          href: "/admin/testimonials", 
          icon: Star,
          color: "text-inception-orange/80 bg-inception-orange/5 hover:bg-inception-orange/10"
        },
      ]
    },
    {
      name: "الصفحات",
      icon: FileText,
      color: "text-inception-purple/70",
      children: [
        { 
          name: "محتوى الهوم بيج", 
          href: "/admin/content/home", 
          icon: Home,
          color: "text-inception-purple/80 bg-inception-purple/5 hover:bg-inception-purple/10"
        },
        { 
          name: "محتوى صفحة التواصل", 
          href: "/admin/content/contact", 
          icon: Phone,
          color: "text-inception-orange/80 bg-inception-orange/5 hover:bg-inception-orange/10"
        },
        { 
          name: "محتوى صفحة من نحن", 
          href: "/admin/content/about", 
          icon: Info,
          color: "text-inception-purple/80 bg-inception-purple/5 hover:bg-inception-purple/10"
        },
      ]
    },
    {
      name: "إدارة النظام",
      icon: Settings,
      color: "text-inception-purple/70",
      children: [
        { 
          name: "المستخدمين", 
          href: "/admin/users", 
          icon: Users,
          color: "text-inception-purple/80 bg-inception-purple/5 hover:bg-inception-purple/10"
        },
        { 
          name: "نماذج التواصل", 
          href: "/admin/contact-forms", 
          icon: MessageSquare,
          color: "text-inception-orange/80 bg-inception-orange/5 hover:bg-inception-orange/10"
        },
        { 
          name: "إدارة الوسائط", 
          href: "/admin/media", 
          icon: Image,
          color: "text-inception-purple/80 bg-inception-purple/5 hover:bg-inception-purple/10"
        },
        { 
          name: "SEO المتطور", 
          href: "/admin/seo", 
          icon: Search,
          color: "text-inception-orange/80 bg-inception-orange/5 hover:bg-inception-orange/10"
        },
        { 
          name: "التحليلات", 
          href: "/admin/analytics", 
          icon: BarChart3,
          color: "text-inception-purple/80 bg-inception-purple/5 hover:bg-inception-purple/10"
        },
        { 
          name: "الإعدادات العامة", 
          href: "/admin/settings", 
          icon: Settings,
          color: "text-inception-orange/80 bg-inception-orange/5 hover:bg-inception-orange/10"
        },
      ]
    }
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location === "/admin";
    }
    return location.startsWith(href);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:relative lg:translate-x-0 lg:flex-shrink-0
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b bg-gradient-to-r from-inception-purple to-inception-purple/90 flex-shrink-0">
          <h1 className="text-xl font-bold text-white">إنسيبشن</h1>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-white/10"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 mt-6 px-3 overflow-y-auto">
          {navigation.map((item) => (
            <div key={item.name} className="mb-2">
              {item.children ? (
                <div>
                  <div className="flex items-center px-3 py-2 text-sm font-medium text-inception-purple/70">
                    <item.icon className="ml-3 w-5 h-5" />
                    {item.name}
                  </div>
                  <div className="mr-8 space-y-1">
                    {item.children.map((child) => (
                      <Link 
                        key={child.href} 
                        href={child.href}
                        className={`
                          flex items-center px-3 py-2 mx-2 text-sm rounded-lg transition-all duration-200
                          ${isActive(child.href) 
                            ? 'bg-inception-purple text-white shadow-sm' 
                            : `${child.color} transition-all duration-200 hover:shadow-sm`
                          }
                        `}
                      >
                        <child.icon className="ml-3 w-4 h-4" />
                        <span className="font-medium">{child.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link 
                  href={item.href}
                  className={`
                    flex items-center px-4 py-3 mx-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive(item.href) 
                      ? 'bg-inception-purple text-white shadow-sm' 
                      : `${item.color} transition-all duration-200 hover:shadow-sm`
                    }
                  `}
                >
                  <item.icon className="ml-3 w-5 h-5" />
                  <span className="font-semibold">{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* User info and logout */}
        <div className="p-4 border-t bg-inception-purple/5 flex-shrink-0">
          <div className="flex items-center mb-4 p-3 bg-white rounded-lg shadow-sm border border-inception-purple/20">
            <div className="w-10 h-10 bg-inception-purple rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div className="mr-3">
              <p className="text-sm font-semibold text-inception-purple">{user?.username}</p>
              <p className="text-xs text-inception-purple/60 font-medium">مدير النظام</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full border-inception-orange/30 text-inception-orange hover:bg-inception-orange/10 hover:border-inception-orange/50 transition-all duration-200"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-inception-purple hover:bg-inception-purple/10"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-inception-purple/5 px-4 py-2 rounded-lg border border-inception-purple/20">
              <div className="w-8 h-8 bg-inception-purple rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-inception-purple">مرحباً، {user?.username}</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-3 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;