import React from "react";
import AdminLayout from "@/components/AdminLayout";
import ArticleEditor from "@/components/dashboard/ArticleEditor";

const AdminArticleEditor = () => {
  return (
    <AdminLayout>
      <ArticleEditor />
    </AdminLayout>
  );
};

export default AdminArticleEditor;