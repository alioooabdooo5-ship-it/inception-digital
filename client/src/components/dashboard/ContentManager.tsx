import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Home, Type, FileText, MousePointer, Image, Palette, Settings2, Save, Edit3 } from "lucide-react";
import type { Setting } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

const ContentManager = () => {
  const { toast } = useToast();
  const [editingSettings, setEditingSettings] = useState<{[key: string]: string}>({});
  const [activeTab, setActiveTab] = useState("hero");

  // Fetch all settings
  const { data: settings = [], isLoading } = useQuery<Setting[]>({
    queryKey: ['/api/settings']
  });

  // Update setting mutation
  const updateSettingMutation = useMutation({
    mutationFn: async ({ id, value }: { id: number; value: string }) => {
      const response = await fetch(`/api/settings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value })
      });
      if (!response.ok) throw new Error('Failed to update setting');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/settings'] });
      toast({
        title: "تم الحفظ",
        description: "تم حفظ المحتوى بنجاح",
      });
    },
    onError: (error) => {
      toast({
        title: "خطأ في الحفظ",
        description: "فشل في حفظ المحتوى",
        variant: "destructive",
      });
    },
  });

  const handleValueChange = (settingId: number, value: string) => {
    setEditingSettings(prev => ({
      ...prev,
      [settingId]: value
    }));
  };

  const handleSave = (setting: Setting) => {
    const newValue = editingSettings[setting.id] || setting.value;
    updateSettingMutation.mutate({ id: setting.id, value: newValue });
  };



  // تجميع الإعدادات حسب الأقسام المنطقية
  const settingsSections = {
    hero: {
      title: 'قسم Hero الرئيسي',
      icon: <Home className="w-5 h-5" />,
      description: 'العنوان الرئيسي والوصف والميزات',
      settings: settings.filter(s => 
        s.key.includes('hero_title') || 
        s.key.includes('hero_description') || 
        s.key.includes('hero_feature')
      )
    },
    buttons: {
      title: 'الأزرار والروابط',
      icon: <MousePointer className="w-5 h-5" />,
      description: 'نصوص الأزرار وروابطها',
      settings: settings.filter(s => 
        s.key.includes('button') || 
        s.key.includes('link')
      )
    },
    sections: {
      title: 'عناوين الأقسام',
      icon: <Type className="w-5 h-5" />,
      description: 'عناوين وأوصاف أقسام الموقع',
      settings: settings.filter(s => 
        s.key.includes('services_') || 
        s.key.includes('industries_') || 
        s.key.includes('testimonials_') || 
        s.key.includes('features_')
      )
    },
    images: {
      title: 'الصور والوسائط',
      icon: <Image className="w-5 h-5" />,
      description: 'صور Hero والعناصر المرئية',
      settings: settings.filter(s => 
        s.key.includes('image') || 
        s.key.includes('alt')
      )
    },
    styling: {
      title: 'الألوان والخطوط',
      icon: <Palette className="w-5 h-5" />,
      description: 'ألوان الموقع وأحجام الخطوط',
      settings: settings.filter(s => s.category === 'styling')
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل المحتوى...</p>
        </div>
      </div>
    );
  }

  const renderSettingsSection = (sectionKey: string, section: any) => (
    <div className="space-y-4">
      {section.settings.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="text-center py-8">
            <div className="text-gray-400 mb-2">{section.icon}</div>
            <p className="text-gray-500 text-sm">لا توجد إعدادات في هذا القسم بعد</p>
          </CardContent>
        </Card>
      ) : (
        section.settings.map((setting: Setting) => (
          <Card key={setting.id} className="border-l-4 border-l-inception-purple/20 hover:border-l-inception-purple transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {setting.description ?? setting.key}
                  </h3>
                  <Badge variant="outline" className="text-xs text-gray-500">
                    {setting.key}
                  </Badge>
                </div>
                <Button
                  onClick={() => handleSave(setting)}
                  disabled={updateSettingMutation.isPending}
                  size="sm"
                  className="bg-inception-purple hover:bg-inception-purple/90 text-white shrink-0"
                >
                  <Save className="w-4 h-4 ml-2" />
                  {updateSettingMutation.isPending ? 'جاري الحفظ...' : 'حفظ'}
                </Button>
              </div>
              
              {/* خانة التعديل */}
              {setting.value.length > 100 ? (
                <Textarea
                  value={editingSettings[setting.id] ?? setting.value}
                  onChange={(e) => handleValueChange(setting.id, e.target.value)}
                  className="min-h-[120px] focus:border-inception-purple"
                  placeholder={setting.description ?? setting.key}
                />
              ) : setting.key.includes('color') ? (
                <div className="flex gap-3">
                  <Input
                    type="color"
                    value={editingSettings[setting.id] ?? setting.value}
                    onChange={(e) => handleValueChange(setting.id, e.target.value)}
                    className="w-16 h-10 p-1 rounded border"
                  />
                  <Input
                    value={editingSettings[setting.id] ?? setting.value}
                    onChange={(e) => handleValueChange(setting.id, e.target.value)}
                    placeholder={setting.description ?? setting.key}
                    className="flex-1 focus:border-inception-purple"
                  />
                </div>
              ) : (
                <Input
                  value={editingSettings[setting.id] ?? setting.value}
                  onChange={(e) => handleValueChange(setting.id, e.target.value)}
                  placeholder={setting.description ?? setting.key}
                  className="focus:border-inception-purple"
                />
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="bg-gradient-to-r from-inception-purple to-inception-purple/80 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">إدارة محتوى الهوم بيج</h1>
            <p className="text-inception-purple-100 opacity-90">تحكم كامل في جميع عناصر الصفحة الرئيسية</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              <Settings2 className="w-4 h-4 ml-2" />
              {settings.length} إعداد
            </Badge>
          </div>
        </div>
      </div>

      {/* التبويبات */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          {Object.entries(settingsSections).map(([key, section]) => (
            <TabsTrigger 
              key={key} 
              value={key}
              className="flex items-center gap-2 data-[state=active]:bg-inception-purple data-[state=active]:text-white"
            >
              {section.icon}
              <span className="hidden sm:inline">{section.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(settingsSections).map(([key, section]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            {/* وصف القسم */}
            <Card className="bg-gray-50/50 border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="text-inception-purple">{section.icon}</div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{section.title}</h2>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* إعدادات القسم */}
            {renderSettingsSection(key, section)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ContentManager;