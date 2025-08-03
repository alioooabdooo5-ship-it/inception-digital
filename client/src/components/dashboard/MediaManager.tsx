import React, { useState, useRef } from "react";
import { 
  Upload, 
  Image, 
  Video, 
  FileText, 
  Trash2, 
  Copy, 
  Search,
  Filter,
  Grid,
  List,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface MediaFile {
  id: number;
  name: string;
  type: string;
  size: string;
  url: string;
  dimensions?: string;
  downloads: number;
  description?: string;
  tags?: string[];
  createdAt: string;
}

interface MediaManagerProps {
  onSelectFile?: (file: MediaFile) => void;
  allowSelection?: boolean;
  fileType?: 'image' | 'video' | 'document' | 'all';
}

const MediaManager: React.FC<MediaManagerProps> = ({ 
  onSelectFile, 
  allowSelection = false,
  fileType = 'all'
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // جلب ملفات الوسائط
  const { data: mediaFiles = [], isLoading } = useQuery<MediaFile[]>({
    queryKey: ["/api/media-files"]
  });

  // رفع ملف جديد
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/media-files/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('فشل في رفع الملف');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media-files"] });
      setUploadProgress(null);
      toast({
        title: "تم بنجاح",
        description: "تم رفع الملف بنجاح"
      });
    },
    onError: () => {
      setUploadProgress(null);
      toast({
        title: "خطأ",
        description: "فشل في رفع الملف",
        variant: "destructive"
      });
    }
  });

  // حذف ملف
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest('DELETE', `/api/media-files/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media-files"] });
      toast({
        title: "تم بنجاح",
        description: "تم حذف الملف بنجاح"
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "فشل في حذف الملف",
        variant: "destructive"
      });
    }
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // التحقق من نوع الملف إذا كان محدداً
      if (fileType !== 'all') {
        const isValidType = 
          (fileType === 'image' && file.type.startsWith('image/')) ||
          (fileType === 'video' && file.type.startsWith('video/')) ||
          (fileType === 'document' && !file.type.startsWith('image/') && !file.type.startsWith('video/'));
        
        if (!isValidType) {
          toast({
            title: "نوع ملف غير مدعوم",
            description: `يجب أن يكون الملف من نوع ${fileType}`,
            variant: "destructive"
          });
          return;
        }
      }

      setUploadProgress(0);
      uploadMutation.mutate(file);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "تم النسخ",
      description: "تم نسخ رابط الملف"
    });
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-8 h-8" />;
    if (type.startsWith('video/')) return <Video className="w-8 h-8" />;
    return <FileText className="w-8 h-8" />;
  };

  const getFileTypeColor = (type: string) => {
    if (type.startsWith('image/')) return 'bg-blue-100 text-blue-800';
    if (type.startsWith('video/')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  // فلترة الملفات
  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || file.type.startsWith(selectedType + '/');
    const matchesFileType = fileType === 'all' || 
                           (fileType === 'image' && file.type.startsWith('image/')) ||
                           (fileType === 'video' && file.type.startsWith('video/')) ||
                           (fileType === 'document' && !file.type.startsWith('image/') && !file.type.startsWith('video/'));
    
    return matchesSearch && matchesType && matchesFileType;
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple mx-auto mb-4"></div>
            <p className="text-gray-500">جاري تحميل ملفات الوسائط...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Image className="w-5 h-5 ml-2" />
            إدارة ملفات الوسائط
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
            </Button>
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-4 h-4 ml-2" />
              رفع ملف
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* شريط البحث والفلترة */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث في الملفات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-inception-purple"
          >
            <option value="all">جميع الأنواع</option>
            <option value="image">صور</option>
            <option value="video">فيديوهات</option>
            <option value="application">مستندات</option>
          </select>
        </div>

        {/* تقدم الرفع */}
        {uploadProgress !== null && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">جاري رفع الملف...</span>
              <span className="text-sm text-gray-500">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-inception-purple h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* عرض الملفات */}
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">لا توجد ملفات وسائط</p>
            <p className="text-gray-400">ابدأ برفع ملفاتك الأولى</p>
          </div>
        ) : (
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {filteredFiles.map((file) => (
              <div 
                key={file.id} 
                className={`border rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${allowSelection ? 'cursor-pointer hover:border-inception-purple' : ''}`}
                onClick={() => allowSelection && onSelectFile?.(file)}
              >
                {/* معاينة الملف */}
                <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  {file.type.startsWith('image/') ? (
                    <img 
                      src={file.url} 
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400">
                      {getFileIcon(file.type)}
                    </div>
                  )}
                  
                  {/* نوع الملف */}
                  <Badge className={`absolute top-2 right-2 ${getFileTypeColor(file.type)}`}>
                    {file.type.split('/')[0]}
                  </Badge>
                </div>
                
                {/* معلومات الملف */}
                <div className="p-4">
                  <h4 className="font-medium text-sm truncate mb-2">{file.name}</h4>
                  <p className="text-xs text-gray-500 mb-3">{file.size}</p>
                  
                  {/* أزرار التحكم */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(file.url);
                        }}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(file.url, '_blank');
                        }}
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('هل أنت متأكد من حذف هذا الملف؟')) {
                          deleteMutation.mutate(file.id);
                        }
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* حقل رفع الملفات المخفي */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileUpload}
          accept={
            fileType === 'image' ? 'image/*' :
            fileType === 'video' ? 'video/*' :
            fileType === 'document' ? '.pdf,.doc,.docx,.txt' :
            '*/*'
          }
        />
      </CardContent>
    </Card>
  );
};

export default MediaManager;