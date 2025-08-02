import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer,
  Globe,
  Smartphone,
  Monitor,
  Clock,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const AnalyticsManager = () => {
  const stats = [
    { 
      label: "إجمالي الزيارات", 
      value: "24,652", 
      change: "+12.5%", 
      trend: "up", 
      color: "text-blue-600",
      icon: Eye 
    },
    { 
      label: "المستخدمين الفريدين", 
      value: "8,431", 
      change: "+8.2%", 
      trend: "up", 
      color: "text-green-600",
      icon: Users 
    },
    { 
      label: "معدل الارتداد", 
      value: "24.3%", 
      change: "-3.1%", 
      trend: "down", 
      color: "text-green-600",
      icon: MousePointer 
    },
    { 
      label: "متوسط وقت الجلسة", 
      value: "4:32", 
      change: "+15.4%", 
      trend: "up", 
      color: "text-purple-600",
      icon: Clock 
    }
  ];

  const topPages = [
    { page: "/", views: 8432, percentage: 34.2 },
    { page: "/services", views: 5621, percentage: 22.8 },
    { page: "/industries", views: 3456, percentage: 14.0 },
    { page: "/articles", views: 2843, percentage: 11.5 },
    { page: "/contact", views: 2134, percentage: 8.7 },
    { page: "/about", views: 1876, percentage: 7.6 },
    { page: "/books", views: 290, percentage: 1.2 }
  ];

  const trafficSources = [
    { source: "البحث المباشر", visitors: 9875, percentage: 40.1, color: "bg-blue-500" },
    { source: "شبكات التواصل الاجتماعي", visitors: 6234, percentage: 25.3, color: "bg-pink-500" },
    { source: "المواقع المرجعية", visitors: 4321, percentage: 17.5, color: "bg-green-500" },
    { source: "الحملات الإعلانية", visitors: 2876, percentage: 11.7, color: "bg-orange-500" },
    { source: "البريد الإلكتروني", visitors: 1346, percentage: 5.4, color: "bg-purple-500" }
  ];

  const deviceStats = [
    { device: "الجوال", count: 14789, percentage: 60.0, icon: Smartphone },
    { device: "سطح المكتب", count: 7396, percentage: 30.0, icon: Monitor },
    { device: "التابلت", count: 2467, percentage: 10.0, icon: Globe }
  ];

  const recentActivity = [
    { action: "زيارة جديدة", page: "/services", time: "منذ دقيقتين", location: "القاهرة، مصر" },
    { action: "تحميل ملف", page: "/books", time: "منذ 5 دقائق", location: "الإسكندرية، مصر" },
    { action: "إرسال نموذج", page: "/contact", time: "منذ 8 دقائق", location: "الجيزة، مصر" },
    { action: "مشاركة مقال", page: "/articles", time: "منذ 12 دقيقة", location: "المنيا، مصر" },
    { action: "زيارة جديدة", page: "/industries", time: "منذ 15 دقيقة", location: "أسوان، مصر" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-inception-purple">التحليلات والإحصائيات</h2>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-600">آخر 30 يوم</span>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-70`} />
                <div className={`flex items-center text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 ml-1" />
                  ) : (
                    <TrendingUp className="w-4 h-4 ml-1 rotate-180" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-inception-purple">أكثر الصفحات زيارة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{page.page}</span>
                      <span className="text-sm text-gray-600">{page.views.toLocaleString()}</span>
                    </div>
                    <Progress value={page.percentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-inception-purple">مصادر الزيارات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse flex-1">
                    <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                    <span className="font-medium text-gray-900">{source.source}</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-inception-purple">{source.visitors.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">{source.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-inception-purple">إحصائيات الأجهزة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {deviceStats.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <device.icon className="w-6 h-6 text-inception-purple" />
                    <span className="font-medium text-gray-900">{device.device}</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-inception-purple">{device.count.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">{device.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-inception-purple">النشاط الأخير</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-inception-orange rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{activity.action}</span>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                    <div className="text-sm text-gray-600">{activity.page}</div>
                    <div className="text-xs text-gray-500">{activity.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-inception-purple">أداء الموقع عبر الوقت</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-inception-purple/5 to-inception-orange/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-inception-purple/50 mx-auto mb-4" />
              <p className="text-gray-600">سيتم إضافة الرسوم البيانية هنا</p>
              <p className="text-sm text-gray-500">بعد تكامل أدوات التحليل</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsManager;