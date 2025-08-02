
import React, { useState } from "react";
import { 
  Pencil, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  Eye 
} from "lucide-react";

interface ServicesManagerProps {
  onEditService?: (serviceId: string) => void;
  onCreateService?: () => void;
}
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

// بيانات تجريبية
const sampleServices = [
  {
    id: "1",
    title: "الاستشارات الإدارية",
    description: "نقدم خدمات استشارية متكاملة لتطوير الأعمال وتحسين الأداء",
    illustration: "/lovable-uploads/28b72d61-4e8f-4b33-847a-1685c6b0b5a5.png",
  },
  {
    id: "2",
    title: "تطوير الأعمال",
    description: "استراتيجيات وحلول مبتكرة لتنمية أعمالك وزيادة أرباحك",
    illustration: "/lovable-uploads/3cc93b10-435d-4b20-a3d0-da06335cf1ca.png",
  },
  {
    id: "3",
    title: "التحول الرقمي",
    description: "مساعدة الشركات على التحول الرقمي وتبني أحدث التقنيات",
    illustration: "/lovable-uploads/6b7d5f55-0ca7-45cb-9463-f8a6eb07d7d4.png",
  },
];

const ServicesManager: React.FC<ServicesManagerProps> = ({ onEditService, onCreateService }) => {
  const [services, setServices] = useState(sampleServices);
  const [searchQuery, setSearchQuery] = useState("");

  // فلترة الخدمات بناءً على البحث
  const filteredServices = services.filter(
    (service) =>
      service.title.includes(searchQuery) ||
      service.description.includes(searchQuery)
  );

  const handleAddService = () => {
    if (onCreateService) {
      onCreateService();
    }
  };

  const handleEditService = (service) => {
    if (onEditService) {
      onEditService(service.id);
    }
  };

  const handleDeleteService = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الخدمة؟")) {
      setServices(services.filter((service) => service.id !== id));
    }
  };


  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold text-inception-purple">إدارة الخدمات</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="بحث عن خدمة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 w-full md:w-[250px]"
            />
          </div>
          
          <Button onClick={handleAddService} className="bg-inception-purple hover:bg-inception-purple/90">
            <Plus size={16} className="ml-1" />
            إضافة خدمة جديدة
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
            {filteredServices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  لا توجد خدمات مطابقة للبحث
                </TableCell>
              </TableRow>
            ) : (
              filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden">
                      {service.illustration ? (
                        <img
                          src={service.illustration}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <Eye size={20} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-[400px] truncate">
                    {service.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditService(service)}
                      >
                        <Pencil size={16} className="text-blue-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteService(service.id)}
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

    </div>
  );
};

export default ServicesManager;
