
import React from "react";
import { Save } from "lucide-react";
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

const SettingsManager = () => {
  const generalForm = useForm({
    defaultValues: {
      siteName: "إنسيبشن للاستشارات",
      siteDescription: "خدمات استشارية متخصصة للشركات والمؤسسات",
      email: "info@inception-consulting.com",
      phone: "+966 12 345 6789",
      address: "الرياض، المملكة العربية السعودية",
    },
  });

  const socialForm = useForm({
    defaultValues: {
      twitter: "https://twitter.com/inception",
      facebook: "https://facebook.com/inception",
      linkedin: "https://linkedin.com/company/inception",
      instagram: "https://instagram.com/inception",
    },
  });

  const seoForm = useForm({
    defaultValues: {
      metaTitle: "إنسيبشن - خدمات استشارية متخصصة",
      metaDescription: "إنسيبشن تقدم خدمات استشارية متخصصة للشركات والمؤسسات في مختلف المجالات",
      keywords: "استشارات، أعمال، تطوير، إدارة، تسويق",
    },
  });

  const handleGeneralSubmit = (data) => {
    console.log("General settings saved:", data);
    // هنا يمكن إرسال البيانات إلى API أو تخزينها
    alert("تم حفظ الإعدادات العامة بنجاح");
  };

  const handleSocialSubmit = (data) => {
    console.log("Social media settings saved:", data);
    alert("تم حفظ إعدادات وسائل التواصل الاجتماعي بنجاح");
  };

  const handleSeoSubmit = (data) => {
    console.log("SEO settings saved:", data);
    alert("تم حفظ إعدادات تحسين محركات البحث بنجاح");
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h2 className="text-xl font-semibold text-inception-purple mb-6">إعدادات الموقع</h2>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 bg-white border rounded-md">
          <TabsTrigger value="general">إعدادات عامة</TabsTrigger>
          <TabsTrigger value="social">وسائل التواصل</TabsTrigger>
          <TabsTrigger value="seo">تحسين محركات البحث</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>الإعدادات العامة</CardTitle>
              <CardDescription>إدارة المعلومات الأساسية للموقع</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(handleGeneralSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={generalForm.control}
                      name="siteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>اسم الموقع</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input type="email" {...field} />
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
                          <Textarea rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={generalForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رقم الهاتف</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-inception-purple hover:bg-inception-purple/90">
                      <Save size={16} className="ml-2" />
                      حفظ الإعدادات
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>وسائل التواصل الاجتماعي</CardTitle>
              <CardDescription>إدارة روابط وسائل التواصل الاجتماعي</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...socialForm}>
                <form onSubmit={socialForm.handleSubmit(handleSocialSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={socialForm.control}
                      name="twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>تويتر</FormLabel>
                          <FormControl>
                            <Input placeholder="https://twitter.com/..." {...field} />
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
                            <Input placeholder="https://facebook.com/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={socialForm.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>لينكد إن</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/..." {...field} />
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
                          <FormLabel>انستغرام</FormLabel>
                          <FormControl>
                            <Input placeholder="https://instagram.com/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-inception-purple hover:bg-inception-purple/90">
                      <Save size={16} className="ml-2" />
                      حفظ الإعدادات
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>تحسين محركات البحث (SEO)</CardTitle>
              <CardDescription>إدارة إعدادات تحسين محركات البحث</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...seoForm}>
                <form onSubmit={seoForm.handleSubmit(handleSeoSubmit)} className="space-y-6">
                  <FormField
                    control={seoForm.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عنوان الميتا</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>وصف الميتا</FormLabel>
                        <FormControl>
                          <Textarea rows={3} {...field} />
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
                          <Input placeholder="كلمات مفتاحية مفصولة بفواصل" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-inception-purple hover:bg-inception-purple/90">
                      <Save size={16} className="ml-2" />
                      حفظ الإعدادات
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManager;
