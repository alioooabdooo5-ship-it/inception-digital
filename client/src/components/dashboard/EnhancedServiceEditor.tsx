import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Save, Eye, ArrowLeft, Image, Target, Globe, 
  Calendar, Clock, User, BarChart3, AlertCircle,
  CheckCircle, Settings, Lightbulb, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Service } from "@shared/schema";

const EnhancedServiceEditor = () => {
  const { toast } = useToast();
  const [location, navigate] = useLocation();
  const queryClient = useQueryClient();
  
  // URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('id');
  const isEditing = !!serviceId;

  // خدمة content states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [image, setImage] = useState("");
  const [icon, setIcon] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [stats, setStats] = useState("");
  const [gradient, setGradient] = useState("");
  
  // SEO states
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [seoScore, setSeoScore] = useState(0);
  
  // UI states
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // جلب الخدمة للتعديل
  const { data: existingService } = useQuery<Service>({
    queryKey: ["/api/services", serviceId],
    enabled: !!isEditing && !!serviceId,
  });

  // تحديث البيانات عند تحميل الخدمة للتعديل
  useEffect(() => {
    if (existingService && isEditing) {
      setTitle(existingService.title || "");
      setDescription(existingService.description || "");
      setLongDescription(existingService.longDescription || "");
      setImage(existingService.image || "");
      setIcon(existingService.icon || "");
      setLink(existingService.link || "");
      setCategory(existingService.category || "");
      setStats(existingService.stats || "");
      setGradient(existingService.gradient || "");
      setMetaTitle((existingService as any).metaTitle || "");
      setMetaDescription((existingService as any).metaDescription || "");
      setFocusKeyword((existingService as any).focusKeyword || "");
      setCanonicalUrl((existingService as any).canonicalUrl || "");
      setOgTitle((existingService as any).ogTitle || "");
      setOgDescription((existingService as any).ogDescription || "");
      setOgImage((existingService as any).ogImage || "");
    }
  }, [existingService, isEditing]);

  // حساب نقاط SEO
  useEffect(() => {
    let score = 0;
    
    // عنوان الخدمة (25 نقطة)
    if (title.length >= 20 && title.length <= 60) score += 25;
    else if (title.length > 10) score += 15;
    
    // وصف الخدمة (25 نقطة)
    if (metaDescription.length >= 120 && metaDescription.length <= 160) score += 25;
    else if (metaDescription.length > 50) score += 15;
    
    // الكلمة المفتاحية (20 نقطة)
    if (focusKeyword) {
      if (title.toLowerCase().includes(focusKeyword.toLowerCase())) score += 10;
      if (metaDescription.toLowerCase().includes(focusKeyword.toLowerCase())) score += 5;
      if (description.toLowerCase().includes(focusKeyword.toLowerCase())) score += 5;
    }
    
    // المحتوى (15 نقطة)
    if (longDescription && longDescription.length >= 300) score += 10;
    if (description.length >= 100) score += 5;
    
    // الصور (10 نقطة)
    if (image) score += 5;
    if (icon) score += 5;
    
    // العناصر التقنية (5 نقاط)
    if (canonicalUrl) score += 2;
    if (ogTitle && ogDescription) score += 3;
    
    setSeoScore(Math.min(score, 100));
  }, [title, metaDescription, focusKeyword, description, longDescription, image, icon, canonicalUrl, ogTitle, ogDescription]);

  // حفظ الخدمة
  const saveMutation = useMutation({
    mutationFn: async (serviceData: any) => {
      if (isEditing) {
        return await apiRequest("PUT", `/api/services/${serviceId}`, serviceData);
      } else {
        return await apiRequest("POST", "/api/services", serviceData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({
        title: "تم الحفظ بنجاح",
        description: isEditing ? "تم تحديث الخدمة" : "تم إنشاء الخدمة الجديدة",
      });
      if (!isEditing) {
        navigate("/admin/services");
      }
    },
    onError: (error) => {
      toast({
        title: "خطأ في الحفظ",
        description: "فشل في حفظ الخدمة. حاول مرة أخرى.",
        variant: "destructive",
      });
    },
  });

  // حفظ الخدمة
  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "خطأ",
        description: "عنوان الخدمة مطلوب",
        variant: "destructive",
      });
      return;
    }

    const serviceData = {
      title: title.trim(),
      description: description.trim(),
      longDescription,
      image,
      icon,
      link,
      category,
      stats,
      gradient,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || description,
      focusKeyword,
      canonicalUrl,
      ogTitle: ogTitle || metaTitle || title,
      ogDescription: ogDescription || metaDescription || description,
      ogImage: ogImage || image,
      seoScore,
    };

    saveMutation.mutate(serviceData);
  };

  const getSeoScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getSeoScoreText = (score: number) => {
    if (score >= 80) return "ممتاز";
    if (score >= 60) return "جيد";
    if (score >= 40) return "متوسط";
    return "يحتاج تحسين";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/admin/services")}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              العودة للخدمات
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-2xl font-bold text-inception-purple">
              {isEditing ? "تعديل الخدمة" : "خدمة جديدة"}
            </h1>
          </div>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            <Button 
              variant="outline" 
              onClick={() => setIsPreview(!isPreview)}
            >
              <Eye className="w-4 h-4 ml-2" />
              {isPreview ? "المحرر" : "معاينة"}
            </Button>
            
            <Button 
              onClick={handleSave}
              disabled={saveMutation.isPending}
              className="bg-inception-purple hover:bg-inception-purple/90"
            >
              <Save className="w-4 h-4 ml-2" />
              {saveMutation.isPending ? "جاري الحفظ..." : "حفظ الخدمة"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* المحرر الرئيسي */}
          <div className="lg:col-span-2 space-y-6">
            {!isPreview ? (
              <>
                {/* معلومات الخدمة الأساسية */}
                <Card>
                  <CardHeader>
                    <CardTitle>معلومات الخدمة الأساسية</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>عنوان الخدمة</Label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="عنوان الخدمة"
                        className="text-xl font-bold"
                      />
                    </div>

                    <div>
                      <Label>الوصف المختصر</Label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="وصف مختصر للخدمة"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>الوصف التفصيلي</Label>
                      <RichTextEditor
                        content={longDescription}
                        onChange={setLongDescription}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* الوسائط والروابط */}
                <Card>
                  <CardHeader>
                    <CardTitle>الوسائط والروابط</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>الصورة الرئيسية</Label>
                      <Input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="رابط الصورة الرئيسية"
                      />
                      {image && (
                        <img 
                          src={image} 
                          alt="معاينة" 
                          className="w-full h-48 object-cover rounded-lg mt-2"
                        />
                      )}
                    </div>

                    <div>
                      <Label>الأيقونة</Label>
                      <Input
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                        placeholder="اسم الأيقونة (مثل: Monitor, Globe, etc.)"
                      />
                    </div>

                    <div>
                      <Label>رابط الخدمة</Label>
                      <Input
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="رابط صفحة الخدمة"
                      />
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              /* معاينة الخدمة */
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      {image && (
                        <img 
                          src={image} 
                          alt={title}
                          className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                      )}
                      
                      <h1 className="text-4xl font-bold text-inception-purple mb-4">
                        {title || "عنوان الخدمة"}
                      </h1>
                      
                      <p className="text-xl text-gray-700 leading-relaxed mb-6">
                        {description}
                      </p>
                    </div>
                    
                    {longDescription && (
                      <div 
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: longDescription }}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* الشريط الجانبي */}
          <div className="space-y-6">
            {/* إعدادات أساسية */}
            <Card>
              <CardHeader>
                <CardTitle>إعدادات إضافية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>فئة الخدمة</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر فئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital-marketing">التسويق الرقمي</SelectItem>
                      <SelectItem value="web-development">تطوير المواقع</SelectItem>
                      <SelectItem value="seo">تحسين محركات البحث</SelectItem>
                      <SelectItem value="social-media">وسائل التواصل</SelectItem>
                      <SelectItem value="content">إنتاج المحتوى</SelectItem>
                      <SelectItem value="advertising">الإعلانات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>الإحصائيات</Label>
                  <Input
                    value={stats}
                    onChange={(e) => setStats(e.target.value)}
                    placeholder="مثل: +500 مشروع ناجح"
                  />
                </div>

                <div>
                  <Label>التدرج اللوني</Label>
                  <Input
                    value={gradient}
                    onChange={(e) => setGradient(e.target.value)}
                    placeholder="مثل: from-blue-500 to-purple-600"
                  />
                </div>
              </CardContent>
            </Card>

            {/* تحسين SEO الشامل */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Target className="w-5 h-5 ml-2 text-inception-orange" />
                    تحسين SEO
                  </div>
                  <div className={`text-sm font-bold ${getSeoScoreColor(seoScore)}`}>
                    {seoScore}/100 ({getSeoScoreText(seoScore)})
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">أساسي</TabsTrigger>
                    <TabsTrigger value="social">وسائل التواصل</TabsTrigger>
                    <TabsTrigger value="analysis">التحليل</TabsTrigger>
                  </TabsList>
                  
                  {/* SEO الأساسي */}
                  <TabsContent value="basic" className="space-y-4">
                    <div>
                      <Progress value={seoScore} className="w-full mb-2" />
                      <div className="text-center text-sm text-gray-600">
                        نقاط SEO: {seoScore}/100
                      </div>
                    </div>

                    <div>
                      <Label>الكلمة المفتاحية الرئيسية</Label>
                      <Input
                        value={focusKeyword}
                        onChange={(e) => setFocusKeyword(e.target.value)}
                        placeholder="الكلمة المفتاحية الرئيسية"
                      />
                    </div>

                    <div>
                      <Label>عنوان SEO</Label>
                      <Input
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder="عنوان محرك البحث"
                      />
                      <div className={`text-sm ${metaTitle.length > 60 ? 'text-red-500' : metaTitle.length > 30 ? 'text-green-500' : 'text-gray-500'}`}>
                        {metaTitle.length}/60 حرف
                      </div>
                    </div>

                    <div>
                      <Label>وصف SEO</Label>
                      <Textarea
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder="وصف الخدمة في محركات البحث"
                        rows={3}
                      />
                      <div className={`text-sm ${metaDescription.length > 160 ? 'text-red-500' : metaDescription.length > 120 ? 'text-green-500' : 'text-gray-500'}`}>
                        {metaDescription.length}/160 حرف
                      </div>
                    </div>

                    <div>
                      <Label>Canonical URL</Label>
                      <Input
                        value={canonicalUrl}
                        onChange={(e) => setCanonicalUrl(e.target.value)}
                        placeholder="https://example.com/service-url"
                      />
                    </div>
                  </TabsContent>

                  {/* وسائل التواصل الاجتماعي */}
                  <TabsContent value="social" className="space-y-4">
                    <div>
                      <Label>عنوان Facebook</Label>
                      <Input
                        value={ogTitle}
                        onChange={(e) => setOgTitle(e.target.value)}
                        placeholder="عنوان الخدمة على Facebook"
                      />
                    </div>

                    <div>
                      <Label>وصف Facebook</Label>
                      <Textarea
                        value={ogDescription}
                        onChange={(e) => setOgDescription(e.target.value)}
                        placeholder="وصف الخدمة على Facebook"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>صورة Facebook</Label>
                      <Input
                        value={ogImage}
                        onChange={(e) => setOgImage(e.target.value)}
                        placeholder="رابط صورة Facebook"
                      />
                    </div>
                  </TabsContent>

                  {/* التحليل والنصائح */}
                  <TabsContent value="analysis" className="space-y-4">
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>تحليل SEO:</strong>
                        <div className="mt-2 space-y-1 text-sm">
                          <div className={title.length >= 20 && title.length <= 60 ? 'text-green-600' : 'text-red-600'}>
                            • العنوان: {title.length} حرف {title.length >= 20 && title.length <= 60 ? '✓' : '✗'}
                          </div>
                          <div className={metaDescription.length >= 120 && metaDescription.length <= 160 ? 'text-green-600' : 'text-red-600'}>
                            • الوصف: {metaDescription.length} حرف {metaDescription.length >= 120 && metaDescription.length <= 160 ? '✓' : '✗'}
                          </div>
                          <div className={focusKeyword && title.toLowerCase().includes(focusKeyword.toLowerCase()) ? 'text-green-600' : 'text-red-600'}>
                            • الكلمة المفتاحية في العنوان: {focusKeyword && title.toLowerCase().includes(focusKeyword.toLowerCase()) ? '✓' : '✗'}
                          </div>
                          <div className={longDescription && longDescription.length >= 300 ? 'text-green-600' : 'text-red-600'}>
                            • طول المحتوى: {longDescription ? longDescription.length : 0} حرف {longDescription && longDescription.length >= 300 ? '✓' : '✗'}
                          </div>
                          <div className={image ? 'text-green-600' : 'text-red-600'}>
                            • الصورة الرئيسية: {image ? '✓' : '✗'}
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>

                    <Alert>
                      <Lightbulb className="h-4 w-4" />
                      <AlertDescription>
                        <strong>نصائح لتحسين SEO:</strong>
                        <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                          <li>استخدم الكلمة المفتاحية في العنوان والوصف</li>
                          <li>اكتب وصف تفصيلي أكثر من 300 حرف</li>
                          <li>أضف صورة عالية الجودة للخدمة</li>
                          <li>استخدم عنوان جذاب بين 20-60 حرف</li>
                          <li>اكتب وصف مبدع للمحركات البحث</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedServiceEditor;