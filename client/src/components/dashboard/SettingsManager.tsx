import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Settings, Globe, Mail, Phone, MapPin, Save, Shield, Database } from "lucide-react";

const SettingsManager = () => {
  const { toast } = useToast();
  
  // Site Settings
  const [siteName, setSiteName] = useState("Inception - إنسيبشن");
  const [siteDescription, setSiteDescription] = useState("شركة رائدة في مجال التسويق الرقمي وتطوير المواقع");
  const [contactEmail, setContactEmail] = useState("info@inception.sa");
  const [contactPhone, setContactPhone] = useState("+966 50 123 4567");
  const [address, setAddress] = useState("الرياض، المملكة العربية السعودية");
  
  // Features Toggle
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [commentsEnabled, setCommentsEnabled] = useState(true);

  const handleSaveSettings = () => {
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم حفظ جميع التغييرات بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إعدادات الموقع</h1>
          <p className="text-gray-600 mt-2">إدارة الإعدادات العامة والتفضيلات</p>
        </div>
        
        <Button onClick={handleSaveSettings} className="bg-inception-purple hover:bg-purple-700">
          <Save className="w-4 h-4 ml-2" />
          حفظ الإعدادات
        </Button>
      </div>

      {/* Site Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            معلومات الموقع
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم الموقع
              </label>
              <Input
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="اسم الموقع"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <Input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="info@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              وصف الموقع
            </label>
            <Textarea
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              placeholder="وصف مختصر للموقع"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رقم الهاتف
              </label>
              <Input
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+966 50 123 4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                العنوان
              </label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="المدينة، البلد"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            إعدادات الميزات
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">التنبيهات عبر البريد الإلكتروني</h3>
              <p className="text-sm text-gray-600">استقبال تنبيهات الرسائل الجديدة</p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">وضع الصيانة</h3>
              <p className="text-sm text-gray-600">إخفاء الموقع عن الزوار مؤقتاً</p>
            </div>
            <div className="flex items-center gap-2">
              {maintenanceMode && (
                <Badge variant="destructive">نشط</Badge>
              )}
              <Switch
                checked={maintenanceMode}
                onCheckedChange={setMaintenanceMode}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">تتبع الإحصائيات</h3>
              <p className="text-sm text-gray-600">تفعيل تتبع زيارات الموقع</p>
            </div>
            <Switch
              checked={analyticsEnabled}
              onCheckedChange={setAnalyticsEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">التعليقات</h3>
              <p className="text-sm text-gray-600">السماح بالتعليق على المقالات</p>
            </div>
            <Switch
              checked={commentsEnabled}
              onCheckedChange={setCommentsEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            إعدادات الأمان
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كلمة مرور جديدة
              </label>
              <Input
                type="password"
                placeholder="كلمة مرور قوية"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تأكيد كلمة المرور
              </label>
              <Input
                type="password"
                placeholder="تأكيد كلمة المرور"
              />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-yellow-600" />
              <h4 className="font-medium text-yellow-800">نصائح الأمان</h4>
            </div>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• استخدم كلمة مرور قوية تحتوي على أحرف وأرقام ورموز</li>
              <li>• لا تشارك بيانات الدخول مع أي شخص آخر</li>
              <li>• قم بتحديث كلمة المرور بانتظام</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Backup Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            النسخ الاحتياطي
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">آخر نسخة احتياطية</h4>
              <p className="text-sm text-green-700">3 أغسطس 2025 - 6:30 صباحاً</p>
              <p className="text-xs text-green-600 mt-1">تمت بنجاح</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">النسخة التالية</h4>
              <p className="text-sm text-blue-700">4 أغسطس 2025 - 6:30 صباحاً</p>
              <p className="text-xs text-blue-600 mt-1">مجدولة تلقائياً</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline">
              إنشاء نسخة احتياطية الآن
            </Button>
            <Button variant="outline">
              استعادة من نسخة احتياطية
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>حالة النظام</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <h4 className="font-medium text-green-800">قاعدة البيانات</h4>
              <p className="text-sm text-green-600">متصلة</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <h4 className="font-medium text-green-800">السيرفر</h4>
              <p className="text-sm text-green-600">يعمل بشكل طبيعي</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <h4 className="font-medium text-green-800">التخزين</h4>
              <p className="text-sm text-green-600">45% مستخدم</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsManager;