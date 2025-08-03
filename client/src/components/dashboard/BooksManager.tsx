import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, BookOpen, DollarSign } from "lucide-react";
import type { Book } from "@shared/schema";

const BooksManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch books
  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ['/api/books']
  });

  // Delete book mutation
  const deleteBookMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/books/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/books'] });
      toast({ title: "تم حذف الكتاب بنجاح" });
    },
    onError: (error) => {
      toast({ 
        title: "خطأ في حذف الكتاب", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا الكتاب؟")) {
      deleteBookMutation.mutate(id);
    }
  };

  // Filter books based on search
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">إدارة الكتب</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة الكتب</h1>
          <p className="text-gray-600 mt-2">إدارة وتعديل الكتب والمنشورات</p>
        </div>
        
        <Button className="bg-inception-purple hover:bg-purple-700">
          <Plus className="w-4 h-4 ml-2" />
          إضافة كتاب جديد
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="البحث في الكتب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Books Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{books.length}</h3>
                <p className="text-gray-600">إجمالي الكتب</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {books.filter(b => b.price !== "مجاني").length}
                </h3>
                <p className="text-gray-600">الكتب المدفوعة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {new Set(books.map(b => b.category)).size}
                </h3>
                <p className="text-gray-600">فئات الكتب</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Books List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-lg font-bold">{book.title}</CardTitle>
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {book.category}
                </Badge>
                <span className="text-sm font-medium">{book.price}</span>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-600 mb-4 line-clamp-2">{book.description}</p>
              
              {book.longDescription && (
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-gray-700 line-clamp-2">{book.longDescription}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 ml-1" />
                  تعديل
                </Button>

                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDelete(book.id)}
                  disabled={deleteBookMutation.isPending}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && !isLoading && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد كتب</h3>
            <p className="text-gray-600 mb-6">ابدأ بإضافة أول كتاب لمكتبتك</p>
            <Button className="bg-inception-purple hover:bg-purple-700">
              <Plus className="w-4 h-4 ml-2" />
              إضافة كتاب جديد
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BooksManager;