import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Link } from "wouter";
import { 
  ArrowUpRight, 
  Home, 
  ChefHat, 
  Brush, 
  Factory,
  Sparkles,
  TrendingUp,
  Users,
  Target,
  Play,
  ExternalLink
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Industry } from "@shared/schema";

const Industries = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const { data: industries = [], isLoading } = useQuery<Industry[]>({
    queryKey: ['/api/industries']
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Handle fragment navigation
    const { hash } = window.location;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const getIconComponent = (iconName: string | null) => {
    const iconMap = {
      'home': Home,
      'chef-hat': ChefHat,
      'brush': Brush,
      'factory': Factory
    };
    const IconComponent = iconName ? iconMap[iconName as keyof typeof iconMap] || Factory : Factory;
    return <IconComponent className="w-8 h-8" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple mx-auto"></div>
              <p className="mt-4 text-gray-600">جاري تحميل الصناعات...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Demo industries as fallback (kept for compatibility)
  const demoIndustries = [
    {
      id: 1,
      title: "العقارات والاستثمار",
      subtitle: "استراتيجيات مخصصة للقطاع العقاري",
      description: "نساعدك في الوصول للعملاء الجاهزين للشراء الفعلي، مش مجرد المتفرجين",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      icon: <Home className="w-8 h-8" />,
      gradient: "from-inception-purple/20 via-inception-purple/10 to-transparent",
      bgGradient: "from-inception-purple to-inception-purple/80",
      results: [
        { metric: "+135%", label: "زيادة المبيعات" },
        { metric: "-40%", label: "تكلفة اكتساب العملاء" },
        { metric: "+210%", label: "العائد على الاستثمار" }
      ],
      services: ["Google Ads المستهدفة", "Landing Pages احترافية", "استراتيجية Retargeting"]
    },
    {
      id: 2,
      title: "المطابخ والدريسنج",
      subtitle: "تسويق بصري يبرز الفخامة والجودة",
      description: "العميل بيشتري تجربة مش منتج! نركز على إبراز الفخامة والتفاصيل",
      image: "https://images.unsplash.com/photo-1556909114-8b9f9425bb63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      icon: <ChefHat className="w-8 h-8" />,
      gradient: "from-inception-orange/20 via-inception-orange/10 to-transparent",
      bgGradient: "from-inception-orange to-inception-orange/80",
      results: [
        { metric: "+187%", label: "زيادة التفاعل" },
        { metric: "+65%", label: "زيادة المبيعات" },
        { metric: "-35%", label: "وقت دورة البيع" }
      ],
      services: ["تصوير احترافي", "فيديوهات شهادات العملاء", "حملات مستهدفة"]
    },
    {
      id: 3,
      title: "التشطيبات والديكور",
      subtitle: "بناء الثقة من خلال الخبرة والشفافية",
      description: "الثقة هي مفتاح البيع! نبني ثقة حقيقية من خلال المحتوى التعليمي",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      icon: <Brush className="w-8 h-8" />,
      gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
      bgGradient: "from-purple-500 to-purple-500/80",
      results: [
        { metric: "+92%", label: "نمو العملاء" },
        { metric: "+78%", label: "معدل التحويل" },
        { metric: "+156%", label: "التفاعل على المحتوى" }
      ],
      services: ["محتوى تعليمي", "هوية رقمية قوية", "فيديوهات Before & After"]
    },
    {
      id: 4,
      title: "التصدير للمصانع",
      subtitle: "ربط المصانع بالأسواق العالمية",
      description: "نساعد كل مصنع يوصل لمستوردين حقيقيين بروفايل احترافي وموقع قوي",
      image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      icon: <Factory className="w-8 h-8" />,
      gradient: "from-green-500/20 via-green-500/10 to-transparent",
      bgGradient: "from-green-500 to-green-500/80",
      results: [
        { metric: "+245%", label: "طلبات التصدير" },
        { metric: "+180%", label: "شركاء دوليين" },
        { metric: "+95%", label: "نمو الإيرادات" }
      ],
      services: ["مواقع متعددة اللغات", "كتالوجات رقمية", "استراتيجية B2B"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-inception-purple/5">
      <Header />
      
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Enhanced Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-inception-purple/5 via-transparent to-inception-orange/5" />
          <div className="absolute top-20 left-20 w-96 h-96 bg-inception-purple/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-inception-orange/10 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSection className="max-w-5xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-inception-orange ml-3" />
                <span className="text-inception-orange font-semibold">صناعات متخصصة</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-inception-purple mb-6 leading-tight">
                الصناعات اللي
                <span className="block text-4xl md:text-6xl bg-gradient-to-r from-inception-purple to-inception-orange bg-clip-text text-transparent">
                  بنتميز فيها
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-800 max-w-4xl mx-auto leading-relaxed mb-10">
                كل صناعة ليها استراتيجيتها الخاصة، ونجاح أي حملة تسويقية بيعتمد على 
                <span className="font-semibold text-inception-purple"> فهم عميق لسلوك العملاء في كل مجال</span>
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-white/50">
                  <TrendingUp className="w-4 h-4 text-inception-orange ml-2" />
                  <span className="text-gray-800 font-medium">+150% متوسط نمو العملاء</span>
                </div>
                <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-white/50">
                  <Users className="w-4 h-4 text-inception-purple ml-2" />
                  <span className="text-gray-800 font-medium">+500 عميل راضي</span>
                </div>
                <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-white/50">
                  <Target className="w-4 h-4 text-green-600 ml-2" />
                  <span className="text-gray-800 font-medium">استراتيجيات مثبتة النجاح</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Modern Industries Grid */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-inception-purple mb-6">
                خبراتنا المتخصصة
              </h2>
              <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                نقدم حلول تسويقية مبتكرة مصممة خصيصاً لكل صناعة
              </p>
            </AnimatedSection>

            {/* Industries Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {industries.map((industry, index) => (
                <AnimatedSection 
                  key={industry.id}
                  variant="fade-in" 
                  delay={index * 200}
                  className="group"
                >
                  <Link 
                    to={`/industries/${industry.id}`}
                    className="block cursor-pointer"
                  >
                    <div 
                      className="relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-3"
                      onMouseEnter={() => setActiveCard(industry.id)}
                      onMouseLeave={() => setActiveCard(null)}
                    >
                    {/* Image Section with Fixed Size */}
                    <div className="relative h-80 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} ${activeCard === industry.id ? 'opacity-90' : 'opacity-75'} transition-opacity duration-500`} />
                      <img 
                        src={industry.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"}
                        alt={industry.title}
                        className={`w-full h-full object-cover transition-all duration-700 ${activeCard === industry.id ? 'scale-110 blur-sm' : 'scale-100'}`}
                      />
                      
                      {/* Floating Icon */}
                      <div className={`absolute top-6 right-6 w-16 h-16 bg-white/98 backdrop-blur-sm rounded-2xl flex items-center justify-center text-inception-purple shadow-lg border border-white/50 transition-all duration-500 ${activeCard === industry.id ? 'scale-110 rotate-12' : ''}`}>
                        {getIconComponent(industry.icon)}
                      </div>
                      
                      {/* Animated Stats */}
                      <div className={`absolute bottom-6 left-6 right-6 space-y-2 transition-all duration-500 ${activeCard === industry.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        <div className="grid grid-cols-3 gap-2">
                          {(industry.results as any[] || []).map((result: any, idx: number) => (
                            <div key={idx} className="bg-white/98 backdrop-blur-sm rounded-xl p-3 text-center shadow-lg border border-white/50">
                              <div className="text-lg font-bold text-inception-purple">{result.metric || '+100%'}</div>
                              <div className="text-xs text-gray-800 leading-tight font-medium">{result.label || 'نتائج إيجابية'}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Play Button Overlay */}
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${activeCard === industry.id ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="w-20 h-20 bg-white/98 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl animate-pulse border border-white/50">
                          <Play className="w-8 h-8 text-inception-purple mr-1" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-8">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-inception-purple mb-2 group-hover:text-inception-orange transition-colors">
                          {industry.title}
                        </h3>
                        <p className="text-inception-orange font-semibold mb-3">
                          {industry.subtitle || 'حلول تسويقية متقدمة'}
                        </p>
                        <p className="text-gray-800 leading-relaxed">
                          {industry.description}
                        </p>
                      </div>
                      
                      {/* Services Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(industry.services as string[] || ['استراتيجيات متقدمة', 'حلول مبتكرة', 'نتائج مضمونة']).map((service: string, idx: number) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-inception-purple/10 text-inception-purple rounded-full text-sm font-medium"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center text-inception-purple group-hover:text-inception-orange font-semibold transition-all duration-300">
                          <span className="ml-2">تفاصيل الصناعة</span>
                          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                        
                        <div className="p-2 text-gray-400 group-hover:text-inception-purple transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Gradient Border Effect */}
                    <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${activeCard === industry.id ? `bg-gradient-to-r ${industry.bgGradient} opacity-20` : 'opacity-0'} pointer-events-none`} />
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>

            {/* Enhanced CTA Section */}
            <AnimatedSection className="text-center">
              <div className="relative bg-gradient-to-r from-inception-purple via-inception-purple to-inception-orange rounded-3xl p-12 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-xl animate-spin slow" />
                
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    جاهز لتطوير صناعتك؟
                  </h3>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    احصل على استشارة مجانية مخصصة لصناعتك واكتشف كيف نساعدك تحقق نتائج استثنائية
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link 
                      to="/contact" 
                      className="bg-white text-inception-purple px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      احصل على استشارة مجانية
                    </Link>
                    <Link 
                      to="#" 
                      className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-inception-purple transition-all duration-300 hover:scale-105"
                    >
                      حمل دراسة الحالة
                    </Link>
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

export default Industries;