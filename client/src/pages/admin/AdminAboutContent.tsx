import React from "react";
import AdminLayout from "@/components/AdminLayout";
import AboutManager from "@/components/dashboard/AboutManager";

const AdminAboutContent = () => {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50/30">
        <AboutManager />
      </div>
    </AdminLayout>
  );
};

export default AdminAboutContent;