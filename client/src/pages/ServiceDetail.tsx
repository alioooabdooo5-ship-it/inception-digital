import React, { useEffect } from "react";
import { useParams, Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  Star, 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp,
  Shield,
  Phone,
  Mail,
  MessageCircle
} from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import type { Service } from "@shared/schema";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: service, isLoading } = useQuery<Service>({
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
              <p className="mt-4 text-gray-600">جاري تحميل تفاصيل الخدمة...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">الخدمة غير موجودة</h1>
            <p className="text-gray-600 mb-8">لم نتمكن من العثور على الخدمة المطلوبة</p>
            <Link to="/services" className="btn-primary">
              العودة إلى الخدمات
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Parse extended data from service
  const serviceData = service as any;
  const portfolioItems = serviceData.portfolioItems || [];
  const features = serviceData.features || [];
  const processSteps = serviceData.processSteps || [];
  const testimonials = serviceData.testimonials || [];
  const packages = serviceData.packages || [];
  const faqs = serviceData.faqs || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-inception-purple/5">
      <Header />
      
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-inception-purple/10 via-transparent to-inception-orange/10" />
          <div className="absolute top-10 left-10 w-72 h-72 bg-inception-purple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-inception-orange/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <AnimatedSection>
                <div className="mb-6">
                  <Link to="/services" className="inline-flex items-center text-inception-purple hover:text-inception-orange transition-colors">
                    <span className="ml-2">← العودة للخدمات</span>
                  </Link>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-inception-purple/10 rounded-2xl flex items-center justify-center text-inception-purple ml-4">
                    {service.icon && getIconComponent(typeof service.icon === 'string' ? service.icon : 'video')}
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-inception-purple leading-tight">
                      {service.title}
                    </h1>
                    <div className="flex items-center mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-gray-600 mr-2">(4.9 من 5)</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xl text-gray-800 leading-relaxed mb-8">
                  {service.description}
                </p>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-inception-orange ml-2" />
                    <span className="text-gray-700">+50 عميل راضي</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-inception-orange ml-2" />
                    <span className="text-gray-700">{service.stats || '+200% زيادة النتائج'}</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-inception-orange ml-2" />
                    <span className="text-gray-700">ضمان استرداد الأموال</span>
                  </div>
                </div>
                
                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="bg-inception-orange hover:bg-inception-orange/90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg inline-flex items-center">
                    احجز استشارة مجانية (30 دقيقة)
                    <ArrowUpRight className="w-5 h-5 mr-2" />
                  </Link>
                  <Link to="#packages" className="btn-outline px-8 py-4 inline-flex items-center">
                    اطلب عرض سعر مجاني
                  </Link>
                </div>
                
                {/* Quick Contact */}
                <div className="mt-8 p-6 bg-inception-purple/5 rounded-2xl border border-inception-purple/10">
                  <p className="text-inception-purple font-semibold mb-3">تحتاج للتحدث معنا الآن؟</p>
                  <div className="flex flex-wrap gap-4">
                    <a href="tel:01012345678" className="flex items-center text-inception-purple hover:text-inception-orange transition-colors">
                      <Phone className="w-4 h-4 ml-2" />
                      01012345678
                    </a>
                    <a href="mailto:info@inception-eg.com" className="flex items-center text-inception-purple hover:text-inception-orange transition-colors">
                      <Mail className="w-4 h-4 ml-2" />
                      info@inception-eg.com
                    </a>
                    <a href="https://wa.me/201012345678" className="flex items-center text-inception-purple hover:text-inception-orange transition-colors">
                      <MessageCircle className="w-4 h-4 ml-2" />
                      واتساب
                    </a>
                  </div>
                </div>
              </AnimatedSection>
              
              {/* Image */}
              <AnimatedSection delay={300}>
                <div className="relative">
                  <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                      src={service.image || `https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80`}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Floating Stats */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-inception-purple">{service.stats?.split(' ')[0] || '+200%'}</div>
                      <div className="text-gray-600 text-sm">زيادة النتائج</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Service Overview */}
        {serviceData.longDescription && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <AnimatedSection className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-inception-purple text-center mb-12">
                  نظرة شاملة على الخدمة
                </h2>
                <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: serviceData.longDescription }} />
                </div>
              </AnimatedSection>
            </div>
          </section>
        )}

        {/* Features */}
        {features.length > 0 && (
          <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
              <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-inception-purple mb-6">
                  ما يميز خدمتنا؟
                </h2>
                <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                  مزايا حصرية تضمن لك أفضل النتائج وتفوق توقعاتك
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature: any, index: number) => (
                  <AnimatedSection key={feature.id} delay={index * 150}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full">
                      <div className="w-16 h-16 bg-inception-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-inception-purple" />
                      </div>
                      <h3 className="text-xl font-bold text-inception-purple mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-800 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Process Steps */}
        {processSteps.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-inception-purple mb-6">
                  كيف نعمل معك؟
                </h2>
                <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                  منهجية واضحة ومنظمة لضمان تحقيق أهدافك بأعلى مستوى من الجودة
                </p>
              </AnimatedSection>

              <div className="max-w-4xl mx-auto">
                {processSteps.map((step: any, index: number) => (
                  <AnimatedSection key={step.id} delay={index * 200}>
                    <div className="flex items-start mb-12 last:mb-0">
                      <div className="flex-shrink-0 ml-6">
                        <div className="w-16 h-16 bg-inception-purple rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold text-inception-purple mb-4">
                          {step.title}
                        </h3>
                        <p className="text-gray-800 text-lg leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Portfolio/Case Studies */}
        {portfolioItems.length > 0 && (
          <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
              <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-inception-purple mb-6">
                  نماذج من أعمالنا
                </h2>
                <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                  نتائج حقيقية حققناها لعملائنا في نفس مجالك
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioItems.map((item: any, index: number) => (
                  <AnimatedSection key={item.id} delay={index * 150}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-inception-purple mb-3">
                          {item.title}
                        </h3>
                        <p className="text-gray-800 mb-4 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-inception-orange font-semibold">
                            {item.result}
                          </span>
                          <span className="text-gray-600 text-sm">
                            {item.clientName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-inception-purple mb-6">
                  ماذا يقول عملاؤنا؟
                </h2>
                <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                  شهادات حقيقية من عملاء حققوا نجاحات مذهلة معنا
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial: any, index: number) => (
                  <AnimatedSection key={testimonial.id} delay={index * 150}>
                    <div className="bg-gray-50 rounded-2xl p-8 h-full">
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-800 text-lg mb-6 leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center">
                        {testimonial.image && (
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover ml-4"
                          />
                        )}
                        <div>
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
        )}

        {/* Packages */}
        {packages.length > 0 && (
          <section id="packages" className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
              <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-inception-purple mb-6">
                  اختر الباقة المناسبة لك
                </h2>
                <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                  باقات مصممة خصيصاً لتناسب احتياجاتك وميزانيتك
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {packages.map((pkg: any, index: number) => (
                  <AnimatedSection key={pkg.id} delay={index * 150} className="relative">
                    {pkg.highlighted && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-inception-orange text-white px-6 py-2 rounded-full text-sm font-semibold">
                        الأكثر شعبية
                      </div>
                    )}
                    <div className={`bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full ${pkg.highlighted ? 'border-2 border-inception-orange' : ''}`}>
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-inception-purple mb-4">{pkg.name}</h3>
                        <div className="mb-4">
                          <span className="text-4xl font-bold text-inception-orange">{pkg.price}</span>
                        </div>
                        <p className="text-gray-600">{pkg.description}</p>
                      </div>
                      
                      {pkg.features && (
                        <ul className="space-y-4 mb-8">
                          {pkg.features.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-center">
                              <CheckCircle className="w-5 h-5 text-green-500 ml-3 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      <Link 
                        to="/contact" 
                        className={`w-full py-4 px-6 rounded-xl font-semibold text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg block ${
                          pkg.highlighted 
                            ? 'bg-inception-orange hover:bg-inception-orange/90 text-white' 
                            : 'bg-inception-purple hover:bg-inception-purple/90 text-white'
                        }`}
                      >
                        ابدأ الآن
                      </Link>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        {faqs.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-inception-purple mb-6">
                  الأسئلة الشائعة
                </h2>
                <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                  إجابات على أهم الأسئلة التي قد تخطر ببالك
                </p>
              </AnimatedSection>

              <div className="max-w-4xl mx-auto space-y-6">
                {faqs.map((faq: any, index: number) => (
                  <AnimatedSection key={faq.id} delay={index * 100}>
                    <div className="bg-gray-50 rounded-2xl p-8">
                      <h3 className="text-xl font-bold text-inception-purple mb-4">
                        {faq.question}
                      </h3>
                      <p className="text-gray-800 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-inception-purple to-inception-orange">
          <div className="container mx-auto px-4 text-center text-white">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                🚀 جاهز لتحقيق نقلة حقيقية في عملك؟
              </h2>
              <p className="text-xl mb-8 opacity-90">
                لا تفوت الفرصة! احجز استشارتك المجانية الآن واكتشف كيف يمكننا مساعدتك
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Link to="/contact" className="bg-white text-inception-purple px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                  📞 احجز استشارة مجانية الآن
                  <ArrowUpRight className="w-5 h-5 mr-2" />
                </Link>
                <a href="tel:01012345678" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-inception-purple transition-colors inline-flex items-center">
                  📱 اتصل بنا الآن: 01012345678
                </a>
              </div>
              
              {/* Guarantee */}
              <div className="bg-green-600/20 border border-green-400/30 rounded-xl p-6 max-w-2xl mx-auto">
                <Shield className="w-8 h-8 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">ضمان استرداد الأموال 100%</h3>
                <p className="opacity-90">
                  إذا لم تحقق النتائج المتفق عليها خلال 90 يوم، نسترد لك أموالك كاملة
                </p>
              </div>
              
              {/* Limited Time Offer */}
              <div className="mt-8 bg-red-600 rounded-xl p-4 inline-block">
                <p className="font-bold text-lg">
                  ⏰ عرض محدود: خصم 20% على جميع الباقات - ينتهي خلال 48 ساعة
                </p>
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