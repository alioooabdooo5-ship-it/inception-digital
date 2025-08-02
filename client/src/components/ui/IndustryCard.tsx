
import React from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface IndustryCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  className?: string;
}

const IndustryCard: React.FC<IndustryCardProps> = ({
  image,
  title,
  description,
  link,
  className,
}) => {
  return (
    <div
      className={cn(
        "glass-card overflow-hidden transition-all duration-300 hover:shadow-md group",
        className
      )}
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="title-medium mb-3 text-inception-purple">{title}</h3>
        <p className="body-medium text-gray-600 mb-4 line-clamp-2">{description}</p>
        <Link
          to={link}
          className="inline-flex items-center text-inception-orange font-medium group"
        >
          <span className="link-hover">اقرأ المزيد</span>
          <ArrowUpRight size={16} className="mr-1 transition-transform duration-300 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]" />
        </Link>
      </div>
    </div>
  );
};

export default IndustryCard;
