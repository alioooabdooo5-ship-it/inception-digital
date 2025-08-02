
import React, { useState } from "react";
import { Phone, Mail, Send } from "lucide-react";
import AnimatedSection from "@/components/common/AnimatedSection";
import { useToast } from "@/components/ui/use-toast";

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      message: "",
    });
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_30%_30%,rgba(55,18,79,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="headline-medium text-inception-purple mb-4">
            تواصل معنا
          </h2>
          <p className="body-medium text-gray-700">
            جاهز تخلي بيزنس بتاعك ينمو؟ تواصل معانا دلوقتي واحجز استشارة مجانية
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <AnimatedSection variant="fade-in-right">
            <div className="glass-card p-8">
              <h3 className="title-medium text-inception-purple mb-6">
                أرسل لنا رسالة
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    الاسم الكامل
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
                    البريد الإلكتروني
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
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    رسالتك
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
              <h3 className="title-medium text-inception-purple mb-4">
                معلومات التواصل
              </h3>
              <p className="body-medium text-gray-700 mb-8">
                يمكنك التواصل معنا مباشرة من خلال:
              </p>
              
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
              </div>
            </div>
            
            <div className="glass-card p-8 mt-8">
              <h3 className="title-medium text-inception-purple mb-4">
                احجز استشارة مجانية الآن
              </h3>
              <p className="body-medium text-gray-700 mb-6">
                احصل على استشارة تسويقية مجانية لمدة 30 دقيقة لتحليل وضع مشروعك الحالي ووضع خطة مبدئية لتطويره
              </p>
              <a 
                href="https://calendly.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary block text-center"
              >
                احجز موعدك الآن
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
