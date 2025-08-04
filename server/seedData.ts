import { storage } from "./storage";
import type { InsertService, InsertIndustry, InsertBook, InsertTestimonial, InsertArticle } from "@shared/schema";

export async function seedDatabase() {
  console.log("بدء إضافة البيانات الأولية...");

  try {
    // إضافة الخدمات
    const services: InsertService[] = [
      {
        title: "تحسين محركات البحث (SEO)",
        description: "نحسن موقعك في نتائج جوجل لتحصل على عملاء أكثر بتكلفة أقل",
        longDescription: "خدمة SEO شاملة تتضمن تحليل المنافسين، اختيار الكلمات المفتاحية، تحسين المحتوى، وبناء الروابط الخارجية لضمان ظهور موقعك في النتائج الأولى لمحركات البحث",
        icon: "search",
        category: "تسويق رقمي",
        stats: "تحسن ترتيب الموقع خلال 3 أشهر",
        gradient: "from-blue-500 to-purple-600",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        videoThumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
        valueProposition: "<p>نحن لا نقوم بـ SEO فقط، بل نبني <strong>استراتيجية رقمية متكاملة</strong> تجعل عملك يهيمن على نتائج البحث.</p><p>بينما المنافسون يركزون على الكلمات المفتاحية فقط، نحن نبني <strong>سلطة رقمية حقيقية</strong> لعلامتك التجارية.</p>",
        competitiveAdvantages: JSON.stringify([
          {
            id: 1,
            title: "منهجية علمية مثبتة",
            description: "نستخدم أحدث أدوات التحليل والذكاء الاصطناعي لضمان النتائج"
          },
          {
            id: 2,
            title: "فريق خبراء متخصص",
            description: "15+ سنة خبرة في السوق السعودي والخليجي"
          },
          {
            id: 3,
            title: "تقارير شفافة أسبوعية",
            description: "تتبع مباشر للنتائج مع تقارير مفصلة كل أسبوع"
          }
        ]),
        successStories: JSON.stringify([
          {
            id: 1,
            title: "شركة الرياض للعقارات",
            description: "نقلناها من الصفحة 5 إلى المراكز الثلاثة الأولى في جوجل خلال 4 أشهر",
            metric: "300%",
            metricLabel: "زيادة الزيارات",
            clientName: "شركة الرياض للعقارات",
            timeframe: "4 أشهر"
          },
          {
            id: 2,
            title: "متجر الأناقة الإلكتروني",
            description: "حققنا زيادة 400% في الطلبات الطبيعية من محركات البحث",
            metric: "400%",
            metricLabel: "زيادة المبيعات",
            clientName: "متجر الأناقة",
            timeframe: "6 أشهر"
          }
        ]),
        socialProof: JSON.stringify([
          { id: 1, number: "+200", label: "موقع تم تحسينه" },
          { id: 2, number: "95%", label: "معدل نجاح العملاء" },
          { id: 3, number: "+150%", label: "متوسط الزيادة في الترافيك" },
          { id: 4, number: "24/7", label: "دعم فني مستمر" }
        ]),
        guarantees: JSON.stringify([
          {
            id: 1,
            title: "ضمان التحسن خلال 90 يوم",
            description: "إذا لم تشهد تحسناً في الترتيب خلال 3 أشهر، نواصل العمل مجاناً"
          },
          {
            id: 2,
            title: "ضمان الشفافية الكاملة",
            description: "تقارير أسبوعية مفصلة + وصول مباشر لجميع الأدوات والتحليلات"
          },
          {
            id: 3,
            title: "ضمان عدم استخدام تقنيات ضارة",
            description: "نلتزم بإرشادات جوجل 100% ولا نستخدم أي تقنيات تضر بموقعك"
          }
        ]),
        urgencyElements: JSON.stringify([
          {
            id: 1,
            title: "خصم 30% للـ 10 عملاء الأوائل",
            description: "وفر 3000 ريال على باقة SEO المتكاملة",
            deadline: "31 يناير 2025"
          },
          {
            id: 2,
            title: "تحليل منافسين مجاني",
            description: "قيمته 1500 ريال - مجاناً للمتقدمين هذا الشهر",
            deadline: "متبقي 15 يوم"
          }
        ])
      },
      {
        title: "الإعلانات المدفوعة",
        description: "إعلانات فيسبوك وجوجل تجيب عملاء مهتمين فعلاً بمنتجك",
        longDescription: "إدارة حملات إعلانية احترافية على فيسبوك، إنستجرام، جوجل آدز، ولينكد إن مع تتبع دقيق للنتائج وتحسين مستمر للأداء",
        icon: "bullhorn",
        category: "إعلانات",
        stats: "عائد استثمار يصل إلى 400%",
        gradient: "from-green-500 to-teal-600"
      },
      {
        title: "إدارة وسائل التواصل الاجتماعي",
        description: "نبني لك حضور قوي على السوشيال ميديا يخلي عملائك يثقوا فيك",
        longDescription: "إدارة شاملة لحسابات السوشيال ميديا مع إنشاء محتوى جذاب، تفاعل مع المتابعين، وبناء مجتمع متفاعل حول علامتك التجارية",
        icon: "share-alt",
        category: "سوشيال ميديا",
        stats: "زيادة التفاعل بنسبة 250%",
        gradient: "from-pink-500 to-red-600"
      },
      {
        title: "تطوير المواقع الإلكترونية",
        description: "مواقع سريعة وجميلة تحول الزوار إلى عملاء",
        longDescription: "تصميم وتطوير مواقع إلكترونية احترافية محسنة لمحركات البحث والتحويل، مع تجربة مستخدم مميزة وتصميم متجاوب",
        icon: "code",
        category: "تطوير",
        stats: "سرعة تحميل أقل من 3 ثواني",
        gradient: "from-blue-600 to-indigo-700"
      },
      {
        title: "إنتاج المحتوى المرئي",
        description: "فيديوهات وتصاميم تلفت النظر وتحقق انتشار واسع",
        longDescription: "إنتاج محتوى مرئي احترافي يشمل الفيديوهات، الرسوم المتحركة، والتصاميم الجرافيكية التي تعبر عن علامتك التجارية",
        icon: "video",
        category: "إنتاج",
        stats: "زيادة معدل المشاهدة بـ 300%",
        gradient: "from-purple-500 to-pink-600"
      }
    ];

    for (const service of services) {
      await storage.createService(service);
    }

    // إضافة الصناعات
    const industries: InsertIndustry[] = [
      {
        title: "العقارات",
        subtitle: "حلول تسويقية متخصصة للقطاع العقاري",
        description: "نساعد شركات التطوير العقاري ووسطاء العقارات في الوصول للعملاء المناسبين وزيادة المبيعات",
        icon: "building",
        gradient: "from-blue-600 to-blue-800",
        bgGradient: "from-blue-50 to-blue-100",
        results: JSON.stringify([
          "زيادة الاستفسارات بنسبة 180%",
          "تقليل تكلفة العميل المحتمل بـ 40%",
          "تحسين معدل التحويل إلى مبيعات"
        ]),
        services: JSON.stringify([
          "إعلانات مستهدفة للعقارات",
          "تسويق المشاريع الجديدة",
          "إدارة منصات العقارات الرقمية"
        ])
      },
      {
        title: "التجارة الإلكترونية",
        subtitle: "تسويق رقمي يزيد مبيعاتك أونلاين",
        description: "حلول تسويقية شاملة للمتاجر الإلكترونية لزيادة المبيعات وبناء قاعدة عملاء مخلصين",
        icon: "shopping-cart",
        gradient: "from-green-600 to-emerald-700",
        bgGradient: "from-green-50 to-emerald-100",
        results: JSON.stringify([
          "زيادة المبيعات بنسبة 250%",
          "تحسين معدل التحويل إلى 5.2%",
          "خفض تكلفة الإعلانات بـ 30%"
        ]),
        services: JSON.stringify([
          "تحسين متاجر إلكترونية لمحركات البحث",
          "إعلانات تسوق جوجل",
          "استراتيجيات التسويق بالمحتوى"
        ])
      },
      {
        title: "الرعاية الصحية",
        subtitle: "تسويق طبي أخلاقي وفعال",
        description: "نساعد المؤسسات الطبية والعيادات في الوصول للمرضى وبناء سمعة مهنية موثوقة",
        icon: "heart",
        gradient: "from-red-500 to-pink-600",
        bgGradient: "from-red-50 to-pink-100",
        results: JSON.stringify([
          "زيادة حجوزات المواعيد بـ 120%",
          "تحسين تقييمات المرضى",
          "بناء ثقة المجتمع الطبي"
        ]),
        services: JSON.stringify([
          "تسويق العيادات الطبية",
          "إدارة سمعة طبية رقمية",
          "محتوى طبي تعليمي"
        ])
      }
    ];

    for (const industry of industries) {
      await storage.createIndustry(industry);
    }

    // إضافة الشهادات
    const testimonials: InsertTestimonial[] = [
      {
        name: "أحمد محمد",
        position: "مدير التسويق",
        company: "شركة العقارات المتقدمة",
        content: "إنسيبشن غيرت نظرتنا للتسويق الرقمي. من يوم ما بدأنا معاهم، العملاء بقوا يتصلوا بينا بدل ما إحنا نركض وراهم. النتايج واضحة والفريق محترف جداً.",
        rating: 5,
        image: "/images/testimonials/ahmed.jpg"
      },
      {
        name: "سارة أحمد",
        position: "صاحبة متجر إلكتروني",
        company: "متجر الأناقة الحديثة",
        content: "مبيعات متجري زادت 300% في أول 4 شهور من الشغل مع إنسيبشن. الحملات الإعلانية اللي عملوها جابت عملاء حقيقيين مش مجرد زيارات.",
        rating: 5,
        image: "/images/testimonials/sara.jpg"
      },
      {
        name: "د. محمد علي",
        position: "طبيب أسنان",
        company: "عيادة الابتسامة المثالية",
        content: "كنت متردد في البداية بس النتايج كانت مذهلة. مواعيد العيادة بقت محجوزة كاملة والمرضى بقوا يجوا من مناطق بعيدة عشان يتعالجوا عندي.",
        rating: 5,
        image: "/images/testimonials/doctor.jpg"
      }
    ];

    for (const testimonial of testimonials) {
      await storage.createTestimonial(testimonial);
    }

    // إضافة الكتب
    const books: InsertBook[] = [
      {
        title: "دليل التسويق الرقمي الشامل",
        description: "كل ما تحتاج معرفته عن التسويق الرقمي الحديث",
        longDescription: "دليل شامل يغطي جميع جوانب التسويق الرقمي من الأساسيات إلى الاستراتيجيات المتقدمة، مع أمثلة عملية ودراسات حالة من السوق العربي",
        cover: "/images/books/digital-marketing-guide.jpg",
        price: "مجاني",
        category: "تسويق رقمي"
      },
      {
        title: "أسرار نجاح الإعلانات المدفوعة",
        description: "كيف تحقق أفضل عائد من إعلاناتك",
        longDescription: "استراتيجيات متقدمة لإنشاء حملات إعلانية ناجحة على فيسبوك وجوجل، مع تقنيات الاستهداف والتحسين المستمر",
        cover: "/images/books/ads-secrets.jpg",
        price: "99 ريال",
        category: "إعلانات"
      },
      {
        title: "بناء العلامة التجارية الرقمية",
        description: "خطوات عملية لبناء علامة تجارية قوية أونلاين",
        longDescription: "دليل عملي لبناء وإدارة العلامة التجارية في العصر الرقمي، مع استراتيجيات المحتوى والتفاعل مع الجمهور",
        cover: "/images/books/brand-building.jpg",
        price: "149 ريال",
        category: "علامة تجارية"
      }
    ];

    for (const book of books) {
      await storage.createBook(book);
    }

    // إضافة المقالات
    const articles: InsertArticle[] = [
      {
        title: "10 نصائح لتحسين SEO موقعك في 2024",
        excerpt: "اكتشف أحدث استراتيجيات تحسين محركات البحث التي ستجعل موقعك في المقدمة",
        content: "محتوى المقال الكامل هنا...",
        category: "seo-guide",
        categoryName: "دليل SEO",
        author: "فريق إنسيبشن",
        readTime: "5 دقائق",
        image: "/images/articles/seo-tips-2024.jpg",
        featured: true,
        views: 1250
      },
      {
        title: "كيف تنشئ حملة إعلانية ناجحة على فيسبوك",
        excerpt: "خطوات عملية لإنشاء حملات إعلانية تحقق أفضل النتائج بأقل التكاليف",
        content: "محتوى المقال الكامل هنا...",
        category: "digital-marketing-tips",
        categoryName: "نصائح التسويق الرقمي",
        author: "أحمد محمد",
        readTime: "8 دقائق",
        image: "/images/articles/facebook-ads.jpg",
        featured: true,
        views: 2100
      },
      {
        title: "استراتيجيات المحتوى التي تزيد المبيعات",
        excerpt: "تعرف على كيفية إنشاء محتوى يحول المتابعين إلى عملاء فعليين",
        content: "محتوى المقال الكامل هنا...",
        category: "content-strategy",
        categoryName: "استراتيجية المحتوى",
        author: "سارة أحمد",
        readTime: "6 دقائق",
        image: "/images/articles/content-strategy.jpg",
        featured: false,
        views: 950
      }
    ];

    for (const article of articles) {
      await storage.createArticle(article);
    }

    console.log("✅ تم إضافة جميع البيانات الأولية بنجاح!");
    return true;
  } catch (error) {
    console.error("❌ خطأ في إضافة البيانات:", error);
    return false;
  }
}