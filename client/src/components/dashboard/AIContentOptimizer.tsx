import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bot, 
  Sparkles, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  Zap,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Brain,
  Gauge,
  Wand2,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIOptimization {
  id: string;
  type: 'seo' | 'readability' | 'engagement' | 'conversion' | 'accessibility';
  title: string;
  description: string;
  currentScore: number;
  optimizedScore: number;
  improvement: number;
  action: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'easy' | 'medium' | 'hard';
  applied: boolean;
}

interface AIInsight {
  category: string;
  insight: string;
  recommendation: string;
  confidence: number;
  priority: number;
}

interface AIContentOptimizerProps {
  content: string;
  pageType: string;
  onOptimize: (optimizations: AIOptimization[]) => void;
}

const AIContentOptimizer: React.FC<AIContentOptimizerProps> = ({
  content,
  pageType,
  onOptimize
}) => {
  const { toast } = useToast();
  const [optimizations, setOptimizations] = useState<AIOptimization[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [overallScore, setOverallScore] = useState(0);
  const [selectedOptimization, setSelectedOptimization] = useState<AIOptimization | null>(null);

  // محاكاة تحليل الذكاء الاصطناعي
  useEffect(() => {
    generateAIOptimizations();
    generateAIInsights();
  }, [content, pageType]);

  const generateAIOptimizations = () => {
    const mockOptimizations: AIOptimization[] = [
      {
        id: '1',
        type: 'seo',
        title: 'تحسين الكلمات المفتاحية',
        description: 'اكتشف الذكاء الاصطناعي فرصاً لتحسين كثافة الكلمات المفتاحية بنسبة 23%',
        currentScore: 72,
        optimizedScore: 89,
        improvement: 23,
        action: 'إضافة 3 كلمات مفتاحية في العناوين الفرعية',
        impact: 'high',
        effort: 'easy',
        applied: false
      },
      {
        id: '2',
        type: 'readability',
        title: 'تحسين قابلية القراءة',
        description: 'يمكن تقليل تعقيد الجمل لتحسين فهم المحتوى بنسبة 18%',
        currentScore: 68,
        optimizedScore: 85,
        improvement: 25,
        action: 'تبسيط 5 جمل معقدة وتقسيم الفقرات الطويلة',
        impact: 'medium',
        effort: 'medium',
        applied: false
      },
      {
        id: '3',
        type: 'engagement',
        title: 'زيادة التفاعل',
        description: 'إضافة عناصر تفاعلية يمكن أن تزيد وقت البقاء بنسبة 34%',
        currentScore: 65,
        optimizedScore: 87,
        improvement: 34,
        action: 'إضافة 2 سؤال تفاعلي و 3 دعوات للعمل',
        impact: 'high',
        effort: 'medium',
        applied: false
      },
      {
        id: '4',
        type: 'conversion',
        title: 'تحسين التحويل',
        description: 'تحسين مواضع دعوات العمل يمكن أن يزيد التحويل بنسبة 28%',
        currentScore: 58,
        optimizedScore: 82,
        improvement: 41,
        action: 'إعادة ترتيب 3 أزرار دعوة للعمل وتحسين نصوصها',
        impact: 'high',
        effort: 'easy',
        applied: false
      },
      {
        id: '5',
        type: 'accessibility',
        title: 'تحسين إمكانية الوصول',
        description: 'تحسين البنية والألوان لدعم ذوي الاحتياجات الخاصة',
        currentScore: 78,
        optimizedScore: 94,
        improvement: 21,
        action: 'تحسين تباين الألوان وإضافة نصوص بديلة',
        impact: 'medium',
        effort: 'medium',
        applied: false
      }
    ];

    setOptimizations(mockOptimizations);
    
    // حساب النتيجة الإجمالية
    const avgScore = mockOptimizations.reduce((acc, opt) => acc + opt.currentScore, 0) / mockOptimizations.length;
    setOverallScore(Math.round(avgScore));
  };

  const generateAIInsights = () => {
    const mockInsights: AIInsight[] = [
      {
        category: 'اتجاهات السوق',
        insight: 'المحتوى المتعلق بـ"التسويق الرقمي" يشهد نمواً بنسبة 45% في البحث',
        recommendation: 'أضف محتوى عن "أتمتة التسويق" و "الذكاء الاصطناعي في التسويق"',
        confidence: 92,
        priority: 9
      },
      {
        category: 'سلوك المستخدمين',
        insight: 'المستخدمون يفضلون المحتوى التفاعلي بنسبة 67% أكثر من النصوص الثابتة',
        recommendation: 'أضف استطلاعات رأي، اختبارات، أو حاسبات تفاعلية',
        confidence: 88,
        priority: 8
      },
      {
        category: 'تحسين الأداء',
        insight: 'الصفحات ذات المحتوى المرئي تحقق معدل ارتداد أقل بنسبة 23%',
        recommendation: 'أضف المزيد من الصور، الرسوم البيانية، والفيديوهات',
        confidence: 85,
        priority: 7
      },
      {
        category: 'SEO متقدم',
        insight: 'البحث الصوتي يمثل 30% من عمليات البحث، ويتطلب محتوى محادثي',
        recommendation: 'أعد كتابة العناوين بصيغة أسئلة طبيعية',
        confidence: 91,
        priority: 8
      }
    ];

    setInsights(mockInsights);
  };

  const performAIAnalysis = async () => {
    setIsAnalyzing(true);
    
    // محاكاة تحليل الذكاء الاصطناعي
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    generateAIOptimizations();
    generateAIInsights();
    
    setIsAnalyzing(false);
    
    toast({
      title: "تم التحليل بالذكاء الاصطناعي",
      description: "تم اكتشاف تحسينات جديدة لمحتواك"
    });
  };

  const applyOptimization = (optimization: AIOptimization) => {
    setOptimizations(prev =>
      prev.map(opt =>
        opt.id === optimization.id ? { ...opt, applied: true } : opt
      )
    );

    toast({
      title: "تم تطبيق التحسين",
      description: optimization.title,
      variant: "default"
    });
  };

  const applyAllOptimizations = () => {
    const unapplied = optimizations.filter(opt => !opt.applied);
    onOptimize(unapplied);
    
    setOptimizations(prev =>
      prev.map(opt => ({ ...opt, applied: true }))
    );

    toast({
      title: "تم تطبيق جميع التحسينات",
      description: `تم تطبيق ${unapplied.length} تحسين بنجاح`
    });
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'easy': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-red-600 bg-red-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'seo': return <Target className="w-4 h-4" />;
      case 'readability': return <Brain className="w-4 h-4" />;
      case 'engagement': return <Zap className="w-4 h-4" />;
      case 'conversion': return <TrendingUp className="w-4 h-4" />;
      case 'accessibility': return <CheckCircle className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const unappliedOptimizations = optimizations.filter(opt => !opt.applied);
  const potentialImprovement = Math.round(
    unappliedOptimizations.reduce((acc, opt) => acc + opt.improvement, 0) / unappliedOptimizations.length
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            محسن المحتوى بالذكاء الاصطناعي
            {isAnalyzing && <RefreshCw className="w-4 h-4 animate-spin" />}
          </CardTitle>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={performAIAnalysis}
              disabled={isAnalyzing}
            >
              <Brain className="w-4 h-4 mr-2" />
              {isAnalyzing ? 'جاري التحليل...' : 'تحليل جديد'}
            </Button>
            
            {unappliedOptimizations.length > 0 && (
              <Button 
                size="sm"
                onClick={applyAllOptimizations}
              >
                <Wand2 className="w-4 h-4 mr-2" />
                تطبيق الكل ({unappliedOptimizations.length})
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs defaultValue="optimizations" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="optimizations">التحسينات</TabsTrigger>
            <TabsTrigger value="insights">رؤى الذكاء الاصطناعي</TabsTrigger>
            <TabsTrigger value="performance">الأداء</TabsTrigger>
          </TabsList>

          {/* تبويب التحسينات */}
          <TabsContent value="optimizations" className="space-y-4">
            {/* نظرة عامة */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{overallScore}/100</div>
                  <div className="text-sm text-gray-600">النتيجة الحالية</div>
                  <Progress value={overallScore} className="mt-2" />
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+{potentialImprovement}%</div>
                  <div className="text-sm text-gray-600">تحسين محتمل</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {unappliedOptimizations.length} تحسين متاح
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {optimizations.filter(opt => opt.applied).length}
                  </div>
                  <div className="text-sm text-gray-600">تم تطبيقه</div>
                  <div className="text-xs text-gray-500 mt-1">
                    من أصل {optimizations.length}
                  </div>
                </div>
              </Card>
            </div>

            {/* قائمة التحسينات */}
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {optimizations.map((optimization) => (
                  <Card key={optimization.id} className={`border ${optimization.applied ? 'bg-green-50 border-green-200' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`p-2 rounded-lg ${optimization.applied ? 'bg-green-100' : 'bg-gray-100'}`}>
                            {optimization.applied ? 
                              <CheckCircle className="w-4 h-4 text-green-600" /> :
                              getTypeIcon(optimization.type)
                            }
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium">{optimization.title}</h3>
                              
                              <Badge className={getImpactColor(optimization.impact)}>
                                {optimization.impact === 'high' ? 'تأثير عالي' :
                                 optimization.impact === 'medium' ? 'تأثير متوسط' : 'تأثير منخفض'}
                              </Badge>
                              
                              <Badge className={getEffortColor(optimization.effort)}>
                                {optimization.effort === 'easy' ? 'سهل' :
                                 optimization.effort === 'medium' ? 'متوسط' : 'صعب'}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-3">{optimization.description}</p>
                            
                            <div className="flex items-center gap-4 mb-3">
                              <div className="text-sm">
                                <span className="text-gray-500">الحالي:</span>
                                <span className="font-medium ml-1">{optimization.currentScore}%</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-500">محسن:</span>
                                <span className="font-medium text-green-600 ml-1">{optimization.optimizedScore}%</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-500">تحسين:</span>
                                <span className="font-medium text-blue-600 ml-1">+{optimization.improvement}%</span>
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                              <Lightbulb className="w-4 h-4 inline mr-2" />
                              {optimization.action}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          {!optimization.applied ? (
                            <Button
                              size="sm"
                              onClick={() => applyOptimization(optimization)}
                            >
                              <Sparkles className="w-4 h-4 mr-2" />
                              تطبيق
                            </Button>
                          ) : (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              مطبق
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* تبويب الرؤى */}
          <TabsContent value="insights" className="space-y-4">
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <Alert key={index}>
                    <Brain className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{insight.category}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            ثقة: {insight.confidence}%
                          </Badge>
                          <Badge variant={insight.priority >= 8 ? 'destructive' : insight.priority >= 6 ? 'default' : 'secondary'}>
                            أولوية: {insight.priority}/10
                          </Badge>
                        </div>
                      </div>
                      
                      <AlertDescription className="mb-2">
                        <strong>الملاحظة:</strong> {insight.insight}
                      </AlertDescription>
                      
                      <AlertDescription>
                        <strong>التوصية:</strong> {insight.recommendation}
                      </AlertDescription>
                    </div>
                  </Alert>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* تبويب الأداء */}
          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {optimizations.map((opt) => (
                <Card key={opt.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      {getTypeIcon(opt.type)}
                      <h3 className="font-medium text-sm">{opt.title}</h3>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>التقدم</span>
                        <span>{opt.applied ? opt.optimizedScore : opt.currentScore}%</span>
                      </div>
                      <Progress 
                        value={opt.applied ? opt.optimizedScore : opt.currentScore} 
                        className="h-2"
                      />
                      {!opt.applied && (
                        <div className="text-xs text-gray-500">
                          إمكانية تحسين: +{opt.improvement}%
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIContentOptimizer;