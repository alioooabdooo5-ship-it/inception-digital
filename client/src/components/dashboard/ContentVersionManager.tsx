import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  History, 
  GitBranch, 
  Download, 
  Upload, 
  Eye, 
  RotateCcw, 
  Save, 
  Calendar,
  User,
  FileText,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface ContentVersion {
  id: string;
  version: string;
  title: string;
  description: string;
  content: any;
  author: string;
  createdAt: Date;
  changes: string[];
  size: number;
}

interface ContentVersionManagerProps {
  pageType: string;
  currentContent: any;
  onRestore: (content: any) => void;
}

const ContentVersionManager: React.FC<ContentVersionManagerProps> = ({
  pageType,
  currentContent,
  onRestore
}) => {
  const { toast } = useToast();
  const [versions, setVersions] = useState<ContentVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<ContentVersion | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // محاكاة بيانات الإصدارات
  useEffect(() => {
    const mockVersions: ContentVersion[] = [
      {
        id: "v1.0.0",
        version: "1.0.0",
        title: "الإصدار الأولي",
        description: "النسخة الأولى من محتوى الصفحة",
        content: { title: "الصفحة الرئيسية", sections: [] },
        author: "المطور",
        createdAt: new Date('2025-01-01'),
        changes: ["إنشاء الصفحة", "إضافة القسم الرئيسي"],
        size: 1024
      },
      {
        id: "v1.1.0",
        version: "1.1.0",
        title: "تحديث المحتوى",
        description: "إضافة أقسام جديدة وتحسين SEO",
        content: { title: "الصفحة الرئيسية المطورة", sections: [] },
        author: "المحرر",
        createdAt: new Date('2025-01-15'),
        changes: ["تحديث العنوان", "إضافة قسم المميزات", "تحسين meta description"],
        size: 2048
      },
      {
        id: "v1.2.0", 
        version: "1.2.0",
        title: "تحديثات التصميم",
        description: "تحسينات على التصميم والألوان",
        content: currentContent,
        author: "المصمم",
        createdAt: new Date(),
        changes: ["تحديث الألوان", "تحسين تجربة المستخدم", "إضافة صور جديدة"],
        size: 3072
      }
    ];
    setVersions(mockVersions);
  }, [currentContent]);

  const createBackup = async () => {
    setIsLoading(true);
    
    try {
      const newVersion: ContentVersion = {
        id: `v1.${versions.length}.0`,
        version: `1.${versions.length}.0`,
        title: `نسخة احتياطية - ${format(new Date(), 'yyyy/MM/dd', { locale: ar })}`,
        description: "نسخة احتياطية تلقائية",
        content: currentContent,
        author: "النظام",
        createdAt: new Date(),
        changes: ["حفظ تلقائي", "نسخة احتياطية"],
        size: JSON.stringify(currentContent).length
      };

      setVersions(prev => [newVersion, ...prev]);
      
      toast({
        title: "تم إنشاء النسخة الاحتياطية",
        description: `تم حفظ الإصدار ${newVersion.version} بنجاح`
      });
    } catch (error) {
      toast({
        title: "خطأ في إنشاء النسخة الاحتياطية",
        description: "حدث خطأ أثناء حفظ النسخة",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const restoreVersion = (version: ContentVersion) => {
    onRestore(version.content);
    toast({
      title: "تم استعادة الإصدار",
      description: `تم استعادة الإصدار ${version.version} بنجاح`
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getVersionBadgeColor = (version: ContentVersion) => {
    if (version.id === versions[0]?.id) return "bg-green-100 text-green-800";
    if (version.author === "النظام") return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            إدارة الإصدارات والنسخ الاحتياطية
          </CardTitle>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={createBackup}
              disabled={isLoading}
            >
              <Save className="w-4 h-4 mr-2" />
              نسخة احتياطية
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  استيراد إصدار
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>استيراد إصدار</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Alert>
                    <FileText className="w-4 h-4" />
                    <AlertDescription>
                      يمكنك تحميل ملف JSON يحتوي على إصدار سابق من المحتوى
                    </AlertDescription>
                  </Alert>
                  <input 
                    type="file" 
                    accept=".json"
                    className="w-full p-2 border rounded"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          try {
                            const content = JSON.parse(event.target?.result as string);
                            onRestore(content);
                            toast({
                              title: "تم استيراد الإصدار",
                              description: "تم تحميل المحتوى بنجاح"
                            });
                          } catch (error) {
                            toast({
                              title: "خطأ في الاستيراد",
                              description: "ملف غير صالح",
                              variant: "destructive"
                            });
                          }
                        };
                        reader.readAsText(file);
                      }
                    }}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold">{versions.length}</div>
              <div className="text-xs text-gray-600">إجمالي الإصدارات</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-semibold">
                {versions.filter(v => v.author === "النظام").length}
              </div>
              <div className="text-xs text-gray-600">نسخ تلقائية</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-semibold">
                {formatFileSize(versions.reduce((acc, v) => acc + v.size, 0))}
              </div>
              <div className="text-xs text-gray-600">إجمالي الحجم</div>
            </div>
          </div>

          {/* قائمة الإصدارات */}
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {versions.map((version, index) => (
                <Card key={version.id} className="relative">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getVersionBadgeColor(version)}>
                            <GitBranch className="w-3 h-3 mr-1" />
                            {version.version}
                          </Badge>
                          
                          {index === 0 && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              الحالي
                            </Badge>
                          )}
                          
                          <span className="text-sm font-medium">{version.title}</span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">
                          {version.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {version.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(version.createdAt, 'yyyy/MM/dd HH:mm', { locale: ar })}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {formatFileSize(version.size)}
                          </span>
                        </div>

                        {/* قائمة التغييرات */}
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-gray-700">التغييرات:</div>
                          {version.changes.map((change, idx) => (
                            <div key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                              <div className="w-1 h-1 bg-gray-400 rounded-full" />
                              {change}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedVersion(version);
                            setShowPreview(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const dataStr = JSON.stringify(version.content, null, 2);
                            const dataBlob = new Blob([dataStr], { type: 'application/json' });
                            const url = URL.createObjectURL(dataBlob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = `${pageType}-${version.version}.json`;
                            link.click();
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        
                        {index !== 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => restoreVersion(version)}
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* معاينة الإصدار */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                معاينة الإصدار {selectedVersion?.version}
              </DialogTitle>
            </DialogHeader>
            
            {selectedVersion && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">العنوان:</span>
                    <p className="text-gray-600">{selectedVersion.title}</p>
                  </div>
                  <div>
                    <span className="font-medium">المؤلف:</span>
                    <p className="text-gray-600">{selectedVersion.author}</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-auto">
                  <pre className="text-sm">
                    {JSON.stringify(selectedVersion.content, null, 2)}
                  </pre>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowPreview(false)}
                  >
                    إغلاق
                  </Button>
                  <Button
                    onClick={() => {
                      restoreVersion(selectedVersion);
                      setShowPreview(false);
                    }}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    استعادة هذا الإصدار
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

export default ContentVersionManager;