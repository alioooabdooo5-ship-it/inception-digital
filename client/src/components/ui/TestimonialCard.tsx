
import React from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  position: string;
  company: string;
  image: string;
  content: string;
  rating?: number;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  position,
  company,
  image,
  content,
  rating = 5,
  className,
}) => {
  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      <div className="flex space-x-4 space-x-reverse items-center mb-4">
        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-inception-purple">{name}</h4>
          <p className="text-sm text-gray-600">
            {position} {company && `- ${company}`}
          </p>
          {rating > 0 && (
            <div className="flex mt-1">
              {Array.from({ length: rating }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill="#ff6600"
                  className="text-inception-orange ml-0.5"
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="body-medium text-gray-600 italic">{content}</p>
    </div>
  );
};

export default TestimonialCard;
