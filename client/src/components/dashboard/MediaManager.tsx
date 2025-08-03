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
  List,
  Plus
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
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { MediaFile } from "@shared/schema";

const MediaManager = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const { data: mediaFiles = [], isLoading } = useQuery<MediaFile[]>({
    queryKey: ['/api/media-files'],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/media-files/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/media-files'] });
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف الملف بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف الملف",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الملف؟")) {
      deleteMutation.mutate(id);
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image": return <Image className="w-6 h-6" />;
      case "video": return <Video className="w-6 h-6" />;
      case "audio": return <Music className="w-6 h-6" />;
      case "document": return <FileText className="w-6 h-6" />;
      default: return <File className="w-6 h-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "image": return "bg-green-100 text-green-800";
      case "video": return "bg-purple-100 text-purple-800";
      case "audio": return "bg-blue-100 text-blue-800";
      case "document": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "image": return "صورة";
      case "video": return "فيديو";
      case "audio": return "صوت";
      case "document": return "مستند";
      default: return "ملف";
    }
  };

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || file.type === filterType;
    return matchesSearch && matchesType;
  });

  const stats = [
    { 
      label: "الصور", 
      value: mediaFiles.filter(f => f.type === "image").length.toString(), 
      color: "text-green-600", 
      icon: Image 
    },
    { 
      label: "المستندات", 
      value: mediaFiles.filter(f => f.type === "document").length.toString(), 
      color: "text-orange-600", 
      icon: FileText 
    },
    { 
      label: "الفيديوهات", 
      value: mediaFiles.filter(f => f.type === "video").length.toString(), 
      color: "text-purple-600", 
      icon: Video 
    },
    { 
      label: "إجمالي الملفات", 
      value: mediaFiles.length.toString(), 
      color: "text-blue-600", 
      icon: File 
    }
  ];

  if (isLoading) {
    return <div className="text-center p-4">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-inception-purple">إدارة الملفات</h2>
        <div className="flex items-center gap-4">
          <Button className="bg-inception-purple hover:bg-inception-purple/90">
            <Plus className="w-4 h-4 mr-2" />
            رفع ملف جديد
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="بحث في الملفات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 w-full md:w-[250px]"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="نوع الملف" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأنواع</SelectItem>
              <SelectItem value="image">صور</SelectItem>
              <SelectItem value="document">مستندات</SelectItem>
              <SelectItem value="video">فيديوهات</SelectItem>
              <SelectItem value="audio">ملفات صوتية</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Files Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <File className="w-5 h-5" />
            الملفات ({filteredFiles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredFiles.length === 0 ? (
            <div className="text-center py-12">
              <File className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد ملفات</h3>
              <p className="text-gray-500 mb-4">ابدأ برفع ملفاتك الأولى</p>
              <Button className="bg-inception-purple hover:bg-inception-purple/90">
                <Upload className="w-4 h-4 mr-2" />
                رفع ملف
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFiles.map((file) => (
                <Card key={file.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-gray-400">
                        {getFileIcon(file.type)}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            عرض
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            تحميل
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            نسخ الرابط
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(file.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <h3 className="font-medium text-sm mb-2 truncate" title={file.name}>
                      {file.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <Badge className={getTypeColor(file.type)}>
                        {getTypeText(file.type)}
                      </Badge>
                      <span>{file.size}</span>
                    </div>
                    {file.dimensions && (
                      <p className="text-xs text-gray-400 mt-1">{file.dimensions}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(file.createdAt).toLocaleDateString('ar-EG')}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-gray-400">
                      {getFileIcon(file.type)}
                    </div>
                    <div>
                      <h3 className="font-medium">{file.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <Badge className={getTypeColor(file.type)}>
                          {getTypeText(file.type)}
                        </Badge>
                        <span>{file.size}</span>
                        {file.dimensions && <span>{file.dimensions}</span>}
                        <span>{new Date(file.createdAt).toLocaleDateString('ar-EG')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {file.downloads} تحميل
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          عرض
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          تحميل
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          نسخ الرابط
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(file.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaManager;