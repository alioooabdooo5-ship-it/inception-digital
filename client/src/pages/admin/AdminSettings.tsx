import React from "react";
import AdminLayout from "@/components/AdminLayout";
import ContentManager from "@/components/dashboard/ContentManager";

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50/30 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">الإعدادات العامة</h1>
            <p className="text-gray-600">إدارة إعدادات الموقع العامة والتفضيلات</p>
          </div>
          <ContentManager />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;