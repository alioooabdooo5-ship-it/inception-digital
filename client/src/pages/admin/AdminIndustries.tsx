import React from "react";
import AdminLayout from "@/components/AdminLayout";
import IndustriesManager from "@/components/dashboard/IndustriesManager";

const AdminIndustries = () => {
  return (
    <AdminLayout>
      <IndustriesManager />
    </AdminLayout>
  );
};

export default AdminIndustries;