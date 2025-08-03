import React from "react";
import AdminLayout from "@/components/AdminLayout";
import ServicesManager from "@/components/dashboard/ServicesManager";

const AdminServices = () => {
  return (
    <AdminLayout>
      <ServicesManager />
    </AdminLayout>
  );
};

export default AdminServices;