import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, Building, TrendingUp } from "lucide-react";
import type { Industry } from "@shared/schema";

const IndustriesManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch industries
  const { data: industries = [], isLoading } = useQuery<Industry[]>({
    queryKey: ['/api/industries']
  });

  // Delete industry mutation
  const deleteIndustryMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/industries/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/industries'] });
      toast({ title: "تم حذف الصناعة بنجاح" });
    },
    onError: (error) => {
      toast({ 
        title: "خطأ في حذف الصناعة", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذه الصناعة؟")) {
      deleteIndustryMutation.mutate(id);
    }
  };

  // Filter industries based on search
  const filteredIndustries = industries.filter(industry =>
    industry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    industry.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">إدارة الصناعات</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
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
          <h1 className="text-3xl font-bold text-gray-900">إدارة الصناعات</h1>
          <p className="text-gray-600 mt-2">إدارة وتعديل القطاعات والصناعات المستهدفة</p>
        </div>
        
        <Button className="bg-inception-purple hover:bg-purple-700">
          <Plus className="w-4 h-4 ml-2" />
          إضافة صناعة جديدة
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="البحث في الصناعات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Industries Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{industries.length}</h3>
                <p className="text-gray-600">إجمالي الصناعات</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {industries.filter(i => i.services && i.services.length > 0).length}
                </h3>
                <p className="text-gray-600">الصناعات النشطة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {industries.reduce((acc, i) => acc + (i.results ? i.results.length : 0), 0)}
                </h3>
                <p className="text-gray-600">النتائج المحققة</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Industries List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIndustries.map((industry) => (
          <Card key={industry.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className={`bg-gradient-to-r ${industry.gradient || 'from-gray-500 to-gray-600'} text-white rounded-t-lg`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold">{industry.title}</CardTitle>
                  {industry.subtitle && (
                    <p className="text-sm opacity-90">{industry.subtitle}</p>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-600 mb-4 line-clamp-2">{industry.description}</p>
              
              {industry.results && industry.results.length > 0 && (
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">النتائج المحققة:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {industry.results.slice(0, 2).map((result, index) => (
                      <li key={index}>• {result}</li>
                    ))}
                  </ul>
                </div>
              )}

              {industry.services && industry.services.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">الخدمات:</h4>
                  <div className="flex flex-wrap gap-1">
                    {industry.services.slice(0, 3).map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
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
                  onClick={() => handleDelete(industry.id)}
                  disabled={deleteIndustryMutation.isPending}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIndustries.length === 0 && !isLoading && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد صناعات</h3>
            <p className="text-gray-600 mb-6">ابدأ بإضافة أول صناعة مستهدفة</p>
            <Button className="bg-inception-purple hover:bg-purple-700">
              <Plus className="w-4 h-4 ml-2" />
              إضافة صناعة جديدة
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IndustriesManager;