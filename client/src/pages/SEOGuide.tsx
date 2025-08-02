import React from "react";
import { Search, Target, TrendingUp, Globe, Users, BarChart3, Lightbulb, CheckCircle, ExternalLink, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AnimatedSection from "@/components/common/AnimatedSection";

const SEOGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta Tags */}
      <title>دليل SEO الشامل - تحسين محركات البحث للمواقع العربية | خبير تسويق رقمي</title>
      <meta name="description" content="دليل شامل لتحسين محركات البحث (SEO) للمواقع العربية. تعلم أفضل استراتيجيات SEO وتقنيات تحسين المحتوى للحصول على ترتيب أفضل في Google." />
      <meta name="keywords" content="SEO, تحسين محركات البحث, SEO العربي, تسويق رقمي, Google, ترتيب المواقع, كلمات مفتاحية" />
      <meta name="author" content="خبير التسويق الرقمي" />
      <link rel="canonical" href="https://yoursite.com/seo-guide" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content="دليل SEO الشامل - تحسين محركات البحث للمواقع العربية" />
      <meta property="og:description" content="دليل شامل لتحسين محركات البحث مع استراتيجيات متقدمة ونصائح عملية للمواقع العربية" />
      <meta property="og:image" content="/seo-guide-cover.jpg" />
      <meta property="og:url" content="https://yoursite.com/seo-guide" />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="خبير التسويق الرقمي" />
      <meta property="og:locale" content="ar_AR" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="دليل SEO الشامل للمواقع العربية" />
      <meta name="twitter:description" content="تعلم تحسين محركات البحث مع دليل شامل ونصائح متقدمة" />
      <meta name="twitter:image" content="/seo-guide-cover.jpg" />
      
      {/* Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "دليل SEO الشامل - تحسين محركات البحث للمواقع العربية",
          "description": "دليل شامل لتحسين محركات البحث مع استراتيجيات متقدمة ونصائح عملية للمواقع العربية",
          "author": {
            "@type": "Person",
            "name": "خبير التسويق الرقمي"
          },
          "publisher": {
            "@type": "Organization",
            "name": "خبير التسويق الرقمي",
            "logo": {
              "@type": "ImageObject",
              "url": "/logo.png"
            }
          },
          "datePublished": "2024-01-01",
          "dateModified": "2024-08-02",
          "image": "/seo-guide-cover.jpg",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://yoursite.com/seo-guide"
          }
        })}
      </script>

      {/* Breadcrumbs Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "الرئيسية",
              "item": "https://yoursite.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "الخدمات",
              "item": "https://yoursite.com/services"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "دليل SEO الشامل",
              "item": "https://yoursite.com/seo-guide"
            }
          ]
        })}
      </script>

      {/* Hero Section with H1 */}
      <section className="relative py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                <Search className="w-4 h-4 ml-2" />
                دليل SEO متقدم
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-l from-primary to-primary/60 bg-clip-text text-transparent">
                دليل SEO الشامل لتحسين محركات البحث
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                تعلم أحدث استراتيجيات تحسين محركات البحث واكتشف كيفية تحسين موقعك للوصول إلى الصفحة الأولى في Google
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <BookOpen className="w-5 h-5 ml-2" />
                  ابدأ التعلم الآن
                </Button>
                <Button size="lg" variant="outline">
                  <ExternalLink className="w-5 h-5 ml-2" />
                  تحليل موقعك مجاناً
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">
                  <h2 className="text-3xl font-bold text-primary">محتويات الدليل</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: "أساسيات SEO", icon: Search, description: "فهم مبادئ تحسين محركات البحث" },
                    { title: "البحث عن الكلمات المفتاحية", icon: Target, description: "كيفية العثور على أفضل الكلمات المفتاحية" },
                    { title: "تحسين المحتوى", icon: BookOpen, description: "استراتيجيات كتابة محتوى محسّن للSEO" },
                    { title: "التحليل والقياس", icon: BarChart3, description: "أدوات وطرق قياس نجاح SEO" },
                    { title: "SEO المحلي", icon: Globe, description: "تحسين الظهور في البحث المحلي" },
                    { title: "السيو التقني", icon: TrendingUp, description: "الجوانب التقنية لتحسين المواقع" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-background border">
                      <item.icon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Section 1: SEO Basics */}
            <AnimatedSection>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                      <Search className="w-6 h-6" />
                      أساسيات تحسين محركات البحث (SEO)
                    </h2>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    تحسين محركات البحث (SEO) هو عملية تحسين موقعك الإلكتروني ليحتل مرتبة أعلى في نتائج البحث الطبيعية. 
                    يتضمن ذلك تحسين المحتوى والهيكل التقني والعوامل الخارجية للموقع.
                  </p>
                  
                  <h3 className="text-xl font-semibold">العوامل الرئيسية للSEO:</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { title: "المحتوى", description: "محتوى عالي الجودة ومفيد للمستخدمين" },
                      { title: "التقنية", description: "سرعة الموقع وسهولة التنقل" },
                      { title: "الروابط", description: "روابط داخلية وخارجية عالية الجودة" }
                    ].map((factor, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">{factor.title}</h4>
                        <p className="text-sm text-muted-foreground">{factor.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Section 2: Keyword Research */}
            <AnimatedSection>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                      <Target className="w-6 h-6" />
                      البحث عن الكلمات المفتاحية
                    </h2>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    البحث عن الكلمات المفتاحية هو أساس أي استراتيجية SEO ناجحة. يجب فهم ما يبحث عنه جمهورك المستهدف.
                  </p>
                  
                  <h3 className="text-xl font-semibold">خطوات البحث عن الكلمات المفتاحية:</h3>
                  <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                    <li>تحديد الموضوعات الرئيسية لموقعك</li>
                    <li>استخدام أدوات البحث مثل Google Keyword Planner</li>
                    <li>تحليل المنافسين ومعرفة كلماتهم المفتاحية</li>
                    <li>اختيار الكلمات حسب معدل البحث والمنافسة</li>
                  </ol>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                      نصيحة مهمة
                    </h4>
                    <p className="text-sm">
                      ركز على الكلمات المفتاحية طويلة الذيل (Long-tail keywords) لأنها أقل منافسة وأكثر استهدافاً.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* FAQ Section */}
            <AnimatedSection>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h2 className="text-2xl font-bold text-primary">الأسئلة الشائعة حول SEO</h2>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        question: "كم من الوقت يحتاج SEO لإظهار النتائج؟",
                        answer: "عادة ما يحتاج SEO من 3 إلى 6 أشهر لإظهار نتائج ملموسة، حسب مستوى المنافسة وحالة الموقع الحالية."
                      },
                      {
                        question: "ما هي أهم العوامل في ترتيب Google؟",
                        answer: "جودة المحتوى، سرعة الموقع، التوافق مع الجوال، الروابط الخارجية عالية الجودة، وتجربة المستخدم."
                      },
                      {
                        question: "هل يمكنني تعلم SEO بنفسي؟",
                        answer: "نعم، يمكن تعلم أساسيات SEO من خلال الموارد المجانية، لكن الخبرة العملية والتطبيق المستمر ضروريان للإتقان."
                      }
                    ].map((faq, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0">
                        <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">هل تريد تحسين موقعك الآن؟</h2>
              <p className="text-xl text-muted-foreground mb-8">
                احصل على استشارة مجانية وتحليل شامل لموقعك الإلكتروني
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Users className="w-5 h-5 ml-2" />
                احجز استشارة مجانية
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Schema for Featured Snippets */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "كم من الوقت يحتاج SEO لإظهار النتائج؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "عادة ما يحتاج SEO من 3 إلى 6 أشهر لإظهار نتائج ملموسة، حسب مستوى المنافسة وحالة الموقع الحالية."
              }
            },
            {
              "@type": "Question", 
              "name": "ما هي أهم العوامل في ترتيب Google؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "جودة المحتوى، سرعة الموقع، التوافق مع الجوال، الروابط الخارجية عالية الجودة، وتجربة المستخدم."
              }
            }
          ]
        })}
      </script>
    </div>
  );
};

export default SEOGuide;