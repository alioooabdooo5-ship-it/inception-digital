
import React from "react";
import { cn } from "@/lib/utils";

interface BookCardProps {
  cover: string;
  title: string;
  description: string;
  price?: string;
  className?: string;
  onClick?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({
  cover,
  title,
  description,
  price,
  className,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "glass-card overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1",
        className
      )}
      onClick={onClick}
    >
      <div className="h-56 overflow-hidden relative">
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="title-medium mb-2 text-inception-purple">{title}</h3>
        <p className="body-medium text-gray-600 mb-4 line-clamp-2">{description}</p>
        {price && (
          <div className="flex justify-between items-center">
            <span className="font-semibold text-inception-orange">{price}</span>
            <button className="btn-outline text-sm py-2 px-4">اطلب الآن</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
