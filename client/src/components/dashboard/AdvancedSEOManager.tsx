import React, { useState } from "react";
import { 
  Search, 
  TrendingUp, 
  Globe,
  BarChart3,
  Settings,
  Plus,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  XCircle,
  Target,
  Link as LinkIcon,
  FileText,
  Image as ImageIcon,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Zap,
  Clock,
  Users,
  MousePointer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const AdvancedSEOManager = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState<any>(null);

  // Mock data - في التطبيق الحقيقي ستأتي من API
  const siteOverview = {
    overallScore: 78,
    organicTraffic: 25420,
    keywordRankings: 342,
    backlinks: 1250,
    pageSpeed: 84,
    mobileScore: 92,
    issuesFound: 15
  };

  const pages = [
    {
      id: 1,
      url: "/",
      title: "إنسيبشن - خدمات التسويق الرقمي والتطوير",
      metaTitle: "إنسيبشن - شركة التسويق الرقمي الرائدة في السعودية",
      metaDescription: "شركة إنسيبشن للتسويق الرقمي وتطوير المواقع. نقدم خدمات SEO، إدارة وسائل التواصل، والتطوير التقني المتطور.",
      status: "optimized",
      traffic: 5240,
      keywords: 45,
      loadTime: 1.2,
      mobileScore: 95,
      issues: []
    },
    {
      id: 2,
      url: "/services",
      title: "خدماتنا - إنسيبشن",
      metaTitle: "خدمات التسويق الرقمي المتكاملة | إنسيبشن",
      metaDescription: "تعرف على خدماتنا المتنوعة في التسويق الرقمي، تحسين محركات البحث، إدارة المحتوى، والتطوير التقني.",
      status: "needs-improvement",
      traffic: 3180,
      keywords: 32,
      loadTime: 2.1,
      mobileScore: 88,
      issues: ["طول الوصف", "تحسين الصور"]
    },
    {
      id: 3,
      url: "/articles",
      title: "مقالاتنا - إنسيبشن",
      metaTitle: "",
      metaDescription: "",
      status: "critical",
      traffic: 890,
      keywords: 8,
      loadTime: 3.2,
      mobileScore: 76,
      issues: ["عدم وجود Meta Title", "عدم وجود Meta Description", "سرعة التحميل"]
    }
  ];

  const keywords = [
    {
      id: 1,
      term: "التسويق الرقمي",
      position: 3,
      previousPosition: 5,
      volume: 2400,
      difficulty: 65,
      cpc: 2.5,
      traffic: 840,
      url: "/",
      intent: "commercial",
      trend: "up"
    },
    {
      id: 2,
      term: "تطوير المواقع السعودية",
      position: 8,
      previousPosition: 12,
      volume: 1800,
      difficulty: 72,
      cpc: 3.2,
      traffic: 320,
      url: "/services/web-development",
      intent: "commercial",
      trend: "up"
    },
    {
      id: 3,
      term: "SEO السعودية",
      position: 12,
      previousPosition: 10,
      volume: 960,
      difficulty: 58,
      cpc: 4.1,
      traffic: 180,
      url: "/services/seo",
      intent: "commercial",
      trend: "down"
    }
  ];

  const competitors = [
    {
      name: "شركة المنافس 1",
      domain: "competitor1.com",
      organicKeywords: 450,
      organicTraffic: 35000,
      backlinks: 2100,
      domainRating: 65
    },
    {
      name: "شركة المنافس 2", 
      domain: "competitor2.com",
      organicKeywords: 380,
      organicTraffic: 28000,
      backlinks: 1800,
      domainRating: 58
    }
  ];

  const technicalIssues = [
    {
      type: "critical",
      title: "صفحات بدون Meta Description",
      count: 5,
      impact: "high",
      description: "صفحات لا تحتوي على وصف meta مما يؤثر على النقر في نتائج البحث"
    },
    {
      type: "warning", 
      title: "صور بدون Alt Text",
      count: 12,
      impact: "medium",
      description: "صور بدون نص بديل مما يؤثر على إمكانية الوصول و SEO"
    },
    {
      type: "info",
      title: "روابط داخلية منقطعة",
      count: 3,
      impact: "low", 
      description: "روابط داخلية تؤدي إلى صفحات غير موجودة"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimized":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "needs-improvement":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "critical":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPositionChange = (current: number, previous: number) => {
    const change = previous - current;
    if (change > 0) return { text: `+${change}`, color: "text-green-600", trend: "up" };
    if (change < 0) return { text: `${change}`, color: "text-red-600", trend: "down" };
    return { text: "0", color: "text-gray-600", trend: "stable" };
  };

  const handleOptimizePage = (pageId: number) => {
    toast({
      title: "تم بدء التحسين",
      description: "سيتم تحسين الصفحة تلقائياً وإرسال تقرير مفصل",
    });
  };

  const handleAddKeyword = () => {
    toast({
      title: "تمت إضافة الكلمة المفتاحية",
      description: "سيتم تتبع الكلمة المفتاحية الجديدة",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-inception-purple">مركز إدارة SEO المتطور</h1>
          <p className="text-gray-600">إدارة شاملة لتحسين محركات البحث للموقع</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 ml-2" />
            تحديث البيانات
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير تقرير
          </Button>
          <Button className="bg-inception-purple hover:bg-inception-purple/90">
            <Plus className="w-4 h-4 ml-2" />
            تدقيق جديد
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">درجة SEO العامة</p>
                <p className="text-3xl font-bold text-inception-purple">{siteOverview.overallScore}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-inception-purple" />
            </div>
            <Progress value={siteOverview.overallScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الزيارات العضوية</p>
                <p className="text-3xl font-bold text-green-600">{siteOverview.organicTraffic.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+12% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الكلمات المفتاحية</p>
                <p className="text-3xl font-bold text-blue-600">{siteOverview.keywordRankings}</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-xs text-blue-600 mt-2">+8 كلمات جديدة</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المشاكل المكتشفة</p>
                <p className="text-3xl font-bold text-red-600">{siteOverview.issuesFound}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-xs text-red-600 mt-2">3 مشاكل حرجة</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-7 lg:grid-cols-8">
          <TabsTrigger value="general">إعدادات عامة</TabsTrigger>
          <TabsTrigger value="sitemap">خريطة الموقع</TabsTrigger>
          <TabsTrigger value="robots">Robots.txt</TabsTrigger>
          <TabsTrigger value="header-footer">الهيدر والفوتر</TabsTrigger>
          <TabsTrigger value="images">صور الموقع</TabsTrigger>
          <TabsTrigger value="pages">تحليل الصفحات</TabsTrigger>
          <TabsTrigger value="keywords">الكلمات المفتاحية</TabsTrigger>
          <TabsTrigger value="technical">التحليل التقني</TabsTrigger>
        </TabsList>

        {/* General SEO Settings */}
        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  إعدادات الموقع العامة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="site-title">عنوان الموقع الافتراضي</Label>
                  <Input id="site-title" defaultValue="إنسيبشن - شركة التسويق الرقمي الرائدة في السعودية" />
                </div>
                <div>
                  <Label htmlFor="site-description">وصف الموقع الافتراضي</Label>
                  <Textarea id="site-description" defaultValue="شركة إنسيبشن للتسويق الرقمي وتطوير المواقع. نقدم خدمات SEO، إدارة وسائل التواصل، والتطوير التقني المتطور." />
                </div>
                <div>
                  <Label htmlFor="site-keywords">الكلمات المفتاحية العامة</Label>
                  <Textarea id="site-keywords" placeholder="التسويق الرقمي، تطوير المواقع، SEO، السعودية..." />
                </div>
                <div>
                  <Label htmlFor="site-url">رابط الموقع الأساسي</Label>
                  <Input id="site-url" defaultValue="https://inception.sa" />
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Switch id="analytics" />
                  <Label htmlFor="analytics">تفعيل Google Analytics</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Switch id="search-console" />
                  <Label htmlFor="search-console">تفعيل Google Search Console</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Open Graph & Schema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="og-image">صورة Open Graph الافتراضية</Label>
                  <div className="flex gap-2">
                    <Input id="og-image" placeholder="رابط الصورة أو رفع صورة جديدة" />
                    <Button variant="outline">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="site-name">اسم الموقع</Label>
                  <Input id="site-name" defaultValue="إنسيبشن" />
                </div>
                <div>
                  <Label htmlFor="twitter-handle">حساب تويتر</Label>
                  <Input id="twitter-handle" placeholder="@inception_sa" />
                </div>
                <div>
                  <Label htmlFor="facebook-app-id">Facebook App ID</Label>
                  <Input id="facebook-app-id" placeholder="123456789" />
                </div>
                <div>
                  <Label>Schema Markup</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="نوع النشاط التجاري" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="organization">شركة/مؤسسة</SelectItem>
                      <SelectItem value="local-business">نشاط تجاري محلي</SelectItem>
                      <SelectItem value="professional-service">خدمات مهنية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sitemap Management */}
        <TabsContent value="sitemap" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  إدارة خريطة الموقع (Sitemap)
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 ml-2" />
                    إعادة إنشاء
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="w-4 h-4 ml-2" />
                    معاينة Sitemap
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="font-semibold">Sitemap الرئيسي</div>
                      <div className="text-sm text-gray-500">125 صفحة</div>
                      <div className="text-xs text-green-600">محدث تلقائياً</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="font-semibold">Sitemap الصور</div>
                      <div className="text-sm text-gray-500">340 صورة</div>
                      <div className="text-xs text-green-600">محدث تلقائياً</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="font-semibold">Sitemap الأخبار</div>
                      <div className="text-sm text-gray-500">25 مقال</div>
                      <div className="text-xs text-green-600">محدث تلقائياً</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-4">إعدادات Sitemap</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">تحديث تلقائي</div>
                        <div className="text-sm text-gray-500">إنشاء sitemap جديد عند إضافة محتوى</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">تضمين الصور</div>
                        <div className="text-sm text-gray-500">إضافة sitemap منفصل للصور</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">تضمين الأخبار</div>
                        <div className="text-sm text-gray-500">إضافة sitemap للمقالات والأخبار</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-4">استبعاد صفحات</h3>
                  <Textarea 
                    placeholder="/admin/*&#10;/private/*&#10;/test/*"
                    className="min-h-[100px]"
                  />
                  <p className="text-sm text-gray-500 mt-2">قائمة بالصفحات المراد استبعادها من sitemap (صفحة واحدة في كل سطر)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Robots.txt Management */}
        <TabsContent value="robots" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  إدارة ملف Robots.txt
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <ExternalLink className="w-4 h-4 ml-2" />
                    معاينة Robots.txt
                  </Button>
                  <Button className="bg-inception-purple hover:bg-inception-purple/90">
                    حفظ التغييرات
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="robots-content">محتوى ملف Robots.txt</Label>
                    <Textarea 
                      id="robots-content"
                      className="min-h-[300px] font-mono text-sm"
                      defaultValue={`User-agent: *
Allow: /

# Block admin pages
Disallow: /admin/
Disallow: /login
Disallow: /private/

# Block search and filters
Disallow: /*?search=
Disallow: /*?filter=

# Allow important files
Allow: /sitemap.xml
Allow: /robots.txt

# Sitemap location
Sitemap: https://inception.sa/sitemap.xml`}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3">قوالب جاهزة</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start text-right">
                          سماح كامل لجميع محركات البحث
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-right">
                          حجب صفحات الإدارة فقط
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-right">
                          حجب محركات البحث الضارة
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-right">
                          إعدادات متقدمة للتجارة الإلكترونية
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3">اختبار Robots.txt</h3>
                      <div className="space-y-2">
                        <Input placeholder="اختبر URL معين" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر محرك البحث" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="googlebot">Googlebot</SelectItem>
                            <SelectItem value="bingbot">Bingbot</SelectItem>
                            <SelectItem value="yandex">YandexBot</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button className="w-full">اختبار الوصول</Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3">حالة الملف</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">ملف robots.txt موجود وصالح</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">يمكن الوصول إليه من محركات البحث</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">آخر تحديث: منذ 3 أيام</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Header & Footer Code Management */}
        <TabsContent value="header-footer" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  أكواد الهيدر (Head)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="google-analytics">Google Analytics</Label>
                  <Textarea 
                    id="google-analytics"
                    placeholder="<!-- Google Analytics Code -->"
                    className="min-h-[100px] font-mono text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="google-tag-manager">Google Tag Manager</Label>
                  <Textarea 
                    id="google-tag-manager"
                    placeholder="<!-- Google Tag Manager -->"
                    className="min-h-[100px] font-mono text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="custom-head">أكواد مخصصة في الهيدر</Label>
                  <Textarea 
                    id="custom-head"
                    placeholder="<!-- Custom Head Code -->"
                    className="min-h-[120px] font-mono text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="meta-verification">رموز التحقق</Label>
                  <div className="space-y-2">
                    <Input placeholder="Google Search Console Verification" />
                    <Input placeholder="Bing Webmaster Verification" />
                    <Input placeholder="Yandex Verification" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  أكواد الفوتر (Body End)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hotjar">Hotjar / User Analytics</Label>
                  <Textarea 
                    id="hotjar"
                    placeholder="<!-- Hotjar Tracking Code -->"
                    className="min-h-[100px] font-mono text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="facebook-pixel">Facebook Pixel</Label>
                  <Textarea 
                    id="facebook-pixel"
                    placeholder="<!-- Facebook Pixel Code -->"
                    className="min-h-[100px] font-mono text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="chat-widgets">ودجات الدردشة</Label>
                  <Textarea 
                    id="chat-widgets"
                    placeholder="<!-- Chat Widget Code -->"
                    className="min-h-[100px] font-mono text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="custom-footer">أكواد مخصصة في الفوتر</Label>
                  <Textarea 
                    id="custom-footer"
                    placeholder="<!-- Custom Footer Code -->"
                    className="min-h-[120px] font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>معاينة الأكواد المضافة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">Google Analytics</div>
                    <div className="text-sm text-gray-500">GA4 - G-XXXXXXXXXX</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">نشط</Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">Facebook Pixel</div>
                    <div className="text-sm text-gray-500">Pixel ID: 123456789</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">معطل</Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Images SEO Management */}
        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  إدارة SEO للصور
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 ml-2" />
                    فحص جميع الصور
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 ml-2" />
                    تصدير تقرير
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Images Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">342</div>
                      <div className="text-sm text-gray-500">إجمالي الصور</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">298</div>
                      <div className="text-sm text-gray-500">محسنة للSEO</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">44</div>
                      <div className="text-sm text-gray-500">بدون Alt Text</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">12</div>
                      <div className="text-sm text-gray-500">حجم كبير</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Images with Issues */}
                <div className="border rounded-lg">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">صور تحتاج تحسين</h3>
                  </div>
                  <div className="divide-y">
                    {[
                      {
                        src: "/lovable-uploads/28b72d61-4e8f-4b33-847a-1685c6b0b5a5.png",
                        name: "hero-image.jpg",
                        page: "/",
                        issues: ["بدون Alt Text", "حجم كبير"],
                        size: "2.4 MB"
                      },
                      {
                        src: "/lovable-uploads/3cc93b10-435d-4b20-a3d0-da06335cf1ca.png",
                        name: "service-image.png",
                        page: "/services",
                        issues: ["Alt Text غير وصفي"],
                        size: "890 KB"
                      },
                      {
                        src: "/lovable-uploads/6b7d5f55-0ca7-45cb-9463-f8a6eb07d7d4.png",
                        name: "team-photo.jpg",
                        page: "/about",
                        issues: ["بدون Title"],
                        size: "1.2 MB"
                      }
                    ].map((image, index) => (
                      <div key={index} className="p-4 flex items-center gap-4">
                        <img 
                          src={image.src} 
                          alt={image.name}
                          className="w-16 h-16 object-cover rounded border"
                        />
                        <div className="flex-1">
                          <div className="font-medium">{image.name}</div>
                          <div className="text-sm text-gray-500">{image.page} • {image.size}</div>
                          <div className="flex gap-1 mt-1">
                            {image.issues.map((issue, i) => (
                              <Badge key={i} variant="destructive" className="text-xs">
                                {issue}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 ml-1" />
                                تحرير
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>تحرير SEO للصورة</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="alt-text">Alt Text</Label>
                                  <Input id="alt-text" placeholder="وصف الصورة للـ SEO وإمكانية الوصول" />
                                </div>
                                <div>
                                  <Label htmlFor="title-text">Title Text</Label>
                                  <Input id="title-text" placeholder="عنوان الصورة عند التمرير" />
                                </div>
                                <div>
                                  <Label htmlFor="caption">تسمية توضيحية</Label>
                                  <Input id="caption" placeholder="نص توضيحي للصورة" />
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" className="flex-1">إلغاء</Button>
                                  <Button className="flex-1 bg-inception-purple hover:bg-inception-purple/90">حفظ</Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <Zap className="w-4 h-4 ml-1" />
                            تحسين تلقائي
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bulk Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>إجراءات مجمعة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <Zap className="w-6 h-6" />
                        <span>إنشاء Alt Text تلقائي</span>
                        <span className="text-xs text-gray-500">للصور بدون alt text</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <RefreshCw className="w-6 h-6" />
                        <span>ضغط الصور</span>
                        <span className="text-xs text-gray-500">تحسين أحجام الصور</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <Download className="w-6 h-6" />
                        <span>تقرير مفصل</span>
                        <span className="text-xs text-gray-500">تصدير تحليل كامل</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pages Analysis */}
        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>تحليل صفحات الموقع</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="البحث في الصفحات..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10 w-80"
                    />
                  </div>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة صفحة
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pages.map((page) => (
                  <div key={page.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusIcon(page.status)}
                          <h3 className="font-semibold text-inception-purple">{page.title}</h3>
                          <Badge variant="outline">{page.url}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <span className="text-xs font-medium text-gray-500">Meta Title:</span>
                            <p className="text-sm">{page.metaTitle || "غير محدد"}</p>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-500">Meta Description:</span>
                            <p className="text-sm">{page.metaDescription || "غير محدد"}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-6 text-center">
                        <div>
                          <div className="font-bold text-green-600">{page.traffic.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">زيارات</div>
                        </div>
                        <div>
                          <div className="font-bold text-blue-600">{page.keywords}</div>
                          <div className="text-xs text-gray-500">كلمات</div>
                        </div>
                        <div>
                          <div className="font-bold text-purple-600">{page.loadTime}s</div>
                          <div className="text-xs text-gray-500">تحميل</div>
                        </div>
                        <div>
                          <div className="font-bold text-orange-600">{page.mobileScore}%</div>
                          <div className="text-xs text-gray-500">موبايل</div>
                        </div>
                      </div>
                    </div>
                    
                    {page.issues.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-red-600 mb-2">مشاكل مكتشفة:</h4>
                        <div className="flex flex-wrap gap-1">
                          {page.issues.map((issue, index) => (
                            <Badge key={index} variant="destructive" className="text-xs">
                              {issue}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 ml-1" />
                          معاينة
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 ml-1" />
                          تحرير SEO
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 ml-1" />
                          زيارة
                        </Button>
                      </div>
                      <Button 
                        onClick={() => handleOptimizePage(page.id)}
                        className="bg-inception-purple hover:bg-inception-purple/90"
                        size="sm"
                      >
                        <Zap className="w-4 h-4 ml-1" />
                        تحسين تلقائي
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Keywords Tracking */}
        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>تتبع الكلمات المفتاحية</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-inception-purple hover:bg-inception-purple/90">
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة كلمة مفتاحية
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>إضافة كلمة مفتاحية جديدة</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="keyword">الكلمة المفتاحية</Label>
                        <Input id="keyword" placeholder="مثال: التسويق الرقمي" />
                      </div>
                      <div>
                        <Label htmlFor="target-url">الصفحة المستهدفة</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الصفحة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="/">الصفحة الرئيسية</SelectItem>
                            <SelectItem value="/services">الخدمات</SelectItem>
                            <SelectItem value="/articles">المقالات</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleAddKeyword} className="w-full">
                        إضافة
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الكلمة المفتاحية</TableHead>
                    <TableHead>الموقع الحالي</TableHead>
                    <TableHead>التغيير</TableHead>
                    <TableHead>حجم البحث</TableHead>
                    <TableHead>الصعوبة</TableHead>
                    <TableHead>CPC</TableHead>
                    <TableHead>الزيارات</TableHead>
                    <TableHead>الهدف</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keywords.map((keyword) => {
                    const change = getPositionChange(keyword.position, keyword.previousPosition);
                    return (
                      <TableRow key={keyword.id}>
                        <TableCell className="font-medium">{keyword.term}</TableCell>
                        <TableCell>
                          <Badge variant={keyword.position <= 3 ? "default" : keyword.position <= 10 ? "secondary" : "outline"}>
                            #{keyword.position}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`flex items-center gap-1 ${change.color}`}>
                            {change.trend === "up" && <TrendingUp className="w-3 h-3" />}
                            {change.trend === "down" && <TrendingUp className="w-3 h-3 rotate-180" />}
                            {change.text}
                          </span>
                        </TableCell>
                        <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={keyword.difficulty} className="w-16" />
                            <span className="text-sm">{keyword.difficulty}%</span>
                          </div>
                        </TableCell>
                        <TableCell>${keyword.cpc}</TableCell>
                        <TableCell>{keyword.traffic}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {keyword.intent}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => setSelectedKeyword(keyword)}>
                              <BarChart3 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technical SEO */}
        <TabsContent value="technical" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>المشاكل التقنية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {technicalIssues.map((issue, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        issue.type === 'critical' ? 'bg-red-500' : 
                        issue.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{issue.title}</h4>
                          <Badge variant="outline">{issue.count}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{issue.description}</p>
                        <Badge 
                          variant={issue.impact === 'high' ? 'destructive' : issue.impact === 'medium' ? 'default' : 'secondary'}
                          className="text-xs mt-2"
                        >
                          تأثير {issue.impact === 'high' ? 'عالي' : issue.impact === 'medium' ? 'متوسط' : 'منخفض'}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        إصلاح
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أداء الموقع</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">سرعة التحميل</span>
                      <span className="text-sm text-gray-600">{siteOverview.pageSpeed}/100</span>
                    </div>
                    <Progress value={siteOverview.pageSpeed} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">تجربة المحمول</span>
                      <span className="text-sm text-gray-600">{siteOverview.mobileScore}/100</span>
                    </div>
                    <Progress value={siteOverview.mobileScore} />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">اختبارات إضافية</h4>
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="w-4 h-4 ml-2" />
                      اختبار سرعة التحميل
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="w-4 h-4 ml-2" />
                      فحص البيانات المنظمة
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 ml-2" />
                      تحليل Sitemap
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <LinkIcon className="w-4 h-4 ml-2" />
                      فحص الروابط المكسورة
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Competitors */}
        <TabsContent value="competitors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>تحليل المنافسين</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الموقع</TableHead>
                    <TableHead>الكلمات العضوية</TableHead>
                    <TableHead>الزيارات العضوية</TableHead>
                    <TableHead>الروابط الخلفية</TableHead>
                    <TableHead>تقييم النطاق</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {competitors.map((competitor, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{competitor.name}</div>
                          <div className="text-sm text-gray-500">{competitor.domain}</div>
                        </div>
                      </TableCell>
                      <TableCell>{competitor.organicKeywords.toLocaleString()}</TableCell>
                      <TableCell>{competitor.organicTraffic.toLocaleString()}</TableCell>
                      <TableCell>{competitor.backlinks.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{competitor.domainRating}/100</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <BarChart3 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backlinks */}
        <TabsContent value="backlinks" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <LinkIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">تحليل الروابط الخلفية</h3>
                <p className="text-gray-500 mb-4">قم بتفعيل تتبع الروابط الخلفية للحصول على تحليل شامل</p>
                <Button className="bg-inception-purple hover:bg-inception-purple/90">
                  تفعيل التتبع
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-12 h-12 text-inception-purple mx-auto mb-4" />
                <h3 className="font-semibold text-inception-purple mb-2">تقرير SEO شامل</h3>
                <p className="text-sm text-gray-600 mb-4">تحليل كامل لأداء SEO للموقع</p>
                <Button variant="outline">إنشاء التقرير</Button>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-inception-purple mb-2">تقرير الكلمات المفتاحية</h3>
                <p className="text-sm text-gray-600 mb-4">أداء الكلمات المفتاحية والترتيب</p>
                <Button variant="outline">إنشاء التقرير</Button>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-inception-purple mb-2">تقرير المنافسين</h3>
                <p className="text-sm text-gray-600 mb-4">مقارنة مع المنافسين في السوق</p>
                <Button variant="outline">إنشاء التقرير</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedSEOManager;