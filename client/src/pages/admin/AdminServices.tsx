import React from "react";
import AdminLayout from "@/components/AdminLayout";
import ServicesManager from "@/components/dashboard/ServicesManager";

const AdminServices = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <ServicesManager />
      </div>
    </AdminLayout>
  );
};

export default AdminServices;