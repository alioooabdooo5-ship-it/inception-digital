import React, { useState } from "react";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Calendar,
  Clock,
  User,
  MapPin,
  Search,
  Filter,
  Eye,
  Trash2,
  Reply,
  Star,
  AlertCircle,
  CheckCircle,
  Archive
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ContactForm } from "@shared/schema";

const ContactFormsManager = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactForm | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: messages = [], isLoading } = useQuery<ContactForm[]>({
    queryKey: ['/api/contact-forms'],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/contact-forms/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-forms'] });
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف الرسالة بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف الرسالة",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الرسالة؟")) {
      deleteMutation.mutate(id);
    }
  };

  const handleViewMessage = (message: ContactForm) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "replied": return "bg-green-100 text-green-800";
      case "archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "new": return "جديد";
      case "replied": return "تم الرد";
      case "archived": return "مؤرشف";
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high": return "عالي";
      case "medium": return "متوسط";
      case "low": return "منخفض";
      default: return priority;
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (message.subject?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || message.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { 
      label: "الرسائل الجديدة", 
      value: messages.filter(m => m.status === "new").length.toString(), 
      color: "text-blue-600", 
      icon: MessageSquare 
    },
    { 
      label: "تم الرد عليها", 
      value: messages.filter(m => m.status === "replied").length.toString(), 
      color: "text-green-600", 
      icon: CheckCircle 
    },
    { 
      label: "مؤرشفة", 
      value: messages.filter(m => m.status === "archived").length.toString(), 
      color: "text-gray-600", 
      icon: Archive 
    },
    { 
      label: "إجمالي الرسائل", 
      value: messages.length.toString(), 
      color: "text-purple-600", 
      icon: Mail 
    }
  ];

  if (isLoading) {
    return <div className="text-center p-4">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-inception-purple">نماذج التواصل</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="بحث في الرسائل..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 w-full md:w-[250px]"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="all">جميع الحالات</option>
            <option value="new">جديد</option>
            <option value="replied">تم الرد</option>
            <option value="archived">مؤرشف</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            الرسائل ({filteredMessages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredMessages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              لا توجد رسائل
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الاسم</TableHead>
                    <TableHead>البريد الإلكتروني</TableHead>
                    <TableHead>الموضوع</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الأولوية</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((message) => (
                    <TableRow key={message.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{message.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{message.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{message.subject || "بدون موضوع"}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(message.status)}>
                          {getStatusText(message.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`text-sm font-medium ${getPriorityColor(message.priority || "medium")}`}>
                          {getPriorityText(message.priority || "medium")}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(message.createdAt).toLocaleDateString('ar-EG')}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewMessage(message)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(message.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تفاصيل الرسالة</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">الاسم</p>
                  <p className="text-lg">{selectedMessage.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">البريد الإلكتروني</p>
                  <p className="text-lg">{selectedMessage.email}</p>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">الهاتف</p>
                    <p className="text-lg">{selectedMessage.phone}</p>
                  </div>
                )}
                {selectedMessage.company && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">الشركة</p>
                    <p className="text-lg">{selectedMessage.company}</p>
                  </div>
                )}
              </div>
              {selectedMessage.subject && (
                <div>
                  <p className="text-sm font-medium text-gray-500">الموضوع</p>
                  <p className="text-lg">{selectedMessage.subject}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-500">الرسالة</p>
                <div className="bg-gray-50 p-4 rounded-lg mt-2">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(selectedMessage.status)}>
                    {getStatusText(selectedMessage.status)}
                  </Badge>
                  <span className={`text-sm font-medium ${getPriorityColor(selectedMessage.priority || "medium")}`}>
                    {getPriorityText(selectedMessage.priority || "medium")}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(selectedMessage.createdAt).toLocaleString('ar-EG')}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactFormsManager;