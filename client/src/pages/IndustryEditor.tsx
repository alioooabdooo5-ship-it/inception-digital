import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, Eye, RefreshCw, BarChart3, Users, Target, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import RichTextEditor from "@/components/ui/RichTextEditor";

interface IndustryEditorProps {
  industryId?: string | null;
  onBack?: () => void;
}

const IndustryEditor: React.FC<IndustryEditorProps> = ({ industryId, onBack }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [seoScore, setSeoScore] = useState(75);

  // Industry data state
  const [industryData, setIndustryData] = useState({
    // Basic Info
    title: "",
    subtitle: "",
    description: "",
    icon: "",
    image: "",
    status: "published",
    
    // SEO
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    slug: "",
    canonicalUrl: "",
    
    // Open Graph
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    
    // Content
    overview: "",
    challenges: "",
    solutions: "",
    technologies: [],
    
    // Statistics
    projectsCompleted: 0,
    clientsSatisfied: 0,
    yearsExperience: 0,
    successRate: 0,
    
    // Case Studies
    caseStudies: [],
    
    // Process Steps
    processSteps: [],
    
    // Testimonials
    testimonials: [],
    
    // Settings
    featured: false,
    showOnHomepage: true,
    displayOrder: 1,
  });

  // Load industry data if editing
  useEffect(() => {
    if (industryId && industryId !== "new") {
      // Load existing industry data
      // This would be an API call in a real application
      setIndustryData({
        ...industryData,
        title: "التكنولوجيا والاتصالات",
        subtitle: "حلول تقنية متطورة للمستقبل",
        description: "نقدم خدمات استشارية مخصصة لقطاع التكنولوجيا والاتصالات مع التركيز على الابتكار والتحول الرقمي",
        metaTitle: "خدمات التكنولوجيا والاتصالات | إنسيبشن",
        metaDescription: "خدمات استشارية متخصصة في التكنولوجيا والاتصالات. حلول مبتكرة للتحول الرقمي وتطوير الأعمال",
        slug: "technology-communications",
      });
    }
  }, [industryId]);

  // Auto-generate SEO fields
  useEffect(() => {
    if (industryData.title && !industryData.metaTitle) {
      setIndustryData(prev => ({
        ...prev,
        metaTitle: `${prev.title} | إنسيبشن`,
        slug: prev.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, ''),
      }));
    }
  }, [industryData.title]);

  // Calculate SEO score
  useEffect(() => {
    let score = 0;
    if (industryData.title) score += 15;
    if (industryData.metaTitle && industryData.metaTitle.length <= 60) score += 15;
    if (industryData.metaDescription && industryData.metaDescription.length <= 160) score += 15;
    if (industryData.metaKeywords) score += 10;
    if (industryData.slug) score += 10;
    if (industryData.description && industryData.description.length >= 100) score += 15;
    if (industryData.image) score += 10;
    if (industryData.ogTitle) score += 5;
    if (industryData.ogDescription) score += 5;
    setSeoScore(score);
  }, [industryData]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ بيانات الصناعة بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setIndustryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getSEOScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getSEOScoreLabel = (score: number) => {
    if (score >= 80) return "ممتاز";
    if (score >= 60) return "جيد";
    return "يحتاج تحسين";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة للصناعات
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-inception-purple">
              {industryId === "new" ? "إضافة صناعة جديدة" : "تحرير الصناعة"}
            </h1>
            <p className="text-gray-600">
              {industryId === "new" ? "إنشاء صناعة جديدة" : `تحرير: ${industryData.title}`}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 ml-2" />
            معاينة
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="bg-inception-purple hover:bg-inception-purple/90">
            {isLoading ? (
              <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 ml-2" />
            )}
            حفظ
          </Button>
        </div>
      </div>

      {/* SEO Score Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-inception-purple" />
                <span className="font-medium">تقييم SEO:</span>
                <span className={`font-bold ${getSEOScoreColor(seoScore)}`}>
                  {seoScore}% ({getSEOScoreLabel(seoScore)})
                </span>
              </div>
              <Progress value={seoScore} className="w-32" />
            </div>
            <Badge variant={seoScore >= 80 ? "default" : seoScore >= 60 ? "secondary" : "destructive"}>
              {getSEOScoreLabel(seoScore)}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="basic">المعلومات الأساسية</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="content">المحتوى</TabsTrigger>
          <TabsTrigger value="statistics">الإحصائيات</TabsTrigger>
          <TabsTrigger value="case-studies">دراسات الحالة</TabsTrigger>
          <TabsTrigger value="process">العملية</TabsTrigger>
          <TabsTrigger value="testimonials">آراء العملاء</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>المعلومات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">عنوان الصناعة *</Label>
                  <Input
                    id="title"
                    value={industryData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="مثال: التكنولوجيا والاتصالات"
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">العنوان الفرعي</Label>
                  <Input
                    id="subtitle"
                    value={industryData.subtitle}
                    onChange={(e) => handleInputChange("subtitle", e.target.value)}
                    placeholder="وصف قصير للصناعة"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">الوصف الأساسي</Label>
                <Textarea
                  id="description"
                  value={industryData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="وصف موجز للصناعة يظهر في البطاقات والقوائم"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="icon">أيقونة الصناعة</Label>
                  <Input
                    id="icon"
                    value={industryData.icon}
                    onChange={(e) => handleInputChange("icon", e.target.value)}
                    placeholder="اسم الأيقونة أو رابط"
                  />
                </div>
                <div>
                  <Label htmlFor="image">صورة الصناعة</Label>
                  <Input
                    id="image"
                    value={industryData.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    placeholder="رابط الصورة الرئيسية"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">حالة النشر</Label>
                <Select value={industryData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">منشور</SelectItem>
                    <SelectItem value="draft">مسودة</SelectItem>
                    <SelectItem value="private">خاص</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات SEO الأساسية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="meta-title">Meta Title</Label>
                    <Input
                      id="meta-title"
                      value={industryData.metaTitle}
                      onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                      placeholder="عنوان الصفحة في نتائج البحث"
                      maxLength={60}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {industryData.metaTitle.length}/60 حرف
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Textarea
                      id="meta-description"
                      value={industryData.metaDescription}
                      onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                      placeholder="وصف الصفحة في نتائج البحث"
                      maxLength={160}
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {industryData.metaDescription.length}/160 حرف
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="meta-keywords">الكلمات المفتاحية</Label>
                    <Input
                      id="meta-keywords"
                      value={industryData.metaKeywords}
                      onChange={(e) => handleInputChange("metaKeywords", e.target.value)}
                      placeholder="كلمة1، كلمة2، كلمة3"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="slug">الرابط (Slug)</Label>
                      <Input
                        id="slug"
                        value={industryData.slug}
                        onChange={(e) => handleInputChange("slug", e.target.value)}
                        placeholder="technology-communications"
                      />
                    </div>
                    <div>
                      <Label htmlFor="canonical">Canonical URL</Label>
                      <Input
                        id="canonical"
                        value={industryData.canonicalUrl}
                        onChange={(e) => handleInputChange("canonicalUrl", e.target.value)}
                        placeholder="https://inception.sa/industries/technology"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Open Graph & Social Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="og-title">Open Graph Title</Label>
                    <Input
                      id="og-title"
                      value={industryData.ogTitle}
                      onChange={(e) => handleInputChange("ogTitle", e.target.value)}
                      placeholder="عنوان للمشاركة على وسائل التواصل"
                    />
                  </div>

                  <div>
                    <Label htmlFor="og-description">Open Graph Description</Label>
                    <Textarea
                      id="og-description"
                      value={industryData.ogDescription}
                      onChange={(e) => handleInputChange("ogDescription", e.target.value)}
                      placeholder="وصف للمشاركة على وسائل التواصل"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="og-image">Open Graph Image</Label>
                    <Input
                      id="og-image"
                      value={industryData.ogImage}
                      onChange={(e) => handleInputChange("ogImage", e.target.value)}
                      placeholder="رابط صورة المشاركة"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>معاينة في نتائج البحث</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="text-blue-600 text-lg font-medium line-clamp-1">
                      {industryData.metaTitle || industryData.title || "عنوان الصناعة"}
                    </div>
                    <div className="text-green-700 text-sm">
                      inception.sa/industries/{industryData.slug || "industry-name"}
                    </div>
                    <div className="text-gray-700 text-sm mt-1 line-clamp-2">
                      {industryData.metaDescription || industryData.description || "وصف الصناعة سيظهر هنا في نتائج البحث"}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>نصائح تحسين SEO</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${industryData.metaTitle && industryData.metaTitle.length <= 60 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div className="text-sm">
                      <strong>Meta Title:</strong> يجب أن يكون أقل من 60 حرف
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${industryData.metaDescription && industryData.metaDescription.length <= 160 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div className="text-sm">
                      <strong>Meta Description:</strong> يجب أن يكون أقل من 160 حرف
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${industryData.description && industryData.description.length >= 100 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div className="text-sm">
                      <strong>المحتوى:</strong> يجب أن يكون أكثر من 100 حرف
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>محتوى الصناعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="overview">نظرة عامة</Label>
                <RichTextEditor
                  content={industryData.overview}
                  onChange={(content) => handleInputChange("overview", content)}
                  placeholder="نظرة عامة شاملة عن الصناعة..."
                />
              </div>

              <div>
                <Label htmlFor="challenges">التحديات</Label>
                <RichTextEditor
                  content={industryData.challenges}
                  onChange={(content) => handleInputChange("challenges", content)}
                  placeholder="التحديات التي تواجه هذه الصناعة..."
                />
              </div>

              <div>
                <Label htmlFor="solutions">الحلول المقدمة</Label>
                <RichTextEditor
                  content={industryData.solutions}
                  onChange={(content) => handleInputChange("solutions", content)}
                  placeholder="الحلول والخدمات التي نقدمها..."
                />
              </div>

              <div>
                <Label htmlFor="technologies">التقنيات المستخدمة</Label>
                <Input
                  id="technologies"
                  value={industryData.technologies.join(", ")}
                  onChange={(e) => handleInputChange("technologies", e.target.value.split(", "))}
                  placeholder="React, Node.js, Python, AI"
                />
                <p className="text-xs text-gray-500 mt-1">افصل بين التقنيات بفاصلة ومسافة</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="statistics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إحصائيات الصناعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="projects-completed">المشاريع المكتملة</Label>
                  <Input
                    id="projects-completed"
                    type="number"
                    value={industryData.projectsCompleted}
                    onChange={(e) => handleInputChange("projectsCompleted", parseInt(e.target.value) || 0)}
                    placeholder="150"
                  />
                </div>
                <div>
                  <Label htmlFor="clients-satisfied">العملاء الراضون</Label>
                  <Input
                    id="clients-satisfied"
                    type="number"
                    value={industryData.clientsSatisfied}
                    onChange={(e) => handleInputChange("clientsSatisfied", parseInt(e.target.value) || 0)}
                    placeholder="120"
                  />
                </div>
                <div>
                  <Label htmlFor="years-experience">سنوات الخبرة</Label>
                  <Input
                    id="years-experience"
                    type="number"
                    value={industryData.yearsExperience}
                    onChange={(e) => handleInputChange("yearsExperience", parseInt(e.target.value) || 0)}
                    placeholder="8"
                  />
                </div>
                <div>
                  <Label htmlFor="success-rate">معدل النجاح (%)</Label>
                  <Input
                    id="success-rate"
                    type="number"
                    max="100"
                    value={industryData.successRate}
                    onChange={(e) => handleInputChange("successRate", parseInt(e.target.value) || 0)}
                    placeholder="95"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Case Studies Tab */}
        <TabsContent value="case-studies" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>دراسات الحالة</CardTitle>
                <Button variant="outline">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة دراسة حالة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                لا توجد دراسات حالة مضافة حتى الآن
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Process Tab */}
        <TabsContent value="process" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>خطوات العملية</CardTitle>
                <Button variant="outline">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة خطوة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                لا توجد خطوات مضافة حتى الآن
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>آراء العملاء</CardTitle>
                <Button variant="outline">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة تقييم
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                لا توجد تقييمات مضافة حتى الآن
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات العرض</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">مميز</div>
                  <div className="text-sm text-gray-500">عرض كصناعة مميزة</div>
                </div>
                <Switch
                  checked={industryData.featured}
                  onCheckedChange={(checked) => handleInputChange("featured", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">عرض في الصفحة الرئيسية</div>
                  <div className="text-sm text-gray-500">إظهار في قسم الصناعات بالصفحة الرئيسية</div>
                </div>
                <Switch
                  checked={industryData.showOnHomepage}
                  onCheckedChange={(checked) => handleInputChange("showOnHomepage", checked)}
                />
              </div>

              <div>
                <Label htmlFor="display-order">ترتيب العرض</Label>
                <Input
                  id="display-order"
                  type="number"
                  value={industryData.displayOrder}
                  onChange={(e) => handleInputChange("displayOrder", parseInt(e.target.value) || 1)}
                  placeholder="1"
                />
                <p className="text-xs text-gray-500 mt-1">الرقم الأقل يظهر أولاً</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IndustryEditor;