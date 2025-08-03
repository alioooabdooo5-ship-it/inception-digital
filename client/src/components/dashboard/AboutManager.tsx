import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Info, Target, Eye, Save } from "lucide-react";
import type { Setting } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

const AboutManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingSettings, setEditingSettings] = useState<{[key: string]: string}>({});

  // Fetch all settings
  const { data: settings = [], isLoading } = useQuery<Setting[]>({
    queryKey: ['/api/settings']
  });

  // Update setting mutation
  const updateSettingMutation = useMutation({
    mutationFn: async ({ id, value }: { id: number; value: string }) => {
      const response = await fetch(`/api/settings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/settings'] });
      queryClient.invalidateQueries({ queryKey: ['/api/public-settings'] });
      toast({
        title: "تم الحفظ",
        description: "تم حفظ محتوى صفحة من نحن بنجاح",
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

  // فلترة إعدادات About
  const aboutSettings = settings.filter(s => s.category === 'about');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل إعدادات صفحة من نحن...</p>
        </div>
      </div>
    );
  }

  const getIcon = (key: string) => {
    if (key.includes('vision')) return <Eye className="w-5 h-5" />;
    if (key.includes('mission')) return <Target className="w-5 h-5" />;
    return <Info className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Info className="w-8 h-8" />
              إدارة صفحة من نحن
            </h1>
            <p className="text-blue-100 opacity-90">
              تحكم في محتوى صفحة من نحن، الرؤية، المهمة، وقصة الشركة
            </p>
          </div>
          
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {aboutSettings.length} عنصر
          </Badge>
        </div>
      </div>

      {/* إعدادات About */}
      <div className="space-y-4">
        {aboutSettings.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="text-center py-12">
              <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد إعدادات لصفحة من نحن</h3>
              <p className="text-gray-600">قم بإضافة إعدادات صفحة من نحن من قاعدة البيانات</p>
            </CardContent>
          </Card>
        ) : (
          aboutSettings.map((setting) => (
            <Card key={setting.id} className="border-l-4 border-l-blue-500/20 hover:border-l-blue-500 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-blue-600">{getIcon(setting.key)}</div>
                      <h3 className="font-medium text-gray-900">
                        {setting.description ?? setting.key}
                      </h3>
                    </div>
                    <Badge variant="outline" className="text-xs text-gray-500">
                      {setting.key}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => handleSave(setting)}
                    disabled={updateSettingMutation.isPending}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white shrink-0"
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
                    className="min-h-[120px] focus:border-blue-500"
                    placeholder={setting.description ?? setting.key}
                  />
                ) : (
                  <Input
                    value={editingSettings[setting.id] ?? setting.value}
                    onChange={(e) => handleValueChange(setting.id, e.target.value)}
                    placeholder={setting.description ?? setting.key}
                    className="focus:border-blue-500"
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
          <h3 className="font-semibold text-blue-900 mb-2">💡 نصائح لصفحة من نحن:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• اجعل قصة الشركة ملهمة وشخصية</li>
            <li>• الرؤية تعبر عن الطموح المستقبلي</li>
            <li>• المهمة توضح الهدف الحالي للشركة</li>
            <li>• استخدم لغة تبني الثقة مع العميل</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutManager;