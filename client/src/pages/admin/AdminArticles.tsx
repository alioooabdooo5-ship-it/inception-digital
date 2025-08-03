import React from "react";
import AdminLayout from "@/components/AdminLayout";
import ArticlesManager from "@/components/dashboard/ArticlesManager";

const AdminArticles = () => {
  return (
    <AdminLayout>
      <ArticlesManager />
    </AdminLayout>
  );
};

export default AdminArticles;