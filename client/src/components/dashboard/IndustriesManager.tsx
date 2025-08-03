
import React, { useState } from "react";
import { 
  Pencil, 
  Trash2, 
  Plus, 
  Search, 
  Image 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface IndustriesManagerProps {
  onEditIndustry?: (industryId: string) => void;
  onCreateIndustry?: () => void;
}

const IndustriesManager: React.FC<IndustriesManagerProps> = ({ onEditIndustry, onCreateIndustry }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // جلب الصناعات من API
  const { data: industries = [], isLoading, error } = useQuery({
    queryKey: ["/api/industries"],
  });

  // حذف صناعة
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/industries/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("خطأ في حذف الصناعة");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/industries"] });
      toast({
        title: "تم بنجاح",
        description: "تم حذف الصناعة بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ في حذف الصناعة",
        variant: "destructive",
      });
    },
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentIndustry, setCurrentIndustry] = useState(null);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  // فلترة الصناعات بناءً على البحث
  const filteredIndustries = industries.filter(
    (industry: any) =>
      industry.title.includes(searchQuery) ||
      industry.description.includes(searchQuery)
  );

  const handleAddIndustry = () => {
    if (onCreateIndustry) {
      onCreateIndustry();
    }
  };

  const handleEditIndustry = (industry: any) => {
    if (onEditIndustry) {
      onEditIndustry(industry.id.toString());
    }
  };

  const handleDeleteIndustry = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الصناعة؟")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="text-center py-8">
          <p className="text-gray-500">جارٍ تحميل الصناعات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="text-center py-8">
          <p className="text-red-500">خطأ في تحميل الصناعات</p>
        </div>
      </div>
    );
  }

  const onSubmit = (data) => {
    if (isEditDialogOpen && currentIndustry) {
      // تحديث صناعة موجودة
      setIndustries(
        industries.map((industry) =>
          industry.id === currentIndustry.id
            ? { ...industry, ...data }
            : industry
        )
      );
      setIsEditDialogOpen(false);
    } else {
      // إضافة صناعة جديدة
      setIndustries([
        ...industries,
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
        <h2 className="text-xl font-semibold text-inception-purple">إدارة الصناعات</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="بحث عن صناعة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 w-full md:w-[250px]"
            />
          </div>
          
          <Button onClick={handleAddIndustry} className="bg-inception-purple hover:bg-inception-purple/90">
            <Plus size={16} className="ml-1" />
            إضافة صناعة جديدة
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الصورة</TableHead>
              <TableHead>العنوان</TableHead>
              <TableHead className="hidden md:table-cell">الوصف</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIndustries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  لا توجد صناعات مطابقة للبحث
                </TableCell>
              </TableRow>
            ) : (
              filteredIndustries.map((industry) => (
                <TableRow key={industry.id}>
                  <TableCell>
                    <div className="w-16 h-12 rounded bg-gray-100 overflow-hidden">
                      {industry.image ? (
                        <img
                          src={industry.image}
                          alt={industry.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <Image size={20} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{industry.title}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-[400px] truncate">
                    {industry.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditIndustry(industry)}
                      >
                        <Pencil size={16} className="text-blue-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteIndustry(industry.id)}
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

      {/* نافذة إضافة صناعة جديدة */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-right">إضافة صناعة جديدة</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الصناعة</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسم الصناعة" {...field} />
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
                    <FormLabel>وصف الصناعة</FormLabel>
                    <FormControl>
                      <Textarea placeholder="أدخل وصف الصناعة" {...field} rows={4} />
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
                    <FormLabel>رابط الصورة</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل رابط الصورة" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" className="bg-inception-purple hover:bg-inception-purple/90">
                  إضافة الصناعة
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* نافذة تعديل صناعة */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-right">تعديل الصناعة</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الصناعة</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسم الصناعة" {...field} />
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
                    <FormLabel>وصف الصناعة</FormLabel>
                    <FormControl>
                      <Textarea placeholder="أدخل وصف الصناعة" {...field} rows={4} />
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
                    <FormLabel>رابط الصورة</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل رابط الصورة" {...field} />
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

export default IndustriesManager;
