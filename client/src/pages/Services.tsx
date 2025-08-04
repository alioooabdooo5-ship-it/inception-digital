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
      id: 101,
      icon: "video",
      title: "الميديا برودكشن وصناعة المحتوى",
      description: "العميل مش هيشتري إلا لما يحس إن المنتج أو الخدمة تستاهل، وهنا بييجي دور المحتوى البصري",
      link: "/services/media-production",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      gradient: "from-red-500/20 to-pink-500/20",
      stats: "+175% زيادة التفاعل"
    },
    {
      id: 102,
      icon: "bullhorn",
      title: "الإعلانات والمديا باينج",
      description: "مش أي إعلان ناجح يبقى إعلان بيبيع، إحنا بنشتغل بأسلوب منظم يخلي كل جنيه يتحول لمبيعات حقيقية",
      link: "/services/paid-ads",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      gradient: "from-blue-500/20 to-cyan-500/20",
      stats: "+210% نتائج الحملات"
    },
    {
      id: 103,
      icon: "search",
      title: "تحسين محركات البحث (SEO)",
      description: "لو انت مش ظاهر في البحث، فإنت حرفيًا مش موجود! إحنا بنشتغل على تحسين ترتيب موقعك",
      link: "/services/seo",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      gradient: "from-green-500/20 to-emerald-500/20",
      stats: "المركز الأول في جوجل"
    },
    {
      id: 104,
      icon: "code",
      title: "تصميم وتطوير المواقع",
      description: "الموقع مش مجرد شكل، الموقع هو أهم موظف مبيعات عندك! بنصمم مواقع بتقنع وبتبيع",
      link: "/services/web-development",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      gradient: "from-purple-500/20 to-indigo-500/20",
      stats: "+300% معدل التحويل"
    },
    {
      id: 105,
      icon: "share-alt",
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
              <p className="text-xl md:text-2xl text-gray-800 max-w-4xl mx-auto leading-relaxed">
                نقدم مجموعة متكاملة من خدمات التسويق الرقمي المصممة لتحقيق نتائج ملموسة 
                <span className="font-semibold text-inception-purple"> وتحويل اهتمام العملاء إلى مبيعات حقيقية</span>
              </p>
              
              {/* مؤشرات الثقة */}
              <div className="mt-8 flex flex-wrap justify-center items-center gap-8 text-gray-600">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-inception-purple ml-2">+150</span>
                  <span>عميل راضي</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-inception-purple ml-2">+300%</span>
                  <span>زيادة المبيعات</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-inception-purple ml-2">24/7</span>
                  <span>دعم فني</span>
                </div>
              </div>
              
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link to="#packages-section" className="bg-inception-orange hover:bg-inception-orange/90 text-white text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg">
                  اطلب عرض سعر مجاني
                </Link>
                <Link to="/contact" className="btn-outline text-lg px-8 py-4">
                  استشارة مجانية (30 دقيقة)
                </Link>
              </div>
              
              {/* عرض محدود */}
              <div className="mt-6 bg-red-100 border border-red-200 rounded-xl px-6 py-3 inline-block">
                <p className="text-red-700 font-semibold">
                  🔥 عرض محدود: خصم 20% على باقة التسويق الشامل - ينتهي خلال 7 أيام
                </p>
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
              <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                كل خدمة مصممة بعناية لضمان تحقيق أهدافك التسويقية بأفضل النتائج
              </p>
            </AnimatedSection>

            {/* Services Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {(services.length > 0 ? services : demoServices).map((service, index) => {
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
                      <Link to={`/services/${service.id}`} className="block">
                        <div className="relative h-64 overflow-hidden">
                          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-90`} />
                          <img 
                            src={service.image || defaultImage}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          
                          {/* Floating Icon */}
                          <div className="absolute top-6 right-6 w-16 h-16 bg-white/98 backdrop-blur-sm rounded-2xl flex items-center justify-center text-inception-purple shadow-lg border border-white/50">
                            {service.icon && getIconComponent(typeof service.icon === 'string' ? service.icon : 'video')}
                          </div>
                          
                          {/* Stats Badge */}
                          <div className="absolute bottom-6 left-6 bg-white/98 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-white/50">
                            <div className="flex items-center">
                              <FontAwesomeIcon icon={faChartLine} className="w-4 h-4 text-inception-orange ml-2" />
                              <span className="text-sm font-bold text-inception-purple">{service.stats}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      
                      {/* Content Section */}
                      <div className="p-8">
                        <Link to={`/services/${service.id}`} className="block mb-6">
                          <h3 className="text-2xl font-bold text-inception-purple mb-4 group-hover:text-inception-orange transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-gray-800 leading-relaxed">
                            {service.description}
                          </p>
                        </Link>
                        
                        <div className="flex justify-between items-center mb-4">
                          <Link 
                            to={`/services/${service.id}`}
                            className="inline-flex items-center text-inception-purple group-hover:text-inception-orange font-semibold transition-all duration-300"
                          >
                            <span className="ml-2">تفاصيل الخدمة</span>
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </Link>
                          <div className="flex flex-col items-end">
                            <span className="text-xs text-gray-500 mb-1">تبدأ من</span>
                            <span className="text-xl font-bold text-inception-orange">2,500 ج.م</span>
                          </div>
                        </div>
                        
                        {/* CTA محسن */}
                        <div className="pt-4 border-t border-gray-100">
                          <Link 
                            to="/contact" 
                            className="w-full bg-inception-purple hover:bg-inception-purple/90 text-white py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
                          >
                            احجز استشارة مجانية الآن
                            <ArrowUpRight className="w-4 h-4 mr-2" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            {/* قسم الباقات والأسعار */}
            <section id="packages-section" className="py-20 bg-gradient-to-br from-gray-50 to-white">
              <div className="container mx-auto px-4">
                <AnimatedSection className="text-center mb-16">
                  <div className="flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-inception-orange ml-2" />
                    <span className="text-inception-orange font-semibold">باقات مخصصة</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-inception-purple mb-6">
                    اختار الباقة المناسبة لك
                  </h2>
                  <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                    باقات متدرجة تناسب جميع احتياجاتك وميزانيتك مع ضمان النتائج
                  </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {/* باقة أساسية */}
                  <AnimatedSection className="relative">
                    <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-inception-purple mb-4">الباقة الأساسية</h3>
                        <div className="mb-4">
                          <span className="text-5xl font-bold text-inception-purple">5,000</span>
                          <span className="text-gray-600 mr-2">ج.م/شهر</span>
                        </div>
                        <p className="text-gray-600">مثالية للشركات الناشئة</p>
                      </div>
                      <ul className="space-y-4 mb-8">
                        <li className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>إدارة 2 منصة سوشيال ميديا</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>12 بوست شهرياً</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>تقرير شهري مفصل</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>دعم فني عبر الواتس</span>
                        </li>
                      </ul>
                      <Link to="/contact" className="w-full bg-inception-purple hover:bg-inception-purple/90 text-white py-4 px-6 rounded-xl font-semibold text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg block">
                        ابدأ الآن
                      </Link>
                    </div>
                  </AnimatedSection>

                  {/* باقة متقدمة - الأكثر شعبية */}
                  <AnimatedSection className="relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-inception-orange text-white px-6 py-2 rounded-full text-sm font-semibold">
                      الأكثر شعبية
                    </div>
                    <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-inception-orange h-full">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-inception-purple mb-4">الباقة المتقدمة</h3>
                        <div className="mb-4">
                          <span className="text-5xl font-bold text-inception-orange">12,000</span>
                          <span className="text-gray-600 mr-2">ج.م/شهر</span>
                        </div>
                        <p className="text-gray-600">الأفضل للشركات المتوسطة</p>
                      </div>
                      <ul className="space-y-4 mb-8">
                        <li className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>إدارة 4 منصات سوشيال ميديا</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>20 بوست شهرياً + ستوريز</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>حملة إعلانية مدفوعة</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>تصميم إبداعي احترافي</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>دعم مباشر على مدار الساعة</span>
                        </li>
                      </ul>
                      <Link to="/contact" className="w-full bg-inception-orange hover:bg-inception-orange/90 text-white py-4 px-6 rounded-xl font-semibold text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg block">
                        ابدأ الآن
                      </Link>
                    </div>
                  </AnimatedSection>

                  {/* باقة شاملة */}
                  <AnimatedSection className="relative">
                    <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-inception-purple mb-4">الباقة الشاملة</h3>
                        <div className="mb-4">
                          <span className="text-5xl font-bold text-inception-purple">25,000</span>
                          <span className="text-gray-600 mr-2">ج.م/شهر</span>
                        </div>
                        <p className="text-gray-600">للشركات الكبيرة والمؤسسات</p>
                      </div>
                      <ul className="space-y-4 mb-8">
                        <li className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>إدارة جميع المنصات</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>محتوى يومي + فيديو</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>حملات إعلانية متعددة</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>استراتيجية تسويقية شاملة</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>مدير حساب مخصص</span>
                        </li>
                      </ul>
                      <Link to="/contact" className="w-full bg-inception-purple hover:bg-inception-purple/90 text-white py-4 px-6 rounded-xl font-semibold text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg block">
                        ابدأ الآن
                      </Link>
                    </div>
                  </AnimatedSection>
                </div>

                {/* ضمان النتائج */}
                <AnimatedSection className="text-center mt-12">
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-8 max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold text-green-800 mb-4">ضمان استرداد الأموال 100%</h3>
                    <p className="text-green-700 text-lg">
                      إذا لم تحقق زيادة 50% في التفاعل خلال 3 أشهر، نسترد لك أموالك كاملة
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </section>

            {/* قسم شهادات العملاء */}
            <section className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <AnimatedSection className="text-center mb-16">
                  <div className="flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-inception-orange ml-2" />
                    <span className="text-inception-orange font-semibold">شهادات العملاء</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-inception-purple mb-6">
                    ماذا يقول عملاؤنا عنا؟
                  </h2>
                  <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                    نتائج حقيقية من عملاء حقيقيين حققوا نجاحات مذهلة معنا
                  </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {[
                    {
                      name: "أحمد محمد",
                      position: "مدير التسويق",
                      company: "شركة الفنار للتجارة",
                      content: "زادت مبيعاتنا 250% في أول 6 أشهر من التعامل مع إنسيبشن. فريق محترف ونتائج مذهلة!",
                      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
                    },
                    {
                      name: "سارة أحمد",
                      position: "مؤسسة",
                      company: "مطعم زعتر وزيت",
                      content: "بفضل استراتيجيتهم التسويقية، أصبح لدينا 3 فروع جديدة في أقل من سنة. شكراً إنسيبشن!",
                      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
                    },
                    {
                      name: "محمد علي",
                      position: "صاحب متجر إلكتروني",
                      company: "متجر تك ستور",
                      content: "نقلوا متجرنا من 100 زائر يومياً إلى أكثر من 5000 زائر. العائد على الاستثمار كان خيالي!",
                      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
                    }
                  ].map((testimonial, index) => (
                    <AnimatedSection key={index} delay={index * 150}>
                      <div className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300">
                        <div className="flex justify-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-2xl text-yellow-400">⭐</span>
                          ))}
                        </div>
                        <p className="text-gray-800 text-lg mb-6 leading-relaxed">
                          "{testimonial.content}"
                        </p>
                        <div className="flex items-center justify-center">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover ml-4"
                          />
                          <div className="text-right">
                            <h4 className="font-bold text-inception-purple">{testimonial.name}</h4>
                            <p className="text-gray-600">{testimonial.position}</p>
                            <p className="text-inception-orange font-semibold">{testimonial.company}</p>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section المحسن */}
            <AnimatedSection className="text-center">
              <div className="bg-gradient-to-r from-inception-purple to-inception-orange rounded-3xl p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
                
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    🚀 جاهز لتحقيق نقلة حقيقية في بيزنسك؟
                  </h3>
                  <p className="text-xl mb-2 opacity-90">
                    احصل على استشارة مجانية واكتشف كيف يمكننا مضاعفة أرباحك
                  </p>
                  <p className="text-lg mb-8 opacity-80">
                    📞 اتصل الآن: 01012345678 | 📧 info@inception-eg.com
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/contact" className="bg-white text-inception-purple px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center">
                      📞 احجز مكالمة مجانية (30 دقيقة)
                    </Link>
                    <Link to="#packages-section" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-inception-purple transition-colors flex items-center">
                      💰 احصل على عرض سعر فوري
                    </Link>
                  </div>
                  
                  {/* عداد تنازلي للعرض */}
                  <div className="mt-8 bg-red-600 rounded-xl p-4 inline-block">
                    <p className="font-bold text-lg">
                      ⏰ العرض المحدود ينتهي خلال: 6 أيام و 23 ساعة
                    </p>
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