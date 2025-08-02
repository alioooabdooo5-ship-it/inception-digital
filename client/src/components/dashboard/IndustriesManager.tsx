
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
interface IndustriesManagerProps {
  onEditIndustry?: (industryId: string) => void;
  onCreateIndustry?: () => void;
}

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

// بيانات تجريبية
const sampleIndustries = [
  {
    id: "1",
    title: "التكنولوجيا والاتصالات",
    description: "خدمات استشارية مخصصة لقطاع التكنولوجيا والاتصالات",
    image: "/lovable-uploads/91e78bbe-63bc-4f32-98d9-9b42cbab317a.png",
  },
  {
    id: "2",
    title: "الخدمات المالية",
    description: "خدمات استشارية للبنوك والمؤسسات المالية والتأمين",
    image: "/lovable-uploads/28b72d61-4e8f-4b33-847a-1685c6b0b5a5.png",
  },
  {
    id: "3",
    title: "التصنيع والإنتاج",
    description: "خدمات استشارية للمصانع وشركات الإنتاج والتصنيع",
    image: "/lovable-uploads/3cc93b10-435d-4b20-a3d0-da06335cf1ca.png",
  },
];

const IndustriesManager: React.FC<IndustriesManagerProps> = ({ onEditIndustry, onCreateIndustry }) => {
  const [industries, setIndustries] = useState(sampleIndustries);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentIndustry, setCurrentIndustry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  // فلترة الصناعات بناءً على البحث
  const filteredIndustries = industries.filter(
    (industry) =>
      industry.title.includes(searchQuery) ||
      industry.description.includes(searchQuery)
  );

  const handleAddIndustry = () => {
    if (onCreateIndustry) {
      onCreateIndustry();
    }
  };

  const handleEditIndustry = (industry) => {
    if (onEditIndustry) {
      onEditIndustry(industry.id);
    }
  };

  const handleDeleteIndustry = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الصناعة؟")) {
      setIndustries(industries.filter((industry) => industry.id !== id));
    }
  };

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
