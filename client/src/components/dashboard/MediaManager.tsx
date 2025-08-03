import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, Image, Video, FileText, Download, Upload } from "lucide-react";
import type { MediaFile } from "@shared/schema";

const MediaManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch media files
  const { data: mediaFiles = [], isLoading } = useQuery<MediaFile[]>({
    queryKey: ['/api/media']
  });

  // Delete media file mutation
  const deleteMediaFileMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/media/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/media'] });
      toast({ title: "تم حذف الملف بنجاح" });
    },
    onError: (error) => {
      toast({ 
        title: "خطأ في حذف الملف", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا الملف؟")) {
      deleteMediaFileMutation.mutate(id);
    }
  };

  // Filter media files based on search and type
  const filteredMediaFiles = mediaFiles.filter(file => {
    const matchesSearch = file.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (file.alt && file.alt.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === "all" || file.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-6 h-6" />;
      case 'video':
        return <Video className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'image':
        return <Badge className="bg-green-100 text-green-800">صورة</Badge>;
      case 'video':
        return <Badge className="bg-blue-100 text-blue-800">فيديو</Badge>;
      case 'document':
        return <Badge className="bg-purple-100 text-purple-800">مستند</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const formatFileSize = (sizeInBytes: number) => {
    if (sizeInBytes < 1024) return `${sizeInBytes} B`;
    if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    if (sizeInBytes < 1024 * 1024 * 1024) return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">إدارة الملفات</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة الملفات</h1>
          <p className="text-gray-600 mt-2">إدارة وتنظيم الصور والفيديوهات والمستندات</p>
        </div>
        
        <Button className="bg-inception-purple hover:bg-purple-700">
          <Upload className="w-4 h-4 ml-2" />
          رفع ملف جديد
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="البحث في الملفات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md bg-white"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">جميع الأنواع</option>
          <option value="image">صور</option>
          <option value="video">فيديو</option>
          <option value="document">مستندات</option>
        </select>
      </div>

      {/* Media Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{mediaFiles.length}</h3>
                <p className="text-gray-600">إجمالي الملفات</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Image className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {mediaFiles.filter(f => f.type === 'image').length}
                </h3>
                <p className="text-gray-600">الصور</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {mediaFiles.filter(f => f.type === 'video').length}
                </h3>
                <p className="text-gray-600">الفيديوهات</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Download className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatFileSize(mediaFiles.reduce((acc, f) => acc + (f.size || 0), 0))}
                </h3>
                <p className="text-gray-600">المساحة المستخدمة</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Media Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMediaFiles.map((file) => (
          <Card key={file.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getFileIcon(file.type)}
                  <span className="font-medium text-sm truncate">{file.filename}</span>
                </div>
                {getTypeBadge(file.type)}
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {/* File Preview */}
              <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                {file.type === 'image' && file.url ? (
                  <img 
                    src={file.url} 
                    alt={file.alt || file.filename}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">
                    {getFileIcon(file.type)}
                  </div>
                )}
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                {file.alt && (
                  <div>
                    <span className="font-medium">الوصف:</span>
                    <p className="text-xs">{file.alt}</p>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>الحجم:</span>
                  <span>{file.size ? formatFileSize(file.size) : 'غير محدد'}</span>
                </div>
                
                <div className="text-xs text-gray-500">
                  {new Date(file.createdAt).toLocaleDateString('ar-SA')}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 ml-1" />
                  تعديل
                </Button>

                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDelete(file.id)}
                  disabled={deleteMediaFileMutation.isPending}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMediaFiles.length === 0 && !isLoading && (
        <Card>
          <CardContent className="p-12 text-center">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد ملفات</h3>
            <p className="text-gray-600 mb-6">ابدأ برفع أول ملف إلى المكتبة</p>
            <Button className="bg-inception-purple hover:bg-purple-700">
              <Upload className="w-4 h-4 ml-2" />
              رفع ملف جديد
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MediaManager;