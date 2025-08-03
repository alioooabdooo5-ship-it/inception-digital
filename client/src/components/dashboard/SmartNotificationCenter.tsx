import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  Settings, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Calendar,
  Clock,
  Target,
  Users,
  BarChart3,
  Lightbulb,
  Zap,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info' | 'tip';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  action?: {
    label: string;
    callback: () => void;
  };
  timestamp: Date;
  read: boolean;
  category: 'seo' | 'content' | 'performance' | 'system' | 'marketing';
  data?: any;
}

interface NotificationSettings {
  seoAlerts: boolean;
  contentReminders: boolean;
  performanceReports: boolean;
  systemUpdates: boolean;
  marketingTips: boolean;
  autoOptimization: boolean;
}

const SmartNotificationCenter: React.FC = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    seoAlerts: true,
    contentReminders: true,
    performanceReports: true,
    systemUpdates: true,
    marketingTips: true,
    autoOptimization: false
  });
  const [showSettings, setShowSettings] = useState(false);

  // محاكاة الإشعارات الذكية
  useEffect(() => {
    const generateSmartNotifications = () => {
      const smartNotifications: Notification[] = [
        {
          id: '1',
          type: 'warning',
          priority: 'high',
          title: 'تحسين SEO مطلوب',
          message: 'تم اكتشاف 3 صفحات بدون meta description. قم بإضافة أوصاف لتحسين ترتيب البحث.',
          action: {
            label: 'إصلاح الآن',
            callback: () => console.log('Navigate to SEO fixes')
          },
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          read: false,
          category: 'seo'
        },
        {
          id: '2',
          type: 'success',
          priority: 'medium',
          title: 'تحسن في الأداء',
          message: 'زادت سرعة تحميل الصفحة الرئيسية بنسبة 25% هذا الأسبوع!',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          read: false,
          category: 'performance',
          data: { improvement: '25%', metric: 'page_speed' }
        },
        {
          id: '3',
          type: 'tip',
          priority: 'low',
          title: 'نصيحة تسويقية',
          message: 'إضافة شهادات العملاء يمكن أن تزيد معدل التحويل بنسبة تصل إلى 34%.',
          action: {
            label: 'إضافة شهادة',
            callback: () => console.log('Navigate to testimonials')
          },
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          read: true,
          category: 'marketing'
        },
        {
          id: '4',
          type: 'info',
          priority: 'medium',
          title: 'تذكير المحتوى',
          message: 'لم يتم تحديث محتوى صفحة "من نحن" منذ 30 يوماً. فكر في إضافة محتوى جديد.',
          action: {
            label: 'تحديث المحتوى',
            callback: () => console.log('Navigate to about page')
          },
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          read: false,
          category: 'content'
        },
        {
          id: '5',
          type: 'error',
          priority: 'high',
          title: 'مشكلة في النظام',
          message: 'تم اكتشاف روابط معطلة في 2 صفحات. قم بإصلاحها لتجنب تأثير سلبي على SEO.',
          action: {
            label: 'إصلاح الروابط',
            callback: () => console.log('Fix broken links')
          },
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
          read: false,
          category: 'system'
        }
      ];

      setNotifications(smartNotifications);
    };

    generateSmartNotifications();

    // محاكاة إشعارات جديدة كل دقيقة
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% احتمال إشعار جديد
        generateNewNotification();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const generateNewNotification = () => {
    const tips = [
      {
        title: 'نصيحة SEO',
        message: 'استخدم العناوين H1, H2, H3 بطريقة هرمية لتحسين بنية المحتوى.',
        category: 'seo' as const,
        type: 'tip' as const
      },
      {
        title: 'تحديث الأداء',
        message: 'تم تحسين ضغط الصور تلقائياً. وفرت 15% من سعة التخزين.',
        category: 'performance' as const,
        type: 'success' as const
      },
      {
        title: 'اقتراح محتوى',
        message: 'الصفحات ذات المحتوى الأطول (500+ كلمة) تحصل على ترتيب أفضل في البحث.',
        category: 'content' as const,
        type: 'tip' as const
      }
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    
    const newNotification: Notification = {
      id: Date.now().toString(),
      ...randomTip,
      priority: 'low',
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    // إظهار toast للإشعار الجديد
    toast({
      title: newNotification.title,
      description: newNotification.message.slice(0, 100) + '...',
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'tip': return <Lightbulb className="w-4 h-4 text-blue-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'seo': return <Target className="w-3 h-3" />;
      case 'content': return <Users className="w-3 h-3" />;
      case 'performance': return <TrendingUp className="w-3 h-3" />;
      case 'system': return <Settings className="w-3 h-3" />;
      case 'marketing': return <BarChart3 className="w-3 h-3" />;
      default: return <Info className="w-3 h-3" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      default: return 'border-l-blue-500';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            مركز الإشعارات الذكية
            {unreadCount > 0 && (
              <Badge variant="destructive" className="rounded-full">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCircle className="w-4 h-4 mr-2" />
                قراءة الكل
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-4 h-4 mr-2" />
              الإعدادات
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* إعدادات الإشعارات */}
        {showSettings && (
          <Card className="border-dashed">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">إعدادات الإشعارات</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {Object.entries(settings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key} className="text-sm">
                    {key === 'seoAlerts' && 'تنبيهات SEO'}
                    {key === 'contentReminders' && 'تذكيرات المحتوى'}
                    {key === 'performanceReports' && 'تقارير الأداء'}
                    {key === 'systemUpdates' && 'تحديثات النظام'}
                    {key === 'marketingTips' && 'نصائح التسويق'}
                    {key === 'autoOptimization' && 'التحسين التلقائي'}
                  </Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, [key]: checked }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-lg font-semibold text-red-600">
              {notifications.filter(n => n.priority === 'high').length}
            </div>
            <div className="text-xs text-gray-600">عالية الأولوية</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-lg font-semibold text-yellow-600">
              {notifications.filter(n => n.priority === 'medium').length}
            </div>
            <div className="text-xs text-gray-600">متوسطة الأولوية</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-semibold text-blue-600">
              {notifications.filter(n => n.type === 'tip').length}
            </div>
            <div className="text-xs text-gray-600">نصائح</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-600">
              {notifications.length}
            </div>
            <div className="text-xs text-gray-600">إجمالي</div>
          </div>
        </div>

        {/* قائمة الإشعارات */}
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Alert
                key={notification.id}
                className={`border-l-4 ${getPriorityColor(notification.priority)} ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        
                        <Badge variant="outline" className="text-xs">
                          {getCategoryIcon(notification.category)}
                          <span className="mr-1">
                            {notification.category === 'seo' && 'SEO'}
                            {notification.category === 'content' && 'محتوى'}
                            {notification.category === 'performance' && 'أداء'}
                            {notification.category === 'system' && 'نظام'}
                            {notification.category === 'marketing' && 'تسويق'}
                          </span>
                        </Badge>
                        
                        <Badge
                          variant={notification.priority === 'high' ? 'destructive' : 
                                   notification.priority === 'medium' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {notification.priority === 'high' ? 'عاجل' :
                           notification.priority === 'medium' ? 'مهم' : 'عادي'}
                        </Badge>
                      </div>
                      
                      <AlertDescription className="text-sm mb-2">
                        {notification.message}
                      </AlertDescription>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {format(notification.timestamp, 'HH:mm - dd/MM', { locale: ar })}
                        </span>
                        
                        {notification.action && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              notification.action!.callback();
                              markAsRead(notification.id);
                            }}
                          >
                            <Zap className="w-3 h-3 mr-1" />
                            {notification.action.label}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="p-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </ScrollArea>

        {/* أدوات سريعة */}
        <div className="pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={generateNewNotification}>
              <Bell className="w-4 h-4 mr-2" />
              محاكاة إشعار
            </Button>
            <Button variant="outline" size="sm">
              <Target className="w-4 h-4 mr-2" />
              فحص SEO
            </Button>
            <Button variant="outline" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              تقرير الأداء
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartNotificationCenter;