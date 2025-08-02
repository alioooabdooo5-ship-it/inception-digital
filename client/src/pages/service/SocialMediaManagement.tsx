import React, { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Share2, Heart, MessageCircle, TrendingUp, ArrowRight, CheckCircle, Calendar, BarChart3, Users } from "lucide-react";
import { Link } from "react-router-dom";

const SocialMediaManagement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <Calendar size={24} />,
      title: "إدارة المحتوى اليومي",
      description: "محتوى يومي احترافي يبني علاقة قوية مع جمهورك ويحفز على التفاعل والشراء",
      features: [
        "تخطيط المحتوى الشهري والأسبوعي",
        "إنشاء محتوى بصري جذاب ومتنوع",
        "كتابة نصوص إبداعية ومقنعة",
        "جدولة النشر في الأوقات المثلى"
      ]
    },
    {
      icon: <Users size={24} />,
      title: "بناء وإدارة المجتمع",
      description: "بناء مجتمع نشط حول علامتك التجارية يزيد الولاء ويحفز العملاء على التوصية",
      features: [
        "الرد على التعليقات والرسائل",
        "إنشاء حملات تفاعلية ومسابقات",
        "بناء علاقات قوية مع المتابعين",
        "إدارة الأزمات والتعامل مع الشكاوى"
      ]
    },
    {
      icon: <BarChart3 size={24} />,
      title: "تحليل الأداء والتحسين",
      description: "مراقبة مستمرة للأداء وتحليل البيانات لتحسين الاستراتيجية وزيادة النتائج",
      features: [
        "تقارير أداء شاملة ودورية",
        "تحليل سلوك الجمهور والتفاعل",
        "قياس معدل التحويل والمبيعات",
        "تحسين الاستراتيجية بناءً على البيانات"
      ]
    },
    {
      icon: <TrendingUp size={24} />,
      title: "الحملات الإعلانية المدفوعة",
      description: "حملات إعلانية مدروسة على منصات التواصل لزيادة الوصول وتحقيق أهداف محددة",
      features: [
        "إعداد وإدارة حملات فيسبوك وإنستجرام",
        "استهداف دقيق للجمهور المناسب",
        "إنشاء إعلانات جذابة ومقنعة",
        "تحسين الحملات لأفضل عائد استثمار"
      ]
    }
  ];

  const platforms = [
    {
      name: "فيسبوك",
      icon: "📘",
      description: "أكبر منصة تواصل اجتماعي مع جمهور متنوع",
      advantages: [
        "وصول واسع لجميع الفئات العمرية",
        "إمكانيات إعلانية متقدمة",
        "أدوات تحليل مفصلة",
        "تفاعل عالي مع المحتوى البصري"
      ]
    },
    {
      name: "إنستجرام",
      icon: "📸",
      description: "منصة بصرية مثالية للعلامات التجارية الحديثة",
      advantages: [
        "محتوى بصري عالي الجودة",
        "جمهور شاب ونشط",
        "Stories و Reels للوصول الأوسع",
        "تسوق مباشر من المنصة"
      ]
    },
    {
      name: "تيك توك",
      icon: "🎵",
      description: "المنصة الأسرع نمواً للوصول للجمهور الشاب",
      advantages: [
        "انتشار فيرال سريع",
        "محتوى إبداعي وتفاعلي",
        "جمهور شاب ومؤثر",
        "تكلفة إعلانية منخفضة"
      ]
    },
    {
      name: "لينكدإن",
      icon: "💼",
      description: "الشبكة المهنية الأولى للأعمال B2B",
      advantages: [
        "جمهور مهني وصناع قرار",
        "محتوى احترافي عالي الجودة",
        "بناء شبكة أعمال قوية",
        "فرص تعاون وشراكات"
      ]
    },
    {
      name: "يوتيوب",
      icon: "📺",
      description: "أكبر منصة فيديو لبناء الثقة والخبرة",
      advantages: [
        "محتوى طويل المدى",
        "بناء سلطة وخبرة",
        "SEO قوي للفيديوهات",
        "مونتة للربح المباشر"
      ]
    },
    {
      name: "تويتر",
      icon: "🐦",
      description: "منصة الأخبار والنقاشات السريعة",
      advantages: [
        "تفاعل سريع ومباشر",
        "متابعة الترندات",
        "بناء فكر قيادي",
        "خدمة عملاء فورية"
      ]
    }
  ];

  const portfolio = [
    {
      title: "مطعم فاخر - سلسلة مطاعم",
      description: "إدارة شاملة لحسابات السوشيال ميديا مع حملات إعلانية مستهدفة",
      results: {
        followers: "+180% زيادة المتابعين",
        engagement: "+250% معدل التفاعل",
        sales: "+200% زيادة الطلبات من السوشيال"
      },
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      platforms: ["فيسبوك", "إنستجرام", "تيك توك"]
    },
    {
      title: "علامة أزياء نسائية",
      description: "بناء مجتمع نشط وحملات تفاعلية لزيادة الوعي بالعلامة التجارية",
      results: {
        reach: "+300% زيادة الوصول الشهري",
        engagement: "+220% معدل التفاعل",
        conversion: "+160% معدل التحويل للمتجر"
      },
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      platforms: ["إنستجرام", "تيك توك", "فيسبوك"]
    },
    {
      title: "شركة استشارات تقنية",
      description: "بناء سلطة مهنية وجذب عملاء جدد من خلال المحتوى المتخصص",
      results: {
        leads: "+280% زيادة الاستفسارات",
        connections: "+150% زيادة الشبكة المهنية",
        authority: "رائد فكري في المجال"
      },
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      platforms: ["لينكدإن", "تويتر", "يوتيوب"]
    }
  ];

  const process = [
    {
      step: "01",
      title: "تحليل العلامة التجارية",
      description: "نبدأ بفهم علامتك التجارية وجمهورك المستهدف لوضع استراتيجية مخصصة."
    },
    {
      step: "02",
      title: "وضع الاستراتيجية",
      description: "نضع خطة محتوى شاملة مع تحديد المنصات المناسبة والأهداف المحددة."
    },
    {
      step: "03",
      title: "إنتاج ونشر المحتوى",
      description: "ننتج محتوى عالي الجودة وننشره في الأوقات المثلى لأقصى تفاعل."
    },
    {
      step: "04",
      title: "التفاعل والتحليل",
      description: "نتفاعل مع الجمهور ونحلل النتائج لتحسين الاستراتيجية باستمرار."
    }
  ];

  const stats = [
    {
      number: "+2M",
      label: "إجمالي المتابعين المكتسبين",
      icon: <Users className="text-inception-purple" size={24} />
    },
    {
      number: "850%",
      label: "متوسط زيادة التفاعل",
      icon: <Heart className="text-inception-green" size={24} />
    },
    {
      number: "+50",
      label: "حساب نديره بنجاح",
      icon: <Share2 className="text-inception-orange" size={24} />
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
                    <Share2 size={16} className="ml-2" />
                    إدارة السوشيال ميديا
                  </div>
                  
                  <h1 className="headline-large text-inception-purple leading-tight">
                    إدارة السوشيال ميديا
                    <span className="block text-inception-orange">التي تبني علامة تجارية قوية</span>
                  </h1>
                  
                  <p className="body-large text-gray-700">
                    الناس بتدور على البراندات اللي عندها محتوى مقنع، مش مجرد بوستات والسلام! 
                    نبني براند قوي على السوشيال ميديا يخلي عملاءك يحبوك ويوصوا بيك للناس.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact" className="btn-primary">
                    احصل على استراتيجية مجانية
                    <ArrowRight size={18} className="mr-2" />
                  </Link>
                  <button className="btn-outline inline-flex items-center">
                    <BarChart3 size={18} className="ml-2" />
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
                    src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Social Media Management"
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 glass-card p-6 shadow-lg animate-float">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-12 h-12 bg-inception-orange bg-opacity-20 rounded-full flex items-center justify-center">
                        <TrendingUp className="text-inception-orange" size={24} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">نمو المتابعين</div>
                        <div className="text-xl font-bold text-inception-purple">+285%</div>
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
                خدماتنا في إدارة السوشيال ميديا
              </h2>
              <p className="body-large text-gray-700">
                إدارة شاملة لحساباتك على منصات التواصل الاجتماعي لبناء علامة تجارية قوية
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

        {/* Platforms Section */}
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,102,0,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="headline-medium text-inception-purple mb-6">
                المنصات التي نديرها لك
              </h2>
              <p className="body-large text-gray-700">
                نختار المنصات المناسبة لطبيعة بيزنسك ونديرها بطريقة احترافية
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platforms.map((platform, index) => (
                <AnimatedSection 
                  key={index}
                  variant="fade-in"
                  delay={index * 100}
                  className="glass-card p-6 space-y-4"
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="text-3xl">{platform.icon}</div>
                    <h3 className="title-medium text-inception-purple">{platform.name}</h3>
                  </div>
                  
                  <p className="text-gray-700 text-sm">{platform.description}</p>
                  
                  <ul className="space-y-2">
                    {platform.advantages.map((advantage, advantageIndex) => (
                      <li key={advantageIndex} className="flex items-start space-x-2 space-x-reverse">
                        <CheckCircle size={14} className="text-inception-green mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-xs">{advantage}</span>
                      </li>
                    ))}
                  </ul>
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
                قصص نجاح عملائنا
              </h2>
              <p className="body-large text-gray-700">
                نتائج حقيقية حققناها لعملائنا في إدارة السوشيال ميديا
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
                    <div className="absolute top-4 right-4 bg-inception-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                      نشط
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <h3 className="title-medium text-inception-purple">{project.title}</h3>
                    <p className="text-gray-700 text-sm">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.platforms.map((platform, platformIndex) => (
                        <span key={platformIndex} className="bg-inception-orange bg-opacity-10 text-inception-orange text-xs px-2 py-1 rounded-full">
                          {platform}
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
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_30%_70%,rgba(55,18,79,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="headline-medium text-inception-purple mb-6">
                كيف نبني استراتيجيتك خطوة بخطوة
              </h2>
              <p className="body-large text-gray-700">
                منهجية علمية مجربة لبناء حضور قوي ومؤثر على السوشيال ميديا
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
                جاهز لبناء حضورك القوي؟
              </h2>
              <p className="body-large text-white/90 mb-8">
                احصل على استراتيجية مجانية مخصصة لعلامتك التجارية واكتشف كيف نبني لك مجتمع قوي ومتفاعل
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-white text-inception-orange hover:bg-gray-100 transition-colors px-8 py-3 rounded-lg font-medium inline-flex items-center">
                  احصل على استراتيجية مجانية
                  <ArrowRight size={18} className="mr-2" />
                </Link>
                <button className="bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors px-6 py-3 rounded-lg inline-flex items-center">
                  <MessageCircle size={18} className="ml-2" />
                  تحدث مع خبير سوشيال ميديا
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

export default SocialMediaManagement;