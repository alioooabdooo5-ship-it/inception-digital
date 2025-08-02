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

const UsersManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const users = [
    {
      id: 1,
      name: "أحمد محمد علي",
      email: "ahmed@example.com",
      phone: "+20123456789",
      role: "admin",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-01-20",
      avatar: "/placeholder-avatar.jpg",
      postsCount: 12,
      location: "القاهرة، مصر"
    },
    {
      id: 2,
      name: "سارة أحمد حسن",
      email: "sara@example.com",
      phone: "+20123456788",
      role: "editor",
      status: "active",
      joinDate: "2024-01-10",
      lastLogin: "2024-01-19",
      avatar: "/placeholder-avatar.jpg",
      postsCount: 8,
      location: "الإسكندرية، مصر"
    },
    {
      id: 3,
      name: "محمد علي حسين",
      email: "mohamed@example.com",
      phone: "+20123456787",
      role: "user",
      status: "inactive",
      joinDate: "2024-01-05",
      lastLogin: "2024-01-18",
      avatar: "/placeholder-avatar.jpg",
      postsCount: 3,
      location: "الجيزة، مصر"
    },
    {
      id: 4,
      name: "فاطمة حسن محمد",
      email: "fatma@example.com",
      phone: "+20123456786",
      role: "user",
      status: "suspended",
      joinDate: "2023-12-20",
      lastLogin: "2024-01-17",
      avatar: "/placeholder-avatar.jpg",
      postsCount: 0,
      location: "المنيا، مصر"
    }
  ];

  const stats = [
    { label: "إجمالي المستخدمين", value: "1,245", color: "text-blue-600" },
    { label: "المستخدمين النشطين", value: "892", color: "text-green-600" },
    { label: "المستخدمين الجدد اليوم", value: "23", color: "text-purple-600" },
    { label: "المحظورين", value: "8", color: "text-red-600" }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800";
      case "editor": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-yellow-100 text-yellow-800";
      case "suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <ShieldCheck className="w-4 h-4" />;
      case "inactive": return <Shield className="w-4 h-4" />;
      case "suspended": return <Ban className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.includes(searchQuery) || user.email.includes(searchQuery);
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-inception-purple">إدارة المستخدمين</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="بحث عن مستخدم..."
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
          <Button className="bg-inception-purple hover:bg-inception-purple/90">
            <UserPlus size={16} className="ml-1" />
            إضافة مستخدم
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
                <Users className={`w-8 h-8 ${stat.color} opacity-70`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-inception-purple">قائمة المستخدمين</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-right">المستخدم</TableHead>
                  <TableHead className="text-right">الدور</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">تاريخ الانضمام</TableHead>
                  <TableHead className="text-right">آخر دخول</TableHead>
                  <TableHead className="text-right">المقالات</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-inception-purple">{user.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="w-3 h-3 ml-1" />
                            {user.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 ml-1" />
                            {user.location}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role === "admin" ? "مدير" : user.role === "editor" ? "محرر" : "مستخدم"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>
                        <div className="flex items-center">
                          {getStatusIcon(user.status)}
                          <span className="mr-1">
                            {user.status === "active" ? "نشط" : 
                             user.status === "inactive" ? "غير نشط" : "محظور"}
                          </span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 ml-1" />
                        {new Date(user.joinDate).toLocaleDateString('ar-EG')}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(user.lastLogin).toLocaleDateString('ar-EG')}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-inception-purple">{user.postsCount}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2 space-x-reverse">
                        <Button variant="ghost" size="icon" title="تعديل">
                          <Edit size={16} className="text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon" title="حذف">
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                        <Button variant="ghost" size="icon" title="المزيد">
                          <MoreVertical size={16} className="text-gray-500" />
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
    </div>
  );
};

export default UsersManager;