import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Home, Save, Edit3 } from "lucide-react";
import type { Setting } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

const HeroManager = () => {
  const { toast } = useToast();
  const [editingSettings, setEditingSettings] = useState<{[key: string]: string}>({});

  // Fetch all settings
  const { data: settings = [], isLoading } = useQuery<Setting[]>({
    queryKey: ['/api/settings']
  });

  // Update setting mutation
  const updateSettingMutation = useMutation({
    mutationFn: async ({ id, value }: { id: number; value: string }) => {
      const response = await apiRequest("PATCH", `/api/settings/${id}`, { value });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/settings'] });
      queryClient.invalidateQueries({ queryKey: ['/api/public-settings'] });
      toast({
        title: "تم الحفظ",
        description: "تم حفظ محتوى Hero بنجاح",
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

  // فلترة إعدادات Hero
  const heroSettings = settings.filter(s => 
    s.key.includes('hero_title') || 
    s.key.includes('hero_description') || 
    s.key.includes('hero_feature')
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل إعدادات Hero...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="bg-gradient-to-r from-inception-purple to-inception-purple/80 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Home className="w-8 h-8" />
              إدارة قسم Hero الرئيسي
            </h1>
            <p className="text-inception-purple-100 opacity-90">
              العنوان الرئيسي، الوصف، والميزات الثلاث في أعلى الصفحة
            </p>
          </div>
          
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {heroSettings.length} عنصر
          </Badge>
        </div>
      </div>

      {/* إعدادات Hero */}
      <div className="space-y-4">
        {heroSettings.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="text-center py-12">
              <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد إعدادات Hero</h3>
              <p className="text-gray-600">قم بإضافة إعدادات Hero من قاعدة البيانات</p>
            </CardContent>
          </Card>
        ) : (
          heroSettings.map((setting) => (
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

      {/* نصائح */}
      <Card className="bg-blue-50/50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 نصائح لقسم Hero:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• العنوان الرئيسي يجب أن يكون جذاب ومختصر</li>
            <li>• الوصف يوضح قيمة الشركة للعميل</li>
            <li>• الميزات الثلاث تركز على نقاط القوة الأساسية</li>
            <li>• استخدم HTML tags مثل &lt;span&gt; للتلوين</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroManager;