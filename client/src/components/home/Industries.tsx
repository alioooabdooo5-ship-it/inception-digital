
import React from "react";
import { Link } from "wouter";
import IndustryCard from "@/components/ui/IndustryCard";
import AnimatedSection from "@/components/common/AnimatedSection";
import { useQuery } from "@tanstack/react-query";
import type { Industry } from "@shared/schema";

const Industries: React.FC = () => {
  const { data: industries = [], isLoading } = useQuery<Industry[]>({
    queryKey: ['/api/industries']
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل الصناعات...</p>
          </div>
        </div>
      </section>
    );
  }

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
          {industries.filter(industry => industry && industry.title).map((industry, index) => (
            <AnimatedSection 
              key={industry.id || index}
              variant="fade-in"
              delay={index * 100}
            >
              <IndustryCard
                image={industry.image || "/lovable-uploads/28b72d61-4e8f-4b33-847a-1685c6b0b5a5.png"}
                title={industry.title}
                description={industry.description || 'صناعة متميزة'}
                link="/contact"
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
