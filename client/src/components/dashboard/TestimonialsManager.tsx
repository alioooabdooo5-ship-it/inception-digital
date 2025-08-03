
import React, { useState } from "react";
import { 
  Pencil, 
  Trash2, 
  Plus, 
  Search, 
  User, 
  Building, 
  Star
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const TestimonialsManager = () => {
  const { toast } = useToast();

  // جلب آراء العملاء من API
  const { data: testimonials = [], isLoading, error } = useQuery({
    queryKey: ["/api/testimonials"],
  });

  // حذف شهادة
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("خطأ في حذف الشهادة");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      toast({
        title: "تم بنجاح",
        description: "تم حذف الشهادة بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ في حذف الشهادة",
        variant: "destructive",
      });
    },
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);

  const form = useForm({
    defaultValues: {
      name: "",
      position: "",
      company: "",
      image: "",
      content: "",
      rating: 5,
    },
  });

  // فلترة الشهادات بناءً على البحث
  const filteredTestimonials = testimonials.filter(
    (testimonial: any) =>
      testimonial.name.includes(searchQuery) ||
      testimonial.company.includes(searchQuery) ||
      testimonial.content.includes(searchQuery)
  );

  const handleAddTestimonial = () => {
    form.reset({
      name: "",
      position: "",
      company: "",
      image: "",
      content: "",
      rating: 5,
    });
    setIsAddDialogOpen(true);
  };

  const handleEditTestimonial = (testimonial) => {
    setCurrentTestimonial(testimonial);
    form.reset({
      name: testimonial.name,
      position: testimonial.position,
      company: testimonial.company,
      image: testimonial.image,
      content: testimonial.content,
      rating: testimonial.rating,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteTestimonial = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الشهادة؟")) {
      setTestimonials(testimonials.filter((testimonial) => testimonial.id !== id));
    }
  };

  const onSubmit = (data) => {
    if (isEditDialogOpen && currentTestimonial) {
      // تحديث شهادة موجودة
      setTestimonials(
        testimonials.map((testimonial) =>
          testimonial.id === currentTestimonial.id
            ? { ...testimonial, ...data }
            : testimonial
        )
      );
      setIsEditDialogOpen(false);
    } else {
      // إضافة شهادة جديدة
      setTestimonials([
        ...testimonials,
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
        <h2 className="text-xl font-semibold text-inception-purple">إدارة الشهادات</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="بحث عن شهادة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 w-full md:w-[250px]"
            />
          </div>
          
          <Button onClick={handleAddTestimonial} className="bg-inception-purple hover:bg-inception-purple/90">
            <Plus size={16} className="ml-1" />
            إضافة شهادة جديدة
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الصورة</TableHead>
              <TableHead>الاسم</TableHead>
              <TableHead className="hidden md:table-cell">المنصب والشركة</TableHead>
              <TableHead className="hidden md:table-cell">المحتوى</TableHead>
              <TableHead>التقييم</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTestimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  لا توجد شهادات مطابقة للبحث
                </TableCell>
              </TableRow>
            ) : (
              filteredTestimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <User size={16} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{testimonial.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div>
                      <span className="block">{testimonial.position}</span>
                      <span className="text-gray-500 text-sm">{testimonial.company}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                    {testimonial.content}
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} size={14} fill="#ff6600" className="text-inception-orange" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditTestimonial(testimonial)}
                      >
                        <Pencil size={16} className="text-blue-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
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

      {/* نافذة إضافة شهادة جديدة */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-right">إضافة شهادة جديدة</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسم العميل" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المنصب</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل المنصب الوظيفي" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الشركة</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل اسم الشركة" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>محتوى الشهادة</FormLabel>
                    <FormControl>
                      <Textarea placeholder="أدخل محتوى الشهادة" {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رابط الصورة الشخصية</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل رابط الصورة" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>التقييم (1-5)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        max="5" 
                        placeholder="أدخل التقييم" 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" className="bg-inception-purple hover:bg-inception-purple/90">
                  إضافة الشهادة
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* نافذة تعديل شهادة */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-right">تعديل الشهادة</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسم العميل" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المنصب</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل المنصب الوظيفي" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الشركة</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل اسم الشركة" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>محتوى الشهادة</FormLabel>
                    <FormControl>
                      <Textarea placeholder="أدخل محتوى الشهادة" {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رابط الصورة الشخصية</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل رابط الصورة" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>التقييم (1-5)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        max="5" 
                        placeholder="أدخل التقييم" 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                      />
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

export default TestimonialsManager;
