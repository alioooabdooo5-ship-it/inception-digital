
import React, { useState } from "react";
import { 
  Pencil, 
  Trash2, 
  Plus, 
  Search, 
  BookOpen, 
  DollarSign 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const BooksManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // جلب الكتب من API
  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ["/api/books"],
  });

  // حذف كتاب
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("خطأ في حذف الكتاب");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/books"] });
      toast({
        title: "تم بنجاح",
        description: "تم حذف الكتاب بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ في حذف الكتاب",
        variant: "destructive",
      });
    },
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  // فلترة الكتب بناءً على البحث
  const filteredBooks = books.filter(
    (book: any) =>
      book.title.includes(searchQuery) ||
      book.description.includes(searchQuery)
  );

  const handleAddBook = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditBook = (book: any) => {
    setCurrentBook(book);
    setIsEditDialogOpen(true);
  };

  const handleDeleteBook = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الكتاب؟")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="text-center py-8">
          <p className="text-gray-500">جارٍ تحميل الكتب...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="text-center py-8">
          <p className="text-red-500">خطأ في تحميل الكتب</p>
        </div>
      </div>
    );
  }

  const onSubmit = (data) => {
    if (isEditDialogOpen && currentBook) {
      // تحديث كتاب موجود
      setBooks(
        books.map((book) =>
          book.id === currentBook.id
            ? { ...book, ...data }
            : book
        )
      );
      setIsEditDialogOpen(false);
    } else {
      // إضافة كتاب جديد
      setBooks([
        ...books,
        {
          id: Date.now().toString(),
          ...data,
        },
      ]);
      setIsAddDialogOpen(false);
    }
    form.reset();
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold text-inception-purple">إدارة الكتب</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="بحث عن كتاب..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 w-full md:w-[250px]"
            />
          </div>
          
          <Button onClick={handleAddBook} className="bg-inception-purple hover:bg-inception-purple/90">
            <Plus size={16} className="ml-1" />
            إضافة كتاب جديد
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الغلاف</TableHead>
              <TableHead>العنوان</TableHead>
              <TableHead className="hidden md:table-cell">الوصف</TableHead>
              <TableHead>السعر</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBooks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  لا توجد كتب مطابقة للبحث
                </TableCell>
              </TableRow>
            ) : (
              filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <div className="w-12 h-16 rounded bg-gray-100 overflow-hidden">
                      {book.cover ? (
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <BookOpen size={20} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-[350px] truncate">
                    {book.description}
                  </TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditBook(book)}
                      >
                        <Pencil size={16} className="text-blue-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteBook(book.id)}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* نافذة إضافة كتاب جديد */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-right">إضافة كتاب جديد</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان الكتاب</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل عنوان الكتاب" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وصف الكتاب</FormLabel>
                    <FormControl>
                      <Textarea placeholder="أدخل وصف الكتاب" {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cover"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رابط صورة الغلاف</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل رابط صورة الغلاف" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>السعر</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <Input placeholder="أدخل سعر الكتاب" {...field} className="pr-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" className="bg-inception-purple hover:bg-inception-purple/90">
                  إضافة الكتاب
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* نافذة تعديل كتاب */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-right">تعديل الكتاب</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان الكتاب</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل عنوان الكتاب" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وصف الكتاب</FormLabel>
                    <FormControl>
                      <Textarea placeholder="أدخل وصف الكتاب" {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cover"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رابط صورة الغلاف</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل رابط صورة الغلاف" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>السعر</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <Input placeholder="أدخل سعر الكتاب" {...field} className="pr-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" className="bg-inception-purple hover:bg-inception-purple/90">
                  حفظ التغييرات
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BooksManager;
