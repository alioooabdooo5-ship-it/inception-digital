import React, { useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import { ArrowLeft, CheckCircle, Star, Users, TrendingUp, Award, ArrowUpRight } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVideo, 
  faBullhorn, 
  faSearch, 
  faCode, 
  faShareAlt,
  faRocket,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import type { Service } from "@shared/schema";

const ServiceDetail = () => {
  const { id } = useParams();
  
  const { data: service, isLoading, error } = useQuery<Service>({
    queryKey: ['/api/services', id],
    enabled: !!id
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getIconComponent = (iconName: string) => {
    const iconMap = {
      'video': faVideo,
      'bullhorn': faBullhorn, 
      'search': faSearch,
      'code': faCode,
      'share-alt': faShareAlt
    };
    const icon = iconMap[iconName as keyof typeof iconMap] || faRocket;
    return <FontAwesomeIcon icon={icon} className="w-12 h-12" />;
  };

  const getDefaultImage = (iconName: string) => {
    const imageMap = {
      'search': 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
      'bullhorn': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
      'share-alt': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
      'code': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
      'video': 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
    };
    return imageMap[iconName as keyof typeof imageMap] || imageMap.video;
  };

  const portfolioExamples = [
    {
      title: "شركة الابتكار التقني",
      description: "زيادة في المبيعات بنسبة 300% خلال 6 أشهر",
      results: "+300% مبيعات",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
    },
    {
      title: "متجر الموضة العصري",
      description: "تحسين معدل التحويل وزيادة العملاء الجدد",
      results: "+250% عملاء جدد",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
    },
    {
      title: "مطعم الذواقة",
      description: "بناء هوية رقمية قوية وزيادة الطلبات عبر الإنترنت",
      results: "+400% طلبات أونلاين",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "التحليل والاستراتيجية",
      description: "دراسة شاملة لوضع عملك الحالي والمنافسين في السوق",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      step: "02", 
      title: "التخطيط والتصميم",
      description: "وضع خطة عمل مفصلة وتصميم الحلول المناسبة",
      icon: <Users className="w-6 h-6" />
    },
    {
      step: "03",
      title: "التنفيذ والمتابعة",
      description: "تطبيق الخطة مع المتابعة المستمرة وقياس النتائج",
      icon: <Award className="w-6 h-6" />
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-inception-purple/5">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple mx-auto"></div>
              <p className="mt-4 text-gray-600">جاري تحميل تفاصيل الخدمة...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-inception-purple/5">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">الخدمة غير موجودة</h1>
              <p className="text-gray-600 mb-8">لم نتمكن من العثور على هذه الخدمة</p>
              <Link to="/services" className="btn-primary">
                العودة للخدمات
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
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10`} />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSection>
              <div className="flex items-center mb-6">
                <Link to="/services" className="flex items-center text-inception-purple hover:text-inception-orange transition-colors ml-4">
                  <ArrowLeft className="w-5 h-5 ml-2" />
                  العودة للخدمات
                </Link>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-inception-purple shadow-lg ml-4">
                      {getIconComponent(service.icon)}
                    </div>
                    <div className="flex items-center bg-inception-orange/10 text-inception-orange px-4 py-2 rounded-full">
                      <FontAwesomeIcon icon={faChartLine} className="w-4 h-4 ml-2" />
                      <span className="font-semibold">{service.stats}</span>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold text-inception-purple mb-6 leading-tight">
                    {service.title}
                  </h1>
                  
                  <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {service.longDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link to="/contact" className="btn-primary text-lg px-8 py-4">
                      احصل على عرض سعر
                    </Link>
                    <Link to="#portfolio" className="btn-outline text-lg px-8 py-4">
                      شاهد أعمالنا
                    </Link>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <img 
                      src={service.image || getDefaultImage(service.icon)}
                      alt={service.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20`} />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl font-bold text-inception-purple mb-6">
                كيف نعمل معك
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                منهجية عمل مجربة تضمن تحقيق أفضل النتائج لعملك
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <AnimatedSection key={index} delay={index * 150} className="text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-inception-purple to-inception-orange rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
                      {step.icon}
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-inception-orange/20 rounded-full flex items-center justify-center">
                      <span className="text-inception-orange font-bold text-sm">{step.step}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-inception-purple mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl font-bold text-inception-purple mb-6">
                سابقة أعمالنا
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                قصص نجاح حقيقية من عملائنا الذين حققوا نتائج استثنائية
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {portfolioExamples.map((example, index) => (
                <AnimatedSection key={index} delay={index * 150}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={example.image}
                        alt={example.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-inception-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {example.results}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-inception-purple mb-3">
                        {example.title}
                      </h3>
                      <p className="text-gray-600">
                        {example.description}
                      </p>
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
                مستعد لبدء مشروعك؟
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                احصل على استشارة مجانية واكتشف كيف يمكننا مساعدتك في تحقيق أهدافك
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="bg-white text-inception-purple px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  احصل على استشارة مجانية
                </Link>
                <Link to="/services" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-inception-purple transition-colors">
                  استكشف خدمات أخرى
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

export default ServiceDetail;