import React, { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import { ArrowUpRight, Sparkles } from "lucide-react";
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
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Service } from "@shared/schema";

const Services = () => {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services']
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

  const getIconComponent = (iconName: string) => {
    const iconMap = {
      'video': faVideo,
      'bullhorn': faBullhorn, 
      'search': faSearch,
      'code': faCode,
      'share-alt': faShareAlt
    };
    const icon = iconMap[iconName as keyof typeof iconMap] || faRocket;
    return <FontAwesomeIcon icon={icon} className="w-8 h-8" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple mx-auto"></div>
              <p className="mt-4 text-gray-600">جاري تحميل الخدمات...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Demo services as fallback (kept for compatibility)
  const demoServices = [
    {
      icon: <FontAwesomeIcon icon={faVideo} className="w-8 h-8" />,
      title: "الميديا برودكشن وصناعة المحتوى",
      description: "العميل مش هيشتري إلا لما يحس إن المنتج أو الخدمة تستاهل، وهنا بييجي دور المحتوى البصري",
      link: "/services/media-production",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      gradient: "from-red-500/20 to-pink-500/20",
      stats: "+175% زيادة التفاعل"
    },
    {
      icon: <FontAwesomeIcon icon={faBullhorn} className="w-8 h-8" />,
      title: "الإعلانات والمديا باينج",
      description: "مش أي إعلان ناجح يبقى إعلان بيبيع، إحنا بنشتغل بأسلوب منظم يخلي كل جنيه يتحول لمبيعات حقيقية",
      link: "/services/paid-ads",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      gradient: "from-blue-500/20 to-cyan-500/20",
      stats: "+210% نتائج الحملات"
    },
    {
      icon: <FontAwesomeIcon icon={faSearch} className="w-8 h-8" />,
      title: "تحسين محركات البحث (SEO)",
      description: "لو انت مش ظاهر في البحث، فإنت حرفيًا مش موجود! إحنا بنشتغل على تحسين ترتيب موقعك",
      link: "/services/seo",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      gradient: "from-green-500/20 to-emerald-500/20",
      stats: "المركز الأول في جوجل"
    },
    {
      icon: <FontAwesomeIcon icon={faCode} className="w-8 h-8" />,
      title: "تصميم وتطوير المواقع",
      description: "الموقع مش مجرد شكل، الموقع هو أهم موظف مبيعات عندك! بنصمم مواقع بتقنع وبتبيع",
      link: "/services/web-development",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      gradient: "from-purple-500/20 to-indigo-500/20",
      stats: "+300% معدل التحويل"
    },
    {
      icon: <FontAwesomeIcon icon={faShareAlt} className="w-8 h-8" />,
      title: "إدارة السوشيال ميديا",
      description: "الناس بتدور على البراندات اللي عندها محتوى مقنع، مش مجرد بوستات والسلام!",
      link: "/services/social-media",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      gradient: "from-pink-500/20 to-rose-500/20",
      stats: "+250% نمو المتابعين"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-inception-purple/5">
      <Header />
      
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Enhanced Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-inception-purple/5 via-transparent to-inception-orange/5" />
          <div className="absolute top-10 left-10 w-72 h-72 bg-inception-purple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-inception-orange/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSection className="max-w-5xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faRocket} className="w-6 h-6 text-inception-orange ml-3" />
                <span className="text-inception-orange font-semibold">خدمات احترافية</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-inception-purple mb-6 leading-tight">
                خدماتنا
                <span className="block text-4xl md:text-6xl bg-gradient-to-r from-inception-purple to-inception-orange bg-clip-text text-transparent">
                  المتطورة
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                نقدم مجموعة متكاملة من خدمات التسويق الرقمي المصممة لتحقيق نتائج ملموسة 
                <span className="font-semibold text-inception-purple"> وتحويل اهتمام العملاء إلى مبيعات حقيقية</span>
              </p>
              
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link to="#services-grid" className="btn-primary text-lg px-8 py-4">
                  استكشف خدماتنا
                </Link>
                <Link to="/contact" className="btn-outline text-lg px-8 py-4">
                  احصل على استشارة مجانية
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Modern Services Grid */}
        <section id="services-grid" className="py-20 relative">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-16">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-inception-orange ml-2" />
                <span className="text-inception-orange font-semibold">خدمات متخصصة</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-inception-purple mb-6">
                حلول تسويقية شاملة
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                كل خدمة مصممة بعناية لضمان تحقيق أهدافك التسويقية بأفضل النتائج
              </p>
            </AnimatedSection>

            {/* Services Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {services.map((service, index) => {
                const defaultImage = `https://images.unsplash.com/photo-${
                  service.icon === 'search' ? '1432888622747-4eb9a8efeb07' :
                  service.icon === 'bullhorn' ? '1460925895917-afdab827c52f' :
                  service.icon === 'share-alt' ? '1611162617474-5b21e879e113' :
                  service.icon === 'code' ? '1498050108023-c5249f4df085' :
                  service.icon === 'video' ? '1487058792275-0ad4aaf24ca7' :
                  '1487058792275-0ad4aaf24ca7'
                }?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80`;
                
                return (
                  <AnimatedSection 
                    key={service.id}
                    variant="fade-in" 
                    delay={index * 150}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      {/* Image Section */}
                      <div className="relative h-64 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-90`} />
                        <img 
                          src={service.image || defaultImage}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Floating Icon */}
                        <div className="absolute top-6 right-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-inception-purple shadow-lg">
                          {service.icon && getIconComponent(service.icon)}
                        </div>
                        
                        {/* Stats Badge */}
                        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faChartLine} className="w-4 h-4 text-inception-orange ml-2" />
                            <span className="text-sm font-semibold text-inception-purple">{service.stats}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-inception-purple mb-4 group-hover:text-inception-orange transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-6">
                          {service.description}
                        </p>
                        
                        <Link 
                          to={`/services/${service.id}`}
                          className="inline-flex items-center text-inception-purple hover:text-inception-orange font-semibold transition-all duration-300 group/link"
                        >
                          <span className="ml-2">تفاصيل الخدمة</span>
                          <ArrowUpRight className="w-5 h-5 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                        </Link>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            {/* CTA Section */}
            <AnimatedSection className="text-center">
              <div className="bg-gradient-to-r from-inception-purple to-inception-orange rounded-3xl p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
                
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    جاهز لتطوير بيزنسك؟
                  </h3>
                  <p className="text-xl mb-8 opacity-90">
                    احصل على استشارة مجانية واكتشف كيف يمكننا مساعدتك في تحقيق أهدافك
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/contact" className="bg-white text-inception-purple px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                      تواصل معنا الآن
                    </Link>
                    <Link to="#" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-inception-purple transition-colors">
                      حمل الـ Portfolio
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

export default Services;