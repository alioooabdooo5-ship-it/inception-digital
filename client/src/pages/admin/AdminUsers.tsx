import React from "react";
import AdminLayout from "@/components/AdminLayout";
import UsersManager from "@/components/dashboard/UsersManager";

const AdminUsers = () => {
  return (
    <AdminLayout>
      <UsersManager />
    </AdminLayout>
  );
};

export default AdminUsers;