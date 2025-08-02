
import React, { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Link } from "wouter";
import { Check, Users, BookOpen, LineChart, Award } from "lucide-react";

const AboutMe = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="py-10 bg-gray-50 mb-16 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_30%_30%,rgba(55,18,79,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <AnimatedSection variant="fade-in-right" className="order-2 lg:order-1">
                <h1 className="headline-large text-inception-purple mb-6">
                  علي للبيزنس
                </h1>
                <p className="body-large text-gray-700 mb-8">
                  خبير التسويق والمبيعات مع أكثر من 15 عامًا من الخبرة في مساعدة الشركات على تحقيق أعلى مبيعات ممكنة من خلال استراتيجيات مبتكرة وفعالة.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-green-600" />
                    </div>
                    <p className="text-gray-700">خبرة في تطوير استراتيجيات المبيعات والتسويق لأكثر من 200 شركة</p>
                  </div>
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-green-600" />
                    </div>
                    <p className="text-gray-700">تدريب أكثر من 5000 شخص على أحدث أساليب المبيعات والتفاوض</p>
                  </div>
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-green-600" />
                    </div>
                    <p className="text-gray-700">مؤلف 6 كتب متخصصة في مجال المبيعات والتسويق</p>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection variant="fade-in-left" className="order-1 lg:order-2">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    alt="علي للبيزنس"
                    className="rounded-xl shadow-lg mx-auto"
                  />
                  <div className="absolute -bottom-6 -left-6 glass-card p-4 shadow-md animate-float">
                    <p className="text-sm text-gray-600 mb-1">خبرة في المبيعات</p>
                    <div className="text-xl font-bold text-inception-purple">+15 سنة</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <div className="container mx-auto px-4 md:px-6 mb-16">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="headline-medium text-inception-purple mb-4">
              خدماتي الاستشارية
            </h2>
            <p className="body-medium text-gray-700">
              أقدم مجموعة متكاملة من الخدمات الاستشارية والتدريبية للشركات والأفراد لتطوير المبيعات وتحقيق النمو المستدام
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedSection variant="fade-in" delay={0}>
              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-inception-purple bg-opacity-10 flex items-center justify-center text-inception-purple mx-auto mb-4">
                  <LineChart size={30} />
                </div>
                <h3 className="title-medium mb-3 text-inception-purple">استشارات المبيعات</h3>
                <p className="body-medium text-gray-600 mb-4">استشارات متخصصة لمساعدة شركتك على زيادة المبيعات وتحسين أداء فريق المبيعات.</p>
                <a href="#sales-consultation" className="btn-outline text-sm py-2 px-4">اقرأ المزيد</a>
              </div>
            </AnimatedSection>
            
            <AnimatedSection variant="fade-in" delay={100}>
              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-inception-purple bg-opacity-10 flex items-center justify-center text-inception-purple mx-auto mb-4">
                  <BookOpen size={30} />
                </div>
                <h3 className="title-medium mb-3 text-inception-purple">كورسات المبيعات</h3>
                <p className="body-medium text-gray-600 mb-4">دورات تدريبية احترافية للأفراد وأصحاب الأعمال لتطوير مهارات البيع والتفاوض.</p>
                <a href="#sales-courses" className="btn-outline text-sm py-2 px-4">اقرأ المزيد</a>
              </div>
            </AnimatedSection>
            
            <AnimatedSection variant="fade-in" delay={200}>
              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-inception-purple bg-opacity-10 flex items-center justify-center text-inception-purple mx-auto mb-4">
                  <Users size={30} />
                </div>
                <h3 className="title-medium mb-3 text-inception-purple">تدريب فرق السيلز</h3>
                <p className="body-medium text-gray-600 mb-4">برامج تدريبية مخصصة لفرق المبيعات في الشركات لتحسين الأداء وزيادة المبيعات.</p>
                <a href="#sales-teams" className="btn-outline text-sm py-2 px-4">اقرأ المزيد</a>
              </div>
            </AnimatedSection>
            
            <AnimatedSection variant="fade-in" delay={300}>
              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-inception-purple bg-opacity-10 flex items-center justify-center text-inception-purple mx-auto mb-4">
                  <Award size={30} />
                </div>
                <h3 className="title-medium mb-3 text-inception-purple">كتب واستراتيجيات</h3>
                <p className="body-medium text-gray-600 mb-4">مجموعة من الكتب والاستراتيجيات المتخصصة في مجال البيع والتفاوض.</p>
                <a href="#books-strategies" className="btn-outline text-sm py-2 px-4">اقرأ المزيد</a>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Sales Consultation */}
        <section id="sales-consultation" className="py-16 bg-gray-50 relative overflow-hidden scroll-mt-28">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,102,0,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <AnimatedSection variant="fade-in-right">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="استشارات المبيعات"
                    className="rounded-xl shadow-lg"
                  />
                  <div className="absolute -bottom-6 -left-6 glass-card p-4 shadow-md animate-float">
                    <p className="text-sm text-gray-600 mb-1">زيادة المبيعات</p>
                    <div className="text-xl font-bold text-inception-purple">+135%</div>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection variant="fade-in-left" className="space-y-6">
                <h2 className="headline-medium text-inception-purple">
                  استشارات المبيعات
                </h2>
                <p className="body-large text-gray-700">
                  أقدم استشارات متخصصة لمساعدة شركتك على زيادة المبيعات وتحسين أداء فريق المبيعات. من خلال تحليل عميق لوضعك الحالي وتطوير استراتيجيات مخصصة لتحقيق أهدافك.
                </p>
                
                <div className="space-y-4">
                  <div className="glass-card p-4">
                    <h4 className="font-semibold text-inception-purple mb-2">تحليل عملية البيع الحالية</h4>
                    <p className="text-gray-700">تقييم شامل لعملية البيع الحالية، وتحديد نقاط القوة والضعف، واكتشاف فرص التحسين.</p>
                  </div>
                  
                  <div className="glass-card p-4">
                    <h4 className="font-semibold text-inception-purple mb-2">تطوير استراتيجية مبيعات متكاملة</h4>
                    <p className="text-gray-700">تصميم استراتيجية مبيعات مخصصة تناسب طبيعة عملك وأهدافك، مع تحديد الخطوات العملية للتنفيذ.</p>
                  </div>
                  
                  <div className="glass-card p-4">
                    <h4 className="font-semibold text-inception-purple mb-2">تحسين معدلات التحويل</h4>
                    <p className="text-gray-700">تطوير حلول عملية لزيادة معدلات التحويل في كل مرحلة من مراحل عملية البيع، من الاستفسار الأولي إلى إتمام الصفقة.</p>
                  </div>
                </div>
                
                <Link to="/contact" className="btn-primary inline-block">
                  احجز استشارة مجانية
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Sales Courses */}
        <section id="sales-courses" className="py-16 relative overflow-hidden scroll-mt-28">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_30%_70%,rgba(55,18,79,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <AnimatedSection variant="fade-in-right" className="order-2 lg:order-1 space-y-6">
                <h2 className="headline-medium text-inception-purple">
                  كورسات المبيعات
                </h2>
                <p className="body-large text-gray-700">
                  دورات تدريبية احترافية للأفراد وأصحاب الأعمال لتطوير مهارات البيع والتفاوض. صممت هذه الدورات لمساعدتك على تحقيق نتائج ملموسة في أقصر وقت ممكن.
                </p>
                
                <div className="space-y-4">
                  <div className="glass-card p-4">
                    <h4 className="font-semibold text-inception-purple mb-2">أساسيات البيع الناجح</h4>
                    <p className="text-gray-700">تعلم المبادئ الأساسية للبيع الناجح، من فهم العميل واحتياجاته إلى إتمام الصفقة بنجاح.</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-semibold text-inception-orange">899 ج.م</span>
                      <button className="btn-outline text-sm py-1 px-3">اشترك الآن</button>
                    </div>
                  </div>
                  
                  <div className="glass-card p-4">
                    <h4 className="font-semibold text-inception-purple mb-2">مهارات التفاوض المتقدمة</h4>
                    <p className="text-gray-700">تطوير مهارات التفاوض لتحقيق أفضل النتائج في كل صفقة، سواء في المشتريات أو المبيعات.</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-semibold text-inception-orange">1299 ج.م</span>
                      <button className="btn-outline text-sm py-1 px-3">اشترك الآن</button>
                    </div>
                  </div>
                  
                  <div className="glass-card p-4">
                    <h4 className="font-semibold text-inception-purple mb-2">إدارة فرق المبيعات</h4>
                    <p className="text-gray-700">تعلم كيفية بناء وإدارة فريق مبيعات قوي، وتحفيزه لتحقيق أفضل النتائج.</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-semibold text-inception-orange">1499 ج.م</span>
                      <button className="btn-outline text-sm py-1 px-3">اشترك الآن</button>
                    </div>
                  </div>
                </div>
                
                <Link to="/contact" className="btn-primary inline-block">
                  عرض جميع الكورسات
                </Link>
              </AnimatedSection>
              
              <AnimatedSection variant="fade-in-left" className="order-1 lg:order-2">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="كورسات المبيعات"
                    className="rounded-xl shadow-lg"
                  />
                  <div className="absolute -bottom-6 -right-6 glass-card p-4 shadow-md animate-float">
                    <p className="text-sm text-gray-600 mb-1">عدد المتدربين</p>
                    <div className="text-xl font-bold text-inception-purple">+5000</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Sales Teams */}
        <section id="sales-teams" className="py-16 bg-gray-50 relative overflow-hidden scroll-mt-28">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,102,0,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <AnimatedSection variant="fade-in-right">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="تدريب فرق السيلز"
                    className="rounded-xl shadow-lg"
                  />
                  <div className="absolute -bottom-6 -left-6 glass-card p-4 shadow-md animate-float">
                    <p className="text-sm text-gray-600 mb-1">زيادة كفاءة فرق المبيعات</p>
                    <div className="text-xl font-bold text-inception-purple">+85%</div>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection variant="fade-in-left" className="space-y-6">
                <h2 className="headline-medium text-inception-purple">
                  تدريب فرق السيلز
                </h2>
                <p className="body-large text-gray-700">
                  برامج تدريبية مخصصة لفرق المبيعات في الشركات لتحسين الأداء وزيادة المبيعات. صممت هذه البرامج لتلبية احتياجات شركتك الخاصة وأهدافها.
                </p>
                
                <div className="space-y-4">
                  <div className="glass-card p-4">
                    <h4 className="font-semibold text-inception-purple mb-2">تدريب فرق المبيعات الجديدة</h4>
                    <p className="text-gray-700">برنامج تدريبي شامل لفرق المبيعات الجديدة، يغطي كل جوانب عملية البيع من البداية إلى النهاية.</p>
                  </div>
                  
                  <div className="glass-card p-4">
                    <h4 className="font-semibold text-inception-purple mb-2">تطوير مهارات فرق المبيعات الحالية</h4>
                    <p className="text-gray-700">برنامج متقدم لتطوير مهارات فرق المبيعات الحالية، وتحسين أدائها، وزيادة معدلات التحويل.</p>
                  </div>
                  
                  <div className="glass-card p-4">
                    <h4 className="font-semibold text-inception-purple mb-2">تدريب مديري المبيعات</h4>
                    <p className="text-gray-700">برنامج تدريبي متخصص لمديري المبيعات، يركز على مهارات القيادة، وإدارة الفريق، وتحقيق الأهداف.</p>
                  </div>
                </div>
                
                <Link to="/contact" className="btn-primary inline-block">
                  تواصل معنا لمعرفة المزيد
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Books & Strategies */}
        <section id="books-strategies" className="py-16 relative overflow-hidden scroll-mt-28">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_30%_70%,rgba(55,18,79,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <AnimatedSection variant="fade-in-right" className="order-2 lg:order-1 space-y-6">
                <h2 className="headline-medium text-inception-purple">
                  كتب واستراتيجيات
                </h2>
                <p className="body-large text-gray-700">
                  مجموعة من الكتب والاستراتيجيات المتخصصة في مجال البيع والتفاوض. هذه الموارد مصممة لمساعدتك على تطوير مهاراتك وتحقيق نتائج أفضل في عملك.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass-card p-4">
                    <h4 className="font-semibold text-inception-purple mb-2">فن البيع الحديث</h4>
                    <p className="text-gray-700 mb-3">كتاب يشرح أحدث تقنيات البيع وكيفية تطبيقها في عملك اليومي.</p>
                    <span className="font-semibold text-inception-orange">149 ج.م</span>
                  </div>
                  
                  <div className="glass-card p-4">
                    <h4 className="font-semibold text-inception-purple mb-2">أسرار المفاوضات الناجحة</h4>
                    <p className="text-gray-700 mb-3">كتاب يكشف أسرار المفاوضات الناجحة وكيفية الحصول على أفضل الصفقات.</p>
                    <span className="font-semibold text-inception-orange">169 ج.م</span>
                  </div>
                  
                  <div className="glass-card p-4">
                    <h4 className="font-semibold text-inception-purple mb-2">بناء فريق المبيعات المثالي</h4>
                    <p className="text-gray-700 mb-3">كتاب يشرح كيفية بناء وإدارة فريق مبيعات قوي يحقق النتائج المطلوبة.</p>
                    <span className="font-semibold text-inception-orange">199 ج.م</span>
                  </div>
                  
                  <div className="glass-card p-4">
                    <h4 className="font-semibold text-inception-purple mb-2">استراتيجيات التسويق الرقمي</h4>
                    <p className="text-gray-700 mb-3">كتاب يشرح كيفية استخدام التسويق الرقمي لزيادة المبيعات وجذب العملاء.</p>
                    <span className="font-semibold text-inception-orange">179 ج.م</span>
                  </div>
                </div>
                
                <Link to="/books" className="btn-primary inline-block">
                  عرض جميع الكتب
                </Link>
              </AnimatedSection>
              
              <AnimatedSection variant="fade-in-left" className="order-1 lg:order-2">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="كتب واستراتيجيات"
                    className="rounded-xl shadow-lg"
                  />
                  <div className="absolute -bottom-6 -right-6 glass-card p-4 shadow-md animate-float">
                    <p className="text-sm text-gray-600 mb-1">عدد الكتب المنشورة</p>
                    <div className="text-xl font-bold text-inception-purple">6</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,102,0,0.03)_0%,rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="headline-medium text-inception-purple mb-4">
                آراء العملاء
              </h2>
              <p className="body-medium text-gray-700">
                هذه بعض آراء العملاء الذين استفادوا من خدماتي الاستشارية والتدريبية
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <AnimatedSection variant="fade-in" delay={0}>
                <div className="glass-card p-6">
                  <div className="flex space-x-4 space-x-reverse items-center mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="https://randomuser.me/api/portraits/men/11.jpg"
                        alt="أحمد محمود"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-inception-purple">أحمد محمود</h4>
                      <p className="text-sm text-gray-600">مدير المبيعات - شركة الأمل للعقارات</p>
                    </div>
                  </div>
                  <p className="body-medium text-gray-600 italic">
                    "استشارات علي للبيزنس كان لها تأثير كبير على أداء فريق المبيعات لدينا. استطعنا زيادة المبيعات بنسبة 85% خلال 6 أشهر فقط من تطبيق الاستراتيجيات التي اقترحها علينا."
                  </p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection variant="fade-in" delay={100}>
                <div className="glass-card p-6">
                  <div className="flex space-x-4 space-x-reverse items-center mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="https://randomuser.me/api/portraits/women/32.jpg"
                        alt="سارة حسن"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-inception-purple">سارة حسن</h4>
                      <p className="text-sm text-gray-600">صاحبة شركة - ديكورات أنيقة</p>
                    </div>
                  </div>
                  <p className="body-medium text-gray-600 italic">
                    "شاركت في كورس مهارات البيع المتقدمة، واستفدت منه كثيراً في تطوير مهاراتي التسويقية. الأسلوب كان سهل ومباشر، والمعلومات كانت قيمة وعملية."
                  </p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection variant="fade-in" delay={200}>
                <div className="glass-card p-6">
                  <div className="flex space-x-4 space-x-reverse items-center mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="https://randomuser.me/api/portraits/men/22.jpg"
                        alt="محمد علي"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-inception-purple">محمد علي</h4>
                      <p className="text-sm text-gray-600">مدير تنفيذي - شركة التقدم للتكنولوجيا</p>
                    </div>
                  </div>
                  <p className="body-medium text-gray-600 italic">
                    "تدريب فريق المبيعات لدينا مع علي كان تجربة مميزة. الفريق الآن أكثر ثقة وقدرة على إقناع العملاء والتعامل مع الاعتراضات. ننصح بشدة بخدماته التدريبية."
                  </p>
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
                هل أنت جاهز لتطوير مبيعاتك؟
              </h2>
              <p className="body-large text-gray-700 mb-8 max-w-2xl mx-auto">
                تواصل معي الآن للحصول على استشارة مجانية لمناقشة احتياجاتك وكيف يمكنني مساعدتك في تحقيق أهدافك
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  احجز استشارة مجانية
                </Link>
                <a 
                  href="https://wa.me/201234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  تحدث معي على واتساب
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutMe;
