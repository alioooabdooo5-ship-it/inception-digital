import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, Mail, Phone, Calendar, MessageCircle } from "lucide-react";
import type { ContactForm } from "@shared/schema";

const ContactFormsManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch contact forms
  const { data: contactForms = [], isLoading } = useQuery<ContactForm[]>({
    queryKey: ['/api/contact-forms']
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest("PATCH", `/api/contact-forms/${id}`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-forms'] });
      toast({ title: "تم تحديث الحالة بنجاح" });
    },
    onError: (error) => {
      toast({ 
        title: "خطأ في تحديث الحالة", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  // Delete contact form mutation
  const deleteContactFormMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/contact-forms/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-forms'] });
      toast({ title: "تم حذف الرسالة بنجاح" });
    },
    onError: (error) => {
      toast({ 
        title: "خطأ في حذف الرسالة", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const handleStatusChange = (id: number, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذه الرسالة؟")) {
      deleteContactFormMutation.mutate(id);
    }
  };

  // Filter contact forms based on search and status
  const filteredContactForms = contactForms.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         form.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         form.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || form.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800">جديد</Badge>;
      case 'replied':
        return <Badge className="bg-green-100 text-green-800">تم الرد</Badge>;
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800">مغلق</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">إدارة رسائل التواصل</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">إدارة رسائل التواصل</h1>
          <p className="text-gray-600 mt-2">إدارة وتتبع رسائل العملاء</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="البحث في الرسائل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md bg-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">جميع الحالات</option>
          <option value="new">جديد</option>
          <option value="replied">تم الرد</option>
          <option value="closed">مغلق</option>
        </select>
      </div>

      {/* Contact Forms Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{contactForms.length}</h3>
                <p className="text-gray-600">إجمالي الرسائل</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {contactForms.filter(f => f.status === 'new').length}
                </h3>
                <p className="text-gray-600">رسائل جديدة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {contactForms.filter(f => f.status === 'replied').length}
                </h3>
                <p className="text-gray-600">تم الرد عليها</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {contactForms.filter(f => f.status === 'closed').length}
                </h3>
                <p className="text-gray-600">مغلقة</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Forms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContactForms.map((form) => (
          <Card key={form.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">{form.name}</CardTitle>
                  <p className="text-sm opacity-90">{form.email}</p>
                </div>
                {getStatusBadge(form.status)}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {form.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{form.phone}</span>
                  </div>
                )}
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 line-clamp-3">{form.message}</p>
                </div>
                
                <div className="text-xs text-gray-500">
                  {new Date(form.createdAt).toLocaleDateString('ar-SA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <select
                  className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                  value={form.status}
                  onChange={(e) => handleStatusChange(form.id, e.target.value)}
                  disabled={updateStatusMutation.isPending}
                >
                  <option value="new">جديد</option>
                  <option value="replied">تم الرد</option>
                  <option value="closed">مغلق</option>
                </select>

                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDelete(form.id)}
                  disabled={deleteContactFormMutation.isPending}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContactForms.length === 0 && !isLoading && (
        <Card>
          <CardContent className="p-12 text-center">
            <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد رسائل</h3>
            <p className="text-gray-600 mb-6">لم يتم استلام أي رسائل تواصل بعد</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContactFormsManager;