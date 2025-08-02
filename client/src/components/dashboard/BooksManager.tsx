
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

// بيانات تجريبية
const sampleBooks = [
  {
    id: "1",
    title: "أساسيات القيادة الإدارية",
    description: "كتاب يشرح أساسيات القيادة الإدارية الفعالة في عالم الأعمال",
    cover: "/lovable-uploads/6b7d5f55-0ca7-45cb-9463-f8a6eb07d7d4.png",
    price: "99 ريال",
  },
  {
    id: "2",
    title: "استراتيجيات التسويق الرقمي",
    description: "دليل شامل لاستراتيجيات التسويق الرقمي الحديثة",
    cover: "/lovable-uploads/28b72d61-4e8f-4b33-847a-1685c6b0b5a5.png",
    price: "129 ريال",
  },
  {
    id: "3",
    title: "إدارة المشاريع الاحترافية",
    description: "منهجية شاملة في إدارة المشاريع بفعالية واحترافية",
    cover: "/lovable-uploads/3cc93b10-435d-4b20-a3d0-da06335cf1ca.png",
    price: "149 ريال",
  },
];

const BooksManager = () => {
  const [books, setBooks] = useState(sampleBooks);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      cover: "",
      price: "",
    },
  });

  // فلترة الكتب بناءً على البحث
  const filteredBooks = books.filter(
    (book) =>
      book.title.includes(searchQuery) ||
      book.description.includes(searchQuery)
  );

  const handleAddBook = () => {
    form.reset({
      title: "",
      description: "",
      cover: "",
      price: "",
    });
    setIsAddDialogOpen(true);
  };

  const handleEditBook = (book) => {
    setCurrentBook(book);
    form.reset({
      title: book.title,
      description: book.description,
      cover: book.cover,
      price: book.price,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteBook = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الكتاب؟")) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

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
