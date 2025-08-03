import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, User, Building, Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

const TestimonialsManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch testimonials
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials']
  });

  // Delete testimonial mutation
  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/testimonials/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      toast({ title: "تم حذف الشهادة بنجاح" });
    },
    onError: (error) => {
      toast({ 
        title: "خطأ في حذف الشهادة", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذه الشهادة؟")) {
      deleteTestimonialMutation.mutate(id);
    }
  };

  // Filter testimonials based on search
  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper function to render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">إدارة شهادات العملاء</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">إدارة شهادات العملاء</h1>
          <p className="text-gray-600 mt-2">إدارة وتعديل آراء وشهادات العملاء</p>
        </div>
        
        <Button className="bg-inception-purple hover:bg-purple-700">
          <Plus className="w-4 h-4 ml-2" />
          إضافة شهادة جديدة
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="البحث في الشهادات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Testimonials Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{testimonials.length}</h3>
                <p className="text-gray-600">إجمالي الشهادات</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {testimonials.length > 0 
                    ? (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)
                    : "0"
                  }
                </h3>
                <p className="text-gray-600">متوسط التقييم</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Building className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {new Set(testimonials.map(t => t.company)).size}
                </h3>
                <p className="text-gray-600">الشركات المميزة</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold">{testimonial.name}</CardTitle>
                  <p className="text-sm opacity-90">{testimonial.position}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="mb-3">
                <Badge variant="secondary" className="mb-2">
                  {testimonial.company}
                </Badge>
                <div className="flex items-center gap-1">
                  {renderStars(testimonial.rating)}
                  <span className="text-sm text-gray-600 mr-2">{testimonial.rating}/5</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{testimonial.content}</p>

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
                  onClick={() => handleDelete(testimonial.id)}
                  disabled={deleteTestimonialMutation.isPending}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTestimonials.length === 0 && !isLoading && (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد شهادات</h3>
            <p className="text-gray-600 mb-6">ابدأ بإضافة أول شهادة عميل</p>
            <Button className="bg-inception-purple hover:bg-purple-700">
              <Plus className="w-4 h-4 ml-2" />
              إضافة شهادة جديدة
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestimonialsManager;