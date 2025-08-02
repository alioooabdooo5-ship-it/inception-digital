import React, { useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import { ArrowLeft, CheckCircle, Star, Users, TrendingUp, Award, ArrowUpRight, Building2, Target, Lightbulb } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeartbeat, 
  faGraduationCap, 
  faShoppingCart, 
  faIndustry,
  faRocket,
  faChartLine,
  faBullseye
} from '@fortawesome/free-solid-svg-icons';
import type { Industry } from "@shared/schema";

const IndustryDetail = () => {
  const { id } = useParams();
  
  const { data: industry, isLoading, error } = useQuery<Industry>({
    queryKey: ['/api/industries', id],
    enabled: !!id
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getIconComponent = (iconName: string | null) => {
    const iconMap = {
      'heartbeat': faHeartbeat,
      'graduation-cap': faGraduationCap, 
      'shopping-cart': faShoppingCart,
      'industry': faIndustry
    };
    const icon = iconName ? (iconMap[iconName as keyof typeof iconMap] || faRocket) : faRocket;
    return <FontAwesomeIcon icon={icon} className="w-12 h-12" />;
  };

  const getDefaultImage = (iconName: string | null) => {
    const imageMap = {
      'heartbeat': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
      'graduation-cap': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
      'shopping-cart': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
      'industry': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
    };
    return iconName ? (imageMap[iconName as keyof typeof imageMap] || imageMap.industry) : imageMap.industry;
  };

  const successStories = [
    {
      title: "مستشفى النور الطبي",
      description: "زيادة في حجوزات المرضى بنسبة 400% خلال 8 أشهر",
      results: "+400% حجوزات",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      achievement: "تحقيق أعلى معدل ثقة بين المرضى"
    },
    {
      title: "أكاديمية المستقبل التعليمية",
      description: "تحسين معدل التسجيل وبناء سمعة أكاديمية قوية",
      results: "+350% طلاب جدد",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      achievement: "الأكاديمية الأولى في المنطقة"
    },
    {
      title: "متجر الأناقة الرقمي",
      description: "بناء علامة تجارية قوية وزيادة المبيعات عبر الإنترنت",
      results: "+500% مبيعات أونلاين",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      achievement: "أسرع نمو في القطاع"
    }
  ];

  const solutions = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "استهداف دقيق",
      description: "نحدد جمهورك المثالي بدقة لضمان وصول رسالتك للأشخاص المناسبين"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "حلول مبتكرة",
      description: "نطور استراتيجيات مخصصة تتناسب مع طبيعة وتحديات صناعتك"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "نتائج قابلة للقياس",
      description: "نتابع الأداء ونقيس النتائج لضمان تحقيق أهدافك بشكل مستمر"
    }
  ];

  const challenges = [
    "بناء الثقة مع العملاء في السوق الرقمي",
    "التنافس الشديد والحاجة للتميز",
    "الوصول للجمهور المناسب بالرسالة الصحيحة",
    "تحويل الزوار إلى عملاء فعليين",
    "قياس العائد على الاستثمار التسويقي"
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-inception-purple/5">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple mx-auto"></div>
              <p className="mt-4 text-gray-600">جاري تحميل تفاصيل الصناعة...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !industry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-inception-purple/5">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">الصناعة غير موجودة</h1>
              <p className="text-gray-600 mb-8">لم نتمكن من العثور على هذه الصناعة</p>
              <Link to="/industries" className="btn-primary">
                العودة للصناعات
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-inception-purple/5">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-inception-purple/5 via-transparent to-inception-orange/5" />
          <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-10`} />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSection>
              <div className="flex items-center mb-6">
                <Link to="/industries" className="flex items-center text-inception-purple hover:text-inception-orange transition-colors ml-4">
                  <ArrowLeft className="w-5 h-5 ml-2" />
                  العودة للصناعات
                </Link>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-inception-purple shadow-lg ml-4">
                      {getIconComponent(industry.icon)}
                    </div>
                    <div className="flex items-center bg-inception-orange/10 text-inception-orange px-4 py-2 rounded-full">
                      <FontAwesomeIcon icon={faBullseye} className="w-4 h-4 ml-2" />
                      <span className="font-semibold">صناعة متخصصة</span>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold text-inception-purple mb-4 leading-tight">
                    {industry.title}
                  </h1>
                  
                  <p className="text-xl text-inception-orange mb-6 font-semibold">
                    {industry.subtitle}
                  </p>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {industry.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link to="/contact" className="btn-primary text-lg px-8 py-4">
                      احصل على استشارة مخصصة
                    </Link>
                    <Link to="#success-stories" className="btn-outline text-lg px-8 py-4">
                      قصص النجاح
                    </Link>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <img 
                      src={industry.image || getDefaultImage(industry.icon)}
                      alt={industry.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-20`} />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl font-bold text-inception-purple mb-6">
                التحديات التي نحلها
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                نفهم التحديات الخاصة بـ{industry.title} ونقدم حلول مخصصة لتجاوزها
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {challenges.map((challenge, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="flex items-start p-6 bg-gray-50 rounded-2xl hover:bg-inception-purple/5 transition-colors">
                    <div className="w-8 h-8 bg-inception-orange rounded-full flex items-center justify-center text-white font-bold text-sm ml-4 mt-1 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{challenge}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <AnimatedSection key={index} delay={index * 150} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-inception-purple to-inception-orange rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                    {solution.icon}
                  </div>
                  <h3 className="text-xl font-bold text-inception-purple mb-4">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600">
                    {solution.description}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section id="success-stories" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl font-bold text-inception-purple mb-6">
                قصص نجاح في {industry.title}
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                شاهد كيف ساعدنا شركات مماثلة في تحقيق نتائج استثنائية
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <AnimatedSection key={index} delay={index * 150}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-inception-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {story.results}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-inception-purple mb-3">
                        {story.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {story.description}
                      </p>
                      <div className="flex items-center text-inception-orange">
                        <Award className="w-4 h-4 ml-2" />
                        <span className="text-sm font-semibold">{story.achievement}</span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-inception-purple to-inception-orange">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                مستعد لتطوير عملك في {industry.title}؟
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                احصل على استشارة مجانية مخصصة لصناعتك واكتشف الفرص المتاحة
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="bg-white text-inception-purple px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  احصل على استشارة مجانية
                </Link>
                <Link to="/services" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-inception-purple transition-colors">
                  استكشف خدماتنا
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default IndustryDetail;