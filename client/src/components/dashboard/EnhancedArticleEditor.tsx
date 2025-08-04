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
import MediaManager from "@/components/dashboard/MediaManager";

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
  
  // SEO states - الحقول الأساسية
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [urlSlug, setUrlSlug] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [robotsIndex, setRobotsIndex] = useState(true);
  const [robotsFollow, setRobotsFollow] = useState(true);
  
  // Open Graph / Facebook
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  
  // Twitter Cards
  const [twitterTitle, setTwitterTitle] = useState("");
  const [twitterDescription, setTwitterDescription] = useState("");
  const [twitterImage, setTwitterImage] = useState("");
  
  // Schema.org
  const [schemaType, setSchemaType] = useState("Article");
  
  // SEO التقني
  const [h1Tag, setH1Tag] = useState("");
  const [h2Tags, setH2Tags] = useState<string[]>([]);
  const [h3Tags, setH3Tags] = useState<string[]>([]);
  const [currentH2, setCurrentH2] = useState("");
  const [currentH3, setCurrentH3] = useState("");
  
  // الروابط الداخلية والخارجية
  const [internalLinks, setInternalLinks] = useState<{url: string, anchor: string}[]>([]);
  const [externalLinks, setExternalLinks] = useState<{url: string, anchor: string}[]>([]);
  const [currentInternalLink, setCurrentInternalLink] = useState({url: "", anchor: ""});
  const [currentExternalLink, setCurrentExternalLink] = useState({url: "", anchor: ""});
  
  // Alt texts للصور
  const [altTexts, setAltTexts] = useState<{image: string, alt: string}[]>([]);
  const [currentAltText, setCurrentAltText] = useState({image: "", alt: ""});
  
  // معلومات SEO إضافية
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [seoScore, setSeoScore] = useState(0);
  
  // UI states
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showMediaManager, setShowMediaManager] = useState(false);

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
      setTags((existingArticle as any).tags ? (Array.isArray((existingArticle as any).tags) ? (existingArticle as any).tags : []) : []);
      setFeaturedImage(existingArticle.image || "");
      setAuthor(existingArticle.author || "فريق إنسيبشن");
      setReadTime(existingArticle.readTime || "5 دقائق");
      setFeatured(existingArticle.featured || false);
      setStatus((existingArticle as any).status || "draft");
      setMetaTitle((existingArticle as any).metaTitle || "");
      setMetaDescription((existingArticle as any).metaDescription || "");
      setFocusKeyword((existingArticle as any).focusKeyword || "");
      setUrlSlug((existingArticle as any).urlSlug || "");
      setCanonicalUrl((existingArticle as any).canonicalUrl || "");
      setRobotsIndex((existingArticle as any).robotsIndex !== false);
      setRobotsFollow((existingArticle as any).robotsFollow !== false);
      setOgTitle((existingArticle as any).ogTitle || "");
      setOgDescription((existingArticle as any).ogDescription || "");
      setOgImage((existingArticle as any).ogImage || "");
      setTwitterTitle((existingArticle as any).twitterTitle || "");
      setTwitterDescription((existingArticle as any).twitterDescription || "");
      setTwitterImage((existingArticle as any).twitterImage || "");
      setSchemaType((existingArticle as any).schemaType || "Article");
      setH1Tag((existingArticle as any).h1Tag || "");
      setH2Tags((existingArticle as any).h2Tags || []);
      setH3Tags((existingArticle as any).h3Tags || []);
      setInternalLinks((existingArticle as any).internalLinks || []);
      setExternalLinks((existingArticle as any).externalLinks || []);
      setAltTexts((existingArticle as any).altTexts || []);
      setWordCount((existingArticle as any).wordCount || 0);
      setReadingTime((existingArticle as any).readingTime || 0);
    }
  }, [existingArticle, isEditing]);

  // حساب عدد الكلمات ووقت القراءة
  useEffect(() => {
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    setWordCount(words);
    setReadingTime(Math.ceil(words / 200)); // متوسط 200 كلمة في الدقيقة
  }, [content]);

  // Auto-save functionality
  const autoSave = async () => {
    if (!title.trim() || !hasUnsavedChanges || !isEditing) return;
    
    setAutoSaveStatus('saving');
    
    try {
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
        status,
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt,
        focusKeyword,
        urlSlug: urlSlug || generateSlugFromTitle(title),
        canonicalUrl,
        robotsIndex,
        robotsFollow,
        ogTitle: ogTitle || metaTitle || title,
        ogDescription: ogDescription || metaDescription || excerpt,
        ogImage: ogImage || featuredImage,
        twitterTitle: twitterTitle || ogTitle || metaTitle || title,
        twitterDescription: twitterDescription || ogDescription || metaDescription || excerpt,
        twitterImage: twitterImage || ogImage || featuredImage,
        schemaType,
        h1Tag: h1Tag || title,
        h2Tags,
        h3Tags,
        internalLinks,
        externalLinks,
        altTexts,
        wordCount,
        readingTime,
        seoScore,
      };

      await apiRequest(`/api/articles/${articleId}`, {
        method: 'PUT',
        body: JSON.stringify(articleData)
      });
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
  }, [title, content, excerpt, category, tags, featuredImage, author, readTime, featured, status, metaTitle, metaDescription, focusKeyword, urlSlug, canonicalUrl, robotsIndex, robotsFollow, ogTitle, ogDescription, ogImage, twitterTitle, twitterDescription, twitterImage, schemaType, h1Tag, h2Tags, h3Tags, internalLinks, externalLinks, altTexts]);

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

  // حساب نقاط SEO الشامل
  useEffect(() => {
    let score = 0;
    const maxScore = 100;
    
    // عنوان الصفحة (20 نقطة)
    if (title.length >= 30 && title.length <= 60) score += 20;
    else if (title.length > 10) score += 10;
    
    // وصف الصفحة (20 نقطة)
    if (metaDescription.length >= 120 && metaDescription.length <= 160) score += 20;
    else if (metaDescription.length > 50) score += 10;
    
    // الكلمة المفتاحية الرئيسية (25 نقطة)
    if (focusKeyword) {
      if (title.toLowerCase().includes(focusKeyword.toLowerCase())) score += 10;
      if (metaDescription.toLowerCase().includes(focusKeyword.toLowerCase())) score += 5;
      if (h1Tag.toLowerCase().includes(focusKeyword.toLowerCase())) score += 5;
      if (content.toLowerCase().includes(focusKeyword.toLowerCase())) score += 5;
    }
    
    // المحتوى (15 نقطة)
    if (wordCount >= 300) score += 5;
    if (wordCount >= 1000) score += 5;
    if (h2Tags.length >= 2) score += 5;
    
    // الصور (10 نقطة)
    if (featuredImage) score += 5;
    if (altTexts.length > 0) score += 5;
    
    // الكلمات المفتاحية (5 نقاط)
    if (tags.length >= 3 && tags.length <= 8) score += 5;
    
    // العناصر التقنية (5 نقاط)
    if (canonicalUrl) score += 2;
    if (ogTitle && ogDescription) score += 3;
    
    setSeoScore(Math.min(score, maxScore));
  }, [title, metaDescription, focusKeyword, content, h1Tag, h2Tags, wordCount, featuredImage, altTexts, tags, canonicalUrl, ogTitle, ogDescription]);

  // وظائف إضافة العناصر
  const addH2Tag = () => {
    if (currentH2.trim() && !h2Tags.includes(currentH2.trim())) {
      setH2Tags([...h2Tags, currentH2.trim()]);
      setCurrentH2("");
    }
  };

  const addH3Tag = () => {
    if (currentH3.trim() && !h3Tags.includes(currentH3.trim())) {
      setH3Tags([...h3Tags, currentH3.trim()]);
      setCurrentH3("");
    }
  };

  const addInternalLink = () => {
    if (currentInternalLink.url.trim() && currentInternalLink.anchor.trim()) {
      setInternalLinks([...internalLinks, currentInternalLink]);
      setCurrentInternalLink({url: "", anchor: ""});
    }
  };

  const addExternalLink = () => {
    if (currentExternalLink.url.trim() && currentExternalLink.anchor.trim()) {
      setExternalLinks([...externalLinks, currentExternalLink]);
      setCurrentExternalLink({url: "", anchor: ""});
    }
  };

  const addAltText = () => {
    if (currentAltText.image.trim() && currentAltText.alt.trim()) {
      setAltTexts([...altTexts, currentAltText]);
      setCurrentAltText({image: "", alt: ""});
    }
  };

  // حفظ المقال
  const saveMutation = useMutation({
    mutationFn: async (articleData: any) => {
      if (isEditing) {
        return await apiRequest(`/api/articles/${articleId}`, {
          method: "PUT",
          body: JSON.stringify(articleData)
        });
      } else {
        return await apiRequest("/api/articles", {
          method: "POST", 
          body: JSON.stringify(articleData)
        });
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

  // إنشاء البيرما لينك من العنوان
  const generateSlugFromTitle = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[أإآ]/g, 'ا')
      .replace(/[ؤ]/g, 'و')
      .replace(/[ئي]/g, 'ي')
      .replace(/[ة]/g, 'ه')
      .replace(/[^\u0600-\u06FFa-zA-Z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 100);
  };

  // تحديث البيرما لينك تلقائياً عند تغيير العنوان
  useEffect(() => {
    if (title && !isEditing && !urlSlug) {
      setUrlSlug(generateSlugFromTitle(title));
    }
  }, [title, isEditing, urlSlug]);



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
      urlSlug: urlSlug || generateSlugFromTitle(title),
      canonicalUrl,
      robotsIndex,
      robotsFollow,
      ogTitle: ogTitle || metaTitle || title,
      ogDescription: ogDescription || metaDescription || excerpt,
      ogImage: ogImage || featuredImage,
      twitterTitle: twitterTitle || ogTitle || metaTitle || title,
      twitterDescription: twitterDescription || ogDescription || metaDescription || excerpt,
      twitterImage: twitterImage || ogImage || featuredImage,
      schemaType,
      h1Tag: h1Tag || title,
      h2Tags,
      h3Tags,
      internalLinks,
      externalLinks,
      altTexts,
      wordCount,
      readingTime,
      seoScore,
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
                  <div className="space-y-2">
                    <div className="flex space-x-2 space-x-reverse">
                      <Input
                        value={featuredImage}
                        onChange={(e) => setFeaturedImage(e.target.value)}
                        placeholder="رابط الصورة المميزة"
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowMediaManager(true)}
                        className="px-3"
                      >
                        <Image className="w-4 h-4" />
                      </Button>
                    </div>
                    {featuredImage && (
                      <img 
                        src={featuredImage} 
                        alt="معاينة" 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* تحسين محركات البحث الشامل */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Target className="w-5 h-5 ml-2 text-inception-orange" />
                    تحسين SEO الشامل
                  </div>
                  <div className={`text-sm font-bold ${getSeoScoreColor(seoScore)}`}>
                    {seoScore}/100 ({getSeoScoreText(seoScore)})
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="basic">أساسي</TabsTrigger>
                    <TabsTrigger value="social">وسائل التواصل</TabsTrigger>
                    <TabsTrigger value="technical">تقني</TabsTrigger>
                    <TabsTrigger value="content">المحتوى</TabsTrigger>
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
                      <Label>البيرما لينك (URL Slug)</Label>
                      <div className="space-y-2">
                        <Input
                          value={urlSlug}
                          onChange={(e) => setUrlSlug(e.target.value)}
                          placeholder="url-slug-here"
                          dir="ltr"
                          className="text-left"
                        />
                        <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded border">
                          <strong>معاينة الرابط:</strong><br />
                          <span className="text-inception-purple font-mono" dir="ltr">
                            https://inception.com/articles/{urlSlug || generateSlugFromTitle(title) || "article-url"}
                          </span>
                        </div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => setUrlSlug(generateSlugFromTitle(title))}
                          className="w-full"
                        >
                          إنشاء تلقائي من العنوان
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>عنوان SEO (Title Tag)</Label>
                      <Input
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder="عنوان محرك البحث"
                      />
                      <div className={`text-sm ${metaTitle.length > 60 ? 'text-red-500' : metaTitle.length > 30 ? 'text-green-500' : 'text-gray-500'}`}>
                        {metaTitle.length}/60 حرف (مثالي: 30-60)
                      </div>
                    </div>

                    <div>
                      <Label>وصف SEO (Meta Description)</Label>
                      <Textarea
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder="وصف المقال في محركات البحث"
                        rows={3}
                      />
                      <div className={`text-sm ${metaDescription.length > 160 ? 'text-red-500' : metaDescription.length > 120 ? 'text-green-500' : 'text-gray-500'}`}>
                        {metaDescription.length}/160 حرف (مثالي: 120-160)
                      </div>
                    </div>

                    <div>
                      <Label>Canonical URL</Label>
                      <Input
                        value={canonicalUrl}
                        onChange={(e) => setCanonicalUrl(e.target.value)}
                        placeholder="https://example.com/article-url"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>فهرسة الصفحة (Index)</Label>
                        <p className="text-sm text-gray-500">السماح لمحركات البحث بفهرسة الصفحة</p>
                      </div>
                      <Switch checked={robotsIndex} onCheckedChange={setRobotsIndex} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>تتبع الروابط (Follow)</Label>
                        <p className="text-sm text-gray-500">السماح لمحركات البحث بتتبع الروابط</p>
                      </div>
                      <Switch checked={robotsFollow} onCheckedChange={setRobotsFollow} />
                    </div>
                  </TabsContent>

                  {/* وسائل التواصل الاجتماعي */}
                  <TabsContent value="social" className="space-y-4">
                    <h4 className="font-semibold text-inception-purple">Open Graph (Facebook)</h4>
                    
                    <div>
                      <Label>عنوان Facebook</Label>
                      <Input
                        value={ogTitle}
                        onChange={(e) => setOgTitle(e.target.value)}
                        placeholder="عنوان المقال على Facebook"
                      />
                    </div>

                    <div>
                      <Label>وصف Facebook</Label>
                      <Textarea
                        value={ogDescription}
                        onChange={(e) => setOgDescription(e.target.value)}
                        placeholder="وصف المقال على Facebook"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>صورة Facebook</Label>
                      <Input
                        value={ogImage}
                        onChange={(e) => setOgImage(e.target.value)}
                        placeholder="رابط صورة Facebook (1200x630)"
                      />
                    </div>

                    <Separator />

                    <h4 className="font-semibold text-inception-purple">Twitter Cards</h4>
                    
                    <div>
                      <Label>عنوان Twitter</Label>
                      <Input
                        value={twitterTitle}
                        onChange={(e) => setTwitterTitle(e.target.value)}
                        placeholder="عنوان المقال على Twitter"
                      />
                    </div>

                    <div>
                      <Label>وصف Twitter</Label>
                      <Textarea
                        value={twitterDescription}
                        onChange={(e) => setTwitterDescription(e.target.value)}
                        placeholder="وصف المقال على Twitter"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>صورة Twitter</Label>
                      <Input
                        value={twitterImage}
                        onChange={(e) => setTwitterImage(e.target.value)}
                        placeholder="رابط صورة Twitter (1024x512)"
                      />
                    </div>
                  </TabsContent>

                  {/* SEO التقني */}
                  <TabsContent value="technical" className="space-y-4">
                    <div>
                      <Label>نوع Schema.org</Label>
                      <Select value={schemaType} onValueChange={setSchemaType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Article">مقال (Article)</SelectItem>
                          <SelectItem value="BlogPosting">مشاركة مدونة (BlogPosting)</SelectItem>
                          <SelectItem value="NewsArticle">مقال إخباري (NewsArticle)</SelectItem>
                          <SelectItem value="TechArticle">مقال تقني (TechArticle)</SelectItem>
                          <SelectItem value="HowTo">دليل إرشادي (HowTo)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>H1 Tag</Label>
                      <Input
                        value={h1Tag}
                        onChange={(e) => setH1Tag(e.target.value)}
                        placeholder="عنوان H1 الرئيسي"
                      />
                    </div>

                    <div>
                      <Label>عناوين H2</Label>
                      <div className="flex space-x-2 space-x-reverse">
                        <Input
                          value={currentH2}
                          onChange={(e) => setCurrentH2(e.target.value)}
                          placeholder="أضف عنوان H2"
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addH2Tag())}
                        />
                        <Button onClick={addH2Tag} size="sm">إضافة</Button>
                      </div>
                      {h2Tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {h2Tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="cursor-pointer"
                              onClick={() => setH2Tags(h2Tags.filter((_, i) => i !== index))}>
                              {tag} ×
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label>عناوين H3</Label>
                      <div className="flex space-x-2 space-x-reverse">
                        <Input
                          value={currentH3}
                          onChange={(e) => setCurrentH3(e.target.value)}
                          placeholder="أضف عنوان H3"
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addH3Tag())}
                        />
                        <Button onClick={addH3Tag} size="sm">إضافة</Button>
                      </div>
                      {h3Tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {h3Tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="cursor-pointer"
                              onClick={() => setH3Tags(h3Tags.filter((_, i) => i !== index))}>
                              {tag} ×
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div>
                      <Label>Alt Texts للصور</Label>
                      <div className="space-y-2">
                        <div className="flex space-x-2 space-x-reverse">
                          <Input
                            value={currentAltText.image}
                            onChange={(e) => setCurrentAltText({...currentAltText, image: e.target.value})}
                            placeholder="اسم الصورة"
                            className="flex-1"
                          />
                          <Input
                            value={currentAltText.alt}
                            onChange={(e) => setCurrentAltText({...currentAltText, alt: e.target.value})}
                            placeholder="النص البديل"
                            className="flex-1"
                          />
                          <Button onClick={addAltText} size="sm">إضافة</Button>
                        </div>
                        {altTexts.length > 0 && (
                          <div className="space-y-1">
                            {altTexts.map((item, index) => (
                              <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                <span className="text-sm">{item.image}: {item.alt}</span>
                                <Button size="sm" variant="ghost" 
                                  onClick={() => setAltTexts(altTexts.filter((_, i) => i !== index))}>×</Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  {/* إدارة المحتوى */}
                  <TabsContent value="content" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-inception-purple">{wordCount}</div>
                          <div className="text-sm text-gray-600">عدد الكلمات</div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-inception-orange">{readingTime}</div>
                          <div className="text-sm text-gray-600">دقائق القراءة</div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <Label>الروابط الداخلية</Label>
                      <div className="space-y-2">
                        <div className="flex space-x-2 space-x-reverse">
                          <Input
                            value={currentInternalLink.url}
                            onChange={(e) => setCurrentInternalLink({...currentInternalLink, url: e.target.value})}
                            placeholder="الرابط الداخلي"
                            className="flex-1"
                          />
                          <Input
                            value={currentInternalLink.anchor}
                            onChange={(e) => setCurrentInternalLink({...currentInternalLink, anchor: e.target.value})}
                            placeholder="نص الرابط"
                            className="flex-1"
                          />
                          <Button onClick={addInternalLink} size="sm">إضافة</Button>
                        </div>
                        {internalLinks.length > 0 && (
                          <div className="space-y-1">
                            {internalLinks.map((link, index) => (
                              <div key={index} className="flex justify-between items-center bg-green-50 p-2 rounded">
                                <span className="text-sm">{link.anchor} → {link.url}</span>
                                <Button size="sm" variant="ghost" 
                                  onClick={() => setInternalLinks(internalLinks.filter((_, i) => i !== index))}>×</Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label>الروابط الخارجية</Label>
                      <div className="space-y-2">
                        <div className="flex space-x-2 space-x-reverse">
                          <Input
                            value={currentExternalLink.url}
                            onChange={(e) => setCurrentExternalLink({...currentExternalLink, url: e.target.value})}
                            placeholder="الرابط الخارجي"
                            className="flex-1"
                          />
                          <Input
                            value={currentExternalLink.anchor}
                            onChange={(e) => setCurrentExternalLink({...currentExternalLink, anchor: e.target.value})}
                            placeholder="نص الرابط"
                            className="flex-1"
                          />
                          <Button onClick={addExternalLink} size="sm">إضافة</Button>
                        </div>
                        {externalLinks.length > 0 && (
                          <div className="space-y-1">
                            {externalLinks.map((link, index) => (
                              <div key={index} className="flex justify-between items-center bg-blue-50 p-2 rounded">
                                <span className="text-sm">{link.anchor} → {link.url}</span>
                                <Button size="sm" variant="ghost" 
                                  onClick={() => setExternalLinks(externalLinks.filter((_, i) => i !== index))}>×</Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  {/* التحليل والنصائح */}
                  <TabsContent value="analysis" className="space-y-4">
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>تحليل SEO:</strong>
                        <div className="mt-2 space-y-1 text-sm">
                          <div className={title.length >= 30 && title.length <= 60 ? 'text-green-600' : 'text-red-600'}>
                            • العنوان: {title.length} حرف {title.length >= 30 && title.length <= 60 ? '✓' : '✗'}
                          </div>
                          <div className={metaDescription.length >= 120 && metaDescription.length <= 160 ? 'text-green-600' : 'text-red-600'}>
                            • الوصف: {metaDescription.length} حرف {metaDescription.length >= 120 && metaDescription.length <= 160 ? '✓' : '✗'}
                          </div>
                          <div className={focusKeyword && title.toLowerCase().includes(focusKeyword.toLowerCase()) ? 'text-green-600' : 'text-red-600'}>
                            • الكلمة المفتاحية في العنوان: {focusKeyword && title.toLowerCase().includes(focusKeyword.toLowerCase()) ? '✓' : '✗'}
                          </div>
                          <div className={wordCount >= 300 ? 'text-green-600' : 'text-red-600'}>
                            • عدد الكلمات: {wordCount} {wordCount >= 300 ? '✓' : '✗'}
                          </div>
                          <div className={h2Tags.length >= 2 ? 'text-green-600' : 'text-red-600'}>
                            • عناوين H2: {h2Tags.length} {h2Tags.length >= 2 ? '✓' : '✗'}
                          </div>
                          <div className={altTexts.length > 0 ? 'text-green-600' : 'text-red-600'}>
                            • Alt texts: {altTexts.length} {altTexts.length > 0 ? '✓' : '✗'}
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>

                    <Alert>
                      <Lightbulb className="h-4 w-4" />
                      <AlertDescription>
                        <strong>نصائح لتحسين SEO:</strong>
                        <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                          <li>استخدم الكلمة المفتاحية في أول 100 كلمة</li>
                          <li>أضف روابط داخلية لمقالات ذات صلة</li>
                          <li>استخدم عناوين H2 و H3 لتنظيم المحتوى</li>
                          <li>أضف نص بديل وصفي لجميع الصور</li>
                          <li>اكتب محتوى أكثر من 300 كلمة</li>
                          <li>استخدم الكلمات المرادفة والمتعلقة</li>
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

      {/* MediaManager Dialog */}
      {showMediaManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">مكتبة الصور</h3>
              <Button 
                variant="ghost" 
                onClick={() => setShowMediaManager(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>
            <MediaManager />
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedArticleEditor;