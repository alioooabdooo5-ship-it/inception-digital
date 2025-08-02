import React, { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Video, Camera, Edit, Palette, Mic, Monitor, ArrowRight, CheckCircle, Play, Users, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const MediaProduction = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <Camera size={24} />,
      title: "التصوير الاحترافي للمنتجات",
      description: "تصوير احترافي يبرز جودة وقيمة منتجاتك بطريقة تجذب العملاء وتحفزهم على الشراء",
      features: [
        "تصوير المنتجات بجودة عالية وإضاءة احترافية",
        "التقاط زوايا مختلفة تظهر تفاصيل المنتج",
        "استخدام خلفيات مناسبة لطبيعة المنتج",
        "معالجة الصور وتحسينها للاستخدام التسويقي"
      ]
    },
    {
      icon: <Video size={24} />,
      title: "إنتاج الفيديوهات التسويقية",
      description: "فيديوهات ترويجية احترافية تحكي قصة علامتك التجارية وتقنع العملاء بالشراء",
      features: [
        "كتابة سكريبت قوي ومقنع",
        "تصوير باستخدام معدات احترافية",
        "مونتاج وتحرير عالي الجودة",
        "إضافة موسيقى وتأثيرات صوتية مناسبة"
      ]
    },
    {
      icon: <Palette size={24} />,
      title: "تصميم المحتوى البصري",
      description: "تصميمات جذابة للسوشيال ميديا والمواقع الإلكترونية تعكس هوية علامتك التجارية",
      features: [
        "تصميم بوستات السوشيال ميديا",
        "إنشاء الإنفوجرافيك والمحتوى التفاعلي",
        "تصميم البنرات والإعلانات الرقمية",
        "تطوير الهوية البصرية المتكاملة"
      ]
    },
    {
      icon: <Edit size={24} />,
      title: "مونتاج واخراج الفيديوهات",
      description: "مونتاج احترافي يحول المحتوى الخام إلى مادة تسويقية قوية ومؤثرة",
      features: [
        "مونتاج فيديوهات إعلانية قصيرة",
        "إنتاج فيديوهات تعريفية بالشركة",
        "مونتاج التيزر والتريلر",
        "إضافة الجرافيك والنصوص التفاعلية"
      ]
    }
  ];

  const portfolio = [
    {
      title: "حملة إعلانية لمطعم فاخر",
      description: "زيادة المبيعات بنسبة 180% خلال شهرين",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "فيديو ترويجي لعلامة أزياء",
      description: "وصول لأكثر من مليون مشاهدة في أسبوع",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "محتوى تفاعلي لشركة تقنية",
      description: "زيادة التفاعل على السوشيال ميديا بنسبة 250%",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const process = [
    {
      step: "01",
      title: "التخطيط والاستراتيجية",
      description: "نبدأ بفهم أهدافك ونوع المحتوى المطلوب، ونضع خطة شاملة للإنتاج تتماشى مع رؤيتك ومتطلبات السوق المستهدف."
    },
    {
      step: "02", 
      title: "كتابة السكريبت والسيناريو",
      description: "نكتب سكريبت مقنع يحكي قصة علامتك التجارية بطريقة جذابة، مع التركيز على رسائل البيع الأساسية وعناصر الإقناع."
    },
    {
      step: "03",
      title: "التصوير والإنتاج",
      description: "نستخدم أحدث المعدات والتقنيات في التصوير، مع فريق محترف يضمن جودة عالية في كل تفاصيل الإنتاج."
    },
    {
      step: "04",
      title: "المونتاج والتحرير",
      description: "نقوم بمونتاج المحتوى وإضافة التأثيرات والجرافيك والموسيقى لننتج محتوى نهائي يحقق أهدافك التسويقية."
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
                    <Video size={16} className="ml-2" />
                    خدمات الميديا برودكشن
                  </div>
                  
                  <h1 className="headline-large text-inception-purple leading-tight">
                    الميديا برودكشن وصناعة المحتوى
                    <span className="block text-inception-orange">الذي يبيع حقاً</span>
                  </h1>
                  
                  <p className="body-large text-gray-700">
                    العميل مش هيشتري إلا لما يحس إن المنتج أو الخدمة تستاهل، وهنا بييجي دور المحتوى البصري. 
                    نصور، ننتج، ونكتب محتوى يخلي العميل يقتنع ويشتري فورًا.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact" className="btn-primary">
                    احصل على عرض سعر مجاني
                    <ArrowRight size={18} className="mr-2" />
                  </Link>
                  <button className="btn-outline inline-flex items-center">
                    <Play size={18} className="ml-2" />
                    شاهد أعمالنا
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-inception-purple mb-1">+500</div>
                    <div className="text-sm text-gray-600">مشروع منجز</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-inception-purple mb-1">180%</div>
                    <div className="text-sm text-gray-600">زيادة متوسطة في المبيعات</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-inception-purple mb-1">98%</div>
                    <div className="text-sm text-gray-600">رضا العملاء</div>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection variant="fade-in-left" className="relative">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Media Production"
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 glass-card p-6 shadow-lg animate-float">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-12 h-12 bg-inception-orange bg-opacity-20 rounded-full flex items-center justify-center">
                        <TrendingUp className="text-inception-orange" size={24} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">زيادة المبيعات</div>
                        <div className="text-xl font-bold text-inception-purple">+175%</div>
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
                خدماتنا في الميديا برودكشن
              </h2>
              <p className="body-large text-gray-700">
                نقدم مجموعة شاملة من خدمات إنتاج المحتوى البصري المصممة لتحقيق أهدافك التسويقية
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

        {/* Process Section */}
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,102,0,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="headline-medium text-inception-purple mb-6">
                كيف نعمل معك خطوة بخطوة
              </h2>
              <p className="body-large text-gray-700">
                عملية منظمة ومدروسة لضمان الحصول على أفضل النتائج
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
                    <div className="w-16 h-16 bg-inception-purple text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="title-small text-inception-purple mb-3">{step.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
                  </div>
                  
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-inception-purple bg-opacity-30 transform translate-x-4" />
                  )}
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
                أعمالنا الناجحة
              </h2>
              <p className="body-large text-gray-700">
                نتائج حقيقية حققناها لعملائنا في مجال الميديا برودكشن
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {portfolio.map((project, index) => (
                <AnimatedSection 
                  key={index}
                  variant="scale-in"
                  delay={index * 100}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="title-small mb-2">{project.title}</h3>
                      <p className="text-sm opacity-90">{project.description}</p>
                    </div>
                  </div>
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
                جاهز لبدء مشروعك؟
              </h2>
              <p className="body-large text-white/90 mb-8">
                احصل على استشارة مجانية واكتشف كيف يمكن للمحتوى البصري الاحترافي أن يضاعف مبيعاتك
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="btn-secondary">
                  احصل على عرض سعر مجاني
                  <ArrowRight size={18} className="mr-2" />
                </Link>
                <button className="bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors px-6 py-3 rounded-lg inline-flex items-center">
                  <Monitor size={18} className="ml-2" />
                  شاهد أعمالنا
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

export default MediaProduction;