import React from "react";
import AdminLayout from "@/components/AdminLayout";
import ServiceEditor from "@/pages/ServiceEditor";

const AdminServiceEditor = () => {
  return (
    <AdminLayout>
      <ServiceEditor />
    </AdminLayout>
  );
};

export default AdminServiceEditor;