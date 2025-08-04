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

        {/* المقالات المميزة */}
        {featuredArticles.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4 md:px-6">
              <AnimatedSection>
                <h2 className="text-3xl font-bold text-inception-purple mb-8 flex items-center">
                  <Star className="w-6 h-6 ml-3 text-inception-orange" />
                  المقالات المميزة
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredArticles.slice(0, 2).map((article) => (
                    <Card key={article.id} className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={article.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-inception-orange text-white">
                            <Star className="w-3 h-3 ml-1" />
                            مميز
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <Badge variant="secondary" className="bg-inception-purple/10 text-inception-purple">
                            {article.categoryName || 'تسويق رقمي'}
                          </Badge>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-inception-purple mb-4 group-hover:text-inception-orange transition-colors">
                          {article.title}
                        </h3>
                        
                        <p className="text-gray-700 mb-6 leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                          <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="flex items-center">
                              <User className="w-4 h-4 ml-1" />
                              {article.author || 'فريق إنسيبشن'}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 ml-1" />
                              {article.readTime || '5 دقائق'}
                            </div>
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 ml-1" />
                              {article.views || 0}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 ml-1" />
                            {new Date(article.createdAt || Date.now()).toLocaleDateString('ar-EG')}
                          </div>
                        </div>
                        
                        <Link to={`/articles/${article.id}`}>
                          <Button className="w-full bg-inception-purple hover:bg-inception-purple/90 group/btn">
                            <span className="ml-2">اقرأ المقال كاملاً</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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
                <div className="space-y-8">
                  {regularArticles.map((article) => (
                    <Link key={article.id} to={`/articles/${article.id}`} className="block">
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                        <div className="flex flex-col md:flex-row">
                          {/* صورة المقال */}
                          <div className="md:w-1/3 relative h-64 md:h-48 overflow-hidden">
                            <img 
                              src={article.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-inception-orange text-white text-xs">
                                {article.categoryName || 'مقالات تقنية'}
                              </Badge>
                            </div>
                          </div>
                          
                          {/* محتوى المقال */}
                          <CardContent className="md:w-2/3 p-6 flex flex-col justify-between">
                            <div>
                              <h3 className="text-2xl font-bold text-inception-purple mb-3 group-hover:text-inception-orange transition-colors duration-300 line-clamp-2">
                                {article.title}
                              </h3>
                              
                              <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 text-base">
                                {article.excerpt || 'اكتشف أحدث الاستراتيجيات والنصائح في عالم التسويق الرقمي والتطوير التقني من خبراء إنسيبشن'}
                              </p>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center space-x-4 space-x-reverse">
                                <div className="flex items-center">
                                  <User className="w-4 h-4 ml-1" />
                                  <span>{article.author || 'فريق إنسيبشن'}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 ml-1" />
                                  <span>{article.readTime || '5 دقائق قراءة'}</span>
                                </div>
                                <div className="flex items-center">
                                  <Eye className="w-4 h-4 ml-1" />
                                  <span>{article.views || Math.floor(Math.random() * 1000) + 100} مشاهدة</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center text-inception-purple group-hover:text-inception-orange transition-colors">
                                <span className="ml-2 font-medium">تفاصيل المقال</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Articles;