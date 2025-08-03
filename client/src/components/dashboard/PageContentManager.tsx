import React, { useState, useEffect } from "react";
import {
  Save, Eye, Edit3, Image, Link, Type, Layout, 
  Globe, Phone, Mail, Calendar, MapPin, Star,
  Plus, Trash2, Move, Settings, Lightbulb, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import EnhancedMediaManager from "./EnhancedMediaManager";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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

interface PageContent {
  id: number;
  page: 'home' | 'contact' | 'about';
  title: string;
  metaTitle: string;
  metaDescription: string;
  sections: PageSection[];
  contactInfo?: {
    phone: string;
    email: string;
    whatsapp: string;
    address: string;
    calendlyLink: string;
  };
  socialLinks?: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface PageContentManagerProps {
  pageType: 'home' | 'contact' | 'about';
}

const PageContentManager: React.FC<PageContentManagerProps> = ({ pageType }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // States
  const [activeTab, setActiveTab] = useState("content");
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showMediaManager, setShowMediaManager] = useState(false);
  const [selectedImageField, setSelectedImageField] = useState<string>("");

  // Auto-save timer
  useEffect(() => {
    if (!pageContent || !isEditing) return;
    
    const timer = setTimeout(() => {
      setAutoSaveStatus("جاري الحفظ التلقائي...");
      handleAutoSave();
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [pageContent, isEditing]);

  // Fetch page content
  const { data: existingContent, isLoading } = useQuery<PageContent>({
    queryKey: [`/api/page-content/${pageType}`]
  });

  // Initialize content
  useEffect(() => {
    if (existingContent) {
      setPageContent(existingContent);
    } else {
      // Initialize with default structure
      setPageContent({
        id: 0,
        page: pageType,
        title: getDefaultTitle(pageType),
        metaTitle: "",
        metaDescription: "",
        sections: getDefaultSections(pageType),
        contactInfo: pageType === 'contact' ? {
          phone: "+201234567890",
          email: "info@inception.com",
          whatsapp: "+201234567890",
          address: "القاهرة، مصر",
          calendlyLink: "https://calendly.com"
        } : undefined,
        socialLinks: {
          facebook: "",
          twitter: "",
          linkedin: "",
          instagram: ""
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  }, [existingContent, pageType]);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (data: PageContent) => {
      return await apiRequest('POST', `/api/page-content/${pageType}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/page-content/${pageType}`] });
      setAutoSaveStatus("تم الحفظ التلقائي ✓");
      setTimeout(() => setAutoSaveStatus(""), 3000);
      toast({
        title: "تم الحفظ",
        description: "تم حفظ محتوى الصفحة بنجاح"
      });
    },
    onError: () => {
      setAutoSaveStatus("فشل في الحفظ");
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ المحتوى",
        variant: "destructive"
      });
    }
  });

  const handleAutoSave = () => {
    if (pageContent) {
      saveMutation.mutate(pageContent);
    }
  };

  const handleSave = () => {
    if (pageContent) {
      saveMutation.mutate(pageContent);
      setIsEditing(false);
    }
  };

  // Section management
  const addSection = (type: PageSection['type']) => {
    if (!pageContent) return;
    
    const newSection: PageSection = {
      id: `section_${Date.now()}`,
      type,
      title: `عنوان ${type}`,
      content: "",
      order: pageContent.sections.length,
      visible: true
    };
    
    setPageContent({
      ...pageContent,
      sections: [...pageContent.sections, newSection]
    });
    setIsEditing(true);
  };

  const updateSection = (sectionId: string, updates: Partial<PageSection>) => {
    if (!pageContent) return;
    
    setPageContent({
      ...pageContent,
      sections: pageContent.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    });
    setIsEditing(true);
  };

  const deleteSection = (sectionId: string) => {
    if (!pageContent) return;
    
    setPageContent({
      ...pageContent,
      sections: pageContent.sections.filter(section => section.id !== sectionId)
    });
    setIsEditing(true);
  };

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    if (!pageContent) return;
    
    const sections = [...pageContent.sections];
    const index = sections.findIndex(s => s.id === sectionId);
    
    if (direction === 'up' && index > 0) {
      [sections[index], sections[index - 1]] = [sections[index - 1], sections[index]];
    } else if (direction === 'down' && index < sections.length - 1) {
      [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]];
    }
    
    setPageContent({
      ...pageContent,
      sections: sections.map((section, idx) => ({ ...section, order: idx }))
    });
    setIsEditing(true);
  };

  // Media selection
  const handleImageSelect = (file: any) => {
    if (!pageContent || !selectedImageField) return;
    
    if (selectedImageField.startsWith('section_')) {
      const sectionId = selectedImageField.replace('section_', '');
      updateSection(sectionId, { image: file.url });
    }
    
    setShowMediaManager(false);
    setSelectedImageField("");
  };

  // Render section editor
  const renderSectionEditor = (section: PageSection) => (
    <Card key={section.id} className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{section.type}</Badge>
          <Input
            value={section.title}
            onChange={(e) => updateSection(section.id, { title: e.target.value })}
            className="font-medium"
          />
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => moveSection(section.id, 'up')}
          >
            ↑
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => moveSection(section.id, 'down')}
          >
            ↓
          </Button>
          <Switch
            checked={section.visible}
            onCheckedChange={(checked) => updateSection(section.id, { visible: checked })}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => deleteSection(section.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {section.type === 'text' || section.type === 'hero' ? (
          <div>
            <Label>المحتوى</Label>
            <RichTextEditor
              content={section.content}
              onChange={(content) => updateSection(section.id, { content })}
            />
          </div>
        ) : (
          <div>
            <Label>النص</Label>
            <Textarea
              value={section.content}
              onChange={(e) => updateSection(section.id, { content: e.target.value })}
              rows={4}
            />
          </div>
        )}
        
        {(section.type === 'image' || section.type === 'hero' || section.type === 'cta') && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>الصورة</Label>
              <div className="flex gap-2">
                <Input
                  value={section.image || ''}
                  onChange={(e) => updateSection(section.id, { image: e.target.value })}
                  placeholder="رابط الصورة"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedImageField(`section_${section.id}`);
                    setShowMediaManager(true);
                  }}
                >
                  <Image className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {section.type === 'cta' && (
              <>
                <div>
                  <Label>نص الزر</Label>
                  <Input
                    value={section.buttonText || ''}
                    onChange={(e) => updateSection(section.id, { buttonText: e.target.value })}
                    placeholder="نص الزر"
                  />
                </div>
                <div>
                  <Label>الرابط</Label>
                  <Input
                    value={section.link || ''}
                    onChange={(e) => updateSection(section.id, { link: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </>
            )}
          </div>
        )}
        
        {section.image && (
          <div className="w-32 h-32 border rounded-lg overflow-hidden">
            <img src={section.image} alt={section.title} className="w-full h-full object-cover" />
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">جاري التحميل...</div>;
  }

  if (!pageContent) {
    return <div className="p-8">خطأ في تحميل المحتوى</div>;
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-inception-purple">
            إدارة محتوى صفحة {getPageDisplayName(pageType)}
          </h1>
          {autoSaveStatus && (
            <p className="text-sm text-gray-500 mt-1">{autoSaveStatus}</p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            معاينة
          </Button>
          <Button onClick={handleSave} disabled={saveMutation.isPending}>
            <Save className="h-4 w-4 mr-2" />
            حفظ التغييرات
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">المحتوى</TabsTrigger>
          <TabsTrigger value="seo">السيو</TabsTrigger>
          <TabsTrigger value="contact">بيانات الاتصال</TabsTrigger>
          <TabsTrigger value="social">وسائل التواصل</TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-5 w-5" />
                عنوان الصفحة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={pageContent.title}
                onChange={(e) => {
                  setPageContent({ ...pageContent, title: e.target.value });
                  setIsEditing(true);
                }}
                placeholder="عنوان الصفحة"
                className="text-lg font-medium"
              />
            </CardContent>
          </Card>

          {/* Sections */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  أقسام الصفحة
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => addSection('hero')}>
                    <Plus className="h-4 w-4 mr-1" />
                    قسم رئيسي
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addSection('text')}>
                    <Plus className="h-4 w-4 mr-1" />
                    نص
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addSection('image')}>
                    <Plus className="h-4 w-4 mr-1" />
                    صورة
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addSection('cta')}>
                    <Plus className="h-4 w-4 mr-1" />
                    دعوة للعمل
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {pageContent.sections
                .sort((a, b) => a.order - b.order)
                .map(renderSectionEditor)}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                إعدادات السيو
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>عنوان الصفحة (Meta Title)</Label>
                <Input
                  value={pageContent.metaTitle}
                  onChange={(e) => {
                    setPageContent({ ...pageContent, metaTitle: e.target.value });
                    setIsEditing(true);
                  }}
                  placeholder="عنوان الصفحة للظهور في محركات البحث"
                />
                <p className="text-sm text-gray-500 mt-1">
                  الطول المثالي: 50-60 حرف (الحالي: {pageContent.metaTitle.length})
                </p>
              </div>
              
              <div>
                <Label>وصف الصفحة (Meta Description)</Label>
                <Textarea
                  value={pageContent.metaDescription}
                  onChange={(e) => {
                    setPageContent({ ...pageContent, metaDescription: e.target.value });
                    setIsEditing(true);
                  }}
                  placeholder="وصف الصفحة للظهور في محركات البحث"
                  rows={3}
                />
                <p className="text-sm text-gray-500 mt-1">
                  الطول المثالي: 150-160 حرف (الحالي: {pageContent.metaDescription.length})
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-6">
          {pageContent.contactInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  بيانات الاتصال
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>رقم الهاتف</Label>
                    <Input
                      value={pageContent.contactInfo.phone}
                      onChange={(e) => {
                        setPageContent({
                          ...pageContent,
                          contactInfo: { ...pageContent.contactInfo!, phone: e.target.value }
                        });
                        setIsEditing(true);
                      }}
                      placeholder="+201234567890"
                    />
                  </div>
                  
                  <div>
                    <Label>البريد الإلكتروني</Label>
                    <Input
                      value={pageContent.contactInfo.email}
                      onChange={(e) => {
                        setPageContent({
                          ...pageContent,
                          contactInfo: { ...pageContent.contactInfo!, email: e.target.value }
                        });
                        setIsEditing(true);
                      }}
                      placeholder="info@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label>واتساب</Label>
                    <Input
                      value={pageContent.contactInfo.whatsapp}
                      onChange={(e) => {
                        setPageContent({
                          ...pageContent,
                          contactInfo: { ...pageContent.contactInfo!, whatsapp: e.target.value }
                        });
                        setIsEditing(true);
                      }}
                      placeholder="+201234567890"
                    />
                  </div>
                  
                  <div>
                    <Label>رابط Calendly</Label>
                    <Input
                      value={pageContent.contactInfo.calendlyLink}
                      onChange={(e) => {
                        setPageContent({
                          ...pageContent,
                          contactInfo: { ...pageContent.contactInfo!, calendlyLink: e.target.value }
                        });
                        setIsEditing(true);
                      }}
                      placeholder="https://calendly.com/..."
                    />
                  </div>
                </div>
                
                <div>
                  <Label>العنوان</Label>
                  <Textarea
                    value={pageContent.contactInfo.address}
                    onChange={(e) => {
                      setPageContent({
                        ...pageContent,
                        contactInfo: { ...pageContent.contactInfo!, address: e.target.value }
                      });
                      setIsEditing(true);
                    }}
                    placeholder="العنوان الكامل"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Social Tab */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                وسائل التواصل الاجتماعي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(pageContent.socialLinks || {}).map(([platform, url]) => (
                  <div key={platform}>
                    <Label>{platform}</Label>
                    <Input
                      value={url}
                      onChange={(e) => {
                        setPageContent({
                          ...pageContent,
                          socialLinks: { ...pageContent.socialLinks!, [platform]: e.target.value }
                        });
                        setIsEditing(true);
                      }}
                      placeholder={`https://${platform}.com/...`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Media Manager Dialog */}
      <Dialog open={showMediaManager} onOpenChange={setShowMediaManager}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>اختر صورة</DialogTitle>
          </DialogHeader>
          <EnhancedMediaManager
            onSelectFile={handleImageSelect}
            allowSelection={true}
            fileType="image"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper functions
const getDefaultTitle = (pageType: string) => {
  switch (pageType) {
    case 'home': return 'الصفحة الرئيسية';
    case 'contact': return 'تواصل معنا';
    case 'about': return 'من نحن';
    default: return 'صفحة';
  }
};

const getPageDisplayName = (pageType: string) => {
  switch (pageType) {
    case 'home': return 'الرئيسية';
    case 'contact': return 'التواصل';
    case 'about': return 'من نحن';
    default: return 'غير محددة';
  }
};

const getDefaultSections = (pageType: string): PageSection[] => {
  switch (pageType) {
    case 'home':
      return [
        {
          id: 'hero_1',
          type: 'hero',
          title: 'القسم الرئيسي',
          content: '<h1>مرحباً بكم في إنسيبشن</h1><p>نحن نساعدك في تحقيق أهدافك التسويقية</p>',
          image: '',
          buttonText: 'ابدأ الآن',
          link: '#contact',
          order: 0,
          visible: true
        }
      ];
    case 'contact':
      return [
        {
          id: 'contact_hero',
          type: 'hero',
          title: 'تواصل معنا',
          content: '<h1>تواصل معنا</h1><p>نحن هنا لمساعدتك</p>',
          order: 0,
          visible: true
        }
      ];
    case 'about':
      return [
        {
          id: 'about_hero',
          type: 'hero',
          title: 'من نحن',
          content: '<h1>من نحن</h1><p>نبذة عن شركتنا</p>',
          order: 0,
          visible: true
        }
      ];
    default:
      return [];
  }
};

export default PageContentManager;