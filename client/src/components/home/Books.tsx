
import React from "react";
import { Link } from "wouter";
import BookCard from "@/components/ui/BookCard";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import type { Book } from "@shared/schema";

const Books: React.FC = () => {
  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ['/api/books']
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل الكتب...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,102,0,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="headline-medium text-inception-purple mb-4">
            كتب تهمك لو أنت صاحب بيزنس
          </h2>
          <p className="body-medium text-gray-700">
            مجموعة من الكتب القيمة التي أعددناها خصيصًا لمساعدتك في تطوير أعمالك وتحقيق نجاح أكبر
          </p>
        </AnimatedSection>

        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {books.filter(book => book && book.title).map((book, index) => (
              <AnimatedSection 
                key={book.id || index}
                variant="fade-in"
                delay={index * 100}
              >
                <BookCard
                  cover={book.coverImage || "/lovable-uploads/91e78bbe-63bc-4f32-98d9-9b42cbab317a.png"}
                  title={book.title}
                  description={book.description || 'كتاب مفيد من إنسيبشن'}
                  price={book.price || 'مجاني'}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {books.filter(book => book && book.title).map((book, index) => (
                <CarouselItem key={book.id || index} className="md:basis-1/2 lg:basis-1/3">
                  <BookCard
                    cover={book.coverImage || "/lovable-uploads/91e78bbe-63bc-4f32-98d9-9b42cbab317a.png"}
                    title={book.title}
                    description={book.description || 'كتاب مفيد من إنسيبشن'}
                    price={book.price || 'مجاني'}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static translate-y-0 mr-2" />
              <CarouselNext className="relative static translate-y-0 ml-2" />
            </div>
          </Carousel>
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link to="/books" className="btn-primary">
            استكشف المزيد من الكتب
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Books;
