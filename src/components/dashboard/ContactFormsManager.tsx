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

const ContactFormsManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const messages = [
    {
      id: 1,
      name: "أحمد محمد علي",
      email: "ahmed@example.com",
      phone: "+20123456789",
      subject: "استفسار عن خدمات التسويق الرقمي",
      message: "السلام عليكم، أريد الاستفسار عن خدمات التسويق الرقمي وكيفية تحسين ظهور موقعي في محركات البحث. هل يمكنكم تقديم عرض سعر مفصل؟",
      date: "2024-01-20",
      time: "14:30",
      status: "new",
      priority: "high",
      source: "contact-form",
      location: "القاهرة، مصر"
    },
    {
      id: 2,
      name: "سارة أحمد حسن",
      email: "sara@example.com",
      phone: "+20123456788",
      subject: "طلب تصميم موقع إلكتروني",
      message: "مرحباً، أحتاج لتصميم موقع إلكتروني لشركتي الناشئة في مجال الأزياء. هل يمكنكم مساعدتي في هذا الأمر؟",
      date: "2024-01-19",
      time: "09:15",
      status: "replied",
      priority: "medium",
      source: "website",
      location: "الإسكندرية، مصر"
    },
    {
      id: 3,
      name: "محمد علي حسين",
      email: "mohamed@example.com",
      phone: "+20123456787",
      subject: "شكر وتقدير",
      message: "أشكركم على الخدمة الممتازة التي قدمتموها لي في تطوير موقع شركتي. النتائج كانت فوق التوقعات.",
      date: "2024-01-18",
      time: "16:45",
      status: "archived",
      priority: "low",
      source: "email",
      location: "الجيزة، مصر"
    },
    {
      id: 4,
      name: "فاطمة حسن محمد",
      email: "fatma@example.com",
      phone: "+20123456786",
      subject: "مشكلة في الموقع",
      message: "أواجه مشكلة في الموقع الخاص بي، حيث لا تظهر الصور بشكل صحيح. أرجو المساعدة في حل هذه المشكلة بأسرع وقت ممكن.",
      date: "2024-01-17",
      time: "11:20",
      status: "in-progress",
      priority: "urgent",
      source: "support-ticket",
      location: "المنيا، مصر"
    }
  ];

  const stats = [
    { label: "الرسائل الجديدة", value: "12", color: "text-blue-600", icon: MessageSquare },
    { label: "تم الرد عليها", value: "45", color: "text-green-600", icon: CheckCircle },
    { label: "قيد المعالجة", value: "8", color: "text-yellow-600", icon: Clock },
    { label: "مؤرشفة", value: "156", color: "text-gray-600", icon: Archive }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "replied": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-yellow-100 text-yellow-800";
      case "archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "text-red-600";
      case "high": return "text-orange-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent": return <AlertCircle className="w-4 h-4" />;
      case "high": return <Star className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "new": return "جديد";
      case "replied": return "تم الرد";
      case "in-progress": return "قيد المعالجة";
      case "archived": return "مؤرشف";
      default: return status;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "urgent": return "عاجل";
      case "high": return "عالي";
      case "medium": return "متوسط";
      case "low": return "منخفض";
      default: return priority;
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.includes(searchQuery) || 
                         message.email.includes(searchQuery) || 
                         message.subject.includes(searchQuery);
    const matchesStatus = filterStatus === "all" || message.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
  };

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
            <option value="in-progress">قيد المعالجة</option>
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
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-70`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-inception-purple">الرسائل الواردة</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-right">المرسل</TableHead>
                  <TableHead className="text-right">الموضوع</TableHead>
                  <TableHead className="text-right">الأولوية</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">المصدر</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message) => (
                  <TableRow key={message.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="font-medium text-inception-purple">{message.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="w-3 h-3 ml-1" />
                          {message.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 ml-1" />
                          {message.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        <div className="font-medium text-gray-900 truncate">{message.subject}</div>
                        <div className="text-sm text-gray-500 truncate">{message.message}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center ${getPriorityColor(message.priority)}`}>
                        {getPriorityIcon(message.priority)}
                        <span className="mr-1 font-medium">{getPriorityText(message.priority)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(message.status)}>
                        {getStatusText(message.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 ml-1" />
                        {new Date(message.date).toLocaleDateString('ar-EG')}
                      </div>
                      <div className="text-sm text-gray-500">{message.time}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {message.source === "contact-form" ? "نموذج التواصل" :
                         message.source === "website" ? "الموقع" :
                         message.source === "email" ? "البريد الإلكتروني" : "تذكرة الدعم"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2 space-x-reverse">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleViewMessage(message)}
                          title="عرض"
                        >
                          <Eye size={16} className="text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon" title="رد">
                          <Reply size={16} className="text-green-500" />
                        </Button>
                        <Button variant="ghost" size="icon" title="حذف">
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Message Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-right text-xl font-bold text-inception-purple">
              تفاصيل الرسالة
            </DialogTitle>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-6">
              {/* Sender Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-inception-purple mb-3">معلومات المرسل</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-500 ml-2" />
                    <span>{selectedMessage.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-500 ml-2" />
                    <span>{selectedMessage.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-500 ml-2" />
                    <span>{selectedMessage.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-500 ml-2" />
                    <span>{selectedMessage.location}</span>
                  </div>
                </div>
              </div>

              {/* Message Details */}
              <div>
                <h3 className="font-semibold text-inception-purple mb-3">تفاصيل الرسالة</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الموضوع</label>
                    <div className="p-3 bg-gray-50 rounded-lg">{selectedMessage.subject}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">المحتوى</label>
                    <div className="p-3 bg-gray-50 rounded-lg min-h-[100px]">{selectedMessage.message}</div>
                  </div>
                </div>
              </div>

              {/* Message Meta */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-500 ml-1" />
                  <span>{new Date(selectedMessage.date).toLocaleDateString('ar-EG')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-500 ml-1" />
                  <span>{selectedMessage.time}</span>
                </div>
                <Badge className={getStatusColor(selectedMessage.status)}>
                  {getStatusText(selectedMessage.status)}
                </Badge>
                <div className={`flex items-center ${getPriorityColor(selectedMessage.priority)}`}>
                  {getPriorityIcon(selectedMessage.priority)}
                  <span className="mr-1">أولوية {getPriorityText(selectedMessage.priority)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 space-x-reverse pt-4 border-t">
                <Button className="bg-inception-purple hover:bg-inception-purple/90">
                  <Reply className="w-4 h-4 ml-1" />
                  رد على الرسالة
                </Button>
                <Button variant="outline">
                  <Archive className="w-4 h-4 ml-1" />
                  أرشفة
                </Button>
                <Button variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4 ml-1" />
                  حذف
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactFormsManager;