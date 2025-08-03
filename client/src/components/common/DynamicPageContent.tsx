import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/common/AnimatedSection";

interface PageSection {
  id: string;
  type: 'hero' | 'text' | 'image' | 'contact' | 'features' | 'cta';
  title: string;
  content: string;
  image?: string;
  link?: string;
  buttonText?: string;
  order: number;
  visible: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

interface DynamicPageContentProps {
  sections: PageSection[];
  className?: string;
}

const DynamicPageContent: React.FC<DynamicPageContentProps> = ({ 
  sections, 
  className = "" 
}) => {
  if (!sections || sections.length === 0) {
    return null;
  }

  const sortedSections = sections
    .filter(section => section.visible)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const renderSection = (section: PageSection, index: number) => {
    const animationDelay = index * 100;

    switch (section.type) {
      case 'hero':
        return (
          <AnimatedSection 
            key={section.id}
            variant="fade-in" 
            delay={animationDelay}
            className="py-16 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_30%_30%,rgba(55,18,79,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
            
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto text-center">
                <div 
                  className="space-y-6"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
                
                {section.image && (
                  <div className="mt-8">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="mx-auto rounded-xl shadow-lg max-w-2xl w-full"
                    />
                  </div>
                )}
                
                {section.buttonText && section.link && (
                  <div className="mt-8">
                    <Button 
                      className="btn-primary"
                      onClick={() => {
                        if (section.link?.startsWith('#')) {
                          document.querySelector(section.link)?.scrollIntoView({ 
                            behavior: 'smooth' 
                          });
                        } else {
                          window.open(section.link, '_blank');
                        }
                      }}
                    >
                      {section.buttonText}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        );

      case 'text':
        return (
          <AnimatedSection 
            key={section.id}
            variant="fade-in" 
            delay={animationDelay}
            className="py-12"
          >
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            </div>
          </AnimatedSection>
        );

      case 'image':
        return (
          <AnimatedSection 
            key={section.id}
            variant="fade-in" 
            delay={animationDelay}
            className="py-12"
          >
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                {section.image && (
                  <div className="mb-6">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full rounded-xl shadow-lg"
                    />
                  </div>
                )}
                
                {section.content && (
                  <div 
                    className="text-center prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                )}
              </div>
            </div>
          </AnimatedSection>
        );

      case 'cta':
        return (
          <AnimatedSection 
            key={section.id}
            variant="fade-in" 
            delay={animationDelay}
            className="py-16 bg-gradient-to-r from-inception-purple to-inception-purple/90"
          >
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto text-center text-white">
                <div 
                  className="space-y-6 mb-8"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
                
                {section.buttonText && section.link && (
                  <Button 
                    className="bg-white text-inception-purple hover:bg-gray-100"
                    onClick={() => {
                      if (section.link?.startsWith('#')) {
                        document.querySelector(section.link)?.scrollIntoView({ 
                          behavior: 'smooth' 
                        });
                      } else {
                        window.open(section.link, '_blank');
                      }
                    }}
                  >
                    {section.buttonText}
                  </Button>
                )}
              </div>
            </div>
          </AnimatedSection>
        );

      case 'features':
        return (
          <AnimatedSection 
            key={section.id}
            variant="fade-in" 
            delay={animationDelay}
            className="py-16 bg-gray-50"
          >
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-6xl mx-auto">
                <div 
                  className="text-center mb-12"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
                
                {section.image && (
                  <div className="text-center">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="mx-auto rounded-xl shadow-lg max-w-4xl w-full"
                    />
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        );

      default:
        return (
          <div key={section.id} className="py-8">
            <div className="container mx-auto px-4 md:px-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                  <div 
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={className}>
      {sortedSections.map(renderSection)}
    </div>
  );
};

export default DynamicPageContent;