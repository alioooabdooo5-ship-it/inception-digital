import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Save, Eye, ArrowLeft, Image, Target, Globe, 
  Calendar, Clock, User, BarChart3, AlertCircle,
  CheckCircle, Settings, Lightbulb, TrendingUp, Building2
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
import type { Industry } from "@shared/schema";

const EnhancedIndustryEditor = () => {
  const { toast } = useToast();
  const [location, navigate] = useLocation();
  const queryClient = useQueryClient();
  
  // URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const industryId = urlParams.get('id');
  const isEditing = !!industryId;

  // صناعة content states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [icon, setIcon] = useState("");
  const [gradient, setGradient] = useState("");
  const [bgGradient, setBgGradient] = useState("");
  const [results, setResults] = useState<{title: string, value: string}[]>([]);
  const [services, setServices] = useState<{title: string, description: string}[]>([]);
  const [currentResult, setCurrentResult] = useState({title: "", value: ""});
  const [currentService, setCurrentService] = useState({title: "", description: ""});
  
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

  // جلب الصناعة للتعديل
  const { data: existingIndustry } = useQuery<Industry>({
    queryKey: ["/api/industries", industryId],
    enabled: !!isEditing && !!industryId,
  });

  // تحديث البيانات عند تحميل الصناعة للتعديل
  useEffect(() => {
    if (existingIndustry && isEditing) {
      setTitle(existingIndustry.title || "");
      setSubtitle(existingIndustry.subtitle || "");
      setDescription(existingIndustry.description || "");
      setImage(existingIndustry.image || "");
      setIcon(existingIndustry.icon || "");
      setGradient(existingIndustry.gradient || "");
      setBgGradient(existingIndustry.bgGradient || "");
      setResults((existingIndustry.results as any) || []);
      setServices((existingIndustry.services as any) || []);
      setMetaTitle((existingIndustry as any).metaTitle || "");
      setMetaDescription((existingIndustry as any).metaDescription || "");
      setFocusKeyword((existingIndustry as any).focusKeyword || "");
      setCanonicalUrl((existingIndustry as any).canonicalUrl || "");
      setOgTitle((existingIndustry as any).ogTitle || "");
      setOgDescription((existingIndustry as any).ogDescription || "");
      setOgImage((existingIndustry as any).ogImage || "");
    }
  }, [existingIndustry, isEditing]);

  // حساب نقاط SEO
  useEffect(() => {
    let score = 0;
    
    // عنوان الصناعة (25 نقطة)
    if (title.length >= 20 && title.length <= 60) score += 25;
    else if (title.length > 10) score += 15;
    
    // وصف الصناعة (25 نقطة)
    if (metaDescription.length >= 120 && metaDescription.length <= 160) score += 25;
    else if (metaDescription.length > 50) score += 15;
    
    // الكلمة المفتاحية (20 نقطة)
    if (focusKeyword) {
      if (title.toLowerCase().includes(focusKeyword.toLowerCase())) score += 10;
      if (metaDescription.toLowerCase().includes(focusKeyword.toLowerCase())) score += 5;
      if (description.toLowerCase().includes(focusKeyword.toLowerCase())) score += 5;
    }
    
    // المحتوى (15 نقطة)
    if (description.length >= 300) score += 10;
    if (subtitle && subtitle.length >= 50) score += 5;
    
    // الصور (10 نقطة)
    if (image) score += 5;
    if (icon) score += 5;
    
    // العناصر التقنية (5 نقاط)
    if (canonicalUrl) score += 2;
    if (ogTitle && ogDescription) score += 3;
    
    setSeoScore(Math.min(score, 100));
  }, [title, metaDescription, focusKeyword, description, subtitle, image, icon, canonicalUrl, ogTitle, ogDescription]);

  // حفظ الصناعة
  const saveMutation = useMutation({
    mutationFn: async (industryData: any) => {
      if (isEditing) {
        return await apiRequest("PUT", `/api/industries/${industryId}`, industryData);
      } else {
        return await apiRequest("POST", "/api/industries", industryData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/industries"] });
      toast({
        title: "تم الحفظ بنجاح",
        description: isEditing ? "تم تحديث الصناعة" : "تم إنشاء الصناعة الجديدة",
      });
      if (!isEditing) {
        navigate("/admin/industries");
      }
    },
    onError: (error) => {
      toast({
        title: "خطأ في الحفظ",
        description: "فشل في حفظ الصناعة. حاول مرة أخرى.",
        variant: "destructive",
      });
    },
  });

  // إضافة نتيجة
  const addResult = () => {
    if (currentResult.title.trim() && currentResult.value.trim()) {
      setResults([...results, currentResult]);
      setCurrentResult({title: "", value: ""});
    }
  };

  // إضافة خدمة
  const addService = () => {
    if (currentService.title.trim() && currentService.description.trim()) {
      setServices([...services, currentService]);
      setCurrentService({title: "", description: ""});
    }
  };

  // حفظ الصناعة
  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "خطأ",
        description: "عنوان الصناعة مطلوب",
        variant: "destructive",
      });
      return;
    }

    const industryData = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      image,
      icon,
      gradient,
      bgGradient,
      results,
      services,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || description,
      focusKeyword,
      canonicalUrl,
      ogTitle: ogTitle || metaTitle || title,
      ogDescription: ogDescription || metaDescription || description,
      ogImage: ogImage || image,
      seoScore,
    };

    saveMutation.mutate(industryData);
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
              onClick={() => navigate("/admin/industries")}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              العودة للصناعات
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-2xl font-bold text-inception-purple">
              {isEditing ? "تعديل الصناعة" : "صناعة جديدة"}
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
              {saveMutation.isPending ? "جاري الحفظ..." : "حفظ الصناعة"}
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
                {/* معلومات الصناعة الأساسية */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building2 className="w-5 h-5 ml-2 text-inception-purple" />
                      معلومات الصناعة الأساسية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>عنوان الصناعة</Label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="عنوان الصناعة"
                        className="text-xl font-bold"
                      />
                    </div>

                    <div>
                      <Label>العنوان الفرعي</Label>
                      <Input
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeholder="عنوان فرعي للصناعة"
                      />
                    </div>

                    <div>
                      <Label>الوصف التفصيلي</Label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="وصف تفصيلي للصناعة"
                        rows={6}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* النتائج والخدمات */}
                <Card>
                  <CardHeader>
                    <CardTitle>النتائج والخدمات</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* النتائج */}
                    <div>
                      <Label className="text-lg">النتائج المحققة</Label>
                      <div className="space-y-2">
                        <div className="flex space-x-2 space-x-reverse">
                          <Input
                            value={currentResult.title}
                            onChange={(e) => setCurrentResult({...currentResult, title: e.target.value})}
                            placeholder="عنوان النتيجة"
                            className="flex-1"
                          />
                          <Input
                            value={currentResult.value}
                            onChange={(e) => setCurrentResult({...currentResult, value: e.target.value})}
                            placeholder="القيمة (مثل: +500%)"
                            className="flex-1"
                          />
                          <Button onClick={addResult} size="sm">إضافة</Button>
                        </div>
                        {results.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {results.map((result, index) => (
                              <div key={index} className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
                                <div>
                                  <div className="font-semibold text-green-800">{result.value}</div>
                                  <div className="text-sm text-green-600">{result.title}</div>
                                </div>
                                <Button size="sm" variant="ghost" 
                                  onClick={() => setResults(results.filter((_, i) => i !== index))}>×</Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* الخدمات */}
                    <div>
                      <Label className="text-lg">الخدمات المقدمة</Label>
                      <div className="space-y-2">
                        <div className="flex space-x-2 space-x-reverse">
                          <Input
                            value={currentService.title}
                            onChange={(e) => setCurrentService({...currentService, title: e.target.value})}
                            placeholder="عنوان الخدمة"
                            className="flex-1"
                          />
                          <Input
                            value={currentService.description}
                            onChange={(e) => setCurrentService({...currentService, description: e.target.value})}
                            placeholder="وصف الخدمة"
                            className="flex-1"
                          />
                          <Button onClick={addService} size="sm">إضافة</Button>
                        </div>
                        {services.length > 0 && (
                          <div className="space-y-2">
                            {services.map((service, index) => (
                              <div key={index} className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                                <div>
                                  <div className="font-semibold text-blue-800">{service.title}</div>
                                  <div className="text-sm text-blue-600">{service.description}</div>
                                </div>
                                <Button size="sm" variant="ghost" 
                                  onClick={() => setServices(services.filter((_, i) => i !== index))}>×</Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              /* معاينة الصناعة */
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    <div className="text-center">
                      {image && (
                        <img 
                          src={image} 
                          alt={title}
                          className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                      )}
                      
                      <h1 className="text-4xl font-bold text-inception-purple mb-4">
                        {title || "عنوان الصناعة"}
                      </h1>
                      
                      {subtitle && (
                        <h2 className="text-xl text-gray-600 mb-6">
                          {subtitle}
                        </h2>
                      )}
                      
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {description}
                      </p>
                    </div>
                    
                    {/* النتائج */}
                    {results.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold text-inception-purple mb-6">النتائج المحققة</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {results.map((result, index) => (
                            <div key={index} className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                              <div className="text-3xl font-bold text-green-600 mb-2">{result.value}</div>
                              <div className="text-green-800">{result.title}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* الخدمات */}
                    {services.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold text-inception-purple mb-6">خدماتنا</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {services.map((service, index) => (
                            <div key={index} className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                              <h4 className="text-lg font-semibold text-blue-800 mb-2">{service.title}</h4>
                              <p className="text-blue-600">{service.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* الشريط الجانبي */}
          <div className="space-y-6">
            {/* الوسائط والتصميم */}
            <Card>
              <CardHeader>
                <CardTitle>الوسائط والتصميم</CardTitle>
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
                      className="w-full h-32 object-cover rounded-lg mt-2"
                    />
                  )}
                </div>

                <div>
                  <Label>الأيقونة</Label>
                  <Input
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="اسم الأيقونة"
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

                <div>
                  <Label>تدرج الخلفية</Label>
                  <Input
                    value={bgGradient}
                    onChange={(e) => setBgGradient(e.target.value)}
                    placeholder="تدرج خلفية إضافي"
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
                        placeholder="وصف الصناعة في محركات البحث"
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
                        placeholder="https://example.com/industry-url"
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
                        placeholder="عنوان الصناعة على Facebook"
                      />
                    </div>

                    <div>
                      <Label>وصف Facebook</Label>
                      <Textarea
                        value={ogDescription}
                        onChange={(e) => setOgDescription(e.target.value)}
                        placeholder="وصف الصناعة على Facebook"
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
                          <div className={description.length >= 300 ? 'text-green-600' : 'text-red-600'}>
                            • طول المحتوى: {description.length} حرف {description.length >= 300 ? '✓' : '✗'}
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
                          <li>أضف صورة عالية الجودة للصناعة</li>
                          <li>أضف نتائج وإحصائيات مفصلة</li>
                          <li>اذكر الخدمات المقدمة في هذه الصناعة</li>
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

export default EnhancedIndustryEditor;