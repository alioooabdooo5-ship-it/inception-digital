import React, { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  ArrowLeft,
  Share2,
  BookOpen,
  Eye,
  Heart,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Star,
  TrendingUp
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import type { Article } from "@shared/schema";

const ArticleDetail = () => {
  const params = useParams();
  const id = params.id;
  const [location] = useLocation();
  const { toast } = useToast();

  const { data: article, isLoading, error } = useQuery<Article>({
    queryKey: [`/api/articles/${id}`],
    enabled: !!id
  });

  const { data: relatedArticles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
    select: (articles) => 
      articles
        .filter(a => a.id !== parseInt(id || '0') && a.category === article?.category)
        .slice(0, 3)
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const shareToSocial = (platform: string) => {
    const url = window.location.href;
    const text = article?.title || "";
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "تم النسخ",
      description: "تم نسخ رابط المقال إلى الحافظة",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-inception-purple/5">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple mx-auto"></div>
              <p className="mt-4 text-gray-600">جاري تحميل المقال...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-inception-purple/5">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">المقال غير موجود</h1>
              <p className="text-gray-600 mb-8">عذراً، لم نتمكن من العثور على المقال المطلوب</p>
              <Link to="/articles">
                <Button className="bg-inception-purple hover:bg-inception-purple/90">
                  العودة للمقالات
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-inception-purple/5">
      <Header />
      
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-inception-purple/10 via-transparent to-inception-orange/10" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSection className="max-w-4xl mx-auto">
              {/* التنقل */}
              <nav className="mb-8">
                <Link 
                  to="/articles"
                  className="inline-flex items-center text-inception-purple hover:text-inception-orange transition-colors"
                >
                  <ArrowRight className="w-4 h-4 ml-2" />
                  العودة للمقالات
                </Link>
              </nav>

              {/* تصنيف المقال */}
              <div className="mb-6">
                <Badge className="bg-inception-purple/10 text-inception-purple border-0 text-sm">
                  {article.categoryName || 'تسويق رقمي'}
                </Badge>
                {article.featured && (
                  <Badge className="bg-inception-orange text-white border-0 text-sm mr-2">
                    <Star className="w-3 h-3 ml-1" />
                    مقال مميز
                  </Badge>
                )}
              </div>

              {/* عنوان المقال */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-inception-purple mb-8 leading-tight">
                {article.title}
              </h1>

              {/* معلومات المقال */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center">
                  <User className="w-5 h-5 ml-2" />
                  <span className="font-medium">{article.author || 'فريق إنسيبشن'}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 ml-2" />
                  <span>{new Date(article.createdAt || Date.now()).toLocaleDateString('ar-EG')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 ml-2" />
                  <span>{article.readTime || '5 دقائق'}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-5 h-5 ml-2" />
                  <span>{article.views || 0} مشاهدة</span>
                </div>
              </div>

              {/* الملخص */}
              {article.excerpt && (
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
                  {article.excerpt}
                </p>
              )}

              {/* أزرار المشاركة */}
              <div className="flex items-center space-x-4 space-x-reverse mb-12">
                <span className="text-gray-600 font-medium">شارك المقال:</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => shareToSocial('facebook')}
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => shareToSocial('twitter')}
                  className="text-sky-600 border-sky-200 hover:bg-sky-50"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => shareToSocial('linkedin')}
                  className="text-blue-700 border-blue-200 hover:bg-blue-50"
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={copyToClipboard}
                >
                  <Copy className="w-4 h-4 ml-1" />
                  نسخ الرابط
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* محتوى المقال */}
        <section className="pb-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* المحتوى الرئيسي */}
              <div className="lg:col-span-3">
                <AnimatedSection>
                  <Card className="overflow-hidden shadow-xl">
                    {/* الصورة المميزة */}
                    {article.image && (
                      <div className="relative h-96 overflow-hidden">
                        <img 
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}
                    
                    <CardContent className="p-8 lg:p-12">
                      <article 
                        className="prose prose-lg max-w-none prose-headings:text-inception-purple prose-links:text-inception-orange"
                        dangerouslySetInnerHTML={{ __html: article.content || '' }}
                      />
                      
                      {/* الكلمات المفتاحية */}
                      {(article as any).tags && (article as any).tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-gray-200">
                          <h4 className="text-lg font-semibold text-inception-purple mb-4">الكلمات المفتاحية:</h4>
                          <div className="flex flex-wrap gap-2">
                            {(Array.isArray((article as any).tags) ? (article as any).tags : []).map((tag: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-sm">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>

              {/* الشريط الجانبي */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* مقالات ذات صلة */}
                  {relatedArticles.length > 0 && (
                    <AnimatedSection>
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-inception-purple mb-6 flex items-center">
                            <BookOpen className="w-5 h-5 ml-2" />
                            مقالات ذات صلة
                          </h3>
                          <div className="space-y-4">
                            {relatedArticles.map((relatedArticle) => (
                              <Link 
                                key={relatedArticle.id}
                                to={`/articles/${relatedArticle.id}`}
                                className="block group"
                              >
                                <div className="flex space-x-3 space-x-reverse">
                                  <img 
                                    src={relatedArticle.image || 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80'}
                                    alt={relatedArticle.title}
                                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-sm text-inception-purple group-hover:text-inception-orange transition-colors line-clamp-2 leading-tight">
                                      {relatedArticle.title}
                                    </h4>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                      <Clock className="w-3 h-3 ml-1" />
                                      {relatedArticle.readTime || '3 دقائق'}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedSection>
                  )}

                  {/* إحصائيات المقال */}
                  <AnimatedSection>
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-inception-purple mb-6 flex items-center">
                          <TrendingUp className="w-5 h-5 ml-2" />
                          إحصائيات المقال
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">المشاهدات</span>
                            <span className="font-semibold">{article.views || 0}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">وقت القراءة</span>
                            <span className="font-semibold">{article.readTime || '5 دقائق'}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">تاريخ النشر</span>
                            <span className="font-semibold text-sm">
                              {new Date(article.createdAt || Date.now()).toLocaleDateString('ar-EG')}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>

                  {/* دعوة للعمل */}
                  <AnimatedSection>
                    <Card className="bg-gradient-to-br from-inception-purple to-inception-orange text-white">
                      <CardContent className="p-6 text-center">
                        <h3 className="text-xl font-bold mb-4">تحتاج استشارة تسويقية؟</h3>
                        <p className="text-white/90 mb-6 text-sm leading-relaxed">
                          احصل على استشارة مجانية من خبرائنا لتطوير استراتيجيتك التسويقية
                        </p>
                        <Link to="/contact">
                          <Button 
                            className="bg-white text-inception-purple hover:bg-gray-100 w-full"
                          >
                            احجز استشارتك المجانية
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* دعوة للاشتراك */}
        <section className="pb-20">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <Card className="bg-gradient-to-r from-inception-purple/10 via-white to-inception-orange/10 border-0">
                <CardContent className="p-8 lg:p-12 text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-inception-purple mb-4">
                    لا تفوت المقالات الجديدة
                  </h3>
                  <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                    اشترك في النشرة الإخبارية للحصول على أحدث المقالات والنصائح التسويقية
                  </p>
                  <Link to="/articles">
                    <Button 
                      size="lg"
                      className="bg-inception-purple hover:bg-inception-purple/90 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <BookOpen className="w-5 h-5 ml-3" />
                      تصفح المزيد من المقالات
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;