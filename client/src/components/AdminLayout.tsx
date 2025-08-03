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
    { 
      name: "لوحة التحكم", 
      href: "/admin", 
      icon: LayoutDashboard,
      color: "text-blue-600 bg-blue-50 hover:bg-blue-100"
    },
    { 
      name: "إدارة المحتوى",
      icon: FileText,
      color: "text-purple-600",
      children: [
        { 
          name: "المقالات", 
          href: "/admin/articles", 
          icon: FileText,
          color: "text-blue-600 bg-blue-50 hover:bg-blue-100"
        },
        { 
          name: "محرر المقالات", 
          href: "/admin/article-editor", 
          icon: FileText,
          color: "text-blue-700 bg-blue-100 hover:bg-blue-200"
        },
        { 
          name: "الخدمات", 
          href: "/admin/services", 
          icon: Briefcase,
          color: "text-green-600 bg-green-50 hover:bg-green-100"
        },
        { 
          name: "محرر الخدمات", 
          href: "/admin/service-editor", 
          icon: Briefcase,
          color: "text-green-700 bg-green-100 hover:bg-green-200"
        },
        { 
          name: "الصناعات", 
          href: "/admin/industries", 
          icon: Building,
          color: "text-orange-600 bg-orange-50 hover:bg-orange-100"
        },
        { 
          name: "محرر الصناعات", 
          href: "/admin/industry-editor", 
          icon: Building,
          color: "text-orange-700 bg-orange-100 hover:bg-orange-200"
        },
        { 
          name: "الكتب", 
          href: "/admin/books", 
          icon: BookOpen,
          color: "text-pink-600 bg-pink-50 hover:bg-pink-100"
        },
        { 
          name: "آراء العملاء", 
          href: "/admin/testimonials", 
          icon: Star,
          color: "text-yellow-600 bg-yellow-50 hover:bg-yellow-100"
        },
      ]
    },
    {
      name: "إدارة النظام",
      icon: Settings,
      color: "text-gray-600",
      children: [
        { 
          name: "المستخدمين", 
          href: "/admin/users", 
          icon: Users,
          color: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
        },
        { 
          name: "نماذج التواصل", 
          href: "/admin/contact-forms", 
          icon: MessageSquare,
          color: "text-purple-600 bg-purple-50 hover:bg-purple-100"
        },
        { 
          name: "إدارة الوسائط", 
          href: "/admin/media", 
          icon: Image,
          color: "text-teal-600 bg-teal-50 hover:bg-teal-100"
        },
        { 
          name: "SEO المتطور", 
          href: "/admin/seo", 
          icon: Search,
          color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
        },
        { 
          name: "التحليلات", 
          href: "/admin/analytics", 
          icon: BarChart3,
          color: "text-cyan-600 bg-cyan-50 hover:bg-cyan-100"
        },
        { 
          name: "الإعدادات", 
          href: "/admin/settings", 
          icon: Settings,
          color: "text-gray-600 bg-gray-50 hover:bg-gray-100"
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
        <div className="flex items-center justify-between h-16 px-6 border-b bg-gradient-to-r from-inception-purple to-purple-700 flex-shrink-0">
          <h1 className="text-xl font-bold text-white">إنسيبشن</h1>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-white/20"
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
                          flex items-center px-3 py-2 mx-2 text-sm rounded-lg transition-all duration-200
                          ${isActive(child.href) 
                            ? 'bg-inception-purple text-white shadow-md transform scale-105' 
                            : `${child.color} transition-all duration-200 hover:shadow-sm hover:transform hover:scale-105`
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
                      ? 'bg-inception-purple text-white shadow-lg transform scale-105' 
                      : `${item.color} transition-all duration-200 hover:shadow-md hover:transform hover:scale-105`
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
        <div className="p-4 border-t bg-gradient-to-r from-gray-50 to-gray-100 flex-shrink-0">
          <div className="flex items-center mb-4 p-3 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-gradient-to-r from-inception-purple to-purple-700 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div className="mr-3">
              <p className="text-sm font-semibold text-gray-800">{user?.username}</p>
              <p className="text-xs text-inception-purple font-medium">مدير النظام</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
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
        <div className="bg-white shadow-lg border-b h-16 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-inception-purple hover:bg-purple-50"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-gradient-to-r from-inception-purple/10 to-purple-100 px-4 py-2 rounded-full">
              <div className="w-8 h-8 bg-gradient-to-r from-inception-purple to-purple-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
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