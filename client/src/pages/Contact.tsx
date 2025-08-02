
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Phone, Mail, MapPin, MessageSquare, Calendar, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formData);
    
    toast({
      title: "تم إرسال رسالتك بنجاح!",
      description: "سنقوم بالرد عليك في أقرب وقت ممكن.",
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="py-10 bg-gray-50 mb-16 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_30%_30%,rgba(55,18,79,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="max-w-4xl mx-auto text-center">
              <h1 className="headline-large text-inception-purple mb-6">
                تواصل معنا
              </h1>
              <p className="body-large text-gray-700 max-w-3xl mx-auto">
                نحن هنا لمساعدتك في تحقيق أهدافك التسويقية وزيادة مبيعاتك. تواصل معنا الآن لمناقشة مشروعك والحصول على استشارة مجانية.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact Methods */}
        <div className="container mx-auto px-4 md:px-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection variant="fade-in" delay={0}>
              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-inception-purple bg-opacity-10 flex items-center justify-center text-inception-purple mx-auto mb-4">
                  <Phone size={30} />
                </div>
                <h3 className="title-medium mb-3 text-inception-purple">اتصل بنا</h3>
                <p className="body-medium text-gray-600 mb-4">يمكنك الاتصال بنا مباشرة للتحدث مع أحد مستشارينا</p>
                <a href="tel:+201234567890" className="btn-outline text-sm py-2 px-4">+20 123 456 7890</a>
              </div>
            </AnimatedSection>
            
            <AnimatedSection variant="fade-in" delay={100}>
              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-inception-purple bg-opacity-10 flex items-center justify-center text-inception-purple mx-auto mb-4">
                  <MessageSquare size={30} />
                </div>
                <h3 className="title-medium mb-3 text-inception-purple">راسلنا على واتساب</h3>
                <p className="body-medium text-gray-600 mb-4">تحدث معنا مباشرة على واتساب للحصول على استجابة سريعة</p>
                <a 
                  href="https://wa.me/201234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-outline text-sm py-2 px-4"
                >
                  تحدث معنا على واتساب
                </a>
              </div>
            </AnimatedSection>
            
            <AnimatedSection variant="fade-in" delay={200}>
              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-inception-purple bg-opacity-10 flex items-center justify-center text-inception-purple mx-auto mb-4">
                  <Calendar size={30} />
                </div>
                <h3 className="title-medium mb-3 text-inception-purple">احجز استشارة مجانية</h3>
                <p className="body-medium text-gray-600 mb-4">احجز موعدًا مع أحد مستشارينا للحصول على استشارة مجانية</p>
                <a 
                  href="https://calendly.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-outline text-sm py-2 px-4"
                >
                  احجز موعدك الآن
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Contact Form and Info */}
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <AnimatedSection variant="fade-in-right">
              <div className="glass-card p-8">
                <h2 className="headline-small text-inception-purple mb-6">
                  أرسل لنا رسالة
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2">
                        الاسم الكامل <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-inception-purple focus:border-transparent"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">
                        البريد الإلكتروني <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-inception-purple focus:border-transparent"
                        placeholder="أدخل بريدك الإلكتروني"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-2">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-inception-purple focus:border-transparent"
                        placeholder="أدخل رقم هاتفك"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-gray-700 mb-2">
                        اسم الشركة
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-inception-purple focus:border-transparent"
                        placeholder="أدخل اسم شركتك"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-gray-700 mb-2">
                      الخدمة المطلوبة <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-inception-purple focus:border-transparent"
                    >
                      <option value="" disabled>اختر الخدمة المطلوبة</option>
                      <option value="media-production">الميديا برودكشن وصناعة المحتوى</option>
                      <option value="paid-ads">الإعلانات والمديا باينج</option>
                      <option value="seo">تحسين محركات البحث (SEO)</option>
                      <option value="web-development">تصميم وتطوير المواقع</option>
                      <option value="social-media">إدارة السوشيال ميديا</option>
                      <option value="consultation">استشارة مجانية</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2">
                      رسالتك <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-inception-purple focus:border-transparent"
                      placeholder="أخبرنا عن مشروعك وكيف يمكننا مساعدتك"
                    />
                  </div>
                  
                  <button type="submit" className="btn-primary w-full flex items-center justify-center">
                    <Send size={18} className="ml-2" />
                    إرسال الرسالة
                  </button>
                </form>
              </div>
            </AnimatedSection>
            
            <AnimatedSection variant="fade-in-left" className="space-y-8">
              <div>
                <h2 className="headline-small text-inception-purple mb-6">
                  معلومات التواصل
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-inception-purple bg-opacity-10 flex items-center justify-center text-inception-purple ml-4 flex-shrink-0">
                      <Phone size={22} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-inception-purple mb-1">الهاتف</h4>
                      <p className="text-gray-700 mb-1">+20 123 456 7890</p>
                      <p className="text-sm text-gray-500">من الأحد إلى الخميس، 9 صباحًا - 5 مساءً</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-inception-purple bg-opacity-10 flex items-center justify-center text-inception-purple ml-4 flex-shrink-0">
                      <Mail size={22} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-inception-purple mb-1">البريد الإلكتروني</h4>
                      <p className="text-gray-700 mb-1">info@inception-digital.com</p>
                      <p className="text-sm text-gray-500">نرد عليك خلال 24 ساعة</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-inception-purple bg-opacity-10 flex items-center justify-center text-inception-purple ml-4 flex-shrink-0">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-inception-purple mb-1">العنوان</h4>
                      <p className="text-gray-700 mb-1">القاهرة، مصر</p>
                      <p className="text-sm text-gray-500">نرحب بزيارتك في مقر الشركة بعد تحديد موعد مسبق</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="title-medium text-inception-purple mb-4">
                  تابعنا على وسائل التواصل الاجتماعي
                </h3>
                <div className="flex space-x-4 space-x-reverse justify-center">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-inception-purple hover:bg-inception-purple hover:text-white transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-inception-purple hover:bg-inception-purple hover:text-white transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-inception-purple hover:bg-inception-purple hover:text-white transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-inception-purple hover:bg-inception-purple hover:text-white transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="title-medium text-inception-purple mb-4">
                  ساعات العمل
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">الأحد - الخميس</span>
                    <span className="font-semibold">9:00 صباحًا - 5:00 مساءً</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">الجمعة</span>
                    <span className="font-semibold">مغلق</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">السبت</span>
                    <span className="font-semibold">10:00 صباحًا - 2:00 مساءً</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Map Section */}
        <div className="container mx-auto px-4 md:px-6 mt-16">
          <AnimatedSection className="glass-card p-6">
            <h2 className="headline-small text-inception-purple mb-6 text-center">
              موقعنا
            </h2>
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <iframe
                title="Inception Digital Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.76991620448!2d31.18629368736084!3d30.0595581608411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1698785099033!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </AnimatedSection>
        </div>

        {/* FAQ Section */}
        <section className="py-16 mt-16 bg-gray-50 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,102,0,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="headline-medium text-inception-purple mb-4">
                الأسئلة الشائعة
              </h2>
              <p className="body-medium text-gray-700">
                إليك إجابات لبعض الأسئلة الشائعة التي قد تدور في ذهنك
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              <AnimatedSection variant="fade-in" delay={0}>
                <div className="glass-card p-6">
                  <h4 className="font-semibold text-inception-purple mb-2">كم تستغرق الاستجابة لطلبي؟</h4>
                  <p className="text-gray-700">نحن نسعى للرد على جميع الاستفسارات في غضون 24 ساعة عمل. في حالات الطوارئ، يمكنك التواصل معنا عبر الواتساب للحصول على استجابة أسرع.</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection variant="fade-in" delay={100}>
                <div className="glass-card p-6">
                  <h4 className="font-semibold text-inception-purple mb-2">هل تقدمون خدمات خارج مصر؟</h4>
                  <p className="text-gray-700">نعم، نحن نقدم خدماتنا للعملاء في جميع أنحاء الوطن العربي والعالم. لدينا خبرة في العمل مع شركات من مختلف البلدان والثقافات.</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection variant="fade-in" delay={200}>
                <div className="glass-card p-6">
                  <h4 className="font-semibold text-inception-purple mb-2">كيف يمكنني معرفة تكلفة الخدمات؟</h4>
                  <p className="text-gray-700">تختلف تكلفة خدماتنا بناءً على احتياجات مشروعك الخاصة. يمكنك التواصل معنا للحصول على عرض سعر مخصص بعد مناقشة تفاصيل مشروعك.</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection variant="fade-in" delay={300}>
                <div className="glass-card p-6">
                  <h4 className="font-semibold text-inception-purple mb-2">هل تقدمون استشارات مجانية؟</h4>
                  <p className="text-gray-700">نعم، نحن نقدم استشارات مجانية أولية لمدة 30 دقيقة لمناقشة مشروعك وتحديد كيف يمكننا مساعدتك. يمكنك حجز موعد من خلال الموقع.</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
