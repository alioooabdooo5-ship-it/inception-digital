import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Search, Globe, Target, TrendingUp, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const SEOToolsManager = () => {
  const [metaTitle, setMetaTitle] = useState("Inception - استشارات التسويق الرقمي");
  const [metaDescription, setMetaDescription] = useState("شركة إنسيبشن للتسويق الرقمي - نقدم خدمات SEO، الإعلان المدفوع، تطوير المواقع وإدارة وسائل التواصل الاجتماعي");
  const [keywords, setKeywords] = useState("تسويق رقمي، SEO، إعلانات، تطوير مواقع، السعودية");

  const seoScore = 87;
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const seoChecks = [
    { name: "عنوان الصفحة", status: "good", description: "طول مناسب (60 حرف)" },
    { name: "وصف الصفحة", status: "good", description: "طول مناسب (155 حرف)" },
    { name: "الكلمات المفتاحية", status: "warning", description: "يمكن إضافة كلمات أكثر" },
    { name: "سرعة التحميل", status: "good", description: "تحميل سريع (2.1 ثانية)" },
    { name: "التوافق مع الهاتف", status: "good", description: "متوافق 100%" },
    { name: "روابط داخلية", status: "warning", description: "يحتاج المزيد من الروابط" },
    { name: "الصور", status: "error", description: "بعض الصور تحتاج نص بديل" },
    { name: "خريطة الموقع", status: "good", description: "موجودة ومحدثة" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
        return <Badge className="bg-green-100 text-green-800">ممتاز</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">يحتاج تحسين</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">يحتاج إصلاح</Badge>;
      default:
        return <Badge variant="secondary">غير محدد</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">إعدادات SEO</h1>
        <p className="text-gray-600 mt-2">تحسين محركات البحث وإدارة الكلمات المفتاحية</p>
      </div>

      {/* SEO Score */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className={`text-4xl font-bold ${getScoreColor(seoScore)} mb-2`}>
              {seoScore}%
            </div>
            <p className="text-gray-600">نقاط SEO</p>
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${seoScore}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">15</h3>
                <p className="text-gray-600">كلمات مفتاحية</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">8</h3>
                <p className="text-gray-600">صفحات محسنة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">125</h3>
                <p className="text-gray-600">نقرات يومية</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meta Tags */}
      <Card>
        <CardHeader>
          <CardTitle>إعدادات Meta Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان الصفحة (Meta Title)
            </label>
            <Input
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="عنوان الصفحة الرئيسية"
            />
            <p className="text-sm text-gray-500 mt-1">
              {metaTitle.length}/60 حرف (يفضل أقل من 60 حرف)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              وصف الصفحة (Meta Description)
            </label>
            <Textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="وصف مختصر للصفحة الرئيسية"
              rows={3}
            />
            <p className="text-sm text-gray-500 mt-1">
              {metaDescription.length}/155 حرف (يفضل أقل من 155 حرف)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الكلمات المفتاحية
            </label>
            <Input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="كلمة1، كلمة2، كلمة3"
            />
            <p className="text-sm text-gray-500 mt-1">
              فصل الكلمات بفاصلة
            </p>
          </div>

          <Button className="bg-inception-purple hover:bg-purple-700">
            حفظ التغييرات
          </Button>
        </CardContent>
      </Card>

      {/* SEO Health Check */}
      <Card>
        <CardHeader>
          <CardTitle>فحص صحة SEO</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seoChecks.map((check, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(check.status)}
                  <div>
                    <p className="font-medium">{check.name}</p>
                    <p className="text-sm text-gray-600">{check.description}</p>
                  </div>
                </div>
                {getStatusBadge(check.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Keywords */}
      <Card>
        <CardHeader>
          <CardTitle>أداء الكلمات المفتاحية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">تسويق رقمي</p>
                <p className="text-sm text-gray-600">موقع #3 في جوجل</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">↗ +2</p>
                <p className="text-sm text-gray-600">125 نقرة</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">SEO السعودية</p>
                <p className="text-sm text-gray-600">موقع #7 في جوجل</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">↗ +1</p>
                <p className="text-sm text-gray-600">89 نقرة</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">إعلانات جوجل</p>
                <p className="text-sm text-gray-600">موقع #15 في جوجل</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-600">↙ -3</p>
                <p className="text-sm text-gray-600">45 نقرة</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOToolsManager;