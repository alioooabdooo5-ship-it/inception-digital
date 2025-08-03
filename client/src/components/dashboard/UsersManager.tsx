import React, { useState } from "react";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  ShieldCheck,
  Ban
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";

const UsersManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // في الوقت الحالي، لدينا فقط جدول users الأساسي للمصادقة
  // يمكن إضافة المزيد من المعلومات لاحقاً
  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ['/api/users'],
    enabled: false, // تعطيل الآن لأن API غير متوفر بعد
  });

  // بيانات ديمو مؤقتة حتى يتم إعداد API للمستخدمين
  const sampleUsers = [
    {
      id: 1,
      username: "admin",
      email: "admin@inception.com",
      role: "admin",
      status: "active",
      createdAt: new Date(),
      lastLogin: new Date(),
      postsCount: 12,
    }
  ];

  const displayUsers = users.length > 0 ? users : sampleUsers;

  const filteredUsers = displayUsers.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (user.email?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-yellow-100 text-yellow-800";
      case "suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "نشط";
      case "inactive": return "غير نشط";
      case "suspended": return "معلق";
      default: return status;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "text-red-600";
      case "editor": return "text-blue-600";
      case "user": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case "admin": return "مدير";
      case "editor": return "محرر";
      case "user": return "مستخدم";
      default: return role;
    }
  };

  const stats = [
    { 
      label: "إجمالي المستخدمين", 
      value: displayUsers.length.toString(), 
      color: "text-blue-600", 
      icon: Users 
    },
    { 
      label: "المديرين", 
      value: displayUsers.filter(u => u.role === "admin").length.toString(), 
      color: "text-red-600", 
      icon: ShieldCheck 
    },
    { 
      label: "المحررين", 
      value: displayUsers.filter(u => u.role === "editor").length.toString(), 
      color: "text-blue-600", 
      icon: Shield 
    },
    { 
      label: "المستخدمين النشطين", 
      value: displayUsers.filter(u => u.status === "active").length.toString(), 
      color: "text-green-600", 
      icon: Users 
    }
  ];

  if (isLoading) {
    return <div className="text-center p-4">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-inception-purple">إدارة المستخدمين</h2>
        <div className="flex items-center gap-4">
          <Button className="bg-inception-purple hover:bg-inception-purple/90">
            <UserPlus className="w-4 h-4 mr-2" />
            إضافة مستخدم جديد
          </Button>
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

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="بحث في المستخدمين..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 w-full md:w-[250px]"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="all">جميع الأدوار</option>
            <option value="admin">مدير</option>
            <option value="editor">محرر</option>
            <option value="user">مستخدم</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            المستخدمين ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              لا يوجد مستخدمين
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المستخدم</TableHead>
                    <TableHead>البريد الإلكتروني</TableHead>
                    <TableHead>الدور</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>تاريخ التسجيل</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} />
                            <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.username}</p>
                            {user.postsCount && (
                              <p className="text-sm text-gray-500">{user.postsCount} منشور</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{user.email || "غير محدد"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`text-sm font-medium ${getRoleColor(user.role || "user")}`}>
                          {getRoleText(user.role || "user")}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status || "active")}>
                          {getStatusText(user.status || "active")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(user.createdAt).toLocaleDateString('ar-EG')}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          {user.username !== "admin" && (
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
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

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900 mb-1">ملاحظة</h3>
            <p className="text-sm text-blue-700">
              حالياً يعرض النظام المستخدمين الأساسيين فقط. يمكن إضافة المزيد من التفاصيل مثل الأدوار المتقدمة، والصلاحيات، ومعلومات الملف الشخصي لاحقاً.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManager;