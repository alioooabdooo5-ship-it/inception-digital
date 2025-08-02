import React, { useState } from "react";
import { 
  Upload, 
  Image, 
  FileText, 
  Video, 
  Music, 
  File,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Download,
  Trash2,
  Edit,
  Copy,
  Grid,
  List
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MediaManager = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const mediaFiles = [
    {
      id: 1,
      name: "hero-banner.jpg",
      type: "image",
      size: "2.5 MB",
      uploadDate: "2024-01-15",
      dimensions: "1920x1080",
      url: "/lovable-uploads/28b72d61-4e8f-4b33-847a-1685c6b0b5a5.png",
      downloads: 45
    },
    {
      id: 2,
      name: "company-logo.png",
      type: "image",
      size: "156 KB",
      uploadDate: "2024-01-10",
      dimensions: "512x512",
      url: "/lovable-uploads/3cc93b10-435d-4b20-a3d0-da06335cf1ca.png",
      downloads: 128
    },
    {
      id: 3,
      name: "presentation.pdf",
      type: "document",
      size: "4.2 MB",
      uploadDate: "2024-01-08",
      dimensions: "A4",
      url: "#",
      downloads: 22
    },
    {
      id: 4,
      name: "intro-video.mp4",
      type: "video",
      size: "15.8 MB",
      uploadDate: "2024-01-05",
      dimensions: "1920x1080",
      url: "#",
      downloads: 67
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Image className="w-5 h-5 text-blue-500" />;
      case "video":
        return <Video className="w-5 h-5 text-purple-500" />;
      case "audio":
        return <Music className="w-5 h-5 text-green-500" />;
      case "document":
        return <FileText className="w-5 h-5 text-red-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const stats = [
    { label: "إجمالي الملفات", value: "124", color: "text-blue-600" },
    { label: "حجم المساحة المستخدمة", value: "2.8 GB", color: "text-purple-600" },
    { label: "التحميلات هذا الشهر", value: "456", color: "text-green-600" },
    { label: "أنواع الملفات", value: "8", color: "text-orange-600" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-inception-purple">إدارة الوسائط</h1>
          <p className="text-gray-600">إدارة وتنظيم ملفات الوسائط</p>
        </div>
        <Button className="bg-inception-purple hover:bg-inception-purple/90">
          <Upload className="w-4 h-4 ml-2" />
          رفع ملفات
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-inception-purple">{stat.value}</div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في الملفات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="نوع الملف" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الملفات</SelectItem>
              <SelectItem value="image">الصور</SelectItem>
              <SelectItem value="video">الفيديو</SelectItem>
              <SelectItem value="document">المستندات</SelectItem>
              <SelectItem value="audio">الصوت</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Media Grid/List */}
      <Tabs value="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="images">الصور</TabsTrigger>
          <TabsTrigger value="videos">الفيديو</TabsTrigger>
          <TabsTrigger value="documents">المستندات</TabsTrigger>
          <TabsTrigger value="recent">الأحدث</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mediaFiles.map((file) => (
                <Card key={file.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                      {file.type === "image" ? (
                        <img 
                          src={file.url} 
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          {getFileIcon(file.type)}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm truncate flex-1">{file.name}</h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="w-6 h-6">
                              <MoreVertical className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 ml-2" />
                              معاينة
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 ml-2" />
                              تحميل
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 ml-2" />
                              نسخ الرابط
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 ml-2" />
                              تحرير
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 ml-2" />
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{file.size}</span>
                        <Badge variant="outline">{file.type}</Badge>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        <div>تم الرفع: {new Date(file.uploadDate).toLocaleDateString('ar-EG')}</div>
                        <div>{file.downloads} تحميل</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {mediaFiles.map((file) => (
                <Card key={file.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          {file.type === "image" ? (
                            <img 
                              src={file.url} 
                              alt={file.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            getFileIcon(file.type)
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{file.name}</h3>
                          <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                            <span>{file.size}</span>
                            <span>{file.dimensions}</span>
                            <span>{file.downloads} تحميل</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Badge variant="outline">{file.type}</Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(file.uploadDate).toLocaleDateString('ar-EG')}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 ml-2" />
                              معاينة
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 ml-2" />
                              تحميل
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 ml-2" />
                              نسخ الرابط
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 ml-2" />
                              تحرير
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 ml-2" />
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MediaManager;