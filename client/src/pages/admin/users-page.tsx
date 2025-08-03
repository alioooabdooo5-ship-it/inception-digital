import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { User } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Plus, Edit, Trash2, UserPlus } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const createUserSchema = z.object({
  username: z.string().min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل"),
  password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
    .regex(/[a-z]/, "يجب أن تحتوي على حرف صغير واحد على الأقل")
    .regex(/[0-9]/, "يجب أن تحتوي على رقم واحد على الأقل"),
  email: z.string().email("بريد إلكتروني غير صالح").optional().or(z.literal("")),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const updatePasswordSchema = z.object({
  newPassword: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
    .regex(/[a-z]/, "يجب أن تحتوي على حرف صغير واحد على الأقل")
    .regex(/[0-9]/, "يجب أن تحتوي على رقم واحد على الأقل"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"],
});

export default function UsersPage() {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch users
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
    retry: false,
  });

  // Create user form
  const createForm = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  // Update password form
  const passwordForm = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (data: z.infer<typeof createUserSchema>) => {
      const response = await apiRequest("POST", "/api/register", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      setIsCreateDialogOpen(false);
      createForm.reset();
      toast({
        title: "تم إنشاء المستخدم بنجاح",
        description: "تم إضافة المستخدم الجديد إلى النظام",
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في إنشاء المستخدم",
        description: error.message || "حدث خطأ أثناء إنشاء المستخدم",
        variant: "destructive",
      });
    },
  });

  // Update password mutation
  const updatePasswordMutation = useMutation({
    mutationFn: async ({ userId, newPassword }: { userId: number; newPassword: string }) => {
      const response = await apiRequest("PATCH", `/api/users/${userId}/password`, { password: newPassword });
      return response.json();
    },
    onSuccess: () => {
      setIsPasswordDialogOpen(false);
      setSelectedUser(null);
      passwordForm.reset();
      toast({
        title: "تم تحديث كلمة المرور بنجاح",
        description: "تم تغيير كلمة المرور للمستخدم",
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في تحديث كلمة المرور",
        description: error.message || "حدث خطأ أثناء تحديث كلمة المرور",
        variant: "destructive",
      });
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      await apiRequest("DELETE", `/api/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "تم حذف المستخدم بنجاح",
        description: "تم إزالة المستخدم من النظام",
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في حذف المستخدم",
        description: error.message || "حدث خطأ أثناء حذف المستخدم",
        variant: "destructive",
      });
    },
  });

  const onCreateUser = (data: z.infer<typeof createUserSchema>) => {
    createUserMutation.mutate(data);
  };

  const onUpdatePassword = (data: z.infer<typeof updatePasswordSchema>) => {
    if (selectedUser) {
      updatePasswordMutation.mutate({
        userId: selectedUser.id,
        newPassword: data.newPassword,
      });
    }
  };

  const handleDeleteUser = (user: User) => {
    deleteUserMutation.mutate(user.id);
  };

  const openPasswordDialog = (user: User) => {
    setSelectedUser(user);
    setIsPasswordDialogOpen(true);
    passwordForm.reset();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>جاري تحميل المستخدمين...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
          <p className="text-gray-600">إدارة حسابات المستخدمين ووصولهم إلى النظام</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              إضافة مستخدم جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إنشاء مستخدم جديد</DialogTitle>
              <DialogDescription>
                أضف مستخدم جديد للوصول إلى لوحة التحكم
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={createForm.handleSubmit(onCreateUser)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="create-username">اسم المستخدم *</Label>
                <Input
                  id="create-username"
                  {...createForm.register("username")}
                  disabled={createUserMutation.isPending}
                />
                {createForm.formState.errors.username && (
                  <p className="text-sm text-red-500">
                    {createForm.formState.errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-password">كلمة المرور *</Label>
                <div className="relative">
                  <Input
                    id="create-password"
                    type={showCreatePassword ? "text" : "password"}
                    {...createForm.register("password")}
                    disabled={createUserMutation.isPending}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowCreatePassword(!showCreatePassword)}
                  >
                    {showCreatePassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {createForm.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {createForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-email">البريد الإلكتروني</Label>
                <Input
                  id="create-email"
                  type="email"
                  {...createForm.register("email")}
                  disabled={createUserMutation.isPending}
                />
                {createForm.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {createForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="create-firstName">الاسم الأول</Label>
                  <Input
                    id="create-firstName"
                    {...createForm.register("firstName")}
                    disabled={createUserMutation.isPending}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-lastName">الاسم الأخير</Label>
                  <Input
                    id="create-lastName"
                    {...createForm.register("lastName")}
                    disabled={createUserMutation.isPending}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  disabled={createUserMutation.isPending}
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  disabled={createUserMutation.isPending}
                >
                  {createUserMutation.isPending ? "جاري الإنشاء..." : "إنشاء المستخدم"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة المستخدمين</CardTitle>
          <CardDescription>
            جميع المستخدمين المسجلين في النظام
          </CardDescription>
        </CardHeader>
        <CardContent>
          {users && users.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم المستخدم</TableHead>
                  <TableHead>البريد الإلكتروني</TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>تاريخ الإنشاء</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-center">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.email || "غير محدد"}</TableCell>
                    <TableCell>
                      {user.firstName || user.lastName 
                        ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                        : "غير محدد"
                      }
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString('ar-EG')}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">نشط</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openPasswordDialog(user)}
                          className="flex items-center gap-1"
                        >
                          <Edit className="h-3 w-3" />
                          تغيير كلمة المرور
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                              <AlertDialogDescription>
                                هل أنت متأكد من حذف المستخدم "{user.username}"؟ 
                                هذا الإجراء لا يمكن التراجع عنه.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteUser(user)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                حذف المستخدم
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مستخدمين</h3>
              <p className="text-gray-500 mb-4">ابدأ بإضافة مستخدم جديد للنظام</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                إضافة أول مستخدم
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Update Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>تغيير كلمة المرور</DialogTitle>
            <DialogDescription>
              تغيير كلمة المرور للمستخدم: {selectedUser?.username}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={passwordForm.handleSubmit(onUpdatePassword)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  {...passwordForm.register("newPassword")}
                  disabled={updatePasswordMutation.isPending}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {passwordForm.formState.errors.newPassword && (
                <p className="text-sm text-red-500">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  {...passwordForm.register("confirmPassword")}
                  disabled={updatePasswordMutation.isPending}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPasswordDialogOpen(false)}
                disabled={updatePasswordMutation.isPending}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                disabled={updatePasswordMutation.isPending}
              >
                {updatePasswordMutation.isPending ? "جاري التحديث..." : "تحديث كلمة المرور"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}