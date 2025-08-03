import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DragDropContext, 
  Droppable, 
  Draggable, 
  DropResult 
} from 'react-beautiful-dnd';
import { 
  GripVertical, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  Copy, 
  Settings,
  Image as ImageIcon,
  Type,
  Zap,
  Layout,
  Target
} from "lucide-react";

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

interface AdvancedSectionEditorProps {
  sections: PageSection[];
  onChange: (sections: PageSection[]) => void;
  onPreview: (section: PageSection) => void;
}

const AdvancedSectionEditor: React.FC<AdvancedSectionEditorProps> = ({
  sections,
  onChange,
  onPreview
}) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [templates, setTemplates] = useState<PageSection[]>([]);

  // Section templates
  useEffect(() => {
    setTemplates([
      {
        id: 'hero_template',
        type: 'hero',
        title: 'قسم البطل',
        content: '<h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">عنوان رئيسي جذاب</h1><p class="text-xl text-gray-600 mb-8">وصف يوضح قيمة الخدمة أو المنتج</p>',
        buttonText: 'ابدأ الآن',
        link: '#contact',
        order: 0,
        visible: true
      },
      {
        id: 'features_template',
        type: 'features',
        title: 'قسم المميزات',
        content: '<h2 class="text-3xl font-bold text-center mb-12">مميزاتنا</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div class="text-center"><h3 class="text-xl font-semibold mb-4">جودة عالية</h3><p>نقدم خدمات بأعلى معايير الجودة</p></div></div>',
        order: 1,
        visible: true
      },
      {
        id: 'cta_template',
        type: 'cta',
        title: 'دعوة للعمل',
        content: '<h2 class="text-3xl font-bold mb-6">ابدأ مشروعك معنا اليوم</h2><p class="text-xl mb-8">لا تفوت الفرصة، احجز استشارتك المجانية الآن</p>',
        buttonText: 'احجز استشارة مجانية',
        link: '/contact',
        order: 2,
        visible: true
      }
    ]);
  }, []);

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'hero': return <Zap className="w-4 h-4" />;
      case 'text': return <Type className="w-4 h-4" />;
      case 'image': return <ImageIcon className="w-4 h-4" />;
      case 'features': return <Layout className="w-4 h-4" />;
      case 'cta': return <Target className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getSectionColor = (type: string) => {
    switch (type) {
      case 'hero': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'text': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'image': return 'bg-green-100 text-green-800 border-green-200';
      case 'features': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cta': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order numbers
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }));

    onChange(updatedItems);
  };

  const addSection = (template?: PageSection) => {
    const newSection: PageSection = template ? {
      ...template,
      id: `section_${Date.now()}`,
      order: sections.length
    } : {
      id: `section_${Date.now()}`,
      type: 'text',
      title: 'قسم جديد',
      content: '<p>محتوى القسم الجديد</p>',
      order: sections.length,
      visible: true
    };

    onChange([...sections, newSection]);
    setSelectedSection(newSection.id);
  };

  const updateSection = (id: string, updates: Partial<PageSection>) => {
    const updated = sections.map(section =>
      section.id === id ? { ...section, ...updates } : section
    );
    onChange(updated);
  };

  const deleteSection = (id: string) => {
    const filtered = sections.filter(section => section.id !== id);
    onChange(filtered);
    if (selectedSection === id) {
      setSelectedSection(null);
    }
  };

  const duplicateSection = (section: PageSection) => {
    const newSection = {
      ...section,
      id: `section_${Date.now()}`,
      title: `${section.title} (نسخة)`,
      order: sections.length
    };
    onChange([...sections, newSection]);
  };

  const selectedSectionData = sections.find(s => s.id === selectedSection);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Sections List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">أقسام الصفحة</h3>
          <Button onClick={() => addSection()} size="sm">
            <Plus className="w-4 h-4 ml-2" />
            إضافة قسم
          </Button>
        </div>

        {/* Templates */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">قوالب جاهزة</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 gap-2">
              {templates.map((template) => (
                <Button
                  key={template.id}
                  variant="outline"
                  size="sm"
                  onClick={() => addSection(template)}
                  className="flex flex-col h-auto p-3"
                >
                  {getSectionIcon(template.type)}
                  <span className="text-xs mt-1">{template.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sections List */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections">
            {(provided: any) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                {sections.map((section, index) => (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(provided: any, snapshot: any) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`${
                          selectedSection === section.id 
                            ? 'ring-2 ring-inception-purple' 
                            : ''
                        } ${
                          snapshot.isDragging ? 'shadow-lg' : ''
                        } cursor-pointer transition-all`}
                        onClick={() => setSelectedSection(section.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              {...provided.dragHandleProps}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <GripVertical className="w-4 h-4" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className={getSectionColor(section.type)}>
                                  {getSectionIcon(section.type)}
                                  <span className="mr-1">{section.type}</span>
                                </Badge>
                                
                                <span className="text-sm font-medium truncate">
                                  {section.title}
                                </span>
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateSection(section.id, { visible: !section.visible });
                                  }}
                                  className="ml-auto p-1"
                                >
                                  {section.visible ? 
                                    <Eye className="w-4 h-4" /> : 
                                    <EyeOff className="w-4 h-4" />
                                  }
                                </Button>
                              </div>
                              
                              <div className="text-xs text-gray-500 truncate">
                                {section.content.replace(/<[^>]*>/g, '').slice(0, 100)}...
                              </div>
                            </div>
                            
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onPreview(section);
                                }}
                                className="p-1"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  duplicateSection(section);
                                }}
                                className="p-1"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteSection(section.id);
                                }}
                                className="p-1 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Section Editor */}
      <div className="space-y-4">
        {selectedSectionData ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getSectionIcon(selectedSectionData.type)}
                تحرير القسم: {selectedSectionData.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">المحتوى</TabsTrigger>
                  <TabsTrigger value="design">التصميم</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  <div>
                    <Label htmlFor="section-title">عنوان القسم</Label>
                    <Input
                      id="section-title"
                      value={selectedSectionData.title}
                      onChange={(e) => updateSection(selectedSectionData.id, { title: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="section-type">نوع القسم</Label>
                    <Select
                      value={selectedSectionData.type}
                      onValueChange={(value) => updateSection(selectedSectionData.id, { type: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hero">قسم البطل</SelectItem>
                        <SelectItem value="text">نص</SelectItem>
                        <SelectItem value="image">صورة</SelectItem>
                        <SelectItem value="features">مميزات</SelectItem>
                        <SelectItem value="cta">دعوة للعمل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="section-content">المحتوى</Label>
                    <Textarea
                      id="section-content"
                      value={selectedSectionData.content}
                      onChange={(e) => updateSection(selectedSectionData.id, { content: e.target.value })}
                      rows={6}
                      className="font-mono text-sm"
                    />
                  </div>

                  {(selectedSectionData.type === 'hero' || selectedSectionData.type === 'cta') && (
                    <>
                      <div>
                        <Label htmlFor="button-text">نص الزر</Label>
                        <Input
                          id="button-text"
                          value={selectedSectionData.buttonText || ''}
                          onChange={(e) => updateSection(selectedSectionData.id, { buttonText: e.target.value })}
                        />
                      </div>

                      <div>
                        <Label htmlFor="button-link">رابط الزر</Label>
                        <Input
                          id="button-link"
                          value={selectedSectionData.link || ''}
                          onChange={(e) => updateSection(selectedSectionData.id, { link: e.target.value })}
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <Label htmlFor="section-image">صورة القسم</Label>
                    <Input
                      id="section-image"
                      value={selectedSectionData.image || ''}
                      onChange={(e) => updateSection(selectedSectionData.id, { image: e.target.value })}
                      placeholder="رابط الصورة"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="design" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="section-visible">إظهار القسم</Label>
                    <Switch
                      id="section-visible"
                      checked={selectedSectionData.visible}
                      onCheckedChange={(checked) => updateSection(selectedSectionData.id, { visible: checked })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="section-order">ترتيب القسم</Label>
                    <Input
                      id="section-order"
                      type="number"
                      value={selectedSectionData.order}
                      onChange={(e) => updateSection(selectedSectionData.id, { order: parseInt(e.target.value) })}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="seo" className="space-y-4">
                  <div>
                    <Label htmlFor="seo-title">عنوان SEO</Label>
                    <Input
                      id="seo-title"
                      value={selectedSectionData.seoTitle || ''}
                      onChange={(e) => updateSection(selectedSectionData.id, { seoTitle: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="seo-description">وصف SEO</Label>
                    <Textarea
                      id="seo-description"
                      value={selectedSectionData.seoDescription || ''}
                      onChange={(e) => updateSection(selectedSectionData.id, { seoDescription: e.target.value })}
                      rows={3}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">اختر قسماً للتحرير</h3>
              <p className="text-gray-600">حدد قسماً من القائمة لتحريره أو إضافة قسم جديد</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdvancedSectionEditor;