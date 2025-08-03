import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Palette, 
  Plus, 
  Download, 
  Upload, 
  Star, 
  Eye, 
  Copy, 
  Edit, 
  Trash2,
  Sparkles,
  Layers,
  Target,
  TrendingUp,
  Users,
  Calendar,
  Tag
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  category: 'landing' | 'service' | 'blog' | 'portfolio' | 'contact' | 'about';
  industry: string;
  structure: any;
  preview: string;
  tags: string[];
  rating: number;
  downloads: number;
  author: string;
  createdAt: Date;
  isPremium: boolean;
  seoOptimized: boolean;
  responsive: boolean;
}

interface ContentTemplateManagerProps {
  onSelectTemplate: (template: ContentTemplate) => void;
}

const ContentTemplateManager: React.FC<ContentTemplateManagerProps> = ({
  onSelectTemplate
}) => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<ContentTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<ContentTemplate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null);

  // محاكاة قوالب متنوعة
  useEffect(() => {
    const mockTemplates: ContentTemplate[] = [
      {
        id: '1',
        name: 'قالب هبوط للتسويق الرقمي',
        description: 'قالب متخصص لشركات التسويق الرقمي مع تركيز على تحويل الزوار',
        category: 'landing',
        industry: 'التسويق الرقمي',
        structure: {
          sections: [
            { type: 'hero', title: 'احترف التسويق الرقمي', optimized: true },
            { type: 'features', title: 'خدماتنا المميزة', optimized: true },
            { type: 'testimonials', title: 'آراء عملائنا', optimized: false },
            { type: 'cta', title: 'ابدأ مشروعك الآن', optimized: true }
          ]
        },
        preview: '/templates/marketing-landing.jpg',
        tags: ['تسويق', 'هبوط', 'تحويل'],
        rating: 4.8,
        downloads: 1250,
        author: 'فريق التصميم',
        createdAt: new Date('2025-01-01'),
        isPremium: false,
        seoOptimized: true,
        responsive: true
      },
      {
        id: '2',
        name: 'قالب خدمات طبية',
        description: 'مصمم خصيصاً للعيادات والمراكز الطبية مع تركيز على الثقة والمهنية',
        category: 'service',
        industry: 'الرعاية الصحية',
        structure: {
          sections: [
            { type: 'hero', title: 'رعاية صحية متميزة', optimized: true },
            { type: 'services', title: 'خدماتنا الطبية', optimized: true },
            { type: 'doctors', title: 'فريق الأطباء', optimized: false },
            { type: 'contact', title: 'احجز موعدك', optimized: true }
          ]
        },
        preview: '/templates/medical-service.jpg',
        tags: ['طبي', 'عيادة', 'صحة'],
        rating: 4.9,
        downloads: 890,
        author: 'استوديو الطب',
        createdAt: new Date('2025-01-10'),
        isPremium: true,
        seoOptimized: true,
        responsive: true
      },
      {
        id: '3',
        name: 'قالب مدونة تقنية',
        description: 'قالب عصري للمدونات التقنية مع تركيز على قابلية القراءة والSEO',
        category: 'blog',
        industry: 'التكنولوجيا',
        structure: {
          sections: [
            { type: 'hero', title: 'أحدث المقالات التقنية', optimized: true },
            { type: 'articles', title: 'المقالات المميزة', optimized: true },
            { type: 'categories', title: 'التصنيفات', optimized: true },
            { type: 'newsletter', title: 'اشترك في النشرة', optimized: true }
          ]
        },
        preview: '/templates/tech-blog.jpg',
        tags: ['مدونة', 'تقنية', 'مقالات'],
        rating: 4.7,
        downloads: 2100,
        author: 'تك رايتر',
        createdAt: new Date('2025-01-15'),
        isPremium: false,
        seoOptimized: true,
        responsive: true
      },
      {
        id: '4',
        name: 'قالب معرض أعمال إبداعي',
        description: 'قالب أنيق لعرض الأعمال الإبداعية والمشاريع الفنية',
        category: 'portfolio',
        industry: 'التصميم والفنون',
        structure: {
          sections: [
            { type: 'hero', title: 'معرض أعمالي', optimized: true },
            { type: 'gallery', title: 'أعمالي المميزة', optimized: false },
            { type: 'about', title: 'من أنا', optimized: true },
            { type: 'contact', title: 'تواصل معي', optimized: true }
          ]
        },
        preview: '/templates/creative-portfolio.jpg',
        tags: ['معرض', 'فني', 'إبداعي'],
        rating: 4.6,
        downloads: 756,
        author: 'كرييتف استوديو',
        createdAt: new Date('2025-01-20'),
        isPremium: true,
        seoOptimized: false,
        responsive: true
      },
      {
        id: '5',
        name: 'قالب صفحة تواصل تفاعلية',
        description: 'صفحة تواصل متطورة مع نماذج ذكية وخرائط تفاعلية',
        category: 'contact',
        industry: 'عام',
        structure: {
          sections: [
            { type: 'hero', title: 'تواصل معنا', optimized: true },
            { type: 'form', title: 'نموذج التواصل', optimized: true },
            { type: 'map', title: 'موقعنا', optimized: false },
            { type: 'info', title: 'معلومات الاتصال', optimized: true }
          ]
        },
        preview: '/templates/contact-interactive.jpg',
        tags: ['تواصل', 'نموذج', 'خريطة'],
        rating: 4.5,
        downloads: 1580,
        author: 'يو آي ماستر',
        createdAt: new Date('2025-01-25'),
        isPremium: false,
        seoOptimized: true,
        responsive: true
      }
    ];

    setTemplates(mockTemplates);
    setFilteredTemplates(mockTemplates);
  }, []);

  // فلترة القوالب
  useEffect(() => {
    let filtered = templates;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredTemplates(filtered);
  }, [templates, selectedCategory, searchQuery]);

  const handleTemplateSelect = (template: ContentTemplate) => {
    onSelectTemplate(template);
    toast({
      title: "تم تطبيق القالب",
      description: `تم تطبيق قالب "${template.name}" بنجاح`
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'landing': return <Target className="w-4 h-4" />;
      case 'service': return <Users className="w-4 h-4" />;
      case 'blog': return <Edit className="w-4 h-4" />;
      case 'portfolio': return <Layers className="w-4 h-4" />;
      case 'contact': return <Users className="w-4 h-4" />;
      default: return <Palette className="w-4 h-4" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'landing': return 'صفحة هبوط';
      case 'service': return 'صفحة خدمة';
      case 'blog': return 'مدونة';
      case 'portfolio': return 'معرض أعمال';
      case 'contact': return 'تواصل';
      case 'about': return 'من نحن';
      default: return category;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            مكتبة القوالب الاحترافية
          </CardTitle>
          
          <div className="flex gap-2">
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  إنشاء قالب
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إنشاء قالب جديد</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>اسم القالب</Label>
                      <Input placeholder="قالب رائع..." />
                    </div>
                    <div>
                      <Label>التصنيف</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر التصنيف" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="landing">صفحة هبوط</SelectItem>
                          <SelectItem value="service">صفحة خدمة</SelectItem>
                          <SelectItem value="blog">مدونة</SelectItem>
                          <SelectItem value="portfolio">معرض أعمال</SelectItem>
                          <SelectItem value="contact">تواصل</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label>الوصف</Label>
                    <Textarea placeholder="وصف القالب..." rows={3} />
                  </div>
                  
                  <div>
                    <Label>الكلمات المفتاحية</Label>
                    <Input placeholder="تسويق، هبوط، احترافي" />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                      إلغاء
                    </Button>
                    <Button onClick={() => {
                      setShowCreateDialog(false);
                      toast({
                        title: "تم إنشاء القالب",
                        description: "تم حفظ القالب الجديد بنجاح"
                      });
                    }}>
                      <Sparkles className="w-4 h-4 mr-2" />
                      إنشاء القالب
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              استيراد
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* شريط البحث والفلترة */}
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="ابحث في القوالب..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="جميع التصنيفات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع التصنيفات</SelectItem>
              <SelectItem value="landing">صفحات الهبوط</SelectItem>
              <SelectItem value="service">صفحات الخدمات</SelectItem>
              <SelectItem value="blog">المدونات</SelectItem>
              <SelectItem value="portfolio">معارض الأعمال</SelectItem>
              <SelectItem value="contact">صفحات التواصل</SelectItem>
              <SelectItem value="about">صفحات التعريف</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-semibold text-blue-600">{templates.length}</div>
            <div className="text-xs text-gray-600">إجمالي القوالب</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-semibold text-green-600">
              {templates.filter(t => t.seoOptimized).length}
            </div>
            <div className="text-xs text-gray-600">محسنة للSEO</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-lg font-semibold text-purple-600">
              {templates.filter(t => t.isPremium).length}
            </div>
            <div className="text-xs text-gray-600">قوالب مميزة</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-lg font-semibold text-yellow-600">
              {Math.round(templates.reduce((acc, t) => acc + t.rating, 0) / templates.length * 10) / 10}
            </div>
            <div className="text-xs text-gray-600">التقييم المتوسط</div>
          </div>
        </div>

        {/* شبكة القوالب */}
        <ScrollArea className="h-96">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative">
                  {/* معاينة القالب */}
                  <div className="h-32 bg-gradient-to-br from-inception-purple to-inception-orange rounded-t-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <Layers className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-sm font-medium">معاينة القالب</div>
                    </div>
                  </div>
                  
                  {/* شارات القالب */}
                  <div className="absolute top-2 right-2 flex gap-1">
                    {template.isPremium && (
                      <Badge className="bg-yellow-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        مميز
                      </Badge>
                    )}
                    {template.seoOptimized && (
                      <Badge className="bg-green-500 text-white">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        SEO
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* معلومات القالب */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {getCategoryIcon(template.category)}
                          <span className="mr-1">{getCategoryName(template.category)}</span>
                        </Badge>
                        <span className="text-xs text-gray-500">{template.industry}</span>
                      </div>
                      
                      <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                      <p className="text-xs text-gray-600 line-clamp-2">{template.description}</p>
                    </div>
                    
                    {/* التقييم والتحميلات */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        {renderStars(template.rating)}
                        <span className="text-gray-600">({template.rating})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Download className="w-3 h-3" />
                        {template.downloads}
                      </div>
                    </div>
                    
                    {/* الكلمات المفتاحية */}
                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <Tag className="w-2 h-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* أزرار العمل */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        تطبيق
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(template.structure));
                          toast({
                            title: "تم النسخ",
                            description: "تم نسخ هيكل القالب"
                          });
                        }}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {/* معاينة تفصيلية للقالب */}
        <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>معاينة القالب: {selectedTemplate?.name}</DialogTitle>
            </DialogHeader>
            
            {selectedTemplate && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">معلومات القالب</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">التصنيف:</span> {getCategoryName(selectedTemplate.category)}</div>
                      <div><span className="font-medium">الصناعة:</span> {selectedTemplate.industry}</div>
                      <div><span className="font-medium">المؤلف:</span> {selectedTemplate.author}</div>
                      <div><span className="font-medium">التقييم:</span> {selectedTemplate.rating}/5</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">الميزات</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className={`w-4 h-4 ${selectedTemplate.seoOptimized ? 'text-green-500' : 'text-gray-300'}`} />
                        محسن للSEO
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className={`w-4 h-4 ${selectedTemplate.responsive ? 'text-green-500' : 'text-gray-300'}`} />
                        متجاوب
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className={`w-4 h-4 ${selectedTemplate.isPremium ? 'text-yellow-500' : 'text-gray-300'}`} />
                        قالب مميز
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">هيكل القالب</h4>
                  <div className="border rounded-lg p-4 bg-gray-50 max-h-64 overflow-auto">
                    <pre className="text-sm">
                      {JSON.stringify(selectedTemplate.structure, null, 2)}
                    </pre>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                    إغلاق
                  </Button>
                  <Button onClick={() => {
                    handleTemplateSelect(selectedTemplate);
                    setSelectedTemplate(null);
                  }}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    تطبيق القالب
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ContentTemplateManager;