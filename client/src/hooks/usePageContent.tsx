import { useQuery } from "@tanstack/react-query";
import type { PageContent } from "@shared/schema";

export function usePageContent(page: 'home' | 'contact' | 'about') {
  return useQuery<PageContent>({
    queryKey: [`/api/page-content/${page}`],
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePageContentWithFallback(
  page: 'home' | 'contact' | 'about',
  fallbackContent: Partial<PageContent>
) {
  const { data, isLoading, error } = usePageContent(page);
  
  // Return merged content with fallback if data is not available
  const content = data || {
    id: 0,
    page,
    title: fallbackContent.title || 'صفحة',
    metaTitle: fallbackContent.metaTitle || '',
    metaDescription: fallbackContent.metaDescription || '',
    sections: fallbackContent.sections || [],
    contactInfo: fallbackContent.contactInfo,
    socialLinks: fallbackContent.socialLinks || {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return {
    content,
    isLoading,
    error,
    hasData: !!data
  };
}

// Helper to get section by type
export function getSectionByType(
  sections: PageContent['sections'], 
  type: string
) {
  if (!sections || !Array.isArray(sections)) return null;
  return sections.find(section => section.type === type && section.visible);
}

// Helper to get sections by type (multiple)
export function getSectionsByType(
  sections: PageContent['sections'], 
  type: string
) {
  if (!sections || !Array.isArray(sections)) return [];
  return sections.filter(section => section.type === type && section.visible);
}

// Helper to get contact info with fallback
export function getContactInfo(content: PageContent | null) {
  return content?.contactInfo || {
    phone: "+201234567890",
    email: "info@inception.com",
    whatsapp: "+201234567890",
    address: "القاهرة، مصر",
    calendlyLink: "https://calendly.com"
  };
}

// Helper to get social links with fallback
export function getSocialLinks(content: PageContent | null) {
  return content?.socialLinks || {
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: ""
  };
}