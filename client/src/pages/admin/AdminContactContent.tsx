import React from "react";
import AdminLayout from "@/components/AdminLayout";
import ContactManager from "@/components/dashboard/ContactManager";

const AdminContactContent = () => {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50/30">
        <ContactManager />
      </div>
    </AdminLayout>
  );
};

export default AdminContactContent;