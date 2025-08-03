import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, Image, Link, Save, Eye, Trash2 } from "lucide-react";
import type { MediaFile } from "@shared/schema";

const MediaManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  // Fetch media files
  const { data: mediaFiles = [], isLoading } = useQuery<MediaFile[]>({
    queryKey: ['/api/media-files']
  });

  // Upload media mutation
  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      setUploading(true);
      const uploadPromises = files.map(async (file) => {
        // Simulate upload - في المشروع الحقيقي ستقوم برفع الملف لخدمة التخزين
        const mockUrl = `https://images.unsplash.com/photo-${Date.now()}?w=800&q=80`;
        
        const response = await fetch('/api/media-files', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: file.name,
            url: mockUrl,
            type: file.type,
            size: file.size.toString(),
            description: file.name.split('.')[0]
          })
        });
        
        if (!response.ok) throw new Error('Failed to save media file');
        return response.json();
      });

      return Promise.all(uploadPromises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/media-files'] });
      setSelectedFiles([]);
      setUploading(false);
      toast({
        title: "تم الرفع",
        description: "تم رفع الملفات بنجاح",
      });
    },
    onError: () => {
      setUploading(false);
      toast({
        title: "خطأ في الرفع",
        description: "فشل في رفع الملفات",
        variant: "destructive",
      });
    },
  });

  // Delete media mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/media-files/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete media file');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/media-files'] });
      toast({
        title: "تم الحذف",
        description: "تم حذف الملف بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ في الحذف",
        description: "فشل في حذف الملف",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      uploadMutation.mutate(selectedFiles);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا الملف؟')) {
      deleteMutation.mutate(id);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "تم النسخ",
      description: "تم نسخ رابط الصورة",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل الملفات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة الملفات والصور</h1>
          <p className="text-gray-600 mt-2">رفع وإدارة الصور والملفات المستخدمة في الموقع</p>
        </div>
        
        <Badge variant="secondary" className="bg-inception-purple/10 text-inception-purple">
          <Image className="w-4 h-4 ml-2" />
          {mediaFiles.length} ملف
        </Badge>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-inception-purple" />
            رفع ملفات جديدة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="flex-1"
            />
            <Button
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || uploading}
              className="bg-inception-purple hover:bg-inception-purple/90"
            >
              <Upload className="w-4 h-4 ml-2" />
              {uploading ? 'جاري الرفع...' : 'رفع'}
            </Button>
          </div>
          
          {selectedFiles.length > 0 && (
            <div className="text-sm text-gray-600">
              تم اختيار {selectedFiles.length} ملف للرفع
            </div>
          )}
        </CardContent>
      </Card>

      {/* Media Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mediaFiles.map((file) => (
          <Card key={file.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-100 relative">
              {file.type.startsWith('image/') ? (
                <img
                  src={file.url}
                  alt={file.description || file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
                <p className="text-sm text-gray-500">
                  {(parseInt(file.size) / 1024).toFixed(1)} KB
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(file.url, '_blank')}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 ml-2" />
                  عرض
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(file.url)}
                  className="flex-1"
                >
                  <Link className="w-4 h-4 ml-2" />
                  نسخ
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(file.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mediaFiles.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد ملفات</h3>
            <p className="text-gray-600 mb-4">ابدأ برفع صور وملفات لاستخدامها في الموقع</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MediaManager;