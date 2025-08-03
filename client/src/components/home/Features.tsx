
import React from "react";
import { Check, Zap, Target, TrendingUp } from "lucide-react";
import AnimatedSection from "@/components/common/AnimatedSection";
import { useSettings } from "@/hooks/useSettings";

const Features: React.FC = () => {
  const { getSetting } = useSettings('homepage');
  const features = [
    {
      icon: <Target size={26} />,
      illustration: "/lovable-uploads/3cc93b10-435d-4b20-a3d0-da06335cf1ca.png",
      title: "جذب العملاء الجاهزين للشراء",
      description: "بنشتغل على جذب العملاء الجاهزين للشراء، مش الناس اللي بتتفرج وتمشي"
    },
    {
      icon: <TrendingUp size={26} />,
      illustration: "/lovable-uploads/91e78bbe-63bc-4f32-98d9-9b42cbab317a.png",
      title: "أعلى عائد على الاستثمار",
      description: "بنركز على تحقيق أعلى ROI (العائد على الاستثمار)، مش مجرد حملات والسلام"
    },
    {
      icon: <Zap size={26} />,
      illustration: "/lovable-uploads/28b72d61-4e8f-4b33-847a-1685c6b0b5a5.png",
      title: "نفهم البيزنس بتاعك",
      description: "بنفهم البيزنس بتاعك، وبنحدد الاستراتيجية المناسبة ليه مش العكس"
    },
    {
      icon: <Check size={26} />,
      illustration: "/lovable-uploads/6b7d5f55-0ca7-45cb-9463-f8a6eb07d7d4.png",
      title: "استخدام الداتا في كل خطوة",
      description: "بنستخدم الداتا والتحليل في كل خطوة، عشان أي جنيه بتحطه في التسويق يجيب لك أضعافه مبيعات"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,102,0,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="headline-medium text-inception-purple mb-4">
            {getSetting('features_title') || 'طيب، إيه اللي بيميزنا؟ ليه إنسيبشن مختلفة؟'}
          </h2>
          <p className="body-medium text-gray-700">
            {getSetting('features_description') || 'لأن إحنا مش بنمشي على القوالب الجاهزة، ومش بنعتمد على "نجرب ونشوف". إحنا بنشتغل بتكتيكات تسويقية مجربة ومبنية على أرقام حقيقية.'}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection 
              key={index} 
              variant="fade-in"
              delay={index * 100}
              className="glass-card p-6 flex flex-col items-center text-center"
            >
              <div className="relative w-full h-28 mb-6">
                <div className="w-14 h-14 rounded-full bg-inception-purple bg-opacity-10 flex items-center justify-center text-inception-purple absolute left-1/2 top-0 transform -translate-x-1/2">
                  {feature.icon}
                </div>
                {feature.illustration && (
                  <img 
                    src={feature.illustration} 
                    alt={feature.title} 
                    className="w-20 h-20 object-contain absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-float"
                    style={{ animationDelay: `${index * 300}ms` }}
                  />
                )}
              </div>
              <h3 className="title-medium mb-2 text-inception-purple">{feature.title}</h3>
              <p className="body-medium text-gray-600">{feature.description}</p>
            </AnimatedSection>
          ))}
        </div>
        
        <AnimatedSection className="text-center mt-8">
          <p className="font-medium text-inception-purple">
            ببساطة، الهدف عندنا مش إعلان ناجح، الهدف عندنا هو صفقة ناجحة!
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Features;
