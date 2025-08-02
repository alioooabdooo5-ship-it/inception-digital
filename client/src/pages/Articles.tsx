import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Search,
  Filter,
  BookOpen,
  TrendingUp,
  Star
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: "all", name: "جميع المقالات", count: 24 },
    { id: "digital-marketing", name: "التسويق الرقمي", count: 8 },
    { id: "seo", name: "تحسين محركات البحث", count: 6 },
    { id: "social-media", name: "وسائل التواصل الاجتماعي", count: 5 },
    { id: "web-development", name: "تطوير المواقع", count: 5 }
  ];

  const articles = [
    {
      id: 1,
      title: "كيفية تحسين ترتيب موقعك في جوجل خلال 30 يوم",
      excerpt: "دليل شامل لتحسين محركات البحث وزيادة ظهور موقعك في النتائج الأولى لجوجل",
      category: "seo",
      categoryName: "تحسين محركات البحث",
      author: "أحمد محمد",
      date: "2024-01-15",
      readTime: "8 دقائق",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      featured: true,
      views: 1250
    },
    {
      id: 2,
      title: "استراتيجيات التسويق عبر السوشيال ميديا لعام 2024",
      excerpt: "أحدث اتجاهات التسويق على منصات التواصل الاجتماعي وكيفية الاستفادة منها",
      category: "social-media",
      categoryName: "وسائل التواصل الاجتماعي",
      author: "سارة أحمد",
      date: "2024-01-12",
      readTime: "6 دقائق",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      featured: false,
      views: 890
    },
    {
      id: 3,
      title: "بناء موقع إلكتروني احترافي: الدليل الكامل",
      excerpt: "خطوات عملية لبناء موقع إلكتروني يحقق أهدافك التجارية ويجذب العملاء",
      category: "web-development",
      categoryName: "تطوير المواقع",
      author: "محمد علي",
      date: "2024-01-10",
      readTime: "12 دقيقة",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      featured: false,
      views: 1100
    },
    {
      id: 4,
      title: "كيفية قياس نجاح حملاتك الإعلانية الرقمية",
      excerpt: "المؤشرات المهمة والأدوات اللازمة لقياس أداء حملاتك التسويقية",
      category: "digital-marketing",
      categoryName: "التسويق الرقمي",
      author: "فاطمة حسن",
      date: "2024-01-08",
      readTime: "10 دقائق",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      featured: false,
      views: 756
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.includes(searchQuery) || article.excerpt.includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-inception-purple/5">
      <Header />
      
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-inception-purple/5 via-transparent to-inception-orange/5" />
          <div className="absolute top-20 left-20 w-96 h-96 bg-inception-purple/10 rounded-full blur-3xl animate-pulse" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSection className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-inception-orange ml-3" />
                <span className="text-inception-orange font-semibold">مقالات تعليمية</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-inception-purple mb-6 leading-tight">
                مكتبة المعرفة
                <span className="block text-3xl md:text-4xl bg-gradient-to-r from-inception-purple to-inception-orange bg-clip-text text-transparent">
                  التسويقية
                </span>
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10">
                اكتشف أحدث الاستراتيجيات والنصائح في عالم التسويق الرقمي من خلال مقالاتنا المتخصصة
              </p>
              
              {/* Search Bar */}
              <div className="max-w-lg mx-auto relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="ابحث في المقالات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-12 h-14 rounded-xl border-2 border-gray-200 focus:border-inception-purple"
                />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="pb-10">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-full transition-all duration-300 ${
                      selectedCategory === category.id 
                        ? "bg-inception-purple hover:bg-inception-purple/90 text-white" 
                        : "hover:bg-inception-purple/10 border-inception-purple/20"
                    }`}
                  >
                    {category.name}
                    <span className="mr-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </Button>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Featured Article */}
        {featuredArticle && selectedCategory === "all" && (
          <section className="pb-20">
            <div className="container mx-auto px-4 md:px-6">
              <AnimatedSection>
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                    <div className="relative overflow-hidden">
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-inception-orange text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                          <Star className="w-4 h-4 ml-1" />
                          مقال مميز
                        </span>
                      </div>
                      <img 
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="mb-4">
                        <span className="text-inception-orange font-semibold text-sm">
                          {featuredArticle.categoryName}
                        </span>
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-inception-purple mb-4 leading-tight">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <div className="flex items-center">
                            <User className="w-4 h-4 ml-1" />
                            {featuredArticle.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 ml-1" />
                            {new Date(featuredArticle.date).toLocaleDateString('ar-EG')}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 ml-1" />
                            {featuredArticle.readTime}
                          </div>
                        </div>
                      </div>
                      <Link 
                        to={`/articles/${featuredArticle.id}`}
                        className="inline-flex items-center text-inception-purple hover:text-inception-orange font-semibold transition-colors group"
                      >
                        <span className="ml-2">اقرأ المقال كاملاً</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="pb-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article, index) => (
                <AnimatedSection 
                  key={article.id}
                  variant="fade-in" 
                  delay={index * 100}
                  className="group"
                >
                  <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-inception-purple/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {article.categoryName}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <div className="flex items-center text-xs text-gray-600">
                          <TrendingUp className="w-3 h-3 ml-1" />
                          {article.views} مشاهدة
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-inception-purple mb-3 group-hover:text-inception-orange transition-colors leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 ml-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 ml-1" />
                          {article.readTime}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(article.date).toLocaleDateString('ar-EG')}
                        </span>
                        <Link 
                          to={`/articles/${article.id}`}
                          className="inline-flex items-center text-inception-purple hover:text-inception-orange font-semibold transition-colors group/link"
                        >
                          <span className="ml-1">اقرأ المزيد</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="pb-20">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <div className="bg-gradient-to-r from-inception-purple to-inception-orange rounded-3xl p-12 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
                
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    اشترك في النشرة الإخبارية
                  </h3>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    احصل على أحدث المقالات والنصائح التسويقية مباشرة في بريدك الإلكتروني
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <Input 
                      placeholder="بريدك الإلكتروني"
                      className="flex-1 h-12 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    />
                    <Button className="bg-white text-inception-purple hover:bg-gray-100 h-12 px-8">
                      اشترك الآن
                    </Button>
                  </div>
                </div>
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