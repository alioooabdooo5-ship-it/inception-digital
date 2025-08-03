import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Eye, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";

const AnalyticsManager = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">إحصائيات الموقع</h1>
        <p className="text-gray-600 mt-2">تتبع أداء الموقع والزيارات</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">الزيارات اليوم</p>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+12.5%</span>
              <span className="text-gray-600 mr-2">عن أمس</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">زوار جدد</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+8.2%</span>
              <span className="text-gray-600 mr-2">عن أمس</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">متوسط الوقت</p>
                <p className="text-2xl font-bold text-gray-900">3:45</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-500 font-medium">-2.1%</span>
              <span className="text-gray-600 mr-2">عن أمس</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">معدل التحويل</p>
                <p className="text-2xl font-bold text-gray-900">3.2%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+0.5%</span>
              <span className="text-gray-600 mr-2">عن أمس</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>الصفحات الأكثر زيارة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">الصفحة الرئيسية</p>
                  <p className="text-sm text-gray-600">/</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">1,234</p>
                  <p className="text-sm text-green-600">+12%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">خدماتنا</p>
                  <p className="text-sm text-gray-600">/services</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">892</p>
                  <p className="text-sm text-green-600">+8%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">من نحن</p>
                  <p className="text-sm text-gray-600">/about</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">654</p>
                  <p className="text-sm text-red-600">-3%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">اتصل بنا</p>
                  <p className="text-sm text-gray-600">/contact</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">432</p>
                  <p className="text-sm text-green-600">+15%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>مصادر الزيارات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">بحث جوجل</p>
                  <p className="text-sm text-gray-600">البحث المجاني</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">45%</p>
                  <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">زيارات مباشرة</p>
                  <p className="text-sm text-gray-600">رابط مباشر</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">32%</p>
                  <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">وسائل التواصل</p>
                  <p className="text-sm text-gray-600">فيسبوك، إنستغرام</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">18%</p>
                  <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">أخرى</p>
                  <p className="text-sm text-gray-600">مراجع أخرى</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">5%</p>
                  <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>النشاط الأخير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">رسالة تواصل جديدة</p>
                <p className="text-sm text-gray-600">من أحمد محمد - طلب عرض سعر</p>
              </div>
              <span className="text-sm text-gray-500">قبل 5 دقائق</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">زائر جديد من الرياض</p>
                <p className="text-sm text-gray-600">تصفح صفحة الخدمات</p>
              </div>
              <span className="text-sm text-gray-500">قبل 12 دقيقة</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">تحديث محتوى جديد</p>
                <p className="text-sm text-gray-600">تم نشر مقال جديد</p>
              </div>
              <span className="text-sm text-gray-500">قبل ساعة</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsManager;