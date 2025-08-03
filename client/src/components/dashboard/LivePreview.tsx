import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone, Tablet, Eye, EyeOff, RefreshCw } from "lucide-react";
import DynamicPageContent from "@/components/common/DynamicPageContent";
import type { PageContent } from "@shared/schema";

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

interface LivePreviewProps {
  pageContent: PageContent;
  isVisible: boolean;
  onToggle: () => void;
}

const LivePreview: React.FC<LivePreviewProps> = ({ 
  pageContent, 
  isVisible, 
  onToggle 
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const previewRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getPreviewWidth = () => {
    switch (viewMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  const getPreviewHeight = () => {
    switch (viewMode) {
      case 'mobile': return '667px';
      case 'tablet': return '1024px';
      default: return '600px';
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onToggle}
          size="lg"
          className="bg-inception-purple hover:bg-inception-purple/90 shadow-lg"
        >
          <Eye className="w-5 h-5 ml-2" />
          معاينة مباشرة
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onToggle} />
      
      {/* Preview Modal */}
      <div className="fixed inset-4 bg-white rounded-xl shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b bg-gray-50 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-900">معاينة مباشرة</h3>
              <Badge variant="outline" className="text-green-600 border-green-600">
                تحديث فوري
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Device Toggle */}
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="ml-4">
                <TabsList>
                  <TabsTrigger value="desktop" className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    سطح المكتب
                  </TabsTrigger>
                  <TabsTrigger value="tablet" className="flex items-center gap-2">
                    <Tablet className="w-4 h-4" />
                    تابلت
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    موبايل
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 ml-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                تحديث
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={onToggle}
              >
                <EyeOff className="w-4 h-4 ml-2" />
                إغلاق
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-hidden bg-gray-100 p-4">
          <div className="h-full flex justify-center items-start">
            <div 
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300"
              style={{ 
                width: getPreviewWidth(),
                height: getPreviewHeight(),
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            >
              <div className="h-full overflow-auto">
                {/* Page Header Simulation */}
                <div className="bg-inception-purple text-white p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="text-sm font-medium">إنسيبشن</div>
                    <Badge variant="secondary" className="text-xs">
                      معاينة
                    </Badge>
                  </div>
                </div>
                
                {/* Dynamic Content Preview */}
                <div className="min-h-[500px]">
                  <DynamicPageContent 
                    sections={(pageContent.sections as PageSection[]) || []} 
                    className="preview-content"
                  />
                </div>
                
                {/* Footer Simulation */}
                <div className="bg-gray-900 text-white p-4 text-center text-sm">
                  © 2025 إنسيبشن - جميع الحقوق محفوظة
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Info */}
        <div className="p-4 border-t bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">العنوان:</span>
              <p className="text-gray-600 truncate">{pageContent.metaTitle || pageContent.title}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">الوصف:</span>
              <p className="text-gray-600 truncate">{pageContent.metaDescription || 'لا يوجد وصف'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">الأقسام:</span>
              <p className="text-gray-600">{(pageContent.sections as PageSection[] || []).length} قسم</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LivePreview;