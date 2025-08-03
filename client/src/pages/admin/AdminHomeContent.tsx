import React from "react";
import AdminLayout from "@/components/AdminLayout";
import ContentManager from "@/components/dashboard/ContentManager";

const AdminHomeContent = () => {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50/30">
        <ContentManager />
      </div>
    </AdminLayout>
  );
};

export default AdminHomeContent;