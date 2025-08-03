import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { Redirect } from "wouter";

const loginSchema = z.object({
  username: z.string().min(1, "اسم المستخدم مطلوب"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

const registerSchema = insertUserSchema.extend({
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"],
});

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  // Redirect if user is already authenticated (after all hooks)
  if (user) {
    return <Redirect to="/" />;
  }

  const onLogin = (data: any) => {
    loginMutation.mutate(data);
  };

  const onRegister = (data: any) => {
    const { confirmPassword, ...userData } = data;
    registerMutation.mutate(userData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Auth forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600">
              إنسيبشن
            </h1>
            <p className="text-gray-600 mt-2">لوحة التحكم الإدارية</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
              <TabsTrigger value="register">إنشاء حساب</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>تسجيل الدخول</CardTitle>
                  <CardDescription>
                    ادخل بياناتك للوصول إلى لوحة التحكم
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">اسم المستخدم</Label>
                      <Input
                        id="username"
                        {...loginForm.register("username")}
                        disabled={loginMutation.isPending}
                      />
                      {loginForm.formState.errors.username && (
                        <p className="text-sm text-red-500">
                          {loginForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">كلمة المرور</Label>
                      <Input
                        id="password"
                        type="password"
                        {...loginForm.register("password")}
                        disabled={loginMutation.isPending}
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-red-500">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>إنشاء حساب جديد</CardTitle>
                  <CardDescription>
                    أنشئ حساب جديد للوصول إلى لوحة التحكم
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">الاسم الأول</Label>
                        <Input
                          id="firstName"
                          {...registerForm.register("firstName")}
                          disabled={registerMutation.isPending}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">الاسم الأخير</Label>
                        <Input
                          id="lastName"
                          {...registerForm.register("lastName")}
                          disabled={registerMutation.isPending}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        {...registerForm.register("email")}
                        disabled={registerMutation.isPending}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="regUsername">اسم المستخدم</Label>
                      <Input
                        id="regUsername"
                        {...registerForm.register("username")}
                        disabled={registerMutation.isPending}
                      />
                      {registerForm.formState.errors.username && (
                        <p className="text-sm text-red-500">
                          {registerForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="regPassword">كلمة المرور</Label>
                      <Input
                        id="regPassword"
                        type="password"
                        {...registerForm.register("password")}
                        disabled={registerMutation.isPending}
                      />
                      {registerForm.formState.errors.password && (
                        <p className="text-sm text-red-500">
                          {registerForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...registerForm.register("confirmPassword")}
                        disabled={registerMutation.isPending}
                      />
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-500">
                          {registerForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right side - Hero section */}
      <div className="flex-1 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-8">
        <div className="text-center text-white max-w-md">
          <h2 className="text-3xl font-bold mb-4">مرحباً بك في إنسيبشن</h2>
          <p className="text-lg mb-6">
            تحكم بكامل محتوى موقعك من خلال لوحة التحكم الشاملة
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>إدارة الخدمات والصناعات</span>
            </div>
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>إدارة المقالات والكتب</span>
            </div>
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>إدارة التقييمات والتواصل</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}