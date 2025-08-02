
import React from "react";
import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-6 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-inception-purple">إنسيبشن</h3>
            <p className="text-gray-600">
              نحن نبني نظام تسويقي متكامل يحقق لك مبيعات حقيقية وليس مجرد إعلانات
            </p>
            <div className="flex space-x-3 space-x-reverse">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-inception-purple hover:bg-inception-purple hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-inception-purple hover:bg-inception-purple hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-inception-purple hover:bg-inception-purple hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-inception-purple hover:bg-inception-purple hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-inception-purple">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-inception-purple transition-colors duration-300"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-600 hover:text-inception-purple transition-colors duration-300"
                >
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link
                  to="/industries"
                  className="text-gray-600 hover:text-inception-purple transition-colors duration-300"
                >
                  الصناعات
                </Link>
              </li>
              <li>
                <Link
                  to="/books"
                  className="text-gray-600 hover:text-inception-purple transition-colors duration-300"
                >
                  الكتب
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-inception-purple transition-colors duration-300"
                >
                  عني
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-inception-purple transition-colors duration-300"
                >
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-inception-purple">خدماتنا</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services#media-production"
                  className="text-gray-600 hover:text-inception-purple transition-colors duration-300"
                >
                  الميديا برودكشن وصناعة المحتوى
                </Link>
              </li>
              <li>
                <Link
                  to="/services#paid-ads"
                  className="text-gray-600 hover:text-inception-purple transition-colors duration-300"
                >
                  الإعلانات والمديا باينج
                </Link>
              </li>
              <li>
                <Link
                  to="/services#seo"
                  className="text-gray-600 hover:text-inception-purple transition-colors duration-300"
                >
                  تحسين محركات البحث
                </Link>
              </li>
              <li>
                <Link
                  to="/services#web-development"
                  className="text-gray-600 hover:text-inception-purple transition-colors duration-300"
                >
                  تصميم وتطوير المواقع
                </Link>
              </li>
              <li>
                <Link
                  to="/services#social-media"
                  className="text-gray-600 hover:text-inception-purple transition-colors duration-300"
                >
                  إدارة السوشيال ميديا
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-inception-purple">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mt-1 ml-3 text-inception-orange" />
                <span className="text-gray-600">+20 123 456 7890</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mt-1 ml-3 text-inception-orange" />
                <span className="text-gray-600">info@inception-digital.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mt-1 ml-3 text-inception-orange" />
                <span className="text-gray-600">
                  القاهرة، مصر
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} إنسيبشن للتسويق الرقمي. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-4 space-x-reverse mt-4 sm:mt-0">
              <Link
                to="/privacy-policy"
                className="text-gray-500 text-sm hover:text-inception-purple transition-colors duration-300"
              >
                سياسة الخصوصية
              </Link>
              <Link
                to="/terms"
                className="text-gray-500 text-sm hover:text-inception-purple transition-colors duration-300"
              >
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
