
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Sparkles } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faRocket } from '@fortawesome/free-solid-svg-icons';
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, className, onClick }) => {
  const [location] = useLocation();
  const isActive = location === to;

  return (
    <Link
      to={to}
      className={cn(
        "px-3 py-2 text-gray-700 transition-all duration-300",
        "relative before:absolute before:bottom-0 before:right-0 before:h-0.5 before:bg-inception-orange before:transition-all before:duration-300",
        isActive 
          ? "text-inception-purple before:w-full" 
          : "hover:text-inception-purple before:w-0 hover:before:w-full",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrollPosition > 50
          ? "py-3 bg-white bg-opacity-90 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-inception-purple to-inception-orange flex items-center justify-center mr-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-inception-purple">إنسيبشن</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
            <NavLink to="/">الرئيسية</NavLink>
            <NavLink to="/services">خدماتنا</NavLink>
            <NavLink to="/industries">الصناعات</NavLink>
            <NavLink to="/articles">المقالات</NavLink>
            <NavLink to="/books">الكتب</NavLink>
            <NavLink to="/about">عني</NavLink>
            <NavLink to="/contact">تواصل معنا</NavLink>
          </nav>

          {/* Login Button */}
          <div className="hidden md:flex items-center space-x-3 space-x-reverse">
            <button className="text-inception-purple hover:text-inception-orange transition-colors duration-300 font-medium">
              تسجيل الدخول
            </button>
            
            {/* CTA Button */}
            <Link 
              to="/contact" 
              className="btn-primary group"
            >
              <FontAwesomeIcon icon={faRocket} className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              ابدأ الآن
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center text-inception-purple hover:text-inception-orange transition-colors duration-300"
            onClick={handleToggleMenu}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? (
              <FontAwesomeIcon icon={faTimes} className="w-6 h-6 transition-all duration-300" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="w-6 h-6 transition-all duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 bg-white shadow-lg transition-all duration-300 ease-in-out z-40 overflow-hidden",
          isOpen ? "top-[60px] max-h-[80vh]" : "top-[60px] max-h-0"
        )}
      >
        <div className="container mx-auto px-4 py-3">
          <nav className="flex flex-col space-y-2">
            <NavLink to="/" className="py-3 border-b" onClick={closeMenu}>
              الرئيسية
            </NavLink>
            <NavLink to="/services" className="py-3 border-b" onClick={closeMenu}>
              خدماتنا
            </NavLink>
            <NavLink to="/industries" className="py-3 border-b" onClick={closeMenu}>
              الصناعات
            </NavLink>
            <NavLink to="/articles" className="py-3 border-b" onClick={closeMenu}>
              المقالات
            </NavLink>
            <NavLink to="/books" className="py-3 border-b" onClick={closeMenu}>
              الكتب
            </NavLink>
            <NavLink to="/about" className="py-3 border-b" onClick={closeMenu}>
              عني
            </NavLink>
            <NavLink to="/contact" className="py-3 border-b" onClick={closeMenu}>
              تواصل معنا
            </NavLink>
            <button className="py-3 border-b text-right text-inception-purple hover:text-inception-orange transition-colors duration-300 font-medium" onClick={closeMenu}>
              تسجيل الدخول
            </button>
            <Link 
              to="/contact" 
              className="btn-primary mt-3 text-center"
              onClick={closeMenu}
            >
              ابدأ الآن
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
