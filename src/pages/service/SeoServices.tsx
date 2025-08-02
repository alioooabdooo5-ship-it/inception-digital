import React, { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Search, TrendingUp, Eye, Globe, ArrowRight, CheckCircle, Award, BarChart3, Users } from "lucide-react";
import { Link } from "react-router-dom";

const SeoServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <Search size={24} />,
      title: "تحليل وتدقيق الموقع",
      description: "فحص شامل لموقعك لتحديد نقاط الضعف والتحسينات المطلوبة",
      features: [
        "تحليل السرعة والأداء التقني",
        "فحص بنية الموقع والربط الداخلي", 
        "تدقيق المحتوى والكلمات المفتاحية",
        "تحليل تجربة المستخدم وسهولة التنقل"
      ]
    },
    {
      icon: <TrendingUp size={24} />,
      title: "البحث عن الكلمات المفتاحية",
      description: "اختيار الكلمات المفتاحية المربحة التي تجلب عملاء حقيقيين",
      features: [
        "بحث متقدم عن الكلمات عالية القيمة",
        "تحليل المنافسة على الكلمات المستهدفة",
        "دراسة نية البحث لكل كلمة",
        "إنشاء خريطة كلمات مفتاحية شاملة"
      ]
    },
    {
      icon: <Globe size={24} />,
      title: "التحسين التقني (Technical SEO)",
      description: "تحسين الجوانب التقنية للموقع لضمان فهرسة أفضل من محركات البحث",
      features: [
        "تحسين سرعة تحميل الصفحات",
        "إعداد خريطة الموقع والروبوت",
        "تحسين البيانات المهيكلة",
        "ضمان التوافق مع الهواتف المحمولة"
      ]
    },
    {
      icon: <BarChart3 size={24} />,
      title: "بناء الروابط الخارجية",
      description: "الحصول على روابط عالية الجودة من مواقع موثوقة لتعزيز سلطة موقعك",
      features: [
        "بناء روابط من مواقع ذات سلطة عالية",
        "استراتيجيات المحتوى للربط الطبيعي",
        "التواصل مع المواقع ذات الصلة",
        "مراقبة ملف الروابط الخارجية"
      ]
    }
  ];

  const portfolio = [
    {
      title: "موقع شركة عقارات",
      description: "وصول للصفحة الأولى في جوجل لكلمات مفتاحية تنافسية",
      results: {
        ranking: "من الصفحة 5 للصفحة الأولى",
        traffic: "+320% زيادة الزيارات",
        leads: "+250% زيادة الاستفسارات"
      },
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "متجر إلكتروني للإلكترونيات",
      description: "تحسين ترتيب صفحات المنتجات وزيادة المبيعات العضوية",
      results: {
        ranking: "50+ كلمة في الصفحة الأولى",
        traffic: "+180% زيادة الزيارات العضوية",
        sales: "+140% زيادة المبيعات العضوية"
      },
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "عيادة طبية متخصصة",
      description: "تصدر نتائج البحث المحلي وزيادة حجوزات المرضى",
      results: {
        ranking: "الموقع الأول في البحث المحلي",
        traffic: "+200% زيادة الزيارات المحلية",
        bookings: "+160% زيادة الحجوزات"
      },
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const process = [
    {
      step: "01",
      title: "التحليل والتدقيق",
      description: "نبدأ بتحليل شامل لموقعك الحالي ودراسة المنافسين لوضع استراتيجية SEO مخصصة."
    },
    {
      step: "02",
      title: "البحث والتخطيط",
      description: "نحدد الكلمات المفتاحية المربحة ونضع خطة محتوى شاملة لتحسين ترتيب موقعك."
    },
    {
      step: "03",
      title: "التنفيذ والتحسين",
      description: "نطبق التحسينات التقنية والمحتوى المطلوب وفقاً لأفضل ممارسات SEO الحديثة."
    },
    {
      step: "04",
      title: "المراقبة والتطوير",
      description: "نراقب الأداء باستمرار ونحسن الاستراتيجية بناءً على النتائج والتحديثات الجديدة."
    }
  ];

  const stats = [
    {
      number: "+500",
      label: "كلمة مفتاحية في الصفحة الأولى",
      icon: <Search className="text-inception-purple" size={24} />
    },
    {
      number: "250%",
      label: "متوسط زيادة الزيارات العضوية",
      icon: <TrendingUp className="text-inception-green" size={24} />
    },
    {
      number: "98%",
      label: "من العملاء راضون عن النتائج",
      icon: <Award className="text-inception-orange" size={24} />
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-28">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_30%_30%,rgba(55,18,79,0.05)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection variant="fade-in-right" className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center bg-inception-green bg-opacity-10 text-inception-green px-4 py-2 rounded-full text-sm font-medium">
                    <Search size={16} className="ml-2" />
                    تحسين محركات البحث
                  </div>
                  
                  <h1 className="headline-large text-inception-purple leading-tight">
                    تحسين محركات البحث (SEO)
                    <span className="block text-inception-green">اجعل موقعك الأول في جوجل</span>
                  </h1>
                  
                  <p className="body-large text-gray-700">
                    إنت ممكن يكون عندك أفضل منتج أو خدمة في السوق، لكن لو مش ظاهر في جوجل، فأنت حرفيًا مش موجود! 
                    نساعدك تتصدر نتائج البحث وتجذب عملاء يدوروا عليك بنفسهم.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact" className="btn-primary">
                    احصل على تحليل مجاني لموقعك
                    <ArrowRight size={18} className="mr-2" />
                  </Link>
                  <button className="btn-outline inline-flex items-center">
                    <Eye size={18} className="ml-2" />
                    شاهد نتائجنا
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2">{stat.icon}</div>
                      <div className="text-xl font-bold text-inception-purple mb-1">{stat.number}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
              
              <AnimatedSection variant="fade-in-left" className="relative">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="SEO Services"
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 glass-card p-6 shadow-lg animate-float">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-12 h-12 bg-inception-green bg-opacity-20 rounded-full flex items-center justify-center">
                        <Search className="text-inception-green" size={24} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">ترتيب جوجل</div>
                        <div className="text-xl font-bold text-inception-purple">رقم 1</div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="headline-medium text-inception-purple mb-6">
                خدماتنا في تحسين محركات البحث
              </h2>
              <p className="body-large text-gray-700">
                نقدم حلول SEO شاملة لتحسين ترتيب موقعك وزيادة الزيارات العضوية
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <AnimatedSection 
                  key={index}
                  variant="scale-in"
                  delay={index * 100}
                  className="glass-card p-8 space-y-6"
                >
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-16 h-16 bg-inception-green bg-opacity-10 rounded-xl flex items-center justify-center text-inception-green">
                      {service.icon}
                    </div>
                    <h3 className="title-medium text-inception-purple">{service.title}</h3>
                  </div>
                  
                  <p className="body-medium text-gray-700">{service.description}</p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3 space-x-reverse">
                        <CheckCircle size={16} className="text-inception-green mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,197,94,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="headline-medium text-inception-purple mb-6">
                نتائج حقيقية حققناها لعملائنا
              </h2>
              <p className="body-large text-gray-700">
                مشاريع ناجحة في تحسين محركات البحث وتحقيق نتائج ملموسة
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {portfolio.map((project, index) => (
                <AnimatedSection 
                  key={index}
                  variant="scale-in"
                  delay={index * 100}
                  className="glass-card overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-inception-green text-white px-3 py-1 rounded-full text-sm font-medium">
                      نجح
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <h3 className="title-medium text-inception-purple">{project.title}</h3>
                    <p className="text-gray-700 text-sm">{project.description}</p>
                    
                    <div className="space-y-2 border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">الترتيب:</span>
                        <span className="text-sm font-medium text-inception-green">{project.results.ranking}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">الزيارات:</span>
                        <span className="text-sm font-medium text-inception-green">{project.results.traffic}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">النتائج:</span>
                        <span className="text-sm font-medium text-inception-green">{project.results.leads || project.results.sales || project.results.bookings}</span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="headline-medium text-inception-purple mb-6">
                كيف نحسن ترتيب موقعك خطوة بخطوة
              </h2>
              <p className="body-large text-gray-700">
                منهجية علمية مجربة لضمان تحسين ترتيب موقعك في محركات البحث
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <AnimatedSection 
                  key={index}
                  variant="fade-in"
                  delay={index * 100}
                  className="relative"
                >
                  <div className="glass-card p-6 text-center h-full">
                    <div className="w-16 h-16 bg-inception-green text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="title-small text-inception-purple mb-3">{step.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
                  </div>
                  
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-inception-green bg-opacity-30 transform translate-x-4" />
                  )}
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-inception-green relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_50%)]" />
          
          <div className="container mx-auto px-4 md:px-6 text-center">
            <AnimatedSection className="max-w-3xl mx-auto space-y-8">
              <h2 className="headline-medium text-white mb-6">
                جاهز للظهور في الصفحة الأولى؟
              </h2>
              <p className="body-large text-white/90 mb-8">
                احصل على تحليل مجاني شامل لموقعك واكتشف كيف يمكننا تحسين ترتيبك في جوجل
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-white text-inception-green hover:bg-gray-100 transition-colors px-8 py-3 rounded-lg font-medium inline-flex items-center">
                  احصل على تحليل مجاني
                  <ArrowRight size={18} className="mr-2" />
                </Link>
                <button className="bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors px-6 py-3 rounded-lg inline-flex items-center">
                  <Users size={18} className="ml-2" />
                  تحدث مع خبير SEO
                </button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SeoServices;