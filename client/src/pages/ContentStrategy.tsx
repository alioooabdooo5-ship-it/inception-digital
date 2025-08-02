import React from "react";
import { BookOpen, Target, Users, BarChart3, Calendar, Lightbulb, TrendingUp, CheckCircle, Edit, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import AnimatedSection from "@/components/common/AnimatedSection";

const ContentStrategy = () => {
  const contentPillars = [
    {
      title: "المحتوى التعليمي",
      description: "دروس ومقالات تعليمية متخصصة",
      percentage: 40,
      color: "bg-blue-500",
      examples: ["دليل SEO الشامل", "أساسيات التسويق الرقمي", "تحليل البيانات"]
    },
    {
      title: "المحتوى الترويجي", 
      description: "محتوى يروج للخدمات والمنتجات",
      percentage: 20,
      color: "bg-green-500",
      examples: ["دراسات حالة", "قصص نجاح العملاء", "عروض الخدمات"]
    },
    {
      title: "المحتوى التفاعلي",
      description: "محتوى يشجع على التفاعل والمشاركة",
      percentage: 25,
      color: "bg-purple-500", 
      examples: ["استطلاعات الرأي", "أسئلة وأجوبة", "مسابقات"]
    },
    {
      title: "المحتوى الترفيهي",
      description: "محتوى خفيف ومسلي",
      percentage: 15,
      color: "bg-orange-500",
      examples: ["نصائح سريعة", "حقائق مثيرة", "محتوى وراء الكواليس"]
    }
  ];

  const contentCalendar = [
    { day: "الأحد", type: "تعليمي", topic: "مقال متخصص", status: "منشور" },
    { day: "الاثنين", type: "تفاعلي", topic: "سؤال للجمهور", status: "مجدول" },
    { day: "الثلاثاء", type: "ترويجي", topic: "دراسة حالة", status: "مسودة" },
    { day: "الأربعاء", type: "تعليمي", topic: "نصائح سريعة", status: "مجدول" },
    { day: "الخميس", type: "ترفيهي", topic: "وراء الكواليس", status: "فكرة" },
    { day: "الجمعة", type: "تفاعلي", topic: "ملخص الأسبوع", status: "مجدول" },
    { day: "السبت", type: "ترويجي", topic: "عرض خاص", status: "فكرة" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta Tags */}
      <title>استراتيجية المحتوى الرقمي - دليل شامل لبناء محتوى فعال | خبير تسويق</title>
      <meta name="description" content="تعلم كيفية بناء استراتيجية محتوى رقمي فعالة تجذب العملاء وتزيد المبيعات. دليل شامل مع أمثلة عملية وقوالب جاهزة للاستخدام." />
      <meta name="keywords" content="استراتيجية المحتوى, تسويق المحتوى, المحتوى الرقمي, تخطيط المحتوى, تقويم المحتوى, انتاج المحتوى" />
      <link rel="canonical" href="https://yoursite.com/content-strategy" />
      
      {/* Open Graph */}
      <meta property="og:title" content="استراتيجية المحتوى الرقمي - دليل شامل لبناء محتوى فعال" />
      <meta property="og:description" content="تعلم بناء استراتيجية محتوى تجذب العملاء وتحقق النتائج المرجوة" />
      <meta property="og:image" content="/content-strategy-guide.jpg" />
      <meta property="og:type" content="article" />
      
      {/* Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "استراتيجية المحتوى الرقمي - دليل شامل لبناء محتوى فعال",
          "description": "دليل شامل لبناء استراتيجية محتوى رقمي فعالة",
          "author": {
            "@type": "Person",
            "name": "خبير التسويق الرقمي"
          },
          "datePublished": "2024-01-01",
          "dateModified": "2024-08-02",
          "image": "/content-strategy-guide.jpg"
        })}
      </script>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-secondary/10 to-background">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                <BookOpen className="w-4 h-4 ml-2" />
                استراتيجية المحتوى
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
                بناء استراتيجية محتوى تجذب العملاء
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                دليل شامل لإنشاء وتنفيذ استراتيجية محتوى رقمي فعالة تحقق أهدافك التسويقية وتبني علاقة قوية مع جمهورك
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Target className="w-5 h-5 ml-2" />
                  ابدأ بناء استراتيجيتك
                </Button>
                <Button size="lg" variant="outline">
                  <Calendar className="w-5 h-5 ml-2" />
                  حمّل قالب التخطيط
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Pillars */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-primary">أركان استراتيجية المحتوى</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                تقسيم المحتوى وفقاً لقاعدة 80/20 لضمان التوازن بين القيمة والترويج
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contentPillars.map((pillar, index) => (
              <AnimatedSection key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{pillar.title}</CardTitle>
                      <Badge variant="secondary">{pillar.percentage}%</Badge>
                    </div>
                    <Progress value={pillar.percentage} className="h-2" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{pillar.description}</p>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">أمثلة:</h4>
                      <ul className="text-xs space-y-1">
                        {pillar.examples.map((example, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Content Calendar */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-primary">تقويم المحتوى الأسبوعي</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                نموذج لتنظيم وجدولة المحتوى على مدار الأسبوع
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  خطة المحتوى الأسبوعية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                  {contentCalendar.map((day, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="text-center">
                        <h3 className="font-semibold">{day.day}</h3>
                        <Badge 
                          variant="outline" 
                          className={`mt-1 ${
                            day.type === 'تعليمي' ? 'border-blue-200 text-blue-700' :
                            day.type === 'ترويجي' ? 'border-green-200 text-green-700' :
                            day.type === 'تفاعلي' ? 'border-purple-200 text-purple-700' :
                            'border-orange-200 text-orange-700'
                          }`}
                        >
                          {day.type}
                        </Badge>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm font-medium">{day.topic}</p>
                        <Badge 
                          variant={
                            day.status === 'منشور' ? 'default' :
                            day.status === 'مجدول' ? 'secondary' :
                            day.status === 'مسودة' ? 'outline' : 'destructive'
                          }
                          className="mt-2 text-xs"
                        >
                          {day.status}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-center gap-1">
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Strategy Steps */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-primary">خطوات بناء استراتيجية المحتوى</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                عملية منهجية لبناء استراتيجية محتوى ناجحة ومؤثرة
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "تحديد الأهداف والجمهور المستهدف",
                  description: "حدد أهدافك التسويقية بوضوح واعرف جمهورك جيداً",
                  icon: Target,
                  details: ["تحليل الجمهور المستهدف", "وضع أهداف SMART", "تحديد مقاييس النجاح"]
                },
                {
                  step: 2,
                  title: "تحليل المنافسين والسوق",
                  description: "ادرس ما يفعله منافسوك واكتشف الفرص المتاحة",
                  icon: BarChart3,
                  details: ["تحليل محتوى المنافسين", "تحديد الفجوات في السوق", "دراسة الاتجاهات الحالية"]
                },
                {
                  step: 3,
                  title: "إنشاء خطة المحتوى",
                  description: "ضع خطة شاملة للمحتوى مع جدولة زمنية واضحة",
                  icon: Calendar,
                  details: ["إنشاء تقويم المحتوى", "تحديد أنواع المحتوى", "تخصيص الموارد"]
                },
                {
                  step: 4,
                  title: "إنتاج ونشر المحتوى",
                  description: "أنتج محتوى عالي الجودة وانشره وفقاً للخطة",
                  icon: Edit,
                  details: ["كتابة المحتوى", "تصميم العناصر البصرية", "جدولة النشر"]
                },
                {
                  step: 5,
                  title: "قياس الأداء والتحسين",
                  description: "راقب النتائج وحسّن استراتيجيتك باستمرار",
                  icon: TrendingUp,
                  details: ["تتبع المقاييس الرئيسية", "تحليل الأداء", "تحسين الاستراتيجية"]
                }
              ].map((step, index) => (
                <AnimatedSection key={index}>
                  <Card className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">{step.step}</span>
                    </div>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                          <p className="text-muted-foreground mb-4">{step.description}</p>
                          <div className="grid md:grid-cols-3 gap-2">
                            {step.details.map((detail, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                {detail}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">هل تريد بناء استراتيجية محتوى احترافية؟</h2>
              <p className="text-xl text-muted-foreground mb-8">
                احصل على استشارة مجانية وخطة محتوى مخصصة لعملك
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Users className="w-5 h-5 ml-2" />
                  احجز استشارة مجانية
                </Button>
                <Button size="lg" variant="outline">
                  <BookOpen className="w-5 h-5 ml-2" />
                  حمّل دليل المحتوى PDF
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* HowTo Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "كيفية بناء استراتيجية محتوى فعالة",
          "description": "دليل خطوة بخطوة لبناء استراتيجية محتوى رقمي ناجحة",
          "image": "/content-strategy-guide.jpg",
          "supply": [
            {
              "@type": "HowToSupply",
              "name": "فريق المحتوى"
            },
            {
              "@type": "HowToSupply", 
              "name": "أدوات التحليل"
            }
          ],
          "step": [
            {
              "@type": "HowToStep",
              "name": "تحديد الأهداف والجمهور",
              "text": "حدد أهدافك التسويقية بوضوح واعرف جمهورك المستهدف جيداً",
              "image": "/step1.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "تحليل المنافسين والسوق",
              "text": "ادرس ما يفعله منافسوك واكتشف الفرص المتاحة في السوق",
              "image": "/step2.jpg"
            }
          ]
        })}
      </script>
    </div>
  );
};

export default ContentStrategy;