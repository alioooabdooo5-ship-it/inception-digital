import React from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Calendar, User, Clock, ArrowRight, BookOpen, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/common/AnimatedSection";
import type { Article } from "@shared/schema";

const FeaturedArticles = () => {
  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  // فلترة المقالات المميزة وأحدث المقالات
  const featuredArticles = articles.filter(article => article.featured);
  const recentArticles = articles
    .filter(article => !article.featured)
    .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
    .slice(0, 3);

  if (isLoading || (featuredArticles.length === 0 && recentArticles.length === 0)) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50/50 via-white to-inception-purple/5 relative overflow-hidden">
      {/* خلفية ديكوراتيف */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-inception-orange/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-inception-purple/10 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* رأس القسم */}
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-6 h-6 text-inception-orange ml-3" />
            <span className="text-inception-orange font-semibold">مقالات ونصائح</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-inception-purple mb-6">
            آخر المقالات
            <span className="block text-xl md:text-2xl bg-gradient-to-r from-inception-purple to-inception-orange bg-clip-text text-transparent">
              والنصائح التسويقية
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            ابق محدثاً مع أحدث الاستراتيجيات والتقنيات في عالم التسويق الرقمي
          </p>
        </AnimatedSection>

        {/* المقال المميز */}
        {featuredArticles.length > 0 && (
          <AnimatedSection className="mb-16">
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                <div className="relative overflow-hidden order-2 lg:order-1">
                  <div className="absolute top-6 right-6 z-10">
                    <span className="bg-inception-orange text-white px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                      <Star className="w-4 h-4 ml-2" />
                      مقال مميز
                    </span>
                  </div>
                  <img 
                    src={featuredArticles[0].image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'}
                    alt={featuredArticles[0].title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2">
                  <div className="mb-4">
                    <Badge variant="secondary" className="bg-inception-purple/10 text-inception-purple border-0">
                      {featuredArticles[0].categoryName || 'تسويق رقمي'}
                    </Badge>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-inception-purple mb-6 leading-tight">
                    {featuredArticles[0].title}
                  </h3>
                  <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                    {featuredArticles[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-8 text-sm text-gray-500">
                    <div className="flex items-center space-x-6 space-x-reverse">
                      <div className="flex items-center">
                        <User className="w-4 h-4 ml-2" />
                        {featuredArticles[0].author || 'فريق إنسيبشن'}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 ml-2" />
                        {featuredArticles[0].createdAt ? new Date(featuredArticles[0].createdAt).toLocaleDateString('ar-EG') : 'حديث'}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 ml-2" />
                        {featuredArticles[0].readTime || '5 دقائق'}
                      </div>
                    </div>
                  </div>
                  <Link 
                    to={`/articles/${featuredArticles[0].id}`}
                    className="inline-flex items-center bg-inception-purple text-white px-8 py-4 rounded-xl font-semibold hover:bg-inception-purple/90 transition-all duration-300 hover:shadow-lg group w-fit"
                  >
                    <span className="ml-3">اقرأ المقال كاملاً</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* أحدث المقالات */}
        {recentArticles.length > 0 && (
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {recentArticles.map((article, index) => (
                <div 
                  key={article.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={article.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-inception-purple/90 text-white border-0 text-xs">
                        {article.categoryName || 'نصائح'}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <div className="flex items-center text-xs text-gray-600">
                        <TrendingUp className="w-3 h-3 ml-1" />
                        {article.views || Math.floor(Math.random() * 1000) + 100} مشاهدة
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-inception-purple mb-3 group-hover:text-inception-orange transition-colors leading-tight line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 ml-1" />
                        {article.author || 'إنسيبشن'}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 ml-1" />
                        {article.readTime || '3 دقائق'}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {article.createdAt ? new Date(article.createdAt).toLocaleDateString('ar-EG') : 'حديث'}
                      </span>
                      <Link 
                        to={`/articles/${article.id}`}
                        className="inline-flex items-center text-inception-purple hover:text-inception-orange font-semibold transition-colors group/link text-sm"
                      >
                        <span className="ml-1">اقرأ المزيد</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* زر عرض المزيد */}
            <div className="text-center">
              <Link to="/articles">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-inception-purple to-inception-orange hover:from-inception-purple/90 hover:to-inception-orange/90 text-white px-12 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <BookOpen className="w-5 h-5 ml-3" />
                  عرض جميع المقالات
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default FeaturedArticles;