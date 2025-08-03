import React from "react";
import { Link } from "wouter";
import { 
  BarChart3, 
  Users, 
  FileText, 
  MessageSquare, 
  TrendingUp,
  Eye,
  BookOpen,
  Star,
  Briefcase,
  Building,
  Image,
  Settings,
  PlusCircle,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";

const AdminDashboard = () => {
  const stats = [
    { 
      title: "إجمالي المقالات", 
      value: "24", 
      change: "+12%", 
      icon: FileText, 
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      href: "/admin/articles"
    },
    { 
      title: "آراء العملاء", 
      value: "156", 
      change: "+8%", 
      icon: Star, 
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      href: "/admin/testimonials"
    },
    { 
      title: "الخدمات النشطة", 
      value: "12", 
      change: "+3%", 
      icon: Briefcase, 
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      href: "/admin/services"
    },
    { 
      title: "رسائل التواصل", 
      value: "89", 
      change: "+25%", 
      icon: MessageSquare, 
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      href: "/admin/contact-forms"
    },
    { 
      title: "الصناعات", 
      value: "8", 
      change: "0%", 
      icon: Building, 
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      href: "/admin/industries"
    },
    { 
      title: "الكتب المنشورة", 
      value: "15", 
      change: "+5%", 
      icon: BookOpen, 
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
      href: "/admin/books"
    },
    { 
      title: "الزوار اليوم", 
      value: "2,847", 
      change: "+15%", 
      icon: Eye, 
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      href: "/admin/analytics"
    },
    { 
      title: "معدل النمو", 
      value: "12.5%", 
      change: "+2.1%", 
      icon: TrendingUp, 
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      href: "/admin/analytics"
    },
  ];

  const quickActions = [
    { 
      title: "إضافة مقال جديد", 
      description: "إنشاء محتوى جديد",
      icon: PlusCircle, 
      color: "from-blue-500 to-blue-600",
      href: "/admin/article-editor"
    },
    { 
      title: "إضافة خدمة", 
      description: "خدمة جديدة للعملاء",
      icon: Briefcase, 
      color: "from-green-500 to-green-600",
      href: "/admin/service-editor"
    },
    { 
      title: "إدارة الوسائط", 
      description: "رفع وتنظيم الملفات",
      icon: Image, 
      color: "from-purple-500 to-purple-600",
      href: "/admin/media"
    },
    { 
      title: "إعدادات الموقع", 
      description: "تخصيص النظام",
      icon: Settings, 
      color: "from-gray-500 to-gray-600",
      href: "/admin/settings"
    },
  ];

  const recentActivity = [
    { action: "إضافة مقال جديد", item: "استراتيجيات التسويق الرقمي المتقدمة", time: "منذ ساعتين", type: "article" },
    { action: "تحديث خدمة", item: "تطوير المواقع الإلكترونية", time: "منذ 4 ساعات", type: "service" },
    { action: "رسالة جديدة", item: "استفسار عن الخدمات من عميل جديد", time: "منذ يوم", type: "message" },
    { action: "إضافة رأي عميل", item: "شركة التطوير المتقدم - تقييم 5 نجوم", time: "منذ يومين", type: "testimonial" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-4 lg:space-y-6 xl:space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-inception-purple to-purple-700 rounded-xl lg:rounded-2xl p-4 lg:p-8 text-white">
          <h1 className="text-2xl lg:text-4xl font-bold mb-2 lg:mb-3">مرحباً بك في لوحة التحكم</h1>
          <p className="text-purple-100 text-sm lg:text-lg">نظرة شاملة على أداء موقع إنسيبشن والإحصائيات المهمة</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <Link key={index} href={stat.href}>
              <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group h-full">
                <CardContent className="p-4 lg:p-6 h-full">
                  <div className="flex items-center justify-between h-full">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs lg:text-sm font-medium text-gray-600 mb-1 truncate">{stat.title}</p>
                      <p className="text-xl lg:text-3xl font-bold text-gray-900 mb-1 lg:mb-2">{stat.value}</p>
                      <p className={`text-xs lg:text-sm font-medium flex items-center ${
                        stat.change.startsWith('+') ? 'text-green-600' : 
                        stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {stat.change.startsWith('+') && <TrendingUp className="w-3 h-3 ml-1" />}
                        <span className="truncate">{stat.change} من الشهر الماضي</span>
                      </p>
                    </div>
                    <div className={`p-3 lg:p-4 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300 ml-2`}>
                      <stat.icon size={20} className="text-white lg:w-7 lg:h-7" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="shadow-lg">
          <CardHeader className="pb-3 lg:pb-4">
            <CardTitle className="text-lg lg:text-2xl font-bold text-gray-900 flex items-center gap-2 lg:gap-3">
              <PlusCircle className="w-5 h-5 lg:w-7 lg:h-7 text-inception-purple" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <div className="group bg-gradient-to-br from-gray-50 to-gray-100 p-3 lg:p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-200 h-full">
                    <div className={`w-10 h-10 lg:w-14 lg:h-14 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-2 lg:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto`}>
                      <action.icon size={16} className="text-white lg:w-6 lg:h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 lg:mb-2 group-hover:text-inception-purple transition-colors text-xs lg:text-base text-center">{action.title}</h3>
                    <p className="text-xs lg:text-sm text-gray-600 mb-2 lg:mb-3 text-center line-clamp-2">{action.description}</p>
                    <div className="flex items-center justify-center text-inception-purple font-medium text-xs lg:text-sm group-hover:translate-x-1 transition-transform duration-200">
                      ابدأ الآن <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Analytics - Full Width Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-8">
          {/* Recent Activity */}
          <Card className="shadow-lg xl:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 lg:gap-3 text-lg lg:text-xl font-bold text-gray-900">
                <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 text-inception-purple" />
                النشاط الأخير
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 lg:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-shadow duration-200">
                    <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'article' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'service' ? 'bg-green-100 text-green-600' :
                      activity.type === 'message' ? 'bg-purple-100 text-purple-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {activity.type === 'article' && <FileText className="w-4 h-4 lg:w-5 lg:h-5" />}
                      {activity.type === 'service' && <Briefcase className="w-4 h-4 lg:w-5 lg:h-5" />}
                      {activity.type === 'message' && <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5" />}
                      {activity.type === 'testimonial' && <Star className="w-4 h-4 lg:w-5 lg:h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 mb-1 text-sm lg:text-base truncate">{activity.action}</p>
                      <p className="text-xs lg:text-sm text-gray-600 mb-1 line-clamp-2">{activity.item}</p>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 lg:gap-3 text-lg lg:text-xl font-bold text-gray-900">
                <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-inception-purple" />
                الإحصائيات السريعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 lg:space-y-4">
                <div className="flex justify-between items-center p-3 lg:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <span className="text-gray-700 font-medium text-sm lg:text-base">معدل الزيارات اليومية</span>
                  <span className="font-bold text-green-600 text-base lg:text-lg">+15%</span>
                </div>
                <div className="flex justify-between items-center p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <span className="text-gray-700 font-medium text-sm lg:text-base">وقت البقاء في الموقع</span>
                  <span className="font-bold text-blue-600 text-base lg:text-lg">3:24 دقيقة</span>
                </div>
                <div className="flex justify-between items-center p-3 lg:p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <span className="text-gray-700 font-medium text-sm lg:text-base">معدل التحويل</span>
                  <span className="font-bold text-purple-600 text-base lg:text-lg">12.5%</span>
                </div>
                <div className="flex justify-between items-center p-3 lg:p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                  <span className="text-gray-700 font-medium text-sm lg:text-base">الصفحات الأكثر زيارة</span>
                  <span className="font-bold text-orange-600 text-base lg:text-lg">الخدمات</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Additional Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
          <Card className="shadow-lg">
            <CardContent className="p-4 lg:p-6 text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <Users className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg lg:text-xl text-gray-900 mb-1">2,847</h3>
              <p className="text-xs lg:text-sm text-gray-600">زائر نشط اليوم</p>
              <div className="mt-2 text-green-600 text-xs lg:text-sm font-medium">+15% من أمس</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="p-4 lg:p-6 text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <Eye className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg lg:text-xl text-gray-900 mb-1">45,892</h3>
              <p className="text-xs lg:text-sm text-gray-600">مشاهدات الصفحات</p>
              <div className="mt-2 text-green-600 text-xs lg:text-sm font-medium">+22% هذا الأسبوع</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="p-4 lg:p-6 text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg lg:text-xl text-gray-900 mb-1">87.3%</h3>
              <p className="text-xs lg:text-sm text-gray-600">معدل الارتداد</p>
              <div className="mt-2 text-red-600 text-xs lg:text-sm font-medium">-5% تحسن</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="p-4 lg:p-6 text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <MessageSquare className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg lg:text-xl text-gray-900 mb-1">124</h3>
              <p className="text-xs lg:text-sm text-gray-600">استفسارات جديدة</p>
              <div className="mt-2 text-green-600 text-xs lg:text-sm font-medium">+8% هذا الشهر</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;