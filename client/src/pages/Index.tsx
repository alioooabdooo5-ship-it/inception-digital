
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

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
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
