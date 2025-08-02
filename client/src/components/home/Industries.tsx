
import React from "react";
import { Link } from "react-router-dom";
import IndustryCard from "@/components/ui/IndustryCard";
import AnimatedSection from "@/components/common/AnimatedSection";

const Industries: React.FC = () => {
  const industries = [
    {
      image: "/lovable-uploads/28b72d61-4e8f-4b33-847a-1685c6b0b5a5.png",
      title: "العقارات",
      description: "في مجال العقارات، القرار الشرائي بياخد وقت، وعلشان كده ركّزنا على إعلانات Google Ads لاستهداف العملاء الجاهزين للشراء.",
      link: "/industries#real-estate"
    },
    {
      image: "/lovable-uploads/91e78bbe-63bc-4f32-98d9-9b42cbab317a.png",
      title: "المطابخ والدريسنج",
      description: "العميل مش بيشتري منتج، العميل بيشتري تجربة! اعتمدنا على التصوير الاحترافي اللي يبرز الفخامة.",
      link: "/industries#kitchens"
    },
    {
      image: "/lovable-uploads/3cc93b10-435d-4b20-a3d0-da06335cf1ca.png",
      title: "التشطيبات والديكورات",
      description: "الثقة هي مفتاح البيع في المجال ده! اشتغلنا على إنتاج محتوى مستمر يشرح التفاصيل الفنية، مع بناء هوية رقمية قوية تعكس خبرة الشركة.",
      link: "/industries#decoration"
    },
    {
      image: "/lovable-uploads/6b7d5f55-0ca7-45cb-9463-f8a6eb07d7d4.png",
      title: "التصدير للمصانع",
      description: "هدفنا إن كل مصنع يوصل لمستوردين حقيقيين! بنبدأ بـ بروفايل احترافي يعكس قوة المصنع، مع موقع إلكتروني احترافي.",
      link: "/industries#export"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,102,0,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="headline-medium text-inception-purple mb-4">
            الصناعات اللي اشتغلنا فيها
          </h2>
          <p className="body-medium text-gray-700">
            هدفنا المبيعات، مش مجرد تسويق! كل صناعة ليها طريقتها الخاصة في البيع، ونجاح أي حملة تسويقية بيعتمد على إننا نعرف العميل بيقرر إزاي.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {industries.map((industry, index) => (
            <AnimatedSection 
              key={index}
              variant="fade-in"
              delay={index * 100}
            >
              <IndustryCard
                image={industry.image}
                title={industry.title}
                description={industry.description}
                link={industry.link}
              />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link to="/industries" className="btn-primary">
            عرض جميع الصناعات
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Industries;
