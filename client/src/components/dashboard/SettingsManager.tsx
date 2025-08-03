import React, { useState } from "react";
import { Save, Settings, Globe, Search, Code } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Setting } from "@shared/schema";

const SettingsManager = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: settings = [], isLoading } = useQuery<Setting[]>({
    queryKey: ['/api/settings'],
  });

  const createSettingMutation = useMutation({
    mutationFn: async (data: { category: string; key: string; value: string; description?: string }) => {
      const response = await apiRequest("POST", "/api/settings", data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/settings'] });
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ الإعدادات بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ الإعدادات",
        variant: "destructive",
      });
    },
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Setting> }) => {
      const response = await apiRequest("PUT", `/api/settings/${id}`, data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/settings'] });
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث الإعدادات بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ في التحديث",
        description: "حدث خطأ أثناء تحديث الإعدادات",
        variant: "destructive",
      });
    },
  });

  const getSettingValue = (key: string) => {
    const setting = settings.find(s => s.key === key);
    return setting ? setting.value : "";
  };

  const getSettingId = (key: string) => {
    const setting = settings.find(s => s.key === key);
    return setting ? setting.id : null;
  };

  const handleSaveSetting = (category: string, key: string, value: string, description?: string) => {
    const existingId = getSettingId(key);
    
    if (existingId) {
      updateSettingMutation.mutate({
        id: existingId,
        data: { value, description }
      });
    } else {
      createSettingMutation.mutate({
        category,
        key,
        value,
        description
      });
    }
  };

  const generalForm = useForm({
    defaultValues: {
      siteName: getSettingValue("site_name") || "إنسيبشن للاستشارات",
      siteDescription: getSettingValue("site_description") || "خدمات استشارية متخصصة للشركات والمؤسسات",
      email: getSettingValue("contact_email") || "info@inception-consulting.com",
      phone: getSettingValue("contact_phone") || "+966 12 345 6789",
      address: getSettingValue("contact_address") || "الرياض، المملكة العربية السعودية",
    },
  });

  const socialForm = useForm({
    defaultValues: {
      twitter: getSettingValue("social_twitter") || "",
      facebook: getSettingValue("social_facebook") || "",
      linkedin: getSettingValue("social_linkedin") || "",
      instagram: getSettingValue("social_instagram") || "",
    },
  });

  const seoForm = useForm({
    defaultValues: {
      metaTitle: getSettingValue("seo_meta_title") || "إنسيبشن - خدمات استشارية متخصصة",
      metaDescription: getSettingValue("seo_meta_description") || "إنسيبشن تقدم خدمات استشارية متخصصة للشركات والمؤسسات",
      keywords: getSettingValue("seo_keywords") || "استشارات، أعمال، تطوير، إدارة، تسويق",
    },
  });

  const handleGeneralSubmit = (data: any) => {
    Object.entries(data).forEach(([key, value]) => {
      const settingKey = key === "siteName" ? "site_name" :
                        key === "siteDescription" ? "site_description" :
                        key === "email" ? "contact_email" :
                        key === "phone" ? "contact_phone" :
                        key === "address" ? "contact_address" : key;
      
      handleSaveSetting("general", settingKey, value as string);
    });
  };

  const handleSocialSubmit = (data: any) => {
    Object.entries(data).forEach(([key, value]) => {
      const settingKey = `social_${key}`;
      handleSaveSetting("social", settingKey, value as string);
    });
  };

  const handleSeoSubmit = (data: any) => {
    Object.entries(data).forEach(([key, value]) => {
      const settingKey = key === "metaTitle" ? "seo_meta_title" :
                        key === "metaDescription" ? "seo_meta_description" :
                        key === "keywords" ? "seo_keywords" : key;
      
      handleSaveSetting("seo", settingKey, value as string);
    });
  };

  const filteredSettings = settings.filter(setting =>
    setting.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    setting.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (setting.description?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const stats = [
    { 
      label: "إجمالي الإعدادات", 
      value: settings.length.toString(), 
      color: "text-blue-600", 
      icon: Settings 
    },
    { 
      label: "الإعدادات العامة", 
      value: settings.filter(s => s.category === "general").length.toString(), 
      color: "text-green-600", 
      icon: Globe 
    },
    { 
      label: "وسائل التواصل", 
      value: settings.filter(s => s.category === "social").length.toString(), 
      color: "text-purple-600", 
      icon: Globe 
    },
    { 
      label: "إعدادات SEO", 
      value: settings.filter(s => s.category === "seo").length.toString(), 
      color: "text-orange-600", 
      icon: Search 
    }
  ];

  if (isLoading) {
    return <div className="text-center p-4">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-inception-purple">إعدادات الموقع</h2>
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

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 bg-white border rounded-md">
          <TabsTrigger value="general">إعدادات عامة</TabsTrigger>
          <TabsTrigger value="social">وسائل التواصل</TabsTrigger>
          <TabsTrigger value="seo">تحسين محركات البحث</TabsTrigger>
          <TabsTrigger value="advanced">إعدادات متقدمة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>الإعدادات العامة</CardTitle>
              <CardDescription>إعدادات أساسية للموقع ومعلومات الاتصال</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(handleGeneralSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={generalForm.control}
                      name="siteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>اسم الموقع</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="اسم الموقع" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={generalForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>البريد الإلكتروني</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="البريد الإلكتروني" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={generalForm.control}
                    name="siteDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>وصف الموقع</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="وصف الموقع" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={generalForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رقم الهاتف</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="رقم الهاتف" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={generalForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>العنوان</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="العنوان" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-inception-purple hover:bg-inception-purple/90"
                    disabled={createSettingMutation.isPending || updateSettingMutation.isPending}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {createSettingMutation.isPending || updateSettingMutation.isPending ? "جاري الحفظ..." : "حفظ الإعدادات"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>وسائل التواصل الاجتماعي</CardTitle>
              <CardDescription>روابط حسابات التواصل الاجتماعي</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...socialForm}>
                <form onSubmit={socialForm.handleSubmit(handleSocialSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={socialForm.control}
                      name="twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>تويتر</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://twitter.com/username" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={socialForm.control}
                      name="facebook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>فيسبوك</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://facebook.com/page" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={socialForm.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>لينكد إن</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://linkedin.com/company/name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={socialForm.control}
                      name="instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>إنستغرام</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://instagram.com/username" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-inception-purple hover:bg-inception-purple/90"
                    disabled={createSettingMutation.isPending || updateSettingMutation.isPending}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {createSettingMutation.isPending || updateSettingMutation.isPending ? "جاري الحفظ..." : "حفظ الإعدادات"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>تحسين محركات البحث (SEO)</CardTitle>
              <CardDescription>إعدادات تحسين الموقع لمحركات البحث</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...seoForm}>
                <form onSubmit={seoForm.handleSubmit(handleSeoSubmit)} className="space-y-4">
                  <FormField
                    control={seoForm.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عنوان الصفحة (Meta Title)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="عنوان الصفحة" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={seoForm.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>وصف الصفحة (Meta Description)</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="وصف الصفحة لمحركات البحث" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={seoForm.control}
                    name="keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الكلمات المفتاحية</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="كلمة1، كلمة2، كلمة3" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-inception-purple hover:bg-inception-purple/90"
                    disabled={createSettingMutation.isPending || updateSettingMutation.isPending}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {createSettingMutation.isPending || updateSettingMutation.isPending ? "جاري الحفظ..." : "حفظ الإعدادات"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>جميع الإعدادات</CardTitle>
              <CardDescription>عرض وإدارة جميع إعدادات النظام</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder="بحث في الإعدادات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                </div>
                
                {filteredSettings.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    لا توجد إعدادات
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredSettings.map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{setting.key}</span>
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">
                              {setting.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{setting.value}</p>
                          {setting.description && (
                            <p className="text-xs text-gray-400">{setting.description}</p>
                          )}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(setting.updatedAt).toLocaleDateString('ar-EG')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManager;