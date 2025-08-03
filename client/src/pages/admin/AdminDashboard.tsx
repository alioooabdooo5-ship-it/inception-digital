import React from "react";
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
  Building
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/AdminLayout";

const AdminDashboard = () => {
  const stats = [
    { title: "إجمالي المقالات", value: "24", change: "+12%", icon: FileText, color: "text-blue-600" },
    { title: "آراء العملاء", value: "156", change: "+8%", icon: Star, color: "text-yellow-600" },
    { title: "الخدمات", value: "12", change: "+3%", icon: Briefcase, color: "text-green-600" },
    { title: "رسائل التواصل", value: "89", change: "+25%", icon: MessageSquare, color: "text-purple-600" },
    { title: "الصناعات", value: "8", change: "0%", icon: Building, color: "text-orange-600" },
    { title: "الكتب", value: "15", change: "+5%", icon: BookOpen, color: "text-pink-600" },
    { title: "الزوار اليوم", value: "2,847", change: "+15%", icon: Eye, color: "text-indigo-600" },
    { title: "معدل النمو", value: "12.5%", change: "+2.1%", icon: TrendingUp, color: "text-emerald-600" },
  ];

  const recentActivity = [
    { action: "إضافة مقال جديد", item: "استراتيجيات التسويق الرقمي", time: "منذ ساعتين" },
    { action: "تحديث خدمة", item: "تطوير المواقع الإلكترونية", time: "منذ 4 ساعات" },
    { action: "رسالة جديدة", item: "استفسار عن الخدمات", time: "منذ يوم" },
    { action: "إضافة رأي عميل", item: "شركة التطوير المتقدم", time: "منذ يومين" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
          <p className="text-gray-600 mt-2">نظرة شاملة على أداء الموقع والإحصائيات</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm mt-1 ${
                      stat.change.startsWith('+') ? 'text-green-600' : 
                      stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {stat.change} من الشهر الماضي
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                النشاط الأخير
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.item}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                الإحصائيات السريعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">معدل الزيارات اليومية</span>
                  <span className="font-bold text-green-600">+15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">وقت البقاء في الموقع</span>
                  <span className="font-bold text-blue-600">3:24 دقيقة</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">معدل التحويل</span>
                  <span className="font-bold text-purple-600">12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الصفحات الأكثر زيارة</span>
                  <span className="font-bold text-orange-600">الخدمات</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium">إضافة مقال</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm font-medium">إضافة خدمة</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <p className="text-sm font-medium">إضافة رأي عميل</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm font-medium">إدارة المستخدمين</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;