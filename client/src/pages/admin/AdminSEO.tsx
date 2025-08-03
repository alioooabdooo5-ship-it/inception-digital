import React from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, TrendingUp, Eye, Link } from "lucide-react";

const AdminSEO = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO المتطور</h1>
          <p className="text-gray-600 mt-2">تحسين محركات البحث والتحليلات</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ترتيب الكلمات المفتاحية</p>
                  <p className="text-2xl font-bold text-gray-900">15</p>
                </div>
                <Search className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الزيارات العضوية</p>
                  <p className="text-2xl font-bold text-gray-900">2,847</p>
                </div>
                <Eye className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">نقاط تحسين SEO</p>
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الروابط الخلفية</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
                <Link className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>أدوات SEO المتقدمة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">أدوات SEO المتقدمة</h3>
              <p className="text-gray-500">سيتم إضافة أدوات تحليل SEO المتقدمة قريباً</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSEO;