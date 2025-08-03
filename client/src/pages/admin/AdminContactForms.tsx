import React from "react";
import AdminLayout from "@/components/AdminLayout";
import ContactFormsManager from "@/components/dashboard/ContactFormsManager";

const AdminContactForms = () => {
  return (
    <AdminLayout>
      <ContactFormsManager />
    </AdminLayout>
  );
};

export default AdminContactForms;