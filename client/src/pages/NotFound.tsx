
import { useLocation, Link } from "wouter";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MoveLeft } from "lucide-react";

const NotFound = () => {
  const [location] = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location
    );
  }, [location]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center max-w-lg px-4">
          <h1 className="headline-large text-inception-purple mb-4">404</h1>
          <p className="title-medium text-gray-600 mb-6">الصفحة غير موجودة</p>
          <p className="body-medium text-gray-500 mb-8">
            الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى عنوان آخر.
          </p>
          <Link to="/" className="btn-primary inline-flex items-center">
            <span>العودة إلى الصفحة الرئيسية</span>
            <MoveLeft size={18} className="mr-2" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
