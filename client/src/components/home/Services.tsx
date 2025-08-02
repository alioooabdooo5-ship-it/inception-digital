
import React from "react";
import { Link } from "wouter";
import { Video, Target, Search, Globe, Share2, Camera, Megaphone, TrendingUp, Code, Users, ArrowUpRight } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVideo, 
  faBullhorn, 
  faSearch, 
  faCode, 
  faShareAlt,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import ServiceCard from "@/components/ui/ServiceCard";
import AnimatedSection from "@/components/common/AnimatedSection";
import { useQuery } from "@tanstack/react-query";
import type { Service } from "@shared/schema";

const Services: React.FC = () => {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services']
  });

  const getIconComponent = (iconName: string | null) => {
    if (!iconName) return <FontAwesomeIcon icon={faVideo} className="w-8 h-8" />;
    
    const iconMap = {
      'video': faVideo,
      'bullhorn': faBullhorn, 
      'search': faSearch,
      'code': faCode,
      'share-alt': faShareAlt
    };
    const icon = iconMap[iconName as keyof typeof iconMap] || faVideo;
    return <FontAwesomeIcon icon={icon} className="w-8 h-8" />;
  };

  if (isLoading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل الخدمات...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_20%_30%,rgba(55,18,79,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="headline-medium text-inception-purple mb-4">
            الخدمات اللي بنقدمها
          </h2>
          <p className="body-medium text-gray-700">
            مش مجرد تسويق، إحنا بنبني لك خطه توصلك لـــمبيعات حقيقية!
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.filter(service => service && service.title).map((service, index) => (
            <AnimatedSection 
              key={service.id || index}
              variant="fade-in"
              delay={index * 100}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                {/* Image Section with Fixed Size */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-80`} />
                  <img 
                    src={service.image || "/lovable-uploads/6b7d5f55-0ca7-45cb-9463-f8a6eb07d7d4.png"}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-inception-purple shadow-lg">
                    {getIconComponent(service.icon)}
                  </div>
                  
                  {/* Stats Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faChartLine} className="w-3 h-3 text-inception-orange ml-2" />
                      <span className="text-xs font-semibold text-inception-purple">{service.stats || 'نتائج مميزة'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-inception-purple mb-3 group-hover:text-inception-orange transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {service.description || service.longDescription || 'خدمة متميزة من شركة إنسيبشن'}
                  </p>
                  
                  <Link 
                    to="/contact"
                    className="inline-flex items-center text-inception-purple hover:text-inception-orange font-semibold text-sm transition-all duration-300 group/link"
                  >
                    <span className="ml-2">اطلب الخدمة</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link to="/services" className="btn-primary">
            عرض جميع الخدمات
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Services;
