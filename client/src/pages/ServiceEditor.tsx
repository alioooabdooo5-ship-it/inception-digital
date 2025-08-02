import React, { useState, useEffect } from "react";
import {
  Save,
  Eye,
  ArrowLeft,
  Upload,
  Image,
  Link,
  Search,
  Globe,
  Share2,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Tag,
  Calendar,
  Clock,
  Users,
  TrendingUp,
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
  Camera,
  Video,
  Mic,
  Archive,
  Filter,
  Plus,
  Minus,
  RefreshCw,
  Languages,
  ExternalLink,
  Sparkles
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

interface ServiceEditorProps {
  serviceId?: string | null;
  onBack?: () => void;
}

const ServiceEditor: React.FC<ServiceEditorProps> = ({ serviceId, onBack }) => {
  const { toast } = useToast();
  
  // Service content states
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [illustration, setIllustration] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("published");
  const [featured, setFeatured] = useState(false);
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  
  // SEO states
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [seoScore, setSeoScore] = useState(75);
  const [robotsMeta, setRobotsMeta] = useState("index,follow");
  const [schemaType, setSchemaType] = useState("Service");
  
  // Social Media states
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [twitterTitle, setTwitterTitle] = useState("");
  const [twitterDescription, setTwitterDescription] = useState("");
  const [twitterImage, setTwitterImage] = useState("");
  
  // Service Features & Portfolio
  const [features, setFeatures] = useState<string[]>([]);
  const [currentFeature, setCurrentFeature] = useState("");
  const [benefits, setBenefits] = useState<string[]>([]);
  const [currentBenefit, setCurrentBenefit] = useState("");
  const [portfolioItems, setPortfolioItems] = useState<{title: string, description: string, image: string, results: string}[]>([]);
  const [currentPortfolio, setCurrentPortfolio] = useState({title: "", description: "", image: "", results: ""});
  
  // Process Steps
  const [processSteps, setProcessSteps] = useState<{step: string, title: string, description: string}[]>([]);
  const [currentStep, setCurrentStep] = useState({step: "", title: "", description: ""});
  
  // FAQ Items
  const [faqItems, setFaqItems] = useState<{question: string, answer: string}[]>([]);
  const [currentFaq, setCurrentFaq] = useState({question: "", answer: ""});
  
  // Testimonials
  const [testimonials, setTestimonials] = useState<{name: string, company: string, text: string, rating: number, image: string}[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState({name: "", company: "", text: "", rating: 5, image: ""});
  
  // Statistics
  const [stats, setStats] = useState<{label: string, value: string, icon: string}[]>([]);
  const [currentStat, setStat] = useState({label: "", value: "", icon: ""});

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

  const addFeature = () => {
    if (currentFeature.trim() && !features.includes(currentFeature.trim())) {
      setFeatures([...features, currentFeature.trim()]);
      setCurrentFeature("");
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFeatures(features.filter(feature => feature !== featureToRemove));
  };

  const addBenefit = () => {
    if (currentBenefit.trim() && !benefits.includes(currentBenefit.trim())) {
      setBenefits([...benefits, currentBenefit.trim()]);
      setCurrentBenefit("");
    }
  };

  const removeBenefit = (benefitToRemove: string) => {
    setBenefits(benefits.filter(benefit => benefit !== benefitToRemove));
  };

  const addPortfolioItem = () => {
    if (currentPortfolio.title.trim() && currentPortfolio.description.trim()) {
      setPortfolioItems([...portfolioItems, currentPortfolio]);
      setCurrentPortfolio({title: "", description: "", image: "", results: ""});
    }
  };

  const removePortfolioItem = (index: number) => {
    setPortfolioItems(portfolioItems.filter((_, i) => i !== index));
  };

  const addProcessStep = () => {
    if (currentStep.step.trim() && currentStep.title.trim() && currentStep.description.trim()) {
      setProcessSteps([...processSteps, currentStep]);
      setCurrentStep({step: "", title: "", description: ""});
    }
  };

  const removeProcessStep = (index: number) => {
    setProcessSteps(processSteps.filter((_, i) => i !== index));
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

  const addTestimonial = () => {
    if (currentTestimonial.name.trim() && currentTestimonial.text.trim()) {
      setTestimonials([...testimonials, currentTestimonial]);
      setCurrentTestimonial({name: "", company: "", text: "", rating: 5, image: ""});
    }
  };

  const removeTestimonial = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  const addStat = () => {
    if (currentStat.label.trim() && currentStat.value.trim()) {
      setStats([...stats, currentStat]);
      setStat({label: "", value: "", icon: ""});
    }
  };

  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": schemaType,
      "name": title,
      "description": metaDescription,
      "provider": {
        "@type": "Organization",
        "name": "شركتنا"
      },
      "url": canonicalUrl,
      "image": ogImage || heroImage,
      "offers": {
        "@type": "Offer",
        "price": price,
        "priceCurrency": "EGP"
      }
    };

    if (faqItems.length > 0) {
      schema["hasOfferCatalog"] = {
        "@type": "OfferCatalog", 
        "name": "الأسئلة الشائعة",
        "itemListElement": faqItems.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };
    }

    return JSON.stringify(schema, null, 2);
  };

  const saveService = () => {
    toast({
      title: "تم حفظ الخدمة",
      description: "تم حفظ الخدمة بنجاح",
    });
  };

  const publishService = () => {
    toast({
      title: "تم نشر الخدمة",
      description: "تم نشر الخدمة بنجاح على الموقع",
    });
  };

  const previewService = () => {
    toast({
      title: "معاينة الخدمة",
      description: "فتح معاينة الخدمة في علامة تبويب جديدة",
    });
  };

  // Calculate SEO score
  useEffect(() => {
    let score = 0;
    
    if (title.length > 0) score += 10;
    if (title.length >= 30 && title.length <= 60) score += 10;
    if (metaDescription.length >= 120 && metaDescription.length <= 160) score += 15;
    if (focusKeyword.length > 0) score += 10;
    if (fullDescription.length > 300) score += 15;
    if (fullDescription.toLowerCase().includes(focusKeyword.toLowerCase())) score += 10;
    if (heroImage.length > 0) score += 10;
    if (tags.length > 0) score += 5;
    if (canonicalUrl.length > 0) score += 5;
    if (features.length > 0) score += 10;
    
    setSeoScore(score);
  }, [title, metaDescription, focusKeyword, fullDescription, heroImage, tags, canonicalUrl, features]);

  // Load service data if editing
  useEffect(() => {
    if (serviceId && serviceId !== 'new') {
      // Load existing service data
      // This would typically come from an API call
      setTitle("تحسين محركات البحث (SEO)");
      setShortDescription("اجعل موقعك الأول في جوجل");
      setFullDescription("خدمة تحسين محركات البحث الشاملة...");
      setIllustration("/lovable-uploads/3cc93b10-435d-4b20-a3d0-da06335cf1ca.png");
      setCategory("تسويق رقمي");
      setStatus("published");
      setPrice("5000");
      setDuration("30 يوم");
    }
  }, [serviceId]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex items-center space-x-4 space-x-reverse">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-inception-purple">
              {serviceId === 'new' ? 'إنشاء خدمة جديدة' : 'تعديل الخدمة'}
            </h1>
            <p className="text-gray-600">إدارة شاملة لمحتوى وSEO الخدمة</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={previewService}>
            <Eye className="w-4 h-4 ml-2" />
            معاينة
          </Button>
          <Button variant="outline" onClick={saveService}>
            <Save className="w-4 h-4 ml-2" />
            حفظ
          </Button>
          <Button onClick={publishService}>
            <Upload className="w-4 h-4 ml-2" />
            نشر الخدمة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-8">
                <TabsTrigger value="content">المحتوى</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="social">التواصل</TabsTrigger>
                <TabsTrigger value="features">المميزات</TabsTrigger>
                <TabsTrigger value="portfolio">أعمال</TabsTrigger>
                <TabsTrigger value="process">العملية</TabsTrigger>
                <TabsTrigger value="testimonials">آراء</TabsTrigger>
                <TabsTrigger value="settings">إعدادات</TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 ml-2" />
                      محتوى الخدمة الأساسي
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">اسم الخدمة</Label>
                        <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="اسم الخدمة"
                          className="text-right"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">الفئة</Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الفئة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="digital-marketing">تسويق رقمي</SelectItem>
                            <SelectItem value="web-development">تطوير مواقع</SelectItem>
                            <SelectItem value="media-production">إنتاج إعلامي</SelectItem>
                            <SelectItem value="consulting">استشارات</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="short-description">الوصف المختصر</Label>
                      <Textarea
                        id="short-description"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        placeholder="وصف مختصر للخدمة (يظهر في البطاقات)"
                        className="text-right"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>الوصف التفصيلي</Label>
                      <RichTextEditor
                        content={fullDescription}
                        onChange={setFullDescription}
                        placeholder="اكتب الوصف التفصيلي للخدمة..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="illustration">صورة البطاقة</Label>
                        <Input
                          id="illustration"
                          value={illustration}
                          onChange={(e) => setIllustration(e.target.value)}
                          placeholder="رابط صورة البطاقة"
                        />
                      </div>
                      <div>
                        <Label htmlFor="hero-image">الصورة الرئيسية</Label>
                        <Input
                          id="hero-image"
                          value={heroImage}
                          onChange={(e) => setHeroImage(e.target.value)}
                          placeholder="رابط الصورة الرئيسية"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">السعر (جنيه مصري)</Label>
                        <Input
                          id="price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="5000"
                          type="number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration">مدة التنفيذ</Label>
                        <Input
                          id="duration"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          placeholder="30 يوم"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* SEO Tab */}
              <TabsContent value="seo" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Search className="w-5 h-5 ml-2" />
                      تحسين محركات البحث
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
                        placeholder="https://example.com/service"
                      />
                    </div>

                    <div>
                      <Label>العلامات (Tags)</Label>
                      <div className="flex gap-2">
                        <Input
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          placeholder="أضف علامة"
                          className="text-right"
                          onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        />
                        <Button onClick={addTag} size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="text-red-500 hover:text-red-700">
                              <Minus className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Social Media Tab */}
              <TabsContent value="social" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Share2 className="w-5 h-5 ml-2" />
                      وسائل التواصل الاجتماعي
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-inception-purple">Open Graph (Facebook)</h4>
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
                          placeholder="رابط صورة المشاركة"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold text-inception-purple">Twitter Cards</h4>
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
                          placeholder="رابط صورة المشاركة"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Features Tab */}
              <TabsContent value="features" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="w-5 h-5 ml-2" />
                      مميزات ومنافع الخدمة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>المميزات (Features)</Label>
                      <div className="flex gap-2">
                        <Input
                          value={currentFeature}
                          onChange={(e) => setCurrentFeature(e.target.value)}
                          placeholder="أضف ميزة"
                          className="text-right"
                          onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                        />
                        <Button onClick={addFeature} size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2 mt-3">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-right flex-1">{feature}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFeature(feature)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label>الفوائد (Benefits)</Label>
                      <div className="flex gap-2">
                        <Input
                          value={currentBenefit}
                          onChange={(e) => setCurrentBenefit(e.target.value)}
                          placeholder="أضف فائدة"
                          className="text-right"
                          onKeyPress={(e) => e.key === 'Enter' && addBenefit()}
                        />
                        <Button onClick={addBenefit} size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2 mt-3">
                        {benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-right flex-1">{benefit}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBenefit(benefit)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label>الإحصائيات</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <Input
                          value={currentStat.label}
                          onChange={(e) => setStat({...currentStat, label: e.target.value})}
                          placeholder="عنوان الإحصائية"
                          className="text-right"
                        />
                        <Input
                          value={currentStat.value}
                          onChange={(e) => setStat({...currentStat, value: e.target.value})}
                          placeholder="القيمة (مثل: +250%)"
                          className="text-right"
                        />
                        <div className="flex gap-2">
                          <Input
                            value={currentStat.icon}
                            onChange={(e) => setStat({...currentStat, icon: e.target.value})}
                            placeholder="أيقونة"
                            className="text-right"
                          />
                          <Button onClick={addStat} size="sm">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2 mt-3">
                        {stats.map((stat, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="text-right flex-1">
                              <span className="font-semibold text-inception-purple">{stat.value}</span>
                              <span className="text-gray-600 mr-2">{stat.label}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeStat(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Portfolio Tab */}
              <TabsContent value="portfolio" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 ml-2" />
                      سابقة الأعمال
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        value={currentPortfolio.title}
                        onChange={(e) => setCurrentPortfolio({...currentPortfolio, title: e.target.value})}
                        placeholder="عنوان المشروع"
                        className="text-right"
                      />
                      <Input
                        value={currentPortfolio.image}
                        onChange={(e) => setCurrentPortfolio({...currentPortfolio, image: e.target.value})}
                        placeholder="رابط الصورة"
                      />
                    </div>
                    <Textarea
                      value={currentPortfolio.description}
                      onChange={(e) => setCurrentPortfolio({...currentPortfolio, description: e.target.value})}
                      placeholder="وصف المشروع"
                      className="text-right"
                    />
                    <div className="flex gap-2">
                      <Input
                        value={currentPortfolio.results}
                        onChange={(e) => setCurrentPortfolio({...currentPortfolio, results: e.target.value})}
                        placeholder="النتائج المحققة"
                        className="text-right flex-1"
                      />
                      <Button onClick={addPortfolioItem}>
                        <Plus className="w-4 h-4 ml-1" />
                        إضافة
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {portfolioItems.map((item, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-inception-purple">{item.title}</h4>
                              <p className="text-gray-600 text-sm">{item.description}</p>
                              <p className="text-green-600 text-sm font-medium">{item.results}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removePortfolioItem(index)}
                              className="text-red-500"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Process Tab */}
              <TabsContent value="process" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 ml-2" />
                      خطوات العمل
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        value={currentStep.step}
                        onChange={(e) => setCurrentStep({...currentStep, step: e.target.value})}
                        placeholder="رقم الخطوة (01)"
                        className="text-right"
                      />
                      <Input
                        value={currentStep.title}
                        onChange={(e) => setCurrentStep({...currentStep, title: e.target.value})}
                        placeholder="عنوان الخطوة"
                        className="text-right"
                      />
                      <Button onClick={addProcessStep}>
                        <Plus className="w-4 h-4 ml-1" />
                        إضافة
                      </Button>
                    </div>
                    <Textarea
                      value={currentStep.description}
                      onChange={(e) => setCurrentStep({...currentStep, description: e.target.value})}
                      placeholder="وصف الخطوة"
                      className="text-right"
                    />

                    <div className="space-y-4">
                      {processSteps.map((step, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <span className="bg-inception-purple text-white px-3 py-1 rounded-full text-sm font-bold">
                                  {step.step}
                                </span>
                                <h4 className="font-semibold text-inception-purple">{step.title}</h4>
                              </div>
                              <p className="text-gray-600 text-sm mt-2">{step.description}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProcessStep(index)}
                              className="text-red-500"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="w-5 h-5 ml-2" />
                      الأسئلة الشائعة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Input
                      value={currentFaq.question}
                      onChange={(e) => setCurrentFaq({...currentFaq, question: e.target.value})}
                      placeholder="السؤال"
                      className="text-right"
                    />
                    <div className="flex gap-2">
                      <Textarea
                        value={currentFaq.answer}
                        onChange={(e) => setCurrentFaq({...currentFaq, answer: e.target.value})}
                        placeholder="الإجابة"
                        className="text-right flex-1"
                      />
                      <Button onClick={addFaqItem}>
                        <Plus className="w-4 h-4 ml-1" />
                        إضافة
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {faqItems.map((faq, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-inception-purple">{faq.question}</h4>
                              <p className="text-gray-600 text-sm mt-1">{faq.answer}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFaqItem(index)}
                              className="text-red-500"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Testimonials Tab */}
              <TabsContent value="testimonials" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 ml-2" />
                      آراء العملاء
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        value={currentTestimonial.name}
                        onChange={(e) => setCurrentTestimonial({...currentTestimonial, name: e.target.value})}
                        placeholder="اسم العميل"
                        className="text-right"
                      />
                      <Input
                        value={currentTestimonial.company}
                        onChange={(e) => setCurrentTestimonial({...currentTestimonial, company: e.target.value})}
                        placeholder="الشركة"
                        className="text-right"
                      />
                    </div>
                    <Textarea
                      value={currentTestimonial.text}
                      onChange={(e) => setCurrentTestimonial({...currentTestimonial, text: e.target.value})}
                      placeholder="رأي العميل"
                      className="text-right"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        value={currentTestimonial.image}
                        onChange={(e) => setCurrentTestimonial({...currentTestimonial, image: e.target.value})}
                        placeholder="رابط صورة العميل"
                      />
                      <div className="flex gap-2">
                        <Select 
                          value={currentTestimonial.rating.toString()} 
                          onValueChange={(value) => setCurrentTestimonial({...currentTestimonial, rating: parseInt(value)})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="التقييم" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 نجوم</SelectItem>
                            <SelectItem value="4">4 نجوم</SelectItem>
                            <SelectItem value="3">3 نجوم</SelectItem>
                            <SelectItem value="2">نجمتان</SelectItem>
                            <SelectItem value="1">نجمة واحدة</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button onClick={addTestimonial}>
                          <Plus className="w-4 h-4 ml-1" />
                          إضافة
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {testimonials.map((testimonial, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <h4 className="font-semibold text-inception-purple">{testimonial.name}</h4>
                                <span className="text-gray-500 text-sm">- {testimonial.company}</span>
                              </div>
                              <div className="flex items-center space-x-1 space-x-reverse my-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                              <p className="text-gray-600 text-sm">{testimonial.text}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTestimonial(index)}
                              className="text-red-500"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 ml-2" />
                      إعدادات الخدمة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="status">حالة النشر</Label>
                        <Select value={status} onValueChange={setStatus}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="published">منشور</SelectItem>
                            <SelectItem value="draft">مسودة</SelectItem>
                            <SelectItem value="archived">مؤرشف</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Switch
                          id="featured"
                          checked={featured}
                          onCheckedChange={setFeatured}
                        />
                        <Label htmlFor="featured">خدمة مميزة</Label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="robots-meta">Robots Meta</Label>
                      <Select value={robotsMeta} onValueChange={setRobotsMeta}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="index,follow">index,follow</SelectItem>
                          <SelectItem value="noindex,follow">noindex,follow</SelectItem>
                          <SelectItem value="index,nofollow">index,nofollow</SelectItem>
                          <SelectItem value="noindex,nofollow">noindex,nofollow</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="schema-type">Schema Type</Label>
                      <Select value={schemaType} onValueChange={setSchemaType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Service">Service</SelectItem>
                          <SelectItem value="Product">Product</SelectItem>
                          <SelectItem value="Article">Article</SelectItem>
                          <SelectItem value="WebPage">WebPage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Schema JSON-LD المُنشأ</Label>
                      <Textarea
                        value={generateSchema()}
                        readOnly
                        className="font-mono text-sm"
                        rows={8}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* SEO Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 ml-2" />
                  نقاط SEO
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-inception-purple mb-2">{seoScore}/100</div>
                  <Progress value={seoScore} className="mb-4" />
                  <div className="text-sm text-gray-600">
                    {seoScore >= 80 ? "ممتاز" : seoScore >= 60 ? "جيد" : "يحتاج تحسين"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>إجراءات سريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Camera className="w-4 h-4 ml-2" />
                  رفع صور
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="w-4 h-4 ml-2" />
                  معاينة خارجية
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="w-4 h-4 ml-2" />
                  إعادة تحليل SEO
                </Button>
              </CardContent>
            </Card>

            {/* Publishing */}
            <Card>
              <CardHeader>
                <CardTitle>النشر</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">الحالة:</span>
                  <Badge variant={status === 'published' ? 'default' : 'secondary'}>
                    {status === 'published' ? 'منشور' : status === 'draft' ? 'مسودة' : 'مؤرشف'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">مميز:</span>
                  <Badge variant={featured ? 'default' : 'outline'}>
                    {featured ? 'نعم' : 'لا'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
};

export default ServiceEditor;