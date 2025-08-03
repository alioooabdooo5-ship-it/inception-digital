
import React, { useEffect } from "react";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Services from "@/components/home/Services";
import Industries from "@/components/home/Industries";
import Testimonials from "@/components/home/Testimonials";
import Books from "@/components/home/Books";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import Contact from "@/components/home/Contact";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DynamicPageContent from "@/components/common/DynamicPageContent";
import { usePageContentWithFallback, getSectionsByType } from "@/hooks/usePageContent";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load dynamic page content
  const { content: pageContent, isLoading: contentLoading, hasData } = usePageContentWithFallback('home', {
    title: 'الصفحة الرئيسية',
    metaTitle: 'إنسيبشن - الصفحة الرئيسية',
    metaDescription: 'منصة شاملة للتسويق الرقمي والاستشارات التجارية',
    sections: []
  });

  // Set page meta data
  useEffect(() => {
    if (pageContent.metaTitle) {
      document.title = pageContent.metaTitle;
    }
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && pageContent.metaDescription) {
      metaDescription.setAttribute('content', pageContent.metaDescription);
    } else if (pageContent.metaDescription) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = pageContent.metaDescription;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, [pageContent]);

  // Get dynamic sections
  const dynamicSections = getSectionsByType(pageContent.sections, 'hero')
    .concat(getSectionsByType(pageContent.sections, 'text'))
    .concat(getSectionsByType(pageContent.sections, 'image'))
    .concat(getSectionsByType(pageContent.sections, 'features'))
    .concat(getSectionsByType(pageContent.sections, 'cta'));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Dynamic content sections (if available) */}
        {hasData && dynamicSections.length > 0 && (
          <DynamicPageContent sections={dynamicSections} />
        )}
        
        {/* Fallback to default components if no dynamic content */}
        {(!hasData || dynamicSections.length === 0) && (
          <>
            <Hero />
            <Features />
          </>
        )}
        
        {/* Always show these sections */}
        <Services />
        <Industries />
        <Testimonials />
        <Books />
        <FeaturedArticles />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
