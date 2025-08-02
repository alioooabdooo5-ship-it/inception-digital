
import React from "react";
import TestimonialCard from "@/components/ui/TestimonialCard";
import AnimatedSection from "@/components/common/AnimatedSection";
import { useQuery } from "@tanstack/react-query";
import type { Testimonial } from "@shared/schema";

const Testimonials: React.FC = () => {
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials']
  });

  if (isLoading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل الآراء...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_30%_70%,rgba(55,18,79,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="headline-medium text-inception-purple mb-4">
            آراء العملاء
          </h2>
          <p className="body-medium text-gray-700">
            نحن نفخر بالنتائج التي نحققها لعملائنا، وهذه بعض آرائهم في تجربتهم معنا
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.filter(testimonial => testimonial && testimonial.name).map((testimonial, index) => (
            <AnimatedSection 
              key={testimonial.id || index}
              variant="fade-in"
              delay={index * 100}
            >
              <TestimonialCard
                name={testimonial.name}
                position={testimonial.position || 'عميل'}
                company={testimonial.company || 'شركة محترمة'}
                image={testimonial.image || "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80"}
                content={testimonial.content || 'تجربة رائعة مع إنسيبشن'}
                rating={testimonial.rating || 5}
              />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <div className="glass-card p-6 max-w-2xl mx-auto">
            <h3 className="title-medium text-inception-purple mb-4">
              جاهز لتحقيق نتائج مشابهة لبيزنس الخاص بك؟
            </h3>
            <p className="body-medium text-gray-700 mb-6">
              تواصل معنا الآن للحصول على استشارة مجانية ومعرفة كيف يمكننا مساعدتك في تحقيق أهدافك التسويقية
            </p>
            <a href="/contact" className="btn-primary">
              تواصل معنا الآن
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Testimonials;
