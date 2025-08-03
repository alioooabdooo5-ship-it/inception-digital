import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Settings, Save, Edit3, Type, FileText } from "lucide-react";
import type { Setting } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

const ContentManager = () => {
  const { toast } = useToast();
  const [editingSettings, setEditingSettings] = useState<{[key: string]: string}>({});

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

  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, Setting[]>);

  const categoryNames: Record<string, string> = {
    homepage: 'الصفحة الرئيسية',
    contact: 'معلومات الاتصال',
    seo: 'السيو',
    social: 'الشبكات الاجتماعية',
    buttons: 'الأزرار والروابط',
    images: 'الصور والوسائط'
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة المحتوى</h1>
          <p className="text-gray-600 mt-2">تحكم في جميع النصوص والمحتوى الظاهر في الموقع</p>
        </div>
        
        <Badge variant="secondary" className="bg-inception-purple/10 text-inception-purple">
          <FileText className="w-4 h-4 ml-2" />
          {settings.length} عنصر
        </Badge>
      </div>

      {Object.entries(groupedSettings).map(([category, categorySettings]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5 text-inception-purple" />
              {categoryNames[category] || category}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {categorySettings.map((setting) => (
              <div key={setting.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{setting.description ?? setting.key}</h3>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {setting.key}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => handleSave(setting)}
                    disabled={updateSettingMutation.isPending}
                    size="sm"
                    className="bg-inception-purple hover:bg-inception-purple/90"
                  >
                    <Save className="w-4 h-4 ml-2" />
                    حفظ
                  </Button>
                </div>
                
                {setting.value.length > 100 ? (
                  <Textarea
                    value={editingSettings[setting.id] ?? setting.value}
                    onChange={(e) => handleValueChange(setting.id, e.target.value)}
                    className="min-h-[120px]"
                    placeholder={setting.description ?? setting.key}
                  />
                ) : (
                  <Input
                    value={editingSettings[setting.id] ?? setting.value}
                    onChange={(e) => handleValueChange(setting.id, e.target.value)}
                    placeholder={setting.description ?? setting.key}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContentManager;