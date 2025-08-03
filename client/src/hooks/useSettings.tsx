import { useQuery } from "@tanstack/react-query";
import type { Setting } from "@shared/schema";

export const useSettings = (category?: string) => {
  const { data: settings = [], isLoading, error } = useQuery<Setting[]>({
    queryKey: category ? ['/api/public-settings', { category }] : ['/api/public-settings'],
    queryFn: () => 
      fetch(category ? `/api/public-settings?category=${category}` : '/api/public-settings')
        .then(res => res.json())
  });

  // Helper function to get setting value by key
  const getSetting = (key: string): string => {
    const setting = settings.find(s => s.key === key);
    return setting?.value || '';
  };

  // Helper function to get settings by category as object
  const getSettingsObject = (): Record<string, string> => {
    const settingsObj: Record<string, string> = {};
    settings.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });
    return settingsObj;
  };

  return {
    settings,
    isLoading,
    error,
    getSetting,
    getSettingsObject
  };
};

export default useSettings;