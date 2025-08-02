import React, { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Target, Users, TrendingUp, DollarSign, Eye, MousePointer, ArrowRight, CheckCircle, BarChart3, Zap } from "lucide-react";
import { Link } from "wouter";

const PaidAds = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const platforms = [
    {
      name: "فيسبوك وإنستجرام",
      icon: "📱",
      description: "الأفضل للوصول للجمهور العام وبناء الوعي بالعلامة التجارية",
      benefits: [
        "استهداف دقيق حسب الاهتمامات والسلوك",
        "تنوع في أشكال الإعلانات (صور، فيديو، كاروسيل)",
        "إمكانيات إعادة استهداف متقدمة",
        "تكلفة منخفضة مقارنة بالقنوات التقليدية"
      ]
    },
    {
      name: "جوجل أدز",
      icon: "🔍",
      description: "الأمثل للوصول للعملاء الذين يبحثون عن خدماتك بالفعل",
      benefits: [
        "استهداف بناءً على الكلمات المفتاحية",
        "ظهور في نتائج البحث الأولى",
        "استهداف جغرافي دقيق",
        "قياس دقيق لعائد الاستثمار"
      ]
    },
    {
      name: "تيك توك",
      icon: "🎵",
      description: "للوصول للجمهور الشاب وتحقيق انتشار واسع بسرعة",
      benefits: [
        "محتوى فيرال عالي التفاعل",
        "جمهور شاب ونشيط",
        "تكلفة منخفضة في البداية",
        "إمكانيات إبداعية عالية"
      ]
    },
    {
      name: "لينكدإن",
      icon: "💼",
      description: "المنصة المثالية للأعمال B2B والخدمات المهنية",
      benefits: [
        "استهداف المهنيين وصناع القرار",
        "بناء علاقات تجارية قوية",
        "محتوى احترافي عالي الجودة",
        "شبكة تواصل مهني واسعة"
      ]
    }
  ];

  const services = [
    {
      icon: <Users size={24} />,
      title: "تحليل وتحديد الجمهور المستهدف",
      description: "نحدد الجمهور الذي سيشتري منك فعلاً، مش مجرد متابعين",
      details: [
        "تحليل سلوك العملاء الحاليين",
        "دراسة المنافسين واستراتيجياتهم",
        "إنشاء personas مفصلة للعملاء المحتملين",
        "اختبار شرائح جمهور مختلفة"
      ]
    },
    {
      icon: <Target size={24} />,
      title: "إنشاء وإدارة الحملات الإعلانية",
      description: "حملات مدروسة تحول كل جنيه لمبيعات حقيقية",
      details: [
        "إعداد حملات احترافية على جميع المنصات",
        "كتابة نصوص إعلانية مقنعة",
        "اختيار الصور والفيديوهات المناسبة",
        "تحسين الحملات بشكل مستمر"
      ]
    },
    {
      icon: <BarChart3 size={24} />,
      title: "تحليل النتائج والتحسين المستمر",
      description: "نراقب الحملات لحظة بلحظة ونحسنها لضمان أفضل النتائج",
      details: [
        "تقارير تفصيلية عن أداء الحملات",
        "تحليل معدلات التحويل والمبيعات",
        "اختبار A/B للإعلانات المختلفة",
        "تحسين الاستهداف والميزانية"
      ]
    },
    {
      icon: <Zap size={24} />,
      title: "استراتيجيات إعادة الاستهداف",
      description: "نستهدف العملاء الذين زاروا موقعك بإعلانات مخصصة لهم",
      details: [
        "إعداد بيكسل التتبع على الموقع",
        "إنشاء audiences مخصصة",
        "حملات إعادة استهداف متقدمة",
        "زيادة معدلات التحويل"
      ]
    }
  ];

  const results = [
    {
      metric: "متوسط زيادة المبيعات",
      value: "+240%",
      description: "خلال أول 3 أشهر من الحملة"
    },
    {
      metric: "تحسين تكلفة العميل",
      value: "-65%",
      description: "انخفاض في تكلفة اكتساب العميل"
    },
    {
      metric: "زيادة معدل التحويل",
      value: "+180%",
      description: "من زيارة الموقع إلى عملية شراء"
    },
    {
      metric: "عائد الاستثمار",
      value: "5:1",
      description: "كل جنيه في الإعلانات يحقق 5 جنيه مبيعات"
    }
  ];

  const process = [
    {
      step: "01",
      title: "التحليل والاستراتيجية",
      description: "نبدأ بتحليل شامل لبيزنسك والمنافسين، ونضع استراتيجية إعلانية مخصصة تحقق أهدافك المحددة."
    },
    {
      step: "02",
      title: "إعداد الحملات",
      description: "نجهز الحملات الإعلانية بعناية، من اختيار المنصات المناسبة إلى كتابة النصوص الإعلانية المقنعة."
    },
    {
      step: "03",
      title: "التنفيذ والمراقبة",
      description: "نطلق الحملات ونراقبها بشكل مستمر، مع تعديلات فورية لضمان أفضل أداء ونتائج."
    },
    {
      step: "04",
      title: "التحليل والتحسين",
      description: "نحلل البيانات ونحسن الحملات باستمرار، مع تقارير دورية شاملة عن الأداء والنتائج."
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
                  <div className="inline-flex items-center bg-inception-orange bg-opacity-10 text-inception-orange px-4 py-2 rounded-full text-sm font-medium">
                    <Target size={16} className="ml-2" />
                    الإعلانات المدفوعة
                  </div>
                  
                  <h1 className="headline-large text-inception-purple leading-tight">
                    الإعلانات والمديا باينج
                    <span className="block text-inception-orange">التي تحول كل جنيه لمبيعات</span>
                  </h1>
                  
                  <p className="body-large text-gray-700">
                    مش أي إعلان ناجح يبقى إعلان بيبيع. الفرق إننا مش بنرمي فلوس في الإعلانات ونستنى الحظ، 
                    إحنا بنشتغل بأسلوب منظم يخلي كل جنيه يتحول لمبيعات حقيقية.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact" className="btn-primary">
                    احصل على استشارة مجانية
                    <ArrowRight size={18} className="mr-2" />
                  </Link>
                  <button className="btn-outline inline-flex items-center">
                    <BarChart3 size={18} className="ml-2" />
                    شاهد نتائجنا
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-200">
                  <div>
                    <div className="text-2xl font-bold text-inception-purple mb-1">+5M</div>
                    <div className="text-sm text-gray-600">جنيه أنفقناها في إعلانات ناجحة</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-inception-purple mb-1">240%</div>
                    <div className="text-sm text-gray-600">متوسط زيادة المبيعات</div>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection variant="fade-in-left" className="relative">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Paid Advertising"
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 glass-card p-6 shadow-lg animate-float">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-12 h-12 bg-inception-green bg-opacity-20 rounded-full flex items-center justify-center">
                        <DollarSign className="text-inception-green" size={24} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">عائد الاستثمار</div>
                        <div className="text-xl font-bold text-inception-purple">5:1</div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-20 bg-inception-purple text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_50%)]" />
          
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="headline-medium text-white mb-6">
                نتائج حقيقية حققناها لعملائنا
              </h2>
              <p className="body-large text-white/90">
                أرقام ونتائج فعلية من حملاتنا الإعلانية الناجحة
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {results.map((result, index) => (
                <AnimatedSection 
                  key={index}
                  variant="scale-in"
                  delay={index * 100}
                  className="text-center"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-3xl font-bold text-inception-orange mb-2">{result.value}</div>
                    <h3 className="title-small text-white mb-2">{result.metric}</h3>
                    <p className="text-white/80 text-sm">{result.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="headline-medium text-inception-purple mb-6">
                المنصات الإعلانية التي نتقنها
              </h2>
              <p className="body-large text-gray-700">
                نختار المنصة المناسبة لطبيعة بيزنسك وجمهورك المستهدف
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {platforms.map((platform, index) => (
                <AnimatedSection 
                  key={index}
                  variant="fade-in"
                  delay={index * 100}
                  className="glass-card p-8 space-y-6"
                >
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="text-4xl">{platform.icon}</div>
                    <h3 className="title-medium text-inception-purple">{platform.name}</h3>
                  </div>
                  
                  <p className="body-medium text-gray-700">{platform.description}</p>
                  
                  <ul className="space-y-3">
                    {platform.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start space-x-3 space-x-reverse">
                        <CheckCircle size={16} className="text-inception-green mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,102,0,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="headline-medium text-inception-purple mb-6">
                خدماتنا في الإعلانات المدفوعة
              </h2>
              <p className="body-large text-gray-700">
                خدمات شاملة لإدارة حملاتك الإعلانية وتحقيق أقصى عائد من استثمارك
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
                    <div className="w-16 h-16 bg-inception-orange bg-opacity-10 rounded-xl flex items-center justify-center text-inception-orange">
                      {service.icon}
                    </div>
                    <h3 className="title-medium text-inception-purple">{service.title}</h3>
                  </div>
                  
                  <p className="body-medium text-gray-700">{service.description}</p>
                  
                  <ul className="space-y-3">
                    {service.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-3 space-x-reverse">
                        <CheckCircle size={16} className="text-inception-green mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
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
                كيف نبني حملاتك الإعلانية
              </h2>
              <p className="body-large text-gray-700">
                منهجية علمية مجربة لضمان نجاح حملاتك وتحقيق أهدافك
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
                    <div className="w-16 h-16 bg-inception-orange text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="title-small text-inception-purple mb-3">{step.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
                  </div>
                  
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-inception-orange bg-opacity-30 transform translate-x-4" />
                  )}
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-inception-orange relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_50%)]" />
          
          <div className="container mx-auto px-4 md:px-6 text-center">
            <AnimatedSection className="max-w-3xl mx-auto space-y-8">
              <h2 className="headline-medium text-white mb-6">
                جاهز لمضاعفة مبيعاتك؟
              </h2>
              <p className="body-large text-white/90 mb-8">
                احصل على استشارة مجانية واكتشف كيف يمكن للإعلانات الذكية أن تحول استثمارك لأرباح مضاعفة
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-white text-inception-orange hover:bg-gray-100 transition-colors px-8 py-4 rounded-lg font-semibold inline-flex items-center">
                  احصل على استشارة مجانية
                  <ArrowRight size={18} className="mr-2" />
                </Link>
                <button className="bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors px-6 py-3 rounded-lg inline-flex items-center">
                  <Eye size={18} className="ml-2" />
                  شاهد دراسات الحالة
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

export default PaidAds;