import React from "react";
import AdminLayout from "@/components/AdminLayout";
import SettingsManager from "@/components/dashboard/SettingsManager";

const AdminSettings = () => {
  return (
    <AdminLayout>
      <SettingsManager />
    </AdminLayout>
  );
};

export default AdminSettings;