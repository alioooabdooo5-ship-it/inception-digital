import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Save, Eye, ArrowLeft, Image, Tag, Star, Globe, 
  Calendar, Clock, User, BarChart3, AlertCircle,
  CheckCircle, Settings, Lightbulb, Target
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
import type { Article } from "@shared/schema";

const EnhancedArticleEditor = () => {
  const { toast } = useToast();
  const [location, navigate] = useLocation();
  const queryClient = useQueryClient();
  
  // URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id');
  const isEditing = !!articleId;

  // Article content states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [author, setAuthor] = useState("فريق إنسيبشن");
  const [readTime, setReadTime] = useState("5 دقائق");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState("draft");
  
  // SEO states
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [seoScore, setSeoScore] = useState(0);
  
  // UI states
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // تحديد الفئات المتاحة
  const categories = [
    { id: "seo", name: "تحسين محركات البحث" },
    { id: "social-media", name: "وسائل التواصل الاجتماعي" },
    { id: "web-development", name: "تطوير المواقع" },
    { id: "digital-marketing", name: "التسويق الرقمي" },
    { id: "content-marketing", name: "تسويق المحتوى" },
    { id: "paid-ads", name: "الإعلانات المدفوعة" }
  ];

  // جلب المقال للتعديل
  const { data: existingArticle } = useQuery<Article>({
    queryKey: ["/api/articles", articleId],
    enabled: !!isEditing && !!articleId,
  });

  // تحديث البيانات عند تحميل المقال للتعديل
  useEffect(() => {
    if (existingArticle && isEditing) {
      setTitle(existingArticle.title || "");
      setContent(existingArticle.content || "");
      setExcerpt(existingArticle.excerpt || "");
      setCategory(existingArticle.category || "");
      setCategoryName(existingArticle.categoryName || "");
      setTags(existingArticle.tags ? (Array.isArray(existingArticle.tags) ? existingArticle.tags : []) : []);
      setFeaturedImage(existingArticle.image || "");
      setAuthor(existingArticle.author || "فريق إنسيبشن");
      setReadTime(existingArticle.readTime || "5 دقائق");
      setFeatured(existingArticle.featured || false);
      setStatus(existingArticle.status || "draft");
      setMetaTitle(existingArticle.metaTitle || "");
      setMetaDescription(existingArticle.metaDescription || "");
      setFocusKeyword(existingArticle.focusKeyword || "");
    }
  }, [existingArticle, isEditing]);

  // حساب نقاط SEO
  useEffect(() => {
    let score = 0;
    if (title.length > 10 && title.length < 60) score += 20;
    if (metaDescription.length > 120 && metaDescription.length < 160) score += 20;
    if (focusKeyword && title.toLowerCase().includes(focusKeyword.toLowerCase())) score += 15;
    if (focusKeyword && content.toLowerCase().includes(focusKeyword.toLowerCase())) score += 15;
    if (excerpt.length > 120) score += 10;
    if (featuredImage) score += 10;
    if (tags.length >= 3) score += 10;
    
    setSeoScore(score);
  }, [title, metaDescription, focusKeyword, content, excerpt, featuredImage, tags]);

  // حفظ المقال
  const saveMutation = useMutation({
    mutationFn: async (articleData: any) => {
      if (isEditing) {
        return await apiRequest("PUT", `/api/articles/${articleId}`, articleData);
      } else {
        return await apiRequest("POST", "/api/articles", articleData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({
        title: "تم الحفظ بنجاح",
        description: isEditing ? "تم تحديث المقال" : "تم إنشاء المقال الجديد",
      });
      if (!isEditing) {
        navigate("/admin/articles");
      }
    },
    onError: (error) => {
      toast({
        title: "خطأ في الحفظ",
        description: "فشل في حفظ المقال. حاول مرة أخرى.",
        variant: "destructive",
      });
    },
  });

  // إضافة تاج
  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  // حذف تاج
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // حفظ المقال
  const handleSave = (newStatus?: string) => {
    if (!title.trim()) {
      toast({
        title: "خطأ",
        description: "عنوان المقال مطلوب",
        variant: "destructive",
      });
      return;
    }

    const finalStatus = newStatus || status;
    const selectedCategory = categories.find(cat => cat.id === category);

    const articleData = {
      title: title.trim(),
      content,
      excerpt: excerpt.trim(),
      category,
      categoryName: selectedCategory?.name || "",
      tags,
      image: featuredImage,
      author,
      readTime,
      featured,
      status: finalStatus,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
      focusKeyword,
      views: isEditing ? existingArticle?.views || 0 : 0,
    };

    saveMutation.mutate(articleData);
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
              onClick={() => navigate("/admin/articles")}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              العودة للمقالات
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-2xl font-bold text-inception-purple">
              {isEditing ? "تعديل المقال" : "مقال جديد"}
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
              variant="outline"
              onClick={() => handleSave("draft")}
              disabled={saveMutation.isPending}
            >
              <Save className="w-4 h-4 ml-2" />
              حفظ كمسودة
            </Button>
            
            <Button 
              onClick={() => handleSave("published")}
              disabled={saveMutation.isPending}
              className="bg-inception-purple hover:bg-inception-purple/90"
            >
              {saveMutation.isPending ? "جاري النشر..." : "نشر المقال"}
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
                {/* عنوان المقال */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Tag className="w-5 h-5 ml-2 text-inception-purple" />
                      عنوان المقال
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="اكتب عنوان المقال هنا..."
                      className="text-xl font-bold"
                    />
                  </CardContent>
                </Card>

                {/* الملخص */}
                <Card>
                  <CardHeader>
                    <CardTitle>ملخص المقال</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="ملخص قصير للمقال..."
                      rows={3}
                      className="resize-none"
                    />
                    <div className="text-sm text-gray-500 mt-2">
                      {excerpt.length}/160 حرف (مثالي: 120-160)
                    </div>
                  </CardContent>
                </Card>

                {/* محتوى المقال */}
                <Card>
                  <CardHeader>
                    <CardTitle>محتوى المقال</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RichTextEditor
                      content={content}
                      onChange={setContent}
                    />
                  </CardContent>
                </Card>
              </>
            ) : (
              /* معاينة المقال */
              <Card>
                <CardContent className="p-8">
                  <article className="prose prose-lg max-w-none">
                    <h1 className="text-4xl font-bold text-inception-purple mb-4">
                      {title || "عنوان المقال"}
                    </h1>
                    
                    {featuredImage && (
                      <img 
                        src={featuredImage} 
                        alt={title}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                      />
                    )}
                    
                    <div className="flex items-center space-x-4 space-x-reverse text-gray-600 mb-6 border-b pb-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 ml-1" />
                        {author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 ml-1" />
                        {readTime}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 ml-1" />
                        {new Date().toLocaleDateString('ar-EG')}
                      </div>
                    </div>
                    
                    {excerpt && (
                      <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                        {excerpt}
                      </p>
                    )}
                    
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                    
                    {tags.length > 0 && (
                      <div className="mt-8 pt-6 border-t">
                        <h4 className="font-semibold mb-3">الكلمات المفتاحية:</h4>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                </CardContent>
              </Card>
            )}
          </div>

          {/* الشريط الجانبي */}
          <div className="space-y-6">
            {/* حالة المقال */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 ml-2 text-inception-purple" />
                  إعدادات النشر
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>حالة المقال</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">مسودة</SelectItem>
                      <SelectItem value="review">قيد المراجعة</SelectItem>
                      <SelectItem value="published">منشور</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label>مقال مميز</Label>
                  <Switch checked={featured} onCheckedChange={setFeatured} />
                </div>

                <div>
                  <Label>الكاتب</Label>
                  <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>

                <div>
                  <Label>وقت القراءة</Label>
                  <Input value={readTime} onChange={(e) => setReadTime(e.target.value)} />
                </div>
              </CardContent>
            </Card>

            {/* الفئة والتصنيف */}
            <Card>
              <CardHeader>
                <CardTitle>الفئة والتصنيف</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>فئة المقال</Label>
                  <Select value={category} onValueChange={(value) => {
                    setCategory(value);
                    const selectedCat = categories.find(cat => cat.id === value);
                    setCategoryName(selectedCat?.name || "");
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر فئة" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>الكلمات المفتاحية</Label>
                  <div className="flex space-x-2 space-x-reverse">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="أضف كلمة مفتاحية"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button onClick={addTag} size="sm">إضافة</Button>
                  </div>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="cursor-pointer"
                          onClick={() => removeTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label>الصورة المميزة</Label>
                  <Input
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="رابط الصورة المميزة"
                  />
                  {featuredImage && (
                    <img 
                      src={featuredImage} 
                      alt="معاينة" 
                      className="w-full h-32 object-cover rounded-lg mt-2"
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* تحسين محركات البحث */}
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
              <CardContent className="space-y-4">
                <div>
                  <Progress value={seoScore} className="w-full" />
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
                  <div className="text-sm text-gray-500">
                    {metaTitle.length}/60 حرف
                  </div>
                </div>

                <div>
                  <Label>وصف SEO</Label>
                  <Textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="وصف المقال في محركات البحث"
                    rows={3}
                  />
                  <div className="text-sm text-gray-500">
                    {metaDescription.length}/160 حرف
                  </div>
                </div>

                {/* نصائح SEO */}
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    <strong>نصائح:</strong>
                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                      <li>استخدم الكلمة المفتاحية في العنوان</li>
                      <li>اكتب وصف جذاب بين 120-160 حرف</li>
                      <li>أضف 3-5 كلمات مفتاحية ذات صلة</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedArticleEditor;