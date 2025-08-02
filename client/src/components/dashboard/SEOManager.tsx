import React, { useState } from "react";
import { 
  Search, 
  TrendingUp, 
  Eye, 
  MousePointer,
  Globe,
  BarChart3,
  Edit,
  Plus,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  XCircle
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

const SEOManager = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const seoStats = [
    { label: "متوسط الترتيب", value: "12.5", change: "+2.3", trend: "up", color: "text-green-600" },
    { label: "الكلمات المفتاحية", value: "145", change: "+8", trend: "up", color: "text-green-600" },
    { label: "الزيارات العضوية", value: "8,542", change: "+15%", trend: "up", color: "text-green-600" },
    { label: "معدل النقر CTR", value: "3.2%", change: "-0.1%", trend: "down", color: "text-red-600" }
  ];

  const pages = [
    {
      id: 1,
      title: "الصفحة الرئيسية - إنسيبشن",
      url: "/",
      metaTitle: "إنسيبشن - خدمات التسويق الرقمي والتطوير",
      metaDescription: "شركة إنسيبشن للتسويق الرقمي وتطوير المواقع. نقدم خدمات SEO، إدارة وسائل التواصل، والتطوير.",
      status: "optimized",
      keywords: ["التسويق الرقمي", "تطوير المواقع", "SEO"],
      traffic: 1250,
      ranking: 3
    },
    {
      id: 2,
      title: "خدماتنا - إنسيبشن",
      url: "/services",
      metaTitle: "خدمات التسويق الرقمي | إنسيبشن",
      metaDescription: "تعرف على خدماتنا المتنوعة في التسويق الرقمي، SEO، إدارة المحتوى، والتطوير التقني.",
      status: "needs-improvement",
      keywords: ["خدمات التسويق", "SEO", "تطوير"],
      traffic: 890,
      ranking: 8
    },
    {
      id: 3,
      title: "مقالاتنا - إنسيبشن",
      url: "/articles",
      metaTitle: "",
      metaDescription: "",
      status: "critical",
      keywords: [],
      traffic: 234,
      ranking: 25
    }
  ];

  const keywords = [
    { term: "التسويق الرقمي", position: 3, volume: 2400, difficulty: 65, url: "/" },
    { term: "تطوير المواقع", position: 8, volume: 1800, difficulty: 72, url: "/services" },
    { term: "SEO السعودية", position: 12, volume: 960, difficulty: 58, url: "/services/seo" },
    { term: "إدارة المحتوى", position: 15, volume: 720, difficulty: 45, url: "/services/social-media" },
    { term: "التجارة الإلكترونية", position: 22, volume: 1200, difficulty: 68, url: "/services" }
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "optimized":
        return "محسن";
      case "needs-improvement":
        return "يحتاج تحسين";
      case "critical":
        return "بحاجة ماسة";
      default:
        return "غير محدد";
    }
  };

  const getPositionColor = (position: number) => {
    if (position <= 3) return "text-green-600";
    if (position <= 10) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-inception-purple">إدارة SEO</h1>
          <p className="text-gray-600">تحسين محركات البحث وتحليل الأداء</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 ml-2" />
            تحديث البيانات
          </Button>
          <Button className="bg-inception-purple hover:bg-inception-purple/90">
            <Plus className="w-4 h-4 ml-2" />
            إضافة كلمة مفتاحية
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {seoStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.label}
              </CardTitle>
              {stat.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-inception-purple">{stat.value}</div>
              <p className={`text-xs ${stat.color} mt-1`}>
                {stat.change} من الشهر الماضي
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="pages" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pages">الصفحات</TabsTrigger>
          <TabsTrigger value="keywords">الكلمات المفتاحية</TabsTrigger>
          <TabsTrigger value="backlinks">الروابط الخلفية</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>صفحات الموقع</CardTitle>
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
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pages.map((page) => (
                  <div key={page.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(page.status)}
                          <h3 className="font-semibold text-inception-purple">{page.title}</h3>
                          <Badge variant="outline">{getStatusText(page.status)}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{page.url}</div>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs font-medium text-gray-500">العنوان الوصفي:</span>
                            <p className="text-sm">{page.metaTitle || "غير محدد"}</p>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-500">الوصف:</span>
                            <p className="text-sm">{page.metaDescription || "غير محدد"}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-center">
                          <div className={`font-bold ${getPositionColor(page.ranking)}`}>#{page.ranking}</div>
                          <div className="text-gray-500">الترتيب</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-inception-purple">{page.traffic}</div>
                          <div className="text-gray-500">زيارة</div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {page.keywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>تتبع الكلمات المفتاحية</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الكلمة المفتاحية</TableHead>
                    <TableHead>الموقع</TableHead>
                    <TableHead>حجم البحث</TableHead>
                    <TableHead>الصعوبة</TableHead>
                    <TableHead>الصفحة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keywords.map((keyword, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{keyword.term}</TableCell>
                      <TableCell>
                        <span className={`font-bold ${getPositionColor(keyword.position)}`}>
                          #{keyword.position}
                        </span>
                      </TableCell>
                      <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={keyword.difficulty} className="w-16" />
                          <span className="text-sm">{keyword.difficulty}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{keyword.url}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
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

        <TabsContent value="backlinks" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">تحليل الروابط الخلفية</h3>
                <p className="text-gray-500 mb-4">قريباً - تتبع وتحليل الروابط الخلفية للموقع</p>
                <Button variant="outline">تفعيل التتبع</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">تقارير SEO المفصلة</h3>
                <p className="text-gray-500 mb-4">إنشاء تقارير شاملة عن أداء SEO</p>
                <Button variant="outline">إنشاء تقرير</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEOManager;