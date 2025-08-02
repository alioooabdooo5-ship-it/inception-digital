import React, { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Globe, Code, Smartphone, Zap, ArrowRight, CheckCircle, Laptop, Shield, Users } from "lucide-react";
import { Link } from "wouter";

const WebDevelopment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <Globe size={24} />,
      title: "تصميم المواقع الاحترافية",
      description: "مواقع حديثة وجذابة تعكس هوية علامتك التجارية وتحقق أهدافك التسويقية",
      features: [
        "تصميم UI/UX حديث وجذاب",
        "تصميم متجاوب مع جميع الأجهزة",
        "تحسين تجربة المستخدم",
        "تصميم يركز على التحويل"
      ]
    },
    {
      icon: <Code size={24} />,
      title: "تطوير المواقع التقنية",
      description: "برمجة متقدمة باستخدام أحدث التقنيات لضمان أداء سريع وآمن",
      features: [
        "برمجة بأحدث التقنيات",
        "أداء سريع ومحسن للSEO",
        "حماية عالية للبيانات",
        "سهولة إدارة المحتوى"
      ]
    },
    {
      icon: <Smartphone size={24} />,
      title: "المتاجر الإلكترونية",
      description: "متاجر إلكترونية مكتملة الوظائف تساعدك على البيع أونلاين بفعالية",
      features: [
        "أنظمة دفع آمنة ومتعددة",
        "إدارة المنتجات والمخزون",
        "تتبع الطلبات والشحن",
        "تقارير المبيعات والتحليلات"
      ]
    },
    {
      icon: <Zap size={24} />,
      title: "تحسين الأداء والسرعة",
      description: "تحسين سرعة الموقع وأدائه لضمان تجربة مستخدم مثالية",
      features: [
        "تحسين سرعة التحميل",
        "ضغط الصور والملفات",
        "تحسين قواعد البيانات",
        "استخدام تقنيات التخزين المؤقت"
      ]
    }
  ];

  const portfolio = [
    {
      title: "متجر إلكتروني للأزياء",
      description: "متجر متكامل بأنظمة دفع متقدمة وإدارة مخزون ذكية",
      results: {
        conversion: "+180% معدل التحويل",
        speed: "95% نقاط الأداء",
        mobile: "100% متوافق مع الهواتف"
      },
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tech: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "موقع شركة استشارات",
      description: "موقع احترافي مع نظام حجز استشارات وإدارة العملاء",
      results: {
        leads: "+220% زيادة الاستفسارات",
        bounce: "-40% معدل الارتداد",
        seo: "صفحة أولى في جوجل"
      },
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tech: ["Next.js", "TypeScript", "PostgreSQL"]
    },
    {
      title: "منصة تعليمية تفاعلية",
      description: "منصة تعلم إلكترونية مع نظام إدارة الكورسات والطلاب",
      results: {
        users: "+15,000 مستخدم نشط",
        engagement: "+85% معدل إكمال الكورسات",
        revenue: "+300% زيادة الإيرادات"
      },
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tech: ["Vue.js", "Laravel", "MySQL"]
    }
  ];

  const technologies = [
    { name: "React", icon: "⚛️", description: "مكتبة JavaScript الأكثر شعبية لبناء واجهات المستخدم التفاعلية" },
    { name: "Next.js", icon: "▲", description: "إطار عمل React للتطبيقات عالية الأداء مع SEO محسن" },
    { name: "Node.js", icon: "🟢", description: "بيئة تشغيل JavaScript للخوادم عالية الأداء" },
    { name: "TypeScript", icon: "🔷", description: "JavaScript مع أنواع البيانات للكود الآمن والموثوق" },
    { name: "MongoDB", icon: "🍃", description: "قاعدة بيانات NoSQL مرنة وقابلة للتطوير" },
    { name: "PostgreSQL", icon: "🐘", description: "قاعدة بيانات علاقية قوية ومحسنة للأداء" }
  ];

  const process = [
    {
      step: "01",
      title: "التحليل والتخطيط",
      description: "نبدأ بفهم احتياجاتك وأهدافك ونضع خطة تطوير شاملة مع تحديد المتطلبات الفنية."
    },
    {
      step: "02",
      title: "التصميم والنمذجة",
      description: "نصمم واجهات المستخدم ونضع هيكل الموقع ونموذج قواعد البيانات المطلوبة."
    },
    {
      step: "03",
      title: "التطوير والبرمجة",
      description: "نطور الموقع باستخدام أحدث التقنيات مع اختبار مستمر لضمان الجودة والأداء."
    },
    {
      step: "04",
      title: "النشر والصيانة",
      description: "ننشر الموقع على خوادم آمنة ونقدم دعم مستمر وتحديثات دورية."
    }
  ];

  const stats = [
    {
      number: "+150",
      label: "موقع مطور بنجاح",
      icon: <Globe className="text-inception-purple" size={24} />
    },
    {
      number: "99.9%",
      label: "معدل الاستقرار والأمان",
      icon: <Shield className="text-inception-green" size={24} />
    },
    {
      number: "<2s",
      label: "متوسط سرعة التحميل",
      icon: <Zap className="text-inception-orange" size={24} />
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
                  <div className="inline-flex items-center bg-inception-purple bg-opacity-10 text-inception-purple px-4 py-2 rounded-full text-sm font-medium">
                    <Globe size={16} className="ml-2" />
                    تطوير المواقع الإلكترونية
                  </div>
                  
                  <h1 className="headline-large text-inception-purple leading-tight">
                    تصميم وتطوير المواقع
                    <span className="block text-inception-orange">التي تبيع وتحقق النتائج</span>
                  </h1>
                  
                  <p className="body-large text-gray-700">
                    الموقع مش مجرد شكل، الموقع هو أهم موظف مبيعات عندك! نصمم مواقع بتقنع، بتبيع، وبتخلي العميل ياخد قرار الشراء أو يتواصل معاك فورًا.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact" className="btn-primary">
                    احصل على عرض سعر مجاني
                    <ArrowRight size={18} className="mr-2" />
                  </Link>
                  <button className="btn-outline inline-flex items-center">
                    <Laptop size={18} className="ml-2" />
                    شاهد أعمالنا
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
                    src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Web Development"
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 glass-card p-6 shadow-lg animate-float">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-12 h-12 bg-inception-orange bg-opacity-20 rounded-full flex items-center justify-center">
                        <Code className="text-inception-orange" size={24} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">وقت التطوير</div>
                        <div className="text-xl font-bold text-inception-purple">2-4 أسابيع</div>
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
                خدماتنا في تطوير المواقع
              </h2>
              <p className="body-large text-gray-700">
                نقدم حلول ويب شاملة من التصميم إلى التطوير والصيانة
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
                    <div className="w-16 h-16 bg-inception-purple bg-opacity-10 rounded-xl flex items-center justify-center text-inception-purple">
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

        {/* Technologies Section */}
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_70%_30%,rgba(55,18,79,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="headline-medium text-inception-purple mb-6">
                التقنيات التي نستخدمها
              </h2>
              <p className="body-large text-gray-700">
                نستخدم أحدث وأقوى التقنيات لضمان مواقع سريعة وآمنة ومتطورة
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.map((tech, index) => (
                <AnimatedSection 
                  key={index}
                  variant="fade-in"
                  delay={index * 100}
                  className="glass-card p-6 text-center space-y-4"
                >
                  <div className="text-4xl">{tech.icon}</div>
                  <h3 className="title-small text-inception-purple">{tech.name}</h3>
                  <p className="text-gray-700 text-sm">{tech.description}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="headline-medium text-inception-purple mb-6">
                أعمالنا المميزة
              </h2>
              <p className="body-large text-gray-700">
                مشاريع ناجحة طورناها لعملائنا بتقنيات متقدمة ونتائج ملموسة
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {portfolio.map((project, index) => (
                <AnimatedSection 
                  key={index}
                  variant="scale-in"
                  delay={index * 100}
                  className="glass-card overflow-hidden group cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-inception-purple text-white px-3 py-1 rounded-full text-sm font-medium">
                      مكتمل
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <h3 className="title-medium text-inception-purple">{project.title}</h3>
                    <p className="text-gray-700 text-sm">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-inception-purple bg-opacity-10 text-inception-purple text-xs px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="space-y-2 border-t pt-4">
                      {Object.entries(project.results).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-xs text-gray-600 capitalize">{key}:</span>
                          <span className="text-sm font-medium text-inception-green">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,102,0,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="headline-medium text-inception-purple mb-6">
                كيف نطور موقعك خطوة بخطوة
              </h2>
              <p className="body-large text-gray-700">
                عملية منظمة ومدروسة لضمان تطوير موقع يحقق أهدافك
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
        <section className="py-20 bg-inception-purple relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_50%)]" />
          
          <div className="container mx-auto px-4 md:px-6 text-center">
            <AnimatedSection className="max-w-3xl mx-auto space-y-8">
              <h2 className="headline-medium text-white mb-6">
                جاهز لإنشاء موقعك المميز؟
              </h2>
              <p className="body-large text-white/90 mb-8">
                احصل على استشارة مجانية واكتشف كيف يمكن لموقع احترافي أن يضاعف مبيعاتك
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="btn-secondary">
                  احصل على عرض سعر مجاني
                  <ArrowRight size={18} className="mr-2" />
                </Link>
                <button className="bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors px-6 py-3 rounded-lg inline-flex items-center">
                  <Users size={18} className="ml-2" />
                  تحدث مع مطور
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

export default WebDevelopment;