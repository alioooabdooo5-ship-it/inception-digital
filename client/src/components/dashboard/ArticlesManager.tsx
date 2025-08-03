import React, { useState } from "react";
import { 
  FileText, 
  Plus, 
  Search, 
  Edit,
  Trash2,
  Eye,
  Filter,
  Calendar,
  User,
  Clock,
  TrendingUp
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertArticleSchema } from "@shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const ArticlesManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertArticleSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tags: "",
      featured: false,
    },
  });

  // جلب المقالات من API
  const { data: articles = [], isLoading, error } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  // إضافة مقال جديد
  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/articles", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      setIsAddDialogOpen(false);
      form.reset();
      toast({
        title: "تم بنجاح",
        description: "تم إضافة المقال بنجاح",
      });
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: "فشل في إضافة المقال",
        variant: "destructive",
      });
    },
  });

  // تحديث مقال
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await apiRequest("PUT", `/api/articles/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      setIsEditDialogOpen(false);
      form.reset();
      toast({
        title: "تم بنجاح",
        description: "تم تحديث المقال بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "فشل في تحديث المقال",
        variant: "destructive",
      });
    },
  });

  // حذف مقال
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/articles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({
        title: "تم بنجاح",
        description: "تم حذف المقال بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "فشل في حذف المقال",
        variant: "destructive",
      });
    },
  });

  // حساب الإحصائيات من البيانات الحقيقية
  const stats = React.useMemo(() => {
    const totalArticles = articles.length;
    const publishedArticles = articles.filter(a => a.status === 'published').length;
    const draftArticles = articles.filter(a => a.status === 'draft').length;
    const reviewArticles = articles.filter(a => a.status === 'review').length;
    
    return [
      { label: "إجمالي المقالات", value: totalArticles.toString(), color: "text-blue-600", icon: FileText },
      { label: "المقالات المنشورة", value: publishedArticles.toString(), color: "text-green-600", icon: Eye },
      { label: "المسودات", value: draftArticles.toString(), color: "text-yellow-600", icon: Edit },
      { label: "قيد المراجعة", value: reviewArticles.toString(), color: "text-purple-600", icon: Clock }
    ];
  }, [articles]);

  const categories = [
    { id: "all", name: "جميع الفئات" },
    { id: "seo", name: "تحسين محركات البحث" },
    { id: "social-media", name: "وسائل التواصل الاجتماعي" },
    { id: "web-development", name: "تطوير المواقع" },
    { id: "digital-marketing", name: "التسويق الرقمي" }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.includes(searchQuery) || article.excerpt.includes(searchQuery);
    const matchesStatus = filterStatus === "all" || article.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "review": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "published": return "منشور";
      case "draft": return "مسودة";
      case "review": return "قيد المراجعة";
      default: return status;
    }
  };

  const handleAddArticle = () => {
    // التوجه مباشرة لصفحة المحرر
    window.location.href = '/admin/article-editor';
  };

  const handleEditArticle = (article: Article) => {
    // التوجه لصفحة المحرر مع معرف المقال
    window.location.href = `/admin/article-editor?id=${article.id}`;
  };

  const handleDeleteArticle = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المقال؟")) {
      deleteMutation.mutate(id);
    }
  };

  const onSubmit = (data: any) => {
    if (isEditDialogOpen && currentArticle) {
      updateMutation.mutate({ id: (currentArticle as any).id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inception-purple mx-auto"></div>
          <p className="mt-4 text-gray-600">جارٍ تحميل المقالات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-red-600">حدث خطأ في تحميل المقالات</p>
          <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/articles"] })} className="mt-4">
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-inception-purple">إدارة المقالات</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="بحث في المقالات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 w-full md:w-[250px]"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="all">جميع الحالات</option>
            <option value="published">منشور</option>
            <option value="draft">مسودة</option>
            <option value="review">قيد المراجعة</option>
          </select>
          
          <Button onClick={handleAddArticle} className="bg-inception-purple hover:bg-inception-purple/90">
            <Plus size={16} className="ml-1" />
            مقال جديد
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
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-70`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Articles Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-inception-purple">قائمة المقالات</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-right">العنوان</TableHead>
                  <TableHead className="text-right">الكاتب</TableHead>
                  <TableHead className="text-right">الفئة</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">المشاهدات</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      لا توجد مقالات مطابقة للبحث
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredArticles.map((article: Article) => (
                    <TableRow key={article.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <div className="font-medium text-inception-purple flex items-center">
                            {article.title}
                            {article.featured && (
                              <Badge className="mr-2 bg-inception-orange text-white">مميز</Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-[300px]">
                            {article.excerpt}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="w-4 h-4 ml-1 text-gray-400" />
                          {article.author}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{article.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(article.status || 'published')}>
                          {getStatusText(article.status || 'published')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 ml-1 text-green-500" />
                          {article.views || 0}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 ml-1" />
                          {new Date(article.createdAt || Date.now()).toLocaleDateString('ar-EG')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2 space-x-reverse">
                          <Button variant="ghost" size="icon" title="عرض">
                            <Eye size={16} className="text-blue-500" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditArticle(article)}
                            title="تعديل"
                          >
                            <Edit size={16} className="text-green-500" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteArticle(article.id)}
                            title="حذف"
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Article Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-right">إضافة مقال جديد</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان المقال</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل عنوان المقال" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الملخص</FormLabel>
                    <FormControl>
                      <Textarea placeholder="ملخص قصير للمقال" {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>محتوى المقال</FormLabel>
                    <FormControl>
                      <Textarea placeholder="محتوى المقال الكامل" {...field} rows={8} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الفئة</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full px-3 py-2 border rounded-lg">
                          <option value="">اختر الفئة</option>
                          {categories.slice(1).map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الكلمات المفتاحية</FormLabel>
                      <FormControl>
                        <Input placeholder="الكلمات المفتاحية مفصولة بفاصلة" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="submit" className="bg-inception-purple hover:bg-inception-purple/90">
                  إضافة المقال
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Article Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-right">تعديل المقال</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان المقال</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل عنوان المقال" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الملخص</FormLabel>
                    <FormControl>
                      <Textarea placeholder="ملخص قصير للمقال" {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>محتوى المقال</FormLabel>
                    <FormControl>
                      <Textarea placeholder="محتوى المقال الكامل" {...field} rows={8} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الفئة</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full px-3 py-2 border rounded-lg">
                          <option value="">اختر الفئة</option>
                          {categories.slice(1).map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الكلمات المفتاحية</FormLabel>
                      <FormControl>
                        <Input placeholder="الكلمات المفتاحية مفصولة بفاصلة" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="submit" className="bg-inception-purple hover:bg-inception-purple/90">
                  حفظ التغييرات
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArticlesManager;