import React, { useState } from "react";
import { Upload, Link, X, ImageIcon, Video, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface MediaUploaderProps {
  onImageUploaded?: (url: string) => void;
  onVideoUrlSet?: (url: string) => void;
  currentImageUrl?: string;
  currentVideoUrl?: string;
  label?: string;
  className?: string;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({
  onImageUploaded,
  onVideoUrlSet,
  currentImageUrl = "",
  currentVideoUrl = "",
  label = "رفع الوسائط",
  className = ""
}) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(currentVideoUrl);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "خطأ في نوع الملف",
        description: "يرجى اختيار صورة فقط",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "حجم الملف كبير",
        description: "يرجى اختيار صورة أقل من 10 ميجابايت",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    try {
      // Get upload URL from backend
      const uploadResponse = await fetch('/api/objects/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('فشل في الحصول على رابط الرفع');
      }

      const { uploadURL } = await uploadResponse.json();

      // Upload file directly to object storage
      const uploadFileResponse = await fetch(uploadURL, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadFileResponse.ok) {
        throw new Error('فشل في رفع الملف');
      }

      // Set ACL and get final URL
      const finalizeResponse = await fetch('/api/media-upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uploadUrl: uploadURL,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        }),
      });

      if (!finalizeResponse.ok) {
        throw new Error('فشل في معالجة الملف');
      }

      const { objectPath } = await finalizeResponse.json();
      
      onImageUploaded?.(objectPath);
      
      toast({
        title: "تم رفع الصورة بنجاح",
        description: "يمكنك الآن استخدام الصورة في المحتوى",
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "خطأ في الرفع",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء رفع الملف",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleVideoUrlSubmit = () => {
    if (videoUrl.trim()) {
      onVideoUrlSet?.(videoUrl.trim());
      toast({
        title: "تم حفظ رابط الفيديو",
        description: "سيتم عرض الفيديو في الصفحة",
      });
    }
  };

  const clearImage = () => {
    onImageUploaded?.("");
  };

  const clearVideo = () => {
    setVideoUrl("");
    onVideoUrlSet?.("");
  };

  const getVideoThumbnail = (url: string) => {
    // Extract YouTube video ID and return thumbnail
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(youtubeRegex);
    if (match) {
      return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
    }
    return undefined;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="image" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="image" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              رفع صورة
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              رابط فيديو
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="space-y-4">
            {currentImageUrl ? (
              <div className="relative">
                <img 
                  src={currentImageUrl} 
                  alt="الصورة المرفوعة" 
                  className="w-full h-48 object-cover rounded-lg border"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={clearImage}
                >
                  <X className="w-4 h-4" />
                </Button>
                <Badge className="absolute bottom-2 left-2 bg-green-600">
                  تم الرفع بنجاح
                </Badge>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragOver 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm text-gray-600">جاري رفع الصورة...</p>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">اسحب الصورة هنا أو اختر ملف</p>
                    <p className="text-sm text-gray-500 mb-4">
                      يدعم JPG, PNG, GIF (حد أقصى 10 ميجابايت)
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Button variant="outline" className="cursor-pointer">
                        اختر صورة
                      </Button>
                    </label>
                  </>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="video" className="space-y-4">
            <div className="space-y-3">
              <Label>رابط الفيديو (يوتيوب، فيميو، أو رابط مباشر)</Label>
              <div className="flex gap-2">
                <Input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="flex-1"
                />
                <Button onClick={handleVideoUrlSubmit} disabled={!videoUrl.trim()}>
                  حفظ
                </Button>
              </div>
              
              {currentVideoUrl && (
                <div className="relative bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">الفيديو المحفوظ:</p>
                    <Button size="sm" variant="ghost" onClick={clearVideo}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {getVideoThumbnail(currentVideoUrl) && (
                    <img
                      src={getVideoThumbnail(currentVideoUrl)}
                      alt="معاينة الفيديو"
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  )}
                  
                  <a 
                    href={currentVideoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm break-all"
                  >
                    {currentVideoUrl}
                  </a>
                </div>
              )}
              
              <p className="text-xs text-gray-500">
                يدعم روابط من يوتيوب، فيميو، والروابط المباشرة للفيديوهات
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MediaUploader;