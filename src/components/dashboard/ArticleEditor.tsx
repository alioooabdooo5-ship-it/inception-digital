import React, { useState, useEffect } from "react";
import {
  Edit,
  Save,
  Eye,
  Trash2,
  Upload,
  Link,
  Image,
  Bold,
  Italic,
  Underline,
  List,
  Quote,
  Code,
  Undo,
  Redo,
  Search,
  Target,
  BarChart3,
  CheckCircle,
  AlertCircle,
  XCircle,
  Settings,
  Tag,
  Calendar,
  Clock,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Users,
  TrendingUp,
  FileDown,
  Download,
  Lightbulb,
  Zap,
  FileText,
  Monitor,
  Smartphone,
  Tablet,
  Star,
  Award,
  Shield,
  Bot,
  Layers,
  BookOpen,
  MessageSquare,
  Share2,
  Camera,
  Video,
  Mic,
  Archive,
  Filter,
  SortAsc,
  SortDesc,
  Plus,
  Minus,
  RefreshCw,
  Languages,
  ExternalLink
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { useToast } from "@/hooks/use-toast";

const ArticleEditor = () => {
  const { toast } = useToast();
  
  // Article content states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [category, setCategory] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [publishDate, setPublishDate] = useState("");
  const [publishTime, setPublishTime] = useState("");
  
  // Social Media states
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [twitterTitle, setTwitterTitle] = useState("");
  const [twitterDescription, setTwitterDescription] = useState("");
  const [twitterImage, setTwitterImage] = useState("");
  const [linkedinTitle, setLinkedinTitle] = useState("");
  const [linkedinDescription, setLinkedinDescription] = useState("");
  
  // SEO states
  const [seoScore, setSeoScore] = useState(75);
  const [robotsMeta, setRobotsMeta] = useState("index,follow");
  const [schemaType, setSchemaType] = useState("Article");
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const [currentBreadcrumb, setCurrentBreadcrumb] = useState("");
  
  // Advanced SEO states
  const [competitorUrls, setCompetitorUrls] = useState<string[]>([]);
  const [currentCompetitorUrl, setCurrentCompetitorUrl] = useState("");
  const [featuredSnippetType, setFeaturedSnippetType] = useState("paragraph");
  const [faqItems, setFaqItems] = useState<{question: string, answer: string}[]>([]);
  const [currentFaq, setCurrentFaq] = useState({question: "", answer: ""});
  const [internalLinks, setInternalLinks] = useState<string[]>([]);
  const [currentInternalLink, setCurrentInternalLink] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("ar");
  const [hreflangTags, setHreflangTags] = useState<{lang: string, url: string}[]>([]);
  const [currentHreflang, setCurrentHreflang] = useState({lang: "", url: ""});
  
  // Media states
  const [mediaFiles, setMediaFiles] = useState<{url: string, alt: string, type: string}[]>([]);
  const [currentMedia, setCurrentMedia] = useState({url: "", alt: "", type: "image"});

  // Helper functions
  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addBreadcrumb = () => {
    if (currentBreadcrumb.trim() && !breadcrumbs.includes(currentBreadcrumb.trim())) {
      setBreadcrumbs([...breadcrumbs, currentBreadcrumb.trim()]);
      setCurrentBreadcrumb("");
    }
  };

  const removeBreadcrumb = (breadcrumbToRemove: string) => {
    setBreadcrumbs(breadcrumbs.filter(breadcrumb => breadcrumb !== breadcrumbToRemove));
  };

  const addCompetitorUrl = () => {
    if (currentCompetitorUrl.trim() && !competitorUrls.includes(currentCompetitorUrl.trim())) {
      setCompetitorUrls([...competitorUrls, currentCompetitorUrl.trim()]);
      setCurrentCompetitorUrl("");
    }
  };

  const removeCompetitorUrl = (urlToRemove: string) => {
    setCompetitorUrls(competitorUrls.filter(url => url !== urlToRemove));
  };

  const addFaqItem = () => {
    if (currentFaq.question.trim() && currentFaq.answer.trim()) {
      setFaqItems([...faqItems, currentFaq]);
      setCurrentFaq({question: "", answer: ""});
    }
  };

  const removeFaqItem = (index: number) => {
    setFaqItems(faqItems.filter((_, i) => i !== index));
  };

  const addInternalLink = () => {
    if (currentInternalLink.trim() && !internalLinks.includes(currentInternalLink.trim())) {
      setInternalLinks([...internalLinks, currentInternalLink.trim()]);
      setCurrentInternalLink("");
    }
  };

  const removeInternalLink = (linkToRemove: string) => {
    setInternalLinks(internalLinks.filter(link => link !== linkToRemove));
  };

  const addHreflangTag = () => {
    if (currentHreflang.lang.trim() && currentHreflang.url.trim()) {
      setHreflangTags([...hreflangTags, currentHreflang]);
      setCurrentHreflang({lang: "", url: ""});
    }
  };

  const removeHreflangTag = (index: number) => {
    setHreflangTags(hreflangTags.filter((_, i) => i !== index));
  };

  const addMediaFile = () => {
    if (currentMedia.url.trim() && currentMedia.alt.trim()) {
      setMediaFiles([...mediaFiles, currentMedia]);
      setCurrentMedia({url: "", alt: "", type: "image"});
    }
  };

  const removeMediaFile = (index: number) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  const analyzeCompetitors = () => {
    toast({
      title: "تحليل المنافسين",
      description: "جاري تحليل المحتوى والكلمات المفتاحية للمنافسين...",
    });
  };

  const optimizeForFeaturedSnippet = () => {
    toast({
      title: "تحسين Featured Snippet",
      description: "تم تحسين المحتوى للظهور في النتائج المميزة",
    });
  };

  const generateInternalLinks = () => {
    toast({
      title: "اقتراحات الربط الداخلي",
      description: "تم إنشاء اقتراحات للربط الداخلي بناءً على المحتوى",
    });
  };

  const translateContent = () => {
    toast({
      title: "ترجمة المحتوى",
      description: `جاري ترجمة المحتوى إلى ${selectedLanguage === 'en' ? 'الإنجليزية' : 'العربية'}`,
    });
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": schemaType,
      "headline": title,
      "description": metaDescription,
      "author": {
        "@type": "Person",
        "name": "الكاتب"
      },
      "publisher": {
        "@type": "Organization",
        "name": "موقعنا"
      },
      "mainEntityOfPage": canonicalUrl,
      "image": featuredImage,
      "datePublished": publishDate,
      "dateModified": new Date().toISOString().split('T')[0]
    };

    if (faqItems.length > 0) {
      schema["@type"] = "FAQPage";
      schema["mainEntity"] = faqItems.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }));
    }

    return JSON.stringify(schema, null, 2);
  };

  const saveArticle = () => {
    toast({
      title: "تم حفظ المقال",
      description: "تم حفظ المقال بنجاح في المسودات",
    });
  };

  const publishArticle = () => {
    toast({
      title: "تم نشر المقال",
      description: "تم نشر المقال بنجاح على الموقع",
    });
  };

  const previewArticle = () => {
    toast({
      title: "معاينة المقال",
      description: "فتح معاينة المقال في علامة تبويب جديدة",
    });
  };

  const schedulePublish = () => {
    toast({
      title: "تم جدولة النشر",
      description: `سيتم نشر المقال في ${publishDate} الساعة ${publishTime}`,
    });
  };

  // Calculate SEO score based on content
  useEffect(() => {
    let score = 0;
    
    if (title.length > 0) score += 10;
    if (title.length >= 30 && title.length <= 60) score += 10;
    if (metaDescription.length >= 120 && metaDescription.length <= 160) score += 15;
    if (focusKeyword.length > 0) score += 10;
    if (content.length > 300) score += 15;
    if (content.toLowerCase().includes(focusKeyword.toLowerCase())) score += 10;
    if (featuredImage.length > 0) score += 10;
    if (tags.length > 0) score += 5;
    if (canonicalUrl.length > 0) score += 5;
    if (internalLinks.length > 0) score += 10;
    
    setSeoScore(score);
  }, [title, metaDescription, focusKeyword, content, featuredImage, tags, canonicalUrl, internalLinks]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">محرر المقالات المتقدم</h1>
          <p className="text-muted-foreground">إنشاء وتحرير المقالات مع تحسين SEO متقدم</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={previewArticle}>
            <Eye className="w-4 h-4 ml-2" />
            معاينة
          </Button>
          <Button variant="outline" onClick={saveArticle}>
            <Save className="w-4 h-4 ml-2" />
            حفظ
          </Button>
          <Button onClick={publishArticle}>
            <Upload className="w-4 h-4 ml-2" />
            نشر المقال
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="content">المحتوى</TabsTrigger>
              <TabsTrigger value="seo">SEO أساسي</TabsTrigger>
              <TabsTrigger value="advanced-seo">SEO متقدم</TabsTrigger>
              <TabsTrigger value="technical">تقني</TabsTrigger>
              <TabsTrigger value="social">وسائل التواصل</TabsTrigger>
              <TabsTrigger value="media">الوسائط</TabsTrigger>
              <TabsTrigger value="schedule">الجدولة</TabsTrigger>
            </TabsList>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>محتوى المقال</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Code className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Italic className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">عنوان المقال</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="اكتب عنوان المقال هنا..."
                      className="text-xl font-semibold text-right"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {title.length}/60 حرف
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="excerpt">المقطع التعريفي</Label>
                    <Textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="اكتب مقطع تعريفي قصير عن المقال..."
                      className="min-h-20 text-right"
                    />
                  </div>

                  <div>
                    <Label>محتوى المقال</Label>
                    <RichTextEditor
                      content={content}
                      onChange={setContent}
                      placeholder="اكتب محتوى المقال هنا..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Basic SEO Tab */}
            <TabsContent value="seo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="w-5 h-5 ml-2" />
                    SEO الأساسي
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="meta-title">Meta Title</Label>
                    <Input
                      id="meta-title"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="عنوان الصفحة في محرك البحث"
                      className="text-right"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {metaTitle.length}/60 حرف
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Textarea
                      id="meta-description"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="وصف الصفحة في محرك البحث"
                      className="text-right"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {metaDescription.length}/160 حرف
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="focus-keyword">الكلمة المفتاحية الرئيسية</Label>
                    <Input
                      id="focus-keyword"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="الكلمة المفتاحية الأساسية"
                      className="text-right"
                    />
                  </div>

                  <div>
                    <Label htmlFor="canonical-url">Canonical URL</Label>
                    <Input
                      id="canonical-url"
                      value={canonicalUrl}
                      onChange={(e) => setCanonicalUrl(e.target.value)}
                      placeholder="https://example.com/article"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Facebook className="w-5 h-5 ml-2" />
                    Open Graph (Facebook)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="og-title">OG Title</Label>
                    <Input
                      id="og-title"
                      value={ogTitle}
                      onChange={(e) => setOgTitle(e.target.value)}
                      placeholder="عنوان المشاركة على Facebook"
                      className="text-right"
                    />
                  </div>

                  <div>
                    <Label htmlFor="og-description">OG Description</Label>
                    <Textarea
                      id="og-description"
                      value={ogDescription}
                      onChange={(e) => setOgDescription(e.target.value)}
                      placeholder="وصف المشاركة على Facebook"
                      className="text-right"
                    />
                  </div>

                  <div>
                    <Label htmlFor="og-image">OG Image</Label>
                    <Input
                      id="og-image"
                      value={ogImage}
                      onChange={(e) => setOgImage(e.target.value)}
                      placeholder="رابط صورة المشاركة على Facebook"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advanced SEO Tab */}
            <TabsContent value="advanced-seo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 ml-2" />
                    Featured Snippets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="snippet-type">نوع Featured Snippet</Label>
                    <Select value={featuredSnippetType} onValueChange={setFeaturedSnippetType}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع Featured Snippet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paragraph">فقرة</SelectItem>
                        <SelectItem value="list">قائمة</SelectItem>
                        <SelectItem value="table">جدول</SelectItem>
                        <SelectItem value="steps">خطوات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={optimizeForFeaturedSnippet} className="w-full">
                    <Zap className="w-4 h-4 ml-2" />
                    تحسين للظهور في النتائج المميزة
                  </Button>

                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription>
                      قم بتنسيق المحتوى كفقرة واضحة (40-50 كلمة) للحصول على أفضل فرصة للظهور في Featured Snippets
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 ml-2" />
                    تحليل المنافسين
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={currentCompetitorUrl}
                      onChange={(e) => setCurrentCompetitorUrl(e.target.value)}
                      placeholder="رابط موقع المنافس"
                    />
                    <Button onClick={addCompetitorUrl} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {competitorUrls.map((url, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{url}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeCompetitorUrl(url)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Button onClick={analyzeCompetitors} className="w-full">
                    <TrendingUp className="w-4 h-4 ml-2" />
                    تحليل المنافسين
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Link className="w-5 h-5 ml-2" />
                    Content Clusters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={currentInternalLink}
                      onChange={(e) => setCurrentInternalLink(e.target.value)}
                      placeholder="رابط داخلي مقترح"
                      className="text-right"
                    />
                    <Button onClick={addInternalLink} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {internalLinks.map((link, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-right">{link}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeInternalLink(link)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Button onClick={generateInternalLinks} className="w-full">
                    <Layers className="w-4 h-4 ml-2" />
                    إنشاء اقتراحات الربط التلقائي
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Languages className="w-5 h-5 ml-2" />
                    Multi-language SEO
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="language-select">اللغة الحالية</Label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر اللغة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Hreflang Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        value={currentHreflang.lang}
                        onChange={(e) => setCurrentHreflang({...currentHreflang, lang: e.target.value})}
                        placeholder="ar"
                        className="w-20"
                      />
                      <Input
                        value={currentHreflang.url}
                        onChange={(e) => setCurrentHreflang({...currentHreflang, url: e.target.value})}
                        placeholder="https://example.com/ar/"
                        className="flex-1"
                      />
                      <Button onClick={addHreflangTag} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {hreflangTags.map((tag, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{tag.lang}: {tag.url}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeHreflangTag(index)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Button onClick={translateContent} className="w-full">
                    <Globe className="w-4 h-4 ml-2" />
                    ترجمة المحتوى
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 ml-2" />
                    FAQ Schema Generator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      value={currentFaq.question}
                      onChange={(e) => setCurrentFaq({...currentFaq, question: e.target.value})}
                      placeholder="السؤال"
                      className="text-right"
                    />
                    <Textarea
                      value={currentFaq.answer}
                      onChange={(e) => setCurrentFaq({...currentFaq, answer: e.target.value})}
                      placeholder="الإجابة"
                      className="text-right"
                    />
                    <Button onClick={addFaqItem} size="sm" className="w-full">
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة سؤال وجواب
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {faqItems.map((faq, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-right">{faq.question}</p>
                            <p className="text-sm text-gray-600 mt-1 text-right">{faq.answer}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeFaqItem(index)}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {faqItems.length > 0 && (
                    <Alert>
                      <FileText className="h-4 w-4" />
                      <AlertDescription>
                        سيتم إنشاء FAQ Schema تلقائياً عند النشر
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Technical SEO Tab */}
            <TabsContent value="technical" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="w-5 h-5 ml-2" />
                    إعدادات الفهرسة والروبوتات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="robots-meta">Robots Meta Tag</Label>
                    <Select value={robotsMeta} onValueChange={setRobotsMeta}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر إعدادات الروبوتات" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="index,follow">Index, Follow</SelectItem>
                        <SelectItem value="noindex,follow">No Index, Follow</SelectItem>
                        <SelectItem value="index,nofollow">Index, No Follow</SelectItem>
                        <SelectItem value="noindex,nofollow">No Index, No Follow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="schema-type">نوع Schema</Label>
                    <Select value={schemaType} onValueChange={setSchemaType}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع Schema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Article">Article</SelectItem>
                        <SelectItem value="BlogPosting">Blog Posting</SelectItem>
                        <SelectItem value="NewsArticle">News Article</SelectItem>
                        <SelectItem value="TechArticle">Tech Article</SelectItem>
                        <SelectItem value="FAQPage">FAQ Page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Breadcrumbs</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={currentBreadcrumb}
                        onChange={(e) => setCurrentBreadcrumb(e.target.value)}
                        placeholder="مسار التنقل"
                        className="text-right"
                      />
                      <Button onClick={addBreadcrumb} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {breadcrumbs.map((breadcrumb, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {breadcrumb}
                          <button onClick={() => removeBreadcrumb(breadcrumb)}>
                            <XCircle className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="w-5 h-5 ml-2" />
                    Structured Data Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm overflow-auto">
                      {generateSchema()}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Social Media Tab */}
            <TabsContent value="social" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Twitter className="w-5 h-5 ml-2" />
                    Twitter Cards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="twitter-title">Twitter Title</Label>
                    <Input
                      id="twitter-title"
                      value={twitterTitle}
                      onChange={(e) => setTwitterTitle(e.target.value)}
                      placeholder="عنوان المشاركة على Twitter"
                      className="text-right"
                    />
                  </div>

                  <div>
                    <Label htmlFor="twitter-description">Twitter Description</Label>
                    <Textarea
                      id="twitter-description"
                      value={twitterDescription}
                      onChange={(e) => setTwitterDescription(e.target.value)}
                      placeholder="وصف المشاركة على Twitter"
                      className="text-right"
                    />
                  </div>

                  <div>
                    <Label htmlFor="twitter-image">Twitter Image</Label>
                    <Input
                      id="twitter-image"
                      value={twitterImage}
                      onChange={(e) => setTwitterImage(e.target.value)}
                      placeholder="رابط صورة المشاركة على Twitter"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Linkedin className="w-5 h-5 ml-2" />
                    LinkedIn
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="linkedin-title">LinkedIn Title</Label>
                    <Input
                      id="linkedin-title"
                      value={linkedinTitle}
                      onChange={(e) => setLinkedinTitle(e.target.value)}
                      placeholder="عنوان المشاركة على LinkedIn"
                      className="text-right"
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedin-description">LinkedIn Description</Label>
                    <Textarea
                      id="linkedin-description"
                      value={linkedinDescription}
                      onChange={(e) => setLinkedinDescription(e.target.value)}
                      placeholder="وصف المشاركة على LinkedIn"
                      className="text-right"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Monitor className="w-5 h-5 ml-2" />
                    معاينة الشبكات الاجتماعية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-blue-600 mb-2">Facebook/Open Graph</h4>
                      <div className="bg-gray-100 p-3 rounded">
                        <p className="font-medium text-right">{ogTitle || title}</p>
                        <p className="text-sm text-gray-600 text-right">{ogDescription || metaDescription}</p>
                        {ogImage && (
                          <div className="mt-2 w-full h-32 bg-gray-200 rounded flex items-center justify-center">
                            <Image className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-blue-400 mb-2">Twitter</h4>
                      <div className="bg-gray-100 p-3 rounded">
                        <p className="font-medium text-right">{twitterTitle || title}</p>
                        <p className="text-sm text-gray-600 text-right">{twitterDescription || metaDescription}</p>
                        {twitterImage && (
                          <div className="mt-2 w-full h-32 bg-gray-200 rounded flex items-center justify-center">
                            <Image className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="w-5 h-5 ml-2" />
                    إدارة الوسائط
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Select value={currentMedia.type} onValueChange={(value) => setCurrentMedia({...currentMedia, type: value})}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="النوع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image">صورة</SelectItem>
                          <SelectItem value="video">فيديو</SelectItem>
                          <SelectItem value="audio">صوت</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={currentMedia.url}
                        onChange={(e) => setCurrentMedia({...currentMedia, url: e.target.value})}
                        placeholder="رابط الملف"
                        className="flex-1"
                      />
                    </div>
                    <Input
                      value={currentMedia.alt}
                      onChange={(e) => setCurrentMedia({...currentMedia, alt: e.target.value})}
                      placeholder="النص البديل (Alt Text)"
                      className="text-right"
                    />
                    <Button onClick={addMediaFile} size="sm" className="w-full">
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة ملف وسائط
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {mediaFiles.map((media, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                            {media.type === 'image' && <Camera className="w-5 h-5" />}
                            {media.type === 'video' && <Video className="w-5 h-5" />}
                            {media.type === 'audio' && <Mic className="w-5 h-5" />}
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{media.alt}</p>
                            <p className="text-xs text-gray-500">{media.url}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeMediaFile(index)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 ml-2" />
                    تحسين الصور
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        تأكد من إضافة النص البديل (Alt Text) لجميع الصور لتحسين إمكانية الوصول وSEO
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <Monitor className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-medium">Desktop</p>
                        <p className="text-xs text-gray-500">1200x630px</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <Tablet className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-medium">Tablet</p>
                        <p className="text-xs text-gray-500">768x400px</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <Smartphone className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-medium">Mobile</p>
                        <p className="text-xs text-gray-500">400x300px</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 ml-2" />
                    جدولة النشر
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="publish-date">تاريخ النشر</Label>
                      <Input
                        id="publish-date"
                        type="date"
                        value={publishDate}
                        onChange={(e) => setPublishDate(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="publish-time">وقت النشر</Label>
                      <Input
                        id="publish-time"
                        type="time"
                        value={publishTime}
                        onChange={(e) => setPublishTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="auto-publish"
                      checked={isPublished}
                      onCheckedChange={setIsPublished}
                    />
                    <Label htmlFor="auto-publish">نشر تلقائي</Label>
                  </div>

                  <Button onClick={schedulePublish} className="w-full">
                    <Clock className="w-4 h-4 ml-2" />
                    جدولة النشر
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Article Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 ml-2" />
                إعدادات المقال
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">التصنيف</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">التكنولوجيا</SelectItem>
                    <SelectItem value="business">الأعمال</SelectItem>
                    <SelectItem value="marketing">التسويق</SelectItem>
                    <SelectItem value="design">التصميم</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="featured-image">الصورة البارزة</Label>
                <Input
                  id="featured-image"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="رابط الصورة البارزة"
                />
              </div>

              <div>
                <Label>العلامات</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="أضف علامة"
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="text-right"
                  />
                  <Button onClick={addTag} size="sm">
                    <Tag className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)}>
                        <XCircle className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Score Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 ml-2" />
                تقييم SEO
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="relative w-24 h-24 mx-auto">
                  <Progress value={seoScore} className="w-full h-2" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-inception-purple">
                      {seoScore}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {seoScore >= 80 && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 ml-1" />
                      ممتاز
                    </div>
                  )}
                  {seoScore >= 60 && seoScore < 80 && (
                    <div className="flex items-center text-yellow-600">
                      <AlertCircle className="w-4 h-4 ml-1" />
                      جيد
                    </div>
                  )}
                  {seoScore < 60 && (
                    <div className="flex items-center text-red-600">
                      <XCircle className="w-4 h-4 ml-1" />
                      يحتاج تحسين
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 ml-2" />
                خيارات التصدير
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileDown className="w-4 h-4 ml-2" />
                تصدير كـ XML
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileDown className="w-4 h-4 ml-2" />
                تصدير كـ JSON
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileDown className="w-4 h-4 ml-2" />
                تصدير كـ Markdown
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;