import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Lightbulb,
  TrendingUp,
  Search,
  Globe,
  Image,
  Timer
} from "lucide-react";

interface SEOAnalysisProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  sections: any[];
}

interface SEOSuggestion {
  type: 'error' | 'warning' | 'info' | 'success';
  category: string;
  message: string;
  impact: 'high' | 'medium' | 'low';
  suggestion: string;
}

const AutoSEOAnalyzer: React.FC<SEOAnalysisProps> = ({
  title,
  metaTitle,
  metaDescription,
  content,
  sections
}) => {
  const [analysis, setAnalysis] = useState<SEOSuggestion[]>([]);
  const [seoScore, setSeoScore] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    performAnalysis();
  }, [title, metaTitle, metaDescription, content, sections]);

  const performAnalysis = () => {
    setIsAnalyzing(true);
    const suggestions: SEOSuggestion[] = [];
    let score = 100;

    // تحليل العنوان
    if (!metaTitle) {
      suggestions.push({
        type: 'error',
        category: 'العنوان',
        message: 'لا يوجد عنوان Meta Title',
        impact: 'high',
        suggestion: 'أضف عنوان Meta Title يتراوح بين 50-60 حرف'
      });
      score -= 20;
    } else {
      if (metaTitle.length < 30) {
        suggestions.push({
          type: 'warning',
          category: 'العنوان',
          message: 'العنوان قصير جداً',
          impact: 'medium',
          suggestion: 'اجعل العنوان بين 50-60 حرف لأفضل النتائج'
        });
        score -= 10;
      } else if (metaTitle.length > 60) {
        suggestions.push({
          type: 'warning',
          category: 'العنوان',
          message: 'العنوان طويل جداً',
          impact: 'medium',
          suggestion: 'قلل العنوان إلى أقل من 60 حرف'
        });
        score -= 10;
      } else {
        suggestions.push({
          type: 'success',
          category: 'العنوان',
          message: 'طول العنوان مثالي',
          impact: 'low',
          suggestion: 'العنوان في الطول المثالي'
        });
      }
    }

    // تحليل الوصف
    if (!metaDescription) {
      suggestions.push({
        type: 'error',
        category: 'الوصف',
        message: 'لا يوجد وصف Meta Description',
        impact: 'high',
        suggestion: 'أضف وصف Meta Description يتراوح بين 150-160 حرف'
      });
      score -= 15;
    } else {
      if (metaDescription.length < 120) {
        suggestions.push({
          type: 'warning',
          category: 'الوصف',
          message: 'الوصف قصير جداً',
          impact: 'medium',
          suggestion: 'اجعل الوصف بين 150-160 حرف لأفضل النتائج'
        });
        score -= 8;
      } else if (metaDescription.length > 160) {
        suggestions.push({
          type: 'warning',
          category: 'الوصف',
          message: 'الوصف طويل جداً',
          impact: 'medium',
          suggestion: 'قلل الوصف إلى أقل من 160 حرف'
        });
        score -= 8;
      } else {
        suggestions.push({
          type: 'success',
          category: 'الوصف',
          message: 'طول الوصف مثالي',
          impact: 'low',
          suggestion: 'الوصف في الطول المثالي'
        });
      }
    }

    // تحليل المحتوى
    const fullContent = content + sections.map(s => s.content).join(' ');
    const wordCount = fullContent.split(/\s+/).length;
    
    if (wordCount < 300) {
      suggestions.push({
        type: 'warning',
        category: 'المحتوى',
        message: 'المحتوى قصير',
        impact: 'medium',
        suggestion: 'أضف محتوى أكثر (300 كلمة على الأقل) لتحسين SEO'
      });
      score -= 10;
    } else if (wordCount > 300) {
      suggestions.push({
        type: 'success',
        category: 'المحتوى',
        message: 'المحتوى كافي',
        impact: 'low',
        suggestion: 'المحتوى يحتوي على عدد جيد من الكلمات'
      });
    }

    // تحليل العناوين
    const hasH1 = fullContent.includes('<h1>');
    const hasH2 = fullContent.includes('<h2>');
    
    if (!hasH1) {
      suggestions.push({
        type: 'error',
        category: 'البنية',
        message: 'لا يوجد عنوان H1',
        impact: 'high',
        suggestion: 'أضف عنوان H1 واحد على الأقل في بداية المحتوى'
      });
      score -= 15;
    }
    
    if (!hasH2) {
      suggestions.push({
        type: 'warning',
        category: 'البنية',
        message: 'لا توجد عناوين H2',
        impact: 'medium',
        suggestion: 'أضف عناوين H2 لتحسين بنية المحتوى'
      });
      score -= 8;
    }

    // تحليل الصور
    const imagesCount = sections.filter(s => s.image).length;
    if (imagesCount === 0) {
      suggestions.push({
        type: 'warning',
        category: 'الصور',
        message: 'لا توجد صور',
        impact: 'medium',
        suggestion: 'أضف صور مع نص بديل (Alt Text) لتحسين SEO'
      });
      score -= 8;
    } else {
      suggestions.push({
        type: 'success',
        category: 'الصور',
        message: `يحتوي على ${imagesCount} صورة`,
        impact: 'low',
        suggestion: 'تأكد من إضافة نص بديل (Alt Text) للصور'
      });
    }

    // تحليل الروابط
    const linksCount = sections.filter(s => s.link).length;
    if (linksCount === 0) {
      suggestions.push({
        type: 'info',
        category: 'الروابط',
        message: 'لا توجد روابط داخلية',
        impact: 'low',
        suggestion: 'أضف روابط داخلية لتحسين تجربة المستخدم'
      });
      score -= 5;
    }

    // التأكد من أن النتيجة لا تقل عن 0
    score = Math.max(0, score);

    setAnalysis(suggestions);
    setSeoScore(score);
    
    setTimeout(() => setIsAnalyzing(false), 1000);
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Lightbulb className="w-4 h-4 text-blue-500" />;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'error': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'success': return 'border-green-200 bg-green-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'ممتاز';
    if (score >= 60) return 'جيد';
    if (score >= 40) return 'متوسط';
    return 'يحتاج تحسين';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          تحليل SEO التلقائي
          {isAnalyzing && <Timer className="w-4 h-4 animate-spin" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* نتيجة SEO */}
        <div className="text-center">
          <div className={`text-3xl font-bold ${getScoreColor(seoScore)}`}>
            {seoScore}/100
          </div>
          <div className="text-sm text-gray-600 mb-3">
            {getScoreLabel(seoScore)}
          </div>
          <Progress value={seoScore} className="w-full" />
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold">{metaTitle.length}</div>
            <div className="text-xs text-gray-600">أحرف العنوان</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold">{metaDescription.length}</div>
            <div className="text-xs text-gray-600">أحرف الوصف</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold">{sections.length}</div>
            <div className="text-xs text-gray-600">الأقسام</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold">
              {(content + sections.map(s => s.content).join(' ')).split(/\s+/).length}
            </div>
            <div className="text-xs text-gray-600">الكلمات</div>
          </div>
        </div>

        {/* التوصيات */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            التوصيات والاقتراحات
          </h4>
          
          {analysis.map((suggestion, index) => (
            <Alert key={index} className={getSuggestionColor(suggestion.type)}>
              <div className="flex items-start gap-3">
                {getSuggestionIcon(suggestion.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {suggestion.category}
                    </Badge>
                    <Badge 
                      variant={suggestion.impact === 'high' ? 'destructive' : 
                               suggestion.impact === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {suggestion.impact === 'high' ? 'تأثير عالي' :
                       suggestion.impact === 'medium' ? 'تأثير متوسط' : 'تأثير منخفض'}
                    </Badge>
                  </div>
                  <div className="font-medium text-sm">{suggestion.message}</div>
                  <AlertDescription className="text-xs mt-1">
                    {suggestion.suggestion}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          ))}
        </div>

        {/* أدوات سريعة */}
        <div className="pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={performAnalysis}>
              <Search className="w-4 h-4 mr-2" />
              إعادة التحليل
            </Button>
            <Button variant="outline" size="sm">
              <Globe className="w-4 h-4 mr-2" />
              تحليل الكلمات المفتاحية
            </Button>
            <Button variant="outline" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              اقتراحات التحسين
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoSEOAnalyzer;