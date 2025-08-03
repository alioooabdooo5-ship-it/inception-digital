
import React from "react";
import { Link } from "wouter";
import { ArrowLeft, Check, Sparkles, TrendingUp } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faCheckCircle, 
  faChartLine, 
  faStar,
  faRocket
} from '@fortawesome/free-solid-svg-icons';
import AnimatedSection from "@/components/common/AnimatedSection";
import { useSettings } from "@/hooks/useSettings";

const Hero: React.FC = () => {
  const { getSetting, isLoading } = useSettings('homepage');

  if (isLoading) {
    return (
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 right-0 h-full w-full bg-gradient-to-b from-gray-50 to-white -z-10" />
      <div className="absolute top-0 left-0 right-0 h-full w-full bg-[radial-gradient(circle_at_20%_30%,rgba(55,18,79,0.04)_0%,rgba(255,255,255,0)_50%)]" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <AnimatedSection variant="fade-in-right">
              <h1 className="headline-large text-inception-purple mb-6">
                {getSetting('hero_title') || 'نحول التسويق إلى مبيعات حقيقية'}
              </h1>
              <p className="body-large text-gray-700 mb-8">
                {getSetting('hero_description') || 'لو بتدور على شركة مش بس بتعملك إعلانات، لكن بتديلك مبيعات فعلية، يبقى إنت في المكان الصح!'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="mt-1 w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <FontAwesomeIcon icon={faCheckCircle} className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-gray-700">{getSetting('hero_feature_1') || 'بنحط خطط تسويق بتركّز على تحقيق أعلى عائد استثماري (ROI)'}</p>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="mt-1 w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <FontAwesomeIcon icon={faRocket} className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-gray-700">{getSetting('hero_feature_2') || 'بنشتغل بمفاهيم البيع الحديث، اللي بتحول اهتمام العميل لإجراء شراء حقيقي'}</p>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="mt-1 w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-gray-700">{getSetting('hero_feature_3') || 'بنقدم استراتيجيات متخصصة لكل مجال، مش حلول عامة وخلاص'}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to={getSetting('hero_primary_button_link') || '/contact'} 
                  className="btn-primary"
                >
                  {getSetting('hero_primary_button_text') || 'ابدأ الآن'}
                </Link>
                <Link 
                  to={getSetting('hero_secondary_button_link') || '/services'} 
                  className="btn-outline group"
                >
                  <span>{getSetting('hero_secondary_button_text') || 'استكشف خدماتنا'}</span>
                  <FontAwesomeIcon 
                    icon={faArrowLeft} 
                    className="mr-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                  />
                </Link>
              </div>
            </AnimatedSection>
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2 relative">
            <AnimatedSection variant="scale-in">
              <div className="relative">
                {/* Animation illustration */}
                <img
                  src={getSetting('hero_image_url') || '/lovable-uploads/6b7d5f55-0ca7-45cb-9463-f8a6eb07d7d4.png'}
                  alt={getSetting('hero_image_alt') || 'Inception Digital Marketing'}
                  className="w-full h-auto animate-float"
                />
                
                {/* Floating Stats Card */}
                <div className="absolute -bottom-6 -right-6 glass-card p-4 shadow-lg animate-float animation-delay-200 border border-inception-purple/20">
                  <div className="flex items-center mb-2">
                    <FontAwesomeIcon icon={faChartLine} className="w-4 h-4 text-inception-purple mr-2" />
                    <p className="text-sm text-gray-600">العائد على الاستثمار</p>
                  </div>
                  <div className="text-2xl font-bold text-inception-purple">245%+</div>
                </div>
                
                {/* Floating Success Card */}
                <div className="absolute -top-6 -left-6 glass-card p-4 shadow-lg animate-float animation-delay-300 border border-green-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mr-3 shadow-md">
                      <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 flex items-center">
                        <TrendingUp size={12} className="ml-1 text-green-500" />
                        زيادة المبيعات
                      </p>
                      <div className="text-xl font-bold text-inception-purple">+127%</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
