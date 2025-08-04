import React from "react";
import AdminLayout from "@/components/AdminLayout";
import EnhancedArticleEditor from "@/components/dashboard/EnhancedArticleEditor";

const AdminArticleEditor = () => {
  return (
    <AdminLayout>
      <EnhancedArticleEditor />
    </AdminLayout>
  );
};

export default AdminArticleEditor;