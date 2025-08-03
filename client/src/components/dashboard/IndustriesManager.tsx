import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  Pencil, 
  Trash2, 
  Plus, 
  Search, 
  Image,
  Building,
  Eye,
  Edit
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Industry {
  id: number;
  title: string;
  description: string;
  image?: string;
}

interface IndustriesManagerProps {
  onEditIndustry?: (industryId: string) => void;
  onCreateIndustry?: () => void;
}

const IndustriesManager: React.FC<IndustriesManagerProps> = ({ onEditIndustry, onCreateIndustry }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentIndustry, setCurrentIndustry] = useState<Industry | null>(null);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
    }
  });

  // جلب الصناعات من API
  const { data: industries = [], isLoading, error } = useQuery<Industry[]>({
    queryKey: ["/api/industries"],
  });

  // إضافة صناعة جديدة
  const addMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/industries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("خطأ في إضافة الصناعة");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/industries"] });
      setIsAddDialogOpen(false);
      form.reset();
      toast({
        title: "تم بنجاح",
        description: "تم إضافة الصناعة بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ في إضافة الصناعة",
        variant: "destructive",
      });
    },
  });

  // تحديث صناعة
  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`/api/industries/${currentIndustry?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("خطأ في تحديث الصناعة");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/industries"] });
      setIsEditDialogOpen(false);
      setCurrentIndustry(null);
      form.reset();
      toast({
        title: "تم بنجاح",
        description: "تم تحديث الصناعة بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحديث الصناعة",
        variant: "destructive",
      });
    },
  });

  // حذف صناعة
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/industries/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("خطأ في حذف الصناعة");
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

  const filteredIndustries = industries.filter((industry) =>
    industry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    industry.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (industry: Industry) => {
    setCurrentIndustry(industry);
    form.setValue("title", industry.title);
    form.setValue("description", industry.description);
    form.setValue("image", industry.image || "");
    setIsEditDialogOpen(true);
  };

  const handleAdd = (data: any) => {
    addMutation.mutate(data);
  };

  const handleUpdate = (data: any) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-inception-purple mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل الصناعات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-3 flex items-center gap-3">
          <Building className="w-8 h-8" />
          إدارة الصناعات
        </h1>
        <p className="text-orange-100 text-lg">إدارة قطاعات العمل والصناعات المختلفة</p>
      </div>

      {/* Controls */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-gray-900">الصناعات المتاحة</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة صناعة جديدة
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في الصناعات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>

          {/* Industries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIndustries.map((industry) => (
              <Card key={industry.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(industry)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteMutation.mutate(industry.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {industry.description}
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        عرض التفاصيل
                      </span>
                      {industry.image && (
                        <span className="flex items-center gap-1">
                          <Image className="w-4 h-4" />
                          صورة
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredIndustries.length === 0 && (
            <div className="text-center py-12">
              <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد صناعات</h3>
              <p className="text-gray-500">لم يتم العثور على صناعات مطابقة لبحثك</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">إضافة صناعة جديدة</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAdd)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">عنوان الصناعة</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل عنوان الصناعة" {...field} />
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
                    <FormLabel className="text-lg font-medium">وصف الصناعة</FormLabel>
                    <FormControl>
                      <Textarea placeholder="أدخل وصف تفصيلي للصناعة" rows={4} {...field} />
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
                    <FormLabel className="text-lg font-medium">رابط الصورة (اختياري)</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل رابط صورة الصناعة" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit" disabled={addMutation.isPending} className="bg-gradient-to-r from-orange-500 to-orange-600">
                  {addMutation.isPending ? "جاري الإضافة..." : "إضافة الصناعة"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">تعديل الصناعة</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">عنوان الصناعة</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل عنوان الصناعة" {...field} />
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
                    <FormLabel className="text-lg font-medium">وصف الصناعة</FormLabel>
                    <FormControl>
                      <Textarea placeholder="أدخل وصف تفصيلي للصناعة" rows={4} {...field} />
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
                    <FormLabel className="text-lg font-medium">رابط الصورة (اختياري)</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل رابط صورة الصناعة" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit" disabled={updateMutation.isPending} className="bg-gradient-to-r from-orange-500 to-orange-600">
                  {updateMutation.isPending ? "جاري التحديث..." : "تحديث الصناعة"}
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