import React from "react";
import AdminLayout from "@/components/AdminLayout";

export default function AdminDashboard() {
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
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المقالات</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-sm text-green-600 mt-1">+12% من الشهر الماضي</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                📝
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الخدمات النشطة</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-green-600 mt-1">+3% من الشهر الماضي</p>
              </div>
              <div className="p-3 rounded-full bg-green-50 text-green-600">
                💼
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">آراء العملاء</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-green-600 mt-1">+8% من الشهر الماضي</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-50 text-yellow-600">
                ⭐
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">رسائل التواصل</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-sm text-green-600 mt-1">+25% من الشهر الماضي</p>
              </div>
              <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                💬
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">إجراءات سريعة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                📝
              </div>
              <p className="text-sm font-medium">إضافة مقال</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                💼
              </div>
              <p className="text-sm font-medium">إضافة خدمة</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                ⭐
              </div>
              <p className="text-sm font-medium">إضافة رأي عميل</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                👥
              </div>
              <p className="text-sm font-medium">إدارة المستخدمين</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}