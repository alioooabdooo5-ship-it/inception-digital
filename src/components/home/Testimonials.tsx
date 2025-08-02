
import React from "react";
import TestimonialCard from "@/components/ui/TestimonialCard";
import AnimatedSection from "@/components/common/AnimatedSection";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "أحمد محمد",
      position: "مدير التسويق",
      company: "شركة العقارات المتحدة",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
      content: "كان التعامل مع إنسيبشن تجربة مختلفة تمامًا عن أي شركة تسويق تانية، الفرق الأساسي إنهم ركزوا على المبيعات الحقيقية مش مجرد الأرقام والتفاعل، وده خلانا نحقق أعلى عائد استثماري (ROI) من حملاتنا التسويقية.",
      rating: 5
    },
    {
      name: "سارة علي",
      position: "صاحبة مشروع",
      company: "ديكور هوم",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=958&q=80",
      content: "بفضل استراتيجية الديجيتال ماركتنج اللي نفذتها إنسيبشن، قدرنا نوصل لعملاء جدد ونزود مبيعاتنا بنسبة 40% في أول 3 شهور، وخصوصًا إن الحملات استهدفت العملاء الجاهزين للشراء فعلًا، مش أي حد.",
      rating: 5
    },
    {
      name: "محمد خالد",
      position: "المدير التنفيذي",
      company: "كيتشن ديزاين",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
      content: "كنا بندور على شركة تسويق تفهم طبيعة مجال المطابخ والديكور، والحمد لله لقينا ضالتنا في إنسيبشن. المحتوى البصري اللي أنتجوه كان استثنائي وعكس الجودة اللي بنقدمها، وده انعكس على نتائج الحملات.",
      rating: 4
    }
  ];

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
          {testimonials.map((testimonial, index) => (
            <AnimatedSection 
              key={index}
              variant="fade-in"
              delay={index * 100}
            >
              <TestimonialCard
                name={testimonial.name}
                position={testimonial.position}
                company={testimonial.company}
                image={testimonial.image}
                content={testimonial.content}
                rating={testimonial.rating}
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
