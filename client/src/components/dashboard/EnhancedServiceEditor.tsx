import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Save, Eye, ArrowLeft, Image, Target, Globe, 
  Calendar, Clock, User, BarChart3, AlertCircle,
  CheckCircle, Settings, Lightbulb, TrendingUp, Plus
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

// أنواع البيانات المحسنة
interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  result: string;
  clientName: string;
}

interface Feature {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

interface ProcessStep {
  id: number;
  step: number;
  title: string;
  description: string;
  icon?: string;
}

interface ServiceTestimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  image?: string;
  rating: number;
}

interface ServicePackage {
  id: number;
  name: string;
  price: string;
  description: string;
  features?: string[];
  highlighted: boolean;
}

interface ServiceFaq {
  id: number;
  question: string;
  answer: string;
}

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
  
  // Enhanced Content states
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [testimonials, setTestimonials] = useState<ServiceTestimonial[]>([]);
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [faqs, setFaqs] = useState<ServiceFaq[]>([]);
  
  // New Enhanced Fields
  const [videoUrl, setVideoUrl] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState("");
  const [valueProposition, setValueProposition] = useState("");
  const [competitiveAdvantages, setCompetitiveAdvantages] = useState<any[]>([]);
  const [successStories, setSuccessStories] = useState<any[]>([]);
  const [socialProof, setSocialProof] = useState<any[]>([]);
  const [guarantees, setGuarantees] = useState<any[]>([]);
  const [urgencyElements, setUrgencyElements] = useState<any[]>([]);
  
  // UI states
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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
      
      // Enhanced Content fields
      setPortfolioItems((existingService as any).portfolioItems || []);
      setFeatures((existingService as any).features || []);
      setProcessSteps((existingService as any).processSteps || []);
      setTestimonials((existingService as any).testimonials || []);
      setPackages((existingService as any).packages || []);
      setFaqs((existingService as any).faqs || []);
      
      // New Enhanced Fields
      setVideoUrl((existingService as any).videoUrl || "");
      setVideoThumbnail((existingService as any).videoThumbnail || "");
      setValueProposition((existingService as any).valueProposition || "");
      setCompetitiveAdvantages((existingService as any).competitiveAdvantages || []);
      setSuccessStories((existingService as any).successStories || []);
      setSocialProof((existingService as any).socialProof || []);
      setGuarantees((existingService as any).guarantees || []);
      setUrgencyElements((existingService as any).urgencyElements || []);
      setPackages((existingService as any).packages || []);
      setFaqs((existingService as any).faqs || []);
      
      // SEO fields
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
        const res = await apiRequest("PUT", `/api/services/${serviceId}`, serviceData);
        return res.json();
      } else {
        const res = await apiRequest("POST", "/api/services", serviceData);
        return res.json();
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
      
      // Enhanced Content
      portfolioItems,
      features,
      processSteps,
      testimonials,
      packages,
      faqs,
      
      // New Enhanced Fields
      videoUrl,
      videoThumbnail,
      valueProposition,
      competitiveAdvantages,
      successStories,
      socialProof,
      guarantees,
      urgencyElements,
      
      // SEO
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

  // Helper functions للعناصر الجديدة
  const addPortfolioItem = () => {
    setPortfolioItems([...portfolioItems, {
      id: Date.now(),
      title: "",
      description: "",
      image: "",
      result: "",
      clientName: ""
    }]);
  };

  const addFeature = () => {
    setFeatures([...features, {
      id: Date.now(),
      title: "",
      description: "",
      icon: ""
    }]);
  };

  const addProcessStep = () => {
    setProcessSteps([...processSteps, {
      id: Date.now(),
      step: processSteps.length + 1,
      title: "",
      description: "",
      icon: ""
    }]);
  };

  const addTestimonial = () => {
    setTestimonials([...testimonials, {
      id: Date.now(),
      name: "",
      position: "",
      company: "",
      content: "",
      image: "",
      rating: 5
    }]);
  };

  const addPackage = () => {
    setPackages([...packages, {
      id: Date.now(),
      name: "",
      price: "",
      description: "",
      features: [],
      highlighted: false
    }]);
  };

  const addFaq = () => {
    setFaqs([...faqs, {
      id: Date.now(),
      question: "",
      answer: ""
    }]);
  };

  // معاينة محسنة
  const generatePreviewData = () => {
    return {
      title,
      description,
      longDescription,
      image,
      icon,
      link,
      category,
      stats,
      gradient,
      portfolioItems,
      features,
      processSteps,
      testimonials,
      packages,
      faqs,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || description,
      focusKeyword,
      canonicalUrl,
      ogTitle: ogTitle || metaTitle || title,
      ogDescription: ogDescription || metaDescription || description,
      ogImage: ogImage || image,
      seoScore
    };
  };

  const openPreview = () => {
    const data = generatePreviewData();
    setPreviewData(data);
    setIsPreview(true);
  };

  const closePreview = () => {
    setIsPreview(false);
    setPreviewData(null);
  };

  // Auto-save functionality
  const autoSave = async () => {
    if (!title.trim() || !hasUnsavedChanges) return;
    
    setAutoSaveStatus('saving');
    
    try {
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
        portfolioItems,
        features,
        processSteps,
        testimonials,
        packages,
        faqs,
        videoUrl,
        videoThumbnail,
        valueProposition,
        competitiveAdvantages,
        successStories,
        socialProof,
        guarantees,
        urgencyElements,
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || description,
        focusKeyword,
        canonicalUrl,
        ogTitle: ogTitle || metaTitle || title,
        ogDescription: ogDescription || metaDescription || description,
        ogImage: ogImage || image,
        seoScore,
      };

      if (isEditing && serviceId) {
        const res = await apiRequest('PUT', `/api/services/${serviceId}`, serviceData);
        await res.json();
      }
      
      setAutoSaveStatus('saved');
      setHasUnsavedChanges(false);
      
      setTimeout(() => setAutoSaveStatus(null), 2000);
    } catch (error) {
      setAutoSaveStatus('error');
      setTimeout(() => setAutoSaveStatus(null), 3000);
    }
  };

  // Track changes for auto-save
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [title, description, longDescription, image, icon, link, category, stats, gradient, portfolioItems, features, processSteps, testimonials, packages, faqs, videoUrl, videoThumbnail, valueProposition, competitiveAdvantages, successStories, socialProof, guarantees, urgencyElements, metaTitle, metaDescription, focusKeyword, canonicalUrl, ogTitle, ogDescription, ogImage]);

  // Auto-save every 30 seconds if there are unsaved changes
  useEffect(() => {
    if (!isEditing) return;
    
    const interval = setInterval(() => {
      if (hasUnsavedChanges) {
        autoSave();
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [hasUnsavedChanges, isEditing]);

  // Validation functions
  const validateForm = () => {
    const errors: string[] = [];
    
    if (!title.trim()) errors.push("عنوان الخدمة مطلوب");
    if (!description.trim()) errors.push("وصف قصير مطلوب");
    if (!category.trim()) errors.push("فئة الخدمة مطلوبة");
    if (title.length > 100) errors.push("عنوان الخدمة طويل جداً (أقصى 100 حرف)");
    if (description.length > 200) errors.push("الوصف القصير طويل جداً (أقصى 200 حرف)");
    
    // SEO validation
    if (metaTitle && metaTitle.length > 60) errors.push("العنوان التسويقي طويل جداً (أقصى 60 حرف)");
    if (metaDescription && metaDescription.length > 160) errors.push("الوصف التسويقي طويل جداً (أقصى 160 حرف)");
    
    return errors;
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
            {/* Auto-save Status */}
            {autoSaveStatus && (
              <div className={`flex items-center text-sm px-3 py-1 rounded-full ${
                autoSaveStatus === 'saved' ? 'bg-green-100 text-green-800' :
                autoSaveStatus === 'saving' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {autoSaveStatus === 'saved' && <CheckCircle className="w-4 h-4 ml-1" />}
                {autoSaveStatus === 'saving' && <Clock className="w-4 h-4 ml-1 animate-spin" />}
                {autoSaveStatus === 'error' && <AlertCircle className="w-4 h-4 ml-1" />}
                {autoSaveStatus === 'saved' && 'تم الحفظ تلقائياً'}
                {autoSaveStatus === 'saving' && 'جاري الحفظ...'}
                {autoSaveStatus === 'error' && 'خطأ في الحفظ'}
              </div>
            )}
            
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

                    <div>
                      <Label>رابط الفيديو التوضيحي</Label>
                      <Input
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="رابط يوتيوب أو فيميو"
                      />
                    </div>

                    <div>
                      <Label>صورة مصغرة للفيديو</Label>
                      <Input
                        value={videoThumbnail}
                        onChange={(e) => setVideoThumbnail(e.target.value)}
                        placeholder="رابط صورة الفيديو المصغرة"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* القيمة المضافة والتميز */}
                <Card>
                  <CardHeader>
                    <CardTitle>القيمة المضافة والتميز</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>القيمة المضافة الرئيسية</Label>
                      <RichTextEditor
                        content={valueProposition}
                        onChange={setValueProposition}
                      />
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-lg font-semibold">المزايا التنافسية</Label>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setCompetitiveAdvantages([...competitiveAdvantages, {
                            id: Date.now(),
                            title: "",
                            description: ""
                          }])}
                        >
                          <Plus className="w-4 h-4 ml-1" />
                          إضافة ميزة
                        </Button>
                      </div>
                      {competitiveAdvantages.length === 0 ? (
                        <p className="text-gray-500 text-sm">لا توجد مزايا تنافسية. اضغط لإضافة ميزة جديدة.</p>
                      ) : (
                        <div className="space-y-3">
                          {competitiveAdvantages.map((advantage: any, index: number) => (
                            <div key={advantage.id} className="border p-3 rounded bg-gray-50">
                              <Input
                                placeholder="عنوان الميزة"
                                value={advantage.title}
                                className="mb-2"
                                onChange={(e) => {
                                  const updated = [...competitiveAdvantages];
                                  updated[index] = { ...advantage, title: e.target.value };
                                  setCompetitiveAdvantages(updated);
                                }}
                              />
                              <Textarea
                                placeholder="وصف الميزة"
                                value={advantage.description}
                                rows={2}
                                onChange={(e) => {
                                  const updated = [...competitiveAdvantages];
                                  updated[index] = { ...advantage, description: e.target.value };
                                  setCompetitiveAdvantages(updated);
                                }}
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="mt-2"
                                onClick={() => setCompetitiveAdvantages(competitiveAdvantages.filter((_, i) => i !== index))}
                              >
                                حذف
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-lg font-semibold">قصص النجاح</Label>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setSuccessStories([...successStories, {
                            id: Date.now(),
                            title: "",
                            description: "",
                            metric: "",
                            metricLabel: "",
                            clientName: "",
                            timeframe: ""
                          }])}
                        >
                          <Plus className="w-4 h-4 ml-1" />
                          إضافة قصة
                        </Button>
                      </div>
                      {successStories.length === 0 ? (
                        <p className="text-gray-500 text-sm">لا توجد قصص نجاح. اضغط لإضافة قصة جديدة.</p>
                      ) : (
                        <div className="space-y-3">
                          {successStories.map((story: any, index: number) => (
                            <div key={story.id} className="border p-3 rounded bg-gray-50">
                              <div className="grid grid-cols-2 gap-2 mb-2">
                                <Input
                                  placeholder="عنوان القصة"
                                  value={story.title}
                                  onChange={(e) => {
                                    const updated = [...successStories];
                                    updated[index] = { ...story, title: e.target.value };
                                    setSuccessStories(updated);
                                  }}
                                />
                                <Input
                                  placeholder="اسم العميل"
                                  value={story.clientName}
                                  onChange={(e) => {
                                    const updated = [...successStories];
                                    updated[index] = { ...story, clientName: e.target.value };
                                    setSuccessStories(updated);
                                  }}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2 mb-2">
                                <Input
                                  placeholder="النتيجة (مثل: 300%)"
                                  value={story.metric}
                                  onChange={(e) => {
                                    const updated = [...successStories];
                                    updated[index] = { ...story, metric: e.target.value };
                                    setSuccessStories(updated);
                                  }}
                                />
                                <Input
                                  placeholder="وصف النتيجة (مثل: زيادة المبيعات)"
                                  value={story.metricLabel}
                                  onChange={(e) => {
                                    const updated = [...successStories];
                                    updated[index] = { ...story, metricLabel: e.target.value };
                                    setSuccessStories(updated);
                                  }}
                                />
                              </div>
                              <Input
                                placeholder="المدة الزمنية (مثل: 4 أشهر)"
                                value={story.timeframe}
                                className="mb-2"
                                onChange={(e) => {
                                  const updated = [...successStories];
                                  updated[index] = { ...story, timeframe: e.target.value };
                                  setSuccessStories(updated);
                                }}
                              />
                              <Textarea
                                placeholder="وصف القصة"
                                value={story.description}
                                rows={2}
                                onChange={(e) => {
                                  const updated = [...successStories];
                                  updated[index] = { ...story, description: e.target.value };
                                  setSuccessStories(updated);
                                }}
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="mt-2"
                                onClick={() => setSuccessStories(successStories.filter((_, i) => i !== index))}
                              >
                                حذف
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
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
                  <TabsList className="grid w-full grid-cols-5 text-xs">
                    <TabsTrigger value="basic">أساسي</TabsTrigger>
                    <TabsTrigger value="content">المحتوى</TabsTrigger>
                    <TabsTrigger value="portfolio">أعمالنا</TabsTrigger>
                    <TabsTrigger value="social">التواصل</TabsTrigger>
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

                  {/* المحتوى المحسن */}
                  <TabsContent value="content" className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-lg font-semibold">المميزات</Label>
                        <Button size="sm" variant="outline" onClick={addFeature}>
                          <Plus className="w-4 h-4 ml-1" />
                          إضافة ميزة
                        </Button>
                      </div>
                      {features.length === 0 ? (
                        <p className="text-gray-500 text-sm">لا توجد مميزات. اضغط لإضافة ميزة جديدة.</p>
                      ) : (
                        <div className="space-y-3">
                          {features.map((feature, index) => (
                            <div key={feature.id} className="border p-3 rounded bg-gray-50">
                              <div className="grid grid-cols-2 gap-2 mb-2">
                                <Input
                                  placeholder="عنوان الميزة"
                                  value={feature.title}
                                  onChange={(e) => {
                                    const updated = [...features];
                                    updated[index] = { ...feature, title: e.target.value };
                                    setFeatures(updated);
                                  }}
                                />
                                <Input
                                  placeholder="أيقونة (مثل: Star)"
                                  value={feature.icon}
                                  onChange={(e) => {
                                    const updated = [...features];
                                    updated[index] = { ...feature, icon: e.target.value };
                                    setFeatures(updated);
                                  }}
                                />
                              </div>
                              <Textarea
                                placeholder="وصف الميزة"
                                value={feature.description}
                                rows={2}
                                onChange={(e) => {
                                  const updated = [...features];
                                  updated[index] = { ...feature, description: e.target.value };
                                  setFeatures(updated);
                                }}
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="mt-2"
                                onClick={() => setFeatures(features.filter((_, i) => i !== index))}
                              >
                                حذف
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-lg font-semibold">خطوات العمل</Label>
                        <Button size="sm" variant="outline" onClick={addProcessStep}>
                          <Plus className="w-4 h-4 ml-1" />
                          إضافة خطوة
                        </Button>
                      </div>
                      {processSteps.length === 0 ? (
                        <p className="text-gray-500 text-sm">لا توجد خطوات عمل. اضغط لإضافة خطوة جديدة.</p>
                      ) : (
                        <div className="space-y-3">
                          {processSteps.map((step, index) => (
                            <div key={step.id} className="border p-3 rounded bg-gray-50">
                              <div className="grid grid-cols-3 gap-2 mb-2">
                                <Input
                                  placeholder="رقم الخطوة"
                                  value={step.step}
                                  type="number"
                                  onChange={(e) => {
                                    const updated = [...processSteps];
                                    updated[index] = { ...step, step: parseInt(e.target.value) || 1 };
                                    setProcessSteps(updated);
                                  }}
                                />
                                <Input
                                  placeholder="عنوان الخطوة"
                                  value={step.title}
                                  onChange={(e) => {
                                    const updated = [...processSteps];
                                    updated[index] = { ...step, title: e.target.value };
                                    setProcessSteps(updated);
                                  }}
                                />
                                <Input
                                  placeholder="أيقونة"
                                  value={step.icon}
                                  onChange={(e) => {
                                    const updated = [...processSteps];
                                    updated[index] = { ...step, icon: e.target.value };
                                    setProcessSteps(updated);
                                  }}
                                />
                              </div>
                              <Textarea
                                placeholder="وصف الخطوة"
                                value={step.description}
                                rows={2}
                                onChange={(e) => {
                                  const updated = [...processSteps];
                                  updated[index] = { ...step, description: e.target.value };
                                  setProcessSteps(updated);
                                }}
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="mt-2"
                                onClick={() => setProcessSteps(processSteps.filter((_, i) => i !== index))}
                              >
                                حذف
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-lg font-semibold">الباقات والأسعار</Label>
                        <Button size="sm" variant="outline" onClick={addPackage}>
                          <Plus className="w-4 h-4 ml-1" />
                          إضافة باقة
                        </Button>
                      </div>
                      {packages.length === 0 ? (
                        <p className="text-gray-500 text-sm">لا توجد باقات. اضغط لإضافة باقة جديدة.</p>
                      ) : (
                        <div className="space-y-3">
                          {packages.map((pkg, index) => (
                            <div key={pkg.id} className="border p-3 rounded bg-gray-50">
                              <div className="grid grid-cols-2 gap-2 mb-2">
                                <Input
                                  placeholder="اسم الباقة"
                                  value={pkg.name}
                                  onChange={(e) => {
                                    const updated = [...packages];
                                    updated[index] = { ...pkg, name: e.target.value };
                                    setPackages(updated);
                                  }}
                                />
                                <Input
                                  placeholder="السعر (مثل: 500 ريال)"
                                  value={pkg.price}
                                  onChange={(e) => {
                                    const updated = [...packages];
                                    updated[index] = { ...pkg, price: e.target.value };
                                    setPackages(updated);
                                  }}
                                />
                              </div>
                              <Textarea
                                placeholder="وصف الباقة"
                                value={pkg.description}
                                rows={2}
                                onChange={(e) => {
                                  const updated = [...packages];
                                  updated[index] = { ...pkg, description: e.target.value };
                                  setPackages(updated);
                                }}
                              />
                              <div className="flex items-center mt-2 space-x-2 space-x-reverse">
                                <Switch
                                  checked={pkg.highlighted}
                                  onCheckedChange={(checked) => {
                                    const updated = [...packages];
                                    updated[index] = { ...pkg, highlighted: checked };
                                    setPackages(updated);
                                  }}
                                />
                                <Label className="text-sm">باقة مميزة</Label>
                              </div>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="mt-2"
                                onClick={() => setPackages(packages.filter((_, i) => i !== index))}
                              >
                                حذف
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-lg font-semibold">الأسئلة الشائعة</Label>
                        <Button size="sm" variant="outline" onClick={addFaq}>
                          <Plus className="w-4 h-4 ml-1" />
                          إضافة سؤال
                        </Button>
                      </div>
                      {faqs.length === 0 ? (
                        <p className="text-gray-500 text-sm">لا توجد أسئلة شائعة. اضغط لإضافة سؤال جديد.</p>
                      ) : (
                        <div className="space-y-3">
                          {faqs.map((faq, index) => (
                            <div key={faq.id} className="border p-3 rounded bg-gray-50">
                              <Input
                                placeholder="السؤال"
                                value={faq.question}
                                className="mb-2"
                                onChange={(e) => {
                                  const updated = [...faqs];
                                  updated[index] = { ...faq, question: e.target.value };
                                  setFaqs(updated);
                                }}
                              />
                              <Textarea
                                placeholder="الإجابة"
                                value={faq.answer}
                                rows={3}
                                onChange={(e) => {
                                  const updated = [...faqs];
                                  updated[index] = { ...faq, answer: e.target.value };
                                  setFaqs(updated);
                                }}
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="mt-2"
                                onClick={() => setFaqs(faqs.filter((_, i) => i !== index))}
                              >
                                حذف
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* سابقة الأعمال والشهادات */}
                  <TabsContent value="portfolio" className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-lg font-semibold">سابقة الأعمال</Label>
                        <Button size="sm" variant="outline" onClick={addPortfolioItem}>
                          <Plus className="w-4 h-4 ml-1" />
                          إضافة مشروع
                        </Button>
                      </div>
                      {portfolioItems.length === 0 ? (
                        <p className="text-gray-500 text-sm">لا توجد مشاريع. اضغط لإضافة مشروع جديد.</p>
                      ) : (
                        <div className="space-y-3">
                          {portfolioItems.map((item, index) => (
                            <div key={item.id} className="border p-3 rounded bg-gray-50">
                              <div className="grid grid-cols-2 gap-2 mb-2">
                                <Input
                                  placeholder="عنوان المشروع"
                                  value={item.title}
                                  onChange={(e) => {
                                    const updated = [...portfolioItems];
                                    updated[index] = { ...item, title: e.target.value };
                                    setPortfolioItems(updated);
                                  }}
                                />
                                <Input
                                  placeholder="اسم العميل"
                                  value={item.clientName}
                                  onChange={(e) => {
                                    const updated = [...portfolioItems];
                                    updated[index] = { ...item, clientName: e.target.value };
                                    setPortfolioItems(updated);
                                  }}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2 mb-2">
                                <Input
                                  placeholder="رابط الصورة"
                                  value={item.image}
                                  onChange={(e) => {
                                    const updated = [...portfolioItems];
                                    updated[index] = { ...item, image: e.target.value };
                                    setPortfolioItems(updated);
                                  }}
                                />
                                <Input
                                  placeholder="النتيجة المحققة"
                                  value={item.result}
                                  onChange={(e) => {
                                    const updated = [...portfolioItems];
                                    updated[index] = { ...item, result: e.target.value };
                                    setPortfolioItems(updated);
                                  }}
                                />
                              </div>
                              <Textarea
                                placeholder="وصف المشروع"
                                value={item.description}
                                rows={2}
                                onChange={(e) => {
                                  const updated = [...portfolioItems];
                                  updated[index] = { ...item, description: e.target.value };
                                  setPortfolioItems(updated);
                                }}
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="mt-2"
                                onClick={() => setPortfolioItems(portfolioItems.filter((_, i) => i !== index))}
                              >
                                حذف
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-lg font-semibold">آراء العملاء</Label>
                        <Button size="sm" variant="outline" onClick={addTestimonial}>
                          <Plus className="w-4 h-4 ml-1" />
                          إضافة رأي
                        </Button>
                      </div>
                      {testimonials.length === 0 ? (
                        <p className="text-gray-500 text-sm">لا توجد آراء عملاء. اضغط لإضافة رأي جديد.</p>
                      ) : (
                        <div className="space-y-3">
                          {testimonials.map((testimonial, index) => (
                            <div key={testimonial.id} className="border p-3 rounded bg-gray-50">
                              <div className="grid grid-cols-3 gap-2 mb-2">
                                <Input
                                  placeholder="اسم العميل"
                                  value={testimonial.name}
                                  onChange={(e) => {
                                    const updated = [...testimonials];
                                    updated[index] = { ...testimonial, name: e.target.value };
                                    setTestimonials(updated);
                                  }}
                                />
                                <Input
                                  placeholder="المنصب"
                                  value={testimonial.position}
                                  onChange={(e) => {
                                    const updated = [...testimonials];
                                    updated[index] = { ...testimonial, position: e.target.value };
                                    setTestimonials(updated);
                                  }}
                                />
                                <Input
                                  placeholder="الشركة"
                                  value={testimonial.company}
                                  onChange={(e) => {
                                    const updated = [...testimonials];
                                    updated[index] = { ...testimonial, company: e.target.value };
                                    setTestimonials(updated);
                                  }}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2 mb-2">
                                <Input
                                  placeholder="رابط صورة العميل"
                                  value={testimonial.image}
                                  onChange={(e) => {
                                    const updated = [...testimonials];
                                    updated[index] = { ...testimonial, image: e.target.value };
                                    setTestimonials(updated);
                                  }}
                                />
                                <Select 
                                  value={testimonial.rating?.toString()} 
                                  onValueChange={(value) => {
                                    const updated = [...testimonials];
                                    updated[index] = { ...testimonial, rating: parseInt(value) };
                                    setTestimonials(updated);
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="التقييم" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="5">⭐⭐⭐⭐⭐ (5)</SelectItem>
                                    <SelectItem value="4">⭐⭐⭐⭐ (4)</SelectItem>
                                    <SelectItem value="3">⭐⭐⭐ (3)</SelectItem>
                                    <SelectItem value="2">⭐⭐ (2)</SelectItem>
                                    <SelectItem value="1">⭐ (1)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Textarea
                                placeholder="محتوى الرأي أو الشهادة"
                                value={testimonial.content}
                                rows={3}
                                onChange={(e) => {
                                  const updated = [...testimonials];
                                  updated[index] = { ...testimonial, content: e.target.value };
                                  setTestimonials(updated);
                                }}
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="mt-2"
                                onClick={() => setTestimonials(testimonials.filter((_, i) => i !== index))}
                              >
                                حذف
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
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