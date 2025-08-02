import React from "react";
import { TrendingUp, Users, Target, BarChart3, Lightbulb, Share2, MessageCircle, Eye, Clock, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/common/AnimatedSection";

const DigitalMarketingTips = () => {
  const tips = [
    {
      id: 1,
      title: "كيفية زيادة معدل التحويل بنسبة 300%",
      excerpt: "استراتيجيات مجربة لتحويل الزوار إلى عملاء فعليين",
      category: "تحويل العملاء",
      readTime: "5 دقائق",
      publishDate: "2024-08-01",
      views: 1250,
      shares: 89,
      image: "/tips/conversion-rate.jpg",
      author: "خبير التسويق الرقمي"
    },
    {
      id: 2,
      title: "أسرار الإعلانات المدفوعة على فيسبوك",
      excerpt: "تقنيات متقدمة لخفض تكلفة الإعلان وزيادة العائد",
      category: "إعلانات مدفوعة",
      readTime: "7 دقائق", 
      publishDate: "2024-07-28",
      views: 2100,
      shares: 156,
      image: "/tips/facebook-ads.jpg",
      author: "خبير التسويق الرقمي"
    },
    {
      id: 3,
      title: "بناء استراتيجية محتوى تجذب العملاء",
      excerpt: "دليل شامل لإنشاء محتوى يجذب ويحتفظ بالعملاء",
      category: "استراتيجية المحتوى",
      readTime: "6 دقائق",
      publishDate: "2024-07-25",
      views: 1800,
      shares: 234,
      image: "/tips/content-strategy.jpg",
      author: "خبير التسويق الرقمي"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta Tags */}
      <title>نصائح التسويق الرقمي - استراتيجيات وحيل متقدمة | خبير تسويق رقمي</title>
      <meta name="description" content="اكتشف أفضل نصائح التسويق الرقمي لزيادة المبيعات وتحسين ROI. استراتيجيات مجربة في الإعلانات المدفوعة، SEO، ووسائل التواصل الاجتماعي." />
      <meta name="keywords" content="نصائح تسويق رقمي, استراتيجيات تسويق, إعلانات فيسبوك, تسويق محتوى, زيادة المبيعات, ROI" />
      <link rel="canonical" href="https://yoursite.com/digital-marketing-tips" />
      
      {/* Open Graph */}
      <meta property="og:title" content="نصائح التسويق الرقمي - استراتيجيات وحيل متقدمة" />
      <meta property="og:description" content="اكتشف أفضل نصائح التسويق الرقمي لزيادة المبيعات وتحسين العائد على الاستثمار" />
      <meta property="og:image" content="/digital-marketing-tips-cover.jpg" />
      <meta property="og:type" content="website" />
      
      {/* Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "نصائح التسويق الرقمي",
          "description": "أفضل نصائح واستراتيجيات التسويق الرقمي",
          "url": "https://yoursite.com/digital-marketing-tips",
          "author": {
            "@type": "Person",
            "name": "خبير التسويق الرقمي"
          },
          "publisher": {
            "@type": "Organization",
            "name": "خبير التسويق الرقمي"
          }
        })}
      </script>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                <TrendingUp className="w-4 h-4 ml-2" />
                نصائح وحيل متقدمة
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
                نصائح التسويق الرقمي المتقدمة
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                اكتشف أحدث الاستراتيجيات والتقنيات لتطوير أعمالك الرقمية وزيادة عائد الاستثمار
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tips Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatedSection>
                <h2 className="text-3xl font-bold mb-8 text-primary">أحدث النصائح والاستراتيجيات</h2>
              </AnimatedSection>
              
              {tips.map((tip, index) => (
                <AnimatedSection key={tip.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <div className="h-48 md:h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <TrendingUp className="w-12 h-12 text-primary" />
                        </div>
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline">{tip.category}</Badge>
                          <div className="flex items-center text-sm text-muted-foreground gap-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {tip.readTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {tip.views.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Share2 className="w-3 h-3" />
                              {tip.shares}
                            </span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                          <a href={`/tips/${tip.id}`}>{tip.title}</a>
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {tip.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {new Date(tip.publishDate).toLocaleDateString('ar-SA')}
                          </div>
                          <Button variant="outline" size="sm">
                            اقرأ المزيد
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </AnimatedSection>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Categories */}
              <AnimatedSection>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      التصنيفات
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      { name: "تحويل العملاء", count: 12 },
                      { name: "إعلانات مدفوعة", count: 8 },
                      { name: "استراتيجية المحتوى", count: 15 },
                      { name: "وسائل التواصل", count: 10 },
                      { name: "تحليل البيانات", count: 6 }
                    ].map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer">
                        <span>{category.name}</span>
                        <Badge variant="secondary">{category.count}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Popular Tips */}
              <AnimatedSection>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      الأكثر قراءة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { title: "كيفية زيادة معدل التحويل", views: 2500 },
                      { title: "استراتيجيات SEO للمواقع العربية", views: 2100 },
                      { title: "تحسين إعلانات Google Ads", views: 1900 },
                      { title: "بناء علامة تجارية قوية", views: 1750 }
                    ].map((tip, index) => (
                      <div key={index} className="border-b pb-3 last:border-b-0">
                        <h4 className="font-semibold text-sm mb-1 hover:text-primary cursor-pointer">
                          {tip.title}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Eye className="w-3 h-3" />
                          {tip.views.toLocaleString()} مشاهدة
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Newsletter */}
              <AnimatedSection>
                <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-center">
                      <h3 className="text-lg font-bold">اشترك في النشرة الإخبارية</h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                      احصل على أحدث نصائح التسويق الرقمي مباشرة في بريدك الإلكتروني
                    </p>
                    <div className="space-y-2">
                      <input 
                        type="email" 
                        placeholder="بريدك الإلكتروني"
                        className="w-full px-3 py-2 rounded border bg-background"
                      />
                      <Button className="w-full">
                        <MessageCircle className="w-4 h-4 ml-2" />
                        اشترك الآن
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Schema for each article */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": tips.map((tip, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Article",
              "headline": tip.title,
              "description": tip.excerpt,
              "author": {
                "@type": "Person",
                "name": tip.author
              },
              "datePublished": tip.publishDate,
              "image": tip.image,
              "url": `https://yoursite.com/tips/${tip.id}`
            }
          }))
        })}
      </script>
    </div>
  );
};

export default DigitalMarketingTips;