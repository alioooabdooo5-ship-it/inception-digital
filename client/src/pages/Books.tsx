
import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import BookCard from "@/components/ui/BookCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Book } from "@shared/schema";

interface BookWithCategory extends Book {
  category?: string;
  longDescription?: string;
}

const Books = () => {
  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ['/api/books']
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedBook, setSelectedBook] = useState<BookWithCategory | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple mx-auto"></div>
              <p className="mt-4 text-gray-600">جاري تحميل الكتب...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Demo books as fallback (convert real books to include category info)
  const booksWithCategories: BookWithCategory[] = books.map(book => ({
    ...book,
    category: 'marketing', // Default category since we don't have it in schema
    longDescription: book.description + ' - كتاب متميز يقدم نصائح عملية ومجرّبة في هذا المجال.',
    cover: book.coverImage || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
  }));

  const demoBooks: BookWithCategory[] = [
    {
      id: 1,
      cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      title: "إزاي تختار شركة التسويق الصح",
      description: "دليل عملي يساعدك تختار الوكالة اللي تناسب شغلك من غير ما تخسر فلوسك",
      price: "99 ج.م",
      category: "marketing",
      longDescription: "هذا الدليل العملي يساعدك على اختيار وكالة التسويق الرقمي المناسبة لمشروعك. يشرح الكتاب المعايير الأساسية التي يجب البحث عنها، والأسئلة التي يجب طرحها، والعلامات التحذيرية التي يجب الانتباه إليها. ستتعلم كيفية تقييم الوكالات بناءً على خبراتها، ونتائجها السابقة، واستراتيجياتها، وليس فقط على أساس السعر. الكتاب يحتوي على قوائم تحقق ونماذج استبيانات تساعدك في اتخاذ القرار الصحيح."
    },
    {
      id: 2,
      cover: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "فن البيع الحديث",
      description: "إزاي تقنع العميل يشتري من غير ما تحسسه إنه مضغوط؟",
      price: "149 ج.م",
      category: "sales",
      longDescription: "يكشف هذا الكتاب عن أحدث تقنيات البيع التي تركز على بناء الثقة وتقديم القيمة للعميل بدلاً من الضغط عليه. تتعلم كيف تفهم احتياجات العميل الحقيقية، وكيف تقدم حلولاً تناسب مشاكله، وكيف تتغلب على الاعتراضات بطريقة فعالة ومقنعة. يتضمن الكتاب دراسات حالة لمواقف بيعية مختلفة، وتمارين عملية لتطوير مهاراتك في البيع، ونصائح من أنجح مندوبي المبيعات في العالم."
    },
    {
      id: 3,
      cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      title: "التسويق بالمحتوى",
      description: "ازاي تخلي متابعينك يشتروا من غير ما تضطر تبيع لهم؟",
      price: "129 ج.م",
      category: "marketing",
      longDescription: "يشرح هذا الكتاب كيفية بناء استراتيجية محتوى فعالة تجذب العملاء المحتملين وتحولهم إلى عملاء حقيقيين دون الحاجة إلى تقنيات البيع التقليدية. يتناول الكتاب كيفية فهم شخصية العميل المثالي، وإنشاء محتوى يناسب كل مرحلة من مراحل رحلة الشراء، واختيار المنصات المناسبة لنشر المحتوى. يتضمن الكتاب أمثلة عملية لبراندات نجحت في تطبيق استراتيجية التسويق بالمحتوى، وقوالب جاهزة لتخطيط المحتوى."
    },
    {
      id: 4,
      cover: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1712&q=80",
      title: "أسرار المفاوضات الناجحة",
      description: "تعلم كيفية التفاوض على أفضل شروط وأسعار في أي صفقة تجارية",
      price: "169 ج.م",
      category: "negotiation",
      longDescription: "يقدم هذا الكتاب الأساليب والتكتيكات الحديثة في مجال التفاوض التجاري، بداية من التحضير الجيد للمفاوضات، وفهم الطرف الآخر، واكتشاف نقاط القوة والضعف، وصولاً إلى إتمام الصفقة بنجاح. يتضمن الكتاب دراسات حالة لمفاوضات تجارية ناجحة، وتمارين عملية لتطوير مهاراتك التفاوضية، ونصائح من أبرز خبراء التفاوض في العالم. ستتعلم كيفية بناء حلول مربحة للطرفين، وتجنب الأخطاء الشائعة التي تؤدي إلى فشل المفاوضات."
    },
    {
      id: 5,
      cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1590&q=80",
      title: "بناء فريق المبيعات المثالي",
      description: "دليلك الشامل لتكوين وتدريب وتحفيز فريق مبيعات يحقق النتائج",
      price: "199 ج.م",
      category: "sales",
      longDescription: "يرشدك هذا الكتاب خطوة بخطوة لبناء فريق مبيعات قوي قادر على تحقيق أهداف الشركة. يغطي الكتاب عملية اختيار وتوظيف أفضل المواهب، وتصميم برامج تدريبية فعالة، ووضع خطط حوافز محفزة، وإدارة الأداء، وتحسين الإنتاجية. يتضمن الكتاب أدوات عملية لتقييم أداء فريق المبيعات، ونماذج للتدريب على المهارات الأساسية، واستراتيجيات لحل المشاكل الشائعة التي تواجه فرق المبيعات."
    },
    {
      id: 6,
      cover: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
      title: "استراتيجيات التسويق الرقمي",
      description: "الدليل الشامل لبناء وتنفيذ استراتيجية تسويق رقمي ناجحة",
      price: "179 ج.م",
      category: "marketing",
      longDescription: "يقدم هذا الكتاب نظرة شاملة على عالم التسويق الرقمي، ويشرح كيفية بناء استراتيجية متكاملة تناسب أهداف عملك. يغطي الكتاب جميع جوانب التسويق الرقمي: تحسين محركات البحث، الإعلانات المدفوعة، وسائل التواصل الاجتماعي، التسويق عبر البريد الإلكتروني، التسويق بالمحتوى، وغيرها. ستتعلم كيفية تحديد أهدافك التسويقية، واختيار القنوات المناسبة، وقياس نتائج حملاتك، وتحسين أدائك بناءً على البيانات والتحليلات."
    }
  ];

  const categories = [
    { id: "all", name: "جميع الكتب" },
    { id: "marketing", name: "التسويق" },
    { id: "sales", name: "المبيعات" },
    { id: "negotiation", name: "التفاوض" }
  ];

  const filteredBooks = activeCategory === "all" 
    ? booksWithCategories 
    : booksWithCategories.filter(book => book.category === activeCategory);

  const handleBookClick = (book: BookWithCategory) => {
    setSelectedBook(book);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="py-10 bg-gray-50 mb-16 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_30%_30%,rgba(55,18,79,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="max-w-4xl mx-auto text-center">
              <h1 className="headline-large text-inception-purple mb-6">
                كتب تهمك في البيزنس
              </h1>
              <p className="body-large text-gray-700 max-w-3xl mx-auto">
                مجموعة من الكتب القيمة التي أعددناها خصيصًا لمساعدتك في تطوير أعمالك وتحقيق نجاح أكبر في عالم البيزنس.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Books Content */}
        <div className="container mx-auto px-4 md:px-6">
          {/* Categories */}
          <AnimatedSection className="mb-10">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-inception-purple text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredBooks.map((book, index) => (
              <AnimatedSection 
                key={book.id}
                variant="fade-in"
                delay={index * 100}
              >
                <BookCard
                  cover={book.cover || book.coverImage || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"}
                  title={book.title}
                  description={book.description}
                  price={book.price || 'متاح'}
                  onClick={() => handleBookClick(book)}
                />
              </AnimatedSection>
            ))}
          </div>

          {/* Empty State */}
          {filteredBooks.length === 0 && (
            <AnimatedSection className="text-center py-10">
              <p className="body-large text-gray-500">
                لا توجد كتب في هذه الفئة حاليًا. يرجى تحديد فئة أخرى.
              </p>
            </AnimatedSection>
          )}
        </div>

        {/* Featured Book Section */}
        <section className="py-16 mt-16 bg-gray-50 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,102,0,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <AnimatedSection variant="fade-in-right">
                <img
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1712&q=80"
                  alt="أسرار المفاوضات الناجحة"
                  className="rounded-xl shadow-lg"
                />
              </AnimatedSection>
              
              <AnimatedSection variant="fade-in-left" className="space-y-6">
                <h2 className="headline-medium text-inception-purple">
                  الكتاب المميز: أسرار المفاوضات الناجحة
                </h2>
                <p className="body-large text-gray-700">
                  يقدم هذا الكتاب الأساليب والتكتيكات الحديثة في مجال التفاوض التجاري، بداية من التحضير الجيد للمفاوضات، وفهم الطرف الآخر، واكتشاف نقاط القوة والضعف، وصولاً إلى إتمام الصفقة بنجاح.
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3 space-x-reverse">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <X size={14} className="text-green-600" />
                    </div>
                    <p className="text-gray-700">تعلم كيفية التحضير الجيد للمفاوضات وجمع المعلومات اللازمة</p>
                  </li>
                  <li className="flex items-start space-x-3 space-x-reverse">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <X size={14} className="text-green-600" />
                    </div>
                    <p className="text-gray-700">اكتشف أساليب فهم الطرف الآخر ودوافعه وأهدافه الحقيقية</p>
                  </li>
                  <li className="flex items-start space-x-3 space-x-reverse">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <X size={14} className="text-green-600" />
                    </div>
                    <p className="text-gray-700">تعرف على التكتيكات المختلفة للتفاوض وكيفية استخدامها بفعالية</p>
                  </li>
                </ul>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-gray-500 mb-1">السعر</span>
                    <span className="text-2xl font-bold text-inception-orange">169 ج.م</span>
                  </div>
                  <button className="btn-primary">احصل على الكتاب الآن</button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="glass-card p-10 max-w-4xl mx-auto text-center">
              <h2 className="headline-medium text-inception-purple mb-4">
                اشترك في قائمتنا البريدية
              </h2>
              <p className="body-large text-gray-700 mb-8 max-w-2xl mx-auto">
                انضم إلى قائمتنا البريدية للحصول على آخر الإصدارات وعروض خاصة على كتبنا
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="flex-1 px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-inception-purple focus:border-transparent"
                />
                <button className="btn-primary whitespace-nowrap">
                  اشترك الآن
                </button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      
      {/* Book Detail Dialog */}
      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-inception-purple">
              {selectedBook?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedBook?.longDescription || selectedBook?.description || 'كتاب مفيد ومثري في هذا المجال'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex justify-center">
                <img
                  src={selectedBook?.cover}
                  alt={selectedBook?.title}
                  className="w-32 h-auto shadow-md rounded-md"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-gray-700 text-sm mb-2">
                  <span className="font-semibold">السعر:</span> {selectedBook?.price}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">الفئة:</span> {
                    categories.find(c => c.id === selectedBook?.category)?.name || selectedBook?.category
                  }
                </p>
              </div>
            </div>
            <div className="text-gray-700 text-sm mb-4">
              <p><strong>وصف مفصل:</strong></p>
              <p>{selectedBook?.longDescription || selectedBook?.description || 'كتاب قيم يقدم معلومات مفيدة في هذا المجال المهم.'}</p>
            </div>
          </div>
          <DialogFooter>
            <button className="btn-primary w-full">
              اطلب الكتاب الآن
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Books;
