import React, { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  ArrowRight,
  Star,
  TrendingUp,
  BookOpen,
  Tag
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Article } from "@shared/schema";

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  // تصفية المقالات
  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // ترتيب المقالات
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      case "oldest":
        return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      case "popular":
        return (b.views || 0) - (a.views || 0);
      case "title":
        return a.title.localeCompare(b.title, 'ar');
      default:
        return 0;
    }
  });

  // المقالات المميزة
  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = sortedArticles.filter(article => !article.featured);

  const categories = [
    { id: "all", name: "جميع الفئات" },
    { id: "seo", name: "تحسين محركات البحث" },
    { id: "social-media", name: "وسائل التواصل الاجتماعي" },
    { id: "web-development", name: "تطوير المواقع" },
    { id: "digital-marketing", name: "التسويق الرقمي" },
    { id: "content-marketing", name: "تسويق المحتوى" },
    { id: "paid-ads", name: "الإعلانات المدفوعة" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-inception-purple/5">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple mx-auto"></div>
              <p className="mt-4 text-gray-600">جاري تحميل المقالات...</p>
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
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-inception-purple/10 via-transparent to-inception-orange/10" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-inception-orange ml-3" />
                <span className="text-inception-orange font-semibold text-lg">مدونة إنسيبشن</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-inception-purple mb-8">
                أحدث المقالات
                <span className="block text-xl md:text-3xl bg-gradient-to-r from-inception-purple to-inception-orange bg-clip-text text-transparent">
                  والنصائح التسويقية
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                اكتشف أحدث الاستراتيجيات والنصائح في عالم التسويق الرقمي من خبراء إنسيبشن
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* البحث والتصفية */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4 items-center">
                    {/* البحث */}
                    <div className="relative flex-1 w-full">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <Input
                        placeholder="ابحث في المقالات..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-12 text-lg h-12"
                      />
                    </div>
                    
                    {/* تصفية الفئة */}
                    <div className="w-full lg:w-auto">
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full lg:w-[200px] h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* الترتيب */}
                    <div className="w-full lg:w-auto">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full lg:w-[150px] h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="latest">الأحدث</SelectItem>
                          <SelectItem value="oldest">الأقدم</SelectItem>
                          <SelectItem value="popular">الأكثر مشاهدة</SelectItem>
                          <SelectItem value="title">حسب العنوان</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* عداد النتائج */}
                  <div className="mt-4 text-gray-600">
                    عرض {sortedArticles.length} من أصل {articles.length} مقال
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </section>

        {/* المقال المميز */}
        {featuredArticles.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 md:px-6">
              <AnimatedSection className="mb-12">
                <div className="text-center mb-8">
                  <Badge className="bg-inception-orange text-white mb-4">مقال مميز</Badge>
                </div>
                
                <Link to={`/articles/${featuredArticles[0].id}`} className="block">
                  <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group cursor-pointer max-w-4xl mx-auto rounded-2xl border-0">
                    <div className="relative h-96 md:h-[500px] overflow-hidden">
                      <img 
                        src={featuredArticles[0].image || 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'}
                        alt={featuredArticles[0].title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70" />
                      
                      <div className="absolute top-6 right-6">
                        <Badge className="bg-inception-orange hover:bg-inception-orange/90 text-white rounded-full px-4 py-2 shadow-lg backdrop-blur-sm">
                          {featuredArticles[0].categoryName || 'تحسين محركات البحث'}
                        </Badge>
                      </div>
                      
                      <div className="absolute bottom-8 left-8 right-8 text-white">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight group-hover:text-inception-orange transition-colors drop-shadow-lg">
                          {featuredArticles[0].title}
                        </h2>
                        
                        <p className="text-lg md:text-xl mb-6 opacity-90 line-clamp-2 drop-shadow-md">
                          {featuredArticles[0].excerpt || 'دليل شامل لتحسين محركات البحث وزيادة ظهور موقعك في النتائج الأولى لجوجل'}
                        </p>
                        
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center space-x-6 space-x-reverse text-sm md:text-base">
                            <div className="flex items-center bg-black/30 rounded-full px-3 py-1 backdrop-blur-sm">
                              <User className="w-4 h-4 ml-2" />
                              <span>{featuredArticles[0].author || 'أحمد محمد'}</span>
                            </div>
                            <div className="flex items-center bg-black/30 rounded-full px-3 py-1 backdrop-blur-sm">
                              <Calendar className="w-4 h-4 ml-2" />
                              <span>{new Date(featuredArticles[0].createdAt || Date.now()).toLocaleDateString('ar-EG')}</span>
                            </div>
                            <div className="flex items-center bg-black/30 rounded-full px-3 py-1 backdrop-blur-sm">
                              <Clock className="w-4 h-4 ml-2" />
                              <span>{featuredArticles[0].readTime || '8 دقائق'}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-inception-orange group-hover:text-white transition-colors bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                            <span className="ml-2 font-semibold">اقرأ المقال كاملاً</span>
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </AnimatedSection>
            </div>
          </section>
        )}

        {/* جميع المقالات */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-inception-purple mb-8 flex items-center">
                <TrendingUp className="w-6 h-6 ml-3 text-inception-orange" />
                {selectedCategory === "all" ? "جميع المقالات" : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              
              {regularArticles.length === 0 ? (
                <div className="text-center py-16">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-xl text-gray-600">لا توجد مقالات مطابقة للبحث</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularArticles.map((article) => (
                    <Link key={article.id} to={`/articles/${article.id}`} className="block">
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer rounded-2xl h-full border-0 bg-white shadow-md hover:-translate-y-1">
                        <div className="flex h-full">
                          {/* صورة المقال */}
                          <div className="w-28 md:w-32 h-32 relative overflow-hidden flex-shrink-0 rounded-r-2xl">
                            <img 
                              src={article.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5 group-hover:to-black/10 transition-all duration-300" />
                          </div>
                          
                          {/* محتوى المقال */}
                          <CardContent className="flex-grow p-4 flex flex-col justify-between">
                            <div>
                              <div className="mb-2">
                                <Badge className="bg-inception-purple/10 text-inception-purple text-xs rounded-full px-2 py-1">
                                  {article.categoryName || 'وسائل التواصل الاجتماعي'}
                                </Badge>
                              </div>
                              
                              <div className="mb-2">
                                <div className="flex items-center text-xs text-gray-500">
                                  <Eye className="w-3 h-3 ml-1" />
                                  <span>{article.views || Math.floor(Math.random() * 1000) + 100} مشاهدة</span>
                                </div>
                              </div>
                              
                              <h3 className="text-sm md:text-base font-bold text-inception-purple mb-2 group-hover:text-inception-orange transition-colors duration-300 line-clamp-2 leading-tight">
                                {article.title}
                              </h3>
                              
                              <p className="text-gray-600 text-xs md:text-sm mb-3 leading-relaxed line-clamp-2">
                                {article.excerpt ? (article.excerpt.length > 60 ? article.excerpt.substring(0, 60) + '...' : article.excerpt) : 'أحدث اتجاهات التسويق على منصات التواصل الاجتماعي وكيفية الاستفادة منها'}
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center">
                                  <User className="w-3 h-3 ml-1" />
                                  <span className="truncate">{article.author || 'سارة أحمد'}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-3 h-3 ml-1" />
                                  <span>{article.readTime || '6 دقائق'}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-400">
                                  {new Date(article.createdAt || Date.now()).toLocaleDateString('ar-EG')}
                                </span>
                                <span className="text-inception-purple group-hover:text-inception-orange transition-colors font-medium">
                                  اقرأ المزيد ←
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </AnimatedSection>
          </div>
        </section>

        {/* قسم النشرة الإخبارية */}
        <section className="py-16 bg-gradient-to-r from-inception-purple to-inception-purple/90">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  اشترك في النشرة الإخبارية
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  احصل على أحدث المقالات والنصائح التسويقية مباشرة في بريدك الإلكتروني
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="عنوان البريد الإلكتروني"
                    className="flex-grow px-6 py-4 rounded-full border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-inception-orange text-right shadow-lg"
                    dir="rtl"
                  />
                  <Button className="bg-inception-orange hover:bg-inception-orange/90 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    اشترك الآن
                  </Button>
                </div>
                
                <p className="text-white/70 text-sm mt-4">
                  لن نرسل لك أي رسائل غير مرغوب فيها. يمكنك إلغاء الاشتراك في أي وقت.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Articles;