import React, { useState, useRef, useCallback } from "react";
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
  Download,
  FolderPlus,
  Folder,
  Edit3,
  Tag,
  Eye,
  Settings,
  ChevronDown,
  X,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

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
  thumbnail?: string;
  createdAt: string;
}

interface MediaManagerProps {
  onSelectFile?: (file: MediaFile) => void;
  allowSelection?: boolean;
  fileType?: 'image' | 'video' | 'document' | 'all';
  allowMultiSelect?: boolean;
}

const EnhancedMediaManager: React.FC<MediaManagerProps> = ({ 
  onSelectFile, 
  allowSelection = false,
  fileType = 'all',
  allowMultiSelect = false
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());
  const [dragOver, setDragOver] = useState(false);
  const [editingFile, setEditingFile] = useState<MediaFile | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // جلب ملفات الوسائط
  const { data: mediaFiles = [], isLoading, refetch } = useQuery<MediaFile[]>({
    queryKey: ["/api/media-files"]
  });

  // رفع ملف جديد
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      setUploadingFiles(prev => [...prev, file.name]);
      
      const response = await fetch('/api/media-files/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('فشل في رفع الملف');
      }
      
      return response.json();
    },
    onSuccess: (data, file) => {
      queryClient.invalidateQueries({ queryKey: ["/api/media-files"] });
      setUploadProgress(null);
      setUploadingFiles(prev => prev.filter(name => name !== file.name));
      toast({
        title: "تم بنجاح",
        description: `تم رفع ${file.name} بنجاح`
      });
    },
    onError: (error, file) => {
      setUploadProgress(null);
      setUploadingFiles(prev => prev.filter(name => name !== file.name));
      toast({
        title: "خطأ في الرفع",
        description: `فشل في رفع ${file.name}`,
        variant: "destructive"
      });
    }
  });

  // تحديث ملف
  const updateMutation = useMutation({
    mutationFn: async (data: {id: number; description?: string; tags?: string[]}) => {
      const { id, ...updateData } = data;
      return await apiRequest('PUT', `/api/media-files/${id}`, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media-files"] });
      setIsEditDialogOpen(false);
      setEditingFile(null);
      toast({
        title: "تم التحديث",
        description: "تم تحديث معلومات الملف بنجاح"
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
      setSelectedFiles(new Set());
      toast({
        title: "تم الحذف",
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

  // معالجة رفع الملفات
  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return;
    
    Array.from(files).forEach(file => {
      // التحقق من نوع الملف
      if (fileType !== 'all') {
        const isValidType = 
          (fileType === 'image' && file.type.startsWith('image/')) ||
          (fileType === 'video' && file.type.startsWith('video/')) ||
          (fileType === 'document' && !file.type.startsWith('image/') && !file.type.startsWith('video/'));
        
        if (!isValidType) {
          toast({
            title: "نوع ملف غير مدعوم",
            description: `${file.name} يجب أن يكون من نوع ${fileType}`,
            variant: "destructive"
          });
          return;
        }
      }

      // التحقق من حجم الملف (50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "حجم الملف كبير",
          description: `${file.name} يجب أن يكون أقل من 50 ميجابايت`,
          variant: "destructive"
        });
        return;
      }

      uploadMutation.mutate(file);
    });
  }, [fileType, uploadMutation, toast]);

  // معالجة السحب والإفلات
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  // نسخ رابط الملف
  const copyToClipboard = useCallback((url: string) => {
    navigator.clipboard.writeText(`${window.location.origin}${url}`);
    toast({
      title: "تم النسخ",
      description: "تم نسخ رابط الملف"
    });
  }, [toast]);

  // فلترة الملفات
  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (file.description && file.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === "all" || file.type === selectedType;
    return matchesSearch && matchesType;
  });

  // اختيار ملف
  const handleFileSelect = useCallback((file: MediaFile) => {
    if (!allowSelection) return;
    
    if (allowMultiSelect) {
      const newSelected = new Set(selectedFiles);
      if (newSelected.has(file.id)) {
        newSelected.delete(file.id);
      } else {
        newSelected.add(file.id);
      }
      setSelectedFiles(newSelected);
    } else {
      onSelectFile?.(file);
    }
  }, [allowSelection, allowMultiSelect, selectedFiles, onSelectFile]);

  // حذف ملفات متعددة
  const handleBulkDelete = useCallback(() => {
    if (selectedFiles.size === 0) return;
    
    selectedFiles.forEach(id => {
      deleteMutation.mutate(id);
    });
  }, [selectedFiles, deleteMutation]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-5 w-5" />;
      case 'video': return <Video className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">جاري التحميل...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Folder className="h-5 w-5" />
            مكتبة الوسائط
            <Badge variant="secondary">{filteredFiles.length} ملف</Badge>
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
            </Button>
            
            {selectedFiles.size > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                حذف ({selectedFiles.size})
              </Button>
            )}
          </div>
        </div>
        
        {/* شريط البحث والفلاتر */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في الملفات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="نوع الملف" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الملفات</SelectItem>
              <SelectItem value="image">صور</SelectItem>
              <SelectItem value="video">فيديوهات</SelectItem>
              <SelectItem value="document">مستندات</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {/* منطقة رفع الملفات */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center mb-6 transition-colors ${
            dragOver 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg mb-2">اسحب الملفات هنا أو</p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadMutation.isPending}
          >
            <Upload className="h-4 w-4 mr-2" />
            اختر ملفات
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            accept={
              fileType === 'image' ? 'image/*' :
              fileType === 'video' ? 'video/*' :
              fileType === 'document' ? '.pdf,.doc,.docx,.txt' :
              '*'
            }
            onChange={(e) => handleFileUpload(e.target.files)}
          />
          <p className="text-sm text-gray-500 mt-2">
            الحد الأقصى: 50 ميجابايت لكل ملف
          </p>
        </div>

        {/* مؤشر التقدم للملفات المرفوعة */}
        {uploadingFiles.length > 0 && (
          <div className="mb-6 space-y-2">
            {uploadingFiles.map(fileName => (
              <div key={fileName} className="flex items-center gap-2">
                <div className="flex-1 text-sm">جاري رفع: {fileName}</div>
                <div className="w-24">
                  <Progress value={undefined} className="h-1" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* عرض الملفات */}
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <Folder className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">لا توجد ملفات متطابقة مع البحث</p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              : "space-y-2"
          }>
            {filteredFiles.map(file => (
              <div
                key={file.id}
                className={`
                  relative group border rounded-lg overflow-hidden transition-all
                  ${allowSelection ? 'cursor-pointer hover:shadow-md' : ''}
                  ${selectedFiles.has(file.id) ? 'ring-2 ring-blue-500' : ''}
                  ${viewMode === 'list' ? 'p-3 flex items-center gap-3' : 'aspect-square'}
                `}
                onClick={() => handleFileSelect(file)}
              >
                {/* محتوى الملف */}
                {viewMode === 'grid' ? (
                  <>
                    {/* معاينة الملف */}
                    <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                      {file.type === 'image' ? (
                        <img
                          src={file.thumbnail || file.url}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400">
                          {getFileIcon(file.type)}
                        </div>
                      )}
                    </div>
                    
                    {/* معلومات الملف */}
                    <div className="p-3">
                      <p className="font-medium text-sm truncate" title={file.name}>
                        {file.name}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge className={getFileTypeColor(file.type)}>
                          {file.type}
                        </Badge>
                        <span className="text-xs text-gray-500">{file.size}</span>
                      </div>
                      {file.dimensions && (
                        <p className="text-xs text-gray-500 mt-1">{file.dimensions}</p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* عرض القائمة */}
                    <div className="flex-shrink-0">
                      {file.type === 'image' ? (
                        <img
                          src={file.thumbnail || file.url}
                          alt={file.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                          {getFileIcon(file.type)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getFileTypeColor(file.type)}>
                          {file.type}
                        </Badge>
                        <span className="text-sm text-gray-500">{file.size}</span>
                        {file.dimensions && (
                          <span className="text-sm text-gray-500">{file.dimensions}</span>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* أزرار الإجراءات */}
                <div className={`
                  absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity
                  ${viewMode === 'list' ? 'relative top-0 right-0 opacity-100' : ''}
                `}>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(file.url);
                    }}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingFile(file);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMutation.mutate(file.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>

                {/* مؤشر التحديد */}
                {allowSelection && selectedFiles.has(file.id) && (
                  <div className="absolute top-2 left-2">
                    <CheckCircle className="h-5 w-5 text-blue-500 bg-white rounded-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* حوار تحرير الملف */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تحرير معلومات الملف</DialogTitle>
            </DialogHeader>
            {editingFile && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">الوصف</Label>
                  <Textarea
                    id="description"
                    defaultValue={editingFile.description || ''}
                    placeholder="أضف وصفاً للملف..."
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tags">العلامات (مفصولة بفواصل)</Label>
                  <Input
                    id="tags"
                    defaultValue={editingFile.tags?.join(', ') || ''}
                    placeholder="علامة1, علامة2, علامة3"
                    className="mt-1"
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    إلغاء
                  </Button>
                  <Button
                    onClick={() => {
                      const description = (document.getElementById('description') as HTMLTextAreaElement)?.value;
                      const tagsInput = (document.getElementById('tags') as HTMLInputElement)?.value;
                      const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(Boolean) : [];
                      
                      updateMutation.mutate({
                        id: editingFile.id,
                        description,
                        tags
                      });
                    }}
                    disabled={updateMutation.isPending}
                  >
                    حفظ التغييرات
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

export default EnhancedMediaManager;