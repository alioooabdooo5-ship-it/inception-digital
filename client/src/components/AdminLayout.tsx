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
  BarChart3
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
    { name: "لوحة التحكم", href: "/admin", icon: LayoutDashboard },
    { 
      name: "إدارة المحتوى",
      icon: FileText,
      children: [
        { name: "المقالات", href: "/admin/articles", icon: FileText },
        { name: "محرر المقالات", href: "/admin/article-editor", icon: FileText },
        { name: "الخدمات", href: "/admin/services", icon: Briefcase },
        { name: "محرر الخدمات", href: "/admin/service-editor", icon: Briefcase },
        { name: "الصناعات", href: "/admin/industries", icon: Building },
        { name: "محرر الصناعات", href: "/admin/industry-editor", icon: Building },
        { name: "الكتب", href: "/admin/books", icon: BookOpen },
        { name: "آراء العملاء", href: "/admin/testimonials", icon: Star },
      ]
    },
    {
      name: "إدارة النظام",
      icon: Settings,
      children: [
        { name: "المستخدمين", href: "/admin/users", icon: Users },
        { name: "نماذج التواصل", href: "/admin/contact-forms", icon: MessageSquare },
        { name: "إدارة الوسائط", href: "/admin/media", icon: Image },
        { name: "SEO المتطور", href: "/admin/seo", icon: Search },
        { name: "التحليلات", href: "/admin/analytics", icon: BarChart3 },
        { name: "الإعدادات", href: "/admin/settings", icon: Settings },
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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-inception-purple">إنسيبشن</h1>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          {navigation.map((item) => (
            <div key={item.name} className="mb-2">
              {item.children ? (
                <div>
                  <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700">
                    <item.icon className="ml-3 w-5 h-5" />
                    {item.name}
                  </div>
                  <div className="mr-8 space-y-1">
                    {item.children.map((child) => (
                      <Link 
                        key={child.href} 
                        href={child.href}
                        className={`
                          flex items-center px-3 py-2 text-sm rounded-md transition-colors
                          ${isActive(child.href) 
                            ? 'bg-inception-purple text-white' 
                            : 'text-gray-600 hover:bg-gray-100'
                          }
                        `}
                      >
                        <child.icon className="ml-3 w-4 h-4" />
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link 
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive(item.href) 
                      ? 'bg-inception-purple text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <item.icon className="ml-3 w-5 h-5" />
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* User info and logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-inception-purple rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div className="mr-3">
              <p className="text-sm font-medium text-gray-700">{user?.username}</p>
              <p className="text-xs text-gray-500">مدير النظام</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:mr-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">مرحباً، {user?.username}</span>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;