
import React from "react";
import { Search, Sparkles } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  return (
    <header className="bg-white border-b px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-md hidden md:block">
          <FontAwesomeIcon 
            icon={faSearch} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
          />
          <Input 
            type="search" 
            placeholder="بحث..." 
            className="pr-10 w-full bg-gray-50 border-gray-200 focus:bg-white transition-colors" 
          />
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <Button variant="ghost" size="icon" className="relative hover:bg-inception-purple/10 transition-colors">
            <FontAwesomeIcon icon={faBell} className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </Button>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-8 h-8 bg-gradient-to-br from-inception-purple to-inception-orange rounded-full flex items-center justify-center text-white shadow-lg">
              <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
            </div>
            <div className="text-sm hidden md:block">
              <div className="font-medium text-gray-800">أحمد محمد</div>
              <div className="text-gray-500 text-xs flex items-center">
                <Sparkles size={12} className="ml-1 text-inception-orange" />
                مدير
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
