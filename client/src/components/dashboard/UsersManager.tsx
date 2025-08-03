import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, User as UserIcon, Shield, Calendar } from "lucide-react";
import type { User } from "@shared/schema";

const UsersManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ['/api/users']
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/users/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
      toast({ title: "تم حذف المستخدم بنجاح" });
    },
    onError: (error) => {
      toast({ 
        title: "خطأ في حذف المستخدم", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      deleteUserMutation.mutate(id);
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">إدارة المستخدمين</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة المستخدمين</h1>
          <p className="text-gray-600 mt-2">إدارة وتعديل حسابات المستخدمين</p>
        </div>
        
        <Button className="bg-inception-purple hover:bg-purple-700">
          <Plus className="w-4 h-4 ml-2" />
          إضافة مستخدم جديد
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="البحث في المستخدمين..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Users Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{users.length}</h3>
                <p className="text-gray-600">إجمالي المستخدمين</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.username === 'admin').length}
                </h3>
                <p className="text-gray-600">المشرفين</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {users.filter(u => {
                    const created = new Date(u.createdAt);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return created > weekAgo;
                  }).length}
                </h3>
                <p className="text-gray-600">جدد هذا الأسبوع</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  {user.username === 'admin' ? (
                    <Shield className="w-5 h-5" />
                  ) : (
                    <UserIcon className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-lg font-bold">{user.username}</CardTitle>
                  <p className="text-sm opacity-90">
                    {user.username === 'admin' ? 'مشرف النظام' : 'مستخدم عادي'}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="mb-4">
                <Badge 
                  variant={user.username === 'admin' ? 'default' : 'secondary'} 
                  className="mb-2"
                >
                  {user.username === 'admin' ? 'مشرف' : 'مستخدم'}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>تاريخ الإنشاء:</span>
                  <span>{new Date(user.createdAt).toLocaleDateString('ar-SA')}</span>
                </div>
                <div className="flex justify-between">
                  <span>آخر تحديث:</span>
                  <span>{new Date(user.updatedAt).toLocaleDateString('ar-SA')}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 ml-1" />
                  تعديل
                </Button>

                {user.username !== 'admin' && (
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(user.id)}
                    disabled={deleteUserMutation.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && !isLoading && (
        <Card>
          <CardContent className="p-12 text-center">
            <UserIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد مستخدمين</h3>
            <p className="text-gray-600 mb-6">ابدأ بإضافة أول مستخدم للنظام</p>
            <Button className="bg-inception-purple hover:bg-purple-700">
              <Plus className="w-4 h-4 ml-2" />
              إضافة مستخدم جديد
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UsersManager;