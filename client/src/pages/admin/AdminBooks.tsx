import React from "react";
import AdminLayout from "@/components/AdminLayout";
import BooksManager from "@/components/dashboard/BooksManager";

const AdminBooks = () => {
  return (
    <AdminLayout>
      <BooksManager />
    </AdminLayout>
  );
};

export default AdminBooks;