import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { Redirect } from "wouter";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "اسم المستخدم مطلوب"),
  password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
    .regex(/[a-z]/, "يجب أن تحتوي على حرف صغير واحد على الأقل")
    .regex(/[0-9]/, "يجب أن تحتوي على رقم واحد على الأقل"),
});



export default function AuthPage() {
  const { user, loginMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Redirect if user is already authenticated (after all hooks)
  if (user) {
    return <Redirect to="/admin" />;
  }

  const onLogin = (data: any) => {
    loginMutation.mutate(data);
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

          <div className="w-full">
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
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          {...loginForm.register("password")}
                          disabled={loginMutation.isPending}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
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
          </div>
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