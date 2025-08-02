
import React from "react";
import { Link } from "react-router-dom";
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

const Services: React.FC = () => {
  const services = [
    {
      icon: <FontAwesomeIcon icon={faVideo} className="w-8 h-8" />,
      illustration: "/lovable-uploads/6b7d5f55-0ca7-45cb-9463-f8a6eb07d7d4.png",
      title: "الميديا برودكشن وصناعة المحتوى",
      description: "العميل مش هيشتري إلا لما يحس إن المنتج أو الخدمة تستاهل، وهنا بييجي دور المحتوى البصري",
      link: "/services/media-production",
      gradient: "from-red-500/20 via-red-500/10 to-transparent",
      stats: "+175% زيادة التفاعل"
    },
    {
      icon: <FontAwesomeIcon icon={faBullhorn} className="w-8 h-8" />,
      illustration: "/lovable-uploads/91e78bbe-63bc-4f32-98d9-9b42cbab317a.png",
      title: "الإعلانات والمديا باينج",
      description: "مش أي إعلان ناجح يبقى إعلان بيبيع، إحنا بنشتغل بأسلوب منظم يخلي كل جنيه يتحول لمبيعات حقيقية",
      link: "/services/paid-ads",
      gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
      stats: "+210% نتائج الحملات"
    },
    {
      icon: <FontAwesomeIcon icon={faSearch} className="w-8 h-8" />,
      illustration: "/lovable-uploads/3cc93b10-435d-4b20-a3d0-da06335cf1ca.png",
      title: "تحسين محركات البحث (SEO)",
      description: "لو انت مش ظاهر في البحث، فإنت حرفيًا مش موجود! إحنا بنشتغل على تحسين ترتيب موقعك",
      link: "/services/seo",
      gradient: "from-green-500/20 via-green-500/10 to-transparent",
      stats: "المركز الأول في جوجل"
    },
    {
      icon: <FontAwesomeIcon icon={faCode} className="w-8 h-8" />,
      illustration: "/lovable-uploads/28b72d61-4e8f-4b33-847a-1685c6b0b5a5.png",
      title: "تصميم وتطوير المواقع",
      description: "الموقع مش مجرد شكل، الموقع هو أهم موظف مبيعات عندك! بنصمم مواقع بتقنع وبتبيع",
      link: "/services/web-development",
      gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
      stats: "+300% معدل التحويل"
    },
    {
      icon: <FontAwesomeIcon icon={faShareAlt} className="w-8 h-8" />,
      illustration: "/lovable-uploads/6b7d5f55-0ca7-45cb-9463-f8a6eb07d7d4.png",
      title: "إدارة السوشيال ميديا",
      description: "الناس بتدور على البراندات اللي عندها محتوى مقنع، مش مجرد بوستات والسلام!",
      link: "/services/social-media",
      gradient: "from-pink-500/20 via-pink-500/10 to-transparent",
      stats: "+250% نمو المتابعين"
    }
  ];

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
          {services.map((service, index) => (
            <AnimatedSection 
              key={index}
              variant="fade-in"
              delay={index * 100}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                {/* Image Section with Fixed Size */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-80`} />
                  <img 
                    src={service.illustration}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-inception-purple shadow-lg">
                    {service.icon}
                  </div>
                  
                  {/* Stats Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faChartLine} className="w-3 h-3 text-inception-orange ml-2" />
                      <span className="text-xs font-semibold text-inception-purple">{service.stats}</span>
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-inception-purple mb-3 group-hover:text-inception-orange transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  <Link 
                    to={service.link}
                    className="inline-flex items-center text-inception-purple hover:text-inception-orange font-semibold text-sm transition-all duration-300 group/link"
                  >
                    <span className="ml-2">اقرأ المزيد</span>
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
